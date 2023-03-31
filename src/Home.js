import React, { useState, useEffect, useContext } from "react";
import Card from "./components/Card";
import { RetreatContext } from "./context/RetreatContext";
import ModalView from "./components/ModalView";

function Home() {
  // Retrieve retreats from the RetreatContext
  const { retreats } = useContext(RetreatContext);
  const [numDisplayedCards, setNumDisplayedCards] = useState(4); // Default to 4 for small screens
  // Update number of cards to display based on screen size
  // Re-run effect when retreats array changes
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setNumDisplayedCards(4);
      } else if (screenWidth >= 640) {
        setNumDisplayedCards(9);
      } else {
        setNumDisplayedCards(retreats.length);
      }
    };
    // Listen for resize events
    window.addEventListener("resize", handleResize);
    // Call the function immediately to set initial state
    handleResize();
    // Clean up by removing the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [retreats]);

  // Show a "Show More" button if there are more retreats than displayed cards
  const showMoreButton = retreats.length > numDisplayedCards && (
    <div className="text-center">
      <button
        className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2 transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        onClick={() => {
          // Increase number of displayed cards by 4, or set to remaining cards if less than 4
          setNumDisplayedCards(numDisplayedCards + 4);
          if (numDisplayedCards + 4 >= retreats.length) {
            setNumDisplayedCards(retreats.length);
          }
        }}
      >
        Show More
      </button>
    </div>
  );

  // Create a list of Card components for each retreat
  const retreatsList = retreats
    ?.slice(0, numDisplayedCards) // Only show the first numDisplayedCards retreats
    .map((retreat) => (
      <Card
        id={retreat.id}
        address={retreat.address}
        name={retreat.name}
        key={retreat.id}
        description={retreat.description}
        location={retreat.location}
        image={retreat.image}
        mobile={retreat.mobile}
      ></Card>
    ));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Line Break */}
        <div className="container mx-auto bg-white py-1 border-t border-gray-400"></div>
        <ModalView
          className="w-full"
          title={"NEW RETREAT"}
          actionType={"add"}
        ></ModalView>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Display retreatsList in a grid, with 1 column on small screens and 3 columns on medium screens */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            {retreatsList}
          </div>
          {showMoreButton}
        </div>
      </div>
    </div>
  );
}

export default Home;
