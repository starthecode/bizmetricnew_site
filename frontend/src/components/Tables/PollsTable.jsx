import React, { useState } from 'react';
import { formatDate } from '../../utils/utils';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

export default function PollsTable({ data = [] }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const downloadExcel = () => {
    const formatted = data.map((item) => ({
      id: item._id,
      Date: formatDate(item.createdAt),
      pollName: item.pollName,
      answer: item.answerName,
      ipaddress: item.ipAddress,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Poll Data');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const fileData = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(fileData, `polldata_${new Date().toISOString()}.xlsx`);
  };

  //   const handleCheckboxChange = (id) => {
  //     setSelectedIds((prev) =>
  //       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
  //     );
  //   };

  //   const handleDelete = () => {
  //     if (!selectedIds.length === 0) {
  //       alert('Please select a record to delete.');
  //       return;
  //     }

  //     const confirmDelete = window.confirm(
  //       `Are you sure you want to delete ${selectedIds.length} this inquires?`
  //     );
  //     if (confirmDelete && onDelete) {
  //       onDelete(selectedIds);
  //       setSelectedIds([]);
  //     }
  //   };

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
          {/* <button
            onClick={handleDelete}
            className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button> */}
          <Link
            to={'/dashboard/customizer/poll'}
            className="bg-royalBlue-400 text-white text-sm px-3 py-1 rounded hover:bg-royalBlue-700"
          >
            Add Poll
          </Link>
        </div>
      </div>

      <table className="w-full border text-sm bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Id</th>
            <th className="p-2">Date</th>
            <th className="p-2">Poll name</th>
            <th className="p-2">Answer</th>
            <th className="p-2">Visitor IP</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item._id} className="border-t hover:bg-gray-50">
              {/* <td className="p-2">
                <input
                  type="checkbox"
                  name="selectedItem"
                  checked={selectedIds.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
              </td> */}
              <td className="p-2 font-medium text-gray-800">{item._id}</td>
              <td className="p-2 text-blue-700">
                {' '}
                {formatDate(item.createdAt)}
              </td>
              <td className="p-2">{item.pollName || 'N/A'}</td>
              <td className="p-2 badge w-fit">{item.answerName}</td>
              <td className="p-2">{item.ipAddress}</td>
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
