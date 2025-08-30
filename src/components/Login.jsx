import { useState } from 'react';
import * as globals from '../utils/globals.js';
import './Bodies.css';

/*
 * React component used to log to an admin account
 *
 * @component
 *
 * @param {Object} props
 * @param {Function} props.setUsername - function used to set the username when
 * logged in
 * @param {Function} props.setPage - function to perform redirect upon login.
 *
 * @returns {JSX.Element} The rendered ListSearch component
 */
export default function Login( {setUsername, setPage} ) {
  /* states for the username and password edit boxes */
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  /* state for the error message */
  const [error, setError] = useState('');

  /**
   * Called when the login button is clicked. If the credentials are valid. it
   * signs the user in. If no username is given or the password is incorrect, it
   * warns the user.
   */
  const handleLogin = () => {
    setError('');
    const username = (editUsername ?? '').trim();
    if (username === '') {
      setError("Please enter a valid username");
      return;
    }
    if (!globals.userExists(username)) {
      setError("Account with this username does not exist.")
    } else {
      if (editPassword === globals.getPassword(username)) {
        setUsername(username);
        setPage("home");
      } else {
        setError("Password is incorrect for this username.");
      }
    }
  }

  let passwordCaption;
  showPassword==="password" ? passwordCaption="show password" : passwordCaption="hide password";
  return (
    <>
      <h1 className="sectionHeading">Login</h1>
        <div className="sectionBlock">
          <h3>Username</h3>
            <input className="searchBar" type="text" value={editUsername} onChange={e => setEditUsername(e.target.value)}
            placeholder="Enter username" />
          <h3>Password</h3>
            <input className="searchBar" type={showPassword} value={editPassword} onChange={e => setEditPassword(e.target.value)}
            placeholder="Enter password" />
          <button className="outerButton"onClick={()=>{showPassword==='password' ? setShowPassword('text'): setShowPassword('password')}}>{passwordCaption}</button>
        </div>
        {error && <div className="sectionSubHeading"> <h2>{error}</h2></div>}
        <button className="outerButton"onClick={handleLogin}><h2>Login</h2></button>
    </>
  )
}
