
# 📚 Studyhub

> A Full Stack Online Learning Platform built with the MERN stack, enabling instructors to create and manage courses, and learners to access quality education from anywhere.

---

## 🌐 Live Demo

[🔗 Deployed Link (Coming Soon)](https://your-deployed-link.com)

---

## 🖼️ Screenshots

> *(Add actual screenshots in the `/screenshots` folder and update the paths below)*

- ![Home Page](./screenshots/home.png)
- ![Instructor Dashboard](./screenshots/instructor-dashboard.png)
- ![Course View](./screenshots/course-page.png)

---

## ✨ Features

### 👨‍🏫 Instructor Features
- Instructor Registration/Login
- Course creation with title, description, and video content
- Video uploads using Cloudinary
- Dashboard to manage courses and view enrolled students

### 👩‍🎓 Learner Features
- Student Registration/Login
- Browse and enroll in courses
- Stream course videos
- View enrolled courses and track progress

### 🔐 Common Features
- JWT-based authentication
- Role-based access control (Instructor & Student)
- Responsive and clean UI using Tailwind CSS
- Modular and scalable codebase

---

## 🛠️ Tech Stack

| Layer       | Tech Used                      |
|------------|---------------------------------|
| Frontend   | React.js, Redux Toolkit, Tailwind CSS |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB                         |
| Media Hosting | Cloudinary                   |
| Auth       | JWT, bcrypt                     |
| Dev Tools  | Postman, VS Code, GitHub        |

---

## 📁 Folder Structure

```
KnowGeek/
├── client/               # Frontend React app
├── server/               # Backend Express app
├── screenshots/          # Screenshots for documentation
├── .env                  # Environment variables (not pushed to Git)
├── README.md             # You're reading it!
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/aayanofficial5/KnowGeek.git
cd KnowGeek
```

---

### 2. Install Dependencies

```bash
# For frontend
cd client
npm install

# For backend
cd ../server
npm install
```

---

### 3. Set up Environment Variables

Create a `.env` file inside the `/server` folder with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4. Run the App

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

---

## 💡 Future Improvements

- Payment Integration (Razorpay/Stripe)
- Certificate generation for course completion
- Search and filtering of courses
- Chat or forum feature for learners
- Admin dashboard for platform management

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/aayanofficial5/KnowGeek/issues).

---

## 📧 Contact

Developed with ❤️ by [**Aayan**](https://github.com/aayanofficial5)  
📬 Email: *your-email@example.com*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
