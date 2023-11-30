import React from 'react';
import { BiLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    const handleUpVote = () => {
        // Handle upvote logic
    };

    const handleDownVote = () => {
        // Handle downvote logic
    };

    const handleShare = () => {
        // Handle share logic
    };

    return (
        <Link to={`/detailedPost/${post._id}`} className="cursor-pointer">
            <div className="card card-side bg-white shadow-xl h-64">
                <figure>
                    <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-48 h-full object-cover rounded-t-md"
                    />
                </figure>
                <div className="card-body">
                    {/* Author Section */}
                    <div className="flex items-center">
                        <span className=" font-semibold text-xl text-sky-600">{post.author.name}</span>
                    </div>

                    {/* Post Content */}
                    <h2 className="card-title text-2xl font-semibold mb-1">{post.title}</h2>
                    <p className="text-gray-600 mb-1">{post.description.slice(0, 70)}</p>

                    {/* Tags, Time, Comments Count, and Votes Count */}
                    <div className="flex flex-col items-start justify-between text-sm text-gray-100 mb-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-sky-500 px-2 py-1 rounded">
                                {post.tags}
                            </span>
                        </div>
                        <div className='text-gray-600 flex'>
                            <p className="mr-2 font-medium">Date: <span className='text-sky-400 font-medium text-base'>{post.time.slice(0, 9)}</span></p>
                            <p className="mr-2 font-medium">Comments: <span className='text-sky-400 font-medium text-base'>{post.commentsCount}</span></p>
                            <p className="ml-2 font-medium">Votes: <span className='text-sky-400 font-medium text-base'>{post.upVote - post.downVote}</span></p>
                        </div>
                    </div>

                    {/* Additional Buttons (UpVote, DownVote, Share) */}
                    {/* <div className="flex items-center space-x-4">
                    <button className="text-blue-500 text-lg" onClick={handleUpVote}>
                        <BiLike />
                    </button>
                    <button className="text-red-500 text-lg" onClick={handleDownVote}>
                        <BiSolidDislike />
                    </button>
                    <button className="text-green-500 text-lg" onClick={handleShare}>
                        <FaShareSquare />
                    </button>
                </div> */}
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
