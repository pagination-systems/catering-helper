# Admin Feature Module Pattern

Reference architecture based on `apps/frontend/features/admin/packages`. Use this as the canonical template when refactoring other admin modules.

---

## Directory Structure

```
features/admin/<module>/
├── index.tsx                          # Public entry point — page-level component
├── api/
│   └── <module>.api.ts               # Raw API functions (axios wrappers)
├── schemas/
│   └── <module>.schema.ts            # Zod schemas + TypeScript interfaces
├── queries/
│   ├── <module>.keys.ts              # React Query key factory
│   └── <module>.cache.ts            # Optimistic update helpers
├── hooks/
│   ├── index.ts                      # Barrel re-export
│   ├── use<Modules>.ts               # List query hook
│   ├── use<Module>.ts                # Single item query hook
│   ├── useCreate<Module>.ts          # Create mutation hook
│   ├── useUpdate<Module>.ts          # Update mutation hook
│   └── useHardDelete<Module>.ts      # Delete mutation hook
├── store/
│   └── useStore.ts                   # Zustand UI state store
├── components/
│   ├── <module>-table.tsx            # Data table
│   ├── <module>-form.tsx             # Create/edit form (reused for both)
│   ├── <module>-details.tsx          # Read-only details view
│   ├── table-toolbar.tsx             # Search + filter + create button
│   ├── row-actions.tsx               # Per-row dropdown menu
│   ├── update-<module>.tsx           # Edit wrapper (fetches fresh data)
│   └── delete-confirmation.tsx       # AlertDialog with keyword confirmation
└── lib/
    ├── <module>-i18n.ts             # All UI strings (en + bn)
    ├── badge.ts                      # Status badge style helpers
    └── utils.ts                      # Module-specific pure utilities
```

---

## Layer Responsibilities

| Layer | Responsibility | Must NOT |
|---|---|---|
| `api/` | Call axios, shape response into cache types | Hold state, call hooks |
| `schemas/` | Define interfaces + Zod schemas | Import from hooks or components |
| `queries/` | Key factories + cache manipulation | Trigger side effects |
| `hooks/` | Wire React Query + expose typed results | Hold UI state |
| `store/` | Hold all UI state (sheets, dialogs, selection) | Call API |
| `components/` | Render UI, read store via selectors | Own business logic |
| `lib/` | Pure helpers, i18n content, badge styles | Import from hooks/store |

---

## 1. Schemas (`schemas/<module>.schema.ts`)

Define all types and Zod schemas in one file. Keep API envelope types separate from domain types.

```ts
// Domain types
export interface IModule {
  id: string;
  name: string;
  status: MODULE_STATUS_ENUM;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API envelope types
interface ApiEnvelope {
  message: string;
  statusCode: number;
}

export interface GetModulesApiResponse extends ApiEnvelope {
  items: IModule[];
  meta: { pagination: PaginationMeta };
}

export interface GetModuleApiResponse extends ApiEnvelope {
  item: IModule;
}

export interface CreateModuleApiResponse extends ApiEnvelope {
  item: IModule;
}

export interface UpdateModuleApiResponse extends ApiEnvelope {
  item: IModule;
}

export interface DeleteModuleApiResponse extends ApiEnvelope {
  item: null;
}

// React Query cache shapes
export interface ModulesCache {
  items: IModule[];
  pagination: PaginationMeta;
}

export interface ModuleCache {
  item: IModule;
}

export interface ModuleMutationResult {
  item: IModule;
  message: string;
}

// Validation message keys (passed from i18n to keep schema locale-agnostic)
export type ModuleValidationMessages = {
  nameMin: string;
  nameMax: string;
  // ... one key per validation rule
};

// Zod schema factory — receives messages so validation is locale-aware
export const moduleFormSchema = (messages: ModuleValidationMessages) =>
  z.object({
    name: z.string().trim().min(2, messages.nameMin).max(100, messages.nameMax),
    // ...
  });

export const updateModuleSchema = (messages: ModuleValidationMessages) =>
  moduleFormSchema(messages).extend({
    status: z.enum(MODULE_STATUS_ENUM),
  });

export type moduleFormInput = z.infer<ReturnType<typeof moduleFormSchema>>;
export type UpdateModuleInput = z.infer<ReturnType<typeof updateModuleSchema>>;
```

