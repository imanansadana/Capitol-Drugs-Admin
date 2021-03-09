import React from 'react';
import QueueAnim from 'rc-queue-anim';
import MainChart from './MainChart';
import NumberCards from './NumberCards';
import ProjectTable from './ProjectTable';
import Filter from './filter';

const Dashboard = () => (
  <div className="container-fluid no-breadcrumb page-dashboard">
    <Filter />
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        {' '}
        <MainChart />{' '}
      </div>
      <div key="2">
        {' '}
        <NumberCards />{' '}
      </div>
      <div key="3">
        {' '}
        <ProjectTable />{' '}
      </div>
    </QueueAnim>
  </div>
);

export default Dashboard;
