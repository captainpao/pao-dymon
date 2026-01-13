import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { increment, decrement, incrementByAmount } from './counterSlice'
import { useState } from 'react'

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => dispatch(decrement())}>-</button>
        <input type="text" className="form-control text-center" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value={count} readOnly />
        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => dispatch(increment())}>+</button>
      </div>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter amount" 
          aria-label="Enter amount" 
          aria-describedby="button-addon2" 
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button 
          className="btn btn-primary" 
          type="button" 
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
      </div>
    </div>
  )
}