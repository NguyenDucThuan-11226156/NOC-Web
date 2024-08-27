import { Modal, Button } from "antd";

function SuccessModal({ open, onCancel, toggleLoginModal }) {
  return (
    <Modal
      title="Đăng kí thành công"
      open={open}
      onCancel={onCancel} 
      footer={[
        <Button key="login" type="primary" onClick={toggleLoginModal}>
          Đăng nhập
        </Button>,
      ]}
    >
      <p>Bạn đã đăng kí tài khoản thành công!</p>
    </Modal>
  );
}

export default SuccessModal;
