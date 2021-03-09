import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import DEMO from 'constants/demoData';
import APPCONFIG from 'constants/appConfig';
import LayoutOptions from './LayoutOptions';
import ColorOptions from './ColorOptions';

class Customizer extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: APPCONFIG.showCustomizer,
    };
  }

  toggleCustomizer = (e, close) => {
    e.preventDefault();
    if (close) {
      this.setState({
        isVisible: false,
      });
    } else {
      this.setState({
        isVisible: !this.state.isVisible,
      });
    }
  };

  render() {
    return (
      <section
        id="quickview-customizer"
        className={classnames('quickview-wrapper customizer hidden-lg-down', {
          'quickview-open-customizer': this.state.isVisible,
        })}
      >
        <a
          className="customizer-close"
          href={DEMO.link}
          onClick={e => this.toggleCustomizer(e, true)}
        >
          <Icon type="close-circle" theme="outlined" />
        </a>
        <a className="customizer-toggle" href={DEMO.link} onClick={e => this.toggleCustomizer(e)}>
          <Icon type="setting" theme="outlined" />
        </a>

        <div className="quickview-inner">
          <p className="customizer-header">Customizer</p>
          <p className="small m-0">Customize and preview in real time.</p>

          <div className="divider my-4 divider-solid"></div>
          <LayoutOptions />

          <div className="divider my-4 divider-solid"></div>
          <ColorOptions />
        </div>
      </section>
    );
  }
}

export default Customizer;
