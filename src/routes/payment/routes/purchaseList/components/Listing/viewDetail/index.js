import React from 'react';
import { Modal, Button } from 'antd';
import ViewDetails from './viewDetails';
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
        <Button type="primary" onClick={this.showModal}>
          View Details
        </Button>
        <Modal
          title="View Purchase"
          visible={this.state.visible}
          // onOk={this.handleOk}
          // okText="Delete"
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
          centered
        >
          <section className="form-card">
            <div className="form-card__body ">
              <ViewDetails recordData={recordData} />
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}
