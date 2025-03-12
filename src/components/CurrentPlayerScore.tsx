import { useState } from "react"
import { Player } from "../models/player"
import { TurnStage } from "../models/turn-stage"
import { useGameStore } from "../store/game"
import { useSelectedPlayStore } from "../store/selectedPlay"
import ScoreBoard from "./ScoreBoard"

interface Props {
    player: Player
    currentStage: TurnStage
    advanceStage: () => void
    nextTurn: () => void
  }
  
const CurrentPlayerScore = ({ player, advanceStage, nextTurn }: Props) => {
    
    const { updatePlayerScore } = useGameStore((state) => state)
    const { play } = useSelectedPlayStore((state) => state)
    
    const setPlay = () => {
        if (play) {
            updatePlayerScore(player.name, play.name, play.value)
            advanceStage()
            nextTurn()
        }
    }

  return (
    <div>
        <h3>{player.name}'s Turn</h3>
        <div>
            <ScoreBoard 
                isCurrentBoard = { true }
                player={player}
            />
            <button onClick={setPlay}>Set Play</button>
        </div>
    </div>
  )
}
export default CurrentPlayerScore