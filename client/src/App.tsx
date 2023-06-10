import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './main'

const App = () => {

  const user = useSelector((state: RootState) => state.user.value)
  console.log(user)

  return (
    <div>
      <h1 className='text-red-500'>App</h1>
    </div>
  )
}

export default App