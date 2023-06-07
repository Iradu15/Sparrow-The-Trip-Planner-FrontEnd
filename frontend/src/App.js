import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import {BrowserRouter as Router,Routes, Route, Link } from "react-router-dom"
import MainPage2 from './components/MainPage2';
import axios from "axios";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/design">Design</Link>
          </li>
        </ul>

        <Routes>
          <Route exact path='/' element={< MainPage />}></Route>
          <Route exact path='/design' element={< MainPage2 />}></Route>
        </Routes>

      </div>
    </Router>
);
}

export default App;
