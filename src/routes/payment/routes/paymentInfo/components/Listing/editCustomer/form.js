import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { withRouter } from 'react-router-dom';
import avatarImage from '../../../../../../../assets/images/avatar.jpg';
import DEMO from 'constants/demoData';
import classes from './style.module.scss';

const FormItem = Form.Item;

class EditRecord extends React.Component {
  state = {
    confirmDirty: false,
    ...this.props.recordData,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push(DEMO.home2);
      }
    });
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const { email, image, name, phone } = this.state;

    return (
      <section className="form-v1-container">
        <h2>Edit Customer</h2>
        <div className="mb-3">
          <img src={avatarImage} className={classes.productImage} alt={name} />
        </div>
        <Form onSubmit={this.handleSubmit} className="form-v1">
          <FormItem {...formItemLayout} label="Name">
            <Input value={name} />
          </FormItem>

          <FormItem {...formItemLayout} label="Email" hasFeedback>
            <Input value={email} />
          </FormItem>
          <FormItem {...formItemLayout} label="Phone" hasFeedback>
            <Input value="phone" />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="btn-cta">
              Save
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedEditRecord = Form.create()(withRouter(EditRecord));

export default WrappedEditRecord;
