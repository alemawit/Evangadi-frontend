import React,{useContext} from 'react'
import { AppState } from "../App";
function Home() {
    const  {user}  = useContext(AppState);
    console.log(user);
  return (
    <div>
        <h1>Home</h1>
        <br />
        <br />
        <br />
        <br />
        <h2>username:{user?.username}</h2>
    </div>
  )
}

export default Home