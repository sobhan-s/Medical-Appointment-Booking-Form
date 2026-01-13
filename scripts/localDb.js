export function saveAppointment(formData) {
    let appointments = localStorage.getItem('appointments');
    
    if (!appointments) {
        appointments = [];
    } else {
        appointments = JSON.parse(appointments);
    }
    
    formData.submittedAt = new Date().toISOString();
    formData.id = 'Appointment-' + Date.now();
    
    appointments.push(formData);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    console.log('Appointment saved:', formData);
}

