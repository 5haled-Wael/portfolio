import API from "../api/api";

const getCertificates = async () => {
  try {
    const response = await API.get("/certificates");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get certificates",
      {
        cause: error,
      },
    );
  }
};

const getCertificate = async (id) => {
  try {
    const response = await API.get(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get certificate",
      {
        cause: error,
      },
    );
  }
};

const createCertificate = async (certificateData) => {
  try {
    const response = await API.post("/certificates", certificateData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create certificate",
      {
        cause: error,
      },
    );
  }
};

const updateCertificate = async (id, certificateData) => {
  try {
    const response = await API.patch(`/certificates/${id}`, certificateData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update certificate",
      {
        cause: error,
      },
    );
  }
};

const deleteCertificate = async (id) => {
  try {
    const response = await API.delete(`/certificates/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete certificate",
      {
        cause: error,
      },
    );
  }
};

export {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
