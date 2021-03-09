import React from 'react';
import { Icon } from 'antd';

const Section = () => (
  <div className="row">
    <div className="col-xl-3 mb-4">
      <div className="number-card-v1">
        <div className="card-top">
          <Icon type="shopping-cart" className="text-primary" />
        </div>
        <div className="card-info">
          <span>Orders</span>
        </div>
        <div className="card-bottom">
          <span>
            35<span className="h5">%</span>
          </span>
        </div>
      </div>
    </div>

    <div className="col-xl-3 mb-4">
      <div className="number-card-v1">
        <div className="card-top">
          <span>
            42<span className="h5">%</span>
          </span>
        </div>
        <div className="card-info">
          <span>Sales</span>
        </div>
        <div className="card-bottom">
          <Icon type="line-chart" className="text-info" />
        </div>
      </div>
    </div>

    <div className="col-xl-3 mb-4">
      <div className="number-card-v1">
        <div className="card-top">
          <Icon type="usergroup-add" className="text-success" />
        </div>
        <div className="card-info">
          <span>All Customers</span>
        </div>
        <div className="card-bottom">
          <span>
            25<span className="h5">k</span>
          </span>
        </div>
      </div>
    </div>

    <div className="col-xl-3 mb-4">
      <div className="number-card-v1">
        <div className="card-top">
          <span>
            55<span className="h5">%</span>
          </span>
        </div>
        <div className="card-info">
          <span>All Products</span>
        </div>
        <div className="card-bottom">
          <Icon type="appstore" className="text-warning" />
        </div>
      </div>
    </div>
  </div>
);

export default Section;
