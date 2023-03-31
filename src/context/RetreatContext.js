import React, { createContext, useState, useEffect } from "react";
import { addPhoto, updatePhoto, removePhoto } from "../db";

// Create a new context object for the RetreatProvider
const RetreatContext = createContext();

// Create a new component called RetreatProvider, which wraps its children with the RetreatContext.Provider
const RetreatProvider = ({ children }) => {
  // Declare a state variable called retreats, which is initialized with an empty array or the data from localStorage
  const [retreats, setRetreats] = useState(
    JSON.parse(localStorage.getItem("retreats")) || []
  );

  // Use the useEffect hook to update the localStorage whenever the retreats state changes
  useEffect(() => {
    localStorage.setItem("retreats", JSON.stringify([...retreats]));
  }, [retreats]);


  const addRetreat = (obj) => {
    console.log(obj.image);
    const newRetreats = {
      id: obj.id,
      name: obj.name,
      address: obj.address,
      mobile: obj.mobile,
      description: obj.description,
      location: { latitude: obj.location.lat, longitude: obj.location.lng },
      image: obj.image,
    };

    addPhoto(obj.id, obj.image);
    setRetreats([...retreats, newRetreats]);
  };


  const updateRetreat = (obj) => {
    // console.log("update ITEM", obj);
    const updatedRetreat = {
      id: obj.id,
      name: obj.name,
      address: obj.address,
      mobile: obj.mobile,
      description: obj.description,
      location: { latitude: obj.location.lat, longitude: obj.location.lng },
      image: obj.image,
    };

    // console.log("image to update", obj.image);
    updatePhoto(obj.id, obj.image);
    setRetreats((prevRetreats) =>
      prevRetreats.map((retreat) => {
        if (retreat.id === obj.id) {
          return updatedRetreat;
        } else {
          return retreat;
        }
      })
    );
    // props.setIsEdited(true)
    // console.log("should be updated", retreats);
  };

  const removeRetreat = (id) => {
    console.log("to delete ID", id);
    removePhoto(id);
    setRetreats((prevRetreats) =>
      prevRetreats.filter((item) => item.id !== id)
    );
    // props.setIsEdited(true)
    // console.log("new retreat list", retreats);
  };

  // Render the RetreatContext.Provider with the value of retreats and setRetreats as its value prop, and pass the children prop to it
  return (
    <RetreatContext.Provider value={{ retreats, setRetreats, addRetreat, removeRetreat, updateRetreat }}>
      {children}
    </RetreatContext.Provider>
  );
};

export { RetreatContext, RetreatProvider };
