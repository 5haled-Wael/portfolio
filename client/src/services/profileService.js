import API from "../api/api";

const getProfile = async () => {
  try {
    const response = await API.get("/profile");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get profile", {
      cause: error,
    });
  }
};

const updateProfile = async (formData) => {
  try {
    const response = await API.patch("/profile", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile",
      {
        cause: error,
      },
    );
  }
};

export { getProfile, updateProfile };
