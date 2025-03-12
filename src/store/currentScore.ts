import { create } from "zustand";
import { Play } from "../models/play";

interface State {
    score: Play[]
    setScore: (score: Play[]) => void
    removeScore: () => void
}

export const useCurrentScoreStore = create<State>((set) => ({
    score: [],
    setScore: (score) => set({score: score}),
    removeScore: () => set({score:[]})
}))