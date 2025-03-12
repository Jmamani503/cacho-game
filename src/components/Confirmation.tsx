interface Props {
    message: string
    onConfirm: () => void
    onClose: () => void
}

export const Confirmation = ({ message, onConfirm, onClose }: Props) => {

    const confirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <div className="w-48 flex flex-col gap-4">
            <h3 className="text-xl font-black uppercase text-[#f9df0c] text-center">Confirmation</h3>
            <p className="text-sm text-center">{message}</p>
            <button 
                onClick={confirm}
                className="bg-[#1b4552] text-[#fff] px-3 py-2 font-bold rounded-md border border-[#eaeaea]"
                >Confirm
            </button>
        </div>
    )
}