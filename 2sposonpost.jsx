import React, { useState, useEffect } from 'react';

function UsersWithPosts() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  const getUserPosts = (userId) => {
    return posts.filter(post => post.userId === userId);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="users-posts-container">
      <div className="users-list">
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li 
              key={user.id} 
              onClick={() => setSelectedUserId(user.id)}
              className={selectedUserId === user.id ? 'selected' : ''}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="user-posts">
        {selectedUserId ? (
          <>
            <h2>Posts by {users.find(u => u.id === selectedUserId)?.name}</h2>
            {getUserPosts(selectedUserId).map(post => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </>
        ) : (
          <p>Select a user to view their posts</p>
        )}
      </div>
    </div>
  );
}

export default UsersWithPosts;
