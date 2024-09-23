import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../Feature/Userslice'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Profile() {
    const user=useSelector(selectUser);
    const [isPremium, setIsPremium] = useState(false);  // Default: not subscribed

    useEffect(() => {
        // Fetch the user's subscription status from the backend
        const fetchSubscriptionStatus = async () => {
            try {
                const response = await axios.get('/api/user/subscription-status');
                setIsPremium(response.data.isPremium);
            } catch (error) {
                console.error('Error fetching subscription status:', error);
            }
        };

        fetchSubscriptionStatus();
    }, [user.uid]);

    // Function to show an alert when the user is not subscribed
    const handleAlert = () => {
        alert("Please upgrade to premium to access this feature.");
    };
  return (
    <div>
      <div className="flex items-center mt-9 mb-4 justify-center">
        <div className='max-w-xs'>
           <div className='bg-white shadow-lg rounded-lg py-3'>
                 <div className="photo-wrapper p-2">
                      <img src={user.photo} alt="" className='w-32 h-32 rounded-full mx-auto' />
                 </div>
                 <div className="p-2">
                  <h3 className='text-center text-xl text-gray-900'>{user.name}</h3>
                 </div>
                 <div className="text-xs my-3">
                  <h3 className='text-xl font-bold'>UID</h3>
                  <h3 className='text-center text-lg text-gray-900'>{user.uid}</h3>
                 </div>
                 <div>
                 <h3 className='text-xl font-bold'>Email</h3>
                 <h3 className='text-center text-xl text-gray-900'>{user.email}</h3>
                 </div>
       <div className="flex justify-center mt-3">
       <Link to ="/userapplication" class="relative  items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
<span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
<span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">View Details</span>
</Link>
       </div>
        {/* Conditional logic for Build Resume */}
        <div className="flex justify-center mt-3">
                            {isPremium ? (
                                <Link to="/resume-builder" className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-green-600 rounded-full hover:bg-white group">
                                    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-green-600">Build Resume</span>
                                </Link>
                            ) : (
                                <button onClick={handleAlert} className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-green-600 rounded-full hover:bg-white group">
                                    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-green-600">Build Resume</span>
                                </button>
                            )}
                        </div>
                         {/* Conditional logic for View Resumes */}
                         <div className="flex justify-center mt-3">
                            {isPremium ? (
                                <Link to="/resume-list" className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-yellow-600 rounded-full hover:bg-white group">
                                    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-yellow-600">View Resumes</span>
                                </Link>
                            ) : (
                                <button onClick={handleAlert} className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-yellow-600 rounded-full hover:bg-white group">
                                    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-yellow-600">View Resumes</span>
                                </button>
                            )}
                        </div>
           </div>
        </div>

      </div>
    </div>
  )
}

export default Profile;
