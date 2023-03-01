import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
//Components
import { Button, Input, Textarea, Alert } from '@mantine/core';
//Services
import { postPost } from '../../services/api';

interface AlertData {
  color: string,
  title: string,
  message: string
}

const CreateNew = () => {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertData>();

  const timer = useRef<any>(null);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
      setTitle('');
      setDescription('');
    };
  }, []);

  const { mutate: mutatePost } = useMutation(postPost, {
    onSuccess: () => {
      handleAlert({color: 'green', title: 'Done!', message: 'You have successfully created new post.'});
      setTitle('');
      setDescription('');
    },
    onError: () => {
      handleAlert({color: 'red', title: 'Ooops!', message: 'Something went wrong.'});
    }
  });

  const handleAlert = (props: AlertData) => {
    setAlertInfo({
      color: props.color,
      title: props.title,
      message: props.message
    })
    setShowAlert(true);
    timer.current && clearInterval(timer.current);
    timer.current = setTimeout(() => {
      setShowAlert(false);
      setAlertInfo(undefined);
    }, 3000);
  }

  const handlePostPost = () => {
    if(!!title && !!description) {
      mutatePost({title, body: description});
    }
  }

  return (
    <div className='flex flex-col gap-3 bg-white rounded-lg px-6 py-3'>
      <Input.Wrapper label='Title' required className='w-full'>
        <Input
          placeholder='Enter post title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Input.Wrapper>
      <Textarea 
        label='Description'
        placeholder='Enter post description here'
        required
        className='w-full'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button 
        className='bg-cyan-800 ml-auto'
        disabled={!title || !description}
        onClick={() => handlePostPost()}
      >
        Save
      </Button>
      {showAlert && 
        <Alert title={alertInfo?.title} color={alertInfo?.color}>
          {alertInfo?.message}
        </Alert>
      }
    </div>
  )
}

export default CreateNew;
