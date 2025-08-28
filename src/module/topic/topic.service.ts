import Topic from "./topic.model";
import { ITopic } from "./topic.interface";
import QueryBuilder from "../../builder/QueryBuilder";

// Create a new topic in the database
const createTopicInDB = async (topic: ITopic) => {
    const result = await Topic.create(topic);
    return result;
};

// Get all topics from the database
const getAllTopicsFromDB = async (query: Record<string, unknown>) => {
    const topicQuery = new QueryBuilder(Topic.find(), query)
        .search(['title'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await topicQuery.modelQuery;
    const meta = await topicQuery.countTotal();
    return {
        result,
        meta
    };
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