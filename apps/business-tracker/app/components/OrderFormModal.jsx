'use client'

import React, { useEffect, useState } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter,
  Form, FormLabel, FormGroup, FormControl, FormSelect,
  Accordion, AccordionItem, AccordionHeader, AccordionBody,
  Button
} from 'react-bootstrap';

const OrderFormModal = ({ show, onClose, onSubmit, isEditMode, form, setForm }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (show) fetchCategories();
  }, [show]);

  // Auto totals
  useEffect(() => {
    const subTotal = form.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    let discountAmount = 0;
    if (form.discountType === 'percent') {
      discountAmount = (parseFloat(form.discount) || 0) * subTotal / 100;
    } else if (form.discountType === 'rs') {
      discountAmount = parseFloat(form.discount) || 0;
    }

    const totalBeforeShipping = subTotal - discountAmount;
    const totalAfterShipping = totalBeforeShipping + (parseFloat(form.shipping) || 0);

    setForm(prev => ({
      ...prev,
      totalBeforeShipping,
      totalAfterShipping
    }));
  }, [form.products, form.discount, form.shipping, form.discountType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProductQuantityChange = (product, change, categoryType) => {
    setForm(prevForm => {
      const existing = prevForm.products.find(p => p.id === product.id);
      let updatedProducts;

      if (existing) {
        const newQty = existing.quantity + change;
        if (newQty <= 0) {
          updatedProducts = prevForm.products.filter(p => p.id !== product.id);
        } else {
          updatedProducts = prevForm.products.map(p =>
            p.id === product.id ? { ...p, quantity: newQty } : p
          );
        }
      } else if (change > 0) {
        updatedProducts = [
          ...prevForm.products,
          { id: product.id, name: product.name, price: product.price, quantity: 1, type: categoryType }
        ];
      } else return prevForm;

      return { ...prevForm, products: updatedProducts };
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      fullscreen="md-down"   // 🔥 FULLSCREEN ON MOBILE
    >
      <ModalHeader closeButton>
        <ModalTitle>{isEditMode ? 'Edit Order' : 'Add Order'}</ModalTitle>
      </ModalHeader>

      {/* SCROLLABLE BODY */}
      <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Form>

          {/* CUSTOMER */}
          <FormGroup className="mb-3">
            <FormLabel>Customer Name</FormLabel>
            <FormControl
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Date</FormLabel>
            <FormControl
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </FormGroup>

          {/* PRODUCTS */}
          <FormGroup className="mb-3">
            <FormLabel>Products</FormLabel>

            <Accordion alwaysOpen>
              {categories.map((group, index) => (
                <AccordionItem eventKey={index.toString()} key={group._id}>
                  <AccordionHeader>
                    {group.type} ({group.category})
                  </AccordionHeader>

                  <AccordionBody style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {group.itemList.map(product => {
                      const selected = form.products.find(p => p.id === product.id);

                      return (
                        <div
                          key={product.id}
                          className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
                        >
                          <div style={{ maxWidth: '60%' }}>
                            <div className="fw-semibold">{product.name}</div>
                            <small className="text-muted">₹{product.price}</small>
                          </div>

                          {/* BIGGER TOUCH BUTTONS */}
                          <div className="d-flex align-items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleProductQuantityChange(product, -1, group.type)}
                            >
                              −
                            </Button>

                            <span>{selected?.quantity || 0}</span>

                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleProductQuantityChange(product, 1, group.type)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </AccordionBody>
                </AccordionItem>
              ))}
            </Accordion>
          </FormGroup>

          {/* DISCOUNT + SHIPPING (STACKED MOBILE) */}
          <div className="d-flex flex-column flex-md-row gap-2">
            <FormGroup className="mb-3 flex-fill">
              <FormLabel>Discount</FormLabel>
              <div className="d-flex gap-2">
                <FormSelect
                  name="discountType"
                  value={form.discountType}
                  onChange={handleChange}
                >
                  <option value="">Type</option>
                  <option value="rs">₹</option>
                  <option value="percent">%</option>
                </FormSelect>

                <FormControl
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                />
              </div>
            </FormGroup>

            <FormGroup className="mb-3 flex-fill">
              <FormLabel>Shipping</FormLabel>
              <FormControl
                type="number"
                name="shipping"
                value={form.shipping}
                onChange={handleChange}
              />
            </FormGroup>
          </div>

          {/* TOTALS */}
          <FormGroup className="mb-3">
            <FormLabel>Total Before Shipping</FormLabel>
            <FormControl readOnly value={form.totalBeforeShipping.toFixed(2)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Total After Shipping</FormLabel>
            <FormControl readOnly value={form.totalAfterShipping.toFixed(2)} />
          </FormGroup>

          {/* STATUS */}
          <FormGroup className="mb-3">
            <FormLabel>Status</FormLabel>
            <FormSelect
              name="isFulfilled"
              value={form.isFulfilled.toString()}
              onChange={(e) =>
                setForm(prev => ({ ...prev, isFulfilled: e.target.value === 'true' }))
              }
            >
              <option value="false">Pending</option>
              <option value="true">Fulfilled</option>
            </FormSelect>
          </FormGroup>

          {/* NOTES */}
          <FormGroup className="mb-3">
            <FormLabel>Notes</FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </FormGroup>

        </Form>
      </ModalBody>

      {/* STICKY FOOTER */}
      <ModalFooter className="position-sticky bottom-0 bg-white">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OrderFormModal;