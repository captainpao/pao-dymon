import { PaoTable } from '../../components/PaoTable';

export function TableComponent() {
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

  return (
    <div className='container p-3'>
      <h2 className="mb-4">Sample Page with PaoTable Component</h2>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Comprehensive User Directory</h5>
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
          />
        </div>
      </div>
    </div>
  )
}
