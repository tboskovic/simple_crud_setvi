import { Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='flex items-center justify-between w-full px-8 py-6 bg-cyan-900 text-white'>
      <Text size='xl'>Simple CRUD App</Text>
      <div>
        <Link 
          to='/'
          className='py-1 border-b border-white hover:text-cyan-50 hover:border-cyan-50'
        >
          Home
        </Link>
      </div>
    </div>
  )
}
