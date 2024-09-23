import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DetailApplications() {
    const [data, setData] = useState([]); // Ensure data is an array
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("a");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://internareabackend-tdwc.onrender.com/api/applications/${id}`);
                // Wrap in array since you're mapping over it
                setData([response.data]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const handleAcceptAndReject = async (id, action) => {
        try {
            const response = await axios.put(`https://internareabackend-tdwc.onrender.com/api/application/${id}`, { action });
            const updatedApplication = data.map((app) =>
                app._id === id ? response.data.data : app
            );
            setData(updatedApplication);
        } catch (error) {
            console.log(error);
        }
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <p>No application details available.</p>;
    }

    return (
        <div>
            {data.map((appData) => (
                <section className="text-gray-600 body-font overflow-hidden" key={appData._id}>
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img
                                alt="user photo"
                                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover rounded"
                                src={appData.user?.photo || 'defaultImage.jpg'} // Handle missing image
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">Company name</h2>
                                <h1 className="text-gray-900 font-bold title-font mb-1 -mt-8">{appData.company}</h1>
                                <h2>Cover Letter</h2>
                                <p className="leading-relaxed font-bold -mt-8">{appData.coverLetter}</p>
                                <div className="flex mt-6 pb-5 border-b-2 border-gray-100 mb-5">
                                    <span className="mr-3">Application Date</span><br />
                                    <p className='font-bold'>{new Date(appData?.createAt).toLocaleDateString()}</p>
                                </div>
                                <h4 className=' mt-9'>Applied By</h4>
                                <p className='font-bold -mt-8'>{appData.user?.name}</p>
                                <div className="flex mt-24 justify-around">
                                    <button
                                        className='bg-blue-700 text-green-400 w-24 font-bold'
                                        onClick={() => handleAcceptAndReject(appData._id, "accepted")}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className='bg-blue-700 text-red-600 w-24 font-bold'
                                        onClick={() => handleAcceptAndReject(appData._id, "rejected")}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default DetailApplications;
