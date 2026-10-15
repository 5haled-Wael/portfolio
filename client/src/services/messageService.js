import API from "../api/api";

const getAllMessages = async () => {
  try {
    const response = await API.get("/messages", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get messages", {
      cause: error,
    });
  }
};

const getMessage = async (id) => {
  try {
    const response = await API.get(`/messages/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get message", {
      cause: error,
    });
  }
};

const createMessage = async (data) => {
  try {
    const response = await API.post("/messages", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create message",
      {
        cause: error,
      },
    );
  }
};

const updateMessage = async (id, data) => {
  try {
    const response = await API.patch(`/messages/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update message",
      {
        cause: error,
      },
    );
  }
};

const deleteMessage = async (id) => {
  try {
    const response = await API.delete(`/messages/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete message",
      {
        cause: error,
      },
    );
  }
};

export {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
