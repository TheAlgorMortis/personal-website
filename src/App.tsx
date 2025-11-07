import Header from "./components/Header";
import Home from "./components/Home";
import Education from "./components/Education";
import Skills from "./components/Skills";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/**
 * The main app for the Dylan Reid personal webside
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="body">
          <Routes>
            {/* home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />

            {/* education */}
            <Route path="/education" element={<Education />} />

            {/* redirect /skills -> /skills/skills */}
            <Route
              path="/skills"
              element={<Navigate to="/skills/skills" replace />}
            />

            {/* /skills/[skills|experience][/category[/detail]] */}
            <Route path="/skills">
              <Route path="skills">
                <Route index element={<Skills />} />
                <Route path=":category" element={<Skills />} />
                <Route path=":category/:detail" element={<Skills />} />
              </Route>
              <Route path="experience">
                <Route index element={<Skills />} />
                <Route path=":category" element={<Skills />} />
                <Route path=":category/:detail" element={<Skills />} />
              </Route>
            </Route>

            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
