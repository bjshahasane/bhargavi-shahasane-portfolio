'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { generateOptionId } from '../utils/generateOrderId';
import { useDispatch } from 'react-redux';
import { fetchMenu } from '../slices/menuSlice';
import { useRouter } from 'next/navigation';
import { hideLoader, showLoader, showNotification } from '../slices/siteSettingSlice';

const EditableTable = ({ data, menuId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginToken, setLoginToken] = useState();
  const [editableData, setEditableData] = useState(data);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/pages/createUser');
    } else {
      setLoginToken(token);
    }
  }, []);

  const handleEditClick = (index) => setEditingIndex(index);

  const handleSaveClick = async (index) => {
    dispatch(showLoader(true));

    try {
      await fetch(`/api/menu?id=${menuId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify({ updateOption: editableData[index] }),
      });

      dispatch(fetchMenu());
      setEditingIndex(null);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoader(true));
    }
  };

  const handleInputChange = (e, index, key) => {
    const updated = [...editableData];
    updated[index][key] = e.target.value;
    setEditableData(updated);
  };

  const handleNewItemChange = (e) => {
    setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddNewItem = async () => {
    dispatch(showLoader(true));

    const newOption = {
      ...newItem,
      id: `${menuId}_${generateOptionId()}`,
    };

    try {
      await fetch(`/api/menu?id=${menuId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify({ addOption: newOption }),
      });

      setEditableData((prev) => [...prev, newOption]);
      setNewItem({ name: '', price: '' });
      dispatch(fetchMenu());
    } catch (err) {
      showNotification({ message: err, type: 'error' });
    } finally {
      dispatch(hideLoader(true));
    }
  };

  const handleDeleteClick = async (index) => {
    dispatch(showLoader(true));

    try {
      await fetch(`/api/menu?id=${menuId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify({ deleteOptionId: editableData[index].id }),
      });

      setEditableData((prev) => prev.filter((_, i) => i !== index));
      dispatch(fetchMenu());
    } catch (err) {
      showNotification({ message: err, type: 'error' });
    } finally {
      dispatch(hideLoader(true));
    }
  };

  return (
    <div className="table-responsive ipad-table mt-3">

      <Table striped bordered hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th style={{ width: '120px' }}>Price</th>
            <th style={{ width: '200px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {editableData.map((item, index) => (
            <tr key={item.id}>
              <td>
                {editingIndex === index ? (
                  <Form.Control
                    value={item.name}
                    onChange={(e) => handleInputChange(e, index, 'name')}
                  />
                ) : (
                  item.name
                )}
              </td>

              <td>
                {editingIndex === index ? (
                  <Form.Control
                    type="number"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, index, 'price')}
                  />
                ) : (
                  `₹ ${item.price}`
                )}
              </td>

              <td>
                <div className="d-flex gap-2 flex-wrap flex-md-nowrap">

                  {editingIndex === index ? (
                    <>
                      <Button size="sm" variant="success" onClick={() => handleSaveClick(index)}>
                        Save
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteClick(index)}>
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="primary" onClick={() => handleEditClick(index)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDeleteClick(index)}>
                        Delete
                      </Button>
                    </>
                  )}

                </div>
              </td>
            </tr>
          ))}

          {/* Add New Item */}
          <tr>
            <td>
              <Form.Control
                placeholder="Item name"
                name="name"
                value={newItem.name}
                onChange={handleNewItemChange}
              />
            </td>

            <td>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                value={newItem.price}
                onChange={handleNewItemChange}
              />
            </td>

            <td>
              <Button size="sm" variant="success" onClick={handleAddNewItem}>
                + Add
              </Button>
            </td>
          </tr>

        </tbody>
      </Table>

      <style jsx>{`
        .ipad-table {
          border-radius: 10px;
          overflow: hidden;
        }

        /* iPad optimization */
        @media (min-width: 768px) and (max-width: 1024px) {
          table td,
          table th {
            padding: 12px !important;
            font-size: 15px;
          }

          .btn {
            padding: 6px 10px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default EditableTable;