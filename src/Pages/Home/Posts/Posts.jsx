import React, { useState, useEffect } from 'react';

const PostSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      try {
        const response = await fetch('post.json');
        const data = await response.json();
        setPosts(data.slice(0, 6)); // Taking only a few posts for demonstration
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{`${post.author}`}</span>
                {/* Assuming the API doesn't provide a date field */}
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostSection;
