import type { ColumnDef } from "@tanstack/react-table";
import { useState, useRef, useCallback, useMemo } from "react";
import type { TObjectiveForm } from "../../schemas/Objective";
import { useColumns } from "../columns/columns";
import { AddFieldForm } from "../field/AddFieldForm";
import { ObjectiveForm } from "../form/AddObjectiveForm";
import { useObjectives } from "../hooks/useObjectives";
import { ObjectiveTable } from "../table/objectiveTable";
import type { TObjective } from "../../types/Types";
import styles from './App.module.css';


function App() {
  const [showForm, setShowForm] = useState(false);
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const {
    flatData,
    dynamicColumns,
    addedFieldKeys,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    handleAddObjective,
    handleAddField,
    handleRemoveField,
  } = useObjectives();

  const baseColumns = useColumns();
  const allColumns = useMemo(
    () => [...baseColumns, ...dynamicColumns],
    [baseColumns, dynamicColumns]
  );

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight > clientHeight &&
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, hasNextPage]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() => setShowForm(true)}
          className={styles.button}
        >
          Добавить новую запись
        </button>
        <button
          onClick={() => setShowAddField(true)}
          className={styles.button}
          disabled={dynamicColumns.length >= 15}
        >
          Добавить новое поле
        </button>
      </div>

      {showAddField && (
        <AddFieldForm
        newFieldKey={newFieldKey}
        setNewFieldKey={setNewFieldKey}
        onSubmit={async () => await handleAddField(newFieldKey)}
        onCancel={() => setShowAddField(false)}
        isDisabled={dynamicColumns.length >= 15 || !newFieldKey.trim() || dynamicColumns.some(col => col.id === `dynamicFields.${newFieldKey}`)}
        />
      )}

      {showForm ? (
        <ObjectiveForm
          onSubmit={async (formData: TObjectiveForm) => {
            await handleAddObjective(formData);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          dynamicFieldKeys={dynamicColumns.map(col => col.id!.split('.')[1])}
        />
      ) : (
        <div
          ref={tableContainerRef}
          onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
            style={{
              height: '70vh',        
              overflowY: 'auto',        
              position: 'relative',     
              border: '1px solid #eee', 
              borderRadius: '8px',      
              padding: '0 10px'         
              }}
        >
          {isLoading ? (
            <div>Загрузка данных...</div>
          ) : error ? (
            <div>Ошибка: {error.message}</div>
          ) : flatData.length == 0 ? (
            <div>Таблица пуста, пожалуйста добавьте первую запись</div>
          ) : (
            <>
              <ObjectiveTable
                data={flatData}
                columns={allColumns as ColumnDef<TObjective>[]}
                addedFieldKeys={addedFieldKeys}
                onRemoveField={handleRemoveField}
              />
              {isFetching && <div>Подгрузка данных...</div>}
              {!hasNextPage && flatData.length > 0 && (
                <div>Все данные успешно загружены!</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;