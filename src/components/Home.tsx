import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";
import { useModalContext } from "./modal/context/ModalContext";
import { GameRules } from "./GameRules";
import { Dice } from "../models/dice";

const Home = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const {startGame, setCurrentRoll} = useGameStore((state) => state);
  const { openModal } = useModalContext()
  const [message, setMessage] = useState('')

  const addPlayer = () => {
    if (name) {
      if(!players.includes(name)){
        if(players.length < 4){
          setPlayers([...players, name]);
          setName("");
          setMessage("");
        }else{
          setMessage("Max 4 players allowed.")
        }
      }else{
        setMessage('Players names must be unique.')
      }
    }
  };

  const removePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => index !== i);
    setPlayers(updatedPlayers);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const createGame = () => {
    if(players.length > 1){
        const initialDice: Dice[] = Array.from({ length: 5 }, () => ({ value: 0, selected: false }));
        setCurrentRoll(initialDice)
        startGame(players);
      navigate("/game");
    } else {
      setMessage("Must be at least 2 players")
    }
  };

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-[#2D2D2D]">
      <section className="bg-[#183e4b] p-8 rounded-lg flex flex-col gap-4 border border-white">
        <h3 className="text-6xl  font-black text-[#fff]">CACHO</h3>
        <div className="flex flex-col gap-2">
          <h3 className="text-[#fff] font-light">Players :</h3>
          <ul className="flex flex-col gap-1 items-center">
            {players.map((value, index) => (
              <li key={value} className="flex gap-2">
                <span>{value}</span>
                <button 
                    className="bg-[#AA5048] rounded-md px-2 font-black" 
                    onClick={() => removePlayer(index)}
                    >-
                </button>
              </li>
            ))}
          </ul>
          <div className="w-full h-8 flex items-center">
            <input
                placeholder="Add a player..."
                className="bg-[#fff] text-[#313a4b] h-full rounded-l-md flex-1 pl-2" 
                type="text" 
                value={name} onChange={onChangeName} />
            <button
                className="bg-[#414C5C] px-2 h-full rounded-r-md font-black" 
                onClick={addPlayer}
                >+
            </button>
          </div>
        </div>
        {message ? <span className="text-xs text-red-400">{message}</span>: ''}
        <div className="flex flex-col gap-2">
          <button
            className="bg-[#414C5C] text-[#fff] px-3 py-2 font-bold rounded-md  border-white "
            onClick={() => openModal(<GameRules />, true)}
          >
            Rules
          </button>
          <button
            className="bg-[#1b4552] text-[#fff] px-3 py-2 font-bold rounded-md border border-[#eaeaea] "
            onClick={createGame}
          >
            Start
          </button>
        </div>
      </section>
    </main>
  );
};
export default Home;
