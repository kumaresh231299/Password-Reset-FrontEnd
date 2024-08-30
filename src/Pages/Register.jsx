import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // State varaiable for toast notifications
  const [msg, setMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

  // State varaiable for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("User Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/\d/, "Password must contain a number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const payload = { username: values.username, email: values.email, password: values.password };
      try {
        const res = await axios.post("http://localhost:4000/api/user/register-user", payload);
        setMsg(res.data.message);
        setShowToast(true);
        setToastType("success");
        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (error) {
        setMsg(error.response?.data?.message || "Registration failed");
        setToastType("error");
        setShowToast(true);
      }
    }
  })

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  <strong>User Registration</strong>
                    <p className='lead text-muted mt-2'>Create your account to get started.</p>
                </Card.Title>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingUsername"
                      name="username"
                      type="text"
                      placeholder="UserName"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.username && formik.errors.username}
                    />
                    <label htmlFor="floatingUsername">User Name</label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingEmail"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <label htmlFor="floatingEmail">Email address</label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Floating>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Floating>
                      <Form.Control
                        id="floatingPassword"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.password && formik.errors.password}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    {/* <Button
                      variant="secondary"
                      className="position-absolute top-50 end-0 translate-middle-y" // icon position
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{ height: '100%', borderRadius: '0 4px 4px 0' }}       // icon cover top bottom
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button> */}
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">Register</Button>
                </Form>

                {/* Navigate to Login Page */}
                <div className="mt-3 text-center">
                  <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Toast Notification */}
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            bg={toastType === "success" ? "success" : "danger"}
          >
            <Toast.Header
              className={`text-white bg-${toastType === "success" ? "success" : "danger"}`}
            >
              {/* <Toast.Header className="text-white" style={{ backgroundColor: toastType === "success" ?
             "#28a745" : "#dc3545", fontWeight: "bold" }}></Toast.Header>   */}

              {/* Conditional Icon and Header based on toast type */}
              {toastType === "success" ? (
                <FaCheckCircle className="me-2" />
              ) : (
                <FaExclamationCircle className="me-2" />
              )}
              <FaLock />
              <strong className="me-auto">
                {toastType === "success" ? "success" : "Error"}
              </strong>
              <small>Registration</small>
            </Toast.Header>
            <Toast.Body className="text-white">{msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </div>
  );
};

export default Register;
