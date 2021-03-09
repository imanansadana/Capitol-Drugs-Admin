import React from 'react';
import { Modal, Button, Icon } from 'antd';
import Form from './form';
export default class EditRecord extends React.Component {
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
      <>
        <Button type="primary" className="btn-cta mb-3" onClick={this.showModal}>
          Change Profile
        </Button>
        <Modal
          title="Change Profile Image"
          visible={this.state.visible}
          // onOk={this.handleOk}
          // okText="Delete"

          onCancel={this.handleCancel}
          footer={null}
          centered
        >
          <Form />
        </Modal>
      </>
    );
  }
}
