import { 
   flexRender, 
   getCoreRowModel, 
   useReactTable 
} from "@tanstack/react-table";
import type { TObjective } from "../../types/ObjectiveTable";
import type { ObjectiveTableProps } from "../../types/tableProps";



export const ObjectiveTable = ({ data, columns }: ObjectiveTableProps) => {
   const table = useReactTable<TObjective>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel()
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
               <th key={header.id} style={{border: 'solid black'}}>
                  {header.isPlaceholder
                  ? null
                  : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                     )}
               </th>
            ))}
            </tr>
         ))}
      </thead>
      <tbody style={{border: 'solid'}}>
         {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
               <td key={cell.id} style={{borderRight: 'solid', borderBottom: 'solid'}}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
               </td>
            ))}
            </tr>
         ))}
      </tbody>
      </table>
   );
};