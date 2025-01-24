import AddNewStudent from '@/components/addNewStudent/AddNewStudent'
import EmployeeCard from '@/components/employeeCard/EmployeeCard'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import EmployeeInfo from '../EmployeeInfo/EmployeeInfo'

const EmployeePage:React.FC = () => {
  return (
   <>
     <div className='mb-6 flex items-center justify-between'>
     <h1 className='text-2xl font-semibold'>employee page</h1>
     <AddNewStudent/>
     </div>
     <EmployeeCard/>

     {/* <EmployeeInfo/> */}
   </>
  )
}

export default EmployeePage
