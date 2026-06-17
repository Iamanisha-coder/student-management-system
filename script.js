const studentForm = document.getElementById('student-form');
const studentTableBody = document.getElementById('student-table-body');
const searchInput = document.getElementById('search-input');

// Load existing data or initialize empty array
let students = JSON.parse(localStorage.getItem('students')) || [];

// Save to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Render data into the table
function renderStudents(filteredStudents = students) {
    studentTableBody.innerHTML = '';

    if (filteredStudents.length === 0) {
        studentTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; opacity:0.5; padding: 20px 0;">No student records found.</td></tr>`;
        return;
    }

    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Add a new student record
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('student-name').value.trim();
    const id = document.getElementById('student-id').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const course = document.getElementById('student-course').value;

    // Check for duplicate ID numbers
    if (students.some(student => student.id === id)) {
        alert("A student with this ID already exists!");
        return;
    }

    students.push({ name, id, email, course });
    saveStudents();
    renderStudents();
    studentForm.reset();
});

// Delete a student record
window.deleteStudent = function(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        saveStudents();
        renderStudents();
    }
};

// Filter records dynamically based on search
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) || 
        student.id.toLowerCase().includes(searchTerm)
    );
    renderStudents(filtered);
});

// Initial load
renderStudents();
