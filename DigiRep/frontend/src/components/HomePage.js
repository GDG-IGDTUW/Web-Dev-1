import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate(); // initialize the navigate function

    return (
        <div className="home-page">
            <h1>Digital Class Representative</h1>
            <p className="tagline">"Automating and organizing for academic excellence."</p>
            <div className="button-container">
                <button onClick={() => navigate('/timetable')}>Timetable Notifications</button>
                <button onClick={() => navigate('/classroom')}>Classroom Tracker</button>
                <button onClick={() => navigate('/society')}>Society Events</button>
                <button onClick={() => navigate('/ranking')}>Ranking System</button>
            </div>
        </div>
    );
};

export default HomePage;
