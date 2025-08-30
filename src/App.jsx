import { useState } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Education from './components/Education.jsx';
import Login from './components/Login.jsx';
import Skills from './components/Skills.jsx';
import Blog from './components/Blog.jsx';
import './App.css';

/**
  * The main app for the Dylan Reid personal webside
  */
function App() {
  const [page, setPage] = useState("home");
  const [username, setUsername] = useState(localStorage.getItem("username" || ''));
  localStorage.setItem("username", username);

  const handleNav = () => {
    switch (page) {
      case "education": return (<Education />);
      case "login": return (<Login setUsername={setUsername} setPage={setPage} />);
      case "home": return (<Home />);
      case "skills": return (<Skills />);
      case "blog": return (<Blog username={username}/>);
      default: return (<Home />);
    }
  }

  return (
    <div className='App'>
      <Header page={page} setPage={setPage} username={username} setUsername={setUsername}/>
      <div className="body">
        {handleNav()}
      </div>
    </div>
  );
}

export default App
