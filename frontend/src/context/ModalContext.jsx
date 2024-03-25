import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null);

  const showModal = (content) => {
    setContent(content);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ isVisible, showModal, hideModal, content }}>
      {children}
    </ModalContext.Provider>
  );
};
