import { Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

import pin from "../assets/images/icons/pin.png";
import pin_added from "../assets/images/icons/pin_added.png";
import "./Marker.css";

export default function MarkerDynamic(props){
    // map will be passed from parent component
    const [map, setMap] = useState(null);
    // the infoWindow above the marker
    const [infoWindow, setInfoWindow] = useState(null);
    // 'ADD' button is visible handler
    const [addVisible, setAddVisible] = useState(props.addVisible);
    const marker_position = {lat: props.lat, lng: props.lng};

    useEffect(() => {
        setMap(props.map);
    }, [props.map]);

    const handleAddClick = () => {
        setAddVisible(!addVisible);
        props.onAdd(props.id);
    }

    // create the content for info window
    const createInfoWindowContent = () => {
        const marker_wrapper = document.createElement('div');
        marker_wrapper.classList.add("marker__wrapper");

        const marker_title = document.createElement('h2');
        marker_title.innerText = props.title;
        marker_title.classList.add("marker__title");
        marker_wrapper.appendChild(marker_title);

        // add button will be added only if the attraction
        // is not chosen by the user
        if(addVisible){
            const marker_add = document.createElement('div');
            marker_add.innerText = "ADD";
            marker_add.classList.add("marker__add");
            marker_add.addEventListener('click', () => {
                handleAddClick();
                marker_add.remove();
            });
            
            marker_wrapper.appendChild(marker_add);
        }

        return marker_wrapper
    }

    // function that will check if the marker has an opened InfoWindow
    // if it doesn't, create a new InfoWindow and position it relative 
    // to the zoomed map and to its marker
    const handleMarkerClick = (marker) => {
        if(infoWindow == null){
            const newInfoWindow = new window.google.maps.InfoWindow({
                position: marker_position,
                pixelOffset: new window.google.maps.Size(0, -25)
            });
            
            newInfoWindow.setContent(createInfoWindowContent());
            
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
                icon={addVisible ? pin : pin_added}
                position={marker_position}
                onClick={(marker) => handleMarkerClick(marker)}
            />
        </div>
    )
}