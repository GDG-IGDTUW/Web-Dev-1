import React, { useState } from 'react';
import './styles/StudentProfilePage.css';

const StudentProfile = () => {
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [showSearch, setShowSearch] = useState(false); // State to control the visibility of the search input

    // Hardcoded student data for demonstration
    const studentProfiles = [
        {
            enrollment: '1',
            name: 'Jane Smith',
            universityRank: 10,
            batchRank: 2,
            cgpa: 8.5,
            semesters: [
                { semester: 1, subjects: { Math: 'A', English: 'B+', Science: 'A' } },
                { semester: 2, subjects: { Math: 'A+', English: 'A', Science: 'B' } },
                { semester: 3, subjects: { Math: 'B+', English: 'A', Science: 'A+' } },
                { semester: 4, subjects: { Math: 'A', English: 'B', Science: 'A' } },
            ]
        },
        {
            enrollment: '2',
            name: 'John Doe',
            universityRank: 20,
            batchRank: 5,
            cgpa: 7.9,
            semesters: [
                { semester: 1, subjects: { Math: 'B+', English: 'B', Science: 'C' } },
                { semester: 2, subjects: { Math: 'A', English: 'A-', Science: 'B+' } },
                { semester: 3, subjects: { Math: 'B', English: 'C', Science: 'A' } },
                { semester: 4, subjects: { Math: 'A-', English: 'B', Science: 'B' } },
            ]
        },
    ];

    const handleEnrollmentChange = (event) => {
        setEnrollmentNumber(event.target.value);
    };

    const fetchStudentProfile = () => {
        const profile = studentProfiles.find(student => student.enrollment === enrollmentNumber);
        setStudentData(profile || null);
    };

    // Function to handle the Enter key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchStudentProfile();
        }
    };

    const handlePreviewClick = () => {
        setShowSearch(true); // Show the search input when Preview button is clicked
    };

    return (
        <div className="student-profile-page">
            <h2>Student Profile (Under Development)</h2>
            <div className="development-banner">
                <p>This page is under development and will be available in the future!</p>
            </div>

            {/* Preview Button */}
            {!showSearch && (
                <div className="preview-button">
                    <button onClick={handlePreviewClick}>Preview</button>
                </div>
            )}

            {/* Show the search bar only when Preview button is clicked */}
            {showSearch && (
                <div className="enrollment-input">
                    <input
                        type="text"
                        placeholder="Enter Enrollment Number"
                        value={enrollmentNumber}
                        onChange={handleEnrollmentChange}
                        onKeyDown={handleKeyPress} // Added keyDown event
                    />
                    <button onClick={fetchStudentProfile}>Search</button>
                </div>
            )}

            {studentData ? (
                <div className="student-details">
                    <h3>{studentData.name}</h3>
                    <p><strong>Enrollment Number:</strong> {studentData.enrollment}</p>
                    <p><strong>University Rank:</strong> {studentData.universityRank}</p>
                    <p><strong>Batch Rank:</strong> {studentData.batchRank}</p>
                    <p><strong>CGPA:</strong> {studentData.cgpa}</p>

                    <h4>Semester-wise Results:</h4>
                    {studentData.semesters.map((semester, index) => (
                        <div key={index} className="semester-result">
                            <h5>Semester {semester.semester}</h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(semester.subjects).map(([subject, grade], i) => (
                                        <tr key={i}>
                                            <td>{subject}</td>
                                            <td>{grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ) : (
                enrollmentNumber && <p>No student found with this enrollment number.</p>
            )}
        </div>
    );
};

export default StudentProfile;
