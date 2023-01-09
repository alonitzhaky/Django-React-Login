import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {
    const SERVER = 'http://127.0.0.1:8000/';
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [msg, setmsg] = useState("");
    const Registration = () => {
        axios.post(SERVER + 'register/', { username, password, email })
            .then((res) => setmsg(res.data))
    }
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <h2 style={{ textAlign: "center" }}>{msg}</h2>
            <br /><br />
            Username: <input onChange={(e) => setusername(e.target.value)}></input>
            <br /><br />
            Password: <input type={"password"} onChange={(e) => setpassword(e.target.value)}></input>
            <br /><br />
            Email: <input onChange={(e) => setemail(e.target.value)}></input>
            <button onClick={() => Registration()}>Register</button>
        </div>

    )
}

export default Register