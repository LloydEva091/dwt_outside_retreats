import React, { useState, useEffect, useContext } from "react";
import NewModal from "./components/NewModal";
import Card from "./components/Card";
import { RetreatContext } from "./context/RetreatContext";

function Home(props) {
  const { retreats, setRetreats } = useContext(RetreatContext);
  // State to track number of cards to display
  const [numCards, setNumCards] = useState(4); // Default to 4 for small screens
  const [numDisplayedCards, setNumDisplayedCards] = useState(numCards);

  console.log("all retreats",retreats)
  // Update number of cards to display based on screen size
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newNumCards;
      if (screenWidth < 640) {
        newNumCards = 4;
        setNumDisplayedCards(4);
      } else if (screenWidth >= 640) {
        newNumCards = 9;
        setNumDisplayedCards(9);
      } else {
        newNumCards = retreats.length;
        setNumDisplayedCards(retreats.length);
      }
      // // if more cards are currently displayed than the new screen size allows,
      // // reduce the number of displayed cards to match the new screen size
      // if (newNumCards < numCards) {
      //   setNumCards(newNumCards);
      // }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [retreats]);

  const showMoreButton = retreats.length > numDisplayedCards && (
    <div className="text-center">
      <button
        className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        onClick={() => {
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

  const retreatsList = retreats
    ?.slice(0, numDisplayedCards)
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
      <div className="container mx-auto bg-white py-1 border-t border-gray-400"></div>
      <NewModal
        className="w-full"
        title={"New Retreat"}
        setNewItem={setRetreats}
        item={retreats}
      ></NewModal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-2">
          {retreatsList}
        </div>
        {showMoreButton}
      </div>
    </div>
  );
}

export default Home;
