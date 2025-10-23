// ===== Login Form Handling =====
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const registrationNumber = document.getElementById('registrationNumber').value;
            const password = document.getElementById('password').value;
            
            // Get registered users from localStorage
            const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            
            // Find user with matching registration number and password
            const user = users.find(u => u.registrationNumber === registrationNumber && u.password === password);
            
            if (user) {
                // Store user session
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('registrationNumber', registrationNumber);
                sessionStorage.setItem('userName', user.fullName);
                sessionStorage.setItem('userRole', user.role);
                
                // Show success message
                alert('Login successful! Welcome ' + user.fullName);
                
                // Redirect to home page
                window.location.href = 'home.html';
            } else {
                alert('Invalid registration number or password. Please try again or sign up.');
            }
        });
    }

    // Sign up form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const registrationNumber = document.getElementById('signupRegistrationNumber').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.getElementById('userRole').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Get existing users
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            
            // Check if registration number already exists
            if (users.find(u => u.registrationNumber === registrationNumber)) {
                alert('This registration number is already registered!');
                return;
            }
            
            // Check if email already exists
            if (users.find(u => u.email === email)) {
                alert('This email is already registered!');
                return;
            }
            
            // Create new user object
            const newUser = {
                id: Date.now(),
                fullName: fullName,
                registrationNumber: registrationNumber,
                email: email,
                phone: phone,
                password: password,
                role: role,
                createdAt: new Date().toISOString()
            };
            
            // Add to users array
            users.push(newUser);
            
            // Save to localStorage
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            
            // Show success message
            alert('Account created successfully! You can now login.');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Check if user is logged in (for protected pages)
    const protectedPages = ['home.html', 'student-form.html', 'view-students.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        const isLoggedIn = sessionStorage.getItem('loggedIn');
        if (!isLoggedIn) {
            // Redirect to login page if not logged in
            alert('Please login to access this page.');
            window.location.href = 'login.html';
        }
    }

    // Update user display name in navbar
    const userNameDisplay = document.querySelector('.user-dropdown span');
    if (userNameDisplay && sessionStorage.getItem('userName')) {
        userNameDisplay.textContent = sessionStorage.getItem('userName');
    }

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                // Clear session
                sessionStorage.clear();
                
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }

    // ===== Student Form Handling =====
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(studentForm);
            const studentData = Object.fromEntries(formData);
            
            // Get existing students from localStorage or create empty array
            let students = JSON.parse(localStorage.getItem('students')) || [];
            
            // Add new student with timestamp
            studentData.id = Date.now();
            studentData.createdAt = new Date().toISOString();
            students.push(studentData);
            
            // Save to localStorage
            localStorage.setItem('students', JSON.stringify(students));
            
            // Show success message
            alert('Student added successfully!');
            
            // Reset form
            studentForm.reset();
            
            // Optionally redirect to view students page
            if (confirm('Would you like to view all students?')) {
                window.location.href = 'view-students.html';
            }
        });
        
        // Form reset confirmation
        const resetBtn = studentForm.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                if (!confirm('Are you sure you want to reset the form?')) {
                    e.preventDefault();
                }
            });
        }
    }

    // ===== View Students Page Functionality =====
    const studentTable = document.querySelector('.student-table tbody');
    if (studentTable) {
        // Load and display students from localStorage
        loadStudents();
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterStudents();
            });
        }
        
        // Filter functionality
        const courseFilter = document.getElementById('courseFilter');
        const departmentFilter = document.getElementById('departmentFilter');
        
        if (courseFilter) {
            courseFilter.addEventListener('change', filterStudents);
        }
        if (departmentFilter) {
            departmentFilter.addEventListener('change', filterStudents);
        }
    }

    // ===== Mobile Menu Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ===== Load Students Function =====
function loadStudents() {
    const studentTableBody = document.querySelector('.student-table tbody');
    if (!studentTableBody) return;
    
    // Get students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    // If no students in localStorage, use sample data
    if (students.length === 0) {
        students = getSampleStudents();
    }
    
    displayStudents(students);
}

