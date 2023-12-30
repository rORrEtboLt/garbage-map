import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGeolocated } from "react-geolocated";
import L, {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './leaflet-gm.css'
import garbagePng from "./garbage.png"

export const pointerIcon = new L.Icon({
    iconUrl: './garbage.svg',
    iconRetinaUrl: './garbage.svg',
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
    iconSize: [40, 40],
    shadowUrl: '../../garbage.png',
    shadowSize: [29, 40],
    shadowAnchor: [7, 40],
  })
  

const LeafletPopup = () => {
    // Geo location
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const [data, setData] = useState({
        lat: 13.3313,
        lng: 75.7691,
        zoom: 13,
    });
    const [position, setPosition] = useState([data.lat, data.lng])


    useEffect(() => {
        if(!isGeolocationAvailable){
            alert.show("Your browser doesnot support geo location");
        }
        else if(!isGeolocationEnabled){
            alert.show("Geolocation not enabled")
        }else if(coords){
            setPosition([coords.latitude,coords.longitude])
        }
    }, [coords]);


    return (
        <div><Map center={position} zoom={data.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={new Icon({iconUrl: garbagePng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </Map></div>

    )
};

export default LeafletPopup;