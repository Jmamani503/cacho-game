import { ReactNode } from "react"
import { useGameStore } from "../store/game"
import { Navigate } from "react-router-dom"

interface Props {
  children: ReactNode
}

const GameGuard = ({ children }: Props) => {
  const gameData = useGameStore((state) => state.players)
  return gameData.length ? children : <Navigate to={'/home'}/>
}

export default GameGuard