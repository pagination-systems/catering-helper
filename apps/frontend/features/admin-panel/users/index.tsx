"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type UserRole = "Owner" | "Admin" | "Manager" | "Support";
type UserStatus = "Active" | "Pending" | "Suspended";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
};

const roles: UserRole[] = ["Owner", "Admin", "Manager", "Support"];
const statuses: UserStatus[] = ["Active", "Pending", "Suspended"];

const initialUsers: UserRecord[] = [
  {
    id: "usr_1001",
    name: "Rahim Uddin",
    email: "rahim@catering.com",
    role: "Owner",
    status: "Active",
    lastActive: "2h ago",
  },
  {
    id: "usr_1002",
    name: "Nusrat Jahan",
    email: "nusrat@catering.com",
    role: "Admin",
    status: "Active",
    lastActive: "1d ago",
  },
  {
    id: "usr_1003",
    name: "Tariq Hasan",
    email: "tariq@catering.com",
    role: "Manager",
    status: "Pending",
    lastActive: "3d ago",
  },
  {
    id: "usr_1004",
    name: "Farhana Akter",
    email: "farhana@catering.com",
    role: "Support",
    status: "Suspended",
    lastActive: "1w ago",
  },
  {
    id: "usr_1005",
    name: "Mim Sultana",
    email: "mim@catering.com",
    role: "Manager",
    status: "Active",
    lastActive: "5h ago",
  },
  {
    id: "usr_1006",
    name: "Adnan Mahmud",
    email: "adnan@catering.com",
    role: "Support",
    status: "Pending",
    lastActive: "9h ago",
  },
  {
    id: "usr_1007",
    name: "Ayesha Rahman",
    email: "ayesha@catering.com",
    role: "Admin",
    status: "Active",
    lastActive: "4h ago",
  },
  {
    id: "usr_1008",
    name: "Sajid Karim",
    email: "sajid@catering.com",
    role: "Manager",
    status: "Active",
    lastActive: "2d ago",
  },
  {
    id: "usr_1009",
    name: "Nazmul Islam",
    email: "nazmul@catering.com",
    role: "Support",
    status: "Pending",
    lastActive: "6d ago",
  },
  {
    id: "usr_1010",
    name: "Jannat Ara",
    email: "jannat@catering.com",
    role: "Admin",
    status: "Suspended",
    lastActive: "2w ago",
  },
  {
    id: "usr_1011",
    name: "Shabab Khan",
    email: "shabab@catering.com",
    role: "Manager",
    status: "Active",
    lastActive: "7h ago",
  },
  {
    id: "usr_1012",
    name: "Riya Chowdhury",
    email: "riya@catering.com",
    role: "Support",
    status: "Active",
    lastActive: "1h ago",
  },
];

const createUserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  role: z.enum(roles),
  status: z.enum(statuses),
});

type CreateUserValues = z.infer<typeof createUserSchema>;

function getStatusClassName(status: UserStatus) {
  if (status === "Active") return "bg-emerald-100 text-emerald-700";
  if (status === "Pending") return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

export function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<UserStatus[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Manager",
      status: "Active",
    },
  });

  const filteredUsers = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesQuery =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.id.toLowerCase().includes(searchValue);

      const matchesRole = !selectedRoles.length || selectedRoles.includes(user.role);
      const matchesStatus = !selectedStatuses.length || selectedStatuses.includes(user.status);

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [query, selectedRoles, selectedStatuses, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedUsers = filteredUsers.slice((safePage - 1) * pageSize, safePage * pageSize);
  const firstRowIndex = filteredUsers.length ? (safePage - 1) * pageSize + 1 : 0;
  const lastRowIndex = Math.min(safePage * pageSize, filteredUsers.length);

  const toggleRole = (role: UserRole) => {
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((item) => item !== role) : [...prev, role]));
    setPage(1);
  };

  const toggleStatus = (status: UserStatus) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status]));
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedRoles([]);
    setSelectedStatuses([]);
    setPage(1);
  };

  const onCreateUser = (values: CreateUserValues) => {
    const id = `usr_${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser: UserRecord = {
      id,
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      lastActive: "Just now",
    };

    setUsers((prev) => [newUser, ...prev]);
    setIsCreateOpen(false);
    form.reset({
      name: "",
      email: "",
      role: "Manager",
      status: "Active",
    });
    setPage(1);
  };

  return (
    <section className="space-y-4" aria-labelledby="users-title">
      <header className="space-y-1">
        <h1 id="users-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Users
        </h1>
        <p className="text-sm text-muted-foreground">Manage roles, permissions, and team access.</p>
      </header>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[14rem] flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by name, email or id"
                className="pl-8"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" type="button">
                  <FilterIcon className="size-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Role</DropdownMenuLabel>
                {roles.map((role) => (
                  <DropdownMenuCheckboxItem
                    key={role}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => toggleRole(role)}
                  >
                    {role}
                  </DropdownMenuCheckboxItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => toggleStatus(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}

                <DropdownMenuSeparator />
                <div className="p-1">
                  <Button type="button" variant="ghost" size="sm" className="w-full" onClick={clearFilters}>
                    Reset Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button type="button" className="ml-auto" onClick={() => setIsCreateOpen(true)}>
              <PlusIcon className="size-4" />
              Create User
            </Button>
          </div>
          <CardDescription>
            Showing {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedUsers.length ? (
                pagedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.id}</div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusClassName(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Open actions for ${user.name}`}
                            >
                              <MoreHorizontalIcon className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>
                              <EyeIcon className="size-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <PencilIcon className="size-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              <Trash2Icon className="size-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <UsersIcon className="size-5" />
                      No users found for your current query and filters.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {firstRowIndex}-{lastRowIndex} of {filteredUsers.length}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm text-muted-foreground" htmlFor="users-page-size">
                Rows
              </label>
              <select
                id="users-page-size"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                className="h-8 rounded-lg border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {[5, 10, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={safePage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={safePage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Create User</SheetTitle>
            <SheetDescription>Add a team member and assign role access.</SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form className="grid gap-4 pt-2" onSubmit={form.handleSubmit(onCreateUser)} noValidate>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="h-8 w-full rounded-lg border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="h-8 w-full rounded-lg border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export { UsersPage as default };
