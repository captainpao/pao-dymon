import { PaoTable } from '../../components/PaoTable';

export function TableComponent() {
  // Mock columns for the table
  const columns = [
    { key: 'id', header: 'ID', sortable: true, width: '10%' },
    { key: 'name', header: 'Name', sortable: true, width: '25%' },
    { key: 'email', header: 'Email', sortable: true, width: '25%' },
    { key: 'age', header: 'Age', sortable: true, width: '10%' },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '15%',
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
      width: '15%',
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
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      age: '32',
      status: 'Pending',
      actions: 'Edit'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      age: '25',
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      age: '29',
      status: 'Inactive',
      actions: 'Edit'
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      age: '35',
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '6',
      name: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      age: '27',
      status: 'Pending',
      actions: 'Edit'
    },
    {
      id: '7',
      name: 'David Lee',
      email: 'david.lee@example.com',
      age: '31',
      status: 'Active',
      actions: 'Edit'
    },
    {
      id: '8',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      age: '26',
      status: 'Active',
      actions: 'Edit'
    }
  ];

  return (
    <div className='container p-3'>
      <h2 className="mb-4">Sample Page with PaoTable Component</h2>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">User Management Table</h5>
        </div>
        <div className="card-body">
          <PaoTable
            columns={columns}
            rows={rows}
            striped={true}
            hover={true}
            bordered={true}
            size="md"
          />
        </div>
      </div>
    </div>
  )
}
