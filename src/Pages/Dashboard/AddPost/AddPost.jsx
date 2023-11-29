import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddPost = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [userPostCount, setUserPostCount] = useState(0);
    const [showForm, setShowForm] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch user's post count from the API
        // Replace the following line with your actual API call
        const fetchUserPostCount = async () => {
            // const userPostCount = await api.getUserPostCount();
            const userPostCount = 2; // Replace with the actual count from the API response
            setUserPostCount(userPostCount);
            setShowForm(userPostCount < 5);
        };

        fetchUserPostCount();
    }, []);

    const onSubmit = async (data) => {
        const postData = {
            author: {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            },
            title: data.postTitle,
            description: data.postDescription,
            tags: data.tag.value,
            time: new Date(data.date).toISOString(),
            upVote: 0,
            downVote: 0,
            commentsCount: 0,
        };

        try {
            const response = await axiosSecure.post('/posts', postData);
            console.log('Post added successfully. Post ID:', response.data.postId);
            // You can handle success (e.g., show a success message)
            reset();
        } catch (error) {
            console.error('Error adding post:', error);
            // You can handle errors (e.g., show an error message)
        }
    };

    const redirectToMembership = () => {
        // Redirect to the Membership Page
        // Replace the following line with your actual route for the Membership Page
        // history.push('/membership');
        console.log('Redirect to Membership Page');
    };

    const tags = ['Code', 'WebDev', 'AI', 'ML', 'Security', 'Data', 'Cloud', 'Apps', 'Blockchain'];

    const tagOptions = tags.map((tag) => ({ value: tag, label: tag }));

    return (
        <div>
            <div className='mx-24 bg-gray-200 p-10 rounded-xl'>
                {showForm ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-7">
                            <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">Post Title</label>
                            <input
                                type="text"
                                {...register('postTitle', { required: true })}
                                className="mt-1 p-3 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-7">
                            <label htmlFor="postDescription" className="block text-sm font-medium text-gray-700">Post Description</label>
                            <textarea
                                {...register('postDescription', { required: true })}
                                rows="4"
                                className="mt-1 p-3 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                            ></textarea>
                        </div>
                        <div className="mb-7">
                            <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag*</label>
                            <Select
                                {...register('tag', { required: true })}
                                options={tagOptions}
                                onChange={(selectedOption) => {
                                    setValue('tag', selectedOption);
                                }}
                            />
                        </div>
                        <div className="mb-7">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                {...register('date', { required: true })}
                                className="mt-1 p-3 w-full bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-8">
                            <button
                                type="submit"
                                className="btn flex items-center bg-sky-700 text-white px-4 py-3 rounded-md hover:bg-amber-500 hover:text-gray-200"
                            >
                                <span>Add Post</span>
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p>You have reached the maximum post limit. Become a member to add more posts.</p>
                        <button
                            onClick={redirectToMembership}
                            className="btn bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-400 hover:text-gray-200"
                        >
                            Become a Member
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPost;
