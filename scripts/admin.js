function getAppointmentData() {
    const data = localStorage.getItem("appointments")

    const parsedData = JSON.parse(data)

    return parsedData;   
}

function sortAppointment() {
    const appointments = getAppointmentData();

    appointments.sort((a, b) => {
        const dateA = new Date(a.appointmentDate + ' ' + a.timeSlot.split('-')[0]);
        const dateB = new Date(b.appointmentDate + ' ' + b.timeSlot.split('-')[0]);
        return dateA - dateB;
    });

    return appointments;
}

function loadAppointments() {
    const appointment = sortAppointment()
    renderTable(appointment);
}

function renderTable(appointments) {
    const tableBody = document.getElementById('tableBody');
            
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

    
            
    tableBody.innerHTML = appointments.map((apt, index) =>
        
        `
        <tr>
            <td><strong>${formatDate(apt.appointmentDate)}</strong></td>
            <td>${apt.timeSlot}</td>
            <td><strong>${apt.name}</strong></td>
            <td>${apt.email}</td>
            <td>${apt.phone}</td>
            <td>${apt.doctor}</td>
            <td>${apt.resonForVisit}</td>
            <td class="healthConcerns">${apt.healthConcerns.map(eachHealthConcern => 
                `<span class="eachHealthTag">${eachHealthConcern}</span>`
            ).join(', ')}</td>
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

function deleteRowData(index) {
    alert("Do u want to delte the reocord !")
    const appointments = sortAppointment();
    appointments.splice(index, 1); 
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments();
}

function updateRowData(index) {    
    const indexPage = 'index.html'

    const params = {
        edit: index
    }

    const queryString = new URLSearchParams(params).toString()

    const newUrl = `${indexPage}?${queryString}`

    window.location.href = newUrl
    
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

loadAppointments();

window.sortAppointment = sortAppointment;
window.loadAppointments = loadAppointments