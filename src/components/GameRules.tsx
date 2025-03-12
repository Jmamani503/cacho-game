export const GameRules = () => {

    return (
        <div className="max-w-2xl h-56 overflow-y-auto flex flex-col gap-4">
            <h3 className="text-2xl font-black uppercase text-[#f9df0c] text-center">Rules</h3>
            <div>
                <h3 className="text-lg font-bold">General</h3>
                <div className="pl-4">
                    <p>Cada jugador tiene 11 turnos para acumular la cantidad maxima de puntos</p>
                    <p>En cada turno el jugador debera anotar alguna jugada de las disponibles. Solo se puede anotar una jugada por juego </p>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold">Plays</h3>
                <div className="pl-4">
                    <p><strong>Bullets </strong>1 point for each die showing the number 1</p>
                    <p><strong>Fools </strong>2 points for each die showing the number 2</p>
                    <p><strong>Trains </strong>3 points for each die showing the number 3</p>
                    <p><strong>Squares </strong>4 points for each die showing the number 4</p>
                    <p><strong>Fives </strong>5 points for each die showing the number 5</p>
                    <p><strong>Sixes </strong>6 points for each die showing the number 6</p>
                    <p><strong>Straight </strong>20 points for a consecutive sequence of numbers. Plus 5 if is by hand</p>
                    <p><strong>Full House </strong>30 points for a combination of three of one number and two of another. Plus 5 if is by hand</p>
                    <p><strong>Four of a Kind - </strong>40 points for four dice showing the same number. Plus 5 if is by hand</p>
                </div>
                
            </div>
            <div>
                <h3 className="text-lg font-bold">Turn Stages</h3>
                <div className="pl-4">
                    <p><strong>Roll </strong>Roll the 5 dice</p>
                    <p><strong>Reroll </strong>Reroll the selected dice</p>
                    <p><strong>Flip </strong>Flip one die and a second optional</p>
                    <p><strong>Set Hand </strong>Select a play based on the final state of the dice</p>
                </div>
            </div>
        </div>
    )
}