import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const PAGE_SIZE = 10;

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&pageSize=${PAGE_SIZE}`);
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                                icon: 'success'
                            });
                        }
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    const totalPages = Math.ceil(users.length / PAGE_SIZE);

    const renderUsers = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const currentUsers = users.slice(startIndex, endIndex);

        return currentUsers.map((user, index) => (
            <tr key={user._id}>
                <td>{startIndex + index + 1}</td>
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
                <th>
                    {user.role === 'admin' ? 'Admin' : (
                        <button onClick={() => handleMakeAdmin(user)} className="btn bg-sky-700 btn-square text-white text-2xl">
                            <FaUsers />
                        </button>
                    )}
                </th>
                <th>
                    <button onClick={() => handleDeleteUser(user)} className="btn bg-red-600 btn-square text-white text-2xl">
                        <AiTwotoneDelete />
                    </button>
                </th>
            </tr>
        ));
    };

    return (
        <div>
            <div className="flex justify-evenly px-20 mt-8 mb-4">
                <h1 className="text-3xl font-bold">All Users</h1>
                <h1 className="text-3xl font-bold">Total Users: {users.length}</h1>
            </div>

            <div className="overflow-x-auto lg:w-4/5 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead className="">
                        <tr className="bg-sky-700">
                            <th className="text-white py-4">#</th>
                            <th className="uppercase text-white py-4">User Name</th>
                            <th className="uppercase text-white py-4">User Email</th>
                            <th className="uppercase text-white py-4">Role</th>
                            <th className="uppercase text-white py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>{renderUsers()}</tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`mx-2 px-4 py-2 ${currentPage === i + 1 ? 'bg-sky-700 text-white' : 'bg-white text-sky-700 border border-sky-700'}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
