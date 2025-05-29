import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React from "react";
import { columns } from "../columns/columns";
import type { TObjective } from "../../types/ObjectiveTable";
import type { TDynamicColumnDef } from "../../types/DynamicColumns";
import { createDynamicColumns } from "../../utils/createDynamicColumns";


function App() {
  const [data, setData] = React.useState<TObjective[]>([]);
  const [dynamicColumns, setDynamicColumns] = React.useState<TDynamicColumnDef[]>([]);

  const table = useReactTable<TObjective>({data, columns: [...columns, ...dynamicColumns], getCoreRowModel: getCoreRowModel()});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/objectives');
        const serverData = await response.json();
        
        const formattedData = serverData.map((item: TObjective) => ({
          ...item,
          dateStart: new Date(item.dateStart),
          dateEnd: new Date(item.dateEnd)
        }));
        
        setData(formattedData);
        setDynamicColumns(createDynamicColumns(formattedData));
      } catch (error) {
        console.error('Ошибка при запросе данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <div>Загрузка данных...</div>
      ) : (
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
      )}
    </div>
  );
}

export default App
