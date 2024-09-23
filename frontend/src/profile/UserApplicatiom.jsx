import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './user.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../Feature/Userslice';

function UserApplication() {
    const [applications, setApplications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');
    const user = useSelector(selectUser);

    // Filter applications by logged-in user
    const userApplications = Array.isArray(applications)
        ? applications.filter(app => app.user?.name === user?.name)
        : [];

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('https://internareabackend-tdwc.onrender.com/api/applications');
                const appData = response.data;

                if (Array.isArray(appData)) {
                    setApplications(appData);
                } else {
                    console.error('Unexpected response data format:', appData);
                }
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    console.error('Error response headers:', error.response.headers);
                    alert(`Error fetching applications: ${error.response.statusText} (${error.response.status})`);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('Error request:', error.request);
                    alert('Error fetching applications: No response from the server.');
                } else {
                    // Something happened in setting up the request
                    console.error('Error message:', error.message);
                    alert(`Error fetching applications: ${error.message}`);
                }
            }
        };

        fetchApplications();
    }, [user?.name]);


    const updateStatus = async (applicationId, newStatus) => {
        try {
            const response = await axios.put(`https://internareabackend-tdwc.onrender.com/api/applications/${applicationId}`, { status: newStatus });
            // Update the application status locally after a successful update
            setApplications((prev) => prev.map(app => (app._id === applicationId ? { ...app, status: newStatus } : app)));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating application status.');
        }
    };

    // Show pop-up based on application status
    useEffect(() => {
        userApplications.forEach(app => {
            if (app.status === 'accepted') {
                setPopupMessage('Your application has been accepted');
                setPopupType('accepted');
                setShowPopup(true);
            } else if (app.status === 'rejected') {
                setPopupMessage('Your application has been rejected');
                setPopupType('rejected');
                setShowPopup(true);
            }
        });

        if (showPopup) {
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    }, [userApplications, showPopup]);

    return (
        <div>
            {showPopup && (
                <div className={`popup ${popupType === 'rejected' ? 'rejected' : 'accepted'}`}>
                    <p>{popupMessage}</p>
                </div>
            )}

            <div className='hide'>
                <h1 className='text-3xl font-semibold mt-3'>Total Applications</h1>
                <div className="flex justify-center " id='table'>
                    <div className="applications flex flex-col mt-7">
                        <div className="overflow-x-auto sm:-mx-6 lg:mx-8">
                            <table className="inline-block min-w-full text-left text-sm font-light">
                                <thead className='border-b font-medium'>
                                    <tr className='bg-gray-200'>
                                        <th scope='col' className='px-5 py-4'>Company</th>
                                        <th scope='col' className='px-5 py-4'>Category</th>
                                        <th scope='col' className='px-5 py-4'>Applied On</th>
                                        <th scope='col' className='px-5 py-4'>Application Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userApplications.length > 0 ? (
                                        userApplications.map((data) => (
                                            <tr className='border-b' key={data._id}>
                                                <td className='whitespace-nowrap px-6 py-4'>{data.company}</td>
                                                <td className='whitespace-nowrap px-6 py-4'>{data.category}</td>
                                                <td className='whitespace-nowrap px-6 py-4'> {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                <td className='whitespace-nowrap px-6 py-4'>{data.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">No applications found for this user.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='show'>
                    <h1>Your Applications</h1>
                    {userApplications.length > 0 ? (
                        userApplications.map((data) => (
                            <section className="text-gray-600 body-font" key={data._id}>
                                <div className="container px-5 py-2 mx-auto flex flex-wrap">
                                    <div className="flex flex-wrap -m-4">
                                        <div className="p-4 lg:w-1/2 md:w-full">
                                            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                    </svg>
                                                </div>
                                                <div className="flex-grow">
                                                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Company: {data.company}</h2>
                                                    <p className="leading-relaxed text-base">Applied on: {new Date(data?.createAt).toLocaleDateString()}</p>
                                                    <p className="leading-relaxed text-base">Application status: {data.status}</p>
                                                    <Link to={`/detailApplication?a=${data._id}`} className="mt-3 text-indigo-500 inline-flex items-center">
                                                        View in detail
                                                        <i className="bi bi-chevron-compact-right text-blue-500"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))
                    ) : (
                        <p>No applications found for this user.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserApplication;
