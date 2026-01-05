import React from 'react';
import './styles/RankingModule.css';

const RankingModule = () => {
    return (
        <div className="ranking-module">
            <h1>Ranking System</h1>
            <p className="tagline">"Track your academic progress and achievements."</p>
            <div className="button-container">
                <button onClick={() => window.location.href = '/ranking/result'}>View Result</button>
                <button onClick={() => window.location.href = '/ranking/student-profile'}>Student Profile</button>
            </div>
        </div>
    );
};

export default RankingModule;
