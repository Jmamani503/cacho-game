import { create } from "zustand";
import { Play } from "../models/play";

interface State {
    play: Play | null
    setPlay : (play: Play) => void
    removePlay : () => void
}

export const useSelectedPlayStore = create<State>((set) => ({
    play: null,
    setPlay: (play) => set({play}),
    removePlay: () => set({play: null})
}))
