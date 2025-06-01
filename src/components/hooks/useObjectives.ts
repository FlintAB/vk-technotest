import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createDynamicColumns } from "../../utils/createDynamicColumns";
import type { TObjectiveForm } from "../../schemas/Objective";
import { addField, addObjective, fetchObjectives, removeField } from "../../api/objectives";
import type { TDynamicColumnDef, TObjectivePage } from "../../types/Types";

export const useObjectives = () => {
   const queryClient = useQueryClient();
   const [dynamicColumns, setDynamicColumns] = useState<TDynamicColumnDef[]>([]);
   const [addedFieldKeys, setAddedFieldKeys] = useState<string[]>([]);

   const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isLoading,
      error
   } = useInfiniteQuery<TObjectivePage, Error>({
      queryKey: ['query'],
      queryFn: async ({ pageParam }) => {
         return fetchObjectives(pageParam as number);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
         const totalFetched = allPages.reduce((sum, page) => sum + page.objectives.length, 0);
         return totalFetched < lastPage.total ? allPages.length + 1 : undefined;
         },
   });

   const flatData = useMemo(() => {
      return data?.pages.flatMap(page => page.objectives) ?? [];
   }, [data]);


   useEffect(() => {
      if (flatData.length > 0) {

         const newColumns = createDynamicColumns(flatData);

         setDynamicColumns(newColumns);

         const fixedFields = ['field1', 'field2', 'field3', 'field4', 'field5'];
         const dynamicKeys = newColumns.map(col => col.id!.split('.')[1]);

         setAddedFieldKeys(dynamicKeys.filter(key => !fixedFields.includes(key)));

      } else {
         setDynamicColumns([]);
         setAddedFieldKeys([]);
      }
   }, [flatData]);

   const handleAddObjective = useCallback(async (formData: TObjectiveForm) => {
   try {
      await addObjective(formData);
      await queryClient.invalidateQueries({ queryKey: ['query'] });
   } catch (error) {
      console.error('Ошибка при добавлении записи:', error);
      throw error;
   }
}, [queryClient]);

   const handleAddField = useCallback(async (fieldKey: string) => {
      try {

         await addField(fieldKey, flatData, dynamicColumns);
         
         setAddedFieldKeys(prev => [...prev, fieldKey]);

         await queryClient.invalidateQueries({ queryKey: ['query'] });

      } catch (error) {
         console.error('Ошибка при добавлении поля:', error)
      }
   }, [flatData, dynamicColumns, queryClient]);

   const handleRemoveField = useCallback(async (fieldKey: string) => {
      if (!confirm(`Вы уверены, что хотите удалить поле '${fieldKey}'?`)) return;

      try {

         await removeField(fieldKey, flatData);

         setAddedFieldKeys(prev => prev.filter(key => key !== fieldKey));

         await queryClient.invalidateQueries({ queryKey: ['query'] });

      } catch (error) {
         console.error('Ошибка при удалении поля:', error);
      }
   }, [flatData, queryClient]);

   return {
      data,
      addedFieldKeys,
      setAddedFieldKeys,
      dynamicColumns,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isLoading,
      error,
      flatData,
      handleAddField,
      handleAddObjective,
      handleRemoveField,
   };
};