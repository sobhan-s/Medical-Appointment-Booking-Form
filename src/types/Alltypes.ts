export interface AppointmentFormData {
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
    submittedAt: string;
    id : string;
}