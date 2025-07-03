import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import { handlePageDelete } from '../../utils/handlePageDelete';

export default function PublishPanel({ type, postid, pageDate, onDateChange }) {
  const [status, setStatus] = useState('Draft');
  const [editing, setEditing] = useState(false);
  const [tempStatus, setTempStatus] = useState(status);

  const [editingDate, setEditingDate] = useState(false);
  const [dateState, setDateState] = useState(new Date(pageDate || Date.now()));

  const navigate = useNavigate();

  useEffect(() => {
    if (postid) {
      setStatus('Published');
      setTempStatus('Published');
    }
  }, [postid]);

  const handleOk = () => {
    setStatus(tempStatus);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempStatus(status);
    setEditing(false);
  };

  const handleDateOk = () => {
    setEditingDate(false);
    if (onDateChange) onDateChange(dateState);
  };

  const handleDelete = (postid, type) => {
    handlePageDelete({ type, postid, navigate, toast });
  };

  return (
    <div className="w-full max-w-sm p-4 border rounded shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Publish</h3>
        <div className="text-xl cursor-pointer">▾</div>
      </div>

      <div className="mb-3 text-sm">
        <strong>Status:</strong>{' '}
        {!editing ? (
          <>
            {status}{' '}
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 underline text-xs ml-1"
            >
              Edit
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <select
              value={tempStatus}
              onChange={(e) => setTempStatus(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option>Published</option>
              <option>Pending Review</option>
              <option>Draft</option>
            </select>
            <div className="flex gap-2 text-sm">
              <button
                onClick={handleOk}
                className="text-blue-600 border border-blue-600 px-2 py-1 rounded"
              >
                OK
              </button>
              <button
                onClick={handleCancel}
                className="text-blue-600 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm mb-3">
        <span className="text-gray-700">Publish on:</span>{' '}
        {!editingDate ? (
          <>
            {formatDate(dateState.toISOString())}{' '}
            <button
              onClick={() => setEditingDate(true)}
              className="text-blue-600 underline text-xs ml-1"
            >
              Edit
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="datetime-local"
              value={dateState.toISOString().slice(0, 16)}
              onChange={(e) => setDateState(new Date(e.target.value))}
              className="border px-2 py-1 rounded"
            />
            <div className="flex gap-2 text-sm">
              <button
                onClick={handleDateOk}
                className="text-blue-600 border border-blue-600 px-2 py-1 rounded"
              >
                OK
              </button>
              <button
                onClick={() => setEditingDate(false)}
                className="text-blue-600 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-junglegreen-500 text-white font-medium px-4 py-2 rounded w-full hover:bg-blue-700 transition mt-4"
      >
        {postid ? 'Update' : 'Publish'}
      </button>

      {postid && (
        <button
          type="button"
          onClick={() => handleDelete(postid, type)}
          className="w-full flex justify-end px-1 pt-3"
        >
          <BiTrash size={25} color="red" />
        </button>
      )}
    </div>
  );
}
