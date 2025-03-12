import { useCallback } from "react";
import { useGameStore } from "../store/game";
import { TurnStage } from "../models/turn-stage";


export const useSelectDice = () => {

    const { setCurrentRoll , currentRoll, currentStage } = useGameStore(state => state)
  
    const selectDice = useCallback((index: number) => {
        const selectableLimit = currentStage === TurnStage.FLIP_DICE ? 2 : 5
            
              const selectedCount = currentRoll.filter((dice) => dice.selected).length
              const newDice = currentRoll.map((dice, i) => {
                if (i === index) {
                  if (dice.selected) {
                    return { ...dice, selected: false }
                  }
                  else if (selectedCount < selectableLimit) {
                    return { ...dice, selected: true }
                  }
                }
                return dice;
              })
              setCurrentRoll(newDice)
        
      }, [currentRoll, setCurrentRoll, currentStage]);
    
    return { selectDice }
}
