import Lesson from "./lesson.model";
import { ILesson } from "./lesson.interface";

// Create a new lesson in the database
const createLessonInDB = async (lesson: ILesson) => {
    const result = await Lesson.create(lesson);
    return result;
};

// Get all lessons from the database
const getAllLessonsFromDB = async () => {
    const result = await Lesson.find().populate("course");
    return result;
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