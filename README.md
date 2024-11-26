# SkillProve AI

## Description  

Skill Assessment Platform is a robust and interactive solution to evaluate and enhance your skills through proctored tests. The platform offers **17+ skill assessment tests**, detailed analytics, and an engaging user experience with light and dark themes. It’s designed for students, professionals, and organizations to track performance and improve over time.  

---

## Features  

### **User Management**  
- **Register Page**: Sign up with a username, email, and password.  
- **Login Page**: Log in with your username and password.  

### **Dashboard**  
- **Home Page**:  
  - Displays the current list of available tests under the heading **"Available Skill Assessments"**.  
  - A video tutorial to help users maximize their platform benefits.  

### **Available Tests**  
- Browse through a wide range of tests, including:  
  - HTML, CSS, JavaScript, React, C++, Python, Java, Machine Learning, Node.js, MongoDB, C, C#, SQL, Express.js, Web Servers, Data Science, Aptitude.  
  - **(More tests and features will be added in future updates.)**  
- **Test Details**:  
  - Includes test overview (duration, total questions, format), guidelines, and preparation tips.  

### **Taking a Test**  
- **Start Test**:  
  - Requires full-screen mode to maintain test integrity.  
  - **Security Features**:  
    - Exiting full-screen mode triggers warnings (max 5 violations before automatic submission).  
    - Proctored test with camera monitoring (using `tiny_face_detector_model`).  
    - Detects multiple faces, tab switches, and screen recording attempts (max 3 violations for each).  
  - **Test Interface**:  
    - **Left Panel**: Question navigation panel with sections and questions.  
    - **Flagging Questions**: Mark questions for review with a yellow ring.  
    - **Header**: Displays test type, current section, time remaining, and a **Submit Test** button.  
    - **Face Monitoring**: Constantly displays and monitors the user's face.  

### **Post-Test Features**  
- **Test Results**:  
  - Immediate feedback with test score and a violation summary (if applicable).  
  - Encourages better test practices with detailed explanations of violations.  
- **Results Analytics**:  
  - Track scores across all tests in a **graphical interface**.  
  - Includes:  
    - Line graph showing percentages over time.  
    - Average score, highest score, latest score, and total attempts for each test type.  

### **Other Features**  
- **Profile Management**:  
  - Update personal information such as name, avatar, and role.  
  - Email cannot be changed for security reasons.  
- **Notifications**:  
  - View important announcements from admins.  
- **Themes**:  
  - Toggle between **light** and **dark** themes.  

---

## Technology Stack  

### **Frontend**  
- [Next.js](https://nextjs.org/): Framework for server-side rendering and static site generation.  
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling.  
- [shadcn/ui](https://shadcn.dev/): A collection of reusable UI components.  

### **Backend**  
- [Node.js](https://nodejs.org/): JavaScript runtime for backend development.  
- [Express.js](https://expressjs.com/): Web application framework for building REST APIs.  

### **Database**  
- [MongoDB](https://www.mongodb.com/): NoSQL database for storing user data, test results, and configurations.  

---

## Installation and Setup  

### **Prerequisites**  
- Node.js (v18+ recommended)  
- npm or yarn  
- MongoDB  

### **Steps to Run Locally**  

1. Clone the repository:  

   ```bash  
   git clone https://github.com/<your-username>/skill-assessment-platform.git  
   cd skill-assessment-platform  
   ```  

2. Install dependencies:  

   ```bash  
   npm install  
   ```  

   Or, if using Yarn:  

   ```bash  
   yarn  
   ```  

3. Set up environment variables:  
   - Create a `.env` file in the root directory and configure the following:  

     ```env  
     MONGO_URI=<your-mongodb-connection-string>  
     NODE_ENV=development  
     JWT_SECRET=<your-jwt-secret>  
     ```  

4. Start the development server:  

   ```bash  
   npm run dev  
   ```  

   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.  

---

## Screenshots  

### **Register Page**
![image](https://github.com/user-attachments/assets/2b7fd930-e7f3-4822-aa25-8e1290c03bdd)

### **Login Page**
![image](https://github.com/user-attachments/assets/f75b5b61-4656-43f9-b1ba-c36055a4e1a8)

### **Dashboard**  
![image](https://github.com/user-attachments/assets/b1525e5f-b1f0-4d83-8863-6ef5673ee5d0)

### **Available Tests**  
![image](https://github.com/user-attachments/assets/f24e16c5-542f-4084-8478-1e669b1d82bf)

### **Test Interface**  
![image](https://github.com/user-attachments/assets/ed4b578f-42f4-4e3a-871f-d0bcf65f268e)

### **Results Analytics**  
![image](https://github.com/user-attachments/assets/c5613341-da7d-44ed-8271-30e53628b0b5)

### **Profile Page**
![image](https://github.com/user-attachments/assets/b6382a9e-9888-475b-8f1e-5ff2e864ab4f)

## Contributing  

We welcome contributions! Please fork this repository and submit a pull request for any feature additions or bug fixes.  

---

## License  

This project is licensed under the **MIT License**.  

---

## Contact  

For any queries or issues, feel free to contact us at **github/evenidk**.  
