import React, { createContext, useState, useEffect } from "react";

const RetreatContext = createContext();

const RetreatProvider = ({ children }) => {
  const [retreats, setRetreats] = useState(
    JSON.parse(localStorage.getItem("retreats")) || []
  );

  // Change local storage retreats when the state retreat is modify
  useEffect(() => {
    localStorage.setItem("retreats", JSON.stringify([...retreats]));
  }, [retreats]);

  return (
    <RetreatContext.Provider value={{ retreats, setRetreats }}>
      {children}
    </RetreatContext.Provider>
  );
};

export { RetreatContext, RetreatProvider };
