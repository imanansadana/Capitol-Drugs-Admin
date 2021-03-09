import React from 'react';
import { Table, Icon, Form, Input, Button, DatePicker } from 'antd';
import axios from 'axios';
import productImage from '../../../../assets/images/productImage.png';
import classes from './style.module.scss';
import Delete from './delete';
import { Link } from 'react-router-dom';
import { StoreInfoCard } from '../../../../components/Cards';
import { backendUrl } from '../../../../common/credentials';
import { BlockModal } from '../../../../components/Modal';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class Article extends React.Component {
  state = { startDate: '', endDate: '', listData: [], search: '', filterData: [] };

  getDataApi = () => {
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
            listData: response.data.data,
            filterData: response.data.data,
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
      .get(`${backendUrl}/get-store?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            listData: response.data.data,
            filterData: response.data.data,
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
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
  handleSearch = e => {
    const { listData } = this.state;
    const filterDataHolder = listData.filter(({ name }) =>
      name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    this.setState({ [e.target.name]: e.target.value, filterData: filterDataHolder });
  };

  render() {
    const { match } = this.props;
    const { listData, filterData, search, startDate, endDate } = this.state;

    const columns = [
      // {
      //   title: 'Store Image',
      //   dataIndex: 'image',
      //   key: 'image',
      //   render: src => (
      //     <div className="text-center">
      //       <img className={classes.productImage} src={src || productImage} />
      //     </div>
      //   ),
      // },
      {
        title: 'Store Name',
        dataIndex: 'name',
        key: 'name',

        // render: text => <a href={DEMO.link}>{text}</a>,
      },
      {
        title: 'Status',
        key: 'name',
        render: (text, record) => (
          <b className={`text-${text.status === 0 ? 'success' : 'danger'}`}>
            {text.status === 0 ? 'Open' : 'Close'}
          </b>
        ),
        width: 100,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Contact Number',
        dataIndex: 'phone',
        key: 'phone',
        width: 160,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
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
              api={text.status === 0 ? 'block-store' : 'unblock-store'}
              type={text.status === 0 ? 'block' : 'unblock'}
              blockTitleText="Close"
              unblockTitleText="Open"
              blockText="close"
              unblockText="open"
              blockBtnText="Close"
              unblockBtnText="Open"
            />
          </span>
        ),
        width: 140,
      },
    ];
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    console.log('rrrr sss', listData, 'ccc', columns);
    return (
      <>
        <StoreInfoCard
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
        />
        <section className="container-fluid container-mw-xxl no-breadcrumb chapter">
          <article className="article pb-0">
            <div className="d-flex justify-content-between">
              <FormItem>
                <Input
                  placeholder="Search"
                  prefix={<Icon type="search" style={{ fontSize: 13 }} />}
                  name="search"
                  value={search}
                  onChange={this.handleSearch}
                />
              </FormItem>
              <Link to={`${match.url}/add`} className="ant-btn ant-btn-primary">
                <Icon type="plus-circle" theme="filled" /> Add
              </Link>
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

export default Article;
