import { useGameStore } from "../store/game"
import ScoreBoard from "./ScoreBoard"

export const PlayersScore = () => {
  
    const { players, currentPlayer } = useGameStore((state) => state)
    
    return (
        <aside className="flex flex-row md:flex-col md:w-52 justify-center items-center gap-2 md:gap-4 w-full overflow-auto">
            {
                players.map((player, index) => 
                    index !== currentPlayer 
                    && <ScoreBoard key={player.name} player={player} isCurrentBoard={false}/>
            )}
        </aside>
    )
}
