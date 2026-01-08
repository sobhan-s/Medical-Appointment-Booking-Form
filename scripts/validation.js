import {showError,showGroupError,clearError,clearGroupError} from './error.js'


function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    let regex = /^[0-9]{10}$/;
    return regex.test(phone.replace(/[\s\-]/g, ''));
}

export function validateStep1() {
    let isValid = true;
    
    let email = document.getElementById('email').value.trim();
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
    
    let name = document.getElementById('name').value.trim();
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } 
    else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } 
    else {
        clearError('name');
    }
    
    let phone = document.getElementById('phone').value.trim();
    if (!phone) {
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
    
    return isValid;
}

export function validateStep2() {
    let isValid = true;
    
    let doctor = document.getElementById('doctor').value;
    if (!doctor) {
        showError('doctor', 'Please select a doctor');
        isValid = false;
    } else {
        clearError('doctor');
    }
    
    let appointmentDate = document.getElementById('appointmentDate').value;
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
    
    let timeSlot = document.getElementById('timeSlot').value;
    if (!timeSlot) {
        showError('timeSlot', 'Please select a time slot');
        isValid = false;
    } else {
        clearError('timeSlot');
    }
    
    let reason = document.getElementById('resonForVisit').value.trim();
    if (!reason) {
        showError('resonForVisit', 'Please enter reason for visit');
        isValid = false;
    } else if (reason.length < 10) {
        showError('resonForVisit', 'Reason must be at least 10 characters');
        isValid = false;
    } else {
        clearError('resonForVisit');
    }
    
    return isValid;
}

export function validateStep3() {
    let isValid = true;
    
    let healthConcerns = document.querySelectorAll('input[name="healthConcerns"]:checked');
    if (healthConcerns.length === 0) {
        showGroupError('healthConcerns', 'Please select at least one health concern');
        isValid = false;
    } else {
        clearGroupError('healthConcerns');
    }
    
    return isValid;
}

export function validateStep4() {
    let isValid = true;
    
    let medicalRecord = document.querySelector('input[name="radioMedicalRecords"]:checked');
    if (!medicalRecord) {
        showGroupError('radioMedicalRecords', 'Please select a medical record type');
        isValid = false;
    } else {
        clearGroupError('radioMedicalRecords');
    }
    
    let consultationType = document.querySelector('input[name="radioCousultationType"]:checked');
    if (!consultationType) {
        showGroupError('radioCousultationType', 'Please select a consultation type');
        isValid = false;
    } else {
        clearGroupError('radioCousultationType');
    }
    
    let term1 = document.getElementById('term1');
    let term2 = document.getElementById('term2');
    if (!term1.checked || !term2.checked) {
        showGroupError('terms', 'You must accept all terms and conditions');
        isValid = false;
    } else {
        clearGroupError('terms');
    }
    
    let notifications = document.querySelectorAll('input[name="notification"]:checked');
    if (notifications.length === 0) {
        showGroupError('notification', 'Please select at least one notification method');
        isValid = false;
    } else {
        clearGroupError('notification');
    }
    
    return isValid;
}