export type TObjective = {
   id: number;
   title: string;
   dateStart: Date;
   dateEnd: Date;
   status: 'active' | 'inactive';
   priority: 'low' | 'medium' | 'high';
   [key: string]: string | number | Date;
}