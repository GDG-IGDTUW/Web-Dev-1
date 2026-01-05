import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Container, Row, Col, Card, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ClassroomModule.css';

const roomsData = {
  'CSE-ECE': [
    { room: 'Room 101', bookedSlots: { '9 AM - 10 AM': 'Class: Data Structures', '2 PM - 3 PM': 'Class: Physics' } },
    { room: 'Room 102', bookedSlots: { '11 AM - 12 PM': 'Society Event: Coding Workshop' } },
  ],
  IT: [
    { room: 'Room 103', bookedSlots: {} },
    { room: 'Room 104', bookedSlots: { '1 PM - 2 PM': 'Class: Algorithms' } },
  ],
  EXAM: [
    { room: 'Room 201', bookedSlots: { '9 AM - 10 AM': 'Final Exam' } },
    { room: 'Room 202', bookedSlots: {} },
  ],
  MAE: [
    { room: 'Room 301', bookedSlots: { '9 AM - 10 AM': 'Lab: Mechanical Engineering' } },
    { room: 'Room 302', bookedSlots: { '2 PM - 3 PM': 'Class: Thermodynamics' } },
  ],
};

const departments = ['CSE-ECE', 'IT', 'EXAM', 'MAE'];

const ClassroomBooking = () => {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [eventNames, setEventNames] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (selectedDept) {
      setAvailableRooms(roomsData[selectedDept] || []);
    }
  }, [selectedDept]);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setAvailableSlots(Object.keys(roomsData[selectedDept].find(r => r.room === room).bookedSlots || {}));
  };

  const handleTimeSlotChange = (time) => {
    setSelectedTime(time);
  };

  const handleEventNameChange = (eventName) => {
    setEventNames((prev) => ({
      ...prev,
      [selectedRoom]: {
        ...prev[selectedRoom],
        [selectedTime]: eventName, // Update the event for the specific room and time slot
      },
    }));
  };

  const handleBooking = () => {
    const updatedRooms = availableRooms.map((room) =>
      room.room === selectedRoom
        ? {
            ...room,
            bookedSlots: {
              ...room.bookedSlots,
              [selectedTime]: eventNames[selectedRoom]?.[selectedTime] || '',
            },
          }
        : room
    );

    setAvailableRooms(updatedRooms);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Container className="classroom-booking-container">
      <h2 className="text-center my-4 title">Classroom Booking System</h2>

      {/* Department Dropdown */}
      <Dropdown onSelect={(dept) => setSelectedDept(dept)} className="my-3 w-100">
        <Dropdown.Toggle variant="outline-primary" id="dropdown-department" className="dropdown-toggle w-100">
          {selectedDept || 'Select Department'}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          {departments.map((dept) => (
            <Dropdown.Item key={dept} eventKey={dept} className="dropdown-item">
              {dept}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Room Selection */}
      {selectedDept && (
        <div>
          <h4>Select Room</h4>
          <Row>
            {availableRooms.map((room, idx) => (
              <Col key={idx} sm={12} md={6} lg={4}>
                <Card className="room-card">
                  <Card.Body>
                    <Card.Title className="room-title">{room.room}</Card.Title>
                    <Card.Text>
                      <strong>Booked Slots:</strong>
                      <ul className="booked-slots">
                        {Object.entries(room.bookedSlots).length > 0 ? (
                          Object.entries(room.bookedSlots).map(([slot, event], index) => (
                            <li key={index} className="booked-slot">
                              {slot} (Event: {event})
                            </li>
                          ))
                        ) : (
                          <li>No bookings</li>
                        )}
                      </ul>
                    </Card.Text>
                    <Button
                      variant="outline-success"
                      onClick={() => handleRoomSelection(room.room)}
                      className="select-room-btn"
                    >
                      Select Room
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Time Slot Selection */}
      {selectedRoom && (
        <div>
          <h4>Available Time Slots for {selectedRoom}</h4>
          <Row>
            {['9 AM - 10 AM', '10 AM - 11 AM', '11 AM - 12 PM', '1 PM - 2 PM', '2 PM - 3 PM'].map((slot, idx) => (
              <Col key={idx} sm={12} md={6} lg={4}>
                <Card className="time-slot-card">
                  <Card.Body>
                    <Card.Text>{slot}</Card.Text>
                    <Button
                      variant={selectedTime === slot ? 'success' : (availableSlots.includes(slot) ? 'secondary' : 'outline-success')}
                      onClick={() => handleTimeSlotChange(slot)}
                      disabled={availableSlots.includes(slot)}
                    >
                      {availableSlots.includes(slot) ? 'Booked' : (selectedTime === slot ? 'Selected' : 'Select Slot')}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {selectedTime && (
            <div className="event-input-container">
              <Form.Control
                type="text"
                placeholder="Enter Event Name"
                value={eventNames[selectedRoom]?.[selectedTime] || ''}
                onChange={(e) => handleEventNameChange(e.target.value)}
                className="event-name-input"
              />
              <Button
                variant="primary"
                onClick={handleBooking}
                className="confirm-booking-btn"
                disabled={!eventNames[selectedRoom]?.[selectedTime]}
              >
                Confirm Booking
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Toast for Booking Confirmation */}
      <Toast show={showToast} onClose={() => setShowToast(false)} className="position-fixed bottom-0 end-0 m-3">
        <Toast.Body>Room {selectedRoom} booked successfully for {selectedTime}!</Toast.Body>
      </Toast>
    </Container>
  );
};

export default ClassroomBooking;
