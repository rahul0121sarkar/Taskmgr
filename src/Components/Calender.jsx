import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css'

const Calender = () => {
    const [value,onChange] = React.useState(new Date());
  return (
    <div className='calender-container w-full max-w-md mx-auto'>
      <Calendar onChange={onChange} value={value} />
      {/* <p className='mt-4 text-center text-gray-700 font-medium'>
        Selected Date: {value.toDateString()}
      </p> */}
    </div>
  )
}

export default Calender
