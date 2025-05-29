import type { TDynamicColumnDef } from "../types/DynamicColumns";
import type { TObjective } from "../types/ObjectiveTable";

export function createDynamicColumns(
   data: TObjective[]
): TDynamicColumnDef[] {
   if (!data.length) return [];

   const dynamicKeys = Array.from(
      new Set(data.flatMap(obj => Object.keys(obj.dynamicFields || {})))
   );

   return dynamicKeys.map(key => ({
      accessorKey: `dynamicFields.${key}`,
      header: key.toUpperCase(),
      cell: info => info.getValue(),
      meta: {
      type: typeof data[0].dynamicFields[key] === 'number' ? 'number' : 
            data[0].dynamicFields[key] instanceof Date ? 'date' : 'string'
      }
   }));
}