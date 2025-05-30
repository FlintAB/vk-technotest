import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import type { TObjective } from "../../types/Types";
import type { ExtendedObjectiveTableProps } from "../../types/Props";

export const ObjectiveTable = ({ data, columns, addedFieldKeys, onRemoveField }: ExtendedObjectiveTableProps) => {
  const table = useReactTable<TObjective>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{ 
      width: '100%', 
      borderCollapse: 'collapse', 
      marginTop: '20px', 
      textAlign: 'center', 
    }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} style={{ border: 'solid black', position: 'relative' }}>
                {header.isPlaceholder
                  ? null
                  : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                          style={{
                            marginTop: '5px',
                            padding: '2px 6px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
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
      <tbody style={{ border: 'solid' }}>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} style={{ borderRight: 'solid', borderBottom: 'solid' }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};