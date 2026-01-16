import {validateStep1,validateStep2,validateStep3,validateStep4,allValidationSteps,} from "./validation/validation.js"
import {getFormData} from "./utils/formData.js"
import {saveAppointment} from "./db/localDb.js"
import type { AppointmentFormData } from "./types/Alltypes.js";
import {sortAppointment} from "./lib/reuse.js"

let currentStep : number = 1;
// let totalSteps : number= 4;
let isEditMode : boolean = false;
let editIndex : number | null = null;

const urlParams:URLSearchParams = new URLSearchParams(window.location.search)
const editParam:string | null = urlParams.get('edit')

function preFillForm(data : AppointmentFormData) {
    (document.getElementById('email') as HTMLInputElement).value = data.email || '';
    (document.getElementById('name') as HTMLInputElement).value = data.name || '';
    (document.getElementById('phonePrefix') as HTMLSelectElement).value = data.phonePrefix || '+91';
    (document.getElementById('phone') as HTMLInputElement).value = data.phone || '';
    (document.getElementById('lastVisit') as HTMLInputElement).value = data.lastVisit || '';
    
    (document.getElementById('doctor') as HTMLSelectElement).value = data.doctor || '';
    (document.getElementById('appointmentDate') as HTMLInputElement).value = data.appointmentDate || '';
    (document.getElementById('timeSlot') as HTMLInputElement).value = data.timeSlot || '';
    (document.getElementById('resonForVisit') as HTMLSelectElement).value = data.resonForVisit || '';
    
    if (data.healthConcerns && Array.isArray(data.healthConcerns)) {
        data.healthConcerns.forEach(concern => {
            const checkbox = (document.querySelector(`input[name="healthConcerns"][value="${concern}"]`) as HTMLInputElement);
            if (checkbox) checkbox.checked = true;
        });
    }
    (document.getElementById('medications') as HTMLTextAreaElement).value = data.medications || '';
    (document.getElementById('allergies') as HTMLTextAreaElement).value = data.allergies || '';
    if (data.medicalRecord) {
        const recordRadio = (document.querySelector(`input[name="radioMedicalRecords"][value="${data.medicalRecord}"]`) as HTMLInputElement);
        if (recordRadio) recordRadio.checked = true;
    }
    if (data.consultationType) {
        const consultRadio = (document.querySelector(`input[name="radioCousultationType"][value="${data.consultationType}"]`) as HTMLInputElement);
        if (consultRadio) consultRadio.checked = true;
    }
    (document.getElementById('term1') as HTMLInputElement).checked = true;
    (document.getElementById('term2') as HTMLInputElement).checked = true;
    if (data.notifications && Array.isArray(data.notifications)) {
        data.notifications.forEach(notif => {
            const checkbox = (document.querySelector(`input[name="notification"][value="${notif}"]`) as HTMLInputElement);
            if (checkbox) checkbox.checked = true;
        });
    }
}

function showStep(stepNumber : number) {
    let allSteps : NodeListOf<Element> = document.querySelectorAll('.form_step');
    for (let i = 0; i < allSteps.length; i++) {
        if(allSteps ) { 
            const a = allSteps[i]
            if(a) {
                a.classList.remove('active');
            }
            
        }    
    }
    
    let currentStepElement = document.querySelector('.form_step[step="' + stepNumber + '"]');
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    updateProgressBar(stepNumber);
}

function updateProgressBar(stepNumber: number): void {
    const progressItems = document.querySelectorAll<HTMLElement>('.progress_items');

    progressItems.forEach((item) => {
        const stepAttr = item.getAttribute('step');
        
        if (stepAttr === null) return;

        const itemStep = parseInt(stepAttr, 10);

        item.classList.remove('active', 'complited'); 

        if (itemStep < stepNumber) {
            item.classList.add('complited');
        } else if (itemStep === stepNumber) {
            item.classList.add('active');
        }
    });
}

function checkDuplicateAppointment({email, phone, appointmentDate} : {
    email : string,
    phone : string,
    appointmentDate : string
}) {
    let appointments = sortAppointment() as AppointmentFormData[];

    if (!appointments || appointments.length === 0) {
        return false;
    }

    for (let i = 0; i < appointments.length; i++) {
        const eachRowData = appointments[i] as AppointmentFormData;
        
        if (isEditMode && editIndex !== null && i === editIndex) {
            continue;
        }
        
        if ((eachRowData.email === email || eachRowData.phone === phone) && 
            eachRowData.appointmentDate === appointmentDate) {
            return true;
        }
    }
    
    return false;
}

