import Lesson from "./lesson.model";
import { ILesson } from "./lesson.interface";
import QueryBuilder from "../../builder/QueryBuilder";

// Create a new lesson in the database
const createLessonInDB = async (lesson: ILesson) => {
    const result = await Lesson.create(lesson);
    return result;
};

// Get all lessons from the database
const getAllLessonsFromDB = async (query: Record<string, unknown>) => {
    const lessonQuery = new QueryBuilder(Lesson.find(), query)
        .search(['title'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await lessonQuery.modelQuery;
    const meta = await lessonQuery.countTotal();
    return {
        result,
        meta
    };
};

// Update a lesson by its ID
const updateLessonById = async (id: string, lesson: Partial<ILesson>) => {
    const result = await Lesson.findByIdAndUpdate(id, lesson, { new: true });
    return result;
};

// Delete a lesson by its ID
const deleteLessonById = async (id: string) => {
    const result = await Lesson.findByIdAndDelete(id);
    return result;
};

export const LessonServices = {
    createLessonInDB,
    getAllLessonsFromDB,
    updateLessonById,
    deleteLessonById,
};