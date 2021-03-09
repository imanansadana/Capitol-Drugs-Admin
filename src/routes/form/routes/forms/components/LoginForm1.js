import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import APPCONFIG from 'constants/appConfig';
import DEMO from 'constants/demoData';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { backendUrl } from '../../../../../common/credentials';
import isLoggedIn from '../../../../../common/isLoggedIn';
import { Spin } from 'antd';
import cx from 'classnames';
const FormItem = Form.Item;
const validateEmail = email => {
  var re = /^(([^<>()\]\\.,;:\s@“]+(\.[^<>()\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

class NormalLoginForm extends React.Component {
  state = {
    email: '',
    password: '',
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
    const { email } = this.state;
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === 'password') {
      if (email === '') {
        this.setState({
          error: {
            errorText: 'Please Enter Email',
            errorType: 'email',
          },
        });
      } else if (!validateEmail(email)) {
        this.setState({
          error: {
            errorText: 'Please Enter A Valid Email',
            errorType: 'email',
          },
        });
      }
    }
  };

  loginApi = () => {
    const { email, password } = this.state;
    if (email === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Email',
          errorType: 'email',
        },
      });
      return;
    }
    if (!validateEmail(email)) {
      this.setState({
        error: {
          errorText: 'Please Enter A Valid Email',
          errorType: 'email',
        },
      });
      return;
    }

    if (password === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Password',
          errorType: 'password',
        },
      });
      return;
    }

    this.setState({ isLoading: true });
    const self = this;
    axios
      .post(`${backendUrl}/login`, {
        email,
        password,
      })
      .then(function(response) {
        localStorage.clear();
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('access_token', response.data.access_token);
        self.setState({ isLoading: false });
        window.location.reload();
        console.log('rrrr res', response, response.data.access_token);
      })
      .catch(function(error) {
        self.setState({
          isLoading: false,
          apiError: error.toString().includes('Network Error')
            ? 'Network Error'
            : 'You Enter Wrong Email or Password',
        });
        setTimeout(() => self.setState({ apiError: '' }), 3000);
        localStorage.clear();
        localStorage.setItem('isLoggedIn', false);
        console.log('rrrr err', error);
      });
  };

  handleSubmit = () => {
    this.loginApi();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { email, password, isLoading, apiError, error } = this.state;
    const { errorType, errorText } = error;
    if (isLoggedIn()) {
      return <Redirect to={'/app/dashboard'} />;
    }

    console.log('rrrr upd', email, password);
    return (
      <section className="form-v1-container">
        <h2>Login to Continue</h2>
        <p className="lead">Welcome back, sign in with your {APPCONFIG.brand} account</p>
        {/* <Form onSubmit={this.handleSubmit} className="form-v1"> */}
        <FormItem>
          <Input
            className={cx({ 'has-error': errorType === 'email' })}
            type="email"
            size="large"
            name="email"
            value={email}
            onChange={this.handleInput}
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="Email"
          />
          {this.errorShow('email')}
        </FormItem>
        <FormItem>
          <Input
            className={cx({ 'has-error': errorType === 'password' })}
            size="large"
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            name="password"
            value={password}
            onChange={this.handleInput}
            type="password"
            placeholder="Password"
          />
          {this.errorShow('password')}
        </FormItem>
        <FormItem className="form-v1__remember">
          {getFieldDecorator('login1-remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
        </FormItem>
        {isLoading && (
          <div className="mb-2 text-center">
            <Spin />
          </div>
        )}
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-cta btn-block"
            onClick={this.handleSubmit}
            disabled={isLoading}
          >
            Log in
          </Button>
        </FormItem>
        {/* </Form> */}
        {/* <p className="additional-info">
          Don't have an account yet? <a href={DEMO.signUp}>Sign up</a>
        </p> */}
        {apiError && (
          <div className="callout callout-info">
            <p>{apiError}</p>
          </div>
        )}
        <p className="additional-danger">
          Forgot your username or password? <a href={DEMO.forgotPassword}>Reset password</a>
        </p>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(withRouter(NormalLoginForm));

export default WrappedNormalLoginForm;
