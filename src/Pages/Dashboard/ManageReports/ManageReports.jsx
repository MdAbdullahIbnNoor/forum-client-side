import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ManageReports = () => {
    const [reports, setReports] = useState([]);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        // Fetch reports when the component mounts
        const fetchReports = async () => {
            try {
                const response = await axiosSecure.get('/reports');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const handleDeny = async (reportId) => {
        try {
            // Send a request to deny the report
            await axiosSecure.delete(`/reports/deny/${reportId}`);
            // Update the local state by removing the denied report
            setReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
        } catch (error) {
            console.error('Error denying report:', error);
        }
    };

    const handleDeleteComment = async (reportId) => {
        try {
            // Send a request to delete the comment based on the report
            const response = await axiosSecure.delete(`/reports/delete-comment/${reportId}`);
            // Update the local state based on the server's response
            if (response.data.reportResult.deletedCount > 0) {
                setReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
            } else {
                console.error('Error deleting comment based on report:', response.data);
            }
        } catch (error) {
            console.error('Error deleting comment based on report:', error);
        }
    };

    return (
        <div className="reports-management mt-8">
            <h2 className="text-2xl font-bold mb-4">Reports Management</h2>
            {reports.length > 0 ? (
                <div className="dark:text-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full rounded-3xl">
                            <colgroup>
                                <col className="w-24" />
                                <col className="w-32" />
                                <col className="w-40" />
                                <col className="w-20" />
                                <col className="w-24" />
                            </colgroup>
                            <thead className="dark:bg-gray-700">
                                <tr className="text-left">
                                    <th className="px-4 py-4">Post Title</th>
                                    <th className="px-4 py-4">Commentator</th>
                                    <th className="px-4 py-4">Comment</th>
                                    <th className="px-4 py-4">Feedback</th>
                                    <th className="px-8 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report._id} className="border-b border-opacity-20 dark:border-gray-700 text-violet-950">
                                        <td className="p-4">{report.postTitle}</td>
                                        <td className="p-4">{report.userEmail}</td>
                                        <td className="p-4">{report.comment.slice(0,40)}</td>
                                        <td className="p-4">{report.feedback}</td>
                                        <td className="p-4 flex justify-around">
                                            <button onClick={() => handleDeny(report._id)} className="bg-red-500 text-white px-4 py-2 rounded-full">
                                                Deny
                                            </button>
                                            <button onClick={() => handleDeleteComment(report._id)} className="bg-red-500 text-white px-4 py-2 rounded-full">
                                                Delete Comment
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No reports available</p>
            )}
        </div>

    );
};

export default ManageReports;
