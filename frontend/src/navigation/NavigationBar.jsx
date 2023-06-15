import "./NavigationBar.css";
import "../assets/CSS/general-style.css";
import logo from "../assets/images/logo/logo.png";

import {BrowserRouter as Router,Routes, Route, Link } from "react-router-dom"

import Home from "../map/Home";
import RouteView from "../map/RouteView"

import MainPage from '../components/MainPage';
import MainPage2 from '../components/MainPage2';
import axios from "axios";


export default function NavigationBar(){
    return(
        <>
        <Router>
            <div className="navigation__bar">
                <Link to="/">
                    <img src={logo} id="navigation__logo"/>
                </Link>
                <div class="navigation__links">

                    <div className="navigation__link">
                        <Link to="/authentication">Authentication</Link>
                    </div>

                    {/* <div className="navigation__link">
                        <Link to="/authentication2">Authentication2</Link>
                    </div>

                    <div className="navigation__link">
                        <Link to="/route13">route13</Link>
                    </div> */}
                </div>
            </div>

            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/authentication' element={< MainPage />}></Route>
                {/* <Route exact path='/authentication2' element={< MainPage />}></Route> */}
                <Route exact path={"/route/:routeId"} element={<RouteView />} />
                {/* <Route exact path="/route13" element={<RouteView routeId={11} />} /> */}
            </Routes>
        </Router>
        </>
    )
}