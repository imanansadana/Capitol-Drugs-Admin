import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Select, Spin } from 'antd';

import { Row, Col, Table, Collapse } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import DragAndDrop from '../../../../form/routes/form-control/routes/upload/components/DragAndDrop';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';
import cx from 'classnames';
const Option = Select.Option;
const FormItem = Form.Item;
const defaultExtraIngredients = [{ id: 1, name: '', quantity: '', price: '' }];
const defaultState = {
  name: '',
  description: '',
  price: '',
  unit: '',
  ingredients: [],
  subcategory_id: '',
  category_id: '',
  store_id: '',
  quantity: 0,
  product_image: '',
  extra_ingredients: [],
  isAddExtraIngredients: false,
};
class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.addExtraIngredientsForm = this.addExtraIngredientsForm.bind(this);
  }
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
  handleTagsChange = (state, value) => {
    this.clearError();
    this.setState({ [state]: value });
    console.log(`rrrr selected  ${value} `);
  };
  handleInput = e => {
    this.clearError();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelect = (name, value) => {
    this.setState({ [name]: value });
  };
  addNewApi = () => {
    const {
      name,
      description,
      price,
      unit,
      ingredients,

      extra_ingredients,

      subcategory_id,
      category_id,
      store_id,
      quantity = 0,
      product_image,
    } = this.state;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    this.setState({ isLoading: true });
    const self = this;

    axios
      .post(
        `${backendUrl}/add-utility`,
        {
          name,
          description,
          price,
          unit,
          ingredients,
          extra_ingredients,
          subcategory_id,
          category_id,
          store_id,
          quantity: 2,
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
      price,
      extra_ingredients,
      unit,
      ingredients,
      subcategory_id,
      category_id,
      store_id,
      quantity = 0,
      product_image,
    } = this.state;
    const { _id } = this.props.editData;
    const { match, history } = this.props;
    const authToken = localStorage.getItem('access_token');
    axios
      .patch(
        `${backendUrl}/edit-utility/${_id}`,
        {
          name,
          description,
          price,
          unit,
          ingredients,
          extra_ingredients,
          subcategory_id,
          category_id,
          store_id,
          quantity: 2,
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
      })
      .catch(function(error) {
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
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            store: response.data.data,
            store_id:
              type === 'add'
                ? localStorage.getItem('store_id')
                  ? localStorage.getItem('store_id')
                  : ''
                : self.state.store_id,
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
      .get(`${backendUrl}/get-utility-category`, {
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
      .get(`${backendUrl}/get-utility-subcategory`, {
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
    const {
      name,
      description,
      price,
      unit,
      ingredients,
      subcategory_id,
      category_id,
      store_id,
      quantity = 0,
      product_image,
      extra_ingredients,
      isAddExtraIngredients,
    } = this.state;
    if (store_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select Store',
          errorType: 'store',
        },
      });
      return false;
    }
    if (category_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select Category',
          errorType: 'category',
        },
      });
      return false;
    }
    if (subcategory_id === '') {
      this.setState({
        error: {
          errorText: 'Please Select Subcategory',
          errorType: 'subcategory',
        },
      });
      return false;
    }
    if (name === '') {
      this.setState({
        error: {
          errorText: 'Please Enter Name',
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
    if (ingredients.length === 0) {
      this.setState({
        error: {
          errorText: 'Please Add Ingredient',
          errorType: 'ingredients',
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

    if (quantity === 0 || quantity < 0) {
      this.setState({
        error: {
          errorText: 'Please Enter Quantity',
          errorType: 'quantity',
        },
      });
      return false;
    }
    if (isAddExtraIngredients) {
      const temp = [...extra_ingredients].filter(({ name, quantity, price }) => {
        if (name.trim() === '' || quantity.trim() === '' || price.trim() === '') {
          return true;
        }
        return false;
      });
      if (temp.length > 0) {
        this.setState({
          error: {
            errorText: 'Please Fill Values of Extra Ingredients',
            errorType: 'extra_ingredients',
          },
        });
        return false;
      }
    }

    return true;
  };
  handleAddData = () => {
    if (this.validateForm()) {
      this.addNewApi();
    }
  };
  handleEditData = () => {
    if (this.validateForm()) {
      this.editApi();
    }
  };

  extraIngredientsFieldHandle = (type, id) => {
    const { extra_ingredients } = this.state;

    const fields = [{ id: id, name: '', quantity: '', price: '' }];
    if (type === 'add') {
      const temp = [...extra_ingredients, ...fields];
      this.setState({ extra_ingredients: temp });
    }
    if (type === 'remove') {
      const temp = [...extra_ingredients.filter(prop => prop.id !== id)];
      this.setState({ extra_ingredients: temp });
    }
  };

  handleExtraIngredientsInput = (field, value, index) => {
    const { extra_ingredients } = this.state;

    let temp = [...extra_ingredients];
    if (field === 'name') {
      temp[index].name = value;
    }
    if (field === 'quantity') {
      temp[index].quantity = value;
    }
    if (field === 'price') {
      temp[index].price = value;
    }
    this.setState({ extraIngredients: temp });
  };
  addExtraIngredientsForm() {
    const { extra_ingredients, isAddExtraIngredients } = this.state;

    return (
      <Collapse isOpen={isAddExtraIngredients}>
        <Table className="mb-0">
          <thead>
            <tr>
              <th>Ingredient Name</th>
              <th>Quantity</th>
              <th>Price</th>
              {extra_ingredients.length > 1 && <th>Remove</th>}
            </tr>
          </thead>
          <tbody>
            {extra_ingredients.map((data, index) => {
              const { id, name, quantity, price } = data;

              return (
                <tr>
                  <td className="p-1">
                    <FormItem hasFeedback className={cx('mb-0')}>
                      <Input
                        value={name}
                        onChange={e =>
                          this.handleExtraIngredientsInput('name', e.target.value, index)
                        }
                      />
                    </FormItem>
                  </td>
                  <td className="p-1">
                    <FormItem hasFeedback className={cx('mb-0')}>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={e =>
                          this.handleExtraIngredientsInput('quantity', e.target.value, index)
                        }
                      />
                    </FormItem>
                  </td>
                  <td className="p-1">
                    <FormItem hasFeedback className={cx('mb-0')}>
                      <Input
                        type="number"
                        value={price}
                        onChange={e =>
                          this.handleExtraIngredientsInput('price', e.target.value, index)
                        }
                      />
                    </FormItem>
                  </td>
                  {extra_ingredients.length > 1 && (
                    <td className="p-1 text-center">
                      <Button
                        type="danger"
                        shape="circle"
                        onClick={() => this.extraIngredientsFieldHandle('remove', id)}
                      >
                        <Icon type="delete" theme="filled" />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {this.errorShow('extra_ingredients')}
        <div className="pt-3">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.extraIngredientsFieldHandle('add', new Date().getTime())}
          >
            <Icon type="plus-circle" theme="filled" />
            Add More
          </Button>
          <Button
            type="danger"
            htmlType="submit"
            className="ml-2"
            onClick={() =>
              this.setState({
                isAddExtraIngredients: false,
                extra_ingredients: [],
              })
            }
          >
            <Icon type="minus-circle" theme="filled" />
            Remove
          </Button>
        </div>
      </Collapse>
    );
  }
  render() {
    const { type = 'add', editData, match, history } = this.props;
    const {
      name,
      description,
      price,
      unit,
      ingredients,
      subcategory_id,
      category_id,
      store_id,
      quantity = 0,
      product_image,
      categories,
      subcategories,
      store,
      isLoading,
      apiError,
      error,
      isAddExtraIngredients,
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
    console.log('rrrr nnn', categories, subcategories, this.state);
    return (
      <div className="form-container">
        <FormItem label="Store" hasFeedback className={cx({ 'has-error': errorType === 'store' })}>
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
          {this.errorShow('store')}
        </FormItem>
        <Row form>
          <Col md={6}>
            <FormItem
              label="Categories"
              hasFeedback
              className={cx({ 'has-error': errorType === 'category' })}
            >
              <Select
                className="w-100"
                name="category_id"
                value={category_id}
                placeholder="Select Category"
                onChange={e => this.handleSelect('category_id', e)}
              >
                {categories.map((data, index) => (
                  <Option key={index} value={data._id}>
                    {data.title}
                  </Option>
                ))}
              </Select>
              {this.errorShow('category')}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem
              label="Sub Categories"
              hasFeedback
              className={cx({ 'has-error': errorType === 'subcategory' })}
            >
              <Select
                className="w-100"
                name="subcategory_id"
                value={subcategory_id}
                placeholder="Select Sub Category"
                onChange={e => this.handleSelect('subcategory_id', e)}
              >
                {subcategories.map((data, index) => (
                  <Option key={index} value={data._id}>
                    {data.title}
                  </Option>
                ))}
              </Select>
              {this.errorShow('subcategory')}
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label="Utility Name"
          hasFeedback
          className={cx({ 'has-error': errorType === 'name' })}
        >
          <Input name="name" value={name} onChange={this.handleInput} />
          {this.errorShow('name')}
        </FormItem>

        <FormItem label="Description" className={cx({ 'has-error': errorType === 'description' })}>
          <Input.TextArea name="description" value={description} onChange={this.handleInput} />
          {this.errorShow('description')}
        </FormItem>
        <FormItem label="Ingredients" className={cx({ 'has-error': errorType === 'ingredients' })}>
          <Select
            mode="tags"
            name="ingredients"
            style={{ width: '100%' }}
            searchPlaceholder="Ingredients"
            onChange={e => this.handleTagsChange('ingredients', e)}
            defaultValue={ingredients}
          ></Select>
          {this.errorShow('ingredients')}
        </FormItem>

        <Row form>
          <Col md={6}>
            <FormItem
              label="Price"
              hasFeedback
              className={cx({ 'has-error': errorType === 'price' })}
            >
              <Input
                name="price"
                value={price}
                // prefix={<Icon type="lock" style={{ fontSize: 13 }} />}

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
              <Input
                name="unit"
                // prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                value={unit}
                onChange={this.handleInput}
              />
              {this.errorShow('unit')}
            </FormItem>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormItem
              label="Quantity"
              hasFeedback
              className={cx({ 'has-error': errorType === 'quantity' })}
            >
              <Input
                name="quantity"
                value={quantity}
                // prefix={<Icon type="lock" style={{ fontSize: 13 }} />}

                onChange={this.handleInput}
              />
              {this.errorShow('quantity')}
            </FormItem>
          </Col>
          <Col md={6} className={cx({ ['pt-md-4']: !isAddExtraIngredients })}>
            {!isAddExtraIngredients && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() =>
                  this.setState({
                    isAddExtraIngredients: true,
                    extra_ingredients: defaultExtraIngredients,
                  })
                }
              >
                <Icon type="plus-circle" theme="filled" />
                Add Extra Ingredients
              </Button>
            )}
          </Col>
        </Row>

        {this.addExtraIngredientsForm()}
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
              className="btn-cta"
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
