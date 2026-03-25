'use client';

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from 'next/navigation';

const OrderManagement = ({ option, handleQuantityChange, initialQuantity }) => {
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const updateQuantity = useCallback(
    (newQuantity) => {
      setQuantity(newQuantity);
      handleQuantityChange(option.id, newQuantity);
    },
    [handleQuantityChange, option.id]
  );

  const increment = () => updateQuantity(quantity + 1);
  const decrement = () => quantity > 0 && updateQuantity(quantity - 1);

  return (
    <div className="d-flex justify-content-between align-items-center w-100 mt-2">
      {!pathname.includes('orders') ? (
        <div className="d-flex align-items-center justify-content-between w-100">

          <button
            onClick={decrement}
            className="btn btn-outline-secondary quantity-btn"
          >
            −
          </button>

          <span className="fw-bold mx-3 fs-6">{quantity}</span>

          <button
            onClick={increment}
            className="btn btn-outline-primary quantity-btn btn-sm"
          >
            +
          </button>
        </div>
      ) : (
        <span className="fw-bold">{quantity}</span>
      )}

      <style jsx>{`
        .quantity-btn {
          min-width: 36px;
          min-height: 36px;
        }

        // @media (min-width: 568px) {
        //   .quantity-btn {
        //     min-width: 42px;
        //     min-height: 42px;
        //     font-size: 18px;
        //   }
        }
      `}</style>
    </div>
  );
};

export default OrderManagement;