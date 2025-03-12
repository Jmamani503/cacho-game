import { useState } from 'react';
import Dice from './Dice';
import { calculateScore } from '../utils/gameLogic';
import { useCurrentScoreStore } from '../store/currentScore';
import { useSelectedPlayStore } from '../store/selectedPlay';
import { TurnStage } from '../models/turn-stage';

interface Props {
  nextTurn : () => void
  advanceStage: () => void
  currentStage: TurnStage
}


const DiceCup = ({ nextTurn, advanceStage, currentStage } : Props) => {

  const [diceValues, setDiceValues] = useState<number[]>([0, 0, 0, 0, 0]);
  const [selectedDices, setSelectedDices] = useState<boolean[]>([false, false, false, false,false])
  const [isSelectable, setIsSelectable] = useState(false)
  const [toFlip, setToFlip] = useState(false)
  const [toReroll, setToReroll] = useState(false)
  const [toSetPlay, setToSetPlay] = useState(false)
  const setCurrentScore = useCurrentScoreStore((state) => state.setScore)
  const { play, removePlay } = useSelectedPlayStore((state) => state)
  const { removeScore } = useCurrentScoreStore((state) => state)

  const rollDice = () => {
    const newValues = Array(5)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1)
    setDiceValues(newValues)
    advanceStage()
  };

  const toggleDiceSelection = (index: number) => {
    if (currentStage === TurnStage.FLIP_DICE){
      const canSelect = selectedDices.filter((value) => value).length < 2
      if (canSelect) {
        const newSelected = [...selectedDices]
        newSelected[index] = !newSelected[index]
        setSelectedDices(newSelected)
      }else{
        if(selectedDices[index]){
          const newSelected = [...selectedDices]
          newSelected[index] = !newSelected[index]
          setSelectedDices(newSelected)
        }
      }
    } else {
      const newSelected = [...selectedDices]
      newSelected[index] = !newSelected[index]
      setSelectedDices(newSelected)
    }
  };

  const reRollDice = () => {
    if(toReroll){
      const newValues = diceValues.map((value, index) => 
      selectedDices[index] ? Math.floor(Math.random() * 6) + 1 : value
    );
    setSelectedDices([false, false, false, false,false])
    setDiceValues(newValues);
    setIsSelectable(false)
    setToReroll(false)
    advanceStage()
    }else{
      setToReroll(true)
      setIsSelectable(true)
    }
  };

  const flip = () => {
    if(toFlip){
      if (selectedDices.filter((value) => value).length > 0) {
        const newValues = diceValues.map((value, index) => 
          selectedDices[index] ? 7 - value  : value
        );
        setSelectedDices([false, false, false, false,false])
        setDiceValues(newValues);
        setIsSelectable(false)
        setToFlip(false)
        advanceStage()
      }
    }else{
      setToFlip(true)
      setIsSelectable(true)
    }
  }

  const setPlay = () => {
    if (toSetPlay) {
      if(play){
        setToSetPlay(false)
        removeScore()
        removePlay()
        advanceStage()
        nextTurn()
      }
    } else {
      const newScore = calculateScore(diceValues)
      setCurrentScore(newScore)
      setToSetPlay(true)
    }
  }

  return (
    <div className='flex flex-col gap-16'>
      {/* <div>
        <button>Leave</button>
      </div> */}
      <div className='flex flex-col gap-6'>
        <div className='flex gap-4'>
          {diceValues.map((value, index) => (
            <Dice 
              key={index} 
              value={value} 
              isSelected={selectedDices[index]}
              isSelectable={isSelectable}
              select={() => toggleDiceSelection(index)}
               />
          ))}
        </div>
      </div>
      <div className='flex gap-2'>
        <button 
          onClick={rollDice} 
          disabled={currentStage!==TurnStage.ROLL_DICE}
          className={`${currentStage===TurnStage.ROLL_DICE ? 'border border-orange-500':''}`}
          >Roll
        </button>
        <button 
          onClick={reRollDice}
          disabled={currentStage!==TurnStage.REROLL_DICE}
          className={`${currentStage===TurnStage.REROLL_DICE ? 'border border-orange-500':''}`}
          >{toReroll ? 'Confirm' : 'Reroll'}
        </button>
        <button 
          onClick={flip}
          disabled={currentStage!==TurnStage.FLIP_DICE}
          className={`${currentStage===TurnStage.FLIP_DICE ? 'border border-orange-500':''}`}
          >{toFlip ? 'Confirm' : 'Flip'}
        </button>
        <button 
          onClick={setPlay}
          disabled={currentStage!==TurnStage.SET_PLAY}
          className={`${currentStage===TurnStage.SET_PLAY ? 'border border-orange-500':''}`}
          >{toSetPlay ? 'Confirm' : 'Set Play'}
        </button>
      </div>  
    </div>
  );
};

export default DiceCup;
