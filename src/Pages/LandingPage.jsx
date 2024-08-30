import React from 'react';
import { Card, Container, Nav, Navbar } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const course = [
        {
            name: 'React Basics',
            description: 'Learn the fundamentals of React, including components, hooks, and state management.',
        },
        {
            name: 'Advanced React',
            description: 'Dive deeper into React with advanced concepts like context, portals, and performance optimization.',
        },
        {
            name: 'Full Stack Development',
            description: 'Build full-stack applications using React, Node.js, and MongoDB.',
        }
    ]

    return (
        <div>
            {/* Navbar */}
            <Navbar fixed="top" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/home'>Sk Course Plarform</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to='/login'>
                                <FiLogOut className='me-2' style={{ color: 'white' }} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Header Section */}
            <Container className='mt-5 pt-5 text-center'>
                <div className="mb-4">
                    <h1 className='display-4 font-weight-bold'>Explore Our Courses</h1>
                    <p className='lead text-muted'>Discover a variety of courses to enhance your skills and knowledge.</p>
                </div>
            </Container>

            {/* Course Details in Card View */}
            <Container className='mt-4'>
                {course.map((course, index) => {
                    return (
                        <Card key={index} className='mb-3'>
                            <Card.Header><FaBook className='me-2' /> {course.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>{course.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        </div>
    );
};

export default LandingPage;