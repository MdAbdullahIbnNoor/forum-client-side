import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddAnnouncement = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {

            const res = await axiosSecure.post('/announcement', data);

            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Announcement added successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Failed to add announcement',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error adding announcement:', error);
        }
    };

    return (
        <div>
            <div className='lg:mx-24 bg-gray-200 p-4 lg:p-10 rounded-xl'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Author Name */}
                    <div className='mb-7'>
                        <label htmlFor='authorName' className='block text-sm font-medium text-gray-700'>
                            Author Name*
                        </label>
                        <input
                            type='text'
                            {...register('authorName', { required: true })}
                            className='mt-1 p-3 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
                        />
                    </div>

                    {/* Title */}
                    <div className='mb-7'>
                        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                            Title*
                        </label>
                        <input
                            type='text'
                            {...register('title', { required: true })}
                            className='mt-1 p-3 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
                        />
                    </div>

                    {/* Description */}
                    <div className='mb-7'>
                        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                            Description*
                        </label>
                        <textarea
                            {...register('description', { required: true })}
                            rows='4'
                            className='mt-1 p-3 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
                        ></textarea>
                    </div>

                    {/* Author Image URL */}
                    <div className='mb-7'>
                        <label htmlFor='authorImage' className='block text-sm font-medium text-gray-700'>
                            Author Image URL*
                        </label>
                        <input
                            type='text'
                            {...register('authorImage', { required: true })}
                            className='mt-1 p-3 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-indigo-500'
                        />
                    </div>

                    {/* Submit Button */}
                    <div className='mb-8'>
                        <button
                            type='submit'
                            className='btn flex items-center bg-sky-700 text-white px-4 py-3 rounded-md hover:bg-sky-500 hover:text-gray-200'
                        >
                            <span>Add Announcement</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAnnouncement;
