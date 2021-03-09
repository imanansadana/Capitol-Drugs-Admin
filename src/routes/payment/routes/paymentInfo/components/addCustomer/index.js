import React from 'react';
import { Modal, Button } from 'antd';
import Form from './form';

class AddProductModal extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Customer
        </Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
          centered
        >
          <section className="form-card">
            <div className="form-card__body p-lg-5 p-4">
              <Form />
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}

export default AddProductModal;
