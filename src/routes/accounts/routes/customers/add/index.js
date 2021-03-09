import React from 'react';
import { Modal, Button, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Form from '../form';

class Add extends React.Component {
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
          <section className="form-v1-container">
            <h2>Add New Customer</h2>
            <p className="lead col-lg-10 mx-lg-auto">
              Discovering and connecting with creative talent around the globe.
            </p>
            <Form />
          </section>
        </div>
      </section>
    );
  }
}

export default withRouter(Add);