function setupRealtimeValidation() {
    (document.getElementById('email') as HTMLInputElement).addEventListener('input', function() {
        validateStep1();
    });
    (document.getElementById('name') as HTMLInputElement).addEventListener('input', function() {
        validateStep1();
    });
    (document.getElementById('phone') as HTMLInputElement).addEventListener('input', function() {
        validateStep1();
    });
    (document.getElementById('lastVisit') as HTMLInputElement).addEventListener('change', function() {
        validateStep1();
    });
    
    (document.getElementById('doctor') as HTMLSelectElement).addEventListener('change', function() {
        validateStep2();
    });
    (document.getElementById('appointmentDate') as HTMLInputElement).addEventListener('change', function() {
        validateStep2();
    });
    (document.getElementById('timeSlot') as HTMLInputElement).addEventListener('change', function() {
        validateStep2();
    });
    (document.getElementById('resonForVisit') as HTMLInputElement).addEventListener('input', function() {
        validateStep2();
    });
    
    let healthCheckboxes = (document.querySelectorAll('input[name="healthConcerns"]') as NodeListOf<HTMLInputElement>)
    for (let i = 0; i < healthCheckboxes.length; i++) {
        const item  = healthCheckboxes[i] as HTMLElement
        if(!item) return;
        item.addEventListener('change', function() {
            validateStep3();
        });
    }
    
    let medicalRadios = (document.querySelectorAll('input[name="radioMedicalRecords"]') as NodeListOf<HTMLInputElement>)
    for (let i = 0; i < medicalRadios.length; i++) {
        const item = medicalRadios[i] as HTMLElement;
        if(!item) return;
        item.addEventListener('change', function() {
            validateStep4();
        });
    }
    
    let consultRadios = (document.querySelectorAll('input[name="radioCousultationType"]') as NodeListOf<HTMLInputElement>);
    for (let i = 0; i < consultRadios.length; i++) {
        const item = consultRadios[i] as HTMLElement;
        if(!item) return;
        item.addEventListener('change', function() {
            validateStep4();
        });
    }
    
    (document.getElementById('term1') as HTMLInputElement).addEventListener('change', function() {
        validateStep4();
    });
    (document.getElementById('term2') as HTMLInputElement).addEventListener('change', function() {
        validateStep4();
    });
    
    let notifCheckboxes = (document.querySelectorAll('input[name="notification"]') as NodeListOf<HTMLInputElement>);
    for (let i = 0; i < notifCheckboxes.length; i++) {
        const item = notifCheckboxes[i] as HTMLInputElement
        if(!item) return;
        item.addEventListener('change', function() {
            validateStep4();
        });
    }
}

function loadAppointments() {
    const appointment = sortAppointment() as AppointmentFormData[]
    renderTable(appointment);
}

