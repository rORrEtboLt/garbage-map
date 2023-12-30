import React, { useState, useEffect }  from 'react'
import LeafletPopup from '../react_leaflet/index'
import { useAlert } from 'react-alert'
import { GarbageMapCommunicator } from '../backend_communicator/garbage_map_communicator'

const garbageMapCommunicator = new GarbageMapCommunicator();


const Accounts = () => {
    // initialize alert 
    const alert = useAlert();
    // Call garbage map get api
    const [data, setData] = useState(null);

    useEffect(() => {
        garbageMapCommunicator
            .get(13.3313, 75.7691) // TODO: Hardcoded to be changed to current lat lon
            .then((result) => {
                if (result.success) {
                    //log data from garbagemap fetch
                    console.log(result)
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
    }, []);

    return (<LeafletPopup />)
}

export default Accounts;