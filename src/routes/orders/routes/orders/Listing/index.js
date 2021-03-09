import React from 'react';
import { Table, Icon, Button, Select, Form, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import DEMO from 'constants/demoData';
// import productImage from '../../../../../assets/images/productImage.png';
import classes from './style.module.scss';
// import ViewDetails from './viewDetail';
import mockData from './mockData';
const Option = Select.Option;
const FormItem = Form.Item;

const filterFields = [
  {
    id: 1,
    value: 'all',
    name: 'All order',
  },
  {
    id: 2,
    value: 'inprogress',
    name: 'Inprogress',
  },
  {
    id: 3,
    value: 'cancelled',
    name: 'Cancelled',
  },
  {
    id: 4,
    value: 'success',
    name: 'Completed',
  },
  {
    id: 5,
    value: 'failed',
    name: 'Failed',
  },
];
class Article extends React.Component {
  state = {
    selectedFilter: 1,
    listData: mockData,
    search: '',
    filterData: mockData,
    countFilter: 'all',
  };
  updateListing = id => this.setState({ selectedFilter: id });
  handleSearch = e => {
    const { listData, countFilter, search } = this.state;

    let filterDataHolder = [];

    if (countFilter === 'all') {
      filterDataHolder = [
        ...listData.filter(({ name }) =>
          name.toLowerCase().includes(e.target.value.trim().toLowerCase())
        ),
      ];
    } else {
      filterDataHolder = [
        ...listData.filter(
          ({ name, status }) =>
            status === countFilter &&
            name.toLowerCase().includes(e.target.value.trim().toLowerCase())
        ),
      ];
    }

    this.setState({
      [e.target.name]: e.target.value,
      filterData: filterDataHolder,
      // stockFilter: 0,
    });
  };
  handleCountFilter = e => {
    const { listData, countFilter, search } = this.state;

    let filterDataHolder = [];
    if (e === 'all') {
      filterDataHolder = [
        ...listData.filter(({ name }) => name.toLowerCase().includes(search.trim().toLowerCase())),
      ];
    } else {
      filterDataHolder = [
        ...listData.filter(
          ({ name, status }) =>
            status === e && name.toLowerCase().includes(search.trim().toLowerCase())
        ),
      ];
    }

    this.setState({
      countFilter: e,
      filterData: filterDataHolder,
    });
  };
  render() {
    const { match } = this.props;
    const columns = [
      // {
      //   title: 'Product Image',
      //   dataIndex: 'image',
      //   key: 'image',
      //   render: src => (
      //     <div className="text-center">
      //       <img className={classes.productImage} src={src} />
      //     </div>
      //   ),
      // },
      {
        title: 'Order Number',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
      },
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Total Cost',
        dataIndex: 'totalCost',
        key: 'totalCost',
      },
      {
        title: 'Delivery Address',
        dataIndex: 'deliveryAddress',
        key: 'deliveryAddress',
      },
      {
        title: 'Phone',
        dataIndex: 'customerMobile',
        key: 'customerMobile',
      },

      {
        title: 'Email',
        dataIndex: 'customerEmail',
        key: 'customerEmail',
      },
      {
        title: 'Payment Method',
        dataIndex: 'method',
        key: 'method',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        // render: (text, record) => (
        //   // <span className={text === 'Success' ? 'text-success' : ''}>{text}</span>
        //   <Select className="w-100" name="status" value="In Progress">
        //     <Option value="In Progress">In Progress</Option>
        //     <Option value="Cancelled">Cancelled</Option>
        //     <Option value="Completed">Completed</Option>
        //   </Select>
        // ),
      },

      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Link to={`${match.url}/details`} className="ant-btn ant-btn-primary">
            View Details
          </Link>
        ),
      },
    ];
    const { selectedFilter, filterData, search, countFilter } = this.state;
    return (
      <article className="article">
        <div className="d-flex align-items-center mb-3">
          <FormItem className="mb-0">
            <Input
              placeholder="Search Product "
              prefix={<Icon type="search" style={{ fontSize: 13 }} />}
              name="search"
              value={search}
              onChange={this.handleSearch}
            />
          </FormItem>
          <div>
            {filterFields.map(({ id, value, name }) => {
              return (
                <Button
                  className="ml-2"
                  key={id}
                  onClick={() => this.handleCountFilter(value)}
                  type={countFilter === value ? 'primary' : 'secondary'}
                >
                  {name}
                </Button>
              );
            })}
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filterData}
          className="ant-table-v1"
          scroll={{ x: 700 }}
        />
      </article>
    );
  }
}

export default withRouter(Article);
