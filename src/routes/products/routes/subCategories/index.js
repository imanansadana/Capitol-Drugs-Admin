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
  state = { startDate: '', endDate: '', listData: [], categories: [], search: '', filterData: [] };
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
  getDataApi = () => {
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
    const { startDate, endDate } = this.state;
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-subcategory?startDate=${startDate}&endDate=${endDate}`, {
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
    this.getCategoryApi();
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

    const { listData, categories, search, filterData, startDate, endDate } = this.state;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
      },
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
        width: 120,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
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
              api={text.status === 0 ? 'block-subcategory' : 'unblock-subcategory'}
              type={text.status === 0 ? 'block' : 'unblock'}
              blockTitleText="Inactive"
              unblockTitleText="Active"
              blockText="inactive"
              unblockText="actie"
              blockBtnText="Inactive"
              unblockBtnText="Active"
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
            <div className="d-flex justify-content-between mb-2">
              <div>
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

export default SubCategories;
