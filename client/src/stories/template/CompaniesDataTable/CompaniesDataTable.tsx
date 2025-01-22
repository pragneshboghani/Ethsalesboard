import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  SortingState,
  PaginationState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Console } from "console";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies, resetState } from "@/redux/slices/companySlice";
import { AppDispatch } from "@/redux/store";

import { Linkedin, Instagram, Facebook, OctagonX } from "lucide-react";

export type ICompany = {
  index: number;
  categoriesId: string;
  page: number;
  companyName: string;
  totalEarning: string;
  hrRate: string;
  employees: string;
  location: string;
  LinkedIn: string;
  Facebook: string;
  Twitter: string;
  Instagram: string;
  address: string;
  website: string;
  phone_number: string;
  business: string;
  Tel: string[];
  mail: string[];
  isMailSend: boolean;
  isError: boolean;
  errorMessage?: string;
  categoriesIds: string[];
  categories: { category: string; subcategory: string }[];
};

export const columns: ColumnDef<ICompany>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => {
      const website = row.original.website;
      const companyName = row.original.companyName;
      return (
        <a
          href={`https://${website}`}
          target="_blank"
          rel="noopener noreferrer">
          {companyName || "No Company Name"}
        </a>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "totalEarning",
    header: "Total Earning",
    cell: ({ row }) => <div>{row.getValue("totalEarning")}</div>,
  },
  {
    accessorKey: "hrRate",
    header: "Hourly Rate",
    cell: ({ row }) => <div>{row.getValue("hrRate")}</div>,
  },
  {
    accessorKey: "employees",
    header: "Employees",
    cell: ({ row }) => <div>{row.getValue("employees")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
  },
  {
    accessorKey: "business",
    header: "Business",
    cell: ({ row }) => <div>{row.getValue("business")}</div>,
  },
  {
    accessorKey: "mail",
    header: "Mail",
    cell: ({ row }) => {
      const mails = row.getValue("mail") as string[];
      return (
        <div className="flex flex-col gap-1">
          {mails.length > 0 ? (
            mails.map((_m) => <span>{_m}</span>)
          ) : (
            <OctagonX />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories = row.getValue("categories") as {
        category: string;
        subcategory: string;
      }[];
      return (
        <div>
          {categories.map((cat, index) => (
            <div key={index}>
              {cat.category} - {cat.subcategory}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "LinkedIn",
    header: "LinkedIn",
    cell: ({ row }) => <div>{row.getValue("LinkedIn") || "Not found"}</div>,
  },
  {
    accessorKey: "Facebook",
    header: "Facebook",
    cell: ({ row }) => <div>{row.getValue("Facebook") || "Not found"}</div>,
  },
  {
    accessorKey: "Twitter",
    header: "Twitter",
    cell: ({ row }) => <div>{row.getValue("Twitter") || "Not found"}</div>,
  },
  {
    accessorKey: "Instagram",
    header: "Instagram",
    cell: ({ row }) => <div>{row.getValue("Instagram") || "Not found"}</div>,
  },
  {
    accessorKey: "webFacebook",
    header: "Facebook Links",
    cell: ({ row }) => {
      const links = row.getValue("webFacebook") as string[];
      return (
        <div>
          {links.map((link, index) => (
            <div key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Facebook />
              </a>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "webInstagram",
    header: "Instagram Links",
    cell: ({ row }) => {
      const links = row.getValue("webInstagram") as string[];
      return (
        <div>
          {links.map((link, index) => (
            <div key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Instagram />
              </a>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "webLinkedin",
    header: "LinkedIn Links",
    cell: ({ row }) => {
      const links = row.getValue("webLinkedin") as string[];
      return links.length > 0 ? (
        <div>
          {links.map((link, index) => (
            <div key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Linkedin />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <OctagonX />
        </div>
      );
    },
  },
  {
    accessorKey: "webTwitter",
    header: "Twitter Links",
    cell: ({ row }) => {
      const links = row.getValue("webTwitter") as string[];
      return links.length > 0 ? (
        <div>
          {links.map((link, index) => (
            <div key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <OctagonX />
        </div>
      );
    },
  },
];

interface CompaniesDataTableProps {
  id: string;
}

function Searchbar({
  value: initialValue,
  onChange,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  //if the entered value changes, run the onChange handler once again.
  React.useEffect(() => {
    onChange(value);
  }, [value]);
  //render the basic searchbar:
  return (
    <Input
      placeholder="Filter..."
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export function CompaniesDataTable({ id }: CompaniesDataTableProps) {
  const dispatch: AppDispatch = useDispatch();
  const {
    companies: data,
    categoriesId,
    loading,
    totalCount,
  } = useSelector((state: { company: any }) => state.company);
  // console.log("data::", data);
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "age",
      desc: true,
    },
  ]);

  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: ["select", "companyName"],
    right: ["webLinkedin"],
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 1, //initial page index
    pageSize: 100, //default page size
  });

  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >({
    categoriesId: false,
    page: false,
    website: true,
    companyName: true,
    location: true,
    Tel: true,
    mail: true,
    address: true,
    totalEarning: false,
    hrRate: false,
    employees: true,
    LinkedIn: false,
    Facebook: false,
    Twitter: false,
    Instagram: false,
    phone_number: true,
    business: false,
    errorMessage: false,
    categoriesIds: false,
    categories: false,
    webFacebook: false,
    webInstagram: false,
    webTwitter: false,
  });
  // console.log("data", pagination);

  const [globalFilter, setGlobalFilter] = React.useState("");
  // console.log("globalFilter::::", globalFilter);
  // const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
  //   left: [],
  //   right: [],
  // });
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    if (categoriesId !== id && categoriesId !== null) {
      dispatch(resetState());
      dispatch(
        fetchCompanies({
          categoriesId: id,
          size: pagination.pageSize,
          page: pagination.pageIndex,
          searchString: globalFilter,
        })
      );
    } else {
      dispatch(
        fetchCompanies({
          categoriesId: id,
          size: pagination.pageSize,
          page: pagination.pageIndex,
          searchString: globalFilter,
        })
      );
    }
  }, [id, pagination, globalFilter]);

  // pagination

  const totalPages = React.useMemo(() => {
    return Math.ceil(totalCount / pagination.pageSize);
  }, [pagination.pageSize, totalCount]); // Calculate total pages

  // Function to generate page numbers
  const generatePageNumbers = (): (number | "ellipsis")[] => {
    const pageNumbers: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      // Show all pages if total pages <= 5
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Handle truncation for large page numbers
      if (pagination.pageIndex <= 3) {
        pageNumbers.push(1, 2, 3, 4, "ellipsis", totalPages);
      } else if (pagination.pageIndex >= totalPages - 2) {
        pageNumbers.push(
          1,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "ellipsis",
          pagination.pageIndex - 1,
          pagination.pageIndex,
          pagination.pageIndex + 1,
          "ellipsis",
          totalPages
        );
      }
    }

    return pageNumbers;
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    rowCount: totalCount,
    filterFns: {},
    manualPagination: true,
    pageCount: totalPages,
    onColumnPinningChange: setColumnPinning,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
      columnPinning,
    },
    // initialState: {
    //   columnOrder: ["select", "companyName", "location"]
    //   expanded: true, //expand all rows by default
    //   sorting: [
    //     {
    //       id: "age",
    //       desc: true, //sort by age in descending order by default
    //     },
    //   ],
    // },
  });

  return (
    <div className="w-full min-h-[80%]">
      <div className="flex items-center py-4">
        <Searchbar
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-y-auto relative">
        <Table style={{ width: "100%", borderCollapse: "collapse" }}>
          <TableHeader
            className="bg-black text-white "
            style={{ position: "sticky", top: 0, zIndex: 10 }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        background: "white",
                      }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination className="p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <PaginationContent>
          <Select
            value={pagination.pageSize?.toString()}
            onValueChange={(value) => {
              setPagination({ ...pagination, pageSize: Number(value) });
            }}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: 15 }, (_, i) => (i + 1) * 10).map(
                  (size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              isActive={!table.getCanPreviousPage()}
            />
          </PaginationItem>

          {generatePageNumbers().map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => table.setPageIndex(page)}
                  isActive={pagination.pageIndex === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              isActive={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
