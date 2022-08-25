import { useAuth } from "../context/authContext";
import React,{ useState } from 'react'
import Notifier from "react-desktop-notification"
import logo from "../assets/icon.png"
import {config} from "../Config"
import { retriveDoc } from "../firebaseFunctions";

export function Home() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      clearInterval(x)
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(()=>{
    getUserData(user.email)
  }, [user.email])

  const [value,setValue] = useState("1800000")
  const [userData, setUserData] = useState({})

  async function getUserData(name){
      setUserData(await retriveDoc(name));
  }

  function handleChange(e){
    config.interval = parseInt(e.target.value)
    clearInterval(x)
    setValue(e.target.value)
  }

  const x = setInterval(gotNewNotification,config.interval)

  function gotNewNotification(){
    Notifier.focus(
      "BeActive",
      "Es hora de hacer ejercicio!!",
      "http://localhost:3000/",
      "https://cdn.icon-icons.com/icons2/1863/PNG/512/notifications-active_118870.png"
      );
  }

  console.log(userData);

  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-center items-center  ">
          <img 
            src={logo} ></img>
        </div>
        <p className="text-xl mb-4">Welcome {user.displayName || user.email}</p>
        <p className="text-xl mb-4">Your Age is {user.displayName || userData.age}</p>

        <div>
          <p>Interval time</p>
        <select
        value={value} 
        onChange ={handleChange}
        className="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option value="600000">10 minutes</option>
        <option value="1800000">30 minutes</option>
        <option value="3600000">1 hour</option>
        <option value="15000">15 seconds</option>
    </select>
        </div>
       <div className="flex justify-center items-center ">
        <button
          className="bg-slate-200
           hover:bg-slate-300 
           rounded py-2 px-4 
           text-black 
           my-5"
          onClick={handleLogout}
        >
          logout
        </button>

       </div>

{
  /*
  <div>
    <button 
    className="bg-slate-200 rounded py-2 px-4 text-black  hover:bg-slate-300"
    onClick={gotNewNotification}
    >
      send Notification
    </button>
  </div>

  
  */
}

      </div>
    </div>
  );
}
