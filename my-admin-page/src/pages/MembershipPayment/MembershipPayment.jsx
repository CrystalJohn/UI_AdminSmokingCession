import React, { useState } from 'react';
import './MembershipPayment.css';
import { FaHourglassHalf, FaChartLine, FaCrown, FaUserFriends } from 'react-icons/fa';
import ReusableTable from '../../components/ReusableTable/ReusableTable.jsx';
import SearchFilterRow from '../../components/SearchFilterRow/SearchFilterRow.jsx';

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

const paymentColumns = [
  { title: 'Transaction ID', dataIndex: 'id' },
  { title: 'Package name', dataIndex: 'package' },
  { title: 'User ID', dataIndex: 'userId' },
  { title: 'Email Users', dataIndex: 'email' },
  { title: 'Amount', dataIndex: 'amount' },
  { title: 'Payment Date', dataIndex: 'date' },
  { title: 'Status', dataIndex: 'status', render: (value) => (
    <span className={`status-badge ${statusColors[value]}`}>{value}</span>
  ) },
  { title: 'Action', dataIndex: 'action', render: () => (
    <button className="action-btn view">👁 View/Process</button>
  ) },
];

const planColumns = [
  { title: 'Transaction ID', dataIndex: 'id' },
  { title: 'Package name', dataIndex: 'package' },
  { title: 'Describe', dataIndex: 'describe' },
  { title: 'Amount', dataIndex: 'amount' },
  { title: 'Duration', dataIndex: 'duration' },
  { title: 'Status', dataIndex: 'status', render: (value) => (
    <span className={`status-badge ${statusColors[value]}`}>{value}</span>
  ) },
  { title: 'Action', dataIndex: 'action', render: () => (
    <>
      <button className="action-btn edit">✏️ Edit</button>
      <button className="action-btn deactivate">Deactivate</button>
    </>
  ) },
];

const paymentFilterConfig = [
  { key: 'search', type: 'text', placeholder: 'Search by Transaction ID, Email, User ID...', value: '' },
  { key: 'package', type: 'select', value: '', options: [
    { value: '', label: 'Registration package' },
    { value: 'Premium monthly', label: 'Premium monthly' },
    { value: 'Premium Year', label: 'Premium Year' },
    { value: 'Basic Free', label: 'Basic Free' },
  ] },
  { key: 'status', type: 'select', value: '', options: [
    { value: '', label: 'Account status' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'FAIL', label: 'Fail' },
  ] },
  { key: 'startDate', type: 'date', value: '', placeholder: 'Start date' },
  { key: 'endDate', type: 'date', value: '', placeholder: 'End date' },
];

const planFilterConfig = [
  { key: 'package', type: 'select', value: '', options: [
    { value: '', label: 'Registration package' },
    { value: 'Premium monthly', label: 'Premium monthly' },
    { value: 'Premium Year', label: 'Premium Year' },
    { value: 'Basic Free', label: 'Basic Free' },
  ] },
  { key: 'status', type: 'select', value: '', options: [
    { value: '', label: 'Account status' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
  ] },
];

const MembershipPayment = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [payments] = useState(mockPayments);
  const [plans] = useState(mockPlans);
  const [filters, setFilters] = useState({
    search: '',
    package: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Filtering logic (demo, can be expanded)
  const filteredPayments = payments.filter(payment => {
    const searchMatch =
      !filters.search ||
      payment.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      payment.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      payment.userId.toLowerCase().includes(filters.search.toLowerCase());
    const packageMatch = !filters.package || payment.package === filters.package;
    const statusMatch = !filters.status || payment.status === filters.status;
    return searchMatch && packageMatch && statusMatch;
  });

  const filteredPlans = plans.filter(plan => {
    const packageMatch = !filters.package || plan.package === filters.package;
    const statusMatch = !filters.status || plan.status === filters.status;
    return packageMatch && statusMatch;
  });

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
      <SearchFilterRow
        filters={activeTab === 'history' ? paymentFilterConfig : planFilterConfig}
        onFilterChange={handleFilterChange}
      />
      <div className="payment-table-wrapper">
        <ReusableTable
          columns={activeTab === 'history' ? paymentColumns : planColumns}
          data={activeTab === 'history' ? filteredPayments : filteredPlans}
        />
      </div>
    </div>
  );
};

export default MembershipPayment; 