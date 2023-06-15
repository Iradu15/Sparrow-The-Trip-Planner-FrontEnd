import { useState, useEffect, useRef } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import MarkerStatic from "./map-components/MarkerStatic";
import { useParams } from "react-router-dom";

// import {credentials, isLoggedIn} from './components/MainPage2'
 
// when no markers are provided, the map will be centered so that the whole world is visible
const defaultCenter = {lat: 45, lng: 0};
// 'travel' map style; disable map type switch buttons
const options = {mapId: "77ee2dda51aa3d0d", mapTypeControl: false};

export default function RouteView() {
  const { routeId } = useParams();
  useEffect(() => {
    console.log("routeId", routeId)
  }, [routeId]);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDDSZwOALrOAUzlAspZcreypL-i1ewGXWE",
    });

    const [error, setError] = useState(false);
    const [map, setMap] = useState({});
    const [route, setRoute] = useState({});
    const [attractions, setAttractions] = useState([]);


    let markers = null;
    if (map && attractions.length > 0) {
      markers = attractions.map((attraction) => (
        <MarkerStatic
          key={attraction.id}
          lat={attraction.latitude}
          lng={attraction.longitude}
          title={attraction.name}
          map={map}
        />
      ));
      console.log(attractions)
    }

    // const markers = attractions.map(attractions =>
    //     <MarkerStatic key={attraction.id} lat={attraction.latitude} lng={attraction.longitude} title={attraction.name} map={map} />);
   
    useEffect(() => {

      // if(isLoggedIn){
      // const credentialsString = `${credentials.username}:${credentials.password}`;
      // const encodedCredentials = btoa(credentialsString);
    

      fetch('http://localhost:8000/route/detail/' + routeId + '/', {headers: {
        // Authorization: `Basic ${encodedCredentials}`,
      },}).
      then(data => data.json()).
      then(data => setRoute(data)).
      catch(error => setError(error));

      // fetch the associated attractions
      fetch('http://localhost:8000/attraction/list/?isWithin__route_id=' + routeId, {headers: {
        // Authorization: `Basic ${encodedCredentials}`,
      },}).
      then(data => data.json()).
      then(data => setAttractions(data.results)).
      catch(error => setError(error));
      // }
      // console.log(isLoggedIn)
      
    }, []);

    if (error)
        return <></>;

    return <>
        <div>
            {route.verified ? <h4>verified!</h4> : ""}
            <h3>{route.title}</h3>
            <h5>{route.publicationDate}</h5>
            <h6>{route.description}</h6>
        </div>

        {!isLoaded ? "loading..." :
            <GoogleMap zoom={3.35} center={defaultCenter} mapContainerClassName="map-container" options={options} onLoad={map => setMap(map)}>
                {markers}
            </GoogleMap>
        }
    </>;
}