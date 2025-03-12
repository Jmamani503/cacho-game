import { useCallback } from "react"
import { useSelectedPlayStore } from "../store/selectedPlay"
import { useCurrentScoreStore } from "../store/currentScore"
import { useGameStore } from "../store/game"
import { useAdvanceStage } from "./useAdvanceStage"
import { useNextTurn } from "./useNextTurn"

export const useSetPlay = () => {   
    const { play, removePlay } = useSelectedPlayStore((state) => state)
    const { score, removeScore } = useCurrentScoreStore((state) => state)
    const {updatePlayerScore, players, currentPlayer} = useGameStore((state) => state)
    const { advanceStage } = useAdvanceStage()
    const { nextTurn } = useNextTurn()
    
    const setPlay = useCallback(() => {
      if(play) {
        const newPlay = score.find((item) => item.name === play.name)
        if(newPlay){
          updatePlayerScore(players[currentPlayer].name, newPlay.name, newPlay.value, newPlay.bonus)
          removePlay()
          removeScore()
          advanceStage()
          nextTurn()
            //   setFirstRoll(true)
        }
      }
    }, [advanceStage, currentPlayer, play, players, removePlay, removeScore, score, updatePlayerScore])

    return { setPlay }

}