function renderTable(appointments : AppointmentFormData[]) {
    const tableBody = document.getElementById('tableBody') as HTMLElement;
            
    if (appointments.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="13" class="noAppointment">
                    <h3>No appointments found</h3>
                    <p>There are no appointments to display.</p>
                </td>
            </tr>
        `;
        return;
    }

    
            
    tableBody.innerHTML = appointments.map((apt : AppointmentFormData, index : number) =>
        
        `
        <tr>
            <td><strong>${formatDate(apt.appointmentDate)}</strong></td>
            <td>${apt.timeSlot}</td>
            <td><strong>${apt.name}</strong></td>
            <td>${apt.email}</td>
            <td>${apt.phone}</td>
            <td class="doctor">${apt.doctor}</td>
            <td>${apt.resonForVisit}</td>
            <td class="healthConcerns">${apt.healthConcerns.map(eachHealthConcern => 
                `<span class="eachHealthTag">${eachHealthConcern}</span>`
            ).join(' ')}</td>
            <td>${apt.medications || '-'}</td>
            <td>${apt.allergies || '-'}</td>
            <td>${apt.medicalRecord}</td>
            <td>${apt.consultationType}</td>
            <td class="internalBtn">
                <button onclick="updateRowData(${index})" class="update_btn update">✏️</button>
                <button onclick="deleteRowData(${index})" class="delete_btn delete">❌</button>
            </td>
        </tr>
    `).join('');

   
}

function deleteRowData(index : number) {
    if (confirm("Do you want to delete this record?")) {
        const appointments = sortAppointment() as AppointmentFormData[]
        appointments.splice(index, 1); 
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
    }
}

function updateRowData(index : number) {    
    const indexPage = 'index.html'

    const params  = {
        edit: index.toString()
    } 

    const queryString = new URLSearchParams(params).toString()

    const newUrl = `${indexPage}?${queryString}`

    window.location.href = newUrl
    
}
(window as any).updateRowData = updateRowData;
(window as any).deleteRowData = deleteRowData;

function formatDate(dateString : string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

loadAppointments();

document.addEventListener('DOMContentLoaded', function() {
    setupRealtimeValidation();
    
    if (editParam !== null) {
        isEditMode = true;
        editIndex = parseInt(editParam);
        
        const appointments = sortAppointment() as AppointmentFormData[];
        
        if (editIndex >= 0 && appointments[editIndex]) {
            // console.log('index kandskfnasdinfadsfads:', editIndex);
            // console.log('appt adfasdif:', appointments[editIndex]);
            
            preFillForm(appointments[editIndex] as AppointmentFormData);
            
            let submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.textContent = 'Update Appointment';
            }
            
            setTimeout(function() {
                console.log('Running validations after prefill');
                validateStep1();
                validateStep2();
                validateStep3();
                validateStep4();
            }, 200);
        }
    }
    
    (document.getElementById('next1') as HTMLButtonElement).addEventListener('click', function() {
        if (validateStep1()) {
            currentStep = 2;
            showStep(currentStep);
        }
    });
    
    (document.getElementById('next2') as HTMLButtonElement).addEventListener('click', function() {
        if (validateStep2()) {
            let email = (document.getElementById('email') as HTMLInputElement).value.trim();
            let phonePrefix = (document.getElementById('phonePrefix') as HTMLSelectElement).value;
            let phoneNo = (document.getElementById('phone') as HTMLInputElement).value.trim();
            let phone : string = phonePrefix + phoneNo;
            let appointmentDate = (document.getElementById('appointmentDate') as HTMLInputElement).value;
            
            if (checkDuplicateAppointment({email, phone, appointmentDate}) && isEditMode == false) {
                alert('⚠️ Duplicate Appointment Detected!\n\nYou already have an appointment scheduled on ' + appointmentDate);
                return;
            }
            
            currentStep = 3;
            showStep(currentStep);
        }
    });
    
    (document.getElementById('next3') as HTMLButtonElement).addEventListener('click', function() {
        if (validateStep3()) {
            currentStep = 4;
            showStep(currentStep);
        }
    });
    
    (document.getElementById('prev2') as HTMLButtonElement).addEventListener('click', function() {
        currentStep = 1;
        showStep(currentStep);
    });
    
    (document.getElementById('prev3') as HTMLButtonElement).addEventListener('click', function() {
        currentStep = 2;
        showStep(currentStep);
    });
    
    (document.getElementById('prev4') as HTMLButtonElement).addEventListener('click', function() {
        currentStep = 3;
        showStep(currentStep);
    });
    
    (document.getElementById('submitBtn') as HTMLButtonElement).addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateStep4()) {
            let formData = getFormData();
            
            let modal = document.getElementById('successModal') as HTMLElement;
            const booked = document.querySelector(".booked") as HTMLElement;
            const submitted = document.querySelector(".submitted") as HTMLElement;
            
            if (isEditMode && editIndex !== null) {
                saveAppointment({formData, isEdit: true, editIndex});
                
                if (booked) booked.textContent = "updated.";
                if (submitted) submitted.textContent = 'updated';
            } else {
                saveAppointment({formData, isEdit: false, editIndex: null});
                
                if (booked) booked.textContent = "booked.";
                if (submitted) submitted.textContent = 'submitted';
            }
            
            modal.classList.add('show');
            
            (document.querySelector('.appointmentForm') as HTMLFormElement).reset();
            currentStep = 1;
            showStep(currentStep);
            
            isEditMode = false;
            editIndex = null;
        }
    });
    
    let modalBtn = document.querySelector('.modal_content .btn') as Element;
    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            let modal = document.getElementById('successModal') as HTMLElement;
            modal.classList.remove('show');
            window.location.href = "index.html"
        });
        
    }
    showStep(currentStep);
});