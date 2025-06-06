import React, { useState } from 'react';
import './BlogManagement.css';

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
        <table className="blog-table">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Creation date</th>
              <th>Last updated</th>
              <th>Status</th>
              <th>Views</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={idx}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.creationDate}</td>
                <td>{post.lastUpdated}</td>
                <td>
                  <span className={`status-badge ${statusColors[post.status]}`}>{post.status.replace('_', ' ')}</span>
                </td>
                <td>{post.views}</td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                  <button className="action-btn cancel">Cancel publication</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogManagement; 