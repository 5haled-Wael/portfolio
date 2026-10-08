import API from "../api/api";

const getProjects = async () => {
  try {
    const response = await API.get("/projects");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get projects", {
      cause: error,
    });
  }
};

const createProject = async (projectData) => {
  try {
    const response = await API.post("/projects", projectData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create project",
      { cause: error },
    );
  }
};

const deleteProject = async (id) => {
  try {
    const response = await API.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete project",
      { cause: error },
    );
  }
};

const updateProject = async (id, projectData) => {
  try {
    const response = await API.patch(`/projects/${id}`, projectData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update project",
      { cause: error },
    );
  }
};

const getProject = async (id) => {
  try {
    const response = await API.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get project", {
      cause: error,
    });
  }
};

export { getProjects, createProject, deleteProject, updateProject, getProject };
