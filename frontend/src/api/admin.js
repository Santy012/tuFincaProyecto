import apiClient from "./apiClient";

export const getAdmins = async () => {
  const response = await apiClient.get("/admins/all");
  return response;
};

export const getAdminById = async (id) => {
  const response = await apiClient.get(`/admins/${id}`);
  return response;
};


export const createAdmin = async (adminData) => {
  const response = await apiClient.post("/admins/save", adminData);
  return response;
};

export const updateAdmin = async (id, adminData) => {
  const response = await apiClient.put(`/admins/update/${id}`, adminData);
  return response;
};

export const deleteAdmin = async (id) => {
  const response = await apiClient.delete(`/admins/delete/${id}`);
  return response;
};
