import { createColumnHelper } from "@tanstack/react-table";
import type { TObjective } from "../../types/ObjectiveTable";

export const columnHelper = createColumnHelper<TObjective>();

export const columns = [
   columnHelper.accessor('id', {
      cell: info => info.getValue(),
      header: () => 'Task ID'
   }),
   columnHelper.accessor('title', {
      cell: info => info.getValue(),
      header: () => 'Title'
   }),
   columnHelper.accessor('dateStart', {
      cell: info => info.getValue().toLocaleDateString('ru-RU'),
      header: () => 'Start Date'
   }),
   columnHelper.accessor('dateEnd', {
      cell: info => info.getValue().toLocaleDateString('ru-RU'),
      header: () => 'Deadline'
   }),
   columnHelper.accessor('status', {
      cell: info => info.getValue(),
      header: () => 'Status'
   }),
   columnHelper.accessor('priority', {
      cell: info => info.getValue(),
      header: () => 'Priority'
   }),
];

export const createDynamicColumns = (data: TObjective[]) => {
   if (!data.length) return [];

   return Object.keys(data[0])
      .filter(key => !['id', 'title', 'dateStart', 'dateEnd', 'status', 'priority'].includes(key))
      .map(key => columnHelper.accessor(key, {
      header: key,
      cell: ({ getValue }) => {
         const value = getValue();
         if (value instanceof Date) return value.toLocaleDateString('ru-RU');
         return value;
      }
      }));
};
