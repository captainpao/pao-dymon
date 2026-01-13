import { useState, useMemo } from 'react';
import fundsData from '../../data/funds-catalog.json';
import { PaoTable } from '../../components/PaoTable';
import { FaThLarge, FaListUl, FaCaretUp, FaCaretDown } from "react-icons/fa";

export function DiscoverFunds() {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCurrency, setFilterCurrency] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchedFundName, setSearchedFundName] = useState('');

  const sortedAndFilteredFunds = useMemo(() => {
    let filtered = fundsData.filter(fund => {
      if (filterType !== 'all' && fund.fundType !== filterType) return false;
      if (filterCurrency !== 'all' && fund.currency !== filterCurrency) return false;
      if (searchedFundName && !fund.name.toLowerCase().includes(searchedFundName.toLowerCase())) return false;
      return true;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField as keyof typeof a];
        let bValue = b[sortField as keyof typeof b];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStr = String(aValue);
        const bStr = String(bValue);
        return sortDirection === 'asc'
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return filtered;
  }, [sortField, sortDirection, filterType, filterCurrency, searchedFundName]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Table column configuration
  const tableColumns = [
    { key: 'name', header: 'Fund Name', sortable: true },
    { key: 'price', header: 'Price', sortable: true },
    { key: 'currency', header: 'Currency', sortable: true },
    { key: 'performance', header: 'Performance', sortable: true },
    { key: 'dividendYield', header: 'Dividend Yield', sortable: true },
    { key: 'riskRating', header: 'Risk Rating', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      render: () => <button className="btn btn-sm btn-outline-primary">View</button>
    }
  ];

  const tableRows = sortedAndFilteredFunds.map(fund => ({
    name: fund.name,
    price: `${fund.currency} ${fund.price.toFixed(2)}`,
    currency: fund.currency,
    performance: `${fund.performanceType === 'gain' ? '+' : ''}${fund.performance}`,
    dividendYield: fund.dividendYield,
    riskRating: fund.riskRating,
    actions: 'View'
  }));

  return (
    <div className='container p-3'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2>Discover ({sortedAndFilteredFunds.length} funds)</h2>

        <div className='btn-group' role='group'>
          <button
            type='button'
            className={`btn btn-sm ${viewMode === 'card' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('card')}
          >
            <FaThLarge size={16} />
          </button>
          <button
            type='button'
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('table')}
          >
            <FaListUl size={16} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className='row g-3 mb-4'>
        <div className='col-12'>
          <input
            type='search'
            className='form-control'
            placeholder='Search fund name'
            value={searchedFundName}
            onChange={(e) => setSearchedFundName(e.target.value)}
          />
        </div>
        <div className='col-md-4'>
          <label className='form-label'>Filter by Type</label>
          <select
            className='form-select form-select-sm'
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value='all'>All Types</option>
            <option value='Equity'>Equity</option>
            <option value='Income'>Income</option>
            <option value='Cash'>Cash</option>
            <option value='Real Estate'>Real Estate</option>
          </select>
        </div>

        <div className='col-md-4'>
          <label className='form-label'>Filter by Currency</label>
          <select
            className='form-select form-select-sm'
            value={filterCurrency}
            onChange={(e) => setFilterCurrency(e.target.value)}
          >
            <option value='all'>All Currencies</option>
            <option value='SGD'>SGD</option>
            <option value='USD'>USD</option>
          </select>
        </div>

        <div className='col-md-4'>
          <label className='form-label'>Sort by</label>
          <select
            className='form-select form-select-sm'
            value={`${sortField}-${sortDirection}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-');
              setSortField(field);
              setSortDirection(direction as 'asc' | 'desc');
            }}
          >
            <option value='null'>Default</option>
            <option value='name-asc'>Name (A-Z)</option>
            <option value='name-desc'>Name (Z-A)</option>
            <option value='price-asc'>Price (Low to High)</option>
            <option value='price-desc'>Price (High to Low)</option>
            <option value='performance-asc'>Performance (Low to High)</option>
            <option value='performance-desc'>Performance (High to Low)</option>
            <option value='riskRating-asc'>Risk Rating (Low to High)</option>
            <option value='riskRating-desc'>Risk Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* View Toggle - Card View */}
      {viewMode === 'card' && (
        <div className='row'>
          {sortedAndFilteredFunds.map((fund, index) => (
            <div key={index} className='col-12 col-md-6 col-lg-4 mb-3'>
              <div className='card h-100 shadow-sm'>
                <div className='card-body'>
                  <div className='d-flex justify-content-between mb-2'>
                    <div>
                      {fund.fundSelect ? <span className='badge bg-success px-2 mb-1'>Fund Select</span> : ''}
                      <h6 className='card-title text-primary mb-0'>{fund.name}</h6>
                    </div>
                    <h5 className='text-nowrap'>{fund.currency} {fund.price.toFixed(2)}</h5>
                  </div>

                  <div className='row g-1 mb-3'>
                    <div className='col-6'>
                      <small className='text-muted'>Price</small>
                      <div className='fw-semibold'>{fund.currency} {fund.price.toFixed(2)}</div>
                    </div>
                    <div className='col-6'>
                      <small className='text-muted'>Performance</small>
                      <div className={`fw-semibold ${
                        fund.performanceType === 'gain' ? 'text-success' : 'text-danger'
                      }`}>
                        {fund.performance}{fund.performanceType === 'gain' ? <FaCaretUp /> : <FaCaretDown />}
                      </div>
                    </div>
                    <div className='col-6'>
                      <small className='text-muted'>Dividend Yield</small>
                      <div className='fw-semibold'>{fund.dividendYield}</div>
                    </div>
                    <div className='col-6'>
                      <small className='text-muted'>Risk Rating</small>
                      {/* <div>
                        {'★'.repeat(parseInt(fund.riskRating))}
                        {'☆'.repeat(5 - parseInt(fund.riskRating))}
                      </div> */}
                      <div className='fw-semibold'>{fund.riskRating}</div>
                    </div>
                  </div>

                  <button className='btn btn-primary btn-sm w-100'>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Toggle - Table View */}
      {viewMode === 'table' && (
        <PaoTable
          columns={tableColumns}
          rows={tableRows}
          striped={true}
          hover={true}
          bordered={true}
          size="sm"
        />
      )}

      {sortedAndFilteredFunds.length === 0 && (
        <div className='text-center py-5'>
          <p className='text-muted'>No funds match your filters</p>
        </div>
      )}
    </div>
  );
}