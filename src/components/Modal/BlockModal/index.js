import React from 'react';
import { Modal, Button, Icon } from 'antd';
import axios from 'axios';
import { backendUrl } from '../../../common/credentials';

export default class BlockModal extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  blockApi = id => {
    var self = this;
    const { api = '', type } = this.props;

    const authToken = localStorage.getItem('access_token');
    api &&
      axios
        .patch(
          `${backendUrl}/${api}/${id}`,
          {
            status: type === 'block' ? 1 : 0,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
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
    const {
      recordData,
      type = 'block',
      blockText = 'block',
      unblockText = 'unblock',
      blockTitleText = 'Block',
      unblockTitleText = 'Unblock',
      blockBtnText = 'Block',
      unblockBtnText = 'Unblock',
    } = this.props;
    const { name = '', title = '', _id } = recordData;
    console.log('rrrr recordData', recordData);

    return (
      <div>
        <Button type="primary" shape="circle" className="ml-2" onClick={this.showModal}>
          <Icon type={type === 'block' ? 'api' : 'link'} theme={type === 'block' && 'filled'} />
          {/* {type === 'block' ? 'Block' : 'Unblock'} */}
        </Button>
        <Modal
          title={`${type === 'block' ? blockTitleText : unblockTitleText} Record`}
          visible={this.state.visible}
          onOk={() => this.blockApi(_id)}
          okText={type === 'block' ? blockBtnText : unblockBtnText}
          onCancel={this.handleCancel}
          // footer={null}
          // className="custom-modal-v1"
          centered
        >
          <section className="form-card">
            <div className="form-card__body ">
              <h4>
                Are you really want to {type === 'block' ? blockText : unblockText}{' '}
                <b>{name || title}</b>
              </h4>
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}
