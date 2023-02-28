import React from 'react';
//Components
import { Loader } from '@mantine/core';

export const LoaderBox = () => {
  return (
    <div className='flex w-full py-6 justify-center'>
        <Loader color="gray"/>
    </div>
  )
}
