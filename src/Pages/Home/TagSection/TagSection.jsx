import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const TagSection = () => {
  const [tags, setTags] = useState([]);
  const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchTags = async () => {
          try {
            const response = await axiosPublic.get('/tags');
            setTags(response.data);
          } catch (error) {
            console.error('Error fetching tags:', error);
          }
        };
    
        fetchTags();
      }, [axiosPublic]);
  // Dummy data for tags

  return (
    <section className="bg-gray-800 py-16 rounded-xl">
      <div className="lg:w-11/12 mx-auto w-9/12">
        <h2 className="text-4xl font-semibold mb-10 flex justify-center items-center text-info uppercase">--- Explore Tags ---</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-info text-white text-lg w-36 text-center p-2 rounded-full cursor-pointer hover:bg-sky-600 transition  justify-center items-center"
            >
              {tag.tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TagSection;
