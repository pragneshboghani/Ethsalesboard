import * as React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DeveloperApis } from '@/services/DeveloperApis';
import { Developer } from '@/dto/company';



const EmployeeCard: React.FC = () => {

    const [employeeData, setEmployeeData] = React.useState<Developer[] | []>([])

    const getEmployeeList = async () => {
        try {
            const reesponse = await DeveloperApis.developer_list()
            setEmployeeData(reesponse?.data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getEmployeeList();
    }, [])
    console.log("employeeData:123:", employeeData)
    // const EmployeeData = [
    //     {
    //         image: '/Employee-img/employee-1.jpg',
    //         name:'shyam kathiriya',
    //         role:'Web Designer',
    //         email:'sk.ethnicinfotetech@gmail.com',
    //         phone:'7779024442',

    //     },
    //     {
    //         image:'/Employee-img/employee-2.jpg',
    //         name:'Hemal Patel',
    //         role:'Web Developer',
    //         email:'sk.ethnicinfotetech@gmail.com',
    //         phone:'7779024442',

    //     },
    // ]

    // console.log("emp data is==>", EmployeeData[0])

    return (
        <>
            <div className='grid grid-cols-4 gap-10'>
                {
                    employeeData.map((val, i) => (

                        <Card className='border-none relative rounded-xl overflow-hidden shadow-[0px_0px_20px_rgba(0,0,0,0.2)] w-full'>
                            <div className='w-full absolute border h-[65px] bg-primary_background'></div>
                            <CardHeader>
                                <div className='relative flex justify-between'>
                                    <div className='h-20 w-20  rounded-full mb-3 overflow-hidden border-2 border-white outline outline-primary_background'>
                                        <img className=' w-full' src={val.profile[0]?.fileURL} alt={val.name} />
                                    </div>
                                    <div className='text-end text-white'>
                                        <CardDescription className='text-white'><span className='font-semibold'>FirstName:- </span>{val.firstName}</CardDescription>
                                        <CardDescription className='text-white'><span className='font-semibold'>LastName:- </span>{val.lastName}</CardDescription>
                                    </div>
                                </div>


                                <div className='flex flex-col gap-2'>
                                    <CardDescription className='flex justify-between'><span className='font-bold'>Job Role:-</span>{val.currentPosition || 'No Role'}</CardDescription>
                                    <CardDescription className='flex justify-between'><span className='font-bold'>Education:-</span>{val.education[0]?.degree || "No field of study available"}</CardDescription>
                                    <CardDescription className='flex justify-between'> <span className='font-bold'>Email:-</span>{val.email}</CardDescription>
                                    <CardDescription className='flex justify-between'><span className='font-bold'>Phone:-</span>{val.mobileNumber}</CardDescription>
                                    <CardDescription className='flex justify-between'><span className='font-bold'>Starus:-</span>{val.status}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>

                    ))
                }
            </div>
        </>
    )
}

export default EmployeeCard
