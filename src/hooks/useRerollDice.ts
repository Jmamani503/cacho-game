import { useCallback } from "react";
import { useGameStore } from "../store/game";
import { useAdvanceStage } from "./useAdvanceStage";


export const useRerollDice = () => {

  const { setCurrentRoll , currentRoll, setHasReroll} = useGameStore(state => state)
  const { advanceStage } = useAdvanceStage()
  
    const rerollDices = useCallback(() => {
      const selectedCount = currentRoll.filter((dice) => dice.selected).length 
      if(selectedCount > 0) setHasReroll(true)
      const newDices =  currentRoll.map((dice) => 
        dice.selected 
          ? { 
              value: Math.floor(Math.random() * 6 ) + 1 , 
              selected: false 
            } 
          : dice
      )
      setCurrentRoll(newDices);
      advanceStage();
    }, [advanceStage, currentRoll, setCurrentRoll, setHasReroll]);
    
    return { rerollDices }
}
