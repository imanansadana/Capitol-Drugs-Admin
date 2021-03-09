import React from 'react';
import { Form, Input, Button, Spin, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import cx from 'classnames';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';

const FormItem = Form.Item;

class EditRecord extends React.Component {
  state = {
    confirmDirty: false,
    old_password: '',
    new_password: '',
    confirmPassword: '',
    isLoading: false,
    apiError: '',
    apiSuccess: '',
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
  clearInputs = () => {
    this.setState({ old_password: '', new_password: '', confirmPassword: '' });
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

  editApi = () => {
    const { new_password, old_password } = this.state;
    const { match, history } = this.props;
    this.setState({ isLoading: true });
    const self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .post(
        `${backendUrl}/change-password`,
        {
          email: 'test@gmail.com',
          old_password,
          new_password,
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
        self.setState({
          isLoading: false,
          apiSuccess: response.data.message,
        });
        self.clearInputs();
        self.setState({ isLoading: false });
        setTimeout(() => self.setState({ apiSuccess: '' }), 3000);
      })
      .catch(function(error) {
        console.log('rrrr err', error);
        self.setState({
          isLoading: false,
          apiError: error.toString().includes('Network Error')
            ? 'Network Error'
            : 'Old Password Incorrect',
        });
        setTimeout(() => self.setState({ apiError: '' }), 3000);
      });
  };
  validateForm = () => {
    const { new_password, old_password, confirmPassword } = this.state;
    if (old_password === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Old Password',
          errorType: 'old_password',
        },
      });
      return false;
    }
    if (new_password === '') {
      this.setState({
        error: {
          errorText: 'Please Enter New Password',
          errorType: 'new_password',
        },
      });
      return false;
    }
    if (confirmPassword === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Confirm Password',
          errorType: 'confirmPassword',
        },
      });
      return false;
    }
    if (confirmPassword !== new_password) {
      this.setState({
        error: {
          errorText: 'Password Not Match',
          errorType: 'confirmPassword',
        },
      });
      return false;
    }
    return true;
  };
  handleSubmit = () => {
    this.clearError();
    if (this.validateForm()) {
      this.editApi();
    }
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      old_password,
      new_password,
      confirmPassword,
      error,
      isLoading,
      apiError,
      apiSuccess,
    } = this.state;

    const { errorType } = error;

    return (
      <div className="form-container">
        <div style={{ width: 0, height: 0, opacity: 0, overflow: 'hidden' }}>
          <input type="email" />
          <input type="password" />
        </div>

        <FormItem
          label="Old Password"
          hasFeedback
          className={cx({ 'has-error': errorType === 'old_password' })}
        >
          <Input
            name="old_password"
            type="password"
            value={old_password}
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            onChange={e => this.handleInput(e)}
          />
          {this.errorShow('old_password')}
        </FormItem>
        <Row form>
          <Col md={6}>
            <FormItem
              label="New Password"
              hasFeedback
              className={cx({ 'has-error': errorType === 'new_password' })}
            >
              <Input
                name="new_password"
                type="password"
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                value={new_password}
                onChange={e => this.handleInput(e)}
              />
              {this.errorShow('new_password')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Confirm Password"
              hasFeedback
              className={cx({ 'has-error': errorType === 'confirmPassword' })}
            >
              <Input
                name="confirmPassword"
                type="password"
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                value={confirmPassword}
                onChange={e => this.handleInput(e)}
              />
              {this.errorShow('confirmPassword')}
            </FormItem>
          </Col>
        </Row>
        {isLoading && (
          <div className="mb-2 text-center">
            <Spin />
          </div>
        )}
        <div className="text-right pt-3">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-cta"
            disabled={isLoading}
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        </div>

        {apiSuccess && (
          <div className="callout callout-success">
            <p>{apiSuccess}</p>
          </div>
        )}
        {apiError && (
          <div className="callout callout-danger">
            <p>{apiError}</p>
          </div>
        )}
      </div>
    );
  }
}

const WrappedEditRecord = Form.create()(withRouter(EditRecord));

export default WrappedEditRecord;
