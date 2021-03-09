import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Select, Spin, Radio } from 'antd';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import DragAndDrop from '../../../../form/routes/form-control/routes/upload/components/DragAndDrop';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';
import cx from 'classnames';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

const defaultState = {
  name: '',
  offer_price: '',
  category_id: '',
  category_name: '',
  sub_category_id: '',
  sub_category_name: '',
  store_id: '',
  offerType: '$',
};
class FormComponent extends React.Component {
  state = {
    store: [],
    categories: [],
    subcategories: [],
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
  handleSelect = (name, value) => {
    this.clearError();
    this.setState({ [name]: value });
  };
  handleCategoriesSelect = (name, value) => {
    this.clearError();
    const filterRecord = this.state.categories.filter(data => data._id === value);
    const catName =
      filterRecord.length > 0 && filterRecord[0].title ? filterRecord[0].title : 'none';

    this.setState({ [name]: value, category_name: catName });
  };
  handleSubCategoriesSelect = (name, value) => {
    this.clearError();
    const filterRecord = this.state.subcategories.filter(data => data._id === value);
    const subcatName =
      filterRecord.length > 0 && filterRecord[0].title ? filterRecord[0].title : 'none';
    this.setState({ [name]: value, sub_category_name: subcatName });
  };
  handleRadio = (name, value) => {
    this.clearError();
    this.setState({ [name]: value });
  };
  addNewApi = () => {
    const {
      name,
      offer_price,
      category_id,
      category_name,
      sub_category_id,
      sub_category_name,
      store_id,
      offerType,
    } = this.state;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .post(
        `${backendUrl}/add-discount`,
        {
          name,
          offer_price: offer_price,
          category_id,
          category_name,
          sub_category_id,
          sub_category_name,
          store_id,
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
      name,
      description,
      offer_price,
      category_id,
      category_name,
      sub_category_id,
      sub_category_name,
      store_id,
      offerType,
    } = this.state;
    const { _id } = this.props.editData;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .patch(
        `${backendUrl}/edit-discount/${_id}`,
        {
          name,
          description,
          offer_price: offer_price,
          category_id,
          category_name,
          sub_category_id,
          sub_category_name,
          store_id,
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
  getStoreApi = () => {
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-store`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            store: response.data.data,
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  getCategoriesApi = () => {
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-category`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            categories: response.data.data,
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  getSubCategoriesApi = () => {
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-subcategory`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            subcategories: response.data.data,
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  componentDidMount() {
    this.getStoreApi();
    this.getCategoriesApi();
    this.getSubCategoriesApi();
  }
  validateForm = () => {
    const { name, offer_price, category_id, store_id, sub_category_id } = this.state;
    if (name === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Discount Name',
          errorType: 'name',
        },
      });
      return false;
    }
    if (offer_price === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Offer Price',
          errorType: 'offer_price',
        },
      });
      return false;
    }
    if (store_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select Store',
          errorType: 'store_id',
        },
      });
      return false;
    }

    if (category_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select Category',
          errorType: 'category_id',
        },
      });
      return false;
    }
    if (sub_category_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select Subcategory',
          errorType: 'sub_category_id',
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
    const {
      name,
      offerType,
      offer_price,
      isLoading,
      sub_category_id,
      category_id,
      categories,
      subcategories,
      store,
      store_id,
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
    console.log('rrrr states', this.state);
    return (
      <div className="form-container">
        <FormItem
          label="Offer Name"
          className={cx({ 'has-error': errorType === 'name' })}
          hasFeedback
        >
          <Input name="name" value={name} onChange={this.handleInput} />
          {this.errorShow('name')}
        </FormItem>
        <FormItem label="Offer Type" hasFeedback>
          <RadioGroup
            onChange={e => this.handleRadio('offerType', e.target.value)}
            value={offerType}
          >
            <Radio value="$">$ (Price)</Radio>
            <Radio value="%">% (Percentage)</Radio>
          </RadioGroup>
        </FormItem>

        <Row form>
          <Col md={6}>
            <FormItem
              label={`Offer ${offerType === '$' ? 'Price' : 'Percentage'}`}
              className={cx({ 'has-error': errorType === 'offer_price' })}
              hasFeedback
            >
              <Input name="offer_price" value={offer_price} onChange={this.handleInput} />
              {this.errorShow('offer_price')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Store"
              hasFeedback
              className={cx({ 'has-error': errorType === 'store_id' })}
            >
              <Select
                className="w-100"
                name="store_id"
                value={store_id}
                placeholder="Select Store"
                onChange={e => this.handleSelect('store_id', e)}
              >
                {store.map((data, index) => (
                  <Option key={index} value={data._id}>
                    {data.name}
                  </Option>
                ))}
              </Select>
              {this.errorShow('store_id')}
            </FormItem>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormItem
              label="Categories"
              hasFeedback
              className={cx({ 'has-error': errorType === 'category_id' })}
            >
              <Select
                className="w-100"
                name="category_id"
                value={category_id}
                placeholder="Select Category"
                onChange={e => this.handleCategoriesSelect('category_id', e)}
              >
                {categories.map((data, index) => {
                  if (data.status === 1) {
                    return null;
                  }
                  return (
                    <Option key={index} value={data._id}>
                      {data.title}
                    </Option>
                  );
                })}
              </Select>
              {this.errorShow('category_id')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Subategories"
              hasFeedback
              className={cx({ 'has-error': errorType === 'sub_category_id' })}
            >
              <Select
                className="w-100"
                name="sub_category_id"
                value={sub_category_id}
                placeholder="Select Subcategory"
                onChange={e => this.handleSubCategoriesSelect('sub_category_id', e)}
              >
                {subcategories.map((data, index) => {
                  if (data.status === 1) {
                    return null;
                  }
                  return (
                    <Option key={index} value={data._id}>
                      {data.title}
                    </Option>
                  );
                })}
              </Select>
              {this.errorShow('sub_category_id')}
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
              disabled={isLoading}
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
              className="btn-cta"
              disabled={isLoading}
              onClick={this.handleEditData}
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
