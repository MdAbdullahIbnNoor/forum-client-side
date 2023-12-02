import React, { useEffect, useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';
import { FaFacebook, FaLinkedin, FaShareSquare, FaTwitter } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const DetailedPost = () => {
    const [post, setPost] = useState(useLoaderData());
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);

    const fetchData = async () => {
        try {
            const response = await axiosPublic.get(`/detailedPost/${post._id}`);
            setPost(response.data);

            // Fetch comments based on post title
            const commentsResponse = await axiosPublic.get(`/comments/${post.title}`);
            setComments(commentsResponse.data);
            setCount(commentsResponse.data.length); // Update count based on fetched comments
        } catch (error) {
            console.error('Error fetching updated data:', error);
        }
    };

    useEffect(() => {
        // Fetch initial data when the component mounts
        fetchData();
    }, []);

    const handleAction = async (actionType) => {
        try {
            let updatedData;

            if (actionType === 'upvote') {
                updatedData = {
                    upVote: post.upVote + 1,
                    downVote: post.downVote, // No change in downVote
                };
            } else if (actionType === 'downvote') {
                updatedData = {
                    upVote: post.upVote, // No change in upVote
                    downVote: post.downVote + 1,
                };
            }
            // else if (actionType === 'comment') {
            //     updatedData = {
            //         upVote: post.upVote, // No change in upVote
            //         downVote: post.downVote, // No change in downVote
            //         commentsCount: count + 1,
            //     };
            //     const response = await axiosPublic.patch(`/posts/${post._id}`, updatedData);
            // }

            const response = await axiosPublic.patch(`/posts/${post._id}`, updatedData);

            // Fetch updated post data after action
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleUpVote = () => {
        handleAction('upvote');
    };

    const handleDownVote = () => {
        handleAction('downvote');
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            const newComment = {
                userEmail: user.email,
                postTitle: post.title,
                comment: comment,
            };

            const response = await axiosPublic.post('/comments', newComment);
            console.log(response.data);

            const response2 = await axiosPublic.patch(`/posts/comment-increment/${post._id}`);
            console.log(response2.data);

            if (response2.status >= 200 && response2.status < 300) {
                // Fetch updated post data after adding a comment
                fetchData();
                setComment('');
            } else {
                // Handle non-success status codes
                console.error('Error updating commentsCount:', response2.status, response2.statusText);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };


    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);
        return formattedDate;
    };

    return (
        <div className="lg:max-w-screen-2xl bg-gray-700 py-20 lg:px-8">
            <div className="px-16">
                {/* Post details */}
                <div className="flex flex-row-reverse justify-center items-start pt-24 gap-14">
                    <div className="flex flex-col justify-center items-center w-1/4">
                        <img src={post.author?.image} alt="Blog post screenshot" className="object-cover h-20 w-20 rounded-full" />
                        <p className='text-white mt-3 text-xl font-serif font-semibold'>{post.author?.name}</p>
                    </div>
                    <div className="w-3/4">
                        <h1 className="text-gray-100 text-4xl font-semibold">{post.title}</h1>
                        <p className="text-gray-400 mt-1 mb-4">{formatDateTime(post.time)}</p>
                        <p className="text-gray-100 text-lg mt-7">{post.description}</p>
                    </div>
                </div>

                {/* Upvote, downvote, share options */}
                <div className="flex items-center space-x-7 my-7">
                    {user ? (
                        <>
                            <button className="text-blue-500 text-lg flex items-center gap-2" onClick={handleUpVote}>
                                <BiLike className='text-2xl' /> <span>{post.upVote}</span>
                            </button>
                            <button className="text-red-500 text-lg flex items-center gap-2" onClick={handleDownVote}>
                                <BiSolidDislike className='text-2xl' /> <span>{post.downVote}</span>
                            </button>
                            <p className='text-gray-100'>Share Option: </p>
                            <TwitterShareButton url={window.location.href} title={post.title}>
                                <FaTwitter className='text-2xl text-sky-400' />
                            </TwitterShareButton>

                            <FacebookShareButton url={window.location.href} quote={post.title}>
                                <FaFacebook className='text-2xl text-sky-400' />
                            </FacebookShareButton>

                            <LinkedinShareButton url={window.location.href} title={post.title}>
                                <FaLinkedin className='text-2xl text-sky-400' />
                            </LinkedinShareButton>
                        </>
                    ) : null}
                </div>

                {/* Comment input */}
                {
                    user ? (
                        <div className="mb-4">
                            <textarea
                                className="w-full h-24 p-4 border rounded-md focus:outline-none focus:border-blue-500 text-gray-700"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={handleCommentChange}

                            ></textarea>
                        </div>
                    ) : null
                }

                {/* Submit comment button */}
                {
                    user ? (
                        <div className="flex justify-end text-gray-50">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                onClick={handleCommentSubmit}
                            >
                                Add Comment
                            </button>
                        </div>
                    ) : null
                }

                {/* Comment section */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-sky-400">Comments</h3>
                    <ul>
                        {comments.map((comment, idx) => (
                            <li key={idx} className="mb-4">
                                <p className=" font-bold text-gray-50">{comment.userEmail}</p>
                                <p className="text-gray-100">{comment.comment}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div >
        </div >
    );
};

export default DetailedPost;
