import type { AccessorKeyColumnDef } from "@tanstack/react-table";
import type { TObjective } from "./ObjectiveTable";

export type TDynamicColumnDef = AccessorKeyColumnDef<TObjective, string | number | Date>;