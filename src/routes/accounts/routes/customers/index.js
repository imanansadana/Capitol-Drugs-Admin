import React from 'react';
import { Table, Icon, DatePicker, Form, Input, Button } from 'antd';
import DEMO from 'constants/demoData';
import avatarImage from '../../../../assets/images/avatar.jpg';
import classes from './style.module.scss';
import DeleteCustomer from './deleteCustomer';
import EditCustomer from './editCustomer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../../common/credentials';
import { BlockModal } from '../../../../components/Modal';
import { AccountStatistics } from '../../../../components/Cards';
import moment from 'moment';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
class Customers extends React.Component {
  state = { startDate: '', endDate: '', search: '', listData: [], filterData: [] };

  getDataApi = () => {
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-customer`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function (response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            listData: response.data.data,
            filterData: response.data.data,
          });
        }
      })
      .catch(function (error) {
        console.log('rrrr err', error);
      });
  };

  getDataRangeApi = () => {
    var self = this;
    const { startDate, endDate } = this.state;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-customer?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function (response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            listData: response.data.data,
          });
        }
      })
      .catch(function (error) {
        console.log('rrrr err', error);
      });
  };
  handleSearch = (e) => {
    const { listData } = this.state;
    const filterDataHolder = [
      ...listData.filter(
        ({ first_name, last_name, email, phone }) =>
          first_name.toLowerCase().includes(e.target.value.trim().toLowerCase()) ||
          last_name.toLowerCase().includes(e.target.value.trim().toLowerCase()) ||
          email.toLowerCase().includes(e.target.value.trim().toLowerCase()) ||
          phone.toLowerCase().includes(e.target.value.trim().toLowerCase())
      ),
    ];
    this.setState({
      [e.target.name]: e.target.value,
      filterData: filterDataHolder,
      statusFilter: 0,
    });
  };
  componentDidMount() {
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
    const { listData, filterData, startDate, search } = this.state;
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    const columns = [
      // {
      //   title: 'Person Image',
      //   dataIndex: 'image',
      //   key: 'image',
      //   width: 120,
      //   render: src => (
      //     <div className="text-center">
      //       <img className={classes.productImage} src={src || avatarImage} />
      //     </div>
      //   ),
      // },

      {
        title: 'Registration Date',
        key: 'date',
        render: (text) => moment(text.date).format('MMMM Do YYYY'),
        width: 135,
      },
      {
        title: 'First Name',
        key: 'first_name',
        dataIndex: 'first_name',
      },
      {
        title: 'Last Name',
        key: 'last_name',
        dataIndex: 'last_name',
      },
      {
        title: 'Status',
        key: 'name',
        width: 120,
        render: (text, record) => (
          <b className={`text-${text.status === 0 ? 'success' : 'danger'}`}>
            {text.status === 0 ? 'Active' : 'Inactive'}
          </b>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 120,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          console.log('razat', text);
          return (
            <span className="d-flex">
              <Link
                to={{ pathname: `${match.url}/preview`, state: text }}
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
              <DeleteCustomer recordData={text} />
              <BlockModal
                recordData={text}
                api={text.status === 0 ? 'block-customer' : 'unblock-customer'}
                type={text.status === 0 ? 'block' : 'unblock'}
              />
            </span>
          );
        },
        width: 166,
      },
    ];
    return (
      <>
        <AccountStatistics
          dateFilter={
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
          }
          total={listData.length}
          active={listData.filter(({ status }) => status === 0).length}
          inactive={listData.filter(({ status }) => status === 1).length}
          title="Customers"
        />
        <section className="container-fluid container-mw-xxl no-breadcrumb chapter">
          <article className="article">
            <div className="d-flex justify-content-between mb-2">
              <div>
                <FormItem>
                  <Input
                    placeholder="Search with name, email or phone"
                    prefix={<Icon type="search" style={{ fontSize: 13 }} />}
                    name="search"
                    value={search}
                    style={{ width: 275 }}
                    onChange={this.handleSearch}
                  />
                </FormItem>
              </div>
              {/* <AddCustomer /> */}
              <Link to={`${match.url}/add`} className="ant-btn ant-btn-primary">
                <Icon type="plus-circle" theme="filled" /> Add
              </Link>
            </div>
            <Table
              columns={columns}
              dataSource={filterData}
              className="ant-table-v1"
              scroll={{ x: 700 }}
            />
          </article>
        </section>
      </>
    );
  }
}
export default Customers;
