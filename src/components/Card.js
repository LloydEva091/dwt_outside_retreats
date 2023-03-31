import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DisplayPhoto from "./DisplayPhoto";

const Card = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${props.id}`);
  };

  const content = (
    <div className="">
      <div
        className="w-full h-72 bg-white rounded-2xl mt-2 text-gray-500 border-black shadow-md pb-2 cardStyle"
        onClick={handleClick}
      >
        <DisplayPhoto id={props.id} heightImg={"h-2/3"} />
        <div className="pt-3 flex items-center justify-between">
          <h1 className="px-2 text-xl uppercase w-full font-bold truncate">
            {props.name}
          </h1>
        </div>
        <div className="flex text-sm px-2 my-2">
          <div className="grid grid-rows-1">
            <div className="w-full flex items-center">
              <FontAwesomeIcon icon={faLocationPin} className="py-1 px-2" />
              <span className="px-1 truncate">{props.address}</span>
            </div>
            <div className="w-full flex items-center">
              <FontAwesomeIcon icon={faPhone} className="py-1 px-2" />
              <span className="px-1 truncate">{props.mobile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default Card;
