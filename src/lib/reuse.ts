import type { AppointmentFormData } from "../types/AllTypes.js";

export const commonGetValue = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value.trim() || '';

export const commonSelectElement = (id : string) => (document.getElementById(id) as HTMLSelectElement).value

export function getAppointmentData(): AppointmentFormData[] | null {
    const data: string | null = localStorage.getItem("appointments");

    if (!data) return null;

    return JSON.parse(data) as Array<AppointmentFormData>;
}

export function sortAppointment(): AppointmentFormData[] | null {
    
    const appointments  = getAppointmentData() as AppointmentFormData[]

    appointments.sort((a, b) => {
        const dateA = new Date(`${a.appointmentDate} ${a.timeSlot.split('-')[0]}`);
        const dateB = new Date(`${b.appointmentDate} ${b.timeSlot.split('-')[0]}`);
        
        return dateA.getTime() - dateB.getTime();
    });

    return appointments;
}
