import { Link } from 'react-router-dom'
import { Counter } from '../../features/counter/Counter'

export function CounterPage() {
  return (
    <div className='container p-3'>
      <h1 className='text-primary'>Counter Example</h1>
      <Counter />
      <nav>
        <Link to="/">
          Back to Home
        </Link>
      </nav>
    </div>
  )
}
