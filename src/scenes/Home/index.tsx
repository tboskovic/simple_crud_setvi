import React from 'react';
import { useQuery } from 'react-query';
import { LoaderBox } from '../../components/Loader';
//Services
import { getPosts } from '../../services/api';
import PostsTable from './components/PostsTable';

const Homepage = () => {

  const { data, isLoading } = useQuery('posts', () => getPosts());

  if(isLoading) return <LoaderBox/>

  return (
    <div>
      <PostsTable
        posts={data}
      />
    </div>
  )
}

export default Homepage;
