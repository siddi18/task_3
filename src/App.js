import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Card, CardContent, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const QuotesApp = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 


  const fetchRandomQuote = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      console.log('data:',data)
      setQuote(data.quote);  
      setAuthor(data.author);  
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
    setLoading(false); 
  };

  useEffect(() => {
    fetchRandomQuote(); 


    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const createPost = () => {
    const newPost = {
      content: quote,
      author: author,
      timestamp: new Date().toLocaleString(),
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);



    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    alert('New post created successfully!');
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
};

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop:"40px",borderRadius: '8px',  overflow: "hidden" }}>
        <img
          src={"img.jpeg"}
          alt="Welcome"
          style={{ width: '400px', height: '200px' }}
        />
      </div>
    <Container style={{ marginTop: '20px', maxWidth: '900px', width: '100%' }}>
      <Card variant="outlined" style={{ marginBottom: '20px' }}>
        <CardContent style={{ background: "#f7d2a7"}}>
          <Typography variant="h4" gutterBottom>
            Random Quote
          </Typography>

          
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>
                <strong>Quote:</strong> "{quote}"
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginBottom: '20px' }}>
                <strong>Author:</strong> {author}
              </Typography>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={fetchRandomQuote}
            style={{ marginRight: '10px' }}
            disabled={loading}  
          >
            {loading ? 'Loading...' : 'Fetch New Quote'}
          </Button>
          <Button variant="contained" color="secondary" onClick={createPost} disabled={!quote || loading}>
            Create Post
          </Button>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom style={{fontWeight:"bold", color:"black"}}>
        Created Posts
      </Typography>
      {posts.length > 0 ? (
        <List>
         {posts.map((post, index) => (
                        <ListItem key={index} style={{ marginBottom: '10px', backgroundColor: '#f1ddc6', borderRadius: '8px', color:"black" }}>
                            <ListItemText
                                primary={`"${post.content}"`}
                                secondary={`- ${post.author} (Posted on: ${post.timestamp})`}
                            />
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => deletePost(index)}
                            >
                                Delete
                            </Button>
                        </ListItem>
                    ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No posts created yet.
        </Typography>
      )}
    </Container>
    </>
  );
};

export default QuotesApp;
