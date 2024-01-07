import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import Gameplay from "./components/Gameplay";

function App() {
  const [gameRunning, setGameRunning] = useState(false);
  const [region, setRegion] = useState("None");

  useEffect(() => {
    console.log(gameRunning, region);
  }, [region]);

  function activateGame(e: any) {
    setRegion(e.target.value);
    setGameRunning(true);
  }

  return (
    <>
      {gameRunning ? (
        <Gameplay region={region} />
      ) : (
        <Menu onClick={(e: any) => activateGame(e)} />
      )}
    </>
  );
}

export default App;
