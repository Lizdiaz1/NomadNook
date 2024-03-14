import { useModal } from '../context/ModalContext';

export const Modal = () => {
  const { isVisible, content, hideModal } = useModal();

  if (!isVisible) return null;

  return (
    <div className="modal-backdrop" onClick={hideModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {content}
        <button onClick={hideModal}>Close</button>
      </div>
    </div>
  );
};
