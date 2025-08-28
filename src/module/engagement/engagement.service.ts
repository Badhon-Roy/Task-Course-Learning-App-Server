import Engagement from "./engagement.model";

const createEngagementInDB = async (payload: any) => {
    const result = await Engagement.create(payload);
    return result;
};

const getAllEngagementsFromDB = async () => {
    const result = await Engagement.find()
        .populate("studentId")
        .populate("courseId")
        .populate("lessonId")
        .populate("topicId")
    return result;
};

const getEngagementByStudentFromDB = async (studentId: string) => {
    const result = await Engagement.find({ studentId: studentId })
        .populate("courseId")
        .populate("lessonId")
        .populate("topicId")
    return result;
};

export const EngagementServices = {
    createEngagementInDB,
    getAllEngagementsFromDB,
    getEngagementByStudentFromDB,
};