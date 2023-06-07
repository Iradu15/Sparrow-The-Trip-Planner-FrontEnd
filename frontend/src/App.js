import './App.css';
import { useState } from "react";
import MainMap from "./map-components/MainMap";
import { Container } from "@mui/material";
import { Marker } from "@react-google-maps/api";

const position = [{lat: 44.442787, lng: 26.064087}, {lat: 44.429809, lng: 26.100619}];

function App() {
    const [markerCoordinates, setMarkerCoordinates] = useState(null);

    return <Container maxWidth="xxl">
      <MainMap setMarkerCoordinatesInParent={setMarkerCoordinates}>
          <Marker position={position[0]}/>
          <Marker position={position[1]}/>
      </MainMap>
    </Container>;
}

export default App;
