import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableRNR,
  TableRow,
} from "~/components/ui/table";

import { DimensionValue } from "react-native";

import { FlashList } from "@shopify/flash-list";

export default function Table({
  columns,
  items,
  rowHeight,
  className,
  state_key,
  flashListProps,
  ...props
}: {
  columns: { key: string; label: any; width?: string | number }[];
  items: { [key: string]: any }[];
  rowHeight?: number;
  className?: string;
  state_key?: number;
  flashListProps?: { [key: string]: any };
  [key: string]: any;
}) {
  return (
    <TableRNR className={`px-2 pt-2 rounded-xl ${className}`} {...props}>
      <TableHeader>
        <TableRow className="items-center h-14 rounded-md bg-slate-100 border-0">
          {columns.map((column) => (
            <TableHead
              key={column.key}
              style={{ width: (column.width as DimensionValue) || 100 }}
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <FlashList
          data={items}
          estimatedItemSize={50}
          key={state_key}
          renderItem={({ item }) => {
            return (
              <TableRow
                key={item.key}
                className="items-center border-0"
                style={{ height: rowHeight || 64 }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    style={{ width: (column.width as DimensionValue) || 100 }}
                  >
                    {item[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          }}
          {...flashListProps}
        />
      </TableBody>
    </TableRNR>
  );
}
