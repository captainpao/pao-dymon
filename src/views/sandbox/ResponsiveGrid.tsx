import '../../Grid15.css'

export function ResponsiveGrid() {
  const cards = [
    {
      title: 'Card Title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      button: 'Button'
    },
    {
      title: 'Card Title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      button: 'Button'
    },
    {
      title: 'Card Title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      button: 'Button'
    },
    {
      title: 'Card Title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      button: 'Button'
    },
    {
      title: 'Card Title',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      button: 'Button'
    }
  ]

  return (
    <div className='container p-3'>
      <div className='row'>
        {cards.map((card, index) => (
          <div key={index} className='col-12 col-md-6 col-lg-4 col-xl-3 mb-3'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{card.title}</h5>
                <p className='card-text small'>{card.text}</p>
                <button className='btn btn-primary w-100'>{card.button}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='fifteen-row'>
        {cards.map((card, index) => (
          <div key={index} className='fifteen-col-15 fifteen-col-lg-5 fifteen-col-xl-3 mb-3'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{card.title}</h5>
                <p className='card-text small'>{card.text}</p>
                <button className='btn btn-primary w-100'>{card.button}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
