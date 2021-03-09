import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Spin } from 'antd';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import DragAndDrop from '../../../../form/routes/form-control/routes/upload/components/DragAndDrop';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';
import cx from 'classnames';

const FormItem = Form.Item;

const defaultState = {
  title: '',
  // description: '',
};
class FormComponent extends React.Component {
  state = {
    ...(this.props.type === 'edit' ? this.props.editData : defaultState),
    isLoading: false,
    apiError: '',
    error: {
      errorText: '',
      errorType: '',
    },
  };
  errorShow = type => {
    const { error } = this.state;
    const { errorType, errorText } = error;
    return errorType === type ? (
      <span className="d-block text-danger" style={{ marginTop: -8 }}>
        {errorText}
      </span>
    ) : null;
  };
  clearError = () => {
    this.setState({
      error: {
        errorText: '',
        errorType: '',
      },
    });
  };
  handleInput = e => {
    this.clearError();
    this.setState({ [e.target.name]: e.target.value });
  };
  addNewApi = () => {
    const { title, description } = this.state;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .post(
        `${backendUrl}/add-utility-subcategory`,
        {
          title,
          // description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: authToken,
          },
        }
      )
      .then(function(response) {
        console.log('rrrr res', response);
        history.push(
          match.url
            .split('/')
            .slice(0, -1)
            .join('/')
        );
        self.setState({ isLoading: false });
      })
      .catch(function(error) {
        console.log('rrrr err', error);
        self.setState({ isLoading: false });
        self.setState({
          isLoading: false,
          apiError: error.toString().includes('Network Error')
            ? 'Network Error'
            : 'Somthing went wrong',
        });
        setTimeout(() => self.setState({ apiError: '' }), 3000);
      });
  };
  editApi = () => {
    const { title, description } = this.state;
    const { _id } = this.props.editData;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .patch(
        `${backendUrl}/edit-utility-subcategory/${_id}`,
        {
          title,
          // description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: authToken,
          },
        }
      )
      .then(function(response) {
        console.log('rrrr res', response);
        history.push(
          match.url
            .split('/')
            .slice(0, -1)
            .join('/')
        );
        self.setState({ isLoading: false });
      })
      .catch(function(error) {
        console.log('rrrr err', error);
        self.setState({ isLoading: false });
        self.setState({
          isLoading: false,
          apiError: error.toString().includes('Network Error')
            ? 'Network Error'
            : 'Somthing went wrong',
        });
        setTimeout(() => self.setState({ apiError: '' }), 3000);
      });
  };
  validateForm = () => {
    const { title, description } = this.state;
    if (title === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Sub Category Name',
          errorType: 'title',
        },
      });
      return false;
    }
    // if (description === '') {
    //   this.setState({
    //     error: {
    //       errorText: 'Please Enter Description',
    //       errorType: 'description',
    //     },
    //   });
    //   return false;
    // }

    return true;
  };
  handleAddData = () => {
    if (this.validateForm()) {
      this.addNewApi();
    }
  };
  handleEditData = () => {
    if (this.validateForm()) {
      this.editApi();
    }
  };
  render() {
    const { type = 'add', editData, match, history } = this.props;
    const {
      title,
      //  description,
      isLoading,
      apiError,
      error,
    } = this.state;
    const { errorType, errorText } = error;
    if (type === 'edit') {
      if (!editData) {
        history.push(
          match.url
            .split('/')
            .slice(0, -1)
            .join('/')
        );
        return null;
      }
    }
    return (
      <div className="form-container">
        <FormItem
          label="Sub Category Name"
          className={cx({ 'has-error': errorType === 'title' })}
          hasFeedback
        >
          <Input name="title" value={title} onChange={this.handleInput} />
          {this.errorShow('title')}
        </FormItem>

        {/* <FormItem label="Description" className={cx({ 'has-error': errorType === 'description' })}>
          <Input.TextArea name="description" value={description} onChange={this.handleInput} />
          {this.errorShow('description')}
        </FormItem> */}

        {isLoading && (
          <div className="mb-2 text-center">
            <Spin />
          </div>
        )}
        <div className="text-right pt-3">
          {type === 'add' && (
            <Button
              type="primary"
              htmlType="submit"
              className="btn-cta"
              onClick={this.handleAddData}
              disabled={isLoading}
            >
              <Icon type="plus-circle" theme="filled" />
              Add
            </Button>
          )}
          {type === 'edit' && (
            <Button
              type="primary"
              htmlType="submit"
              className="btn-cta"
              onClick={this.handleEditData}
              disabled={isLoading}
            >
              <Icon type="edit" theme="filled" /> Save
            </Button>
          )}
        </div>
        {apiError && (
          <div className="callout callout-danger">
            <p>{apiError}</p>
          </div>
        )}
      </div>
    );
  }
}

const WrappedFormComponent = Form.create()(withRouter(FormComponent));

export default WrappedFormComponent;
