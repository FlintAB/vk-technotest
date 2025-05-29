import type { TObjective } from "../types/ObjectiveTable";
import type { TDynamicColumnDef } from "../types/DynamicColumns";
import { columnHelper } from "../components/columns/columns";

export function createDynamicColumns(data: TObjective[]): TDynamicColumnDef[] {
   if (!data.length) return [];

   const dynamicKeys = Array.from(
      new Set(data.flatMap(obj => Object.keys(obj.dynamicFields || {})))
   );

   return dynamicKeys.map(key => columnHelper.accessor((row: TObjective) => row.dynamicFields[key],
   {
      id: `dynamicFields.${key}`,
      header: key.toUpperCase(),
      cell: ({row}) => {
         const value = row.original.dynamicFields[key];
         return value instanceof Date ? value.toLocaleDateString('ru-RU') : value;
      },
      meta: {type: 'dynamic'}
   }
))
}