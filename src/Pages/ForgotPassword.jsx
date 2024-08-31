import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { FaCheckCircle, FaEnvelope, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    // State varaiable for toast notifications
    const [msg, setMsg] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success");

    const navigate = useNavigate();

    //Formik
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: async (values) => {
            const payload = { email: values.email };
            try {
                const res = await axios.post("https://password-reset-backend-kkfw.onrender.com/api/user/forgot-password", payload)
                setMsg(res.data.message)
                setShowToast(true);
                setToastType("success");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } catch (error) {
                setMsg(error.response?.data?.message || "Forgot Password failed");
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
                                    <strong>Forgot Password</strong>
                                    <p className='lead text-muted mt-2'>Enter your email to reset your password.</p>
                                </Card.Title>
                                <Form onSubmit={formik.handleSubmit}>
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

                                    <Button variant="primary" type="submit" className="w-100">
                                        Send Reset Link
                                    </Button>
                                </Form>

                                {/* Navigate to Sign Up and Sign In Pages */}
                                <div className="mt-3 text-center">
                                    <p>
                                        Don't have an account? <Link to="/register">Sign Up</Link>
                                    </p>
                                    <p>
                                        Remember your password? <Link to="/login">Sign In</Link>
                                    </p>
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
                            <FaEnvelope />
                            <strong className="me-auto">
                                {toastType === "success" ? "Success" : "Error"}
                            </strong>
                            <small>Password Reset</small>
                        </Toast.Header>
                        <Toast.Body className="text-white">{msg}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Container>
        </div>
    );
};

export default ForgotPassword;