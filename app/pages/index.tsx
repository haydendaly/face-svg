import { useState } from "react";
import { useRouter } from "next/router";

const EnterGame = () => {
  const router = useRouter();
  const [gameCode, setGameCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameCode.length === 4 && /^\d+$/.test(gameCode)) {
      router.push(`/game/${gameCode}`);
    } else {
      alert("Please enter a valid 4-digit game code.");
    }
  };

  return (
    <div>
      <h1>Enter Game</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="gameCode">Game Code:</label>
        <input
          id="gameCode"
          type="text"
          maxLength={4}
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
        />
        <button type="submit">Go to Game</button>
      </form>
    </div>
  );
};

export default EnterGame;
