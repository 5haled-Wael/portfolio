import API from "../api/api";

const getVisits = async () => {
  try {
    const response = await API.get("/visits", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get visits", {
      cause: error,
    });
  }
};

const addVisit = async () => {
  try {
    const response = await API.post("/visits");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add visit", {
      cause: error,
    });
  }
};

const getVisitsTimeline = async (days = 30) => {
  try {
    const response = await API.get("/visits/timeline", {
      params: { days },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get visits timeline",
      {
        cause: error,
      },
    );
  }
};

export { getVisits, addVisit, getVisitsTimeline };
