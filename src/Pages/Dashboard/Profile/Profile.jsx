import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useMember from '../../../hooks/useMember';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Profile = () => {
  const { user } = useAuth();
  const [badge, isMemberLoading, refetch] = useMember();
  const axiosSecure = useAxiosSecure();
  const [userPosts, setUserPosts] = useState([]);

  // Function to handle refetching
  const handleRefetch = async () => {
    // Optionally, you can manually trigger a refetch using the refetch function
    await refetch();
  };

  useEffect(() => {
    // Call the refetch function
    handleRefetch();
  }, [isMemberLoading, badge]);

  useEffect(() => {
    // Fetch user posts when the membership status is loaded and badge is defined
    const fetchUserPosts = async () => {
      try {
        const response = await axiosSecure.get(`/users/${user?.email}/posts`);
        setUserPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    if (!isMemberLoading && badge !== undefined) {
      fetchUserPosts();
    }
  }, [isMemberLoading, badge, user, axiosSecure]);

  return (
    <div>
      {isMemberLoading ? (
        // Show a loading state or spinner while data is loading
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-lg text-info"></span>
        </div>
      ) : (
        <div className="my-profile-dashboard">
          <div className="profile-info relative">
            <img src={user?.photoURL} alt="Profile" className="w-36 h-36 rounded-full mb-8" />
            <p className={`badge font-medium absolute top-2 -left-0 ${badge ? 'bg-amber-600' : 'bg-amber-400'} text-white px-4 py-2 rounded-xl w-fit`}>
              {badge ? 'Gold' : 'Bronze'}
            </p>
            <h2 className="text-2xl font-bold">Name: {user?.displayName}</h2>
            <p className="text-lg font-medium text-gray-500">email: {user?.email}</p>
          </div>

          <div className="recent-posts mt-8">
            <h3 className='text-2xl font-bold mb-4'>Recent Posts</h3>
            {userPosts.length > 0 ? (
              <div className=" dark:text-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full rounded-3xl">
                    <colgroup>
                      <col className="w-16" />
                      <col />
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
                        <th className="px-4 py-4">Description</th>
                        <th className="px-9 py-4">Time</th>
                        <th className="px-4 py-4">UpVote</th>
                        <th className="px-4 py-4">DownVote</th>
                        <th className="px-4 py-4">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPosts.map((post, index) => (
                        <tr key={post._id} className="border-b border-opacity-20 dark:border-gray-700 text-violet-950">
                          <td className="p-4 text-center">{index + 1}</td>
                          <td className="p-4">{post.title}</td>
                          <td className="p-4">{post.description}</td>
                          <td className="p-4">{post.time.slice(0,9)}</td>
                          <td className="p-4 text-red-600 text-center">{post.upVote}</td>
                          <td className="p-4 text-red-600 text-center">{post.downVote}</td>
                          <td className="p-4 text-red-600 text-center">{post.commentsCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>No recent posts.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
