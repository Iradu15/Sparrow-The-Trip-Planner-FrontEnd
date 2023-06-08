import './App.css';
import { useState } from "react";
import MainMap from "./map-components/MainMap";
import Home from "./Home";
import SideMenu from "./menu-components/SideMenu";
import { Container } from "@mui/material";
import { Marker } from "@react-google-maps/api";

function App() {
    return <SideMenu
        title="Vatra Dornei"
        publicationDate="118.20.23231"
        author="John Wick"
        description="John Wick a plecat in Vatra Dornei"
    />;
}

export default App;
