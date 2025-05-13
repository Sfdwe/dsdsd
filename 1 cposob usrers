import React, { useState, useEffect } from 'react';

function PostsList() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ]);
        
        const usersData = await usersResponse.json();
        const postsData = await postsResponse.json();
        
        setUsers(usersData);
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="posts-container">
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <h3>{getUserName(post.userId)}</h3>
          </div>
          <div className="post-body">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
