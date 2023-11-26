import React from 'react'

const Profile = () => {
  return (
    <div className="my-profile-dashboard">
      <div className="profile-info">
        <img src="" alt="Profile" />
        <h2>Name: </h2>
        <p>Email: </p>
        <p className='badge-xl font-medium bg-amber-400 text-white px-4 py-2 rounded-xl w-fit'>Bronze</p>
      </div>

      <div className="recent-posts">
        <h3>Recent Posts</h3>
        <div>Tables Here</div>
        {/* <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Votes</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id}>
                <td>{post.postTitle}</td>
                <td>{post.upVote - post.downVote}</td>
                <td>{post.comments.length}</td>
                <td>
                  <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>

  )
}

export default Profile