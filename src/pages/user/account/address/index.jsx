import React, { useState } from 'react'

function AccountAddress() {
  const [addresses, setAddresses] = useState([])
  return (
    <div className="address">
    <h2 className="address-title">Your Addresses</h2>
    <div className="address-list">
      {
        addresses.length > 0?
      addresses.map(addr => (
        <div className="address-item" key={addr.id}>
          <h3>{addr.type} Address</h3>
          <p>{addr.address}</p>
          <button className="edit-btn">Edit</button>
        </div>
      ))
      :(
        <div>
          <p>No addresses found</p>
        </div>
      )
    }
    </div>
  </div>
);
}

export default AccountAddress