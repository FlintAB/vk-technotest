import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ObjectiveSchema, type TObjectiveForm } from '../../schemas/Objective';
import type { ObjectiveFormProps } from '../../types/Props';


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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <label>Название задачи</label>
        <input {...register('title')} />
        {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
      </div>
      <div>
        <label>Описание</label>
        <input {...register('description')} />
        {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
      </div>
      <div>
        <label>Стартовая дата</label>
        <input type="date" {...register('dateStart', { valueAsDate: true })} />
        {errors.dateStart && <span style={{ color: 'red' }}>{errors.dateStart.message}</span>}
      </div>
      <div>
        <label>Крайний срок</label>
        <input type="date" {...register('dateEnd', { valueAsDate: true })} />
        {errors.dateEnd && <span style={{ color: 'red' }}>{errors.dateEnd.message}</span>}
      </div>
      <div>
        <label>Приоритет</label>
        <select {...register('priority')}>
          <option value="Низкий">Низкий</option>
          <option value="Средний">Средний</option>
          <option value="Высокий">Высокий</option>
        </select>
        {errors.priority && <span style={{ color: 'red' }}>{errors.priority.message}</span>}
      </div>
      <div>
        <label>Вид задачи</label>
        <select {...register('status')}>
          <option value="Сделать">Сделать</option>
          <option value="Исправить">Исправить</option>
        </select>
        {errors.status && <span style={{ color: 'red' }}>{errors.status.message}</span>}
      </div>
      <div>
        <h3>Дополнительные поля</h3>
        {dynamicFieldKeys.map((key, index) => (
          <div key={key} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              value={key}
              readOnly
              style={{ padding: '8px', background: '#f0f0f0' }}
            />
            <input
              {...register(`dynamicFields.${index}.value`)}
              placeholder={`Значение для ${key}`}
              style={{ padding: '8px' }}
            />
            {errors.dynamicFields?.[index]?.value && (
              <span style={{ color: 'red' }}>{errors.dynamicFields[index]?.value?.message}</span>
            )}
          </div>
        ))}
        {errors.dynamicFields && <span style={{ color: 'red' }}>{errors.dynamicFields.message}</span>}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">Сделать запись</button>
        <button type="button" onClick={onCancel}>Вернуться к таблице</button>
      </div>
    </form>
  );
};