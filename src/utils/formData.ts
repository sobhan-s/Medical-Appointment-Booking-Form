interface AppointmentFormData {
    email: string;
    name: string;
    phonePrefix: string;
    phone: string;
    fullPhone: string;
    lastVisit: string;
    doctor: string;
    appointmentDate: string;
    timeSlot: string;
    resonForVisit: string;
    healthConcerns: string[];
    medications: string;
    allergies: string;
    medicalRecord: string;
    consultationType: string;
    termsAccepted: boolean;
    notifications: string[];
}

export function getFormData(): AppointmentFormData {
    const formData = {} as AppointmentFormData;

    const commonGetValue = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value.trim() || '';

    formData.email = commonGetValue('email');
    formData.name = commonGetValue('name');
    formData.phonePrefix = (document.getElementById('phonePrefix') as HTMLSelectElement).value;
    formData.phone = commonGetValue('phone');
    formData.fullPhone = formData.phonePrefix + formData.phone;
    formData.lastVisit = commonGetValue('lastVisit');
    
    formData.doctor = (document.getElementById('doctor') as HTMLSelectElement).value;
    formData.appointmentDate = commonGetValue('appointmentDate');
    formData.timeSlot = (document.getElementById('timeSlot') as HTMLSelectElement).value;
    formData.resonForVisit = commonGetValue('resonForVisit');
    
    const healthConcernsNodes = document.querySelectorAll('input[name="healthConcerns"]:checked') as NodeListOf<HTMLInputElement>;
    formData.healthConcerns = Array.from(healthConcernsNodes).map(input => input.value);
    
    formData.medications = commonGetValue('medications');
    formData.allergies = commonGetValue('allergies');
    const medicalRecord = document.querySelector('input[name="radioMedicalRecords"]:checked') as HTMLInputElement | null;
    formData.medicalRecord = medicalRecord ? medicalRecord.value : '';
    
    const consultationType = document.querySelector('input[name="radioCousultationType"]:checked') as HTMLInputElement | null;
    formData.consultationType = consultationType ? consultationType.value : '';
    
    formData.termsAccepted = 
        (document.getElementById('term1') as HTMLInputElement).checked && 
        (document.getElementById('term2') as HTMLInputElement).checked;
    
    const notificationNodes = document.querySelectorAll('input[name="notification"]:checked') as NodeListOf<HTMLInputElement>;
    formData.notifications = Array.from(notificationNodes).map(input => input.value);
    
    return formData;
}
