import { Route, Routes } from "react-router-dom"
import CourseList from "./pages/student/CoursesList.jsx"
import CourseDetails from "./pages/student/CourseDetails.jsx"
// import Login from "./pages/student/Login"
// import Register from "./pages/student/Register"
// import Instructor from "./pages/instructor/Instructor"
// import Student from "./pages/student/Student"
import MyEnrollments from "./pages/student/MyEnrollments.jsx"
import Player from "./pages/student/Player.jsx"
import Loading from "./components/student/Loading.jsx"
import Home from "./pages/student/Home"
import Instructor from "./pages/instructor/Instructor"
import Dashboard from "./pages/instructor/Dashboard"
import AddCourse from "./pages/instructor/AddCourse"
import MyCourses from "./pages/instructor/MyCourses"
import StudentsEnrolled from "./pages/instructor/StudentsEnrolled"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/course-list" element={<CourseList/>} />
        <Route path="/course-list/:id" element={<CourseList/>} />
        <Route path="/course/:id" element={<CourseDetails/>} />
        <Route path="/my-enrollments" element={<MyEnrollments/>} />
        <Route path="/player/:courseId" element={<Player/>} />
        <Route path="/loading/:path" element={<Loading/>} />
        <Route path="/instructor" element={<Instructor/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="add-course" element={<AddCourse/>}/>
          <Route path="my-courses" element={<MyCourses/>}/>
          <Route path="students-enrolled" element={<StudentsEnrolled/>}/>
        </Route>

        {/* <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/instructor" element={<Instructor/>} />
        <Route path="/student" element={<Student/>} /> */}
      </Routes>
    </div>
  )
}

export default App
