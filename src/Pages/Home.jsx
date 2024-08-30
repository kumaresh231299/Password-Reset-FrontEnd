import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <NavBar />
            <header className="my-5 pt-5" >
                <div className="container mt-5">
                    <h1>Authentication</h1>
                    <p className="lead">
                        Authentication is a process that verifies a person's identity or a
                        statement or fact.
                    </p>
                    <div className="m-5">
                        <Button variant="dark" size="lg">
                            <Link
                                to="/register"
                                style={{ color: "white", textDecoration: "none" }} // Inline styles for white color and no underline
                            >
                                Get Started
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
            <Footer />
        </div>
    );
};

export default Home;
