import React from 'react';
import { Modal, Button } from 'antd';
import { createGlobalStyle } from 'styled-components';

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
    const { name } = recordData;

    return (
      <div>
        <Button type="danger" className="ml-2" onClick={this.showModal}>
          Delete
        </Button>
        <Modal
          title="Delete Record"
          okType="danger"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="Delete"
          onCancel={this.handleCancel}
          // footer={null}
          // className="custom-modal-v1"
          centered
        >
          <GlobalStyle />

          <section className="form-card">
            <div className="form-card__body ">
              <h4>
                Are you really want to delete <b>{name}</b>
              </h4>
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}
const GlobalStyle = createGlobalStyle`
.ant-modal-title{
  font-size: 22px;
}
.ant-modal{  
width: 380px !important;
}
`;
