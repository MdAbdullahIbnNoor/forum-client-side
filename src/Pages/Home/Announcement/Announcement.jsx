import React from 'react';
import useAnnouncements from '../../../hooks/useAnnouncements';

const Announcement = () => {
  const { announcements, loading } = useAnnouncements();

  return (
    <section className={`py-8 my-16 ${announcements.length > 0 ? '' : 'hidden'}`}>
      <div className="mb-12 h-fit">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Announcements</h2>

          {/* Notification icon showing announcement count */}
          {announcements.length > 0 && (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v3m0 4h0m0 4h0M3 4l9 16 9-16"
                />
              </svg>
              <span className="text-blue-500 font-semibold">{announcements.length}</span>
            </div>
          )}
        </div>

        {/* List of announcements */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement._id} className="p-6 border border-gray-300 bg-gray-700 rounded-xl flex gap-5">
                <div className="flex flex-col items-center self-stretch justify-center w-1/4">
                  <img src={announcement.authorImage} className="h-14 w-14 rounded-full" alt="" />
                  <p className='text-white'>{announcement.authorName}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">{announcement.title}</h3>
                  <p className='text-sky-400 font-semibold'>{announcement.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Announcement;
