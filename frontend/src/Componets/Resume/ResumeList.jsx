import React from 'react';
import './resumeList.css';

const ResumeList = ({ resumeData }) => {
    return (
        <div className="resume-list">
            <h2>{resumeData.name}'s Resume</h2>
            <div className="contact-info">
                <p>Email: {resumeData.email}</p>
                <p>Phone: {resumeData.phone}</p>
                <p>Address: {resumeData.address}</p>
            </div>
            <div className="summary">
                <h3>Professional Summary</h3>
                <p>{resumeData.summary}</p>
            </div>
            <div className="education-section">
                <h3>Education</h3>
                {resumeData.education.map((edu, index) => (
                    <div key={index} className="education-item">
                        <h4>{edu.degree}</h4>
                        <p>{edu.institution} ({edu.yearFrom} - {edu.yearTo})</p>
                        <p>Marks Type: {edu.marks}</p>
                    </div>
                ))}
            </div>
            <div className="experience-section">
                <h3>Experience</h3>
                {resumeData.experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                        <h4>{exp.jobTitle} at {exp.company}</h4>
                        <p>Duration: {exp.yearFrom} - {exp.yearTo}</p>
                    </div>
                ))}
            </div>
            <div className="skills-section">
                <h3>Skills</h3>
                <p>{resumeData.skills}</p>
            </div>
            <div className="certifications-section">
                <h3>Certifications</h3>
                <p>{resumeData.certifications}</p>
            </div>
            <div className="achievements-section">
                <h3>Achievements</h3>
                <p>{resumeData.achievements}</p>
            </div>
        </div>
    );
};

export default ResumeList;
