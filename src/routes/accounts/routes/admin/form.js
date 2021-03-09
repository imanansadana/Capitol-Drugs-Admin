import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { Row, Col } from 'reactstrap';
import avatarImage from '../../../../assets/images/avatar.jpg';
import { withRouter, Link } from 'react-router-dom';
import DEMO from 'constants/demoData';
import classes from './style.module.scss';
import ChangePassword from './changePassword';
import ChangePic from './changePic';

const FormItem = Form.Item;

const profileData = {
  image: avatarImage,
  firstName: 'Abhi',
  lastName: 'Khanna',
  email: 'abhi@gmail.com',
  phone: '9632587410',
};
class Admin extends React.Component {
  state = {
    confirmDirty: false,
    editMode: false,
    ...profileData,
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

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  toggleEdit = () => {
    const { editMode } = this.state;
    this.setState({ editMode: !editMode });
  };

  onCancel = () => {
    this.setState({
      image: profileData.image,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
    });
  };
  render() {
    const { match } = this.props;
    const { email, image, firstName, lastName, phone, editMode } = this.state;

    return (
      <section className="form-v1-container">
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <div className="mb-3 text-center">
            <img src={image} className={classes.profile} alt={firstName} />
          </div>

          <center>
            <ChangePic />
          </center>
          <Row form>
            <Col md={6}>
              <FormItem label="First Name" hasFeedback>
                <Input
                  name="firstName"
                  value={firstName}
                  disabled={!editMode}
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  onChange={e => this.handleInput(e)}
                />
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem label="Last Name" hasFeedback>
                <Input
                  name="lastName"
                  value={lastName}
                  disabled={!editMode}
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  onChange={e => this.handleInput(e)}
                />
              </FormItem>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormItem label="Email" hasFeedback>
                <Input
                  name="email"
                  value={email}
                  disabled={!editMode}
                  prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                  type="email"
                  onChange={e => this.handleInput(e)}
                />
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem label="Phone" hasFeedback>
                <Input
                  name="phone"
                  value={phone}
                  disabled={!editMode}
                  prefix={<Icon type="phone" style={{ fontSize: 13 }} />}
                  type="number"
                  onChange={e => this.handleInput(e)}
                />
              </FormItem>
            </Col>
          </Row>

          <div className="text-center pt-3">
            {editMode ? (
              <>
                <Button type="primary" htmlType="submit" className="btn-cta mr-2">
                  Save
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-cta"
                  onClick={() => {
                    this.onCancel();
                    this.toggleEdit();
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-cta mr-2"
                  onClick={this.toggleEdit}
                >
                  Edit
                </Button>
                {/* <ChangePassword /> */}
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`${match.url}/change-password`}
                  className="ant-btn btn-cta ant-btn-primary text-white"
                >
                  Change Password
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}

const WrappedAdmin = Form.create()(withRouter(Admin));

export default WrappedAdmin;
