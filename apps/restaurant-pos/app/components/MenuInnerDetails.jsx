'use client';

import React from 'react';
import OrderManagement from './OrderManagement';

const MenuInnerDetails = ({ option, handleQuantityChange, initialQuantity }) => {
  return (
    <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 mb-4">
      <div className="card h-100 border-0 shadow-sm menu-card">
        <div className="card-body d-flex flex-column justify-content-between">

          <div>
            <h6 className="card-title mb-1">{option.name}</h6>
            <p className="text-muted small mb-2">₹ {option.price}</p>
          </div>

          <OrderManagement
            option={option}
            handleQuantityChange={handleQuantityChange}
            initialQuantity={initialQuantity}
          />
        </div>
      </div>

      <style jsx>{`
        .menu-card {
          border-radius: 14px;
          min-height: 120px;
          transition: all 0.2s ease;
        }

        .menu-card:hover {
          transform: translateY(-4px);
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .menu-card {
            min-height: 140px;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuInnerDetails;