import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { addPhoto, updatePhoto, getPhoto } from "../db.js";

const WebcamCapture = (props) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [photoSaved, setPhotoSaved] = useState(false);

  useEffect(() => {
    if (photoSaved) {
      console.log("useEffect detected photoSaved");
      props.setImage(props.id, imgSrc); // call the setImage prop with the captured image
      props?.closeModal();
    }
  }, [photoSaved]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log("capture", imageSrc.length, props.id);
  }, [webcamRef, setImgSrc, props.id]);

  const savePhoto = () => {
    console.log("savePhoto", imgSrc.length, props.id);
    const photoBlob = dataURItoBlob(imgSrc);
    // Check if the photo already exists in the database
    getPhoto(props.id).then((existingPhoto) => {
      if (existingPhoto) {
        // If the photo already exists, update it
        updatePhoto(props.id, photoBlob).then(() => {
          setPhotoSaved(true);
        });
      } else {
        // If the photo does not exist, add a new record
        addPhoto(props.id, photoBlob).then(() => {
          setPhotoSaved(true);
        });
      }
    });
  };

  const cancelPhoto = () => {
    console.log("cancelPhoto", imgSrc.length, props.id);
    setImgSrc(null);
  };

  return (
    <>
      {!imgSrc && (
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      )}
      {imgSrc && <img src={imgSrc} alt={props.name} />}
      <div className="btn-group">
        {!imgSrc && (
          <button
            type="button"
            className="mt-2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-2 border border-blue-700 rounded w-full items-center"
            onClick={capture}
          >
            Capture Photo
          </button>
        )}
        {imgSrc && (
          <button
            type="button"
            className="mt-2 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-2 border border-green-700 rounded w-full items-center"
            onClick={savePhoto}
          >
            Save Photo
          </button>
        )}
        {imgSrc && (
          <button
            type="button"
            className="mt-2 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-2 border border-orange-700 rounded w-full"
            onClick={cancelPhoto}
          >
            Cancel
          </button>
        )}
      </div>
    </>
  );
};

export default WebcamCapture;

function dataURItoBlob(dataURI) {
  // Split the data URI into the data and metadata portions.
  const splitDataURI = dataURI.split(",");
  // Determine the byte string for the data portion.
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  // Determine the MIME type for the data portion.
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  // Create a new unsigned 8-bit integer array with a length equal to the length of the byte string.
  const ia = new Uint8Array(byteString.length);
  // For each character in the byte string, set the corresponding element in the unsigned 8-bit integer array.
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  // Create a new Blob object with the unsigned 8-bit integer array and the MIME type.
  return new Blob([ia], { type: mimeString });
}
