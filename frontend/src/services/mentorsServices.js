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

const BASE_URL = `${API}/api/v1/mentors`;

// Fetch mentor details by ID
export const detailMentor = async (mentorId) => {
  try {
    const response = await axios.post(`${BASE_URL}/detail/${mentorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor details:", error);
    throw error;
  }
};

// Update mentor information by ID
export const updateMentor = async (mentorId, updatedData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/update/${mentorId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating mentor information:", error);
    throw error;
  }
};

export const editPinnedMentor = async (mentorId, pinnedStatus) => {
  try {
    const response = await axios.post(
      `${API}/api/v1/admin/editPinnedMentor/${mentorId}`,
      {
        pinned: pinnedStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating mentor pin status:", error);
    throw error;
  }
};
