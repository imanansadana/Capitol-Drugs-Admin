import React from 'react';
import { Table, Icon, DatePicker, Button, Form, Input } from 'antd';
import axios from 'axios';
import Add from './add';
import Delete from './delete';
import { Link } from 'react-router-dom';
import { SubCategoryStatistics } from '../../../../components/Cards';
import { backendUrl } from '../../../../common/credentials';
import { BlockModal } from '../../../../components/Modal';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
class SubCategories extends React.Component {
  state = { startDate: '', endDate: '', listData: [], search: '', filterData: [] };

  getDataApi = () => {
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
      .get(`${backendUrl}/get-utility-subcategory?startDate=${startDate}&endDate=${endDate}`, {
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
  componentDidMount() {
    this.getDataApi();
  }
  handleSearch = e => {
    const { listData } = this.state;
    const filterDataHolder = [
      ...listData.filter(({ title }) =>
        title.toLowerCase().includes(
          e.target.value.trim().toLowerCase()
          // && store_id === this.state.store_id
        )
      ),
    ];
    this.setState({
      [e.target.name]: e.target.value,
      filterData: filterDataHolder,
      statusFilter: 0,
    });
  };
  onDateChange = (date, dateString) => {
    console.log('eee', date, 'dddd', dateString);
    this.setState({ startDate: dateString[0], endDate: dateString[1] });
  };
  onRangeSearch = () => {
    this.getDataRangeApi();
  };

  render() {
    const { match } = this.props;
    const { listData, startDate, search, filterData } = this.state;
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

    const columns = [
      {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
      },
      // {
      //   title: 'Description',
      //   dataIndex: 'description',
      //   key: 'description',
      // },
      {
        title: 'Status',
        key: 'name',
        render: (text, record) => (
          <b className={`text-${text.status === 0 ? 'success' : 'danger'}`}>
            {text.status === 0 ? 'Available' : 'Blocked'}
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
              api={text.status === 0 ? 'block-utility-subcategory' : 'unblock-utility-subcategory'}
              type={text.status === 0 ? 'block' : 'unblock'}
            />
          </span>
        ),
        width: 140,
      },
    ];
    console.log('rrrr sss', listData, 'ccc', columns);
    return (
      <>
        <SubCategoryStatistics
          filter={
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
              <div>
                <Link to={`${match.url}/add`} className="ml-2 ant-btn ant-btn-primary">
                  <Icon type="plus-circle" theme="filled" /> Add
                </Link>
              </div>
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

export default SubCategories;
