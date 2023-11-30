import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Modal from 'react-modal';
import useAuth from '../../hooks/useAuth';

const Comments = () => {
    const { user } = useAuth();
    const { postTitle } = useParams();
    const axiosSecure = useAxiosSecure();
    const [comments, setComments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fullComment, setFullComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosSecure.get(`/comments/${postTitle}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [axiosSecure, postTitle]);

    const handleReport = async (commentId) => {
        try {
            const selectedComment = comments.find(comment => comment._id === commentId);
            if (selectedComment && selectedComment.isReportButtonEnabled) {
                const reportData = {
                    postTitle,
                    userEmail: user.email, // Assuming user.email is available from useAuth
                    commentId: selectedComment._id,
                    comment: selectedComment.comment,
                    feedback: selectedComment.feedback,
                    reporter: user.email,
                };

                // Send the report data to the server
                await axiosSecure.post('/reports', reportData);

                // Disable the Report button after reporting
                setComments((prevComments) =>
                    prevComments.map((comment) => {
                        if (comment._id === commentId) {
                            return {
                                ...comment,
                                isReportButtonEnabled: false,
                            };
                        }
                        return comment;
                    })
                );

                console.log('Report submitted successfully');
            }
        } catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    const handleFeedbackChange = (e, commentId) => {
        const selectedFeedback = e.target.value;

        setComments((prevComments) =>
            prevComments.map((comment) => {
                if (comment._id === commentId) {
                    return {
                        ...comment,
                        feedback: selectedFeedback,
                        isReportButtonEnabled: selectedFeedback !== '',
                    };
                }
                return comment;
            })
        );

        console.log(`Feedback changed to ${selectedFeedback} for comment ID ${commentId}`);
    };

    const renderCommentText = (commentText) => {
        if (commentText.length > 20) {
            return (
                <>
                    {commentText.slice(0, 20)}...
                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => openModal(commentText)}>
                        Read More
                    </span>
                </>
            );
        }
        return commentText;
    };

    const openModal = (fullText) => {
        setFullComment(fullText);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <h2 className='text-3xl font-medium mb-10'>Comments for Post: <span className='text-info'>{postTitle}</span></h2>
            <div className="overflow-x-auto">
                <table className="min-w-full rounded-3xl">
                    <colgroup>
                        <col className="w-16" />
                        <col className="w-40" />
                        <col className="w-72" />
                        <col className="w-44" />
                        <col className="w-30" />
                    </colgroup>
                    <thead className="dark:bg-gray-700">
                        <tr className="text-left">
                            <th className="px-4 py-4 text-white">Index</th>
                            <th className="px-4 py-4 text-white">User Email</th>
                            <th className="px-2 py-4 text-white">Comment</th>
                            <th className="px-4 py-4 text-white">Feedback</th>
                            <th className="px-4 py-4 text-white">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment, index) => (
                            <tr key={comment._id} className="border-b border-opacity-20 dark:border-gray-700 text-violet-950">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{comment.userEmail}</td>
                                <td className="px-4 py-3">{renderCommentText(comment.comment)}</td>
                                <td className="px-4 py-3">
                                    <select className='px-4 py-2 rounded-full bg-gray-700 text-blue-400' onChange={(e) => handleFeedbackChange(e, comment._id)}>
                                        <option value="">Select Feedback</option>
                                        <option value="Inappropriate">Inappropriate</option>
                                        <option value="Spam">Spam</option>
                                        <option value="Offensive">Offensive</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3">
                                    <button className=' bg-warning rounded-full text-white btn' onClick={() => handleReport(comment._id)} disabled={!comment.isReportButtonEnabled}>
                                        Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Full Comment Modal"
            >
                <h2>Full Comment</h2>
                <p>{fullComment}</p>
                <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default Comments;
