import React, { useState } from 'react';
import { formatDate } from '../../utils/utils';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ITEMS_PER_PAGE = 10;

export default function InquiryTable({ data = [], onDelete }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const downloadExcel = () => {
    const formatted = data.map((item) => ({
      'Full Name': item.fullName,
      Email: item.email,
      Phone: item.phone,
      Category: item.category,
      Source: item.source?.join(', '),
      Message: item.message,
      Date: formatDate(item.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inquiries');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const fileData = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(fileData, `inquiries_${new Date().toISOString()}.xlsx`);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (!selectedIds.length === 0) {
      alert('Please select a record to delete.');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} this inquires?`
    );
    if (confirmDelete && onDelete) {
      onDelete(selectedIds);
      setSelectedIds([]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          Total Inquiries: {data.length}
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded text-sm"
          />
          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
          >
            Download Excel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <table className="w-full border text-sm bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Select</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Category</th>
            <th className="p-2">Source</th>
            <th className="p-2">Message</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item._id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                <input
                  type="checkbox"
                  name="selectedItem"
                  checked={selectedIds.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
              </td>
              <td className="p-2 font-medium text-gray-800">{item.fullName}</td>
              <td className="p-2 text-blue-700">{item.email}</td>
              <td className="p-2">{item.phone || 'N/A'}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">{item.source?.join(', ')}</td>
              <td className="p-2">{item.message}</td>
              <td className="p-2 text-gray-500">
                {formatDate(item.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
        <span>{data.length} items</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            «
          </button>
          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
