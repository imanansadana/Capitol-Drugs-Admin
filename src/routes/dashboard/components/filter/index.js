import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Select, Spin, DatePicker } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../../common/credentials';
const { RangePicker } = DatePicker;

const Option = Select.Option;
const FormItem = Form.Item;

class Filter extends React.Component {
  state = {
    store: [],
    store_id: '',
  };
  checkIsEmpty = () => {
    if (this.state.store_id === '') {
      if (this.state.store.length !== 0) {
        this.setState({ store_id: this.state.store[0]._id });
      }
    }
  };
  handleSelect = (name, value) => {
    this.setState({ [name]: value });
    localStorage.setItem('store_id', value);
  };
  getStoreApi = () => {
    var self = this;
    const authToken = localStorage.getItem('access_token');
    axios
      .get(`${backendUrl}/get-store`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(function(response) {
        console.log('rrrr res', response.data.data);
        if (response) {
          self.setState({
            store: response.data.data,
            store_id: localStorage.getItem('store_id') ? localStorage.getItem('store_id') : '',
          });
        }
      })
      .catch(function(error) {
        console.log('rrrr err', error);
      });
  };

  componentDidMount() {
    this.getStoreApi();
  }
  onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  render() {
    const { store_id, store } = this.state;
    // this.checkIsEmpty();
    const dateFormat = 'MM/DD/YYYY';
    return (
      <div className="d-flex align-items-center justify-content-end mb-3">
        <h2 class="main-title sm mb-0 mr-2">Store</h2>
        <FormItem hasFeedback className="mb-0 mr-2" style={{ width: 170 }}>
          <Select
            className="w-100"
            name="store_id"
            value={store_id}
            placeholder="Select Store"
            onChange={e => this.handleSelect('store_id', e)}
          >
            {store.map((data, index) => (
              <Option key={index} value={data._id}>
                {data.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <RangePicker style={{ width: 270 }} onChange={this.onDateChange} format={dateFormat} />
      </div>
    );
  }
}
const WrappedFilterComponent = Form.create()(withRouter(Filter));

export default WrappedFilterComponent;