// ===== Display Students Function =====
function displayStudents(students) {
    const studentTableBody = document.querySelector('.student-table tbody');
    if (!studentTableBody) return;
    
    if (students.length === 0) {
        studentTableBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 40px;">
                    No students found. <a href="student-form.html">Add a student</a>
                </td>
            </tr>
        `;
        return;
    }
    
    studentTableBody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        
        // Determine status badge class
        let statusClass = 'badge-success';
        if (student.status === 'inactive') statusClass = 'badge-warning';
        if (student.status === 'graduated') statusClass = 'badge-info';
        
        row.innerHTML = `
            <td>${student.studentId}</td>
            <td>
                <div class="student-info">
                    <i class="fas fa-user-circle"></i>
                    <span>${student.firstName} ${student.lastName}</span>
                </div>
            </td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${getCourseLabel(student.course)}</td>
            <td>${getDepartmentLabel(student.department)}</td>
            <td>${student.semester}</td>
            <td><span class="badge ${statusClass}">${capitalizeFirst(student.status || 'active')}</span></td>
            <td class="action-btns">
                <button class="btn-icon btn-view" onclick="viewStudent(${student.id})" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-edit" onclick="editStudent(${student.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteStudent(${student.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        studentTableBody.appendChild(row);
    });
}

// ===== Filter Students Function =====
function filterStudents() {
    const searchInput = document.getElementById('searchInput');
    const courseFilter = document.getElementById('courseFilter');
    const departmentFilter = document.getElementById('departmentFilter');
    
    let students = JSON.parse(localStorage.getItem('students')) || getSampleStudents();
    
    // Apply search filter
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        students = students.filter(student => {
            return (
                student.firstName.toLowerCase().includes(searchTerm) ||
                student.lastName.toLowerCase().includes(searchTerm) ||
                student.email.toLowerCase().includes(searchTerm) ||
                student.studentId.toLowerCase().includes(searchTerm)
            );
        });
    }
    
    // Apply course filter
    if (courseFilter && courseFilter.value) {
        students = students.filter(student => student.course === courseFilter.value);
    }
    
    // Apply department filter
    if (departmentFilter && departmentFilter.value) {
        students = students.filter(student => student.department === departmentFilter.value);
    }
    
    displayStudents(students);
}

// ===== Student Action Functions =====
function viewStudent(id) {
    const students = JSON.parse(localStorage.getItem('students')) || getSampleStudents();
    const student = students.find(s => s.id === id);
    
    if (student) {
        let details = `
Student Details:
---------------
Name: ${student.firstName} ${student.lastName}
Email: ${student.email}
Phone: ${student.phone}
Student ID: ${student.studentId}
Course: ${getCourseLabel(student.course)}
Department: ${getDepartmentLabel(student.department)}
Semester: ${student.semester}
Status: ${capitalizeFirst(student.status || 'active')}
        `;
        
        if (student.address) {
            details += `\nAddress: ${student.address}`;
            details += `\nCity: ${student.city || 'N/A'}`;
            details += `\nState: ${student.state || 'N/A'}`;
        }
        
        alert(details);
    }
}

function editStudent(id) {
    alert('Edit functionality will be implemented with a modal or separate edit page.');
    // In a real application, this would open an edit form with the student's data
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        let students = JSON.parse(localStorage.getItem('students')) || getSampleStudents();
        students = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
        alert('Student deleted successfully!');
    }
}

// ===== Helper Functions =====
function getCourseLabel(course) {
    const courses = {
        'btech': 'B.Tech',
        'mtech': 'M.Tech',
        'bca': 'BCA',
        'mca': 'MCA',
        'bsc': 'B.Sc',
        'msc': 'M.Sc'
    };
    return courses[course] || course;
}

function getDepartmentLabel(department) {
    const departments = {
        'cse': 'Computer Science',
        'ece': 'Electronics & Communication',
        'eee': 'Electrical Engineering',
        'mech': 'Mechanical Engineering',
        'civil': 'Civil Engineering'
    };
    return departments[department] || department;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getSampleStudents() {
    return [
        {
            id: 1,
            studentId: 'STU001',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+91 9876543210',
            course: 'btech',
            department: 'cse',
            semester: '5',
            status: 'active'
        },
        {
            id: 2,
            studentId: 'STU002',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '+91 9876543211',
            course: 'mca',
            department: 'cse',
            semester: '3',
            status: 'active'
        },
        {
            id: 3,
            studentId: 'STU003',
            firstName: 'Mike',
            lastName: 'Johnson',
            email: 'mike.j@example.com',
            phone: '+91 9876543212',
            course: 'btech',
            department: 'mech',
            semester: '7',
            status: 'inactive'
        },
        {
            id: 4,
            studentId: 'STU004',
            firstName: 'Sarah',
            lastName: 'Williams',
            email: 'sarah.w@example.com',
            phone: '+91 9876543213',
            course: 'mtech',
            department: 'ece',
            semester: '2',
            status: 'active'
        },
        {
            id: 5,
            studentId: 'STU005',
            firstName: 'David',
            lastName: 'Brown',
            email: 'david.b@example.com',
            phone: '+91 9876543214',
            course: 'btech',
            department: 'cse',
            semester: '6',
            status: 'graduated'
        }
    ];
}
