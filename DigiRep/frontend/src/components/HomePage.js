import React from 'react';
import './styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Digital Class Representative</h1>
            <p className="tagline">"Automating and organizing for academic excellence."</p>
            
            <div className="button-container">
                <button onClick={() => window.location.href = '/timetable'}>
                    Timetable Notifications
                </button>
                <button onClick={() => window.location.href = '/classroom'}>
                    Classroom Tracker
                </button>
                <button onClick={() => window.location.href = '/society'}>
                    Society Events
                </button>
                <button onClick={() => window.location.href = '/ranking'}>
                    Ranking System
                </button>
            </div>
        </div>
    );
};

export default HomePage;
