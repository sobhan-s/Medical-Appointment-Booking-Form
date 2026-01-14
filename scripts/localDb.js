export function saveAppointment(formData,isEdit,editIndex) {
    let appointments = localStorage.getItem('appointments');
    
    if (!appointments) {
        appointments = [];
    } else {
        appointments = JSON.parse(appointments);
    }

    if(formData[editIndex] != null && isEdit == true) {
        appointments[editIndex] = formData;
    }
    else {
        formData.submittedAt = new Date().toISOString();
        formData.id = 'appointment' + Date.now();
        
        appointments.push(formData);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        console.log('Appointment saved:', formData);
    }
}

