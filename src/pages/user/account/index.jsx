import React from 'react';
import SideBarForMyAccount from './sidebar';
import { Outlet } from 'react-router';

function MyAccount() {

  return (
    <div id='myAccount' className='container'>
      <div className="row">
        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <SideBarForMyAccount />
        </div>
        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
