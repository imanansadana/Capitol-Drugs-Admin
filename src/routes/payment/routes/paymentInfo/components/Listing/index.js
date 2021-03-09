import React from 'react';
import { Table, Icon } from 'antd';
import DEMO from 'constants/demoData';
import avatarImage from '../../../../../../assets/images/avatar.jpg';
import classes from './style.module.scss';
import { Link } from 'react-router-dom';

const data = [
  {
    key: '1',
    name: 'Jhone',
    email: 'Jhone@gmail.com',
    phone: '7104505987',
    image: avatarImage,
    method: 'Visa',
  },
  {
    key: '1',
    name: 'Eliate',
    email: 'Guest@gmail.com',
    phone: '9104505987',
    image: avatarImage,
    method: 'COD',
  },
];

const Article = props => {
  const { match } = props;
  const columns = [
    {
      title: 'Person Image',
      dataIndex: 'image',
      key: 'image',
      render: src => (
        <div className="text-center">
          <img className={classes.productImage} src={src} />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href={DEMO.link}>{text}</a>,
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
    },

    {
      title: 'Payment Method',
      dataIndex: 'method',
      key: 'method',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <span className="d-flex">
    //       {/* <EditCustomer recordData={text} /> */}
    //       <Link to={`${match.url}/edit`} className="ant-btn ant-btn-primary">
    //         <Icon type="edit" theme="filled" /> Edit
    //       </Link>
    //       <DeleteCustomer recordData={text} />
    //     </span>
    //   ),
    //   width: 200,
    // },
  ];
  return (
    <article className="article">
      <div className="d-flex justify-content-between">
        <h2 className="main-title  pt-0">Payment Listing</h2>
      </div>
      <Table columns={columns} dataSource={data} className="ant-table-v1" scroll={{ x: 700 }} />
    </article>
  );
};

export default Article;
