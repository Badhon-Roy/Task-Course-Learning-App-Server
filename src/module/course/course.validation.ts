import z from "zod";

const createCourseValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    teacher: z.string().optional(),
    views: z.number().optional().default(0),
    likes: z.number().optional().default(0),
    likedBy: z.array(z.string()).optional(),
    feedbacks: z
      .array(
        z.object({
          student: z.string(),
          comment: z.string().optional(),
        })
      )
      .optional(),
    followers: z.array(z.string()).optional(),
  }),
});

// Course Update Validation Schema
const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    teacher: z.string().optional(),
    views: z.number().optional(),
    likes: z.number().optional(),
    likedBy: z.array(z.string()).optional(),
    feedbacks: z
      .array(
        z.object({
          student: z.string(),
          comment: z.string().optional(),
        })
      )
      .optional(),
    followers: z.array(z.string()).optional(),
  }),
});

export const CourseValidations = {
  createCourseValidation,
  updateCourseValidation,
};