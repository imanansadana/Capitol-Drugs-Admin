import React from 'react';
import { Table, Icon, Button, DatePicker } from 'antd';
import DEMO from 'constants/demoData';
import avatarImage from '../../../../assets/images/avatar.jpg';
import Delete from './delete';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../../common/credentials';
import { BlockModal } from '../../../../components/Modal';
const { RangePicker } = DatePicker;
class ExtraUtilities extends React.Component {
  state = {
    startDate: '',
    endDate: '',
    store: [],
    listData: [],
    categories: [],
    subcategories: [],
  };

  getDataApi = () => {
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-utility`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            listData: response.data.data,
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };
  getDataRangeApi = () => {
    var self = this;
    const { startDate, endDate } = this.state;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-utility?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            listData: response.data.data,
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
    this.getSubCategoriesApi();
    this.getStoreApi();
    this.getDataApi();
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
    const { listData, categories, subcategories, store, startDate } = this.state;
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href={DEMO.link}>{text}</a>,
        width: 130,
      },

      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 150,
      },
      {
        title: 'Ingredients',
        dataIndex: 'ingredients',
        key: 'ingredients',
        render: (text, row) => text.join(', '),
        width: 160,
      },
      {
        title: 'Store',
        key: 'stroe',
        render: (text, row) => {
          const filterRecord = store.filter(data => data._id === text.store_id);
          return filterRecord.length > 0 && filterRecord[0].name ? (
            filterRecord[0].name
          ) : (
            <center>-</center>
          );
        },
        width: 100,
      },
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
        width: 100,
      },
      {
        title: 'Sub Categories',
        key: 'subCategories',
        render: (text, row) => {
          const filterRecord = subcategories.filter(data => data._id === text.subcategory_id);
          return filterRecord.length > 0 && filterRecord[0].title ? (
            filterRecord[0].title
          ) : (
            <center>-</center>
          );
        },
        width: 130,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 100,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text, row) => row.currency + text,
        width: 100,
      },
      {
        title: 'Status',
        key: 'name',
        render: (text, record) => (
          <b className={`text-${text.status === 0 ? 'success' : 'danger'}`}>
            {text.status === 0 ? 'Available' : 'Blocked'}
          </b>
        ),
        width: 100,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          const isAddExtraIngredients = text.extra_ingredients.length > 0 ? true : false;

          return (
            <span className="d-flex">
              <Link
                to={{
                  pathname: `${match.url}/edit`,
                  state: { ...text, isAddExtraIngredients: isAddExtraIngredients },
                }}
                className="ant-btn ant-btn-primary ant-btn-circle"
              >
                <Icon type="edit" theme="filled" />
              </Link>
              <Delete recordData={text} />
              <BlockModal
                recordData={text}
                api={text.status === 0 ? 'block-utility' : 'unblock-utility'}
                type={text.status === 0 ? 'block' : 'unblock'}
              />
            </span>
          );
        },
        width: 140,
      },
    ];
    return (
      <section className="container-fluid container-mw-xxl no-breadcrumb chapter">
        <article className="article">
          <div className="d-flex justify-content-between">
            <h2 className="main-title  pt-0">Smoothies</h2>
            {/* <AddCustomer /> */}
            <div>
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
                <Link to={`${match.url}/add`} className="ml-2 ant-btn ant-btn-primary">
                  <Icon type="plus-circle" theme="filled" /> Add
                </Link>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={listData}
            className="ant-table-v1"
            scroll={{ x: 1200 }}
          />
        </article>
      </section>
    );
  }
}
export default ExtraUtilities;
