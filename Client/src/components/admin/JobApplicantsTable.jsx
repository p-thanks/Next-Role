import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICANT_API_END_POINT } from '@/utils/constant';


const shortListingStatus = ["Accepted", "Rejected"];

const JobApplicantsTable = () => {

    const { allApplicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const response = await axios.post(`${APPLICANT_API_END_POINT}/status/${id}/update`,
                { status }, {
                withCredentials: true
            })
            // console.log(response.data);


            if (response.data.success) {
                toast.success(response.data.message);
            }


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        allApplicants && allApplicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume
                                            ?
                                            <a
                                                className="hover:text-blue-600 cursor-pointer"
                                                href={item.applicant?.profile?.resume}
                                                target='_blank'>
                                                {item.applicant?.profile?.resumeOriginalName}
                                            </a>
                                            :
                                            <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className='cursor-pointer' />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortListingStatus?.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span className='cursor-pointer'>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }


                </TableBody>

            </Table>
        </div>
    )
}

export default JobApplicantsTable
