import { useFlipDice, useRerollDice, useRollDice, useSetPlay } from "../hooks"
import { TurnStage } from "../models/turn-stage"
import { useGameStore } from "../store/game"

export const GameMaganer = () => {

    const { currentStage } = useGameStore(state => state)

    const { rollDices } = useRollDice()
    const { rerollDices } = useRerollDice()
    const { flipDice } = useFlipDice()
    const { setPlay } = useSetPlay()

    return (
        <div className="bg-[#1b4552] flex gap-2 p-2 md:p-4 rounded-lg border border-white">
            <button
                onClick={rollDices}
                disabled={currentStage !== TurnStage.ROLL_DICE}
                className={`px-3 py-2 rounded-md font-bold text-sm md:text-base ${currentStage === TurnStage.ROLL_DICE ? 'bg-[#ff5c01] text-[#fff]' : 'bg-[#ef974d]'}`}
                >Roll
            </button>
            <button
                onClick={rerollDices}
                disabled={currentStage !== TurnStage.REROLL_DICE}
                className={`px-3 py-2 rounded-md font-bold text-sm md:text-base ${currentStage === TurnStage.REROLL_DICE ? 'bg-[#ff5c01] text-[#fff]' : 'bg-[#ef974d]'}`}
            >
                Reroll
            </button>
            <button
                onClick={flipDice}
                disabled={currentStage !== TurnStage.FLIP_DICE}
                className={`px-3 py-2 rounded-md font-bold text-sm md:text-base  ${currentStage === TurnStage.FLIP_DICE ? 'bg-[#ff5c01] text-[#fff]' : 'bg-[#ef974d]'}`}
            >
                Flip
            </button>
            <button
                onClick={setPlay}
                disabled={currentStage !== TurnStage.SET_PLAY}
                className={`px-3 py-2 rounded-md font-bold text-sm md:text-base ${currentStage === TurnStage.SET_PLAY ? 'bg-[#ff5c01] text-[#fff]' : 'bg-[#ef974d]'}`}
            >
                Set Play
            </button>
        </div>
    )
}
