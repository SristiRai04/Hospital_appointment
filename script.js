// -------------------------------
// Load JSON Appointments
// -------------------------------
fetch('../appointments.json')
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById('appointments');
    data.forEach(app => {
      const p = document.createElement('p');
      p.textContent = `Doctor: ${app.doctor}, Time: ${app.time}`;
      div.appendChild(p);
    });
  })
  .catch(err => console.log("Error loading appointments:", err));

// -------------------------------
// Patient Appointment Script
// -------------------------------

// Array to store patients locally
let patients = [];

// Handle form submission
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const patient = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    doctor: document.getElementById("doctor").value
  };

  // Add patient to local list
  patients.push(patient);
  displayPatients();

  // Show popup message for success
  alert("✅ Appointment successfully booked!");

  // Clear form
  this.reset();
});

// Function to display patients
function displayPatients() {
  const patientList = document.getElementById("patientList");
  patientList.innerHTML = "";

  patients.forEach((p, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <b>Name:</b> ${p.name} |
      <b>Age:</b> ${p.age} |
      <b>Doctor:</b> ${p.doctor}
      <button onclick="deletePatient(${index})">✔ Treated</button>
    `;

    patientList.appendChild(li);
  });
}

// Function to delete patient after treatment
function deletePatient(index) {
  patients.splice(index, 1);
  displayPatients();
}

// -------------------------------
// SAVE patients to localStorage whenever updated
// -------------------------------
function savePatients() {
  localStorage.setItem("patients", JSON.stringify(patients));
}

// -------------------------------
// LOAD patients on page refresh
// -------------------------------
window.addEventListener("load", () => {
  const saved = localStorage.getItem("patients");
  if (saved) {
    patients = JSON.parse(saved);
    displayPatients();
  }
});

// -------------------------------
// OVERRIDE add & delete behavior safely
// -------------------------------
const originalPush = patients.push;
patients.push = function () {
  const result = originalPush.apply(this, arguments);
  savePatients();
  return result;
};

const originalSplice = patients.splice;
patients.splice = function () {
  const result = originalSplice.apply(this, arguments);
  savePatients();
  return result;
};

// -------------------------------
// DOWNLOAD EXCEL (CSV)
// -------------------------------
function downloadExcel() {
  if (patients.length === 0) {
    alert("No patient data available");
    return;
  }

  let csv = "Patient Name,Age,Doctor\n";

  patients.forEach(p => {
    csv += `${p.name},${p.age},${p.doctor}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "patient_records.csv";
  a.click();
}
