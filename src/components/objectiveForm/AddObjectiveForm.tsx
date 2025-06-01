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
    formState: { errors, isSubmitting, isValid, dirtyFields },
    watch
  } = useForm<TObjectiveForm>({
    resolver: zodResolver(ObjectiveSchema),
    defaultValues: {
      description: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      priority: 'Низкий',
      status: 'В работе',
      dynamicFields: dynamicFieldKeys.map(key => ({ key, value: '' })),
    },
    mode: 'onChange'
  });

  const { title, description, dateStart, dateEnd } = watch();
  const isFormIncomplete = !title?.trim() || !description?.trim() || !dateStart || !dateEnd;
  const isFormUntouched = !(
    dirtyFields.title ||
    dirtyFields.description ||
    dirtyFields.dateStart ||
    dirtyFields.dateEnd
  );
  const isSubmitDisabled = isSubmitting || !isValid || isFormUntouched || isFormIncomplete;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor='title'>Название задачи</label>
        <input {...register('title')} id='title'/>
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='description'>Описание</label>
        <input {...register('description')} id='description'/>
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='dateStart'>Стартовая дата</label>
        <input type="date" {...register('dateStart', { valueAsDate: true })} id='dateStart'/>
        {errors.dateStart && <span className={styles.error}>{errors.dateStart.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='dateEnd'>Крайний срок</label>
        <input type="date" {...register('dateEnd', { valueAsDate: true })} id='dateEnd'/>
        {errors.dateEnd && <span className={styles.error}>{errors.dateEnd.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='priority'>Приоритет</label>
        <select {...register('priority')} id='priority'>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
        {errors.priority && <span className={styles.error}>{errors.priority.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='status'>Статус задачи</label>
        <select {...register('status')} id='status'>
          <option value="В работе">В работе</option>
          <option value="Выполнено">Выполнено</option>
        </select>
        {errors.status && <span className={styles.error}>{errors.status.message}</span>}
      </div>
      <div className={styles.formGroup}>
        <h3 className={styles.line}>Дополнительные поля</h3>
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
        <button type="submit" disabled={isSubmitDisabled} className={styles.submitButton}>{isSubmitting ? 'Отправка...' : 'Сделать запись'}</button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Вернуться к таблице</button>
      </div>
    </form>
  );
};