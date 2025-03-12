import { useCallback } from "react";
import { useGameStore } from "../store/game";
import { useAdvanceStage } from "./useAdvanceStage";


export const useRollDice = () => {

    const { setCurrentRoll , currentRoll} = useGameStore(state => state)
    const { advanceStage } = useAdvanceStage()

    const rollDices = useCallback(() => {
        const newDices = currentRoll.map((dice) => ({
          ...dice,
          value: Math.floor(Math.random() * 6) + 1,
        }));
        setCurrentRoll(newDices);
        advanceStage()
      }, [advanceStage, currentRoll, setCurrentRoll]);
    
    return { rollDices }
}
