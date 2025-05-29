import { useForm } from "react-hook-form";
import { type TObjectiveForm, ObjectiveSchema } from "../../schemas/Objective";
import type { ObjectiveFormProps } from "../../types/formProps";
import { zodResolver } from "@hookform/resolvers/zod";


export const ObjectiveForm = ({ onSubmit, onCancel }: ObjectiveFormProps) => {
   const { 
      register, 
      handleSubmit, 
      formState: { errors, isSubmitting } 
   } = useForm<TObjectiveForm>({
      resolver: zodResolver(ObjectiveSchema),
      defaultValues: {
      status: 'active',
      priority: 'medium'
      }
   });

   return (
      <div style={{
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px'
      }}>
      <h2>Add New Objective</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
         <div style={{ marginBottom: '15px' }}>
            <label>Title*</label>
            <input {...register('title')} />
            {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
         </div>

         <div style={{ marginBottom: '15px' }}>
            <label>Description*</label>
            <textarea {...register('description')} />
            {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
         </div>

         <div style={{ marginBottom: '15px' }}>
            <label>Start Date*</label>
            <input type="date" {...register('dateStart')} />
            {errors.dateStart && <p style={{ color: 'red' }}>{errors.dateStart.message}</p>}
         </div>

         <div style={{ marginBottom: '15px' }}>
            <label>End Date*</label>
            <input type="date" {...register('dateEnd')} />
            {errors.dateEnd && <p style={{ color: 'red' }}>{errors.dateEnd.message}</p>}
         </div>

         <div style={{ marginBottom: '15px' }}>
            <label>Priority*</label>
            <select {...register('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>
         </div>

         <div style={{ marginBottom: '15px' }}>
            <label>Status*</label>
            <select {...register('status')}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            </select>
         </div>

         <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
            <button type="button" onClick={onCancel}>
            Закрыть
            </button>
         </div>
      </form>
      </div>
   );
};