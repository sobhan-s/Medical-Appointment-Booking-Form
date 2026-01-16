import { commonGetValue, commonSelectElement } from '../lib/reuse.js';
import {showError,showGroupError,clearError,clearGroupError} from '../utils/error.js'


function validateEmail(email : string) {
    const regex = /^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email);
}

function validatePhone(phone : string) {
    const regex = /^[1-9][0-9]{9}$/;
    return regex.test(phone.replace(/[\s\-]/g, ''));
}

function validateName(name : string) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
}

export function validateStep1() {
    let isValid = true;
    
    let email : string | null = commonGetValue('email')
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } 
    else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } 
    else {
        clearError('email');
    }
    
    let name : string | null = commonGetValue('name')
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } 
    else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } 
    else if (!validateName(name)) {
        showError('name', 'Name can only contain letters and spaces');
        isValid = false
    }       
    else {
        clearError('name');
    }
 
    let phone : string | null = commonGetValue('phone')
    if (!phone || phone.trim() === "") {
        showError('phone', 'Phone number is required');
        isValid = false;
    } 
    else if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid 10-digit phone number');
        isValid = false;
    } 
    else {
        clearError('phone');
    }
    
    let lastVisitFieldValue : string | null = commonGetValue('lastVisit')
    if (lastVisitFieldValue ) {
        const selectedDate = new Date(lastVisitFieldValue);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if (selectedDate >= todayDate) {
            showError('lastVisit', 'Last visit date must be in the past');
            isValid = false;
        } else {
            clearError('lastVisit');
        }
    }
    
    let nextBtn = document.getElementById('next1') as HTMLButtonElement | null;
    if (nextBtn) {
        nextBtn.disabled = !isValid;
    }
    
    return isValid;
}

export function validateStep2() {
    let isValid = true;
    
    let doctor = commonSelectElement('doctor')
    if (!doctor) {
        showError('doctor', 'Please select a doctor');
        isValid = false;
    } else {
        clearError('doctor');
    }
    
    let appointmentDate = commonGetValue('appointmentDate')
    if (!appointmentDate) {
        showError('appointmentDate', 'Please select an appointment date');
        isValid = false;
    } else {
        let selectedDate = new Date(appointmentDate);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError('appointmentDate', 'Appointment date cannot be in the past');
            isValid = false;
        } else {
            clearError('appointmentDate');
        }
    }
    
    let timeSlot = commonSelectElement('timeSlot')
    if (!timeSlot) {
        showError('timeSlot', 'Please select a time slot');
        isValid = false;
    } else {
        clearError('timeSlot');
    }
    
    let reason = commonGetValue('resonForVisit');
    if (!reason) {
        showError('resonForVisit', 'Please enter reason for visit');
        isValid = false;
    } else if (reason.length < 10) {
        showError('resonForVisit', 'Reason must be at least 10 characters');
        isValid = false;
    } else {
        clearError('resonForVisit');
    }
    
    let nextBtn = document.getElementById('next2') as HTMLButtonElement | null
    if (nextBtn) {
        nextBtn.disabled = !isValid;
    }
    
    return isValid;
}

export function validateStep3() {
    let isValid = true;
    
    let healthConcerns = document.querySelectorAll('input[name="healthConcerns"]:checked') as NodeListOf<HTMLInputElement>
    if (healthConcerns.length === 0) {
        showGroupError('healthConcerns', 'Please select at least one health concern');
        isValid = false;
    } else {
        clearGroupError('healthConcerns');
    }
    
    let nextBtn = document.getElementById('next3') as HTMLButtonElement | null
    if (nextBtn) {
        nextBtn.disabled = !isValid;
    }
    
    return isValid;
}

export function validateStep4() {
    let isValid = true;
    
    let medicalRecord = document.querySelector('input[name="radioMedicalRecords"]:checked') as HTMLInputElement | null;
    if (!medicalRecord) {
        showGroupError('radioMedicalRecords', 'Please select a medical record type');
        isValid = false;
    } else {
        clearGroupError('radioMedicalRecords');
    }
    
    let consultationType = document.querySelector('input[name="radioCousultationType"]:checked') as HTMLInputElement | null
    if (!consultationType) {
        showGroupError('radioCousultationType', 'Please select a consultation type');
        isValid = false;
    } else {
        clearGroupError('radioCousultationType');
    }
    
    let term1 = document.getElementById('term1') as HTMLInputElement
    let term2 = document.getElementById('term2') as HTMLInputElement
    if (!term1.checked || !term2.checked) {
        showGroupError('terms', 'You must accept all terms and conditions');
        isValid = false;
    } else {
        clearGroupError('terms');
    }
    
    let notifications = document.querySelectorAll('input[name="notification"]:checked') as NodeListOf<HTMLInputElement>;
    if (notifications.length === 0) {
        showGroupError('notification', 'Please select at least one notification method');
        isValid = false;
    } else {
        clearGroupError('notification');
    }
    
    let submitBtn = document.getElementById('submitBtn') as HTMLButtonElement | null;
    if (submitBtn) {
        submitBtn.disabled = !isValid;
    }
    
    return isValid;
}

export function allValidationSteps() {
    validateStep1();
    validateStep2();
    validateStep3();
    validateStep4();
}