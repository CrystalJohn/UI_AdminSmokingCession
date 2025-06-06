import React, { useState } from 'react';
import './MembershipPayment.css';
import { FaHourglassHalf, FaChartLine, FaCrown, FaUserFriends } from 'react-icons/fa';

const summary = [
  { label: 'Payment Is Pending', value: 5, icon: <FaHourglassHalf /> },
  { label: 'Revenue This Month', value: 7, icon: <FaChartLine /> },
  { label: 'Premium Member', value: '$1000', icon: <FaCrown /> },
  { label: 'Free Users', value: 2, icon: <FaUserFriends /> },
];

const mockPayments = [
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    userId: 'U001',
    email: 'an.nguyen@example.com',
    amount: '$50',
    date: '2/1/2024',
    status: 'COMPLETED',
  },
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    userId: 'U001',
    email: 'an.nguyen@example.com',
    amount: '$50',
    date: '2/1/2024',
    status: 'PENDING',
  },
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    userId: 'U001',
    email: 'an.nguyen@example.com',
    amount: '$50',
    date: '2/1/2024',
    status: 'COMPLETED',
  },
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    userId: 'U001',
    email: 'an.nguyen@example.com',
    amount: '$50',
    date: '2/1/2024',
    status: 'FAIL',
  },
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    userId: 'U001',
    email: 'an.nguyen@example.com',
    amount: '$50',
    date: '2/1/2024',
    status: 'FAIL',
  },
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    userId: 'U001',
    email: 'an.nguyen@example.com',
    amount: '$50',
    date: '2/1/2024',
    status: 'FAIL',
  },
];

const mockPlans = [
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    describe: 'Full features, priority support.',
    amount: '$50',
    duration: '1 Month',
    status: 'ACTIVE',
  },
  {
    id: 'VNP001XYZ',
    package: 'Premium Year',
    describe: 'Save more with the yearly plan.',
    amount: '$50',
    duration: '1 Year',
    status: 'ACTIVE',
  },
  {
    id: 'VNP001XYZ',
    package: 'Basic Free',
    describe: 'Basic, limited features.',
    amount: '$50',
    duration: 'Forever',
    status: 'ACTIVE',
  },
  {
    id: 'F001',
    package: 'Premium monthly',
    describe: 'Full features, priority support.',
    amount: '$50',
    duration: '1 Month',
    status: 'INACTIVE',
  },
  {
    id: 'VNP001XYZ',
    package: 'Premium monthly',
    describe: 'Full features, priority support.',
    amount: '$50',
    duration: '1 Month',
    status: 'INACTIVE',
  },
  {
    id: 'VNP001XYZ',
    package: 'Basic Free',
    describe: 'Basic, limited features.',
    amount: '$50',
    duration: 'Forever',
    status: 'INACTIVE',
  },
];

const statusColors = {
  'COMPLETED': 'status-completed',
  'PENDING': 'status-pending',
  'FAIL': 'status-fail',
  'ACTIVE': 'status-active',
  'INACTIVE': 'status-inactive',
};

const MembershipPayment = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [payments] = useState(mockPayments);
  const [plans] = useState(mockPlans);

  return (
    <div className="membership-payment-page">
      <h2>Membership & Payment</h2>
      <div className="summary-cards-row">
        {summary.map((item, idx) => (
          <div className="summary-card" key={idx}>
            <div className="summary-label">{item.label}</div>
            <div className="summary-center">
              <span className="summary-icon-circle">{item.icon}</span>
              <div className="summary-value">{item.value}</div>
            </div>
            {item.subtext && (
              <div className="summary-subtext">{item.subtext}</div>
            )}
          </div>
        ))}
      </div>
      <div className="tabs-row">
        <div
          className={`tab${activeTab === 'history' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Payment History
        </div>
        <div
          className={`tab${activeTab === 'plan' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('plan')}
        >
          Payment Plan Management
        </div>
      </div>
      <div className="search-filter-row">
        <select className="filter-select"><option>Registration package</option></select>
        <select className="filter-select"><option>Account status</option></select>
        <input className="date-input" type="date" />
        <input className="date-input" type="date" />
      </div>
      {activeTab === 'history' ? (
        <div className="payment-table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Package name</th>
                <th>User ID</th>
                <th>Email Users</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={idx}>
                  <td>{payment.id}</td>
                  <td>{payment.package}</td>
                  <td>{payment.userId}</td>
                  <td>{payment.email}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.date}</td>
                  <td>
                    <span className={`status-badge ${statusColors[payment.status]}`}>{payment.status}</span>
                  </td>
                  <td>
                    <button className="action-btn view">👁 View/Process</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="payment-table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Package name</th>
                <th>Describe</th>
                <th>Amount</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, idx) => (
                <tr key={idx}>
                  <td>{plan.id}</td>
                  <td>{plan.package}</td>
                  <td>{plan.describe}</td>
                  <td>{plan.amount}</td>
                  <td>{plan.duration}</td>
                  <td>
                    <span className={`status-badge ${statusColors[plan.status]}`}>{plan.status}</span>
                  </td>
                  <td>
                    <button className="action-btn edit">✏️ Edit</button>
                    <button className="action-btn deactivate">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembershipPayment; 