export function getFormData() {
    let formData = {};
    
    formData.email = document.getElementById('email').value.trim();
    formData.name = document.getElementById('name').value.trim();
    formData.phonePrefix = document.getElementById('phonePrefix').value;
    formData.phone = document.getElementById('phone').value.trim();
    formData.fullPhone = formData.phonePrefix + formData.phone;
    formData.lastVisit = document.getElementById('lastVisit').value;
    
    formData.doctor = document.getElementById('doctor').value;
    formData.appointmentDate = document.getElementById('appointmentDate').value;
    formData.timeSlot = document.getElementById('timeSlot').value;
    formData.resonForVisit = document.getElementById('resonForVisit').value.trim();
    
    let healthConcerns = document.querySelectorAll('input[name="healthConcerns"]:checked');
    formData.healthConcerns = [];
    for (let i = 0; i < healthConcerns.length; i++) {
        formData.healthConcerns.push(healthConcerns[i].value);
    }
    formData.medications = document.getElementById('medications').value.trim();
    formData.allergies = document.getElementById('allergies').value.trim();
    
    let medicalRecord = document.querySelector('input[name="radioMedicalRecords"]:checked');
    formData.medicalRecord = medicalRecord ? medicalRecord.value : '';
    
    let consultationType = document.querySelector('input[name="radioCousultationType"]:checked');
    formData.consultationType = consultationType ? consultationType.value : '';
    
    formData.termsAccepted = document.getElementById('term1').checked && document.getElementById('term2').checked;
    
    let notifications = document.querySelectorAll('input[name="notification"]:checked');
    formData.notifications = [];
    for (let i = 0; i < notifications.length; i++) {
        formData.notifications.push(notifications[i].value);
    }
    
    return formData;
}