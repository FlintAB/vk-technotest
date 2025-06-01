import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import type {  TObjective } from "../../types/Types";
import type { ExtendedObjectiveTableProps } from "../../types/Props";
import styles from './ObjectiveTable.module.css';
import React from "react";

export const ObjectiveTable = React.memo(({ data, columns, addedFieldKeys, onRemoveField }: ExtendedObjectiveTableProps) => {
  const table = useReactTable<TObjective>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.tableWrapper}>
      <div className={`${styles.tableContainer} ${styles.syncScroll}`}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className={styles.headerCell} style={{width: header.getSize()}}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <div>
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {header.column.id.startsWith('dynamicFields.') &&
                            addedFieldKeys.includes(header.column.id.split('.')[1]) && (
                            <button
                              onClick={() => onRemoveField(header.column.id.split('.')[1])}
                              className={styles.removeButton}
                            >
                              Удалить поле
                            </button>
                          )}
                        </div>
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className={styles.row}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});