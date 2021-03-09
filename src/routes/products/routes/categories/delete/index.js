import React from 'react';
import { Modal, Button, Icon } from 'antd';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';

import { createGlobalStyle } from 'styled-components';

export default class Delete extends React.Component {
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

  deleteRecord = id => {
    var self = this;

    const authToken = localStorage.getItem('access_token');
    axios
      .delete(`${backendUrl}/delete-category/${id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);

        if (response) {
          window.location.reload();
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };

  render() {
    const { recordData } = this.props;
    const { title, _id } = recordData;
    console.log('rrrr recordData rr', recordData);

    return (
      <div>
        <Button type="danger" className="ml-2" shape="circle" onClick={this.showModal}>
          <Icon type="delete" theme="filled" />
        </Button>
        <Modal
          title="Delete Record"
          okType="danger"
          visible={this.state.visible}
          onOk={() => this.deleteRecord(_id)}
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
                Are you really want to delete <b>{title}</b>
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
