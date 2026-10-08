import { loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (response) => {
      login({
        user: { _id: response._id, email: response.email },
        token: response.token,
      });
      navigate("/admin/dashboard");
    },
  });
};

export default useLogin;
