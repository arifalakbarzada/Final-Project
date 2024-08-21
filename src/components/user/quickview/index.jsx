import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const QuickViewModal = ({ isOpen, onRequestClose, product}) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Quick View"
      className="quick-view-modal"
      overlayClassName="quick-view-overlay"
    >
      <h2>{product.name}</h2>
      <img src={product.colors[0].images[0]} className="img-fluid" alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${(product.price - product.price * product.discount / 100).toFixed(2)}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default QuickViewModal;
