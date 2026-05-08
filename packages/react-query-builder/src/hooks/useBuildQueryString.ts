import React from "react";

const DEFAULT_LIMIT = 10;

interface QueryState {
  required: string;
  filter: string;
  search: string;
  pagination: string;
}

export interface InitialProps {
  required?: {
    [key: string]: any;
  };
  filter?: {
    [key: string]: any;
  };
  search?: {
    [key: string]: any;
  };
  pagination?: {
    [key: string]: any;
  };
}

type GetQueryFn = () => string;

export interface QueryHandlers {
  query: object;
  toolState: {
    required?: {
      [key: string]: any;
    };
    filter?: {
      [key: string]: any;
    };
    search?: {
      [key: string]: any;
    };
    pagination?: {
      [key: string]: any;
    };
  };
  fullReset: () => void;
  getQuery: GetQueryFn;
  getQueryString: GetQueryFn;
  handleFilter: (filterQuery: { value: object }) => void;
  handlePagination: (page?: number, limit?: number) => void;
  handleSearch: (searchQuery: { value: object }) => void;
  handleRequired: (requiredQuery: { value: object }) => void;
}

const isObject = (object: any): boolean => {
  return object !== null && typeof object === "object";
};

const objectToQuery = (object: any): string => {
  if (!object) return "";
  const queryBucket: string[] = [];

  const dig = (obj: any, build = "") => {
    if (!isObject(obj)) {
      queryBucket.push(`${build}=${encodeURIComponent(obj)}`);
      return;
    }

    const keys = Object.keys(obj);
    for (const key of keys) {
      const attach = !build ? key : !Array.isArray(obj) ? `[${key}]` : `[]`;
      dig(obj[key], build + attach);
    }
  };

  dig(object);
  return queryBucket.join("&");
};

const formatString = (str: string): string => (str ? `&${str}` : str);

export function useBuildQueryString(initial?: InitialProps): QueryHandlers {
  let pageKey = "page";
  let limitKey = "limit";

  if (initial?.pagination && isObject(initial.pagination)) {
    const keys = Object.keys(initial.pagination);
    if (keys[0]) pageKey = keys[0];
    if (keys[1]) limitKey = keys[1];
  }

  const buildDefaultState = (): QueryState => ({
    required: initial?.required ? objectToQuery(initial.required.value) : "",
    filter: initial?.filter ? objectToQuery(initial.filter.value) : "",
    search: initial?.search ? objectToQuery(initial.search.value) : "",
    pagination: objectToQuery({
      [pageKey]: initial?.pagination?.[pageKey] || 1,
      [limitKey]: initial?.pagination?.[limitKey] || DEFAULT_LIMIT,
    }),
  });

  const buildInitialToolState = () => ({
    filter: initial?.filter || {},
    required: initial?.required || {},
    search: initial?.search || {},
    pagination: {
      [pageKey]: initial?.pagination?.[pageKey] || 1,
      [limitKey]: initial?.pagination?.[limitKey] || DEFAULT_LIMIT,
    },
  });

  const [query, setQuery] = React.useState<QueryState>(buildDefaultState());
  const [toolState, setToolState] = React.useState(buildInitialToolState());

  const fullReset = () => {
    setQuery(buildDefaultState());
    setToolState(buildInitialToolState());
  };

  const getQueryString = (): string => {
    let processedString = "";
    const keys: Array<keyof QueryState> = ["required", "filter", "search", "pagination"];

    for (const key of keys) {
      processedString = processedString ? processedString + formatString(query[key]) : query[key];
    }

    return processedString;
  };

  const updateState = <T extends keyof typeof toolState>(key: T, value: (typeof toolState)[T]) => {
    setToolState((prev) => ({
      ...JSON.parse(JSON.stringify(prev)),
      [key]: value,
    }));
  };

  const updateQueryState = (updates: Partial<typeof query>) => {
    setQuery((prev) => ({
      ...JSON.parse(JSON.stringify(prev)),
      ...updates,
    }));
  };

  const handleRequired = (requiredQuery: { value: object }) => {
    updateQueryState({
      required: objectToQuery(requiredQuery.value),
      pagination: objectToQuery({
        [pageKey]: 1,
        [limitKey]: toolState.pagination[limitKey],
      }),
    });

    updateState("required", requiredQuery);
    updateState("pagination", { [pageKey]: 1, [limitKey]: DEFAULT_LIMIT });
  };

  const handleFilter = (filterQuery: { value: object }) => {
    updateQueryState({
      filter: objectToQuery(filterQuery.value),
      pagination: objectToQuery({
        [pageKey]: 1,
        [limitKey]: toolState.pagination[limitKey],
      }),
    });

    updateState("filter", filterQuery);
    updateState("pagination", {
      [pageKey]: 1,
      [limitKey]: toolState.pagination[limitKey],
    });
  };

  const handlePagination = (page: number = 1, limit?: number) => {
    const newLimit = limit || toolState.pagination[limitKey] || DEFAULT_LIMIT;

    updateQueryState({
      pagination: objectToQuery({
        [pageKey]: page,
        [limitKey]: newLimit,
      }),
    });

    updateState("pagination", {
      [pageKey]: page,
      [limitKey]: newLimit,
    });
  };

  const handleSearch = (searchQuery: { value: object }) => {
    updateQueryState({
      search: objectToQuery(searchQuery.value),
      pagination: objectToQuery({
        [pageKey]: 1,
        [limitKey]: toolState.pagination[limitKey],
      }),
    });

    updateState("search", searchQuery);
    updateState("pagination", {
      [pageKey]: 1,
      [limitKey]: toolState.pagination[limitKey],
    });
  };

  return {
    query,
    toolState,
    fullReset,
    getQuery: getQueryString,
    getQueryString,
    handleFilter,
    handlePagination,
    handleSearch,
    handleRequired,
  };
}
