import React from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="mt-5 bg-slate-50 rounded-md p-8 w-full">
      <table {...getTableProps()} className="table w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={Math.random(9, 99999)}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={Math.random(9, 99999)}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-2 border-[1.5px] border-slate-300 bg-slate-200"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={Math.random(9, 99999)}
                {...row.getRowProps()}
                className=" even:bg-slate-100"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={Math.random(9, 99999)}
                      {...cell.getCellProps()}
                      className="p-2 border-[1.5px] border-slate-200 text-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex-center">
        <div className="mt-8 flex gap-4 items-center text-sm">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-2 bg-slate-700 rounded-md text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {page.length}
            </strong>{" "}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-2 bg-slate-700 rounded-md text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
