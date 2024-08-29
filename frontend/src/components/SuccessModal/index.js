import { Modal, Button } from "antd";
import './SuccessModal.css'

function SuccessModal({ open, onCancel, toggleLoginModal }) {
  return (
    <Modal
      title="Đăng kí thành công"
      open={open}
      onCancel={onCancel} 
      className="successModal"
      footer={[
        <Button className="successModal-btn" key="login" type="primary" onClick={toggleLoginModal}>
          Đăng nhập
        </Button>,
      ]}
    >
      <p>Bạn đã đăng kí tài khoản thành công!</p>
    </Modal>
  );
}

export default SuccessModal;
