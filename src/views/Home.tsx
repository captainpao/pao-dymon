import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className='container p-3'>
      <h1 className='text-primary text-center'>Dymon Asia</h1>
      <p className='text-center'>UIUX Prototypes : Vite + React + TypeScript + Redux + React Router</p>
      <div className='row'>
        <div className='col-md-6 col-lg-4'>
          <div className='card h-100'>
            <div className='card-body'>
              <h5 className='card-title'>Online Mutual Fund</h5>
              <ul className='list-unstyled mb-0'>
                <li><Link to="/omf-discover-funds">Discover Funds</Link></li>
                <li><Link to="/sample-page">Sample Page</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='col-md-6 col-lg-4'>
          <div className='card h-100'>
            <div className='card-body'>
              <h5 className='card-title'>Sandbox</h5>
              <ul className='list-unstyled mb-0'>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/responsive-grid">Responsive Grid</Link></li>
                <li><Link to="/icons-search">Icons Search</Link></li>
                <li><Link to="/data-visualisation">Data Visualisation</Link></li>
                <li><Link to="/table-component">Table Component</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
