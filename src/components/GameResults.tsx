import { Player } from "../models/player"

interface Props {
    winners : Player[]
    onClose: () => void  
    goToMenu: () => void
    reset: () => void
}

export const GameResults = ({ winners, onClose, goToMenu, reset }: Props) => {

    if(!winners || winners.length === 0) return null

    const backToMenu = () => {
      onClose()
        goToMenu()
    }
    
    const resetGame = () => {
        onClose()
        reset()
    }

    return (
       <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-black uppercase text-[#f9df0c] text-center">Game Results</h2>
        {winners.length > 1 ? (
          <div>
            <p>Hay un empate entre:</p>
            {winners.map(winner => (
              <p key={winner.name}>
                {winner.name} con {winner.totalScore} puntos
              </p>
            ))}
          </div>
        ) : (
          <p className="text-[] font-bold">
            The winner is <strong className="text-[] uppercase">{winners[0].name}</strong> with {winners[0].totalScore} points
          </p>
        )}
        <div className="flex gap-4">
            <button 
                onClick={ backToMenu } 
                className="bg-[#0e2944] px-3 py-2 rounded-md font-bold"
                >Back to Menu
            </button>
            <button 
                onClick={ resetGame } 
                className="bg-[#0e2944] text-[#fff] px-3 py-2 rounded-md font-bold"
                >Play Again
            </button>
        </div>
       </div>
    )

}