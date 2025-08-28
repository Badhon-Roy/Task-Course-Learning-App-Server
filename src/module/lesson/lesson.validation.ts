import z from "zod";

const createLessonValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    course: z.string().min(1, { message: "Course Id is required" }).regex(/^[0-9a-fA-F]{24}$/, "Invalid Course ObjectId")
  }),
});

export const LessonValidations = {
  createLessonValidation,
};