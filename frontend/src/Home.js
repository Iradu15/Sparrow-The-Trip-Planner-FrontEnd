import { useState, useEffect, useCallback, useRef } from "react";
import { Marker, useJsApiLoader, GoogleMap, MarkerClusterer } from "@react-google-maps/api";
import {TextField} from "@mui/material";


// when no markers are provided, the map will be centered so that the whole world is visible
const defaultCenter = {lat: 45, lng: 0};
// 'travel' map style; disable map type switch buttons
const options = {mapId: "77ee2dda51aa3d0d", mapTypeControl: false};

// the setMarker prop should be provided only in the context of a map from which input is expected (e.g. add attraction);
// for purely output-generating maps (all others), when no markers are provided, it is appropriate for the map to go
// into the whole-world view directly, without asking permission to acquire the user's current location;
export default function Home() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [map, setMap] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [isVerified, setIsVerified] = useState(true);
    const [routes, setRoutes] = useState([]);

    const markers = routes.map(route => <Marker key={route.id} position={{lat: route.startingPointLat, lng: route.startingPointLon}}/>)

    // delay data fetching by 0.5s after the user stopped typing
    useEffect(() => {
       const timeOut = setTimeout(() => fetchRoutes(), 500);
       return () => clearTimeout(timeOut);
    }, [searchQuery]);

    const fetchRoutes = () => {
        if (searchQuery !== '')
            fetch('http://localhost:8000/route/list/?search=' + searchQuery + '&verified=' + isVerified, {method: 'GET', credentials: 'include'}).
            then(data => data.json()).
            then(data => {setRoutes(data.results); });
        else
            setRoutes([]);
    }

    return <>
        <TextField label="Search Field" type="search" onChange={event => setSearchQuery(event.target.value)} value={searchQuery} />
        {!isLoaded ? "loading..." :
            <GoogleMap zoom={3.35} center={defaultCenter} mapContainerClassName="map-container" options={options} onLoad={map => setMap(map)}>
                {markers}
            </GoogleMap>
        }
    </>;

    // // hook which centers the map around the provided markers and sets the zoom appropriately;
    // // when no markers are provided, if the user chooses to provide their location, the map is
    // // centered accordingly;
    // // if all else fails, the map goes into the whole-world view
    // const onLoad = useCallback(
    //     (map) => {
    //         if (markers !== []) {
    //             const bounds = new window.google.maps.LatLngBounds();
    //
    //             // extend the bounds by each marker's coordinates
    //             markers.forEach((location) => {
    //                 bounds.extend(location.props.position);
    //             })
    //
    //             map.fitBounds(bounds);
    //         }
    //     },
    //     []);
    //
    // const onClick = useCallback(
    //     (event) => {
    //         const clickedPosition = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    //
    //         // update the state in the parent component
    //         setMarkerCoordinatesInParent(clickedPosition);
    //
    //         // update the marker coordinates
    //         setCurrentMarkerCoordinates(clickedPosition);
    //     },
    //     []);
    //

    //
}
