import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useMemo, useCallback, useRef } from "react";
import { Children } from "react";
import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";


// when no markers are provided, the map will be centered so that the whole world is visible
const defaultCenter = {lat: 45, lng: 0};
// 'travel' map style; disable map type switch buttons
const options = {mapId: "77ee2dda51aa3d0d", mapTypeControl: false};

// the onClick prop should be provided only in the context of a map from which input is expected (e.g. add attraction);
// for purely output-generating maps (all others), when no markers are provided, it is appropriate for the map to go
// into the whole-world view directly, without asking permission to acquire the user's current location;
export default function MainMap({ children, onClick }) {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    // hook which centers the map around the provided markers and sets the zoom appropriately;
    // when no markers are provided, if the user chooses to provide their location, the map is
    // centered accordingly;
    // if all else fails, the map goes into the whole-world view
    const onLoad = useCallback((map) => {
        if (children !== undefined) {
            const bounds = new window.google.maps.LatLngBounds();

            // extend the bounds by each marker's coordinates
            Children.forEach(children, (location) => {
                bounds.extend(location.props.position);
            })

            map.fitBounds(bounds);
        }
        else if (onClick) {
            navigator.geolocation.getCurrentPosition(
                (currentPosition) => {
                    map.panTo({lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude});
                });
        }
    }, []);

    if (!isLoaded) return <>loading...</>;

    return <GoogleMap zoom={3.35} center={defaultCenter} mapContainerClassName="map-container" options={options} onLoad={onLoad} onClick={onClick}>
                {children}
        </GoogleMap>;
}
