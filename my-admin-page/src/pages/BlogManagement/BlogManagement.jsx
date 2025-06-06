import React, { useState } from 'react';
import './BlogManagement.css';
import ReusableTable from '../../components/ReusableTable/ReusableTable.jsx';

const mockPosts = [
  {
    id: 'B001',
    title: 'Benefits of Quitting Smoking in the First Month',
    author: 'Lisa Thompson (Coach)',
    creationDate: '16/1/2023',
    lastUpdated: '2024-10-15',
    status: 'PUBLISHED',
    views: 1000,
  },
  {
    id: 'B002',
    title: 'Managing Withdrawal Symptoms Effectively',
    author: 'Emma (Admin)',
    creationDate: '16/1/2023',
    lastUpdated: '2024-09-07',
    status: 'UNDER REVIEW',
    views: 1530,
  },
  {
    id: 'B003',
    title: 'Smoking Cessation and Mental Health',
    author: 'Emma (Admin)',
    creationDate: '16/1/2023',
    lastUpdated: '2024-09-15',
    status: 'PUBLISHED',
    views: 0,
  },
  {
    id: 'B004',
    title: 'Smoking Cessation and Mental Health',
    author: 'Emma Sarah (Coach)',
    creationDate: '16/1/2023',
    lastUpdated: '2024-09-11',
    status: 'REJECTED',
    views: 0,
  },
  {
    id: 'B004',
    title: 'Smoking Cessation and Mental Health',
    author: 'Emma Sarah (Coach)',
    creationDate: '16/1/2023',
    lastUpdated: '2024-09-11',
    status: 'REJECTED',
    views: 0,
  },
  {
    id: 'B004',
    title: 'Smoking Cessation and Mental Health',
    author: 'Emma Sarah (Coach)',
    creationDate: '16/1/2023',
    lastUpdated: '2024-09-11',
    status: 'REJECTED',
    views: 0,
  },
];

const statusColors = {
  'PUBLISHED': 'status-published',
  'UNDER REVIEW': 'status-review',
  'REJECTED': 'status-rejected',
};

const BlogManagement = () => {
  const [posts] = useState(mockPosts);

  const columns = [
    { title: 'Post ID', dataIndex: 'id' },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Author', dataIndex: 'author' },
    { title: 'Creation date', dataIndex: 'creationDate' },
    { title: 'Last updated', dataIndex: 'lastUpdated' },
    { title: 'Status', dataIndex: 'status', render: (value) => (
      <span className={`status-badge ${statusColors[value]}`}>{value.replace('_', ' ')}</span>
    ) },
    { title: 'Views', dataIndex: 'views' },
    { title: 'Action', dataIndex: 'action', render: () => (
      <>
        <button className="action-btn edit">Edit</button>
        <button className="action-btn delete">Delete</button>
        <button className="action-btn cancel">Cancel publication</button>
      </>
    ) },
  ];

  return (
    <div className="blog-management-page">
      <h2>Blog Management</h2>
      <div className="search-filter-row">
        <input className="search-input" placeholder="Search by title, author..." />
        <select className="filter-select"><option>Filter by status</option></select>
        <select className="filter-select"><option>Filter by author</option></select>
        <select className="filter-select"><option>Filter by article</option></select>
        <input className="date-input" type="date" />
        <input className="date-input" type="date" />
        <button className="add-article-btn">+ Create new article</button>
      </div>
      <div className="blog-table-wrapper">
        <ReusableTable columns={columns} data={posts} />
      </div>
    </div>
  );
};

export default BlogManagement; 