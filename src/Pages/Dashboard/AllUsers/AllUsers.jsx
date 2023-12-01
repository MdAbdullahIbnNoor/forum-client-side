import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AiTwotoneDelete } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            // console.log(res.data);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        console.log(user);
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }
    return (

        <div>
            <div className='flex justify-evenly px-20 mt-8 mb-4'>
                <h1 className='text-3xl font-bold'>All Users</h1>
                <h1 className='text-3xl font-bold'>Total Users: {users.length}</h1>
            </div>

            <div className="overflow-x-auto lg:w-4/5 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead className=''>
                        <tr className='bg-amber-700'>
                            <th className='text-white py-4'>#</th>
                            <th className='uppercase text-white py-4'>User Name</th>
                            <th className='uppercase text-white py-4'>User Email</th>
                            {/* <th className='uppercase text-white py-4'>Item Price</th> */}
                            <th className='uppercase text-white py-4'>Role</th>
                            <th className='uppercase text-white py-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div>
                                        <div className="font-semibold text-base">{user.name}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-semibold text-base">{user.email}</div>
                                    </div>
                                </td>
                                {/* <td className='text-lg font-semibold text-amber-700'>${user.price}</td> */}
                                <th>
                                    {
                                        user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn bg-amber-700 btn-square text-white text-2xl"><FaUsers /></button>
                                    }
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteUser(user)} className="btn bg-red-600 btn-square text-white text-2xl"><AiTwotoneDelete /></button>
                                </th>
                            </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default AllUsers