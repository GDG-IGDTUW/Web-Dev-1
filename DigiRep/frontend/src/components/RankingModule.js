import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RankingModule.css';

const RankingModule = () => {
    const navigate = useNavigate(); // initialize navigate

    return (
        <div className="ranking-module">
            <h1>Ranking System</h1>
            <p className="tagline">"Track your academic progress and achievements."</p>
            <div className="button-container">
                <button onClick={() => navigate('/ranking/result')}>View Result</button>
                <button onClick={() => navigate('/ranking/student-profile')}>Student Profile</button>
            </div>
        </div>
    );
};

export default RankingModule;