**Rules:**
- `moduleFormSchema` is used for **create**; `updateModuleSchema` extends it with `status`.
- Pass validation messages in from i18n — schemas never import from `lib/`.
- `superRefine` for cross-field validation (e.g., uniqueness checks).

---

## 2. API (`api/<module>.api.ts`)

Pure async functions wrapping `apiClient`. Return cache-shaped types — never raw API envelopes.

```ts
import { apiClient } from "@/lib/axios";
import type {
  ModulesCache, ModuleCache, ModuleMutationResult,
  moduleFormInput, UpdateModuleInput,
  GetModulesApiResponse, GetModuleApiResponse,
  CreateModuleApiResponse, UpdateModuleApiResponse, DeleteModuleApiResponse,
} from "../schemas/<module>.schema";

export const getModules = async (query?: string): Promise<ModulesCache> => {
  const { data } = await apiClient.get<GetModulesApiResponse>(
    query ? `/modules?${query}` : "/modules"
  );
  return { items: data.items, pagination: data.meta.pagination };
};

export const getModule = async (id: string): Promise<ModuleCache> => {
  const { data } = await apiClient.get<GetModuleApiResponse>(`/modules/${id}`);
  return { item: data.item };
};

export const createModule = async (payload: moduleFormInput): Promise<ModuleMutationResult> => {
  const { data } = await apiClient.post<CreateModuleApiResponse>("/modules", payload);
  return { item: data.item, message: data.message };
};

export const updateModule = async ({
  id, payload,
}: {
  id: string;
  payload: Partial<UpdateModuleInput>;
}): Promise<ModuleMutationResult> => {
  const { data } = await apiClient.put<UpdateModuleApiResponse>("/modules", { id, ...payload });
  return { item: data.item, message: data.message };
};

export const hardDeleteModule = async (id: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<DeleteModuleApiResponse>(`/modules/${id}`);
  return { message: data.message };
};
```

---

## 3. Query Keys (`queries/<module>.keys.ts`)

Hierarchical key factory. All hooks reference this — never write inline arrays.

```ts
export const MODULE_KEYS = {
  all: ["modules"] as const,
  lists: (filters?: Record<string, any>) =>
    filters
      ? ([...MODULE_KEYS.all, "list", filters] as const)
      : ([...MODULE_KEYS.all, "list"] as const),
  list: (filters?: string) => [...MODULE_KEYS.lists(), { filters }] as const,
  details: () => [...MODULE_KEYS.all, "detail"] as const,
  detail: (id: string) => [...MODULE_KEYS.details(), id] as const,
};
```

---

## 4. Cache Helpers (`queries/<module>.cache.ts`)

Optimistic update logic isolated from hooks. Keeps mutation hooks small and testable.

