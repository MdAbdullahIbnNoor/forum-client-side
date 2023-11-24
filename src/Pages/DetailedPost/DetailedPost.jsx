import React, { useState } from 'react';

const DetailedPost = () => {
    const post = {
        id: 1,
        title: 'Lorem Ipsum',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        upVotes: 15,
        downVotes: 5,
        comments: [
            { id: 1, author: 'User1', text: 'Great post!' },
            { id: 2, author: 'User2', text: 'I enjoyed reading this.' },
        ],
    };

    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        // Handle submitting the comment (you may want to send it to a server or update state)
        console.log('Comment submitted:', comment);
        // Clear the comment input field
        setComment('');
    };

    return (
        <div className="container mx-auto">
            <div className="max-w-2xl mx-auto">
                {/* Post details */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                    <p className="text-gray-600">{post.content}</p>
                </div>

                {/* Upvote, downvote, share options */}
                <div className="flex items-center mb-4 space-x-4">
                    <button className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        <span>{post.upVotes}</span>
                    </button>
                    <button className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5M12 19l-7-7 7-7"></path>
                        </svg>
                        <span>{post.downVotes}</span>
                    </button>
                    <button className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        <span>Share</span>
                    </button>
                </div>

                {/* Comment section */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Comments</h3>
                    <ul>
                        {post.comments.map((comment) => (
                            <li key={comment.id} className="mb-4">
                                <p className="text-gray-800 font-bold">{comment.author}</p>
                                <p className="text-gray-600">{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Comment input */}
                <div className="mb-4">
                    <textarea
                        className="w-full h-24 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={handleCommentChange}
                    ></textarea>
                </div>

                {/* Submit comment button */}
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handleCommentSubmit}
                    >
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailedPost