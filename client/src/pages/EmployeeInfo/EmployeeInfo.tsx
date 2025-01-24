import * as React from 'react';


  
   

const EmployeeInfo:React.FC = () => {
  return (
    <>
      <div className='employee-personal-data mt-20'>
        <div className='border-2 rounded-lg w-full max-w-screen-sm mx-auto '>
        <div className='flex items-center justify-between border-b p-3'>
            <h4 className='font-semibold'>FirstName:-</h4>
            <h3>Ethnic</h3>
        </div>
        <div className='flex items-center justify-between border-b p-3'>
            <h4 className='font-semibold'>LastName:-</h4>
            <h3>infotech</h3>
        </div>
        <div className='flex items-center justify-between border-b p-3'>
            <h4 className='font-semibold'>JobRole:-</h4>
            <h3>designer</h3>
        </div>
        <div className='flex items-center justify-between border-b p-3'>
            <h4 className='font-semibold'>Email:-</h4>
            <h3>Ethnicinfotech@gmail.com</h3>
        </div>
        <div className='flex items-center justify-between border-b p-3'>
            <h4 className='font-semibold'>Phone:-</h4>
            <h3>1234567980</h3>
        </div>
        <div className='flex items-center justify-between border-b p-3'>
            <h4 className='font-semibold'>Status:-</h4>
            <h3>Register</h3>
        </div>
        </div>
      </div>
     
    </>
  )
}

export default EmployeeInfo
