import z from "zod";

export const createTopicValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    lesson: z.string()
      .min(1, { message: "Lesson Id is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Lesson ObjectId")
  }),
});
export const TopicValidations = {
  createTopicValidation,
};