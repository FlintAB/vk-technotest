import type React from "react";
import type { AddFieldFormProps } from "../../types/Props";
import styles from './AddFieldForm.module.css';

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
      <div className={styles.fieldForm}>
         <h3 className={styles.title}>Добавить новое поле</h3>
         <input type="text" value={newFieldKey} placeholder="Введите наименование поля" onChange={handleFieldFormChange}  className={styles.fieldInput}/>
         <div className={styles.fieldActions}>
            <button onClick={onSubmit} disabled={isDisabled} className={styles.addButton}>
               Создать поле
            </button>
            <button onClick={onCancel} className={styles.cancelButton}>
               Свернуть форму
            </button>
         </div>
      </div>
   )
}