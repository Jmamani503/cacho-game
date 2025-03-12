import { useEffect, useState } from "react";
import { useCurrentScoreStore } from "../store/currentScore";
import ScoreBoardCell from "./ScoreBoardCell";
import { Player } from "../models/player";

interface Props {
  player: Player
  isCurrentBoard: boolean
}

const ScoreBoard = ({ player, isCurrentBoard }: Props) => {

  const currentScore = useCurrentScoreStore((state) => state.score)
  const [highlightedCells, setHighlightedCells] = useState([false,false,false,false,false,false,false,false,false])

  useEffect(() => {
    if(isCurrentBoard) highligthCells()
  }, [currentScore])

  const highligthCells = () => {
    const newScore = currentScore.map((play, index) => 
      play.name !== 'Skip' ? 
      play.value !== 0 && player.score[index].value === 0 ?
        highlightedCells[index] = true 
        : 
        highlightedCells[index] = false
      : highlightedCells[index] = true

        )
    setHighlightedCells(newScore)
  }

  return (
    <article className={`bg-[#1b4552] rounded-lg border border-white ${isCurrentBoard ? 'w-80 p-2 md:p-4' : 'w-full p-2'}`}>
      <h3 className={`text-center  font-semibold md:font-black uppercase ${isCurrentBoard ? 'text-xl md:text-3xl pb-2 md:pb-4' : 'text-xs md:text-lg'}`}>{player.name} - {player.totalScore}</h3>
      <div className="grid grid-cols-3 justify-center gap-0.5 bg-white">
      {player.score.map((play, index) => (
        <ScoreBoardCell
          key={index}     
          play={play}
          isHighlighted={highlightedCells[index]} 
          isCurrentBoard={isCurrentBoard}
        />
      ))}
      </div>
    </article>
    
  )
}
export default ScoreBoard