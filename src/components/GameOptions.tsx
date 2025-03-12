import { ConfirmationType } from "../models/confirm.enum"
import { Confirmation } from "./Confirmation"
import { useModalContext } from "./modal/context/ModalContext"

interface Props {
    goToMenu: () => void
    resetGame: () => void
}

export const GameOptions = ({goToMenu, resetGame}: Props) => {

    const { openModal, closeModal } = useModalContext()
    
     const openConfirmModal = (type: ConfirmationType) => {
          openModal(
            type === ConfirmationType.BACK ? 
              <Confirmation 
              message={'If you leave your current progress will be lost'}
              onConfirm={goToMenu}
              onClose={closeModal}
              />
              :
              <Confirmation 
                message={'Are you sure you want to start over? All your progress will be lost'}
                onConfirm={resetGame}
                onClose={closeModal}
              /> 
          , true)
        }

    return (
        <aside className="flex flex-col w-full md:w-52 justify-center items-center">
            <div className="bg-[#1b4552] flex flex-row gap-2 rounded-lg border border-white p-2 md:p-4 max-w-max md:w-full  justify-center items-center">
                <button
                    onClick={() => openConfirmModal(ConfirmationType.RESET)}
                    className="bg-[#183e4b]  px-3 py-2 rounded-md font-bold border border-white w-full text-sm md:text-base">Restart</button>
                <button
                    onClick={() => openConfirmModal(ConfirmationType.BACK)}
                    className="bg-[#183e4b] px-3 py-2 rounded-md font-bold border border-white w-full text-sm md:text-base">Menu</button>
            </div>
        </aside>
    )
}
