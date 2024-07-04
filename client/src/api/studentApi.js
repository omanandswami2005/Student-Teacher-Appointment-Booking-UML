import axiosInstance from "./axiosInstance";



export const getAllAppointments = async () => {
    const response = await axiosInstance.get("/api/student/appointments");
    return response.data;
}

//create appointment
export const createAppointmentStd = async (data) => {
    const response = await axiosInstance.post("/api/student/appointments", data);
    return response.data;
}
