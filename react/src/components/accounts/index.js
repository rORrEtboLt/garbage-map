import React, { useState, useEffect }  from 'react'
import LeafletPopup from '../react_leaflet/index'
import { useAlert } from 'react-alert'
import { GarbageMapCommunicator } from '../backend_communicator/garbage_map_communicator'
import { useGeolocated } from "react-geolocated";

const garbageMapCommunicator = new GarbageMapCommunicator();


const Accounts = () => {
    // Geo location
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    // initialize alert 
    const alert = useAlert();

    // Call garbage map get api
    const [data, setData] = useState(null);

    useEffect(() => {
        if(!isGeolocationAvailable){
            alert.show("Your browser doesnot support geo location");
        }
        else if(!isGeolocationEnabled){
            alert.show("Geolocation not enabled")
        }else if(coords){
            garbageMapCommunicator
            .get(coords.latitude, coords.longitude) // TODO: Hardcoded to be changed to current lat lon
            .then((result) => {
                if (result.success) {
                    //log data from garbagemap fetch
                    setData(result)
                    alert.show(result.message);
                }
                else {
                    alert.show(result.message);
                }
            })
            .catch((error) => {
                alert.show("Error Fetching data.");
            });
        }
    }, [coords]);

    return (<LeafletPopup />)
}

export default Accounts;