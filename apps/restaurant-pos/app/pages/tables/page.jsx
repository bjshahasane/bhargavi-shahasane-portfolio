'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectTable, fetchOrders } from '../../slices/ordersSlice';
import { fetchMenu } from '@/app/slices/menuSlice';
import { useRouter } from 'next/navigation';

const Tables = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const store = useSelector((state) => state.orderReducer);
  const [ordersArr, setOrdersArr] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/pages/createUser');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      await dispatch(fetchMenu());
      await dispatch(fetchOrders({ isTableCheck: true, dateFilter: "today" }));
      setLoading(false);
    };

    loadData();
  }, [dispatch, router]);

  useEffect(() => {
    if (store.orders?.orders) {
      setOrdersArr(store.orders.orders);
    }
  }, [store.orders]);

  const isTableUnpaid = (tableId) => {
    return ordersArr.some(
      (order) =>
        Number(order.tableId) === tableId &&
        order.status === 'Unpaid'
    );
  };

  const getOrderForTable = (tableId) => {
    const order = ordersArr.find(
      (order) =>
        Number(order.tableId) === tableId &&
        order.status === 'Unpaid'
    );
    return order ? order.orderId : null;
  };

  const handleTableClick = (tableId) => {
    const orderId = getOrderForTable(tableId);
    dispatch(selectTable(tableId));

    if (orderId) {
      router.push(`/pages/menus/${tableId}/${orderId}`);
    } else {
      router.push(`/pages/menus/${tableId}`);
    }
  };

  const renderedTables = useMemo(() => {
    return tableNumbers.map((tableId) => {
      const isOccupied = isTableUnpaid(tableId);

      return (
        <div
          key={tableId}
          className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
        >
          <div
            className={`card table-card h-100 border-0 shadow-sm ${
              isOccupied ? 'occupied-card' : 'vacant-card'
            }`}
            onClick={() => handleTableClick(tableId)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h5 className="card-title mb-2">Table {tableId}</h5>

              <span
                className={`badge ${
                  isOccupied ? 'bg-danger' : 'bg-success'
                }`}
              >
                {isOccupied ? 'Occupied' : 'Vacant'}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }, [ordersArr]);

  return (
    <Layout>
      <div className="container py-4">
        <h3 className="mb-4">Tables Overview</h3>

        {loading ? (
          <div className="text-center mt-5">Loading tables...</div>
        ) : (
          <div className="row">{renderedTables}</div>
        )}
      </div>

      {/* Custom Styling */}
      <style jsx>{`
        .table-card {
          transition: all 0.3s ease;
          border-radius: 12px;
        }

        .table-card:hover {
          transform: translateY(-5px);
        }

        .occupied-card {
          background-color: #ffe5e5;
        }

        .occupied-card:hover {
          background-color: #ffcccc;
        }

        .vacant-card {
          background-color: #e6ffed;
        }

        .vacant-card:hover {
          background-color: #ccffd9;
        }
      `}</style>
    </Layout>
  );
};

export default Tables;