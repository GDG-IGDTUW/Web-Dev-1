import React, { useState } from 'react';
import './styles/TimetableNotificationsModule.css';

const TimetableNotificationsModule = () => {
    const [email, setEmail] = useState('');
    const [time, setTime] = useState('');
    const [subscriptionMessage, setSubscriptionMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email && time) {
            setSubscriptionMessage(`You have successfully subscribed for daily timetable notifications at ${time}!`);
        } else {
            alert('Please enter a valid email and select a time.');
        }
    };

    return (
        <div className="timetable-notifications-module">
            <h1>Timetable & Attendance</h1>
            <p className="tagline">"Stay on top of your schedule and track attendance with ease."</p>
            <div className="button-container">
                <button onClick={() => window.location.href = '/timetable/timetable-display'}>Timetable</button>
                <button onClick={() => window.location.href = '/timetable/attendance-tracker'}>Attendance Tracker</button>
            </div>

            {/* Subscription Section Below Buttons */}
            <div className="subscribe-section">
                <p>Subscribe for daily notifications of your timetable at your convenient scheduled time</p>
                <form onSubmit={handleSubscribe} className="subscribe-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <select 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        required
                    >
                        <option value="">Select Time</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="11:00 PM">11:00 PM</option>
                        <option value="12:00 AM">12:00 AM</option>
                        <option value="1:00 AM">1:00 AM</option>
                        <option value="2:00 AM">2:00 AM</option>
                        <option value="3:00 AM">3:00 AM</option>
                    </select>
                    <button type="submit">Subscribe</button>
                </form>
                {subscriptionMessage && <p className="subscription-message">{subscriptionMessage}</p>}
            </div>
        </div>
    );
};

export default TimetableNotificationsModule;
