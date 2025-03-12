import { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextProps {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode, canClose: boolean) => void;
  closeModal: () => void;
  canClose: boolean
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [content, setContent] = useState<ReactNode | null>(null)
  const [canClose, setCanClose] = useState<boolean>(true)

  const openModal = (modalContent: ReactNode, canClose: boolean) => {
    setCanClose(canClose)
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal, canClose}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {

    const context = useContext(ModalContext)

    if(!context){
        throw new Error("Modal is outside of its provider")
    }
    
    return context
}