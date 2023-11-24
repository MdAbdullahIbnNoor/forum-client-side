import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('latest'); // Default sort option
  const postsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('post.json');
        const data = await response.json();

        // Sort posts based on the current sort option
        const sortedPosts = sortPosts(data, sortOption);

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sortOption]); // Update posts when sort option changes

  // Function to sort posts based on different options
  const sortPosts = (posts, option) => {
    switch (option) {
      case 'latest':
        return posts.sort((a, b) => new Date(b.time) - new Date(a.time));
      case 'popularity':
        return posts.sort((a, b) => (b.upVote - b.downVote) - (a.upVote - a.downVote));
      default:
        return posts;
    }
  };

  // Calculate the index of the last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  // Calculate the index of the first post on the current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Get the current posts to display
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortBy = (option) => {
    setSortOption(option);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center uppercase">--- Latest Posts ---</h2>

        {/* Sort by options */}
        <div className="flex justify-end mb-10">
          <button
            onClick={() => handleSortBy('latest')}
            className={`mx-2 px-3 py-1 ${sortOption === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              } rounded-md focus:outline-none`}
          >
            Latest
          </button>
          <button
            onClick={() => handleSortBy('popularity')}
            className={`mx-2 px-3 py-1 ${sortOption === 'popularity' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              } rounded-md focus:outline-none`}
          >
            Popularity
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              } rounded-md focus:outline-none`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostSection;
