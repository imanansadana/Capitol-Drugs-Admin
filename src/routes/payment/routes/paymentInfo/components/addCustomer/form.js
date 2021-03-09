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
import DEMO from 'constants/demoData';

const FormItem = Form.Item;

class MainForm extends React.Component {
  state = {
    confirmDirty: false,
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

    return (
      <section className="form-v1-container">
        <h2>Add New Customer</h2>
        <p className="lead col-lg-10 mx-lg-auto">
          Discovering and connecting with creative talent around the globe.
        </p>
        <Form onSubmit={this.handleSubmit} className="form-v1">
          <FormItem
            {...formItemLayout}
            label={
              <span>
                Name&nbsp;
                <Tooltip title="Product Name">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            <Input />
          </FormItem>{' '}
          <FormItem {...formItemLayout} label="Email" hasFeedback>
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="Phone" hasFeedback>
            <Input />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="btn-cta">
              Add
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedMainForm = Form.create()(withRouter(MainForm));

export default WrappedMainForm;
