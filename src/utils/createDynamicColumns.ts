import type { TObjective } from "../types/Types";
import type { TDynamicColumnDef } from "../types/Types";
import { columnHelper } from "../components/columns/columns";

export function createDynamicColumns(data: TObjective[]): TDynamicColumnDef[] {
   if (!data.length) return [];

   const dynamicKeys = Array.from(
      new Set(data.flatMap(obj => obj.dynamicFields || []).map(field => field.key))
   );

   const limitedKeys = dynamicKeys.slice(0, 15);

   return limitedKeys.map(key => columnHelper.accessor((row: TObjective) => {
      const field = row.dynamicFields.find(f => f.key === key);
      return field ? field.value : '';
   },
   {
      id: `dynamicFields.${key}`,
      header: key.charAt(0) + key.slice(1),
      cell: ({row}) => {
         const field = row.original.dynamicFields.find(f => f.key === key);
         const value = field ? field.value : '';
         return value instanceof Date ? value.toLocaleDateString('ru-RU') : value;
      },
      meta: {type: 'dynamic'}
   }
))
}