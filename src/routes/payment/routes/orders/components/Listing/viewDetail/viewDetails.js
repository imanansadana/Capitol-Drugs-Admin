import React from 'react';
import { Table, Icon } from 'antd';
import DEMO from 'constants/demoData';
import productImage from '../../../../../../../assets/images/productImage.png';
import classes from './style.module.scss';

const columns = [
  {
    title: 'Product Image',
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
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },

  {
    title: 'Payment Method',
    dataIndex: 'method',
    key: 'method',
  },
];

const data = [
  {
    key: '1',
    name: 'Elite Xt',
    customer: 'Jhon',
    image: productImage,
    method: 'Visa',
  },
  {
    key: '2',
    name: 'Supplement',
    customer: 'Jhon',
    image: productImage,
    method: 'Msster',
  },
];

const Article = () => {
  return (
    <article className="article">
      <div className="d-flex justify-content-between">
        <h2 className="article-title  pt-0">Orders List</h2>
      </div>
      <Table columns={columns} dataSource={data} className="ant-table-v1" scroll={{ x: 700 }} />
    </article>
  );
};

export default Article;
