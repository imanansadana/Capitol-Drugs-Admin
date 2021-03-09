import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button, Icon } from 'antd';
import Form from '../form';

class AddProductModal extends React.Component {
  // history.push(

  // );
  render() {
    const { match } = this.props;
    const backLink = match.url
      .split('/')
      .slice(0, -1)
      .join('/');
    return (
      <section className="form-card h-100">
        <div className="form-card__body p-lg-5 p-4">
          <Link to={backLink} className="ant-btn ant-btn-primary">
            <Icon type="caret-left" /> Back
          </Link>
          <section>
            <div className="form-v1-container">
              <h2>Add New Product</h2>
              <p className="lead col-lg-10 mx-lg-auto">
                Discovering and connecting with creative talent around the globe.
              </p>
            </div>
            <Form />
          </section>
        </div>
      </section>
    );
  }
}

export default withRouter(AddProductModal);
