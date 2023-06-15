import "./RouteView.css";
import { useState, useEffect, useRef } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import MarkerStatic from "../markers/MarkerStatic";
import SideMenu from "../menu/SideMenu";
import { useParams } from "react-router-dom";

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

    useEffect(() => {
      console.log("attractions", attractions)
    }, [attractions]);
    
    useEffect(() => {

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const credentials = JSON.parse(localStorage.getItem('credentials'));
      console.log("credentials", credentials)

      if(isLoggedIn){
      
        const credentialsString = `${credentials.username}:${credentials.password}`;
        const encodedCredentials = btoa(credentialsString);
        fetch('http://localhost:8000/route/detail/' + routeId + '/', {headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },}).then(data => data.json()).
        then(data => setRoute(data)).
        catch(error => setError(error));

        // fetch the associated attractions
        fetch('http://localhost:8000/attraction/list/?isWithin__route_id=' + routeId, {headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },}).then(data => data.json()).
        then(data => setAttractions(data.results)).
        catch(error => setError(error));
      }
      console.log("isLoggedIn", isLoggedIn)
    }, []);
    
    let markers = null;
    if (isLoaded && map && attractions && attractions.length > 0) {
      markers = attractions.map((attraction) => (
        <MarkerStatic
          key={attraction.id}
          lat={attraction.latitude}
          lng={attraction.longitude}
          title={attraction.name}
          map={map}
        />
      ));
    }

    if (error)
        return <></>;

    
    return <>
        <div class="route-view__wrapper">
          {attractions && attractions.length > 0 && (
            <div className="route-view__menu">
              <SideMenu
                title={route.title}
                publicationDate={route.publicationDate}
                description={route.description}
                attractions={attractions}
              />
            </div>
          )}

            <div class="route-view__map">
                {!isLoaded ? "" :
                    <GoogleMap 
                        zoom={3.35} 
                        center={defaultCenter} 
                        mapContainerClassName="map-container" 
                        options={options} 
                        onLoad={map => setMap(map)}>
                            {markers}
                    </GoogleMap>
                }
            </div>
        </div>
    </>;
}
