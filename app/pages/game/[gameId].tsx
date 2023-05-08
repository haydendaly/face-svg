import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase-client";
import { doc, onSnapshot } from "firebase/firestore";

const Game = () => {
  const router = useRouter();
  const { gameId } = router.query;

  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    if (typeof gameId !== "string") return;

    const gameRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setGameData(docSnapshot.data());
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
    </div>
  );
};

export default Game;
