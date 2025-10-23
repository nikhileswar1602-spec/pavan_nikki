# Student Management System

A modern, responsive web application for managing student records with a beautiful UI design.

## 🎨 Features

- **Sign Up System** - User registration with validation and role selection
- **Login System** - Secure login using registration number and password
- **Dashboard/Home Page** - Overview with statistics and quick actions
- **Student Form** - Comprehensive form to add new students
- **View Students** - Table view with search and filter functionality
- **Responsive Design** - Works seamlessly on all devices
- **Local Storage** - Stores user accounts and student data in browser's local storage

## 📁 Project Structure

```
personal-website/
├── index.html           # Entry point (redirects to login)
├── login.html           # Login page (uses Registration Number)
├── signup.html          # User registration page
├── home.html            # Dashboard/Home page
├── student-form.html    # Add student form
├── view-students.html   # View all students
├── css/
│   └── styles.css       # Main stylesheet
├── js/
│   └── main.js          # JavaScript functionality
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No server or additional software required!

### Installation

1. Download or clone this repository
2. Open `login.html` in your web browser

### Usage

1. **Sign Up Page** (`signup.html`)
   - Fill in your details including full name, registration number, email, phone
   - Create a password and select your role (Student/Teacher/Admin)
   - Click "Create Account" to register

2. **Login Page** (`login.html`)
   - Enter your registration number and password
   - Click "Login" to access the dashboard
   - New users can click "Sign up" to create an account

3. **Home Page** (`home.html`)
   - View statistics overview
   - Access quick actions
   - See recent activity
   - Your name will be displayed in the navbar

4. **Add Student** (`student-form.html`)
   - Fill in the student information form
   - Required fields are marked with *
   - Click "Save Student" to add to the system

5. **View Students** (`view-students.html`)
   - Browse all student records
   - Use search to find specific students
   - Filter by course or department
   - View, edit, or delete student records

## 🎨 Design Features

- **Modern UI** - Clean and professional design
- **Color Scheme** - Gradient primary colors (Purple/Indigo)
- **Typography** - Poppins font family
- **Icons** - Font Awesome icons
- **Animations** - Smooth transitions and hover effects
- **Cards & Shadows** - Modern card-based layout with subtle shadows

## 💾 Data Storage

The application uses the browser's **localStorage** to store student data. This means:
- Data persists even after closing the browser
- Data is stored locally on your device
- No backend server required
- Each browser stores its own data

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary brand color */
    --success-color: #10b981;    /* Success indicators */
    --warning-color: #f59e0b;    /* Warning indicators */
    --danger-color: #ef4444;     /* Error/Delete actions */
}
```

### Adding More Fields

1. Edit `student-form.html` to add new input fields
2. Update the form handling in `js/main.js`
3. Modify the table columns in `view-students.html`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (< 768px)

## 🔐 Security Note

This is a frontend-only demonstration. For production use:
- Implement proper backend authentication
- Use secure password hashing
- Validate data server-side
- Use a proper database instead of localStorage
- Implement proper session management

## 👨‍💻 Developer

**Battini Nikhileswar**

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Credits

- **Font Awesome** - Icons
- **Google Fonts** - Poppins font family
- **CSS Grid & Flexbox** - Layout system

## 📞 Support

For issues or questions, please contact the developer.

---

**Enjoy using the Student Management System!** 🎓
