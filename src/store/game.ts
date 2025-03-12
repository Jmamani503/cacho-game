import { create } from 'zustand'  
import { Player } from '../models/player'
import { Dice } from '../models/dice';
import { TurnStage } from '../models/turn-stage';

const defaultScore = [
    { name: "Bullets", value: 0, bonus: 0 },
    { name: "Straight", value: 0, bonus: 0 },
    { name: "Quads", value: 0, bonus: 0 },
    { name: "Dummies", value: 0, bonus: 0 },
    { name: "Full", value: 0, bonus: 0 },
    { name: "Fives", value: 0, bonus: 0 },
    { name: "Triplets", value: 0, bonus: 0 },
    { name: "Poker", value: 0, bonus: 0 },
    { name: "Sixes", value: 0, bonus: 0 },
    { name: "Grand 1", value: 0, bonus: 0 },
    { name: "Grand 2", value: 0, bonus: 0 },
    { name: "Skip", value: 0, bonus: 0 },
  ];
  

interface State {
    players: Player[]
    startGame: (players: string[]) => void
    restartGame: () => void
    removePlayers: () => void
    updatePlayerScore: (playerName: string, playName: string, newScore: number, bonus: number) => void
    currentPlayer: number,
    setCurrentPlayer: (index: number) => void
    currentRoll: Dice[],
    setCurrentRoll: (dice: Dice[]) => void,
    resetCurrentRoll: () => void,
    currentStage: TurnStage,
    setCurrentStage: (nextStage: TurnStage) => void
    currentRound: number,
    setCurrentRound: (newCurrentRound: number) => void
    hasReroll: boolean
    setHasReroll: (hasReroll: boolean) => void
    winners: string[]
    setWinners: (winners: string[]) => void
    hasFinished: boolean,
    setHasFinished: (hasFinished: boolean) => void
}

const initialDice: Dice[] = Array.from({ length: 5 }, () => ({ value: 0, selected: false }));


export const useGameStore = create<State>((set) => ({
    players: [],
    startGame: (players) => 
        set({players:  players.map((name) => ({
            name,
            score: defaultScore,
            totalScore: 0
        }))}),
    restartGame: () => 
        set((state) => ({
            players: state.players.map((player) => ({
                name: player.name,
                score: defaultScore,
                totalScore: 0
            }))
    })),
    removePlayers: () => set({players: []}),
    updatePlayerScore: (playerName, playName, newScore, bonus) => 
        set((state) => ({
        players: state.players.map((player) => 
            player.name === playerName 
                ? {
                    ...player,
                    totalScore: player.totalScore + newScore + bonus,
                    score: player.score.map((play) => 
                        play.name === playName ? {...play, value: play.value + newScore, bonus: bonus} : play
                    )

                } : player
        )
    })),
    currentPlayer: 0,
    setCurrentPlayer: (index) => set({currentPlayer: index}),
    currentRoll: initialDice,
    setCurrentRoll: (dice) => set({currentRoll: dice}),
    resetCurrentRoll: () => set({currentRoll: initialDice}),
    currentStage: TurnStage.ROLL_DICE,
    setCurrentStage: (nextStage) => set({currentStage: nextStage}) ,
    currentRound: 10,
    setCurrentRound: (newCurrentRound) => set({currentRound: newCurrentRound}) ,
    hasReroll: false,
    setHasReroll: (hasReroll) => set({hasReroll}),
    winners: [],
    setWinners: (winners) => set({winners}),
    hasFinished: false,
    setHasFinished: (hasFinished) => set({hasFinished})
}))