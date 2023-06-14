import './App.css';
import MainPage from './components/MainPage';
import {BrowserRouter as Router,Routes, Route, Link } from "react-router-dom"
import MainPage2 from './components/MainPage2';
import axios from "axios";
import MainMap from "./map-components/MainMap";
import Home from "./Home";
import RouteView from "./RouteView"
import { Container } from "@mui/material";
import { Marker } from "@react-google-maps/api";

function App() {
  return (
    //routing 
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/authentication">Authentication</Link>
          </li>
          {/* <li>
          <Link to="/authentication2">Authentication2</Link>
          </li> */}
          {/* <li>
          <Link to="/route13">route13</Link>
          </li> */}
        </ul>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/authentication' element={< MainPage />}></Route>
          {/* <Route exact path='/authentication2' element={< MainPage />}></Route> */}
          <Route exact path="/route/:routeId" element={<RouteView />} />
          {/* <Route exact path="/route13" element={<RouteView routeId={11} />} /> */}
        </Routes>

      </div>
    </Router>
);
}

export default App;
