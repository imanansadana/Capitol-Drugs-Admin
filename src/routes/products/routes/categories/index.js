import React from 'react';
import { Table, Icon, Form, Input, Button, DatePicker } from 'antd';
import axios from 'axios';
import Add from './add';
import Delete from './delete';
import { Link } from 'react-router-dom';
import { backendUrl } from '../../../../common/credentials';
import { BlockModal } from '../../../../components/Modal';
import { CategoryStatistics } from '../../../../components/Cards';
import ReactHtmlParser from 'react-html-parser';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
class SubCategories extends React.Component {
  state = { startDate: '', endDate: '', listData: [], search: '', filterData: [], statusFilter: 0 };

  getDataApi = () => {
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
      .get(`${backendUrl}/get-category?startDate=${startDate}&endDate=${endDate}`, {
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
  handleStatusFilter = stock => {
    const { listData, statusFilter } = this.state;

    let filterDataHolder = [];
    if (statusFilter === stock) {
      filterDataHolder = [...listData];
    } else {
      filterDataHolder = [
        ...listData.filter(
          ({ status }) => (stock === 1 && status === 0) || (stock === 2 && status === 1)
        ),
      ];
    }
    this.setState({
      search: '',
      statusFilter: stock !== statusFilter ? stock : 0,
      filterData: filterDataHolder,
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
    const { listData, search, filterData, statusFilter, startDate } = this.state;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        // dataIndex: 'description',
        key: 'description',
        render: (text, record) => ReactHtmlParser(text.description) || '-',
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
              api={text.status === 0 ? 'block-category' : 'unblock-category'}
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
    console.log('rrrr sss', listData, 'ccc', columns);
    // const dateFormat = 'MM/DD/YYYY';
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

    return (
      <>
        <CategoryStatistics
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
            <div>{/* <h2 className="main-title pt-0">Categories</h2> */}</div>
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
              <div>
                <Button
                  className="mx-2"
                  onClick={() => this.handleStatusFilter(1)}
                  type={statusFilter === 1 ? 'primary' : 'secondary'}
                >
                  Active
                </Button>
                <Button
                  className="mr-2"
                  onClick={() => this.handleStatusFilter(2)}
                  type={statusFilter === 2 ? 'primary' : 'secondary'}
                >
                  In Active
                </Button>

                <Link to={`${match.url}/add`} className="ant-btn ant-btn-primary">
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
