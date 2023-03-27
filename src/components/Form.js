import React, { useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import { nanoid } from "nanoid";

function Form(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("");
  const [locateManual, setLocateManual] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [id, setId] = useState(`retreat-${nanoid()}`);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setAddress("");
      setMobile("");
      setDescription("");
      setLat("");
      setLng("");
      props.closeModal();
    }
  }, [isSuccess]);

  const handleNameChanged = (e) => {
    setName(e.target.value);
  };
  const handleAddressChanged = (e) => {
    setAddress(e.target.value);
  };
  const handleMobileChanged = (e) => {
    setMobile(e.target.value);
  };
  const handleDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const handleLatChanged = (e) => {
    setLat(e.target.value);
  };
  const handleLngChanged = (e) => {
    setLng(e.target.value);
  };

  const handleManualClick = () => {
    setLocateManual(true);
  };

  const handleAutomaticClick = () => {
    setLocateManual(false);
    geoFindMe();
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const geoFindMe = () => {
    // console.log("geoFindMe",lastItem);
    function success(position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      // const mapLink =  `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      // console.log(mapLink)
      // console.log(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
      // locateRetreat(lastItem,{latitude:latitude, longitude:longitude,});
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating...");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const canSave = [name, address, mobile, description, lat, lng, image].every(
    Boolean
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!name.trim()) {
    //   return;
    // }
    if (canSave) {
      const newItem = {
        id,
        name,
        address,
        mobile,
        description,
        location: {
          lat,
          lng,
        },
        image,
      };
      props.addRetreat(newItem);
      setIsSuccess(true);
    }
  };

  const getLocationTemplate = (
    <>
      <div>
        <label htmlFor="retreat-latitude" className="text-white">
          Latitude
        </label>
        <input
          type="text"
          id="retreat-latitude"
          className="m-2 w-full rounded-xl py-2 px-2 text-black"
          name="text"
          autoComplete="off"
          value={lat}
          placeholder="Enter latitude"
          onChange={handleLatChanged}
        />
        <label htmlFor="retreat-longitude" className="text-white">
          Longitude
        </label>
        <input
          type="text"
          id="retreat-longitude"
          className="m-2 w-full rounded-xl py-2 px-2 text-black"
          name="text"
          autoComplete="off"
          value={lng}
          placeholder="Enter longitude"
          onChange={handleLngChanged}
        />
      </div>
    </>
  );

  const locationDisplayTemplate = (
    <>
      <div className="grid ">
        <label htmlFor="retreat-latitude2" className="text-white">
          Latitude
        </label>
        <span
          type="text"
          id="retreat-latitude2"
          className="m-2 w-full rounded-xl py-2 px-2 text-black bg-white"
          value={lat}
        >
          {lat}
        </span>

        <label htmlFor="retreat-longitude2" className="text-white">
          Longitude
        </label>
        <span
          type="text"
          id="retreat-longitude2"
          className="m-2 w-full rounded-xl py-2 px-2 text-black bg-white"
          value={lng}
        >
          {lng}
        </span>
      </div>
    </>
  );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="retreat-name" className="text-white">
        Name
      </label>
      <input
        type="text"
        id="retreat-name"
        className="m-2 w-full rounded-xl py-2 px-2 text-black"
        name="text"
        autoComplete="off"
        value={name}
        placeholder="Enter a Name"
        onChange={handleNameChanged}
      />
      <label htmlFor="retreat-address" className="text-white">
        Address
      </label>
      <input
        type="text"
        id="retreat-address"
        className="m-2 w-full rounded-xl py-2 px-2 text-black"
        name="text"
        autoComplete="off"
        value={address}
        placeholder="Enter an Address"
        onChange={handleAddressChanged}
      />
      <label htmlFor="retreat-mobile" className="text-white">
        Mobile
      </label>
      <input
        type="number"
        id="retreat-mobile"
        className="m-2 w-full rounded-xl py-2 px-2 text-black"
        name="mobile"
        autoComplete="off"
        value={mobile}
        placeholder="Enter Mobile #"
        onChange={handleMobileChanged}
      />
      <label htmlFor="retreat-description" className="text-white">
        Description
      </label>
      <textarea
        id="retreat-description"
        label="retreat-description"
        type="text"
        placeholder="Enter descriptions"
        name="description"
        value={description}
        onChange={handleDescriptionChanged}
        className={` text-black border border-black w-full rounded-xl py-2 px-2 m-2`}
        autoComplete="off"
      />

      <label htmlFor="retreat-location" className="text-white">
        Get Location
      </label>

      <div className="flex justify-left m-2 py-2">
        <input
          type="radio"
          id="retreat-manual"
          name="retreat-location"
          value="retreat-manual"
          className="m-2"
          checked={locateManual}
          onChange={handleManualClick}
        />
        <label htmlFor="retreat-manual">Manual</label>
        <input
          type="radio"
          id="retreat-automatic"
          name="retreat-location"
          value="retreat-automatic"
          className="m-2"
          checked={!locateManual}
          onChange={handleAutomaticClick}
        />
        <label htmlFor="retreat-automatic">Automatic</label>
      </div>

      {locateManual ? getLocationTemplate : locationDisplayTemplate}
      <div className="grid gap-2 sm:grid-cols-2 w-full ">
        <ImageModal setImage={setImage} image={image} id={id}>
          Take Photo
        </ImageModal>

        <label
          htmlFor="retreat-upload"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700 rounded w-full m-2 text-center"
        >
          Upload Photo
        </label>
        <input
          id="retreat-upload"
          name="upload"
          type="file"
          onChange={handleImageUpload}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded w-full m-2"
      >
        Add
      </button>
    </form>
  );
}

export default Form;
