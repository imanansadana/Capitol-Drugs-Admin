import React, { useRef } from 'react';
import { Form, Input, Tooltip, Icon, Button, Select, Spin } from 'antd';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import DragAndDrop from '../../../../form/routes/form-control/routes/upload/components/DragAndDrop';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';
import productImage from '../../../../../assets/images/productImage.png';
import cx from 'classnames';
import { createGlobalStyle } from 'styled-components';
import CKEditor from '../../../../../components/CKEditor';

const FormItem = Form.Item;
const Option = Select.Option;

const children = [];

const defaultState = {
  subcategory_id: '',
  store_id: '',
  category_id: '',
  name: '',
  description: '',
  price: '',
  unit: '',
  ingredients: '',
  directions_to_use: '',
};
class FormComponent extends React.Component {
  state = {
    confirmDirty: false,
    categories: [],
    subcategories: [],
    store: [],
    ...(this.props.type === 'edit' ? this.props.editData : defaultState),
    isLoading: false,
    apiError: '',
    error: {
      errorText: '',
      errorType: '',
    },
  };

  handleTagsChange = (state, value) => {
    this.clearError();
    this.setState({ [state]: value });
    console.log(`rrrr selected  ${value} `);
  };
  handleEditor = (state, content) => {
    this.clearError();
    this.setState({ [state]: content });
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
  handleSelect = (name, value) => {
    this.clearError();
    this.setState({ [name]: value });
  };

  addNewApi = () => {
    const {
      subcategory_id = '',
      category_id = '',
      name,
      description,
      price,
      unit,
      store_id,

      ingredients,
      directions_to_use,
    } = this.state;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .post(
        `${backendUrl}/add-product`,
        {
          name,
          description,
          price,
          unit,
          ingredients,
          directions_to_use,
          category_id,
          store_id,
          product_image: '',
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
  editApi = () => {
    const {
      subcategory_id = '',
      category_id = '',
      name,
      description,
      price,
      unit,
      store_id,

      ingredients = [],
      directions_to_use,
    } = this.state;
    const { match, history } = this.props;
    const { _id } = this.props.editData;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;
    axios
      .patch(
        `${backendUrl}/edit-product/${_id}`,
        {
          name,
          description,
          price,
          unit,
          ingredients,
          directions_to_use,
          category_id,
          store_id,
          product_image: '',
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
  getStoreApi = () => {
    var self = this;
    const { type = 'add' } = this.props;
    const authToken = localStorage.getItem('access_token');

    axios
      .get(`${backendUrl}/get-store`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res ss', response.data.data);
        if (response) {
          self.setState({
            store: response.data.data,
            store_id:
              type === 'add'
                ? localStorage.getItem('store_id')
                  ? localStorage.getItem('store_id')
                  : ''
                : self.props.editData.store_id
                ? self.props.editData.store_id
                : '',
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

  validateForm = () => {
    const {
      name,
      description,
      price,
      unit,
      store_id,
      category_id,
      ingredients,
      directions_to_use,
    } = this.state;
    if (store_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select A Store',
          errorType: 'store_id',
        },
      });
      return false;
    }
    if (category_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select A Category',
          errorType: 'category_id',
        },
      });
      return false;
    }
    if (name === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Product Name',
          errorType: 'name',
        },
      });
      return false;
    }
    if (description === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Description',
          errorType: 'description',
        },
      });
      return false;
    }
    if (price === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Price',
          errorType: 'price',
        },
      });
      return false;
    }
    if (unit === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Unit',
          errorType: 'unit',
        },
      });
      return false;
    }

    // if (subcategory_id === '') {
    //   this.setState({
    //     error: {
    //       errorText: 'Please Select A Subcategory',
    //       errorType: 'subcategory_id',
    //     },
    //   });
    //   return false;
    // }

    if (ingredients === '') {
      this.setState({
        error: {
          errorText: 'Please Add Ingredient',
          errorType: 'ingredients',
        },
      });
      return false;
    }
    if (directions_to_use === '') {
      this.setState({
        error: {
          errorText: 'Please Enter How To Use',
          errorType: 'directions_to_use',
        },
      });
      return false;
    }
    return true;
  };
  componentDidMount() {
    this.getStoreApi();
    this.getCategoriesApi();
  }
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
    const {
      categories,
      subcategories,
      category_id,
      name,
      description,
      price,
      unit,
      store_id,
      store,
      directions_to_use,
      store_image,
      isLoading,
      apiError,
      error,
      ingredients,
    } = this.state;
    const { type = 'add', editData, match, history } = this.props;

    const { errorType, errorText } = error;

    console.log(`rrrr selected nnnn `, ingredients);
    console.log('rrrr pppp', this.props, 'rrrr sss', this.state);

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
        <GlobalStyle />
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
        <Row form>
          <Col md={6}>
            <FormItem
              label="Store"
              hasFeedback
              className={cx({ 'has-error': errorType === 'store' })}
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
                onChange={e => this.handleSelect('category_id', e)}
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
        </Row>
        <FormItem
          label="Product Name"
          hasFeedback
          className={cx({ 'has-error': errorType === 'name' })}
        >
          <Input name="productName" name="name" value={name} onChange={this.handleInput} />
          {this.errorShow('name')}
        </FormItem>
        {/* <FormItem label="Description" className={cx({ 'has-error': errorType === 'description' })}>
          <Input.TextArea name="description" value={description} onChange={this.handleInput} />
          {this.errorShow('description')}
        </FormItem> */}
        {/* <FormItem label="Description" className={cx({ 'has-error': errorType === 'description' })}>
          <Editor value={description} onBlurHandler={this.handleEditor} />

          {this.errorShow('description')}
        </FormItem> */}
        <FormItem label="Description" className={cx({ 'has-error': errorType === 'description' })}>
          <CKEditor name="description" value={description} onUpdate={this.handleEditor} />
          {this.errorShow('description')}
        </FormItem>
        <Row form>
          <Col md={6}>
            <FormItem
              label="Price"
              hasFeedback
              className={cx({ 'has-error': errorType === 'price' })}
            >
              <Input
                name="productName"
                prefix={<i className="fas fa-dollar-sign" />}
                name="price"
                value={price}
                onChange={this.handleInput}
              />
              {this.errorShow('price')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Unit"
              hasFeedback
              className={cx({ 'has-error': errorType === 'unit' })}
            >
              <Input name="productName" name="unit" value={unit} onChange={this.handleInput} />
              {this.errorShow('unit')}
            </FormItem>
          </Col>
        </Row>

        <FormItem
          label="Product - Ingredients"
          className={cx({ 'has-error': errorType === 'ingredients' })}
        >
          <CKEditor name="ingredients" value={ingredients} onUpdate={this.handleEditor} />
          {/* <Select
            mode="tags"
            name="ingredients"
            style={{ width: '100%' }}
            searchPlaceholder="Ingredients"
            onChange={e => this.handleTagsChange('ingredients', e)}
            defaultValue={ingredients}
          ></Select> */}
          {this.errorShow('ingredients')}
        </FormItem>

        <FormItem
          label="Product - How To Use"
          className={cx({ 'has-error': errorType === 'directions_to_use' })}
        >
          <CKEditor
            name="directions_to_use"
            value={directions_to_use}
            onUpdate={this.handleEditor}
          />
          {/* <Select
            mode="tags"
            name="directions_to_use"
            style={{ width: '100%' }}
            searchPlaceholder="How to use"
            onChange={e => this.handleTagsChange('directions_to_use', e)}
            defaultValue={directions_to_use}
          ></Select> */}
          {this.errorShow('directions_to_use')}
        </FormItem>
        {type === 'add' && (
          <FormItem label="Add Product Image">
            <DragAndDrop />
          </FormItem>
        )}

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

const WrappedFormComponent = Form.create()(withRouter(FormComponent));

export default WrappedFormComponent;

const GlobalStyle = createGlobalStyle`.ant-select-dropdown--multiple{display:none}`;
