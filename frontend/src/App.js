import './App.css';
import { useState } from "react";
import MainMap from "./map-components/MainMap";
import Home from "./Home";
import RouteView from "./RouteView"
import RouteEditCreate from "./RouteEditCreate";
import { Container } from "@mui/material";
import { Marker } from "@react-google-maps/api";

function App() {
    // return <Home/>;
    // return <RouteView routeId={4} />
    return <RouteEditCreate routeId={4} userId={1} />
}

export default App;
