import React, { useState } from 'react';
import axios from 'axios';
import './resumeBuilder.css';
import githubLogo from '../../Assets/github.png';
import linkedinLogo from '../../Assets/linkedin.png';
import portfolioLogo from '../../Assets/portfolio.png';
import { FaGraduationCap, FaBriefcase, FaTools, FaCertificate, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const ResumeBuilder = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [githubLink, setGithubLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [portfolioLink, setPortfolioLink] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [summary, setSummary] = useState('');
    const [education, setEducation] = useState([{ degree: '', institution: '', yearFrom: '', yearTo: '', marksType: '', marksValue: '' }]);
    const [experience, setExperience] = useState([{ jobTitle: '', company: '', yearFrom: '', yearTo: '', responsibilities: '' }]);
    const [skills, setSkills] = useState('');
    const [certifications, setCertifications] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setProfileImage(file);
            setErrorMessage(''); // Clear any previous error messages
        } else {
            setProfileImage(null);
            setErrorMessage('Please upload a valid image file (PNG or JPEG).');
        }
    };

    const addEducation = () => {
        setEducation([...education, { degree: '', institution: '', yearFrom: '', yearTo: '', marksType: '', marksValue: '' }]);
    };

    const addExperience = () => {
        setExperience([...experience, { jobTitle: '', company: '', yearFrom: '', yearTo: '', responsibilities: '' }]);
    };

    const resetForm = () => {
        setProfileImage(null);
        setGithubLink('');
        setLinkedinLink('');
        setPortfolioLink('');
        setFullName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setSummary('');
        setEducation([{ degree: '', institution: '', yearFrom: '', yearTo: '', marksType: '', marksValue: '' }]);
        setExperience([{ jobTitle: '', company: '', yearFrom: '', yearTo: '', responsibilities: '' }]);
        setSkills('');
        setCertifications('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!fullName || !email || !phone || !address || !summary || education.length === 0 || experience.length === 0 || !profileImage) {
            setError("Please fill out all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', profileImage);
        formData.append('githubLink', githubLink);
        formData.append('linkedinLink', linkedinLink);
        formData.append('portfolioLink', portfolioLink);
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('summary', summary);
        formData.append('education', JSON.stringify(education));
        formData.append('experience', JSON.stringify(experience));
        formData.append('skills', JSON.stringify(skills.split(',').map(skill => skill.trim())));
        formData.append('certifications', JSON.stringify(certifications.split(',').map(cert => cert.trim())));

        try {
            const response = await axios.post('https://internareabackend-tdwc.onrender.com/api/applications/generate-resume', formData, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${fullName}_resume.pdf`; // Customize the filename
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            resetForm(); // Reset form after successful submission
        } catch (error) {
            console.error(error); // Log the error for debugging
            if (error.response) {
                setError(`Error: ${error.response.data.error || 'An error occurred'}`);
            } else if (error.request) {
                setError('No response received from server');
            } else {
                setError(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="resume-builder">
            <h2>Resume Builder</h2>
            {error && <p className="error-message">{error}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                
                {/* Profile Image Upload with Name and Contact */}
                <div className="profile-section">
                    <div className="image-upload">
                        <label htmlFor="imageUpload">Upload Profile Image (PNG, JPEG)</label>
                        <input type="file" name="profileImage" accept="image/png, image/jpeg" onChange={handleImageChange} />
                        {profileImage && <img src={URL.createObjectURL(profileImage)} alt="Profile" />}
                    </div>
                    <div className="contact-info">
                        <div className="full-name-section">
                            <FaUser />
                            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div>
                            <FaPhone />
                            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <FaEnvelope />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <FaMapMarkerAlt />
                            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="social-links">
                    <div className="social-input">
                        <img src={githubLogo} alt="GitHub" />
                        <input type="text" placeholder="GitHub URL" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
                    </div>
                    <div className="social-input">
                        <img src={linkedinLogo} alt="LinkedIn" />
                        <input type="text" placeholder="LinkedIn URL" value={linkedinLink} onChange={(e) => setLinkedinLink(e.target.value)} />
                    </div>
                    <div className="social-input">
                        <img src={portfolioLogo} alt="Portfolio" />
                        <input type="text" placeholder="Portfolio URL" value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} />
                    </div>
                </div>

                {/* Summary Section */}
                <div className="summary-section">
                    <h3><b>Summary</b></h3>
                    <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Write a brief summary about yourself" />
                </div>

                {/* Education Section with Icon */}
                <div className="education-section">
                    <h3><FaGraduationCap /> <b>Education</b></h3>
                    {education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => {
                                const newEducation = [...education];
                                newEducation[index].degree = e.target.value;
                                setEducation(newEducation);
                            }} />
                            <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => {
                                const newEducation = [...education];
                                newEducation[index].institution = e.target.value;
                                setEducation(newEducation);
                            }} />
                            <input type="text" placeholder="Year From" value={edu.yearFrom} onChange={(e) => {
                                const newEducation = [...education];
                                newEducation[index].yearFrom = e.target.value;
                                setEducation(newEducation);
                            }} />
                            <input type="text" placeholder="Year To" value={edu.yearTo} onChange={(e) => {
                                const newEducation = [...education];
                                newEducation[index].yearTo = e.target.value;
                                setEducation(newEducation);
                            }} />
                            <input type="text" placeholder="Marks Type (e.g., GPA)" value={edu.marksType} onChange={(e) => {
                                const newEducation = [...education];
                                newEducation[index].marksType = e.target.value;
                                setEducation(newEducation);
                            }} />
                            <input type="text" placeholder="Marks Value" value={edu.marksValue} onChange={(e) => {
                                const newEducation = [...education];
                                newEducation[index].marksValue = e.target.value;
                                setEducation(newEducation);
                            }} />
                        </div>
                    ))}
                    <button type="button" onClick={addEducation}>Add Education</button>
                </div>

                {/* Experience Section with Job Responsibilities */}
                <div className="experience-section">
                    <h3><FaBriefcase /> <b>Experience</b></h3>
                    {experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <input type="text" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => {
                                const newExperience = [...experience];
                                newExperience[index].jobTitle = e.target.value;
                                setExperience(newExperience);
                            }} />
                            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => {
                                const newExperience = [...experience];
                                newExperience[index].company = e.target.value;
                                setExperience(newExperience);
                            }} />
                            <input type="text" placeholder="Year From" value={exp.yearFrom} onChange={(e) => {
                                const newExperience = [...experience];
                                newExperience[index].yearFrom = e.target.value;
                                setExperience(newExperience);
                            }} />
                            <input type="text" placeholder="Year To" value={exp.yearTo} onChange={(e) => {
                                const newExperience = [...experience];
                                newExperience[index].yearTo = e.target.value;
                                setExperience(newExperience);
                            }} />
                            <textarea placeholder="Responsibilities" value={exp.responsibilities} onChange={(e) => {
                                const newExperience = [...experience];
                                newExperience[index].responsibilities = e.target.value;
                                setExperience(newExperience);
                            }} />
                        </div>
                    ))}
                    <button type="button" onClick={addExperience}>Add Experience</button>
                </div>

                {/* Skills Section */}
                <div className="skills-section">
                    <h3><FaTools /> <b>Skills</b></h3>
                    <textarea placeholder="Enter your skills separated by commas" value={skills} onChange={(e) => setSkills(e.target.value)} />
                </div>

                {/* Certifications Section */}
                <div className="certifications-section">
                    <h3><FaCertificate /> <b>Certifications</b></h3>
                    <textarea placeholder="Enter your certifications separated by commas" value={certifications} onChange={(e) => setCertifications(e.target.value)} />
                </div>

                <button type="submit" className="submit-button">Generate Resume</button>
            </form>
        </div>
    );
};

export default ResumeBuilder;
