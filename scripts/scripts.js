import {validateStep1,validateStep2,validateStep3,validateStep4} from './validation.js'
import {getFormData} from './formData.js'
import {saveAppointment} from "./localDb.js"

let currentStep = 1;
let totalSteps = 4;

function showStep(stepNumber) {
    let allSteps = document.querySelectorAll('.form_step');
    for (let i = 0; i < allSteps.length; i++) {
        allSteps[i].classList.remove('active');
    }
    
    let currentStepElement = document.querySelector('.form_step[step="' + stepNumber + '"]');
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    updateProgressBar(stepNumber);
}

function updateProgressBar(stepNumber) {
    let progressItems = document.querySelectorAll('.progress_items');
    
    for (let i = 0; i < progressItems.length; i++) {
        let itemStep = parseInt(progressItems[i].getAttribute('step'));
        
        progressItems[i].classList.remove('active', 'complited');
        
        if (itemStep < stepNumber) {
            progressItems[i].classList.add('complited');
        } else if (itemStep === stepNumber) {
            progressItems[i].classList.add('active');
        }
    }
}

function checkDuplicateAppointment(email, phone, appointmentDate) {
    let appointments = localStorage.getItem('appointments');
    if (!appointments) {
        return false;
    }
    
    appointments = JSON.parse(appointments);
    
    for (let i = 0; i < appointments.length; i++) {
        let apt = appointments[i];
        if ((apt.email === email || apt.phone === phone) && apt.appointmentDate === appointmentDate) {
            return true;
        }
    }
    
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('next1').addEventListener('click', function() {
        if (validateStep1()) {
            currentStep = 2;
            showStep(currentStep);
        }
    });
    
    document.getElementById('next2').addEventListener('click', function() {
        if (validateStep2()) {
            let email = document.getElementById('email').value.trim();
            let phonePrefix = document.getElementById('phonePrefix').value;
            let phone = document.getElementById('phone').value.trim();
            let fullPhone = phonePrefix + phone;
            let appointmentDate = document.getElementById('appointmentDate').value;
            
            if (checkDuplicateAppointment(email, fullPhone, appointmentDate)) {
                alert('⚠️ Duplicate Appointment Detected!\n\nYou already have an appointment scheduled on ' + appointmentDate );
                return;
            }
            
            currentStep = 3;
            showStep(currentStep);
        }
    });
    
    document.getElementById('next3').addEventListener('click', function() {
        if (validateStep3()) {
            currentStep = 4;
            showStep(currentStep);
        }
    });
    
    document.getElementById('prev2').addEventListener('click', function() {
        currentStep = 1;
        showStep(currentStep);
    });
    
    document.getElementById('prev3').addEventListener('click', function() {
        currentStep = 2;
        showStep(currentStep);
    });
    
    document.getElementById('prev4').addEventListener('click', function() {
        currentStep = 3;
        showStep(currentStep);
    });
    
    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateStep4()) {
            let formData = getFormData();
            
            saveAppointment(formData);
            
            let modal = document.getElementById('successModal');
            modal.classList.add('show');
            
            document.querySelector('.appointmentForm').reset();
            currentStep = 1;
            showStep(currentStep);
        }
    });
    
    let modalBtn = document.querySelector('.modal_content .btn');
    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            let modal = document.getElementById('successModal');
            modal.classList.remove('show');
        });
    }
    showStep(currentStep);
});