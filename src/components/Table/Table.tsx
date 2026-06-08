"use client";

import { clsx } from "clsx";
import { TableProps } from "./Table.types";

export function Table<T>({
  columns,
  data,
  onRowClick,
  keyExtractor,
  isLoading = false,
  emptyMessage = "No data available.",
  className,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-100 dark:bg-gray-800" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="flex items-center gap-4 px-6 py-4">
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className="h-4 flex-1 rounded bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider",
                    "text-gray-500 dark:text-gray-400",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={clsx(
                    "bg-white dark:bg-gray-900 transition-colors",
                    onRowClick &&
                      "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      onClick={
                        col.key === "actions"
                          ? (e) => e.stopPropagation()
                          : undefined
                      }
                      className={clsx(
                        "px-6 py-4 text-gray-700 dark:text-gray-300",
                        col.className
                      )}
                    >
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
