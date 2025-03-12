import { useEffect, useState } from "react";
import { Play } from "../models/play";
import { useSelectedPlayStore } from "../store/selectedPlay";

interface Props {
  play: Play;
  isHighlighted: boolean;
  isCurrentBoard: boolean;
}
const ScoreBoardCell = ({ play, isHighlighted, isCurrentBoard }: Props) => {
  const {
    removePlay,
    setPlay,
    play: selectedPlay,
  } = useSelectedPlayStore((state) => state);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(play === selectedPlay ? true : false);
  }, [selectedPlay])

  const handleClick = () => {
    if (isHighlighted) {
      if (isSelected) {
        setIsSelected(false)
        removePlay()
      } else {
        setIsSelected(true);
        setPlay(play)
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-1  ${isHighlighted ? 
        (isSelected ? "bg-[#188b6f] cursor-pointer" : "bg-[#233e5f] cursor-pointer") : 'bg-[#183e4b]'}`}
    >
      <h3 className="text-[#c0bbbb] font-bold text-center text-xs md:text-base">{isCurrentBoard ? play.name : ''}</h3>
      <div 
        className={`font-normal md:font-black text-center ${isCurrentBoard ? 'text-sm md:text-xl' : 'text-xs md:text-sm'} ${play.value ? 'text-[#34ff67]' : 'text-[#fff]' }`}
        >{play.bonus ? play.value + play.bonus : play.value}
      </div>
    </div>
  );
};
export default ScoreBoardCell
