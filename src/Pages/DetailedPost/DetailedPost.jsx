import React, { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';
import { FaFacebook, FaLinkedin, FaShareSquare, FaTwitter } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';

const DetailedPost = () => {
    const { _id, author, title, description, tags, time, upVote, downVote, commentsCount } = useLoaderData()

    console.log(_id);



    // const [post, setPost] = useState({
    //     "_id": "3",
    //     "author": {
    //         "image": "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         "name": "Elena Rodriguez"
    //     },
    //     "title": "AI Marvels: Unveiling the Wonders of Artificial Intelligence",
    //     "description": "In the realm of technological ingenuity, Artificial Intelligence (AI) stands as a marvel, reshaping the landscape of innovation. From autonomous vehicles navigating complex terrains to predictive analytics revolutionizing industries, AI transcends boundaries. Its ability to mimic human cognition, learning, and problem-solving has birthed intelligent systems that outperform traditional approaches. In healthcare, AI diagnoses ailments swiftly, enhancing precision and personalized treatment plans. Financial sectors leverage AI for fraud detection, ensuring robust security. In the age of AI, natural language processing enables seamless human-computer interactions, while machine learning fuels advancements in data analytics. As AI continually evolves, its potential seems limitless, promising a future where smart machines not only augment human capabilities but also foster a new era of unparalleled technological brilliance. The AI marvels unfold, offering a glimpse into a world where innovation knows no bounds.",
    //     "tags": [
    //         "AI"
    //     ],
    //     "time": "2023-11-21T12:15:00Z",
    //     "upVote": 18,
    //     "downVote": 2,
    //     
    // });


    const handleUpVote = () => {
        // Handle upvote logic
    };

    const handleDownVote = () => {
        // Handle downvote logic
    };

    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        // Create a new comment object
        const newComment = {
            id: post.comments.length + 1,
            author: 'User', // You can replace this with the actual user's name
            text: comment,
        };

        // Update the post with the new comment
        setPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, newComment],
        }));

        // Clear the comment input field
        setComment('');
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
        <div className="container mx-auto bg-gray-700 py-20">
            <div className="px-16">
                {/* Post details */}
                <div className="flex flex-row-reverse justify-center items-start pt-24 gap-10 placeholder:">
                    <div className="flex flex-col justify-center items-center">
                        <img src={author?.image} alt="Blog post screenshot" className="object-cover h-20 w-20 rounded-full" />
                        <p className='text-white mt-3 text-xl font-serif font-semibold'>{author?.name}</p>
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-gray-100 text-4xl font-semibold">{title}</h1>
                        <p className="text-gray-400 mt-1 mb-4">{formatDateTime(time)}</p>
                        <p className="text-gray-100 text-lg mt-7">{description}</p>

                        {/* <p className="text-gray-700">15 Posts</p> */}
                        {/* <div className="flex justify-end items-center mt-4">
                                <p className="text-gray-700">SORT BY:</p>
                                <select className="ml-2">
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div> */}
                    </div>
                </div>

                {/* Upvote, downvote, share options */}
                <div className="flex items-center space-x-7 my-7">
                    <button className="text-blue-500 text-lg flex items-center gap-2" onClick={handleUpVote}>
                        <BiLike className='text-2xl' /> <span>{upVote}</span>
                    </button>
                    <button className="text-red-500 text-lg flex items-center gap-2" onClick={handleDownVote}>
                        <BiSolidDislike className='text-2xl' /> <span>{downVote}</span>
                    </button>
                    {/* <ShareButton
                        url={window.location.href}
                        title={title}
                        className="text-green-500 text-lg"
                    >
                        <FaShareSquare />
                    </ShareButton> */}
                    <p className='text-gray-100'>Share Option: </p>
                    <TwitterShareButton url={window.location.href} title={title}>
                        <FaTwitter className='text-2xl text-sky-400' />
                    </TwitterShareButton>

                    <FacebookShareButton url={window.location.href} quote={title}>
                        <FaFacebook className='text-2xl text-sky-400' />
                    </FacebookShareButton>

                    <LinkedinShareButton url={window.location.href} title={title}>
                        <FaLinkedin className='text-2xl text-sky-400' />
                    </LinkedinShareButton>
                </div>

                {/* Comment input */}
                <div className="mb-4">
                    <textarea
                        className="w-full h-24 p-4 border rounded-md focus:outline-none focus:border-blue-500 text-gray-700"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={handleCommentChange}
                    ></textarea>
                </div>

                {/* Submit comment button */}
                <div className="flex justify-end text-gray-50">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handleCommentSubmit}
                    >
                        Add Comment
                    </button>
                </div>

                {/* Comment section */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-sky-400">Comments</h3>
                    {/* <ul>
                        {comments.map((comment) => (
                            <li key={comment.id} className="mb-4">
                                <p className=" font-bold text-gray-50">{comment.author}</p>
                                <p className="text-gray-100">{comment.text}</p>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </div>
        </div>
    );
};

export default DetailedPost;
