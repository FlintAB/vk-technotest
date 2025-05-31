import { PAGE_CAPACITY } from "../constants/constants"
import type { TObjectiveForm } from "../schemas/Objective";
import type { TObjective, TDynamicColumnDef } from "../types/Types";

export const fetchObjectives = async (page: number) => {
   const response = await fetch (`http://localhost:3000/objectives?_page=${page}&_per_page=${PAGE_CAPACITY}`);

   if (!response.ok) {
      throw new Error(`Ошибка при подключении списка: ${response.status}`);
   }
   const serverData = await response.json();
   return {
      objectives: (serverData.data || []).map((item: TObjective) => ({
      ...item,
      dateStart: new Date(item.dateStart),
      dateEnd: new Date(item.dateEnd), 
      dynamicFields: item.dynamicFields || []
      })),
      total: serverData.items || 0
   };
};

export const addObjective = async (formData: TObjectiveForm) => {
      const response = await fetch('http://localhost:3000/objectives', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            ...formData,
            dateStart: formData.dateStart.toString(),
            dateEnd: formData.dateEnd.toString(),
            dynamicFields: formData.dynamicFields?.map(field => ({
            key: field.key,
            value: field.value instanceof Date ? field.value.toISOString() : field.value,
            })),
         }),
      });

      if (!response.ok) throw new Error('Ошибка при создании записи');
         const newObjective: TObjective = await response.json();
         return {
         ...newObjective,
         dateStart: new Date(newObjective.dateStart),
         dateEnd: new Date(newObjective.dateEnd),
         dynamicFields: newObjective.dynamicFields.map((field: { key: string; value: string | number | Date }) => ({
            key: field.key,
            value: field.value instanceof Date ? field.value :
            !isNaN(Number(field.value)) ? Number(field.value) : field.value,
         })),
      };
};

export const addField = async (
   fieldKey: string,
   flatData: TObjective[],
   dynamicColumns: TDynamicColumnDef[]
) => {
      if (dynamicColumns.length >= 8) {
      alert('Максимальное количество полей в таблице 15');
      return;
      }
      if (!fieldKey || fieldKey.trim() === '') {
      alert('Наименование для поля обязательно');
      return;
      }
      if (dynamicColumns.some(col => col.id === `dynamicFields.${fieldKey}`)) {
      alert('Данное наименование уже существует в таблице');
      return;
      };

      for (const objective of flatData) {
         const updatedDynamicFields = [
            ...(objective.dynamicFields || []),
            { key: fieldKey, value: ''},
         ];

         await fetch(`http://localhost:3000/objectives/${objective.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dynamicFields: updatedDynamicFields }),
         });
      }
};

export const removeField = async (
   fieldKey: string,
   flatData: TObjective[]
) => {
   for (const objective of flatData) {
      const updatedDynamicFields = (objective.dynamicFields || []).filter(
         field => field.key !== fieldKey
      );

      await fetch(`http://localhost:3000/objectives/${objective.id}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ dynamicFields: updatedDynamicFields}), 
      });
   }
};