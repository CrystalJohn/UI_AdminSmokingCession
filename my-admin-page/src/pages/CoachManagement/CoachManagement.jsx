import React, { useState } from 'react';
import './CoachManagement.css';

const summary = [
  { label: 'Active Coaches', value: 5 },
  { label: "Today's Consultations", value: 7 },
  { label: 'Avg. Rating', value: '4.8 / 5', icon: '⭐' },
];

const mockCoaches = [
  {
    id: 'C001',
    name: 'Emma Sarah',
    email: 'emma.jack@example.com',
    expertise: ['Quit Smoking', 'Reduce Stress'],
    rating: 4,
    todayConsults: 2,
    currentCases: 1,
    joinDate: '16/1/2023',
    status: 'ACTIVE',
  },
  {
    id: 'C002',
    name: 'David Sad',
    email: 'emma.jack@example.com',
    expertise: ['Quit Smoking', 'Healthy lifestyle'],
    rating: 4,
    todayConsults: 4,
    currentCases: 2,
    joinDate: '16/1/2023',
    status: 'INACTIVE',
  },
  {
    id: 'C003',
    name: 'Emma Saraher',
    email: 'emma.jack@example.com',
    expertise: ['Quit Smoking', 'Fitness'],
    rating: 5,
    todayConsults: 0,
    currentCases: 1,
    joinDate: '16/1/2023',
    status: 'ACTIVE',
  },
];

const statusColors = {
  'ACTIVE': 'status-active',
  'INACTIVE': 'status-inactive',
};

const CoachManagement = () => {
  const [coaches] = useState(mockCoaches);

  return (
    <div className="coach-management-page">
      <h2>Coach Management</h2>
      <div className="summary-cards-row">
        <div className="summary-card">
          <div className="summary-label">Active Coaches</div>
          <div className="summary-value">5</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Today's Consultations</div>
          <div className="summary-value">7</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Avg. Rating</div>
          <div className="summary-value rating-value"><span role="img" aria-label="star">⭐</span> 4.8 / 5</div>
        </div>
      </div>
      <div className="list-title">List of coaches</div>
      <div className="search-filter-row">
        <input className="search-input" placeholder="Search by name, email, profile name..." />
        <select className="filter-select"><option>Filter expertise</option></select>
        <select className="filter-select"><option>Filter status</option></select>
        <button className="add-user-btn">+ Add user</button>
      </div>
      <div className="coach-table-wrapper">
        <table className="coach-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Coach name</th>
              <th>Expertise</th>
              <th>Expertise</th>
              <th>Rating</th>
              <th>Number of consultations today</th>
              <th>Number of cases currently consulting</th>
              <th>Joining date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach, idx) => (
              <tr key={idx}>
                <td>{coach.id}</td>
                <td>{coach.name}</td>
                <td>{coach.email}</td>
                <td>
                  {coach.expertise.map((exp, i) => (
                    <span className="expertise-badge" key={i}>{exp}</span>
                  ))}
                </td>
                <td>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < coach.rating ? 'star filled' : 'star'}>★</span>
                  ))}
                </td>
                <td>{coach.todayConsults}</td>
                <td>{coach.currentCases}</td>
                <td>{coach.joinDate}</td>
                <td>
                  <span className={`status-badge ${statusColors[coach.status]}`}>{coach.status}</span>
                </td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn details">See Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoachManagement; 