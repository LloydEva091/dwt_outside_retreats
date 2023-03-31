import React from "react";
import { GetPhotoSrc } from "../db";

function DisplayPhoto({ id, heightImg }) {
  const imgSrc = GetPhotoSrc(id);
  return (
    <img
      src={imgSrc}
      alt={`Depicts ${id}`}
      className={`rounded-t-2xl transform-translate-y-5  w-full ${heightImg} `}
    />
  );
}

export default DisplayPhoto;
