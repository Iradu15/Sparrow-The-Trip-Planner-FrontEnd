import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import {BrowserRouter as Router,Routes, Route, Link } from "react-router-dom"
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>

        <Routes>
          <Route exact path='/' element={< MainPage />}></Route>
          <Route exact path='/about' element={< About />}></Route>
        </Routes>

      </div>
    </Router>
);
}

export default App;
