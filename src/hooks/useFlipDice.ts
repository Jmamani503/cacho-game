import { useCallback } from "react";
import { useGameStore } from "../store/game";
import { calculateScore } from "../utils/gameLogic";
import { useAdvanceStage } from "./useAdvanceStage";
import { useCurrentScoreStore } from "../store/currentScore";


export const useFlipDice = () => {
    const {  setScore } = useCurrentScoreStore((state) => state)

    const { setCurrentRoll , currentRoll, hasReroll } = useGameStore(state => state)
    const { advanceStage } = useAdvanceStage()
    const flipDice = useCallback(() => {
        const selectedCount = currentRoll.filter((dice) => dice.selected).length;
        if (selectedCount > 0) {
        const updatedDices = currentRoll.map((dice) =>
            dice.selected
            ? { value: 7 - dice.value, selected: false }
            : dice
        );
        setCurrentRoll(updatedDices);
         const dicesValues = updatedDices.map((dice) => dice.value);
              const newScore = calculateScore({dicesValues , hasReroll: hasReroll});
              setScore(newScore);
              advanceStage();
        }
      }, [advanceStage, currentRoll, hasReroll, setCurrentRoll, setScore]);
    
    return { flipDice }
}
