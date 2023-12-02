import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PAGE_SIZE = 10;

const MyPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axiosSecure.get(`/users/posts?page=${currentPage}&pageSize=${PAGE_SIZE}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [axiosSecure, currentPage]);

  const handleCommentButtonClick = (postTitle) => {
    navigate(`/dashboard/comments/${postTitle}`);
  };

  const handleDeleteButtonClick = async (postId) => {
    try {
      const response = await axiosSecure.delete(`/posts/${postId}`);

      if (response.data.deletedCount === 1) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        console.log('Post deleted successfully');
        fetchPosts();
      } else {
        console.error('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <div className="recent-posts lg:mt-8">
      <h3 className="text-2xl font-bold mb-2 lg:mb-4">Your Posts</h3>
      {posts.length > 0 ? (
        <div className="dark:text-gray-100 overflow-x-auto">
          <table className="min-w-full rounded-md overflow-hidden">
            <thead className="dark:bg-gray-700">
              <tr className="text-left lg:text-base text-xm">
                <th className="px-4 py-2">Serial</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">UpVote</th>
                <th className="px-4 py-2">DownVote</th>
                <th className="px-4 py-2">Comments</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id} className="border-b text-xs lg:text-base border-opacity-20 dark:border-gray-700 text-violet-950">
                  <td className="p-1 lg:p-2">{index + 1}</td>
                  <td className="p-1 lg:p-2">{post.title.slice(0, 35)}</td>
                  <td className="p-1 lg:p-2">{post.time.slice(0, 9)}</td>
                  <td className="p-1 lg:p-2 text-red-600">{post.upVote}</td>
                  <td className="p-1 lg:p-2 text-red-600">{post.downVote}</td>
                  <td className="p-1 lg:p-2 text-red-600">{post.commentsCount}</td>
                  <td className="p-1 lg:p-2 flex justify-around">
                    <button
                      onClick={() => handleCommentButtonClick(post.title)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-full"
                    >
                      See Comment
                    </button>
                    <button
                      onClick={() => handleDeleteButtonClick(post._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-full"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No posts available</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-2 px-2 py-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
