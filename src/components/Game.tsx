import { useEffect, useState } from "react"
import { useGameStore } from "../store/game"
import ScoreBoard from "./ScoreBoard"
import { TurnStage } from "../models/turn-stage"
import { useModalContext } from "./modal/context/ModalContext"
import { Player } from "../models/player"
import { GameResults } from "./GameResults"
import { useNavigate } from "react-router-dom"
import { PlayersScore } from "./PlayersScore"
import DiceComponent from "./Dice"
import { useSelectDice } from "../hooks/useSelectDice"
import { GameMaganer } from "./GameMaganer"
import { GameOptions } from "./GameOptions"

const Game = () => {

    const {players, restartGame, currentPlayer, setCurrentPlayer, currentRoll,currentStage, setCurrentStage,  setCurrentRound, hasFinished, resetCurrentRoll, setHasFinished} = useGameStore((state) => state)
    const { selectDice } = useSelectDice()
    const { openModal, closeModal } = useModalContext()
    const [winners, setWinners] = useState<Player[]>([])
    const navigate = useNavigate();

  useEffect(() => {
    const getWinner = () => {
      const maxScore = players.reduce((max, jugador) => Math.max(max, jugador.totalScore), 0);
      return players.filter(player => player.totalScore === maxScore);
    } 
    if(hasFinished){
      const win = getWinner() 
      setWinners(win)
    } 
  }, [hasFinished, players])
  
  useEffect(() => {
    const showWinner = () => {
      openModal(
        <GameResults 
          winners={winners}
          onClose={closeModal}
          goToMenu={goToMenu}
          reset={resetGame}
        />
      , false)
    }
    if (winners.length > 0) {
      showWinner()
    }
  }, [winners])

    const goToMenu = () => {
      resetGame()
      navigate('/home')
    }

    const resetGame = () => {
      restartGame()
      resetCurrentRoll()
      setCurrentPlayer(0)
      setCurrentStage(TurnStage.ROLL_DICE)
      setCurrentRound(10)
      setWinners([])
      setHasFinished(false)
    }
  
  return (
    <main className="w-full h-screen flex flex-col bg-[#4A4947] p-2 md:p-8 justify-center items-center">
      {/* <h3 className="text-center text-6xl text-[#fff] font-black mb-20">CACHO</h3> */}
      <div className="flex flex-col w-full max-w-screen-lg md:flex-row gap-3">
        <PlayersScore />
        <section className="flex-1 flex flex-col justify-center items-center md:gap-4 gap-2">
            <ScoreBoard 
                player={players[currentPlayer]} 
                isCurrentBoard={true} 
            />
            <div className="flex gap-2">
                {currentRoll?.map((dice, index) => 
                  <DiceComponent
                    key={index}
                    value={dice.value}
                    select={() => selectDice(index)}
                    isSelected={dice.selected}
                    isSelectable={ currentStage === TurnStage.REROLL_DICE || currentStage === TurnStage.FLIP_DICE}
                    />
                )}
            </div>
            <GameMaganer />
        </section>
        <GameOptions goToMenu={goToMenu} resetGame={resetGame}/>
      </div>
    </main>
  )
}
export default Game