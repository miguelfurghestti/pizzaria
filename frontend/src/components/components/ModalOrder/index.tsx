import Modal from "react-modal";
import styles from "./style.module.scss";

import { FiX } from "react-icons/fi";
import { OrderItemProps } from "../../pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
}

export function ModalOrder({ isOpen, onRequestClose, order }: ModalOrderProps) {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#f34748" />
      </button>

      <div className={styles.container}>
        <h2>Detalhes do Pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map((item) => (
          <section></section>
        ))}
      </div>
    </Modal>
  );
}