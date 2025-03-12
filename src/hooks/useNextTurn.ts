import { useCallback } from "react"
import { useGameStore } from "../store/game"

export const useNextTurn = () => {

    const { players, currentPlayer, setCurrentPlayer, currentRound, setCurrentRound, resetCurrentRoll, setHasReroll, setHasFinished} = useGameStore((state) => state)
    

    const nextTurn = useCallback(() => {
        if (currentPlayer < players.length - 1) {
            setCurrentPlayer(currentPlayer + 1)
        } else if(currentRound < 11){
            setCurrentPlayer(0)
              setCurrentRound(currentRound + 1)
            } else {
              setHasFinished(true)
            }
        resetCurrentRoll()
        setHasReroll(false)
    }, [currentPlayer, players.length, resetCurrentRoll, setHasReroll, setCurrentPlayer, currentRound, setCurrentRound, setHasFinished])

    return { nextTurn }
}