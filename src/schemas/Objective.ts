import { z } from "zod";
import { validateDates } from "../utils/validateDates";

export const ObjectiveSchema = z.object({
   title: z.string()
      .nonempty('Поле title не может быть пустым')
      .min(3, "Минимальная длина для title 3")
      .max(50, "Максимальная длина для title 50"),

   description: z.string()
      .nonempty('Поле description не может быть пустым')
      .min(10, "Минимальная длина для description 10")
      .max(500, "Максимальная длина для description 500"),

   dateStart: z.union([
      z.date(),
      z.string()
      .nonempty('Стартовая дата обязательна')
   ]),

   dateEnd: z.union([
      z.date(),
      z.string()
      .nonempty('Конечная дата обязательна')
   ]),

   priority: z.enum(["low", "medium", "high"]),

   status: z.enum(["active", "inactive"]),


   dynamicFields: z.record(
      z.union([
      z.string().max(100, "Максимальная длина поля 100 символов"),
      z.number(),
      z.date(),
      z.string().datetime().transform(str => new Date(str))
      ])
   ).optional()

}).superRefine((data, ctx) => {
   const error = validateDates(data.dateStart, data.dateEnd);
   if (error !== null){
      ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: error,
         path: ['dateEnd'],
      })
   }
})

export type TObjectiveForm = z.infer<typeof ObjectiveSchema>;