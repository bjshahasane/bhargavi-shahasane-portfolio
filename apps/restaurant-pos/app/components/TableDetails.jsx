'use client'

import React, { useEffect, useState } from 'react';
import { formatCurrency, generateOrderId } from '../utils/generateOrderId';
import { fetchOrders } from '../slices/ordersSlice';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { hideLoader, showLoader, showNotification } from '../slices/siteSettingSlice';
import OrderManagement from './OrderManagement';

const OrderTable = ({ orderItems, handleQuantityChange }) => (
    <div className="mt-3 order-table">
        <table className="table bgWhite2">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {orderItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                            <OrderManagement
                                option={item}
                                handleQuantityChange={handleQuantityChange}
                                initialQuantity={item.quantity}
                            />
                        </td>
                        <td>{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <style jsx>{`
          .order-table {
            max-height: 40vh;
            overflow-y: auto;
            overflow-x: hidden;
          }

          @media (max-width: 768px) {
            .order-table {
              max-height: 30vh;
            }
          }
        `}</style>
    </div>
);

const OrderStatusSelect = ({ status, setStatus }) => (
    <select
        className="form-control form-control-sm edit-btn"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
    >
        <option value="" disabled>Order Status</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
    </select>
);

const TableDetails = ({ orderObj, handleQuantityChange }) => {
    const { tableid, orderId, orderStatus, orderItems = [], total, discountType, discountValue } = orderObj;

    const [loginToken, setLoginToken] = useState();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const [oStatus, setOStatus] = useState('Unpaid');
    const [dType, setDType] = useState('rs');
    const [dValue, setDValue] = useState('0');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/pages/createUser');
            return;
        } else {
            setLoginToken(token);
        }

        if (orderStatus) setOStatus(orderStatus);
        if (discountType) setDType(discountType);
        if (discountValue) setDValue(String(discountValue));

    }, [orderStatus, router, discountType, discountValue]);

    const calculateDiscountedTotal = () => {
        let discountAmount = 0;

        if (dType === 'percent') {
            discountAmount = (dValue / 100) * total;
        } else {
            discountAmount = dValue;
        }

        const discountedTotal = total - discountAmount;
        return discountedTotal < 0 ? 0 : discountedTotal;
    };

    const addUpdateOrder = async () => {
        dispatch(showLoader(true));

        const payload = {
            orderId: orderId || generateOrderId(),
            tableId: tableid,
            orders: orderItems,
            total,
            date: new Date().toISOString(),
            status: oStatus,
            discountType: dType || 'rs',
            discountValue: dValue || 0,
            discountTotal: Number(calculateDiscountedTotal()),
        };

        const method = orderId ? 'PUT' : 'POST';
        const url = orderId ? `/api/orders?orderId=${orderId}` : '/api/orders';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 401 || response.status === 403) {
                dispatch(hideLoader(true));
                dispatch(showNotification({ message: 'Authorisation error', type: "error" }));
                setTimeout(() => router.push('/pages/createUser'), 2000);
                return;
            }

            if (response.status === 500) {
                dispatch(hideLoader(true));
                dispatch(showNotification({ message: 'Server error', type: "error" }));
                return;
            }

            if (response.ok) {
                dispatch(hideLoader(true));
                dispatch(showNotification({
                    message: `${orderId ? 'Order updated' : 'Order added'} successfully`,
                    type: "success"
                }));

                if (orderId) dispatch(fetchOrders());

                setTimeout(() => {
                    router.push('/pages/orders');
                }, 1500);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="col-12 col-md-5 col-lg-3 mt-3">

            <div className="detail-box p-3 p-md-4 rounded d-flex flex-column justify-content-between">

                {/* TOP */}
                <div>
                    {pathname.includes('orders') && (
                        <div className="d-flex justify-content-end">
                            <Link href={`/pages/menus/${tableid}/${orderId}`}>
                                <button className="btn btn-sm edit-btn">Edit order</button>
                            </Link>
                        </div>
                    )}

                    <div className="d-flex justify-content-between flex-wrap mt-2">
                        <h5>Table {tableid}</h5>
                        {orderId && <small>#{orderId}</small>}
                    </div>

                    <OrderTable
                        orderItems={orderItems}
                        handleQuantityChange={handleQuantityChange}
                    />
                </div>

                {/* BOTTOM */}
                <div className="mt-3 border-top pt-3">

                    <div className="row g-2 mb-2">
                        <div className="col-6">
                            <select
                                value={dType}
                                onChange={(e) => setDType(e.target.value)}
                                className="form-control form-control-sm"
                            >
                                <option value="rs">₹</option>
                                <option value="percent">%</option>
                            </select>
                        </div>

                        <div className="col-6">
                            <input
                                type="number"
                                value={dValue}
                                onChange={(e) => setDValue(Number(e.target.value))}
                                className="form-control form-control-sm"
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <strong>Total</strong>
                        <span>{formatCurrency(total)}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <small>Discounted</small>
                        <small>{formatCurrency(calculateDiscountedTotal())}</small>
                    </div>

                    <div className="mt-2">
                        <OrderStatusSelect status={oStatus} setStatus={setOStatus} />
                    </div>

                    <button
                        className="btn add-btn w-100 mt-3"
                        onClick={addUpdateOrder}
                    >
                        {orderId ? 'Update Order' : 'Add Order'}
                    </button>
                </div>
            </div>

            <style jsx>{`
              .detail-box {
                min-height: 500px;
              }

              @media (max-width: 768px) {
                .detail-box {
                  min-height: auto;
                }
              }
            `}</style>
        </div>
    );
};

export default TableDetails;