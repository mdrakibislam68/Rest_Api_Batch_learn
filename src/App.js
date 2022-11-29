import "./App.css";
import Layout from "../src/Component/Layout";

import LoginForm from "./Pages/LoginForm";
import Signup from "../src/Pages/Signup";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Component/ProtectedRoute/PrivateRoute";
import PublicRoute from "./Component/ProtectedRoute/PublicRoute";
import ForgotPassword from "./Component/ForgotPassword";
import StudentRegister from "./Component/auth/StudentRegister";
import TeacherRegister from "./Component/auth/TeacherRegister";
import Dashboard from "./Pages/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";
import Profile from "./Component/StudentProfile/Profile";
import Billings from "./Component/StudentProfile/Billings";
import SessionHistory from "./Pages/SessionHistory";
import Classroom from "./Pages/Classroom";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/billings" element={<Billings />} />
            <Route path="/session-history" element={<SessionHistory />} />
            <Route path="/classroom/:id" element={<Classroom />} />
          </Route>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/student-register"
            element={
              <PublicRoute>
                <StudentRegister />
              </PublicRoute>
            }
          />
          <Route
            path="/teacher-register"
            element={
              <PublicRoute>
                <TeacherRegister />
              </PublicRoute>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
