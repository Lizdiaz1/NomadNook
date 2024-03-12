import { createContext, useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);

    const closeModal = () => {
      setModalContent(null);
      if (typeof onModalClose === "function") {
        setOnModalClose(null);
        onModalClose();
    }
  };

    const contextValue = {
        modalRef, // reference to modal div
        modalContent, // React component to render inside modal
        setModalContent, // function to render inside modal
        setOnModalClose, // function to callback function called when modal is closing
        closeModal // function to close the modal
      };

    return (
      <>
        <ModalContext.Provider value={contextValue}>
          {children}
        </ModalContext.Provider>
        <div ref={modalRef} />
      </>
    );
  }

  export function Modal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);

    if (!modalRef || !modalRef.current || !modalContent) return null;

    return ReactDOM.createPortal(
      <div id="modal">
        <div id="modal-background" onClick={closeModal}></div>
        <div id="modal-content">{modalContent}</div>
      </div>,
      modalRef.current
    );
  }

  export const useModal = () => useContext(ModalContext);
