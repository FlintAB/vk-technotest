import { z } from "zod";
import { validateDates } from "../utils/validateDates";

export const ObjectiveSchema = z.object({
   title: z.string()
      .min(3, "Минимальная длина для title 3")
      .max(50, "Максимальная длина для title 50"),

   description: z.string()
      .min(10, "Минимальная длина для description 10")
      .max(500, "Максимальная длина для description 500"),

   dateStart: z.union([
      z.date(),
      z.string().datetime({ message: "Некорректный формат даты начала" })
   ]),

   dateEnd: z.union([
      z.date(),
      z.string().datetime({ message: "Некорректный формат даты окончания" })
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

}).refine(data => {
   const error = validateDates(data.dateStart, data.dateEnd);
   return error === null;
}, {
   message: "Ошибка при инициализации дат, проверьте стартовую и конечную дату",
   path: ["dateEnd"]
});

export type TObjectiveForm = z.infer<typeof ObjectiveSchema>;