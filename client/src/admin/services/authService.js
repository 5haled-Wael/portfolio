import API from "../../api/api";

const loginApi = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.log("Server Error Data:", error.response?.data);
    if (error.response?.status === 401) {
      throw new Error("Invalid Email or Password", { cause: error });
    } else {
      throw new Error("Something went wrong", { cause: error });
    }
  }
};

export { loginApi };
