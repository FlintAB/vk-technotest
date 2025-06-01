import type { ColumnDef } from "@tanstack/react-table";

export type TObjectivePage = {
   objectives: TObjective[];
   total: number;
}

export type TObjective = {
   id: string;
   title: string;
   description: string;
   dateStart: Date;
   dateEnd: Date;
   status: 'В работе' | 'Выполнено';
   priority: 'low' | 'medium' | 'high';
   dynamicFields: {key: string; value: string | number | Date}[];
}

export type TDynamicColumnDef = ColumnDef<TObjective, string | number | Date>;