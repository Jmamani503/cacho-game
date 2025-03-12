import { useCallback } from "react";
import { useGameStore } from "../store/game";
import { TurnStage } from "../models/turn-stage";

export const useAdvanceStage = () => {

     const { currentStage, setCurrentStage} = useGameStore(state => state)
      
        const advanceStage = useCallback(() => {
            
            const nextStage = () => {
                switch (currentStage) {
                    case TurnStage.ROLL_DICE:
                        return TurnStage.REROLL_DICE;
                        case TurnStage.REROLL_DICE:
                            return TurnStage.FLIP_DICE;
                            case TurnStage.FLIP_DICE:
                                return TurnStage.SET_PLAY;
                                case TurnStage.SET_PLAY:
                                    return TurnStage.ROLL_DICE;
                                    default:
                                        return TurnStage.ROLL_DICE;
            }
            }
            setCurrentStage(nextStage());

            // advanceStage();
          }, [currentStage ]);
    return { advanceStage }
}