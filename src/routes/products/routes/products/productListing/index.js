import React from 'react';
import { Table, Icon, Form, Input, DatePicker, Button, Select } from 'antd';
import DEMO from 'constants/demoData';
import AddProduct from '../addProduct';
import { Link } from 'react-router-dom';
import productImage from '../../../../../assets/images/productImage.png';
import classes from './style.module.scss';
import DeleteProduct from '../deleteProduct';
import EditProduct from '../editProduct';
import axios from 'axios';
import { backendUrl } from '../../../../../common/credentials';
import { BlockModal } from '../../../../../components/Modal';
import { ProducInfoCard } from '../../../../../components/Cards';
import styled from 'styled-components';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      store: [],
      store_id: localStorage.getItem('store_id') ? localStorage.getItem('store_id') : '',
      listData: [],
      categories: [],
      subcategories: [],
      search: '',
      filterData: [],
      stockFilter: 0,
    };
    this.selectedStore = this.selectedStore.bind(this);
  }

  getCategoryApi = () => {
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-category`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr category res', response.data.data);
        if (response) {
          self.setState({
            categories: response.data.data,
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr category err', error);
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
            store_id: localStorage.getItem('store_id') ? localStorage.getItem('store_id') : '',
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  getDataApi = () => {
    var self = this;
    const { store_id } = this.state;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-product/${store_id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log(
          'rrrr res mmmm',
          response.data.data,
          response.data.data[0].store_id,
          self.state.store_id,
          response.data.data.filter(data => data.store_id === self.state.store_id)
        );
        if (response) {
          self.setState({
            listData: response.data.data,
            filterData: response.data.data.filter(
              data => self.store_id !== '' && self.state.store_id === data.store_id
            ),
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  getDataRangeApi = () => {
    var self = this;
    const { store_id } = this.state;
    const { startDate, endDate } = this.state;
    this.setState({ listData: [] });
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-product/${store_id}?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log(
          'rrrr res mmmm',
          response.data.data,
          response.data.data[0].store_id,
          self.state.store_id,
          response.data.data.filter(data => data.store_id === self.state.store_id)
        );
        if (response) {
          self.setState({
            listData: response.data.data,
            filterData: response.data.data.filter(
              data => self.store_id !== '' && self.state.store_id === data.store_id
            ),
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  getDataApiWithStoreId = id => {
    var self = this;
    const { store_id } = this.state;
    this.setState({ listData: [], startDate: '', endDate: '' });

    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-product/${id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log(
          'rrrr res mmmm',
          response.data.data,
          response.data.data[0].store_id,
          self.state.store_id,
          response.data.data.filter(data => data.store_id === self.state.store_id)
        );
        if (response) {
          self.setState({
            listData: response.data.data,
            filterData: response.data.data.filter(
              data => self.store_id !== '' && self.state.store_id === data.store_id
            ),
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  componentDidMount() {
    this.getCategoryApi();
    // this.getSubCategoriesApi();
    this.getStoreApi();
    this.getDataApi();
  }
  handleSearch = e => {
    const { listData } = this.state;
    const filterDataHolder = [
      ...listData.filter(({ name, store_id }) =>
        name.toLowerCase().includes(
          e.target.value.trim().toLowerCase()
          // && store_id === this.state.store_id
        )
      ),
    ];
    this.setState({
      [e.target.name]: e.target.value,
      filterData: filterDataHolder,
      stockFilter: 0,
    });
  };
  handleStockFilter = stock => {
    const { listData, stockFilter } = this.state;

    let filterDataHolder = [];
    if (stockFilter === stock) {
      filterDataHolder = [...listData.filter(({ store_id }) => store_id === this.state.store_id)];
    } else {
      filterDataHolder = [
        ...listData.filter(
          ({ status, store_id }) =>
            ((stock === 1 && status === 0) || (stock === 2 && status === 1)) &&
            store_id === this.state.store_id
        ),
      ];
    }

    this.setState({
      search: '',
      stockFilter: stock !== stockFilter ? stock : 0,
      filterData: filterDataHolder,
    });
  };
  handleSelect = (name, value) => {
    const { listData } = this.state;

    console.log(
      'rrrr handleSelect',
      listData,
      listData.filter(({ store_id }) => store_id === value)
    );
    // const filterDataHolder = [...listData.filter(({ store_id }) => store_id === value)];
    this.setState({ [name]: value, stockFilter: 0 });
    this.getDataApiWithStoreId(value);
    if (!localStorage.getItem('store_id')) {
      localStorage.setItem('store_id', value);
    }
  };
  selectedStore() {
    const { store, store_id } = this.state;
    return (
      <SelectStore>
        <FormItem label="Choose Store" hasFeedback className="mb-0 d-flex align-items-center">
          <Select
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
        </FormItem>
      </SelectStore>
    );
  }
  onDateChange = (date, dateString) => {
    console.log('eee', date, 'dddd', dateString);
    this.setState({ startDate: dateString[0], endDate: dateString[1] });
  };
  onRangeSearch = () => {
    this.getDataRangeApi();
  };
  render() {
    const { match } = this.props;
    const {
      listData,
      categories,
      subcategories,
      store,
      filterData,
      search,
      stockFilter,
      startDate,
    } = this.state;
    console.log('rrrr ssssss', this.state);
    const columns = [
      {
        title: 'Product Image',
        dataIndex: 'image',
        key: 'image',
        render: src => (
          <div className="text-center">
            <img className={classes.productImage} src={src || productImage} />
          </div>
        ),
        width: 105,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href={DEMO.link}>{text}</a>,
        width: 100,
      },
      // {
      //   title: 'Store',
      //   key: 'store',
      //   render: (text, row) => {
      //     const filterRecord = store.filter(data => data._id === text.store_id);
      //     return filterRecord.length > 0 && filterRecord[0].name ? (
      //       filterRecord[0].name
      //     ) : (
      //       <center>-</center>
      //     );
      //   },
      //   width: 100,
      // },
      {
        title: 'Categories',
        key: 'categories',
        render: (text, row) => {
          const filterRecord = categories.filter(data => data._id === text.category_id);
          return filterRecord.length > 0 && filterRecord[0].title ? (
            filterRecord[0].title
          ) : (
            <center>-</center>
          );
        },
        width: 120,
      },
      // {
      //   title: 'Desctiption',
      //   dataIndex: 'description',
      //   key: 'description',
      //   width: 110,
      // },
      // {
      //   title: 'Ingredients',
      //   dataIndex: 'ingredients',
      //   key: 'ingredients',
      //   render: (dataList = []) => dataList.join(', '),
      //   width: 160,
      // },
      {
        title: 'Sku',
        dataIndex: 'sku',
        key: 'sku',
        width: 120,
      },
      {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
        width: 120,
      },
      {
        title: 'Price',
        dataIndex: ['price'],
        key: 'price',
        render: (text, row) => row.currency + text,
        width: 120,
      },
      // {
      //   title: 'How to use',
      //   dataIndex: 'directions_to_use',
      //   key: 'directions_to_use',
      //   render: (dataList = []) => dataList.join(', '),
      //   width: 200,
      // },
      {
        title: 'Status',
        key: 'status',
        render: (text, record) => (
          <b className={`text-${text.status === 0 ? 'success' : 'danger'}`}>
            {text.status === 0 ? 'In Stock' : 'Out Of Stock'}
          </b>
        ),
        width: 120,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          const filterStore = store.filter(data => data._id === text.store_id);
          const storeName = filterStore.length > 0 && filterStore[0].name;

          const filterCategories = categories.filter(data => data._id === text.category_id);
          const categoryName =
            filterCategories.length > 0 && filterCategories[0].title ? (
              filterCategories[0].title
            ) : (
              <center>-</center>
            );

          const filterData = {
            ...text,
            image: productImage,
            viewData: true,
            category: categoryName,
            store: storeName,
          };
          return (
            <div className="d-flex">
              <Link
                to={{ pathname: `${match.url}/preview`, state: filterData }}
                className="ant-btn ant-btn-primary ant-btn-circle"
              >
                <Icon type="eye" theme="filled" />
              </Link>
              <Link
                to={{ pathname: `${match.url}/edit`, state: text }}
                className="ml-2 ant-btn ant-btn-primary ant-btn-circle"
              >
                <Icon type="edit" theme="filled" />
              </Link>
              <DeleteProduct recordData={text} />
              <BlockModal
                recordData={text}
                api={text.status === 0 ? 'block-product' : 'unblock-product'}
                type={text.status === 0 ? 'block' : 'unblock'}
                btnText
                blockText="remove from stock"
                unblockText="add in stock"
                blockBtnText="Remove From Stock"
                unblockBtnText="Add To Stock"
              />
            </div>
          );
        },
        width: 166,
      },
    ];
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    return (
      <>
        <ProducInfoCard
          total={listData.length}
          active={listData.filter(({ status }) => status === 0).length}
          inactive={listData.filter(({ status }) => status === 1).length}
          store={this.selectedStore()}
        />

        <section className="container-fluid container-mw-xxl no-breadcrumb chapter pb-2">
          <article className="article pb-0">
            <div className="d-flex justify-content-end">
              <RangePicker
                style={{ width: 270 }}
                onChange={this.onDateChange}
                format={dateFormat}
              />
              <Button
                className="ml-2"
                onClick={() => this.onRangeSearch()}
                type="primary"
                disabled={startDate === ''}
              >
                Search
              </Button>
              {startDate !== '' && (
                <Button className="ml-2" onClick={() => window.location.reload()} type="danger">
                  Reset
                </Button>
              )}
            </div>
          </article>
        </section>
        <section className="container-fluid container-mw-xxl no-breadcrumb chapter pt-0">
          <article className="article">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <FormItem>
                  <Input
                    placeholder="Search"
                    prefix={<Icon type="search" style={{ fontSize: 13 }} />}
                    name="search"
                    value={search}
                    onChange={this.handleSearch}
                  />
                </FormItem>
              </div>
              <div className="d-flex">
                <div>
                  <Button
                    className="mx-2"
                    onClick={() => this.handleStockFilter(1)}
                    type={stockFilter === 1 ? 'primary' : 'secondary'}
                  >
                    In Stock
                  </Button>
                  <Button
                    className="mr-2"
                    onClick={() => this.handleStockFilter(2)}
                    type={stockFilter === 2 ? 'primary' : 'secondary'}
                  >
                    Out Of Stock
                  </Button>

                  <Link to={`${match.url}/add`} className="ant-btn ant-btn-primary">
                    <Icon type="plus-circle" theme="filled" /> Add
                  </Link>
                </div>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={filterData}
              className="ant-table-v1"
              scroll={{ x: 1200 }}
            />
          </article>
        </section>
      </>
    );
  }
}
export default Products;

const SelectStore = styled('div')`
  .ant-select {
    min-width: 200px;
  }
`;
