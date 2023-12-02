# Forum Application

This Forum application is a full-stack web platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a space for users to engage in conversations through posted messages. The application is designed to be responsive across various devices, ensuring a seamless user experience.

## Features

### Frontend

#### Homepage

1. **Navbar:**
   - Displays logo + website name.
   - Navigation links: Home, Membership, Notification icon, Join Us (when not logged in).
   - If logged in, user's profile picture appears, and a dropdown with options: User name (not clickable), Dashboard, and Logout.

2. **Banner Section:**
   - Search bar based on post tags.
   - Beautified layout.

3. **Tags Section:**
   - Displays available tags for posts.

4. **Announcement Section:**
   - Displays announcements.
   - Notification icon shows the announcement count.

5. **Posts Section:**
   - Displays posts from newest to oldest.
   - Sort by Popularity button based on total vote counts (UpVote - DownVote).
   - Pagination with 5 posts per page.

6. **Post Details Page:**
   - Shows author image, name, post details, comments, upvote, downvote, and share button.
   - Comment section requires login.
   - Implements react-share package for shareability.

#### Membership Page

- Private route for payment to become a member.
- Members receive a Gold badge and can make more than 5 posts.

#### User Dashboard

- Private route with:
  - My Profile
  - Add Post
  - My Posts

#### My Profile

- Displays user information, badges, and 3 recent posts.
- Badges (Bronze/Gold) based on registration and membership.

#### Add Post

- Form with author details, post title, description, tag, upvote, and downvote.
- Limits normal users to 5 posts; additional posts prompt membership invitation.

#### My Posts

- Displays user's posted posts in tabular form.
- Shows post title, votes, comment button, and delete button.

#### Join Us Page

- Authentication page with login form.
- Redirects to Register page.

### Backend

#### Admin Dashboard

- Private route with:
  - Admin Profile
  - Manage Users
  - Reported Comments/Activities
  - Make Announcement

#### Manage Users

- Tabular display of users with name, email, make admin, and subscription status.
- Admin can make a user admin.

#### Make Announcement

- Form with author details, title, and description for announcements.

#### Reported Activities/Comments Page

- Displays reports from user comments.
- Admin actions against reports are implemented.

### Bonus Tasks

1. **Admin Profile:**
   - Displays admin information, pie chart with site stats.
   - Form to add tags for posts.

2. **JWT on Login:**
   - Implements JWT for login (Email/Password and social).

### Optional Tasks (Implemented: Task 1)

1. **Upvote/Downvote:**
   - Users can upvote or downvote a post.

## How to Use

1. **Admin Credentials:**
   - Email: noor@mail.com
   - Password: 12345A@

2. **Front-end Live Site Link:**
   - https://forum-page-53cdf.web.app/

3. **Client Side Github Repository Link:**
   - https://github.com/programming-hero-web-course1/b8a12-client-side-MdAbdullahIbnNoor

4. **Server Side Github Repository Link:**
   - https://github.com/programming-hero-web-course1/b8a12-client-side-MdAbdullahIbnNoor

## Authors

- assignment12_category_0001

## Acknowledgments

Special thanks to Programming Hero for the assignment guidelines.

---

Feel free to explore the live site and repositories. Happy engaging!
