import React, { useEffect, useState } from "react";
import axios from "axios";
import Register from "./Register";

const App = () => {
  const SERVER = 'http://127.0.0.1:8000/'; 
  const [products, setproducts] = useState([])
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [myToken, setmytoken] = useState("");
  const [logged, setlogged] = useState(false)
  const getProducts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${myToken}`
      }
    };
    await axios.get(SERVER + 'products/', config).then((res) => setproducts(res.data));
  };
  {/* Will access products/ and show user-specific products. */}
  useEffect(() => {
    if (myToken)
    getProducts(); 
  }, [myToken]);

  {/* Will show user's name on top of the website if login was successful and token was found. */}
  useEffect(() => {
  if (myToken)
    setlogged(true); 
  }, [myToken]);

  const login = () => {
    axios.post(SERVER + "login/", { username, password })
      .then((res) => setmytoken(res.data.access));
  };

return (
  <div>
    {/* If user has valid token, display their name. */}
    {logged && 'Welcome: ' + username}
    <hr/>
    Username: <input onChange={(e) => setusername(e.target.value)}></input>
    <br/><br/>
    Password: <input type={"password"} onChange={(e) => setpassword(e.target.value)}></input>
    <hr/>
    <button onClick={() => login()}>Login</button>
    <hr/>
    <button onClick={() => getProducts()}>Get Products</button>

    {products.map((product, i) => (
      <div key={i}>
        Title: {product.name}, 
        Price: {product.price}
        </div>
      ))}
      <hr/>
        <Register></Register>
      </div>
);
}; 

export default App;