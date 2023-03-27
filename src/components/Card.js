import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { GetPhotoSrc } from "../db";

const Card = (props) => {
  const navigate = useNavigate();

  function DisplayPhoto({ id }) {
    // console.log(id);
    const imgSrc = GetPhotoSrc(id);
    return (
      <img
        src={imgSrc}
        alt={`Photo ${id}`}
        className="rounded-t-2xl transform-translate-y-5   w-full h-2/3"
      />
    );
  }

  const handleClick = () => {
    navigate(`/${props.id}`);
  };

  const content = (
    <div className="">
      <div
        className="w-full h-72 bg-white rounded-2xl m-2 text-gray-500 border-black shadow-md pb-2"
        onClick={handleClick}
      >
        <DisplayPhoto id={props.id} />
        <div className="pt-3 flex items-center justify-between">
          <h1 className="px-2 text-xl uppercase w-full font-bold">
            {props.name}
          </h1>

          {/* <svg
            className="h-6 w-6 fill-current text-gray-500 hover:text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
          </svg> */}
        </div>
        <div className="flex text-sm px-2 my-2">
          <div className="grid grid-rows-1">
            <div>
              <FontAwesomeIcon icon={faLocationPin} className="py-1 px-2" />
              <span className="px-1">{props.address}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} className="py-1 px-2" />
              <span className="px-1">{props.mobile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default Card;
