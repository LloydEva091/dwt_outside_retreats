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

  // Define a function called addRetreat that takes an object parameter
  const addRetreat = (obj) => {
    // Create a newRetreats object with properties from the obj parameter
    const newRetreats = {
      id: obj.id,
      name: obj.name,
      address: obj.address,
      mobile: obj.mobile,
      description: obj.description,
      location: { latitude: obj.location.lat, longitude: obj.location.lng },
      image: obj.image,
    };

    // Call the addPhoto function with the id and image properties of the obj parameter
    addPhoto(obj.id, obj.image);
    // Set the retreats state to a new array that includes the previous retreats plus the newRetreats object
    setRetreats([...retreats, newRetreats]);
  };

  // Define a function called updateRetreat that takes an object parameter
  const updateRetreat = (obj) => {
    // Create an updatedRetreat object with properties from the obj parameter
    const updatedRetreat = {
      id: obj.id,
      name: obj.name,
      address: obj.address,
      mobile: obj.mobile,
      description: obj.description,
      location: { latitude: obj.location.lat, longitude: obj.location.lng },
      image: obj.image,
    };

    // Call the updatePhoto function with the id and image properties of the obj parameter
    updatePhoto(obj.id, obj.image);
    // Set the retreats state to a new array that maps the previous retreats and replaces the retreat with matching id with the updatedRetreat object
    setRetreats((prevRetreats) =>
      prevRetreats.map((retreat) => {
        if (retreat.id === obj.id) {
          return updatedRetreat;
        } else {
          return retreat;
        }
      })
    );
  };

  // Define a function called removeRetreat that takes an id parameter
  const removeRetreat = (id) => {
    console.log("to delete ID", id);
    // Call the removePhoto function with the id parameter
    removePhoto(id);
    // Set the retreats state to a new array that filters out the retreat with matching id
    setRetreats((prevRetreats) =>
      prevRetreats.filter((item) => item.id !== id)
    );
  };

  // Render the RetreatContext.Provider with the value of retreats and setRetreats as its value prop, and pass the children prop to it
  return (
    <RetreatContext.Provider value={{ retreats, setRetreats, addRetreat, removeRetreat, updateRetreat }}>
      {children}
    </RetreatContext.Provider>
  );
};

export { RetreatContext, RetreatProvider };
