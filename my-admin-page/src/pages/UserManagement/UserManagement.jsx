import React, { useState } from 'react';
import './UserManagement.css';
import ReusableTable from '../../components/ReusableTable/ReusableTable.jsx';
import SearchFilterRow from '../../components/SearchFilterRow/SearchFilterRow.jsx';

const mockUsers = [
  {
    id: 'U001',
    name: 'Emma Sarah',
    author: 'emma.jack@example.com',
    profile: 'Emma158',
    role: 'Customer',
    membership: 'Premium',
    joinDate: '16/1/2023',
    lastActivity: '2024-10-15',
    status: 'active',
  },
  {
    id: 'U002',
    name: 'Emma Sarah',
    author: 'emma.jack@example.com',
    profile: 'Emma158',
    role: 'Customer',
    membership: 'Free',
    joinDate: '16/1/2023',
    lastActivity: '2024-09-07',
    status: 'active',
  },
  {
    id: 'U003',
    name: 'Emma Sarah',
    author: 'emma.jack@example.com',
    profile: 'Emma158',
    role: 'Coach',
    membership: 'Free',
    joinDate: '16/1/2023',
    lastActivity: '2024-09-15',
    status: 'active',
  },
  {
    id: 'U004',
    name: 'Emma Sarah',
    author: 'emma.jack@example.com',
    profile: 'Emma158',
    role: 'Customer',
    membership: 'Premium',
    joinDate: '16/1/2023',
    lastActivity: '2024-09-11',
    status: 'locked',
  },
  {
    id: 'U005',
    name: 'Emma Sarah',
    author: 'emma.jack@example.com',
    profile: 'Emma158',
    role: 'Customer',
    membership: 'Premium',
    joinDate: '16/1/2023',
    lastActivity: '2024-09-11',
    status: 'locked',
  },
  {
    id: 'U006',
    name: 'Emma Sarah',
    author: 'emma.jack@example.com',
    profile: 'Emma158',
    role: 'Customer',
    membership: 'Premium',
    joinDate: '16/1/2023',
    lastActivity: '2024-09-11',
    status: 'locked',
  },
];

const columns = [
  { title: 'User ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Author', dataIndex: 'author' },
  { title: 'Profile name', dataIndex: 'profile' },
  { title: 'Role', dataIndex: 'role', render: (value) => (
    <span className={value === 'Coach' ? 'role-coach' : 'role-customer'}>{value}</span>
  ) },
  { title: 'Membership package', dataIndex: 'membership', render: (value) => (
    <span className={value === 'Premium' ? 'membership-premium' : 'membership-free'}>{value}</span>
  ) },
  { title: 'Joining date', dataIndex: 'joinDate' },
  { title: 'Last activity', dataIndex: 'lastActivity' },
  { title: 'Action', dataIndex: 'action', render: (_, row) => (
    <div className="action-btns">
      <button className="edit-btn">Edit</button>
      <button className="details-btn">See Details</button>
      <button className="delete-btn">Delete</button>
      {row.status === 'locked' ? (
        <button className="lock-btn">Account Lock</button>
      ) : (
        <button className="unlock-btn">Unlock account</button>
      )}
    </div>
  ) },
];

const membershipOptions = [
  { value: '', label: 'Filter membership packages' },
  { value: 'Premium', label: 'Premium' },
  { value: 'Free', label: 'Free' },
];
const statusOptions = [
  { value: '', label: 'Filter account status' },
  { value: 'active', label: 'Active' },
  { value: 'locked', label: 'Locked' },
];
const roleOptions = [
  { value: '', label: 'Filter roles' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Coach', label: 'Coach' },
];

const UserManagement = () => {
  const [filters, setFilters] = useState({
    search: '',
    membership: '',
    status: '',
    role: '',
    startDate: '',
    endDate: '',
  });
  const [users] = useState(mockUsers);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Lọc dữ liệu theo filter (chỉ demo, có thể mở rộng)
  const filteredUsers = users.filter(user => {
    const searchMatch =
      filters.search === '' ||
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.author.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.profile.toLowerCase().includes(filters.search.toLowerCase());
    const membershipMatch = !filters.membership || user.membership === filters.membership;
    const statusMatch = !filters.status || user.status === filters.status;
    const roleMatch = !filters.role || user.role === filters.role;
    // Không lọc theo ngày ở đây, chỉ demo
    return searchMatch && membershipMatch && statusMatch && roleMatch;
  });

  const filterConfig = [
    {
      key: 'search',
      type: 'text',
      placeholder: 'Search by name, email, profile name...',
      value: filters.search,
    },
    {
      key: 'membership',
      type: 'select',
      value: filters.membership,
      options: membershipOptions,
    },
    {
      key: 'status',
      type: 'select',
      value: filters.status,
      options: statusOptions,
    },
    {
      key: 'role',
      type: 'select',
      value: filters.role,
      options: roleOptions,
    },
    {
      key: 'startDate',
      type: 'date',
      value: filters.startDate,
      placeholder: 'Start date',
    },
    {
      key: 'endDate',
      type: 'date',
      value: filters.endDate,
      placeholder: 'End date',
    },
  ];

  return (
    <div className="user-management-page">
      <h2>User Management</h2>
      <div className="search-filter-header">Search and Filter</div>
      <SearchFilterRow filters={filterConfig} onFilterChange={handleFilterChange}>
        <button className="add-user-btn">+ Add user</button>
      </SearchFilterRow>
      <div className="user-table-wrapper">
        <ReusableTable columns={columns} data={filteredUsers} />
      </div>
    </div>
  );
};

export default UserManagement;