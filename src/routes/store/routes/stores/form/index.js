import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Select } from 'antd';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import DragAndDrop from '../../../../form/routes/form-control/routes/upload/components/DragAndDrop';
import axios from 'axios';
import productImage from '../../../../../assets/images/productImage.png';
import { backendUrl } from '../../../../../common/credentials';
import { Spin } from 'antd';
import cx from 'classnames';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
const FormItem = Form.Item;
const validateEmail = email => {
  var re = /^(([^<>()\]\\.,;:\s@“]+(\.[^<>()\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const defaultState = {
  name: '',
  email: '',
  address: '',
  phone: '',
  country_code: '',
  store_image: '',
  latitude: '',
  longitude: '',
  address2: '',
  city: '',
  personState: '',
  postal_code: '',
  country: '',
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

  handleInput = e => {
    this.clearError();
    this.setState({ [e.target.name]: e.target.value });
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
  addNewStore = () => {
    const { match, history } = this.props;
    const {
      name,
      email,
      address,
      latitude,
      longitude,
      phone,
      country_code,
      store_image,
      address2,
      city,
      personState,
      postal_code,
      country,
    } = this.state;
    const authToken = localStorage.getItem('access_token');

    this.setState({ isLoading: true });
    const self = this;
    axios
      .post(
        `${backendUrl}/add-store`,
        {
          email,
          name,
          address,
          latitude,
          longitude,
          phone,
          address2,
          city,
          personState,
          postal_code,
          country,
          country_code: '+91',
          store_image: '',
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
        self.setState({
          isLoading: false,
          apiError: error.toString().includes('Network Error')
            ? 'Network Error'
            : 'Somthing went wrong',
        });
        setTimeout(() => self.setState({ apiError: '' }), 3000);
        console.log('rrrr err', error);
      });
  };
  editStore = () => {
    const { match, history } = this.props;
    const {
      name,
      email,
      address,
      latitude,
      longitude,
      phone,
      address2,
      city,
      personState,
      postal_code,
      country,
      country_code,
      store_image,
    } = this.state;
    const { _id } = this.props.editData;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .patch(
        `${backendUrl}/edit-store/${_id}`,
        {
          email,
          name,
          address,
          latitude,
          longitude,
          phone,
          address2,
          city,
          personState,
          postal_code,
          country,
          country_code: '+91',
          store_image: '',
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
        history.push(
          match.url
            .split('/')
            .slice(0, -1)
            .join('/')
        );
        self.setState({ isLoading: false });
        console.log('rrrr res', response);
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
    const {
      name,
      email,
      address,
      latitude,
      longitude,
      phone,
      country_code,
      store_image,
      city,
      personState,
      postal_code,
      country,
    } = this.state;
    if (name === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Store Name',
          errorType: 'name',
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
  handleAddStore = () => {
    this.clearError();
    if (this.validateForm()) {
      this.addNewStore();
    }
  };
  handleEditStore = () => {
    this.clearError();
    if (this.validateForm()) {
      this.editStore();
    }
  };

  form;
  render() {
    const { type = 'add', editData, match, history } = this.props;
    const {
      name,
      email,
      address,
      address2,
      latitude,
      longitude,
      phone,
      country_code,
      store_image,
      isLoading,
      apiError,
      error,
      city,
      personState,
      postal_code,
      country,
    } = this.state;
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
    const { errorType, errorText } = error;
    console.log('rrrr sssss', this.state);
    return (
      <div className="form-container">
        {type === 'edit' && (
          <>
            <div className="text-center mb-3">
              <img
                src={productImage}
                alt=""
                style={{ width: 100, height: 100, objectFit: 'contain' }}
              />
            </div>
            <p className="text-center">
              <b>Status:</b>{' '}
              <b className={`text-${this.props.editData.status === 0 ? 'success' : 'danger'}`}>
                {this.props.editData.status === 0 ? 'Available' : 'Blocked'}
              </b>
            </p>
          </>
        )}
        <FormItem
          label="Store Name"
          hasFeedback
          className={cx({ 'has-error': errorType === 'name' })}
        >
          <Input
            name="name"
            prefix={<Icon type="shop" style={{ fontSize: 13 }} />}
            value={name}
            onChange={this.handleInput}
          />
          {this.errorShow('name')}
        </FormItem>
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
                onChange={this.handleInput}
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
                prefix={<Icon type="phone" style={{ fontSize: 13 }} />}
                value={phone}
                onChange={this.handleInput}
              />
              {this.errorShow('phone')}
            </FormItem>
          </Col>
        </Row>
        {/* <FormItem
          label="Address / Location"
          className={cx({ 'has-error': errorType === 'address' })}
        >
          <Input.TextArea name="address" value={address} onChange={this.handleInput} />
          {this.errorShow('address')}
        </FormItem> */}
        {/* <FormItem
          label="Address / Location"
          className={cx({ 'has-error': errorType === 'address' })}
        >
          <GooglePlacesAutocomplete
            // bounds={latitude ? [latitude, longitude] : null}
            inputClassName="ant-input"
            onSelect={this.handleAdress}
          />
          {this.errorShow('address')}
        </FormItem> */}

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
              onClick={this.handleAddStore}
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
              onClick={this.handleEditStore}
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