```ts
import type { QueryClient } from "@tanstack/react-query";
import type { IModule, ModuleCache, ModulesCache, moduleFormInput } from "../schemas/<module>.schema";
import { MODULE_KEYS } from "./<module>.keys";

type UpdateVars = { id: string; payload: Partial<moduleFormInput> };

export const moduleCache = {
  optimisticUpdate(queryClient: QueryClient, { id, payload }: UpdateVars) {
    const previous = queryClient.getQueriesData<ModulesCache>({
      queryKey: MODULE_KEYS.lists(),
    });

    const existing = previous
      .flatMap(([, cache]) => cache?.items ?? [])
      .find((item) => item.id === id);

    if (existing) {
      this.update(queryClient, {
        ...existing,
        ...payload,
        id,
        updatedAt: new Date(),
      });
    }

    return { previous };
  },

  update(queryClient: QueryClient, updated: IModule) {
    queryClient.setQueriesData<ModulesCache>({ queryKey: MODULE_KEYS.lists() }, (old) => {
      if (!old) return old;
      return { ...old, items: old.items.map((item) => (item.id === updated.id ? updated : item)) };
    });

    queryClient.setQueryData<ModuleCache>(MODULE_KEYS.detail(updated.id), (old) => {
      if (!old) return { item: updated };
      return { ...old, item: updated };
    });
  },

  optimisticHardDelete(queryClient: QueryClient, id: string) {
    const previous = queryClient.getQueriesData<ModulesCache>({
      queryKey: MODULE_KEYS.lists(),
    });

    queryClient.setQueriesData<ModulesCache>({ queryKey: MODULE_KEYS.lists() }, (old) => {
      if (!old) return old;
      return { ...old, items: old.items.filter((item) => item.id !== id) };
    });

    queryClient.removeQueries({ queryKey: MODULE_KEYS.detail(id) });

    return { previous };
  },

  rollback(queryClient: QueryClient, previous: any) {
    previous?.forEach(([key, data]: any) => {
      queryClient.setQueryData(key, data);
    });
  },
};
```

**Rules:**
- `optimisticUpdate` and `optimisticHardDelete` return `{ previous }` for rollback.
- `update` is also called in `onSuccess` to sync server truth after optimistic write.
- `rollback` is called in `onError` of every mutation that uses optimistic updates.

---

## 5. Hooks

### List hook (`hooks/use<Modules>.ts`)

Owns pagination and search state. Uses `useBuildQueryString` for filter/pagination params.

```ts
import { useBuildQueryString } from "@catering/react-query-builder";
import type { PaginationMeta } from "@catering/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks";
import * as moduleApi from "../api/<module>.api";
import { MODULE_KEYS } from "../queries/<module>.keys";

const DEFAULT_PAGINATION: PaginationMeta = {
  totalDocs: 0, limit: 10, hasPrevPage: false, hasNextPage: false,
  page: 1, totalPages: 1, prevPage: null, nextPage: null, pagingCounter: 1,
};

export const useModules = (tenantId?: string) => {
  const [search, setSearch] = useState("");
  const controller = useBuildQueryString(
    tenantId ? { required: { value: { tenantId } } } : undefined
  );
  const debouncedSearch = useDebounce(search, 500);
  const controllerRef = useRef(controller);

  const { data, isLoading } = useQuery({
    queryKey: MODULE_KEYS.lists(controller.query),
    queryFn: () => moduleApi.getModules(controller.getQueryString()),
  });

  useEffect(() => { controllerRef.current = controller; }, [controller]);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      controllerRef.current.handleSearch({ value: { clientSearch: debouncedSearch } });
    }
  }, [debouncedSearch]);

  return {
    ...controller,
    items: data?.items || [],
    pagination: data?.pagination ?? DEFAULT_PAGINATION,
    isLoading,
    onSearch: setSearch,
  };
};
```

### Single item hook (`hooks/use<Module>.ts`)

```ts
import { useQuery } from "@tanstack/react-query";
import * as moduleApi from "../api/<module>.api";
import { MODULE_KEYS } from "../queries/<module>.keys";

export const useModule = (id?: string) => {
  const { data, isLoading, ...query } = useQuery({
    queryKey: MODULE_KEYS.detail(id as string),
    queryFn: () => moduleApi.getModule(id as string),
    enabled: !!id,
  });

  return { item: data?.item, isGettingModule: isLoading, ...query };
};
```

### Create hook (`hooks/useCreate<Module>.ts`)

