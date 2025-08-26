import Topic from "./topic.model";
import { ITopic } from "./topic.interface";

// Create a new topic in the database
const createTopicInDB = async (topic: ITopic) => {
    const result = await Topic.create(topic);
    return result;
};

// Get all topics from the database
const getAllTopicsFromDB = async () => {
    const result = await Topic.find().populate("lesson");
    return result;
};

// Update a topic by its ID
const updateTopicById = async (id: string, topic: Partial<ITopic>) => {
    const result = await Topic.findByIdAndUpdate(id, topic,
        { new: true }
    );
    return result;
};

// Delete a topic by its ID
const deleteTopicById = async (id: string) => {
    const result = await Topic.findByIdAndDelete(id);
    return result;
};

export const TopicServices = {
    createTopicInDB,
    getAllTopicsFromDB,
    updateTopicById,
    deleteTopicById,
};