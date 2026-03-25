'use client';

import React, { useState, useEffect } from 'react';
import { productCatalogue } from '../../js/productCatalogue';
import Button from 'react-bootstrap/Button';
import {
  Table,
  Container,
  Badge,
  Tooltip,
  OverlayTrigger,
  Toast,
  Row,
  Col,
} from 'react-bootstrap';
import OrderFormModal from '../../components/OrderFormModal';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';

const initialValue = {
  customerName: '',
  date: '',
  products: [],
  discount: '',
  discountType: '',
  shipping: '',
  totalBeforeShipping: 0,
  totalAfterShipping: 0,
  message: '',
  isFulfilled: false,
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialValue);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState(null);

  const itemsPerPage = 5;

  const flatProductList = productCatalogue.flatMap(group => group.itemList);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/orders?page=${page}&limit=${itemsPerPage}`
      );

      const result = await res.json();
      console.log('Fetched orders:', result);
      setOrders(result || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Fetch orders error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm('Delete this order?')) return;

    try {
      const res = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id }),
      });

      if (res.ok) {
        setToast({ show: true, message: 'Order deleted' });
        fetchOrders(currentPage);
      }
    } catch {
      setToast({ show: true, message: 'Error deleting order' });
    }
  };

  const handleAdd = () => {
    setForm(initialValue);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (order) => {
    const enrichedProducts = order.products.map(p => {
      const found = flatProductList.find(item => item.id === p.id);
      return found ? { ...found, quantity: p.quantity } : { ...p };
    });

    setForm({ ...order, products: enrichedProducts });
    setIsEditMode(true);
    setEditingId(order._id);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    if (isEditMode) {
      await axios.put('/api/orders', { _id: editingId, ...formData });
    } else {
      await axios.post('/api/orders', formData);
    }

    fetchOrders(currentPage);
    setShowModal(false);
  };

  return (
    <Container className="py-4">

      {/* HEADER */}
      <Row className="mb-4 align-items-center">
        <Col><h3>📦 Orders</h3></Col>
        <Col className="text-end">
          <Button onClick={handleAdd}>+ New Order</Button>
        </Col>
      </Row>

      {/* LOADING */}
      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
          <Spinner animation="border" />
          <p className="mt-3 text-muted">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center mt-5">
          <h5>No orders yet</h5>
          <Button onClick={handleAdd}>+ Create Order</Button>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="d-none d-md-block">
            <Table bordered striped hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Shipping</th>
                  <th>Final</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id}>
                    <td>{idx + 1}</td>
                    <td>{order.customerName}</td>
                    <td>{order.date}</td>

                    <td>
                      <ul className="mb-0 ps-3">
                        {order.products.slice(0, 2).map((p, i) => (
                          <li key={i}>{p.name} × {p.quantity}</li>
                        ))}
                        {order.products.length > 2 && (
                          <small className="text-muted">
                            +{order.products.length - 2} more
                          </small>
                        )}
                      </ul>
                    </td>

                    <td>₹{order.totalBeforeShipping.toFixed(2)}</td>
                    <td>₹{order.shipping || 0}</td>
                    <td className="fw-bold">₹{order.totalAfterShipping.toFixed(2)}</td>

                    <td>
                      <Badge bg={order.isFulfilled ? 'success' : 'secondary'}>
                        {order.isFulfilled ? 'Done' : 'Pending'}
                      </Badge>
                    </td>

                    <td>
                      <Button size="sm" onClick={() => handleEdit(order)} className="me-2">
                        <FaEdit />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(order._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* MOBILE VIEW */}
          <div className="d-md-none">
            {orders.map((order) => (
              <div key={order._id} className="border rounded p-3 mb-3 shadow-sm">

                {/* HEADER */}
                <div
                  className="d-flex justify-content-between"
                  onClick={() =>
                    setExpandedId(expandedId === order._id ? null : order._id)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <h6 className="mb-0">{order.customerName}</h6>
                    <small className="text-muted">{order.date}</small>
                  </div>

                  <Badge bg={order.isFulfilled ? 'success' : 'secondary'}>
                    {order.isFulfilled ? 'Done' : 'Pending'}
                  </Badge>
                </div>

                {/* PREVIEW */}
                <ul className="mt-2 ps-3">
                  {order.products.slice(0, 2).map((p, i) => (
                    <li key={i}>{p.name} × {p.quantity}</li>
                  ))}
                  {order.products.length > 2 && (
                    <small className="text-muted">
                      +{order.products.length - 2} more
                    </small>
                  )}
                </ul>

                {/* EXPANDED */}
                {expandedId === order._id && (
                  <div className="mt-2 border-top pt-2">
                    {order.products.map((p, i) => (
                      <div key={i}>
                        {p.name} × {p.quantity} = ₹{(p.price * p.quantity).toFixed(2)}
                      </div>
                    ))}

                    <div className="mt-2">
                      <div>Total: ₹{order.totalBeforeShipping.toFixed(2)}</div>
                      <div>Shipping: ₹{order.shipping || 0}</div>
                      <div className="fw-bold">
                        Final: ₹{order.totalAfterShipping.toFixed(2)}
                      </div>
                    </div>

                    {order.message && (
                      <div className="mt-2 text-muted small">
                        Note: {order.message}
                      </div>
                    )}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="d-flex justify-content-between mt-3 border-top pt-2">
                  <Button size="sm" onClick={() => handleEdit(order)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(order._id)}>Delete</Button>
                </div>

              </div>
            ))}
          </div>
        </>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          />

          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          />
        </Pagination>
      )}

      {/* MODAL */}
      <OrderFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        form={form}
        setForm={setForm}
      />

      {/* TOAST */}
      <Toast
        show={toast.show}
        onClose={() => setToast({ show: false, message: '' })}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>

    </Container>
  );
};

export default Orders;