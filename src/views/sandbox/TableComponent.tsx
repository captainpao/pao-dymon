import { PaoTable } from '../../components/PaoTable';
import { useState } from 'react';

export function TableComponent() {
  // State for selected rows
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  // Mock columns for the table
  const columns = [
    { key: 'id', header: 'ID', sortable: true, width: '5%' },
    { key: 'name', header: 'Name', sortable: true, width: '15%' },
    { key: 'email', header: 'Email', sortable: true, width: '15%' },
    { key: 'age', header: 'Age', sortable: true, width: '5%' },
    { key: 'sex', header: 'Sex', sortable: true, width: '5%' },
    { key: 'dateOfBirth', header: 'Date of Birth', sortable: true, width: '10%' },
    { key: 'occupation', header: 'Occupation', sortable: true, width: '15%' },
    { key: 'phone', header: 'Phone', sortable: true, width: '12%' },
    {
      key: 'feedback',
      header: 'Feedback',
      sortable: false,
      width: '15%'
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '8%',
      render: (value: string) => {
        const badgeType = value.toLowerCase() === 'active' ? 'success' :
                         value.toLowerCase() === 'pending' ? 'warning' :
                         value.toLowerCase() === 'inactive' ? 'danger' : 'secondary';
        return <span className={`badge bg-${badgeType}`}>{value}</span>;
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      width: '10%',
      render: (value: string) => <button className="btn btn-sm btn-outline-primary">{value}</button>
    }
  ];

  // Mock rows data
  const rows = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: '28',
      sex: 'M',
      dateOfBirth: '1995-03-15',
      occupation: 'Software Engineer',
      phone: '(555) 123-4567',
      feedback: 'Excellent team player, always delivers high-quality code on time.',
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      age: '32',
      sex: 'F',
      dateOfBirth: '1991-07-22',
      occupation: 'Marketing Manager',
      phone: '(555) 234-5678',
      feedback: 'Exceptional leadership skills and creative approach to marketing campaigns.',
      status: 'Pending',
      actions: 'Edit'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      age: '25',
      sex: 'M',
      dateOfBirth: '1998-11-08',
      occupation: 'Data Analyst',
      phone: '(555) 345-6789',
      feedback: 'Strong analytical skills. Would benefit from more experience with data visualization tools.',
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      age: '29',
      sex: 'F',
      dateOfBirth: '1994-05-30',
      occupation: 'UX Designer',
      phone: '(555) 456-7890',
      feedback: 'Great eye for design and user experience. Demonstrates strong attention to detail.',
      status: 'Inactive',
      actions: 'Edit'
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      age: '35',
      sex: 'M',
      dateOfBirth: '1989-01-12',
      occupation: 'Project Manager',
      phone: '(555) 567-8901',
      feedback: 'Experienced manager with strong organizational skills. Needs to improve team communication.',
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '6',
      name: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      age: '27',
      sex: 'F',
      dateOfBirth: '1996-09-18',
      occupation: 'Sales Representative',
      phone: '(555) 678-9012',
      feedback: 'Outstanding performance in sales. Consistently exceeds targets and builds strong client relationships.',
      status: 'Pending',
      actions: 'Edit'
    },
    {
      id: '7',
      name: 'David Lee',
      email: 'david.lee@example.com',
      age: '31',
      sex: 'M',
      dateOfBirth: '1992-12-03',
      occupation: 'DevOps Engineer',
      phone: '(555) 789-0123',
      feedback: 'Solid technical knowledge and willingness to learn new technologies. Good team collaboration.',
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '8',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      age: '26',
      sex: 'F',
      dateOfBirth: '1997-06-25',
      occupation: 'Content Writer',
      phone: '(555) 890-1234',
      feedback: 'Creative writer with excellent grammar skills. Content quality consistently meets standards.',
      status: 'Active',
      actions: 'Edit'
    }
  ];

  // Handler for selection changes
  const handleSelectionChange = (selectedIds: (string | number)[]) => {
    setSelectedRows(selectedIds);
  };

  return (
    <div className='container p-3'>
      <h2 className="mb-4">PaoTable Component Demo</h2>

      {/* Selection Status Display */}
      <div className="alert alert-info mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Selection Feature Demo</strong>
            <p className="mb-0">Try selecting rows using the checkboxes. The header checkbox supports select all/deselect all functionality.</p>
          </div>
          <div className="text-end">
            <span className="badge bg-primary fs-6">
              {selectedRows.length} row(s) selected
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="row mb-3">
        <div className="col-md-6">
          <h5>Selected Users:</h5>
          <div className="p-2 bg-light rounded" style={{ minHeight: '100px' }}>
            {selectedRows.length > 0 ? (
              <code className="d-block text-dark">
                {selectedRows.join(', ')}
              </code>
            ) : (
              <small className="text-muted">No users selected</small>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <h5>Selected User Details:</h5>
          <div className="p-2 bg-light rounded" style={{ minHeight: '100px' }}>
            {selectedRows.length > 0 ? (
              <ul className="list-unstyled mb-0">
                {selectedRows.map(id => {
                  const user = rows.find(row => row.id === id);
                  return user ? (
                    <li key={id} className="mb-1">
                      <strong>{user.name}</strong> - {user.occupation}
                    </li>
                  ) : null;
                }).filter(Boolean)}
              </ul>
            ) : (
              <small className="text-muted">No user details available</small>
            )}
          </div>
        </div>
      </div>

      {/* Table with Selection Enabled */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Comprehensive User Directory with Selection</h5>
        </div>
        <div className="card-body">
          <PaoTable
            columns={columns}
            rows={rows}
            striped={true}
            hover={true}
            bordered={true}
            size="md"
            minWidth={1500}
            selectable={true}
            onSelectionChange={handleSelectionChange}
            rowIdKey="id"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="card mt-3">
        <div className="card-body">
          <h6 className="mb-3">How to use the selection feature:</h6>
          <ul className="mb-0">
            <li><strong>Select Individual Rows:</strong> Click the checkbox next to each user to select them individually</li>
            <li><strong>Select All:</strong> Click the checkbox in the table header to select/deselect all users at once</li>
            <li><strong>Indeterminate State:</strong> The header checkbox shows a line (-) when only some users are selected</li>
            <li><strong>Maintain Selection:</strong> Selections persist when sorting columns</li>
          </ul>
          <hr className="my-3"/>
          <h6 className="mb-3">New Feature: Column Management</h6>
          <ul className="mb-0">
            <li><strong>Manage Columns:</strong> Click the FaColumns icon in the top-right corner to show/hide columns</li>
            <li><strong>Reorder Columns:</strong> Drag handles (☰) let you reorder columns by drag & drop</li>
            <li><strong>Visual Feedback:</strong> Columns highlight on hover during reordering</li>
            <li><strong>Persistent State:</strong> Column visibility and order remain when selecting rows or sorting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
