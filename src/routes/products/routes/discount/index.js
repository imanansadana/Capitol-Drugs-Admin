import React from 'react';
import { Table, Icon, Select, Form, DatePicker, Button } from 'antd';
import axios from 'axios';
import Add from './add';
import Delete from './delete';
import { Link } from 'react-router-dom';
import { backendUrl } from '../../../../common/credentials';
import { BlockModal } from '../../../../components/Modal';
import styled from 'styled-components';
import { DiscountStatistics } from '../../../../components/Cards';
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SubCategories extends React.Component {
  state = {
    startDate: '',
    endDate: '',
    listData: [],
    store: [],
    categories: [],
    subcategories: [],
    store: [],
    filterData: [],
    store_id: localStorage.getItem('store_id') ? localStorage.getItem('store_id') : '',
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
  getDataApi = () => {
    var self = this;
    const { store_id } = this.state;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-discount/${store_id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
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
    const { store_id, startDate, endDate } = this.state;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-discount/${store_id}?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
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
      .get(`${backendUrl}/get-discount/${id}`, {
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
  componentDidMount() {
    this.getCategoriesApi();
    this.getStoreApi();
    this.getSubCategoriesApi();
    this.getDataApi();
  }
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
    const { listData, categories, subcategories, store, startDate, endDate } = this.state;

    const columns = [
      {
        title: 'Offer Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Offer Price',
        dataIndex: 'offer_price',
        key: 'offer_price',
      },
      // {
      //   title: 'Store',
      //   key: 'stroe',
      //   render: (text, row) => {
      //     const filterRecord = store.filter(data => data._id === text.store_id);
      //     return filterRecord.length > 0 && filterRecord[0].name ? (
      //       filterRecord[0].name
      //     ) : (
      //       <center>-</center>
      //     );
      //   },
      // },
      {
        title: 'Categorie',
        key: 'categorie',
        render: (text, row) => {
          const filterRecord = categories.filter(data => data._id === text.category_id);
          return filterRecord.length > 0 && filterRecord[0].title ? (
            filterRecord[0].title
          ) : (
            <center>-</center>
          );
        },
      },
      {
        title: 'Sub Categorie',
        key: 'subcategorie',
        render: (text, row) => {
          const filterRecord = subcategories.filter(data => data._id === text.sub_category_id);
          return filterRecord.length > 0 && filterRecord[0].title ? (
            filterRecord[0].title
          ) : (
            <center>-</center>
          );
        },
      },
      {
        title: 'Status',
        key: 'name',
        render: (text, record) => (
          <b className={`text-${text.status === 0 ? 'success' : 'danger'}`}>
            {text.status === 0 ? 'Active' : 'Inactive'}
          </b>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span className="d-flex">
            <Link
              to={{ pathname: `${match.url}/edit`, state: text }}
              className="ant-btn ant-btn-primary ant-btn-circle"
            >
              <Icon type="edit" theme="filled" />
            </Link>
            <Delete recordData={text} />
            <BlockModal
              recordData={text}
              api={text.status === 0 ? 'block-discount' : 'unblock-discount'}
              type={text.status === 0 ? 'block' : 'unblock'}
            />
          </span>
        ),
        width: 140,
      },
    ];
    console.log('rrrr sss', listData, 'ccc', columns);
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    return (
      <>
        <DiscountStatistics
          total={listData.length}
          active={listData.filter(({ status }) => status === 0).length}
          inactive={listData.filter(({ status }) => status === 1).length}
          store={this.selectedStore()}
        />

        <section className="container-fluid container-mw-xxl no-breadcrumb chapter">
          <article className="article pb-0">
            <div className="d-flex justify-content-between mb-2">
              <div>
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
              <Link to={`${match.url}/add`} className="ml-2 ant-btn ant-btn-primary">
                <Icon type="plus-circle" theme="filled" /> Add
              </Link>
            </div>
            <Table
              columns={columns}
              dataSource={listData}
              className="ant-table-v1"
              scroll={{ x: 1000 }}
            />
          </article>
        </section>
      </>
    );
  }
}

export default SubCategories;
const SelectStore = styled('div')`
  .ant-select {
    min-width: 200px;
  }
`;
