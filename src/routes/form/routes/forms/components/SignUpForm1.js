import React from 'react';
import { Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import DEMO from 'constants/demoData';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    email: '',
    password: '',
    confirmPassword: '',
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //       this.props.history.push(DEMO.home2);
  //     }
  //   });
  // };
  registerApi = () => {
    const { email, password } = this.state;
    // debugger;
    axios
      .post(`${backendUrl}/register`, {
        email,
        password,
        // email: 'test@gmail.com',
        // password: 'test@123456',
      })
      .then(function(response) {
        localStorage.clear();
        // localStorage.setItem('isLoggedIn', true);
        // window.location.reload();
        console.log('rrrr res', response);
      })
      .catch(function(error) {
        // localStorage.clear();
        // localStorage.setItem('isLoggedIn', false);
        console.log('rrrr err', error);
      });
  };
  handleSubmit = () => {
    this.registerApi();
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('signup1-password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const { email, password, confirmPassword } = this.state;

    return (
      <section className="form-v1-container">
        <h2>Create an Account</h2>
        <p className="lead col-lg-10 mx-lg-auto">
          Discovering and connecting with creative talent around the globe.
        </p>
        {/* <Form onSubmit={this.handleSubmit} className="form-v1"> */}
        {/* <FormItem
            {...formItemLayout}
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want other to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator('signup1-nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(<Input />)}
          </FormItem> */}
        <FormItem>
          {getFieldDecorator('signup1-email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Input
              type="email"
              size="large"
              name="email"
              value={email}
              onChange={this.handleInput}
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('login1-password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              name="password"
              value={password}
              onChange={this.handleInput}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem hasFeedback>
          {getFieldDecorator('signup1-confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.checkPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              size="large"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={this.handleInput}
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>
        {/* <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('signup1-agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <a href={DEMO.link}>agreement</a>
              </Checkbox>
            )}
          </FormItem> */}
        <p className="additional-info">
          Already have an account? <a href={DEMO.login}>Login</a>
        </p>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-cta btn-block"
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
        </FormItem>
        {/* </Form> */}
      </section>
    );
  }
}

const WrappedRegistrationForm = Form.create()(withRouter(RegistrationForm));

export default WrappedRegistrationForm;
