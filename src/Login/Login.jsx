import { useContext, useState } from "react"
import UserContext from "../context/UserContext.js";
import { NavLink } from "react-router-dom";



function Login() {
    const [username, setUsername] = useState("");
    const [emailid, setEmailid] = useState('');

    // in user context provider we passed this function as a props to usercontextprovider that why we have access of this 
    // now with this setUser method we can change the value of User 
    const { setUser, user } = useContext(UserContext); 

    function handleLoginSubmit(event) {
        event.preventDefault();
        setUser({username, emailid});

        console.log('data is added to usercontext')
    }

    return (
        <div className="flex flex-col m-auto mt-20">
            <input type="text" placeholder="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" name="email" placeholder="email" value={emailid} onChange={(e) => setEmailid(e.target.value)} />

            <button type="submit" onClick={handleLoginSubmit} >Submit</button>


            <div>
                <h1>name: {user ? user.username: ''}</h1>
                <h1>email: {user ? user.emailid: ''}</h1>
            </div>

            <NavLink to='/myprofile' >
                Open Myprofile
            </NavLink>
        </div>
    )
}


export default Login;