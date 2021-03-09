import React from 'react';
import { Form, Input, Icon, Button, Spin } from 'antd';
import cx from 'classnames';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import DragAndDrop from '../../../../form/routes/form-control/routes/upload/components/DragAndDrop';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';

const FormItem = Form.Item;

const defaultState = {
  title: '',
  category_image: '',
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
  errorShow = type => {
    const { error } = this.state;
    const { errorType, errorText } = error;
    return errorType === type ? (
      <span className="d-block text-danger" style={{ marginTop: -8 }}>
        {errorText}
      </span>
    ) : null;
  };
  addNewApi = () => {
    const { title, description } = this.state;
    const { match, history } = this.props;
    this.setState({ isLoading: true });
    const self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .post(
        `${backendUrl}/add-utility-category`,
        {
          title,
          category_image: '',
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
    const { title } = this.state;
    const { _id } = this.props.editData;
    const { match, history } = this.props;
    this.setState({ isLoading: true });
    const self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .patch(
        `${backendUrl}/edit-utility-category/${_id}`,
        {
          title,
          category_image: '',
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
    const { title } = this.state;
    if (title === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Category Name',
          errorType: 'title',
        },
      });
      return false;
    }
    return true;
  };
  handleAddData = () => {
    this.clearError();
    if (this.validateForm()) {
      this.addNewApi();
    }
  };
  handleEditData = () => {
    this.clearError();
    if (this.validateForm()) {
      this.editApi();
    }
  };
  render() {
    const { type = 'add', editData, match, history } = this.props;
    const { title, isLoading, apiError, error } = this.state;
    const { errorType } = error;
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
          label="Category Name"
          hasFeedback
          className={cx({ 'has-error': errorType === 'title' })}
        >
          <Input name="title" value={title} onChange={this.handleInput} />
          {this.errorShow('title')}
        </FormItem>
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
