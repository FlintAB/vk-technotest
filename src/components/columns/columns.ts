import { createColumnHelper } from "@tanstack/react-table";
import type { TObjective } from "../../types/Types";
import { useMemo } from "react";

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
      header: () => 'Стартовая дата'
   }),
   columnHelper.accessor('dateEnd', {
      cell: info => info.getValue().toLocaleDateString('ru-RU'),
      header: () => 'Крайний срок'
   }),
   columnHelper.accessor('status', {
      cell: info => info.getValue(),
      header: () => 'Вид задачи'
   }),
   columnHelper.accessor('priority', {
      cell: info => info.getValue(),
      header: () => 'Приоритет'
   }),
], [])
}
