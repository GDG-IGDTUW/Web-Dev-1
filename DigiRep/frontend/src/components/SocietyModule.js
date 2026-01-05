import React, { useState } from 'react';
import './styles/SocietyModule.css';

const SocietyModule = () => {
    const [selectedSociety, setSelectedSociety] = useState(null);
    const [selectedSection, setSelectedSection] = useState(''); // Track which section (About, Events, Subscribe) to display
    const [email, setEmail] = useState('');
    const [subscriptionMessage, setSubscriptionMessage] = useState('');

    const societies = [
        { id: 'coding-society', name: 'Coding Society' },
        { id: 'music-society', name: 'Music Society' },
        { id: 'sports-club', name: 'Sports Club' },
        { id: 'drama-society', name: 'Drama Society' },
    ];

    const events = {
        'coding-society': [
            { title: 'Hackathon', date: '2024-12-01', time: '10:00 AM' },
            { title: 'Workshop on Algorithms', date: '2024-12-10', time: '2:00 PM' },
        ],
        'music-society': [
            { title: 'Live Concert', date: '2024-12-05', time: '6:00 PM' },
            { title: 'Music Jam', date: '2024-12-15', time: '4:00 PM' },
        ],
        'sports-club': [
            { title: 'Football Tournament', date: '2024-12-08', time: '8:00 AM' },
            { title: 'Basketball Championship', date: '2024-12-12', time: '9:00 AM' },
        ],
        'drama-society': [
            { title: 'Drama Play', date: '2024-12-07', time: '7:00 PM' },
            { title: 'Comedy Night', date: '2024-12-14', time: '5:00 PM' },
        ],
    };

    const societyAbout = {
        'coding-society': {
            description: 'The Coding Society is dedicated to helping students enhance their programming skills through workshops, hackathons, and regular coding challenges.',
            president: 'Alice Johnson',
            teamHeads: ['Bob Smith (Web Development)', 'Charlie Brown (Data Science)', 'David Lee (App Development)']
        },
        'music-society': {
            description: 'The Music Society brings together music lovers, singers, and instrumentalists for jam sessions, concerts, and music events.',
            president: 'Emma Davis',
            teamHeads: ['Liam Garcia (Guitar)', 'Mia Martinez (Vocals)', 'Noah Rodriguez (Drums)']
        },
        'sports-club': {
            description: 'The Sports Club promotes physical activity, organizing tournaments and matches across various sports like football, basketball, and cricket.',
            president: 'Sophia Lee',
            teamHeads: ['Oliver Miller (Football)', 'Isabella Wilson (Basketball)', 'James Taylor (Cricket)']
        },
        'drama-society': {
            description: 'The Drama Society is focused on acting, playwriting, and producing various theatrical performances throughout the year.',
            president: 'Benjamin Clark',
            teamHeads: ['Lucas Young (Directing)', 'Amelia Walker (Costume Design)', 'Ethan Hall (Set Design)']
        },
    };

    const handleSocietySelection = (societyId) => {
        setSelectedSociety(societyId);
        setSelectedSection(''); // Reset the selected section when a new society is chosen
        setEmail('');
        setSubscriptionMessage('');
    };

    const handleSectionSelection = (section) => {
        setSelectedSection(section);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscriptionMessage(`You have successfully subscribed to the ${societies.find(s => s.id === selectedSociety).name} newsletter!`);
        } else {
            alert('Please enter a valid email.');
        }
    };

    return (
        <div className="society-module">
            <h2>Society Events</h2>
            <div className="society-selection">
                {societies.map((society) => (
                    <button key={society.id} onClick={() => handleSocietySelection(society.id)}>
                        {society.name}
                    </button>
                ))}
            </div>

            {selectedSociety && (
                <div className="section-buttons">
                    <button onClick={() => handleSectionSelection('about')}>About</button>
                    <button onClick={() => handleSectionSelection('events')}>Events</button>
                    <button onClick={() => handleSectionSelection('subscribe')}>Subscribe</button>
                </div>
            )}

            {selectedSection === 'about' && selectedSociety && (
                <div className="about-section">
                    <h3>About {societies.find(s => s.id === selectedSociety).name}</h3>
                    <p>{societyAbout[selectedSociety].description}</p>
                    <p><strong>President:</strong> <span className="highlight">{societyAbout[selectedSociety].president}</span></p>
                    <p><strong>Team Heads:</strong> <span className="highlight">{societyAbout[selectedSociety].teamHeads.join(', ')}</span></p>
                </div>
            )}

            {selectedSection === 'events' && selectedSociety && (
                <div className="events-list">
                    <h3>{societies.find(s => s.id === selectedSociety).name} - Upcoming Events</h3>
                    <ul>
                        {events[selectedSociety].map((event, index) => (
                            <li key={index}>
                                <strong>{event.title}</strong> <br />
                                Date: {event.date} <br />
                                Time: {event.time}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedSection === 'subscribe' && selectedSociety && (
                <div className="subscribe-section">
                    <h3>Subscribe to {societies.find(s => s.id === selectedSociety).name} Newsletter</h3>
                    <form onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                    {subscriptionMessage && <p>{subscriptionMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default SocietyModule;
