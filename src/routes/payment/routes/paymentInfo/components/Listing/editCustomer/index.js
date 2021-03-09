import React from 'react';
import { Modal, Button } from 'antd';
import Form from './form';
export default class DeleteProduct extends React.Component {
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
    const { recordData } = this.props;
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Edit Customer
        </Button>
        <Modal
          title="Edit Product"
          visible={this.state.visible}
          // onOk={this.handleOk}
          // okText="Delete"
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
          centered
        > */}
        <section className="form-card">
          <div className="form-card__body ">
            <Form recordData={recordData} />
          </div>
        </section>
        {/* </Modal> */}
      </div>
    );
  }
}
