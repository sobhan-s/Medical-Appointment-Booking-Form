import type {AppointmentFormData} from "../utils/formData.js"

export function saveAppointment({formData, isEdit, editIndex} : 
    {
        formData : AppointmentFormData,
        isEdit : boolean,
        editIndex : number | null
    }
) {
    let RawAppointments : string | null = localStorage.getItem('appointments');

    if(!RawAppointments) return;
    
    let parsedAppointments : AppointmentFormData[] = RawAppointments ? JSON.parse(RawAppointments) : [];

    if (isEdit && editIndex !== null && parsedAppointments[editIndex]) {
        const existingRecord = parsedAppointments[editIndex];
        parsedAppointments[editIndex] = { 
            ...formData, 
            id: existingRecord.id, 
            submittedAt: existingRecord.submittedAt 
        };
        console.log('Appointment updated:', parsedAppointments[editIndex]);
    } else {
        formData.submittedAt = new Date().toISOString();
        formData.id = 'appointment' + Date.now();
        parsedAppointments.push(formData);
        console.log('New appointment saved:', formData);
    }

    localStorage.setItem('appointments', JSON.stringify(parsedAppointments));
}
