import React, { useState } from 'react'

const Login = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className='w-[100vw] h-[90vh] flex items-center justify-center'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-0'>
          <span>username</span>
          <input placeholder='enter username' value={username} type='text' onChange={(e) => setUsername(e.target.value)}
            className='bg-[#EAEAEA]'
          />
        </div>

        <div className='flex flex-col gap-0'>
          <span>password</span>
          <input placeholder='enter password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}
            className='bg-[#EAEAEA]'
          />
        </div>

        <div>
          <button className='rounded-full bg-black px-4 flex items-center h-6'>
            <span className='text-white text-[.6rem] font-bold'>LOG IN</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login