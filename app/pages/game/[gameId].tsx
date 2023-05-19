import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase-client";
import { doc, onSnapshot } from "firebase/firestore";
import Confetti from "../../components/Confetti";

const Game = () => {
  const router = useRouter();
  const { gameId } = router.query;

  const [gameData, setGameData] = useState(null);
  const [playConfetti, setPlayConfetti] = useState(false);

  const handleConfettiClick = () => {
    setPlayConfetti(true);
    setTimeout(() => setPlayConfetti(false), 3000); // Stop confetti after 3 seconds
    console.log("Confetti!");
  };

  useEffect(() => {
    if (typeof gameId !== "string") return;

    const gameRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setGameData((prev) => {
          const newData = docSnapshot.data();
          if (
            prev?.points_0 < newData?.points_0 ||
            prev?.points_1 < newData?.points_1
          ) {
            handleConfettiClick();
          }
          return docSnapshot.data();
        });
      } else {
        setGameData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [gameId]);

  if (gameData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Game ID: {gameId}</h1>
      <div>User 0 Points: {gameData.points_0}</div>
      <div>User 1 Points: {gameData.points_1}</div>
      {playConfetti && <Confetti />}
    </div>
  );
};

export default Game;
