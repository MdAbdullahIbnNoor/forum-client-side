import React from 'react';

const TagSection = () => {
  // Dummy data for tags
  const tags = ['Code', 'WebDev', 'AI', 'ML', 'Security', 'Data', 'Cloud', 'Apps', 'Blockchain'];

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
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TagSection;
