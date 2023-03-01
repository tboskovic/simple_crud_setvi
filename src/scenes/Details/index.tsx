import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
//Components
import { Button, Input, Textarea, Alert, Modal, Text } from '@mantine/core';
//Services
import { deletePost, getPost, updatePost } from '../../services/api';
import { queryClient } from '../../App';

interface AlertData {
  color: string,
  title: string,
  message: string
}

const Details = () => {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertData>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const timer = useRef<any>(null);

  const navigate = useNavigate();

  const { id: postId } = useParams() as { id: string};

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
      setTitle('');
      setDescription('');
    };
  }, []);

  const { data = {}, isLoading } = useQuery(
    [`post${postId}`, postId], 
    () => getPost(postId),
    {
        enabled: !!postId,
        onSuccess: (succesData) => {
          setTitle(succesData.title);
          setDescription(succesData.body);
        }
    }
  );

  const { mutate: mutatePost, isLoading: updateIsLoading } = useMutation(updatePost, {
    onSuccess: () => {
      handleAlert({color: 'green', title: 'Done!', message: `You have successfully updated post ${data.title}.`});
      queryClient.invalidateQueries(`post${postId}`)
    },
    onError: () => {
      handleAlert({color: 'red', title: 'Ooops!', message: 'Something went wrong.'});
    }
  });

  const { mutate: mutateDeletion, isLoading: deleteIsLoading } = useMutation(deletePost, {
    onSuccess: () => {
      setShowAreYouSureModal(false);
      handleAlert({color: 'green', title: 'Done!', message: `You have successfully deleted post ${data.title}.`}, true);
      setTitle('');
      setDescription('');
    },
    onError: () => {
      handleAlert({color: 'red', title: 'Ooops!', message: 'Something went wrong.'});
    }
  });

  const handleAlert = (alertData: AlertData, redirectToHome: boolean = false) => {
    setAlertInfo({
      color: alertData.color,
      title: alertData.title,
      message: alertData.message
    })
    setShowAlert(true);
    timer.current && clearInterval(timer.current);
    timer.current = setTimeout(() => {
      setShowAlert(false);
      setAlertInfo(undefined);
      redirectToHome && navigate('/');
    }, 3000);
  }

  const handleUpdatePost = () => {
    if(!!title && !!description) {
      mutatePost({postId ,title, body: description});
    }
  }

  const isButtonDisabled = () => {
    if(!title || !description || updateIsLoading) {
      return true;
    } else {
      if(data.title !== title || data.body !== description) {
        return false
      } else {
        return true;
      }
    }
  }

  return (
    <div className='flex flex-col gap-3 bg-white rounded-lg px-6 py-3'>
      <div className='ml-auto flex gap-2'>
        <Button 
          className='bg-cyan-800 ml-auto'
          disabled={isLoading}
          onClick={() => setEditMode(true)}
        >
          Edit
        </Button>
        <Button 
          className='bg-red-800 hover:bg-red-500 ml-auto'
          disabled={isLoading || deleteIsLoading}
          onClick={() => setShowAreYouSureModal(true)}
        >
          Delete
        </Button>
      </div>
      <Input.Wrapper label='Title' required className='w-full'>
        <Input
          placeholder='Enter post title here'
          value={title}
          onChange={(e) => editMode && setTitle(e.target.value)}
          className='disabled:text-red'
        />
      </Input.Wrapper>
      <Textarea 
        label='Description'
        placeholder='Enter post description here'
        required
        className='w-full'
        value={description}
        onChange={(e) => editMode && setDescription(e.target.value)}
      />
      {editMode && <Button 
        className='bg-cyan-800 ml-auto'
        disabled={isButtonDisabled()}
        onClick={() => handleUpdatePost()}
      >
        Save
      </Button>}
      {/* Alert should definitely be individual component with it's own data, but since this is small project I wanted to keep it simple and not to complicate it a lot*/}
      {showAlert && 
        <Alert title={alertInfo?.title} color={alertInfo?.color}>
          {alertInfo?.message}
        </Alert>
      }
      <Modal
        opened={showAreYouSureModal}
        onClose={() => setShowAreYouSureModal(false)}
        size='md'
      >
        <div className='w-full'>
          <Text size='xl' className='text-center'>Are you sure?</Text>
          <Text className='text-center'>This action is irreversible.</Text>
          <div className='w-full flex justify-around pt-5'>
            <Button 
              className='bg-cyan-800'
              onClick={() => mutateDeletion(postId)}
            >
              Confirm action
            </Button>
            <Button 
              className='border-cyan-800 text-cyan-800 hover:bg-transparent' 
              onClick={() => setShowAreYouSureModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Details;
