import React, { useState } from 'react'
import NotFoundForUserPage from '../../notfound';

function AccountAddress() {
  const [addresses, setAddresses] = useState([])
  return (
    <>
      {
        addresses.length > 0 ?
          <>
            <div className="address">
              <h2 className="address-title">Your Addresses</h2>
              <div className="address-list">
                {

                  addresses.map(addr => (
                    <div className="address-item" key={addr.id}>
                      <h3>{addr.type} Address</h3>
                      <p>{addr.address}</p>
                      <button className="edit-btn">Edit</button>
                    </div>
                  ))

                }
              </div>
            </div>
          </>
          : (
            <NotFoundForUserPage
              title="No Addresses Found"
              message="It seems you haven't added any addresses yet. Add a new address to manage your deliveries easily."
            />
          )}
    </>



  );
}

export default AccountAddress