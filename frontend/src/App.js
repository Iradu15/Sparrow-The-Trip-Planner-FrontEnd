import './App.css';
import { useState } from "react";
import MainMap from "./map-components/MainMap";
import Home from "./Home";
import RouteView from "./RouteView"
import { Container } from "@mui/material";
import { Marker } from "@react-google-maps/api";

function App() {
    // return <Home/>;
    return <RouteView routeId={2} />
}

export default App;
