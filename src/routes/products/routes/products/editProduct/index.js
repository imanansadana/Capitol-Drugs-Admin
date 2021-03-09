import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button, Icon } from 'antd';
import Form from '../form';
class DeleteProduct extends React.Component {
  render() {
    const { location, match } = this.props;
    const { state } = location;
    const backLink = match.url
      .split('/')
      .slice(0, -1)
      .join('/');
    console.log('rrrr ppee', this.props);

    return (
      <section className="form-card h-100">
        <div className="form-card__body p-lg-5 p-4">
          <Link to={backLink} className="ant-btn ant-btn-primary">
            <Icon type="caret-left" /> Back
          </Link>
          <section>
            <div className="form-v1-container">
              <h2>Edit Product</h2>
              <p className="lead col-lg-10 mx-lg-auto">
                Discovering and connecting with creative talent around the globe.
              </p>
            </div>
            <Form type="edit" editData={state} />
          </section>
        </div>
      </section>
    );
  }
}

export default withRouter(DeleteProduct);
