import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ObjectiveSchema, type TObjectiveForm } from '../../schemas/Objective';
import type { ObjectiveFormProps } from '../../types/Props';
import styles from './AddObjectiveForm.module.css';


export const ObjectiveForm: React.FC<ObjectiveFormProps> = ({ onSubmit, onCancel, dynamicFieldKeys }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TObjectiveForm>({
    resolver: zodResolver(ObjectiveSchema),
    defaultValues: {
      description: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      priority: 'Низкий',
      status: 'Исправить',
      dynamicFields: dynamicFieldKeys.map(key => ({ key, value: '' })),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Название задачи</label>
        <input {...register('title')}/>
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Описание</label>
        <input {...register('description')} />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Стартовая дата</label>
        <input type="date" {...register('dateStart', { valueAsDate: true })} />
        {errors.dateStart && <span className={styles.error}>{errors.dateStart.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Крайний срок</label>
        <input type="date" {...register('dateEnd', { valueAsDate: true })} />
        {errors.dateEnd && <span className={styles.error}>{errors.dateEnd.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Приоритет</label>
        <select {...register('priority')}>
          <option value="Низкий">Низкий</option>
          <option value="Средний">Средний</option>
          <option value="Высокий">Высокий</option>
        </select>
        {errors.priority && <span className={styles.error}>{errors.priority.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Вид задачи</label>
        <select {...register('status')}>
          <option value="Сделать">Сделать</option>
          <option value="Исправить">Исправить</option>
        </select>
        {errors.status && <span className={styles.error}>{errors.status.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <h3>Дополнительные поля</h3>
        {dynamicFieldKeys.map((key, index) => (
          <div key={key} className={styles.formGroup}>
            <input
              value={key}
              readOnly
              className={styles.readOnlyInput}
            />
            <input
              {...register(`dynamicFields.${index}.value`)}
              placeholder={`Значение для ${key}`}
            />
            {errors.dynamicFields?.[index]?.value && (
              <span className={styles.error}>{errors.dynamicFields[index]?.value?.message}</span>
            )}
          </div>
        ))}
        {errors.dynamicFields && <span className={styles.error}>{errors.dynamicFields.message}</span>}
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton}>Сделать запись</button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Вернуться к таблице</button>
      </div>
    </form>
  );
};