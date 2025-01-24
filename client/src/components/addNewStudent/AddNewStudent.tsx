import * as React from 'react';
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label, SelectGroup, SelectLabel } from '@radix-ui/react-select';


const AddNewStudent: React.FC = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='bg-primary_background border-none outline-none '>Add New</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className='mb-3'>Add New Student Form</DialogTitle>
                        {/* <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}
                        <SelectGroup className='flex flex-col gap-4'>
                            <div>
                                <Label className='font-semibold mb-1 text-base'>First Name:</Label>
                                <Input />
                            </div>
                            <div>
                                <Label className='font-semibold mb-1'>Last Name:</Label>
                                <Input />
                            </div>
                            <div>
                                <Label className='font-semibold mb-1'>Job Role:</Label>
                                <Input />
                            </div>
                            <div>
                                <Label className='font-semibold mb-1'>Education:</Label>
                                <Input />
                            </div>
                            <div>
                                <Label className='font-semibold mb-1'>Email:</Label>
                                <Input />
                            </div>
                            <div>
                                <Label className='font-semibold mb-1'>Phone:</Label>
                                <Input type='number'/>
                            </div>
                            <div>
                                <Label className='font-semibold mb-1'>Status:</Label>
                                <Input />
                            </div>
                        </SelectGroup>
                    </DialogHeader>
                
                    <Button className='bg-primary_background border-none outline-none py-5'>Add New</Button>

                </DialogContent>
            </Dialog>

        </>
    )
}

export default AddNewStudent
