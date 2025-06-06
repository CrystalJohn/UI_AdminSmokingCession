import React, { useState } from 'react';
import './CoachManagement.css';
import ReusableTable from '../../components/ReusableTable/ReusableTable.jsx';
import { Modal, Tabs, Form, Input, DatePicker, Select, Button } from 'antd';

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
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: '', order: '' });
  const [showAddCoachModal, setShowAddCoachModal] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('basic');

  const columns = [
    { title: 'User ID', dataIndex: 'id', sortable: true, key: 'id' },
    { title: 'Coach name', dataIndex: 'name', sortable: true, key: 'name' },
    { title: 'Email', dataIndex: 'email', sortable: true, key: 'email' },
    { title: 'Expertise', dataIndex: 'expertise', render: (value) => (
      <>{value.map((exp, i) => <span className="expertise-badge" key={i}>{exp}</span>)}</>
    ) },
    { title: 'Rating', dataIndex: 'rating', sortable: true, key: 'rating', render: (value) => (
      <>{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < value ? 'star filled' : 'star'}>★</span>)}</>
    ) },
    { title: 'Number of consultations today', dataIndex: 'todayConsults', sortable: true, key: 'todayConsults' },
    { title: 'Number of cases currently consulting', dataIndex: 'currentCases', sortable: true, key: 'currentCases' },
    { title: 'Joining date', dataIndex: 'joinDate', sortable: true, key: 'joinDate' },
    { title: 'Status', dataIndex: 'status', sortable: true, key: 'status', render: (value) => (
      <span className={`status-badge ${statusColors[value]}`}>{value}</span>
    ) },
    { title: 'Action', dataIndex: 'action', render: () => (
      <>
        <button className="action-btn edit">Edit</button>
        <button className="action-btn details">See Details</button>
      </>
    ) },
  ];

  // Sorting logic
  const sortedCoaches = React.useMemo(() => {
    if (!sortConfig.key) return coaches;
    const sorted = [...coaches].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.order === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [coaches, sortConfig]);

  // Pagination logic
  const paginatedCoaches = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedCoaches.slice(start, start + pageSize);
  }, [sortedCoaches, page, pageSize]);

  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        // Toggle order
        return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { key, order: 'asc' };
    });
    setPage(1); // Reset to first page on sort
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddCoach = () => {
    form.validateFields().then(() => {
      // Handle form submission here (e.g., API call)
      setShowAddCoachModal(false);
      form.resetFields();
    });
  };

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
        <button className="add-user-btn" onClick={() => setShowAddCoachModal(true)}>+ Add Coach</button>
      </div>
      <div className="coach-table-wrapper">
        <ReusableTable
          columns={columns}
          data={paginatedCoaches}
          pagination={{ page, pageSize, total: coaches.length }}
          onPageChange={handlePageChange}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>
      <Modal
        title="Add New Coach"
        open={showAddCoachModal}
        onCancel={() => setShowAddCoachModal(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'basic',
              label: 'Basic Info',
              children: (
                <Form
                  form={form}
                  layout="vertical"
                  name="add-coach-form"
                  initialValues={{ gender: 'Nam', status: 'Active' }}
                >
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter full name' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Email (for login)"
                        name="email"
                        rules={[
                          { required: true, message: 'Please enter email' },
                          { type: 'email', message: 'Please enter a valid email' },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="Birth Date" name="birthDate">
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item label="Avatar URL (placeholder)" name="avatarUrl">
                        <Input placeholder="https://example.com/avatar.jpg" />
                      </Form.Item>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Form.Item
                        label="Profile Name"
                        name="profileName"
                        rules={[{ required: true, message: 'Please enter profile name' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="Phone number" name="phone">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Gender" name="gender">
                        <Select>
                          <Select.Option value="Nam">Nam</Select.Option>
                          <Select.Option value="Nữ">Nữ</Select.Option>
                          <Select.Option value="Khác">Khác</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Account Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select account status' }]}
                      >
                        <Select>
                          <Select.Option value="Active">Active</Select.Option>
                          <Select.Option value="Inactive">Inactive</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Initial Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter initial password' }]}
                      >
                        <Input.Password placeholder="At least 6 characters" />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              ),
            },
            {
              key: 'professional',
              label: 'Professional Info',
              children: (
                <Form layout="vertical">
                  <Form.Item label="Experience Description" name="experience">
                    <Input.TextArea rows={6} />
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <Button onClick={() => setShowAddCoachModal(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleAddCoach}>
            Add Coach
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CoachManagement; 