import { useEffect } from "react";
import { addVisit } from "../services/visitService";

const useTrackVisit = () => {
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    if (localStorage.getItem("isOwner")) return;
    if (sessionStorage.getItem("visited")) return;

    sessionStorage.setItem("visited", "true");
    addVisit().catch(() => {});
  }, []);
};

export default useTrackVisit;
