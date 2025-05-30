import type React from "react";
import type { AddFieldFormProps } from "../../types/Props";


export const AddFieldForm: React.FC<AddFieldFormProps> = ({
   newFieldKey,
   setNewFieldKey,
   onSubmit,
   onCancel,
   isDisabled
}) => {

   const handleFieldFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewFieldKey(e.target.value)
   };

   return (
      <div>
         <h3>Добавить новое поле</h3>
         <input type="text" value={newFieldKey} placeholder="Введите наименование поля" onChange={handleFieldFormChange} />
         <div>
            <button onClick={onSubmit} disabled={isDisabled}>
               Создать поле
            </button>
            <button onClick={onCancel}>
               Свернуть форму
            </button>
         </div>
      </div>
   )
}