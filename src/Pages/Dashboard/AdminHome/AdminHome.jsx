import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMoneyBillAlt, FaUsers, FaBook, FaShoppingCart } from 'react-icons/fa';
import { PieChart, Pie, Legend, Cell } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [adminProfile, setAdminProfile] = useState(null);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await axiosSecure.get('/admin/profile');
                setAdminProfile(response.data);
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            }
        };

        fetchAdminProfile();
    }, [axiosSecure]);

    const handleAddTag = async (tag) => {
        try {
            // Send tag data to the server
            const response = await axiosSecure.post('/admin/tags', { tag });

            if (response.data.insertedId) {
                // Tag added successfully
                // You can update your state or show a success message
            } else {
                // Tag already exists
                // You can show an error message
            }
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    if (!adminProfile) {
        return <span className="loading loading-dots loading-xl w-24 mx-auto"></span>;
    }

    const { name, image, email, postCount, commentCount, userCount } = adminProfile;

    const pieChartData = [
        { name: 'Posts', value: postCount },
        { name: 'Comments', value: commentCount },
        { name: 'Users', value: userCount },
    ];

    return (
        <div>
            <h2 className='text-3xl font-medium mb-6'>
                <span>Admin Profile</span>
            </h2>
            <div className="flex items-center mb-6">
                <img src={user?.photoURL} alt="Admin" className="w-10 h-10 rounded-full mr-4" />
                <div>
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="text-gray-500">{email}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="p-4 rounded-lg shadow-lg bg-gradient-to-br from-green-400 to-green-600 text-white">
                    <div className="flex items-center justify-center">
                        <span className="relative lg:w-10 lg:h-10 p-2 bg-white rounded-full">
                            <FaMoneyBillAlt size={24} color="green" />
                        </span>
                        <p className="ml-2 text-white text-lg font-semibold">Number of Posts</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="my-4 text-4xl font-bold text-white">{postCount}</p>
                    </div>
                </div>
                <div className="p-4 rounded-lg shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                    <div className="flex items-center justify-center">
                        <span className="relative w-10 h-10 p-2 bg-white rounded-full">
                            <FaUsers size={24} color="blue" />
                        </span>
                        <p className="ml-2 text-white text-lg font-semibold">Number of Users</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="my-4 text-4xl font-bold text-white">{userCount}</p>
                    </div>
                </div>
                <div className="p-4 rounded-lg shadow-lg bg-gradient-to-br from-yellow-400 to-yellow-600 text-white">
                    <div className="flex items-center justify-center">
                        <span className="relative w-10 h-10 p-2 bg-white rounded-full">
                            <FaBook size={24} color="yellow" />
                        </span>
                        <p className="ml-2 text-white text-lg font-semibold">Number of Comments</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="my-4 text-4xl font-bold text-white">{commentCount}</p>
                    </div>
                </div>
            </div>
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Site Statistics</h3>
                <PieChart width={400} height={300}>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-4">Add Tag</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddTag(e.target.tag.value);
                    e.target.reset();
                }}>
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="tag"
                            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                            placeholder="Add Tag"
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminHome;
