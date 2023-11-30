import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyPost = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await axiosSecure.get('/users/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [axiosSecure]);

    // Function to handle Comment button click
    const handleCommentButtonClick = (postTitle) => {
        // Redirect to the page where the user can see comments for the selected post
        // You can use react-router-dom or any other routing method here
        navigate(`/dashboard/comments/${postTitle}`);
    };

    // Function to handle Delete button click
    const handleDeleteButtonClick = async (postId) => {
        try {
            // Send a delete request to the server
            const response = await axiosSecure.delete(`/posts/${postId}`);

            // Check if the deletion was successful
            if (response.data.deletedCount === 1) {
                // Update the local state to remove the deleted post
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
                console.log('Post deleted successfully');

                // Fetch posts again to refresh the list
                fetchPosts();
            } else {
                console.error('Error deleting post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        <div className="recent-posts mt-8">
            <h3 className="text-2xl font-bold mb-4">Your Posts</h3>
            {posts.length > 0 ? (
                <div className="dark:text-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full rounded-3xl">
                            <colgroup>
                                <col className="w-16" />
                                <col />
                                <col className="w-24" />
                                <col className="w-24" />
                                <col className="w-30" />
                                <col className="w-24" />
                            </colgroup>
                            <thead className="dark:bg-gray-700">
                                <tr className="text-left">
                                    <th className="px-4 py-4">Serial</th>
                                    <th className="px-4 py-4">Title</th>
                                    <th className="px-9 py-4">Time</th>
                                    <th className="px-4 py-4">UpVote</th>
                                    <th className="px-4 py-4">DownVote</th>
                                    <th className="px-4 py-4">Comments</th>
                                    <th className="px-8 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post._id} className="border-b border-opacity-20 dark:border-gray-700 text-violet-950">
                                        <td className="p-4 text-center">{index + 1}</td>
                                        <td className="p-4">{post.title}</td>
                                        <td className="p-4">{post.time.slice(0, 9)}</td>
                                        <td className="p-4 text-red-600 text-center">{post.upVote}</td>
                                        <td className="p-4 text-red-600 text-center">{post.downVote}</td>
                                        <td className="p-4 text-red-600 text-center">{post.commentsCount}</td>
                                        <td className="p-4 flex justify-around">
                                            <button onClick={() => handleCommentButtonClick(post.title)} className="bg-blue-500 text-white px-4 py-2 rounded-full">
                                                See Comment
                                            </button>
                                            <button onClick={() => handleDeleteButtonClick(post._id)} className="bg-red-500 text-white px-4 py-2 rounded-full">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default MyPost;
