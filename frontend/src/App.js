import './App.css';
import {BrowserRouter as Router,Routes, Route, Link } from "react-router-dom"
import NavigationBar from './navigation/NavigationBar';
import Home from "./map/Home";
import RouteView from "./map/RouteView"

import MainPage from './components/MainPage';
import MainPage2 from './components/MainPage2';
import axios from "axios";


function App() {
  return (
    <NavigationBar></NavigationBar>
);
}

export default App;
