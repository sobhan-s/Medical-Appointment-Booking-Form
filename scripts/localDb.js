export function saveAppointment(formData, isEdit, editIndex) {
    let appointments = localStorage.getItem('appointments');
    
    appointments = appointments ? JSON.parse(appointments) : [];

    if (isEdit && editIndex !== null && appointments[editIndex]) {
        const existingRecord = appointments[editIndex];
        appointments[editIndex] = { 
            ...formData, 
            id: existingRecord.id, 
            submittedAt: existingRecord.submittedAt 
        };
        console.log('Appointment updated:', appointments[editIndex]);
    } else {
        formData.submittedAt = new Date().toISOString();
        formData.id = 'appointment' + Date.now();
        appointments.push(formData);
        console.log('New appointment saved:', formData);
    }

    localStorage.setItem('appointments', JSON.stringify(appointments));
}
