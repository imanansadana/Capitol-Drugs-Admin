import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Spin } from 'antd';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import DEMO from 'constants/demoData';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';
import cx from 'classnames';
import avatarImage from '../../../../../assets/images/avatar.jpg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const FormItem = Form.Item;
const validateEmail = email => {
  var re = /^(([^<>()\]\\.,;:\s@“]+(\.[^<>()\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const defaultState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  address: '',
  address2: '',
  latitude: '',
  longitude: '',
  city: '',
  personState: '',
  postal_code: '',
  country: '',
};

class MainForm extends React.Component {
  state = {
    confirmDirty: false,
    ...(this.props.type === 'edit' ? this.props.editData : defaultState),
    confirmPassword: '',
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
  handleAdress = e => {
    this.clearError();
    console.log('rrrr aaaaaa', e);
    this.setState({ address: e.description, latitude: e.latitude, longitude: e.longitude });
  };

  handleAddressChange = address => {
    this.setState({ address });
  };
  handleAddressSelect = async address => {
    const getLatLngAddress = await geocodeByAddress(address);
    // .then(results => getLatLng(results[0]))
    // .then(latLng => {
    //   console.log('Success', latLng);
    // })
    // .catch(error => console.error('Error', error));

    console.log('rrrr getLatLngAddress', getLatLngAddress);
    this.setState({
      address,
      latitude: getLatLngAddress[0].geometry.location.lat(),
      longitude: getLatLngAddress[0].geometry.location.lng(),
    });
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
    this.clearError();
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewData = () => {
    const {
      first_name,
      last_name,
      email,
      address,
      latitude,
      longitude,
      phone,
      country_code,
      profile_image,
      address2,
      city,
      personState,
      postal_code,
      country,
    } = this.state;
    const { match, history } = this.props;
    console.log('rrrr c form', match);

    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .post(
        `${backendUrl}/add-subadmin`,
        {
          // email: 'test@gmail.com',

          address,
          latitude,
          longitude,
          phone,
          country_code: '+91',
          profile_image: '',
          email,
          first_name,
          last_name,
          address2,
          city,
          personState,
          postal_code,
          country,
          // address: 'test',
          // latitude: '123',
          // longitude: '231',
          // phone: '9999999999',
          // country_code: '+91',
          // profile_image: '',
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
    const {
      first_name,
      last_name,
      email,
      address,
      latitude,
      longitude,
      phone,
      country_code,
      profile_image,
      address2,
      city,
      personState,
      postal_code,
      country,
    } = this.state;
    const { _id } = this.props.editData;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .patch(
        `${backendUrl}/edit-subadmin/${_id}`,
        {
          address,
          latitude,
          longitude,
          phone,
          country_code: '+91',
          profile_image: '',
          email,
          first_name,
          last_name,
          address2,
          city,
          personState,
          postal_code,
          country,
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
    const {
      first_name,
      last_name,
      email,
      // address,
      latitude,
      longitude,
      phone,
      country_code,
      profile_image,
      address,

      city,
      personState,
      postal_code,
      country,
    } = this.state;

    if (first_name === '') {
      this.setState({
        error: {
          errorText: 'Please Enter First Name',
          errorType: 'first_name',
        },
      });
      return false;
    }
    if (last_name === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Last Name',
          errorType: 'last_name',
        },
      });
      return false;
    }
    if (email === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Email',
          errorType: 'email',
        },
      });
      return false;
    }
    if (!validateEmail(email)) {
      this.setState({
        error: {
          errorText: 'Please Enter A Valid Email',
          errorType: 'email',
        },
      });
      return false;
    }
    if (phone === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Phone Number',
          errorType: 'phone',
        },
      });
      return false;
    } else if (phone.length > 10 || phone.length < 10) {
      this.setState({
        error: {
          errorText: 'Please enter valid phone number',
          errorType: 'phone',
        },
      });
      return false;
    }
    if (address === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Address',
          errorType: 'address',
        },
      });
      return false;
    }
    if (city === '') {
      this.setState({
        error: {
          errorText: 'Please Enter City',
          errorType: 'city',
        },
      });
      return false;
    }
    if (personState === '') {
      this.setState({
        error: {
          errorText: 'Please Enter State',
          errorType: 'personState',
        },
      });
      return false;
    }
    if (postal_code === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Postal Code',
          errorType: 'postal_code',
        },
      });
      return false;
    }
    if (country === '') {
      this.setState({
        error: {
          errorText: 'Please Enter country',
          errorType: 'country',
        },
      });
      return false;
    }
    return true;
  };
  handleAddData = () => {
    if (this.validateForm()) {
      this.addNewData();
    }
  };
  handleEditData = () => {
    if (this.validateForm()) {
      this.editApi();
    }
  };
  render() {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      isLoading,
      apiError,
      error,
      address,
      address2,
      city,
      personState,
      postal_code,
      country,
    } = this.state;
    const { errorType, errorText } = error;
    const { type = 'add', editData, match, history } = this.props;
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
    console.log('rrrr ppp', this.props);

    return (
      <div className="form-container">
        {type === 'edit' && (
          <>
            <div className="text-center mb-3">
              <img src={avatarImage} alt="" style={{ width: 100, height: 100 }} />
            </div>
            <p className="text-center">
              <b>Status:</b>{' '}
              <b className={`text-${this.props.editData.status === 0 ? 'success' : 'danger'}`}>
                {this.props.editData.status === 0 ? 'Available' : 'Blocked'}
              </b>
            </p>
          </>
        )}
        <Row form>
          <Col md={6}>
            <FormItem
              label="First Name"
              hasFeedback
              className={cx({ 'has-error': errorType === 'first_name' })}
            >
              <Input
                name="first_name"
                value={first_name}
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                onChange={e => this.handleInput(e)}
              />
              {this.errorShow('first_name')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Last Name"
              hasFeedback
              className={cx({ 'has-error': errorType === 'last_name' })}
            >
              <Input
                name="last_name"
                value={last_name}
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                onChange={e => this.handleInput(e)}
              />
              {this.errorShow('last_name')}
            </FormItem>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormItem
              label="Email"
              hasFeedback
              className={cx({ 'has-error': errorType === 'email' })}
            >
              <Input
                name="email"
                value={email}
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                type="email"
                onChange={e => this.handleInput(e)}
              />
              {this.errorShow('email')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Phone"
              hasFeedback
              className={cx({ 'has-error': errorType === 'phone' })}
            >
              <Input
                name="phone"
                value={phone}
                prefix={<Icon type="phone" style={{ fontSize: 13 }} />}
                type="number"
                onChange={e => this.handleInput(e)}
              />
              {this.errorShow('phone')}
            </FormItem>
          </Col>
        </Row>
        {type === 'add' && (
          <Row form>
            <Col md={6}>
              <FormItem
                label="Password"
                hasFeedback
                className={cx({ 'has-error': errorType === 'Password' })}
              >
                <Input
                  name="password"
                  password={password}
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  onChange={e => this.handleInput(e)}
                />
                {this.errorShow('Password')}
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem label="Confirm Password" hasFeedback>
                <Input
                  name="confirmPassword"
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  onChange={e => this.handleInput(e)}
                />
              </FormItem>
            </Col>
          </Row>
        )}
        <FormItem
          label="Address / Location"
          className={cx({ 'has-error': errorType === 'address' })}
        >
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleAddressChange}
            onSelect={this.handleAddressSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'ant-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {this.errorShow('address')}
        </FormItem>
        <FormItem label="Address2 / Location2" hasFeedback>
          <Input
            name="address2"
            value={address2}
            placeholder="Address 2"
            onChange={this.handleInput}
          />
          {this.errorShow('phone')}
        </FormItem>
        <Row form>
          <Col md={6}>
            <FormItem
              label="City"
              hasFeedback
              className={cx({ 'has-error': errorType === 'city' })}
            >
              <Input
                name="city"
                value={city}
                prefix={<i className="fas fa-city" />}
                onChange={this.handleInput}
              />
              {this.errorShow('city')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="State"
              hasFeedback
              className={cx({ 'has-error': errorType === 'personState' })}
            >
              <Input
                name="personState"
                prefix={<i class="fas fa-map-marker-alt"></i>}
                value={personState}
                onChange={this.handleInput}
              />
              {this.errorShow('personState')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Postal Code"
              hasFeedback
              className={cx({ 'has-error': errorType === 'postal_code' })}
            >
              <Input
                name="postal_code"
                prefix={<i className="fas fa-thumbtack"></i>}
                value={postal_code}
                onChange={this.handleInput}
              />
              {this.errorShow('postal_code')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="country"
              hasFeedback
              className={cx({ 'has-error': errorType === 'country' })}
            >
              <Input
                name="country"
                prefix={<i className="far fa-flag"></i>}
                value={country}
                onChange={this.handleInput}
              />
              {this.errorShow('country')}
            </FormItem>
          </Col>
        </Row>
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
            >
              <Icon type="plus-circle" theme="filled" />
              Add
            </Button>
          )}
          {type === 'edit' && (
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleEditData}
              className="btn-cta"
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

const WrappedMainForm = Form.create()(withRouter(MainForm));

export default WrappedMainForm;
