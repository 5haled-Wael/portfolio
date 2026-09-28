import { useEffect, useState } from "react";
import API from "../api/api";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export default useProjects;
