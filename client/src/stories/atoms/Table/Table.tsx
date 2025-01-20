import * as React from "react";
import {
  Table as UITable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Table = ({ headers, data, topHeaderText }) => {
  return (
    <div>
      <UITable className="rounded-2xl overflow-hidden bg-white">
        {topHeaderText && (
          <TableHeader className="bg-grey-100 ">
            <TableRow>
              <TableHead
                colSpan={12}
                className="px-4 py-2   text-caption font-sans text-grey-600 font-normal"
              >
                {topHeaderText}
              </TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableHeader className="bg-grey-100">
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                colSpan={header?.colSpan}
                key={index}
                className={`px-4 py-2 ${
                  topHeaderText ? "border-y" : "border-b"
                }   ${
                  index !== 0 ? "border-l" : ""
                } text-caption font-sans text-grey-600 font-normal`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, colIndex) => (
                <TableCell
                  colSpan={header?.colSpan}
                  key={colIndex}
                  className={`px-4 text-body-small font-inter py-2  ${
                    colIndex !== 0 ? "border-l" : ""
                  }`}
                >
                  {header.render
                    ? header.render(row[header.key], row)
                    : row[header.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </UITable>
    </div>
  );
};

export default Table;
