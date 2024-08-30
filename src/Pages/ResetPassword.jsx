import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    // State varaiable for toast notifications
    const [msg, setMsg] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success");

    const navigate = useNavigate();
    const { id, token } = useParams(); //Get id and token from the URL

    //Formik
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object().shape({
            newPassword: Yup.string()
                .required("New Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
            confirmPassword: Yup.string()
                .required("Confirm Password is required")
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
        }),
        onSubmit: async (values) => {
            const payload = { newPassword: values.newPassword };
            try {
                const res = await axios.put(`http://localhost:4000/api/user/reset-password/${id}/${token}`, payload)
                setMsg(res.data.message)
                setShowToast(true);
                setToastType("success");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } catch (error) {
                setMsg(error.response?.data?.message || "Reset Password failed");
                setToastType("danger");
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
                                    <strong>Reset Password</strong>
                                    <p className='lead text-muted mt-2'>Create a new password for your account.</p>
                                </Card.Title>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            id="floatingNewPassword"
                                            name="newPassword"
                                            type="password"
                                            placeholder="New Password"
                                            value={formik.values.newPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                                        />
                                        <label htmlFor="floatingNewPassword">New Password</label>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.newPassword}
                                        </Form.Control.Feedback>
                                    </Form.Floating>

                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            id="floatingConfirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        />
                                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Floating>

                                    <Button variant="primary" type="submit" className="w-100">
                                        Reset Password
                                    </Button>
                                </Form>
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
                            <strong className="me-auto">
                                {toastType === "success" ? "Success" : "danger"}
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

export default ResetPassword;