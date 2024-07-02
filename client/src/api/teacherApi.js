import axiosInstance from "./axiosInstance";

export const getAllAppointments = async () => {
    const response = await axiosInstance.get("/api/teacher/appointments");
    return response.data;
}

export const createAppointment = async (data) => {
    const response = await axiosInstance.post("/api/teacher/appointments", data);
    return response.data;
}

//Change Status of Appointment
export const updateAppointmentStatus = async (id, data) => {
    console.log(data,id);
    const response = await axiosInstance.put(`/api/teacher/appointments/${id}`, {data});
    return response.data;
}