import type { TObjectiveForm } from "../schemas/Objective";

export type ObjectiveFormProps = {
   onSubmit: (data: TObjectiveForm) => Promise<void>;
   onCancel: () => void;
}