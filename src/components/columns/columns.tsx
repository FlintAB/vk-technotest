import { createColumnHelper } from "@tanstack/react-table";
import type { TObjective } from "../../types/Types";
import { useMemo } from "react";
import { priorityLabels } from "../../constants/constants";
import styles from '../table/ObjectiveTable.module.css';

export const columnHelper = createColumnHelper<TObjective>();

export const useColumns = () => {
   return useMemo(() => [
   columnHelper.accessor('title', {
      cell: info => info.getValue(),
      header: () => 'Название задачи'
   }),
   columnHelper.accessor('description', {
      cell: info => info.getValue(),
      header: () => 'Описание'
   }),
   columnHelper.accessor('dateStart', {
      cell: info => info.getValue().toLocaleDateString('ru-RU'),
      header: () => 'Дата начала'
   }),
   columnHelper.accessor('dateEnd', {
      cell: info => info.getValue().toLocaleDateString('ru-RU'),
      header: () => 'Срок завершения'
   }),
   columnHelper.accessor('status', {
      cell: info => info.getValue(),
      header: () => 'Статус задачи'
   }),
   columnHelper.accessor('priority', {
      cell: info => {
         const value = info.getValue();
         const className = `priority${value.charAt(0).toUpperCase() + value.slice(1)}`;
         const label = priorityLabels[value] || value;
         return <span className={styles[className]}>{label}</span>;
      },
      header: () => 'Приоритет'
   }),
], [])
}
