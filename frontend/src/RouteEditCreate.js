import { useState, useEffect, useRef } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import MarkerDynamic from "./map-components/MarkerDynamic";
import {TextField} from "@mui/material";


// when no markers are provided, the map will be centered so that the whole world is visible
const defaultCenter = {lat: 45, lng: 0};
// 'travel' map style; disable map type switch buttons
const options = {mapId: "77ee2dda51aa3d0d", mapTypeControl: false};

export default function RouteEditCreate({ routeId, userId }) {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [error, setError] = useState(false);
    const [map, setMap] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [route, setRoute] = useState({});
    const [searchedAttractions, setSearchedAttractions] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);

    const onAdd = (id) => {
        // find the searched attraction which was clicked
        const currentAttraction = searchedAttractions.find(element => element.id === id);
        // and add it to the selected attraction array
        selectedAttractions.push(currentAttraction);
    };

    // add the attractions resulted from the query first
    const markers = searchedAttractions.map(attraction =>
        <MarkerDynamic key={attraction.id} lat={attraction.latitude} lng={attraction.longitude} title={attraction.name} map={map} onAdd={onAdd} addVisible={true} />);

    // and the selected attractions last
    markers.push(...selectedAttractions.map(attraction =>
        <MarkerDynamic key={attraction.id} lat={attraction.latitude} lng={attraction.longitude} title={attraction.name} map={map} onAdd={onAdd} addVisible={false} />));

    useEffect(() => {
        let exists = true;

        fetch('http://localhost:8000/route/detail/' + routeId + '/').
        then(data => data.json()).
        then(data => setRoute(data)).
        catch(error => {
            exists = false;
            setRoute({title: "title...", description: "description...", verified: false, public: true, user: userId})
        });

        if (exists)
            // fetch the associated attractions
            fetch('http://localhost:8000/attraction/list/?isWithin__route_id=' + routeId, {method: 'GET', credentials: 'include'}).
            then(data => data.json()).
            then(data => setSelectedAttractions(data.results)).
            catch(error => setError(error));
    }, []);

    // delay data fetching by 0.5s after the user stopped typing the attraction query
    useEffect(() => {
        const timeOut = setTimeout(() => fetchAttractions(), 500);
        return () => clearTimeout(timeOut);
    }, [searchQuery]);

    const fetchAttractions = () => {
        if (searchQuery !== '')
            fetch('http://localhost:8000/attraction/list/?search=' + searchQuery, {method: 'GET', credentials: 'include'}).
            then(data => data.json()).
            then(data => setSearchedAttractions(data.results)).
            catch(error => setError(error));
        else
            setSearchedAttractions([]);
    }

    if (error)
        return <></>;

    return <>
        <TextField label="Attraction Search" type="search" onChange={event => setSearchQuery(event.target.value)} value={searchQuery} />

        <div>
            {route.verified ? <h4>verified!</h4> : ""}
            <h3>{route.title}</h3>
            <h5>{route.publicationDate}</h5>
            <h6>{route.description}</h6>
        </div>

        {!isLoaded ? "" :
            <GoogleMap zoom={3.35} center={defaultCenter} mapContainerClassName="map-container" options={options} onLoad={map => setMap(map)}>
                {markers}
            </GoogleMap>
        }
    </>;
}
