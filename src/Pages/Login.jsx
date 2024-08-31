import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const payload = { email: values.email, password: values.password };
      try {
        const res = await axios.post("https://password-reset-backend-kkfw.onrender.com/api/user/login-user", payload)
        setMsg(res.data.message)
        setShowToast(true);
        setToastType("success");
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } catch (error) {
        setMsg(error.response?.data?.message || "Login failed");
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
                  <strong>User Login</strong>
                  <p className='lead text-muted mt-2'>Access your account.</p>
                </Card.Title>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="floatingInputCustom"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Floating>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Floating>
                      <Form.Control
                        id="floatingPasswordCustom"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.password && formik.errors.password}
                      />
                      <label htmlFor="floatingPasswordCustom">Password</label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    {/* <Button
                      variant="secondary"
                      className="position-absolute top-50 end-0 translate-middle-y"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{ height: '100%', borderRadius: '0 4px 4px 0' }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button> */}
                  </Form.Group>
                  {/* Navigate to Forgot Password Page */}
                  <div className="mb-3 text-end">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>

                {/* Navigate to SignUp Page */}
                <div className="mt-3 text-center">
                  <p>Don't have an account?<Link to="/register">Sign UP</Link></p>
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
              {toastType === "success" ? (
                <FaCheckCircle className="me-2" />
              ) : (
                <FaExclamationCircle className="me-2" />
              )}
              <FaLock />
              <strong className="me-auto">
                {toastType === "success" ? "Success" : "Error"}
              </strong>
              <small>Login</small>
            </Toast.Header>
            <Toast.Body className="text-white">{msg}</Toast.Body>
          </Toast>
        </ToastContainer>

      </Container>
    </div>

  );
};

export default Login;
