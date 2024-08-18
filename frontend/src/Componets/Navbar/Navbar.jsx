import React, { useState } from 'react'
import logo from '../../Assests/logo.png'
import "./navbar.css"
import Sidebar from './Sidebar'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../../firebase/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'

function Navbar() {
  const navigate=useNavigate()
  const user=useSelector(selectUser)
  const [isDivVisibleForintern,setDivVisibleForintern]=useState(false)
  const [isDivVisibleForJob,setDivVisibleForJob]=useState(false)
  const [isDivVisibleForlogin,setDivVisibleForlogin]=useState(false)
   
  const [isDivVisibleForProfile,setDivVisibleProfile]=useState(false)

  const [isStudent,setStudent]=useState(true)

  const loginFunction=()=>{
    signInWithPopup(auth,provider).then((res)=>{
        console.log(res)
      
    }).catch((err)=>{
        console.log(err)
    })
    setDivVisibleForlogin(false)
}
   const showLogin=()=>{
    setDivVisibleForlogin(true)
   }
     const closeLogin=()=>{
      setDivVisibleForlogin(false)
     }
     const setTrueForStudent=()=>{
      setStudent(false)
     }
     const setFalseForStudent=()=>{
         setStudent(true)
     }

//  for showing profile dropdown
const showtheProfile=()=>{
  setDivVisibleProfile(true)
  document.getElementById("ico3").className="bi bi-caret-up-fill"
}
const hidetheProfile=()=>{
  document.getElementById("ico3").className="bi bi-caret-down-fill"
  setDivVisibleProfile(false)
}




     const showInternShips=()=>{
      document.getElementById("ico").className="bi bi-caret-up-fill"
      setDivVisibleForintern(true)
     }
     const hideInternShips=()=>{
      document.getElementById("ico").className="bi bi-caret-down-fill"
      setDivVisibleForintern(false)
     }
     const showJobs=()=>{
      document.getElementById("ico2").className="bi bi-caret-up-fill"
     setDivVisibleForJob(true)
     }
     const hideJobs=()=>{
      document.getElementById("ico2").className="bi bi-caret-down-fill"
      setDivVisibleForJob(false)
     }
      
     const logoutFunction=()=>{
      signOut(auth)
      navigate("/")
  }

  return (
    <div>
      <nav className='nav1'>
        <ul>
            <div className="img">
                <Link to={"/"}><img src={logo} alt="" srcset="" /></Link>
            </div>
            <div className="elem">
               <Link to={"/Internship"}> <p id='int' className='' onMouseEnter={showInternShips} >Internships <i onMouseLeave={hideInternShips} id='ico' class="bi bi-caret-down-fill"></i></p></Link>
                <Link to={"/Jobs"}> <p onMouseEnter={showJobs} >Jobs <i class="bi bi-caret-down-fill" id='ico2' onMouseLeave={hideJobs}></i></p></Link>
            </div>
            <div className="search">
            <i class="bi bi-search"></i>
                <input type="text" placeholder='search' />
            </div>
            {
              user?(
                <>
                <div className="profile">
                  <Link to={"/profile"}>
                  <img src={user?.photo} alt="" onMouseEnter={showtheProfile} className='rounded-full w-12' id='picpro' />
                  <i className='bi bi-caret-up-fill' id='ico3' onClick={hidetheProfile} ></i>
                  </Link>
                </div>
                </>
              ):(
                <>
                  <div className="auth">
                <button className='btn1' onClick={showLogin} >Login</button>


              <button className='btn2'><Link to="/register">Register</Link></button>
            </div>
                </>
              )
            }

{
    user?(
        <>
       <button  className='bt-log' id='bt' onClick={logoutFunction} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
<span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span class="absolute flex items-center justify-center w-full h-full text-white-500 transition-all duration-300 transform group-hover:translate-x-full ease">Logout</span>
<span class="relative invisible"></span>
</button>

        </>
    ):(
        <>
            <div className="flex mt-7 hire">
Hire Talent
    </div>

    <div className="admin">
      < Link to={"/adminLogin"}>
     <button>Admin</button>
     </Link>
    </div>
        </>
    )
  }

</ul>
    </nav>


      {
        isDivVisibleForintern &&(
          <div className="profile-dropdown-2">
            <div className="left-section">
            <p>Top Locations</p>
            <p>Profile</p>
            <p>Top Category</p>
            <p>Explore More Internships</p>
            </div>
            <div className="line flex bg-slate-400">

</div>
<div className="right-section">
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
</div>

          </div>
        )
      }

{
        isDivVisibleForJob &&(
          <div className="profile-dropdown-1">
            <div className="left-section">
            <p>Top Locations</p>
            <p>Profile</p>
            <p>Top Category</p>
            <p>Explore More Internships</p>
            </div>
            <div className="line flex bg-slate-400">
    
</div>
<div className="right-section">
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
</div>

          </div>
        )
      }
      <div className="login">
        {
          isDivVisibleForlogin &&(
            <>
            <button id='cross' onClick={closeLogin}><i class="bi bi-x"></i></button>
            <h5 id='state' className='mb-4 justify-center text-center'>
              <span id='Sign-in' style={{cursor:'pointer'}} className={`auth-tab ${isStudent? 'active':""} `} onClick={setFalseForStudent}>
                Student
              </span>
              &nbsp;   &nbsp;  &nbsp;   &nbsp;   &nbsp;   &nbsp;   &nbsp;
              <span id='join-in' style={{cursor:'pointer'}} className={`auth-tab ${isStudent? 'active':""} `} onClick={setTrueForStudent}>
                Employee andT&p
              </span>
            </h5>
            {isStudent ?(
                <>
                     <div className="py-6">


                      <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                            <div className="w-full p-8 lg:w-1/2">
                            <p onClick={loginFunction} className='flex
 items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100' >
    <div className="px-4 py-3">
    <svg class="h-6 w-6" viewBox="0 0 40 40">
                         <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                         <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                         <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                         <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                     </svg>
    </div>
    <h4 className='text-gray-500'>Login With Google 
    </h4>
 </p>
 <div className="mt-4 flex items-center justify-between">
<span className='border-b- w-1/5 lg:w-1/4'></span>
<p className='text-gray-500 text sm font-bold mb-2'> or</p>
<span className='border-b- w-1/5 lg:w-1/4'></span>

 </div>
 <div class="mt-4">
                 <label class="block text-gray-700 text-sm font-bold mb-2">Email </label>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"  placeholder='john@example.com'/>
             </div>
             <div class="mt-4">
                 <div class="flex justify-between">
                     <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                     <a href="/" class="text-xs text-blue-500">Forget Password?</a>
                 </div>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"   placeholder='Must be atleast 6 characters'   type="password"/>
             </div>
             <div className="mt-8">
             <button className='btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 '>Login</button>
             </div>
             <div className="mt-4 flex items-center justify-between">
<p className='text-sm'>new to internarea? Register(<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>Student</span>/<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>company</span>) </p>
             </div>

  



                            </div>
                      </div>
                     </div>
                </>
            ):(
              <>
                      <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
<div className="w-full p-8 lg:w-1/2">
                 <div class="mt-4">
                 <label class="block text-gray-700 text-sm font-bold mb-2">Email </label>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"  placeholder='john@example.com'/>
             </div>
             <div class="mt-4">
                 <div class="flex justify-between">
                     <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                     <a href="/" class="text-xs text-blue-500">Forget Password?</a>
                 </div>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"   placeholder='Must be atleast 6 characters'   type="password"/>
             </div>
             <div className="mt-8">
             <button className='btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 '>Login</button>
             </div>

             <div className="mt-4 flex items-center justify-between">
<p className='text-sm'>new to internarea? Register(<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>Student</span>/<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>company</span>) </p>
             </div></div>
             </div>
              </>
            )
            }
            </>
          )
        }


        {isDivVisibleForProfile&&(
          <div className="profile-dropdown h-16 rounded-sm shadow-sm">
            <p className='font-bold'>{user?.name}</p>
            <p className='font-medium'>{user?.email}</p>
          </div>
        )

        }
      </div>
      <Sidebar />
    </div>
  )
}

export default Navbar
