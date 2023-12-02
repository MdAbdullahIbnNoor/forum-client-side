import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMember from '../../../hooks/useMember';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AddPost = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [showForm, setShowForm] = useState(true);
    const [tags, setTags] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [data, isMemberLoading, refetch] = useMember();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchTags = async () => {
          try {
            const response = await axiosPublic.get('/tags');
            setTags(response.data);
          } catch (error) {
            console.error('Error fetching tags:', error);
          }
        };
    
        fetchTags();
      }, [axiosPublic]);

    useEffect(() => {
        if (!isMemberLoading && data) {
            const { badge, postCount } = data;

            console.log('Badge in Add Post:', badge);
            console.log('Post Count in Add Post:', postCount);

            // Adjust the logic based on your membership criteria
            setShowForm(badge === 'Gold' || postCount < 5);
            console.log('Badge in Add Post:', badge);

        }
    }, [isMemberLoading, data]);


    const onSubmit = async (data) => {
        const postData = {
            author: {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
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
            // Check membership status again before posting
            const updatedData = await refetch();
            const { badge, postCount } = updatedData;

            // Adjust the logic based on your membership criteria
            setShowForm(badge === 'Gold' || postCount < 5);

            const response = await axiosSecure.post('/posts', postData);
            console.log('Post added successfully:', response.data);
            refetch();
            reset();
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    // const tags = ['Code', 'WebDev', 'AI', 'ML', 'Security', 'Data', 'Cloud', 'Apps', 'Blockchain'];

    const tagOptions = tags.map((tag) => ({ value: tag.tag, label: tag.tag }));

    if (isMemberLoading) {
        // You can add a loading spinner or other UI while checking the member status
        return <p>Loading...</p>;
    }

    console.log("Show Form Data: ", showForm);

    return (
        <div>
            <div className='lg:mx-24 mx-0 bg-gray-200 p-4 lg:p-10 rounded-xl'>
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
                        <Link to='/membership'>
                            <button
                                className="btn bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-400 hover:text-gray-200"
                            >
                                Become a Member
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPost;
