import { post } from "../utils/request";
import axios from "axios";
import { API } from "../constant";
export const postMentorList = async (offset) => {
  const result = await post(`/api/v1/mentors/list`, {
    limit: offset.limit,
    page: offset.page,
  });
  return result;
};

export const deleteMentor = async (id) => {
  const response = await axios.delete(API + `/api/v1/mentors/delete/${id}`);
  return response.data;
};

export const createMentor = async (mentorData) => {
  try {
    const response = await axios.post(
      `${API}/api/v1/mentors/create`,
      mentorData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Optional; axios will set it automatically
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating the mentor:", error);
    throw error; // Optionally re-throw the error to handle it in a higher-level function
  }
};
