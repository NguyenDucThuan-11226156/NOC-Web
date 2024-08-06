import { post } from "../utils/request";

export const postMentorList = async (offset) => {
    const result = await post("/api/v1/mentors", {
        limit: offset.limit,
        page: offset.page
    });
    console.log(result);
    
    return result.data.mentors; 
};
