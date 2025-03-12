import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useModalContext } from "./context/ModalContext"

const Modal = () => {

    const { isOpen, closeModal, content, canClose } = useModalContext()
    const modalRef = useRef<HTMLDivElement>(null)
    const modalRoot = document.getElementById('modal')

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                closeModal()
            }
        }
        if (isOpen && canClose) {
            document.addEventListener("keydown", handleEsc)
        }
        return () => {
            document.removeEventListener("keydown", handleEsc)
        }
    }, [canClose, closeModal, isOpen])

    const handleClickPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    if (!isOpen || !modalRoot) return null

    return createPortal(
        <div
            className="bg-[#183e4b] absolute inset-0 h-full w-full flex justify-center items-center bg-opacity-80"
            onClick={canClose ? closeModal : () => { }}
        >
            <div
                className="relative bg-[#183e4b] shadow-lg shadow-black p-8 rounded-lg border border-white"
                ref={modalRef}
                onClick={handleClickPropagation}
            >
                {canClose &&
                    <button
                        className="absolute top-1 right-3 text-[#59ffe7] text-2xl"
                        onClick={closeModal}
                    >&times;
                    </button>
                }

                {content}
            </div>
        </div>, modalRoot
    )
}
export default Modal