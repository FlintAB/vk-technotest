import type { ColumnDef } from "@tanstack/react-table";
import type { TObjectiveForm } from "../schemas/Objective";
import type { TObjective } from "./Types";

export interface ExtendedObjectiveTableProps extends ObjectiveTableProps {
   addedFieldKeys: string[];
   onRemoveField: (fieldKey: string) => void;
}

export interface ObjectiveFormProps {
   onSubmit: (data: TObjectiveForm) => void;
   onCancel: () => void;
   dynamicFieldKeys: string[];
}

export interface ObjectiveTableProps {
   data: TObjective[];
   columns: ColumnDef<TObjective>[];
   addedFieldKeys: string[];
   onRemoveField: (fieldKey: string) => void;
}

export interface AddFieldFormProps {
   newFieldKey: string;
   setNewFieldKey: (value: string) => void;
   onSubmit: () => Promise<void>;
   onCancel: () => void;
   isDisabled: boolean;
}