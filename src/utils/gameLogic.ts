import { Play } from "../models/play";

interface Props {
  dicesValues: number[]
  hasReroll: boolean
}

export const calculateScore = ({dicesValues, hasReroll}: Props) : Play[] => {
  const counts = dicesValues.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const isEscalera =
    JSON.stringify(dicesValues.sort((a, b) => a - b)) === JSON.stringify([1, 2, 3, 4, 5]) ||
    JSON.stringify(dicesValues.sort((a, b) => a - b)) === JSON.stringify([2, 3, 4, 5, 6]);

  return [
    { name: "Bullets", value: counts[1] ? counts[1] * 1 : 0, bonus: 0},
    { name: "Straight", value: isEscalera ? 20 : 0, bonus: hasReroll ? 0 : 5},
    { name: "Quads", value: counts[4] ? counts[4] * 4 : 0, bonus: 0},
    { name: "Dummies", value: counts[2] ? counts[2] * 2 : 0, bonus: 0},
    { name: "Full", value: Object.values(counts).includes(3) && Object.values(counts).includes(2) ? 30 : 0, bonus: hasReroll ? 0 : 5},
    { name: "Fives", value: counts[5] ? counts[5] * 5 : 0, bonus: 0},
    { name: "Triplets", value: counts[3] ? counts[3] * 3 : 0, bonus: 0},
    { name: "Poker", value: Object.values(counts).includes(4) ? 40 : 0, bonus: hasReroll ? 0 : 5},
    { name: "Sixes", value: counts[6] ? counts[6] * 6 : 0, bonus: 0},
    { name: "Grand 1", value: Object.values(counts).includes(5) ? 50 : 0, bonus: 0},
    { name: "Grand 2", value: Object.values(counts).includes(5) ? 50 : 0, bonus: 0},
    { name: "Skip", value: 1, bonus: 0},
  ];
};

