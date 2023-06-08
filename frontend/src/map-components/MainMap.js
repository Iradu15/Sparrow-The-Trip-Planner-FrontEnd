import { useLoadScript } from "@react-google-maps/api"
import { GoogleMap } from "@react-google-maps/api";
import { useState } from "react";

import MarkerStatic from "./MarkerStatic";
import MarkerDynamic from "./MarkerDynamic";

const center = {lat: 44.435569, lng: 26.099511};

export default function MainMap({ children }) {
    const [map, setMap] = useState(null);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: ""
    });

    if (!isLoaded) return <>loading...</>;

    const handleMapLoad = (map) => {
        setMap(map);
    }

    return (
        <GoogleMap 
            zoom={10} 
            center={center}
            mapContainerClassName="map-container"
            onLoad={handleMapLoad}>

                <MarkerDynamic
                    title="Vestul Salbatic" 
                    lat={44.403802} 
                    lng={26.092205}
                    map={map}
                ></MarkerDynamic>

                <MarkerStatic
                    title="Grozavesti"
                    lat={44.411750} 
                    lng={26.093940}
                    map={map}
                ></MarkerStatic>
        
        </GoogleMap>)
}
