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
