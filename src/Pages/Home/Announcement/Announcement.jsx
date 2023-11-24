import React, { useState } from 'react';

const Announcement = () => {
    const announcements = [
        { id: 1, title: 'Important Update', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 2, title: 'Upcoming Event', content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
        { id: 3, title: 'Upcoming Event', content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' }
        // Add more announcements as needed
    ];

    const [showAnnouncements, setShowAnnouncements] = useState(announcements.length > 0);


    return (
        <section className={`py-8 ${showAnnouncements ? '' : 'hidden'}`}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Announcements</h2>

                    {/* Notification icon showing announcement count */}
                    {showAnnouncements && (
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
                <div className="mt-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="mb-4 p-4 border border-gray-300 bg-gray-700 rounded-xl flex gap-5">
                            <div className="flex items-center self-stretch justify-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-16 h-16 text-sky-400">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-white">{announcement.title}</h3>
                                <p className='text-sky-400 font-semibold'>{announcement.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Announcement