import type { ColumnDef } from "@tanstack/react-table";
import type { TObjective } from "./ObjectiveTable";

export type ObjectiveTableProps = {
   data: TObjective[];
   columns: ColumnDef<TObjective>[];
}