interface Props {
  value: number
  isSelected: boolean
  select: () => void
  isSelectable: boolean
}

const DiceComponent = ({ value, isSelected, select, isSelectable }: Props) => {

  const handleClick = () => {
    if(isSelectable) select()
  }

  return (
    <button 
      className={`w-10 h-10 md:w-14 md:h-14 bg-white rounded-lg font-bold text-lg flex justify-center items-center text-black ${isSelected ? 'shadow-lg shadow-red-500 bg-slate-800' : ''}`} 
      onClick={handleClick}
      >
      <div className=''>{value || '?'}</div>
    </button>
  );
};

export default DiceComponent;
