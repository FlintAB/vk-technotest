import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React from "react";
import { columns, createDynamicColumns } from "../columns/columns";
import type { TObjective } from "../../types/ObjectiveTable";


function App() {
  const [data, setData] = React.useState<TObjective[]>([]);
  const [dynamicColumns, setDynamicColumns] = React.useState<any[]>([]);

  const table = useReactTable({data, columns: [...columns, ...dynamicColumns], getCoreRowModel: getCoreRowModel()});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/objectives');
        const serverData = await response.json();
        
        const formattedData = serverData.map((item: any) => ({
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
          border: '1px solid black'
        }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{borderRight: 'solid'}}>
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
        <tbody style={{borderStyle: 'solid'}}>
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
