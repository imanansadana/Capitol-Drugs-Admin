import React from 'react';
import { Modal, Button, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Form from '../form';
class EditRecord extends React.Component {
  render() {
    const { location, match } = this.props;
    const { state } = location;
    const backLink = match.url
      .split('/')
      .slice(0, -1)
      .join('/');
    console.log('rrrr editData', this.props);
    return (
      <div>
        <section className="form-card h-100">
          <div className="form-card__body p-lg-5 p-4">
            <Link to={backLink} className="ant-btn ant-btn-primary">
              <Icon type="caret-left" /> Back
            </Link>
            <section className="form-v1-container">
              <h2>Edit Sub Category</h2>
              <p className="lead col-lg-10 mx-lg-auto">
                Discovering and connecting with creative talent around the globe.
              </p>
              <Form type="edit" editData={state} />
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default EditRecord;
