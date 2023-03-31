import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RetreatContext } from "./context/RetreatContext";
import ModalView from "./components/ModalView";
import DisplayPhoto from "./components/DisplayPhoto";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLocationPin,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const Retreats = () => {
  const retreatID = useParams(); // Take the retreat id
  const { retreats } = useContext(RetreatContext); // Fetch all the retreats from context
  const navigate = useNavigate();

  const retreat = retreats.find((rt) => rt.id === retreatID.id);
  // If there are no retreat return to home page
  if (!retreat) {
    return navigate("/");
  }

  const content = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto bg-white py-1 border-t border-gray-400"></div>
      <ModalView
        className="w-full"
        actionType={"edit"}
        title={"EDIT RETREAT"}
        retreatProp={retreat}
        retreatID={retreatID}
      ></ModalView>
      <div className="w-full h-full bg-white rounded-2xl m-2 text-gray-500">
        <div className="h-64">
          <DisplayPhoto id={retreatID.id} heightImg={"h-full"} />
        </div>

        <div className="pt-3 flex items-center justify-between">
          <h1 className="px-2 text-2xl uppercase w-full font-bold">
            {retreat.name}
          </h1>
        </div>
        <div className="flex text-sm px-2 my-2">
          <div className="grid grid-rows-1">
            <div className="w-full flex items-center">
              <FontAwesomeIcon icon={faBook} className="px-2" />
              <span className="px-2">{retreat.description}</span>
            </div>
            <div className="w-full flex items-center">
              <FontAwesomeIcon icon={faLocationPin} className="py-1 px-2" />
              <span className="px-2">{retreat.address}</span>
            </div>
            <div className="w-full flex items-center">
              <FontAwesomeIcon icon={faPhone} className="py-1 px-2" />
              <span className="px-1">{retreat.mobile}</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto bg-white py-1 border-t border-gray-400"></div>
        <div className="">
          <h2 className="px-2 py-2 m-2 uppercase font-bold text-lg">
            Where To find?
          </h2>
          <div className="h-96 w-full">
            <MapContainer
              center={[retreat.location.latitude, retreat.location.longitude]}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-full z-0"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  retreat.location.latitude,
                  retreat.location.longitude,
                ]}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>{retreat.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default Retreats;