No optimistic update — invalidates list on settle.

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as moduleApi from "../api/<module>.api";
import { MODULE_KEYS } from "../queries/<module>.keys";
import type { moduleFormInput } from "../schemas/<module>.schema";

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: moduleApi.createModule,
    onError: (error: any) => { toast.error(error?.message || "Failed to create"); },
    onSuccess: ({ message }) => { toast.success(message); },
    onSettled: () => { queryClient.invalidateQueries({ queryKey: MODULE_KEYS.lists() }); },
  });

  const createItem = (data: moduleFormInput, callback?: () => void) => {
    mutation.mutate(data, { onSuccess: () => { callback?.(); } });
  };

  return { createItem, isCreating: mutation.isPending };
};
```

### Update hook (`hooks/useUpdate<Module>.ts`)

Optimistic update + rollback.

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as moduleApi from "../api/<module>.api";
import { moduleCache } from "../queries/<module>.cache";
import type { UpdateModuleInput } from "../schemas/<module>.schema";

export const useUpdateModule = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: moduleApi.updateModule,

    onMutate: async (vars) => {
      await queryClient.cancelQueries();
      return moduleCache.optimisticUpdate(queryClient, vars);
    },

    onError: (error: any, _vars, context) => {
      moduleCache.rollback(queryClient, context?.previous);
      toast.error(error?.message || "Failed to update");
    },

    onSuccess: ({ item: updated, message }) => {
      moduleCache.update(queryClient, updated);
      toast.success(message);
    },
  });

  const updateItem = (
    { id, payload }: { id: string; payload: Partial<UpdateModuleInput> },
    callback?: () => void,
  ) => {
    mutation.mutate({ id, payload }, { onSuccess: () => { callback?.(); } });
  };

  return { updateItem, isUpdating: mutation.isPending };
};
```

### Delete hook (`hooks/useHardDelete<Module>.ts`)

Optimistic delete + rollback.

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import * as moduleApi from "../api/<module>.api";
import { moduleCache } from "../queries/<module>.cache";

export const useHardDeleteModule = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => moduleApi.hardDeleteModule(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries();
      return moduleCache.optimisticHardDelete(queryClient, id);
    },

    onError: (error: any, _id, context) => {
      moduleCache.rollback(queryClient, context?.previous);
      toast.error(error?.message || "Failed to delete");
    },

    onSuccess: ({ message }) => { toast.success(message); },
  });

  const deleteItem = (id: string, callback?: () => void) => {
    mutation.mutate(id, { onSuccess: () => { callback?.(); } });
  };

  return { deleteItem, isDeleting: mutation.isPending };
};
```

### Barrel export (`hooks/index.ts`)

```ts
export * from "./useModules";
export * from "./useModule";
export * from "./useCreateModule";
export * from "./useUpdateModule";
export * from "./useHardDeleteModule";
```

---

## 6. Zustand Store (`store/useStore.ts`)

Manages **all** UI state. No async logic, no API calls.

```ts
import type { MODULE_STATUS_ENUM } from "@catering/types";
import { create } from "zustand";
import type { IModule } from "../schemas/<module>.schema";

type StatusFilter = "all" | (typeof MODULE_STATUS_ENUM)[keyof typeof MODULE_STATUS_ENUM];

