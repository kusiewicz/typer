import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  className?: string;
}

export const COLUMN_SIZES = {
  xs: "w-16", // 64px
  sm: "w-20", // 80px
  md: "w-24", // 96px
  lg: "w-32", // 128px
  xl: "w-40", // 160px
  "2xl": "w-48", // 192px

  grid1: "w-1/12", // 8.33%
  grid2: "w-2/12", // 16.67%
  grid3: "w-3/12", // 25%
  grid4: "w-4/12", // 33.33%
  grid5: "w-5/12", // 41.67%
  grid6: "w-6/12", // 50%
  grid7: "w-7/12", // 58.33%
  grid8: "w-8/12", // 66.67%
  grid9: "w-9/12", // 75%
  grid10: "w-10/12", // 83.33%
  grid11: "w-11/12", // 91.67%
  grid12: "w-full", // 100%
} as const;

export const Table = <TData,>({
  data,
  columns,
  className = "",
}: TableProps<TData>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div className={`relative overflow-x-auto ${className}`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-full table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sizeClass =
                  (header.column.columnDef.meta as any)?.sizeClass || "w-auto";

                return (
                  <th
                    scope="col"
                    className={`px-3 sm:px-4 md:px-6 py-3 relative ${sizeClass} whitespace-nowrap`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                const sizeClass =
                  (cell.column.columnDef.meta as any)?.sizeClass || "w-auto";

                return (
                  <td
                    key={cell.id}
                    className={`px-3 sm:px-4 md:px-6 py-4 ${sizeClass} break-words`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
