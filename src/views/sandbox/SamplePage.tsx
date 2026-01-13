export function SamplePage() {
  return (
    <div className='container p-3'>
      Sample Page

      <select
        className='form-select form-select-sm'
        onChange={() => {}}
      >
        <option value='all'>All Currencies</option>
        <option value='SGD'>SGD</option>
        <option value='USD'>USD</option>
      </select>
    </div>
  )
}
