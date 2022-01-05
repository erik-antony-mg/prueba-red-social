import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {loading, data:{ getPosts: posts}} = useQuery(FETCH_POST_QUERY)
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recientes publicaciones</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Cargando publicaciones..</h1>
        ) : (
          
            posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))
          
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POST_QUERY = gql`
{ 
    getPosts {
      id
      body
      createdAt
      username likeCount
      likes {
          username
      }
      commentCount
      comments {
        id
        username createdAt
        body
      }
    }
} `

export default Home;
