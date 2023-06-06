import { Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import pin from "../assets/images/icons/pin.png";
import "./Marker.css";

export default function MarkerStatic(props){
    // map will be passed from parent component
    const [map, setMap] = useState(null);
    // the infoWindow above the marker
    const [infoWindow, setInfoWindow] = useState(null);
    const marker_position = {lat: props.lat, lng: props.lng};

    useEffect(() => {
        if(props.map)
            setMap(props.map);
    }, [props.map]);

    // function that will check if the marker has an opened InfoWindow
    // if it doesn't, create a new InfoWindow and position it relative 
    // to the zoomed map and to its marker
    const handleMarkerClick = (marker) => {
        if(infoWindow == null){
            const newInfoWindow = new window.google.maps.InfoWindow({
                content: "ADD",
                position: marker_position,
                pixelOffset: new window.google.maps.Size(0, -25),
            });
            
            // if the InfoWindow is closed, make the marker's window null
            newInfoWindow.addListener('closeclick', () => {
                setInfoWindow(null);
            });

            // set the marker's window to be the newly created one
            setInfoWindow(newInfoWindow);
            newInfoWindow.open(map);
        }
    }

    return(
        <div>
            <Marker
                icon={pin}
                position={marker_position}
                onClick={(marker) => handleMarkerClick(marker)}
            />
        </div>
    )
}