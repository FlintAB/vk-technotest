import React from 'react';
import { columns } from "../columns/columns";
import { createDynamicColumns } from "../../utils/createDynamicColumns";
import type { TObjectiveForm } from '../../schemas/Objective';
import type { TDynamicColumnDef } from '../../types/DynamicColumns';
import type { TObjective } from '../../types/ObjectiveTable';
import { ObjectiveForm } from '../form/objectiveForm';
import { ObjectiveTable } from '../table/objectiveTable';
import type { ColumnDef } from '@tanstack/react-table';

function App() {
  const [data, setData] = React.useState<TObjective[]>([]);
  const [dynamicColumns, setDynamicColumns] = React.useState<TDynamicColumnDef[]>([]);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/objectives');
        const serverData = await response.json();
        
        const formattedData = serverData.map((item: TObjective) => ({
          ...item,
          dateStart: new Date(item.dateStart),
          dateEnd: new Date(item.dateEnd),
          dynamicFields: item.dynamicFields || {},
        }));
        
        setData(formattedData);
        setDynamicColumns(createDynamicColumns(formattedData));
      } catch (error) {
        console.error('Ошибка при запросе данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddObjective = async (formData: TObjectiveForm) => {
    try {
      const response = await fetch('http://localhost:3001/objectives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dateStart: new Date(formData.dateStart),
          dateEnd: new Date(formData.dateEnd)
        }),
      });

      const newObjective = await response.json();
      const formattedObjective: TObjective = {
        ...newObjective,
        dateStart: new Date(newObjective.dateStart),
        dateEnd: new Date(newObjective.dateEnd),
        dynamicFields: newObjective.dynamicFields || {},
      }
      setData(prev => [...prev, formattedObjective]);
      setDynamicColumns(createDynamicColumns([...data, formattedObjective]));
      setShowForm(false);
    } catch (error) {
      console.error('Error adding objective:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => setShowForm(true)}
        style={{ 
          padding: '10px 15px',
          marginBottom: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add New Objective
      </button>

      {showForm ? (
        <ObjectiveForm 
          onSubmit={handleAddObjective} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        data.length === 0 ? (
          <div>Loading data...</div>
        ) : (
          <ObjectiveTable 
            data={data} 
            columns={[...columns, ...dynamicColumns] as ColumnDef<TObjective>[]} 
          />
        )
      )}
    </div>
  );
}

export default App;