type ModuleStoreState = {
  // Filter state
  query: string;
  statusFilter: StatusFilter;

  // Sheet / dialog visibility
  isCreateSheetOpen: boolean;
  isEditSheetOpen: boolean;
  isViewSheetOpen: boolean;
  isDeleteDialogOpen: boolean;

  // Selected items (one per interaction type)
  selectedItem: IModule | null;        // edit
  selectedViewItem: IModule | null;    // view
  selectedDeleteItem: IModule | null;  // delete

  // Setters
  setQuery: (query: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setCreateSheetOpen: (open: boolean) => void;
  setEditSheetOpen: (open: boolean) => void;
  setViewSheetOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;

  // Compound actions (open one, close others, set selection)
  openCreate: () => void;
  closeCreateSheet: () => void;
  openEdit: (item: IModule) => void;
  closeEditSheet: () => void;
  openView: (item: IModule) => void;
  closeViewSheet: () => void;
  openDeleteDialog: (item: IModule) => void;
  closeDeleteDialog: () => void;
};

export const useModulesStore = create<ModuleStoreState>((set) => ({
  query: "",
  statusFilter: "all",
  isCreateSheetOpen: false,
  isEditSheetOpen: false,
  isViewSheetOpen: false,
  isDeleteDialogOpen: false,
  selectedItem: null,
  selectedViewItem: null,
  selectedDeleteItem: null,

  setQuery: (query) => set({ query }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),

  setCreateSheetOpen: (open) => set({ isCreateSheetOpen: open }),

  setEditSheetOpen: (open) =>
    set((state) => ({
      isEditSheetOpen: open,
      selectedItem: open ? state.selectedItem : null,
    })),

  setViewSheetOpen: (open) =>
    set((state) => ({
      isViewSheetOpen: open,
      selectedViewItem: open ? state.selectedViewItem : null,
    })),

  setDeleteDialogOpen: (open) =>
    set((state) => ({
      isDeleteDialogOpen: open,
      selectedDeleteItem: open ? state.selectedDeleteItem : null,
    })),

  openCreate: () =>
    set({ isCreateSheetOpen: true, isEditSheetOpen: false, isViewSheetOpen: false,
          selectedItem: null, selectedViewItem: null }),

  closeCreateSheet: () => set({ isCreateSheetOpen: false }),

  openEdit: (item) =>
    set({ isEditSheetOpen: true, isCreateSheetOpen: false, isViewSheetOpen: false,
          selectedItem: item, selectedViewItem: null }),

  closeEditSheet: () => set({ isEditSheetOpen: false, selectedItem: null }),

  openView: (item) =>
    set({ isViewSheetOpen: true, isCreateSheetOpen: false, isEditSheetOpen: false,
          selectedViewItem: item, selectedItem: null }),

  closeViewSheet: () => set({ isViewSheetOpen: false, selectedViewItem: null }),

  openDeleteDialog: (item) => set({ isDeleteDialogOpen: true, selectedDeleteItem: item }),

  closeDeleteDialog: () => set({ isDeleteDialogOpen: false, selectedDeleteItem: null }),
}));
```

**Rules:**
- `open<Action>` always closes competing sheets — only one can be open at a time.
- `set<X>Open(false)` clears the corresponding `selected*` to null.
- Components read single selectors: `useModulesStore((state) => state.isCreateSheetOpen)`.
- Never use `useModulesStore.getState()` inside components — subscribe via selectors.

---

## 7. Components

### `index.tsx` — Page-level orchestrator

`"use client"` directive. Composes toolbar + table + all sheets/dialogs. Contains no business logic.

```tsx
"use client";

interface ModuleProps {
  title?: string;
  description?: string;
  tenantId?: string;
}

export const Module = ({ title, description, tenantId }: ModuleProps) => {
  const i18n = useModulesI18n();
  const { language } = useLanguage();
  const { items, pagination, onSearch, handleFilter, handlePagination } = useModules(tenantId);

  // Read from store via individual selectors
  const isCreateSheetOpen = useModulesStore((state) => state.isCreateSheetOpen);
  const isEditSheetOpen = useModulesStore((state) => state.isEditSheetOpen);
  const isViewSheetOpen = useModulesStore((state) => state.isViewSheetOpen);
  const selectedItem = useModulesStore((state) => state.selectedItem);
  const selectedViewItem = useModulesStore((state) => state.selectedViewItem);
  const setCreateSheetOpen = useModulesStore((state) => state.setCreateSheetOpen);
  const setEditSheetOpen = useModulesStore((state) => state.setEditSheetOpen);
  const setViewSheetOpen = useModulesStore((state) => state.setViewSheetOpen);
  const closeCreateSheet = useModulesStore((state) => state.closeCreateSheet);
  const closeViewSheet = useModulesStore((state) => state.closeViewSheet);
  const { createItem } = useCreateModule();

  return (
    <section className="space-y-4" aria-labelledby="module-title">
      <If expression={!!title && !!description}>
        <SectionHeader title={i18n.title} description={i18n.description} />
      </If>

      <Card>
        <CardHeader className="space-y-3">
          <TableToolbar
            onSearch={onSearch}
            onFilterChange={(value) => handleFilter({ value })}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <ModuleTable data={items} pagination={pagination} handlePaginate={handlePagination} />
        </CardContent>
      </Card>

      {/* Create sheet */}
      <Sheet open={isCreateSheetOpen} onOpenChange={setCreateSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>{i18n.form.createTitle}</SheetTitle>
            <SheetDescription>{i18n.form.createDescription}</SheetDescription>
          </SheetHeader>
          <ModuleForm
            key={`${language}-create`}
            onSubmit={(values) => createItem(values, closeCreateSheet)}
            submitLabel={i18n.form.submitCreate}
          />
        </SheetContent>
      </Sheet>

      {/* Edit sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="w-full overflow-hidden sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>{i18n.form.editTitle}</SheetTitle>
            <SheetDescription>{i18n.form.editDescription}</SheetDescription>
          </SheetHeader>
          {selectedItem && <UpdateModule selectedItem={selectedItem} />}
        </SheetContent>
      </Sheet>

      {/* View sheet */}
      <Sheet open={isViewSheetOpen} onOpenChange={(open) => (open ? setViewSheetOpen(true) : closeViewSheet())}>
        <SheetContent side="right" className="w-full overflow-auto sm:!max-w-[880px]">
          <SheetHeader>
            <SheetTitle>{i18n.details.title}</SheetTitle>
            <SheetDescription>{i18n.details.viewDescription}</SheetDescription>
          </SheetHeader>
          <If expression={!!selectedViewItem} fallback={<p className="text-sm text-muted-foreground">{i18n.details.noItem}</p>}>
            {selectedViewItem && <ModuleDetails id={selectedViewItem.id} />}
          </If>
        </SheetContent>
      </Sheet>

      <DeleteConfirmation />
    </section>
  );
};
```

### `table-toolbar.tsx`

Reads `statusFilter` and `openCreate` from store. Fires `onSearch` / `onFilterChange` callbacks to the list hook.

```tsx
interface TableToolbarProps {
  onSearch: (value: string) => void;
  onFilterChange: (value: Record<string, string>) => void;
}
```

- Search: `<Input onChange={(e) => onSearch(e.target.value)} />`
- Filter: `<DropdownMenuCheckboxItem>` per status enum value, calls `setStatusFilter` + `onFilterChange`.
- Reset button: sets `statusFilter` back to `"all"` and calls `onFilterChange({})`.
- Create button: wrapped in `<Can I={AbilityAction.CREATE} a={ModuleAuthZEntity}>`, calls `openCreate`.

### `row-actions.tsx`

Reads `openView`, `openEdit`, `openDeleteDialog` from store.

```tsx
interface RowActionsProps { item: IModule; }
```

- Trigger: ghost icon button, `aria-label` uses `interpolate(i18n.actions.openActionsFor, { name: item.name })`.
- Menu items: VIEW, EDIT, DELETE — each wrapped in `<Can>` with appropriate `AbilityAction`.
- DELETE item has `variant="destructive"`.

### `<module>-table.tsx`

Uses shared `<DataTable>` with typed `DataTableColumn<IModule>[]`.

```tsx
interface ModuleTableProps {
  data: IModule[];
  pagination: PaginationMeta;
  handlePaginate?: (page: number, limit: number) => void;
}
```

- Column `cell` for name: clickable button that calls `openView(item)` from store.
- Status column: `<Badge variant="outline" className={getModuleStatusBadgeStyles(item.status)}>`.
- Last column is always `id: "actions"` rendering `<RowActions item={item} />`.
- `emptyState` prop: icon + i18n empty message.

### `update-<module>.tsx`

Fetches fresh data before rendering form.

```tsx
interface UpdateModuleProps { selectedItem: IModule; }

export const UpdateModule = ({ selectedItem }: UpdateModuleProps) => {
  const { item, isGettingModule } = useModule(selectedItem.id);
  const { updateItem } = useUpdateModule();
  const closeEditSheet = useModulesStore((state) => state.closeEditSheet);
  const { language } = useLanguage();
  const i18n = useModulesI18n();

  return (
    <If expression={!isGettingModule} fallback={<Loader />}>
      <ModuleForm
        key={`${language}-edit`}
        onSubmit={(values) => updateItem({ id: selectedItem.id, payload: values }, closeEditSheet)}
        initialValues={item}
        submitLabel={i18n.form.submitSave}
      />
    </If>
  );
};
```

### `delete-confirmation.tsx`

`"use client"` — needs local state for the confirmation input.

```tsx
export const DeleteConfirmation = () => {
  const [confirmText, setConfirmText] = useState("");
  const i18n = useModulesI18n();
  const { deleteItem } = useHardDeleteModule();
  const isDeleteDialogOpen = useModulesStore((state) => state.isDeleteDialogOpen);
  const selectedDeleteItem = useModulesStore((state) => state.selectedDeleteItem);
  const setDeleteDialogOpen = useModulesStore((state) => state.setDeleteDialogOpen);
  const closeDeleteDialog = useModulesStore((state) => state.closeDeleteDialog);
  const isDeleteEnabled = confirmText === i18n.delete.confirmKeyword;

  useEffect(() => {
    if (!isDeleteDialogOpen) setConfirmText("");
  }, [isDeleteDialogOpen]);

  const onConfirmDelete = () => {
    if (!selectedDeleteItem || !isDeleteEnabled) return;
    deleteItem(selectedDeleteItem.id, () => {
      setConfirmText("");
      closeDeleteDialog();
    });
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{i18n.delete.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedDeleteItem
              ? interpolate(i18n.delete.confirmMessage, { name: selectedDeleteItem.name })
              : i18n.delete.confirmMessageGeneric}
          </AlertDialogDescription>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              {i18n.delete.confirmText.split(i18n.delete.confirmKeyword)[0]}
              <span className="font-medium text-foreground">{i18n.delete.confirmKeyword}</span>
              {i18n.delete.confirmText.split(i18n.delete.confirmKeyword)[1]}
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={i18n.delete.confirmKeyword}
              autoComplete="off"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{i18n.delete.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete} disabled={!isDeleteEnabled}>
            {i18n.delete.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
```

---

## 8. i18n (`lib/<module>-i18n.ts`)

All strings for one module in a single file. Two languages minimum (en, bn).

```ts
type ModuleContent = {
  title: string;
  description: string;
  toolbar: { searchPlaceholder: string; filter: string; status: string; resetFilters: string; createItem: string; };
  table: { name: string; status: string; lastUpdated: string; actions: string; idLabel: string; noItems: string; };
  details: { title: string; viewDescription: string; noItem: string; /* ... */ };
  form: {
    createTitle: string; createDescription: string;
    editTitle: string; editDescription: string;
    submitCreate: string; submitSave: string;
    validation: ModuleValidationMessages;
  };
  delete: {
    title: string;
    confirmMessage: string;       // supports {{name}} interpolation
    confirmMessageGeneric: string;
    confirmText: string;          // "Type <keyword> to confirm."
    confirmKeyword: string;       // e.g. "delete-module"
    cancel: string; confirm: string;
  };
  actions: {
    view: string; edit: string; delete: string;
    openActionsFor: string; // supports {{name}} interpolation
  };
};

const content: Record<string, ModuleContent> = { en: { ... }, bn: { ... } };

export const useModulesI18n = () => {
  const { language } = useLanguage();
  return content[language] ?? content.en;
};

export const getModulesContent = (lang: string) => content[lang] ?? content.en;

// Template interpolation: "Hello {{name}}" + { name: "World" } → "Hello World"
export const interpolate = (str: string, values: Record<string, string>): string =>
  str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
```

---

## 9. Badge styles (`lib/badge.ts`)

```ts
import { MODULE_STATUS_ENUM } from "@catering/types";

export const getModuleStatusBadgeStyles = (status: MODULE_STATUS_ENUM) => {
  switch (status) {
    case MODULE_STATUS_ENUM.ACTIVE:
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    case MODULE_STATUS_ENUM.INACTIVE:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    default:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  }
};
```

---

## 10. Authorization

Use `<Can>` from `@/authz/ability-context` to gate UI:

```tsx
import { ModuleAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { Can } from "@/authz/ability-context";

// Create button in toolbar
<Can I={AbilityAction.CREATE} a={ModuleAuthZEntity}>
  <Button onClick={openCreate}>Create</Button>
</Can>

// Row actions
<Can I={AbilityAction.READ} a={ModuleAuthZEntity}> ... </Can>
<Can I={AbilityAction.UPDATE} a={ModuleAuthZEntity}> ... </Can>
<Can I={AbilityAction.HARD_DELETE} a={ModuleAuthZEntity}> ... </Can>
```

---

## Data Flow

```
TableToolbar
  onSearch(value) ──────────────────────► useModules: setSearch → debouncedSearch → controller.handleSearch
  onFilterChange({ status }) ───────────► useModules: controller.handleFilter

useModules ───────────────────────────────► React Query: MODULE_KEYS.lists(controller.query)
                                            ► moduleApi.getModules(controller.getQueryString())

ModuleTable
  openView(item) ───────────────────────► store: isViewSheetOpen=true, selectedViewItem=item
  RowActions.openEdit(item) ────────────► store: isEditSheetOpen=true, selectedItem=item
  RowActions.openDeleteDialog(item) ────► store: isDeleteDialogOpen=true, selectedDeleteItem=item

Sheet (create) ───────────────────────► ModuleForm → useCreateModule.createItem() → invalidateQueries
Sheet (edit) ────────────────────────► UpdateModule → useModule(id) → ModuleForm → useUpdateModule.updateItem()
                                                       optimisticUpdate → onSuccess: cache.update
Sheet (view) ────────────────────────► ModuleDetails → useModule(id)
AlertDialog (delete) ────────────────► DeleteConfirmation → useHardDeleteModule.deleteItem()
                                                             optimisticHardDelete → onSuccess: toast
```

---

## Checklist for Refactoring a Module

- [ ] Rename all `Package`/`package` occurrences to the new domain entity name
- [ ] Update API endpoints in `api/<module>.api.ts`
- [ ] Update `schemas/<module>.schema.ts` — domain fields, validation rules, API envelopes
- [ ] Update `queries/<module>.keys.ts` — change the root key string `["packages"]`
- [ ] Update `queries/<module>.cache.ts` — adjust field names used in optimistic updates
- [ ] Update `store/useStore.ts` — adjust `StatusFilter` type to the new enum
- [ ] Update i18n content in `lib/<module>-i18n.ts` — all section keys + both languages
- [ ] Update `lib/badge.ts` — map new status enum values to Tailwind classes
- [ ] Update `lib/utils.ts` — replace computed fields with module-specific aggregations
- [ ] Update all `<Can>` checks to the new `AuthZEntity` from `@catering/authz`
- [ ] Update `index.tsx` component name and props interface
- [ ] Update column definitions in `<module>-table.tsx` to reflect new fields
- [ ] Verify `delete.confirmKeyword` in i18n matches the new module (e.g., `"delete-order"`)
