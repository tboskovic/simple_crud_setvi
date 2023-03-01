import axios from 'axios';

//This could be in individual folder/file where we can define default settings for axios variables,
//but since this is small project I decided to declare it just right here to make it less complicated
const axiosTypicode = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = () => {
    return axiosTypicode.get('/posts')
    .then(res => res.data);
}

export const getPost = (postId: string) => {
    return axiosTypicode.get(`/posts/${postId}`)
    .then(res => res.data);
}

export const postPost = (data: { title: string, body: string }) => {
    return axiosTypicode.post('/posts', data)
    .then(res => res.data);
}

export const updatePost = (data: { postId: string, title: string, body: string }) => {
    return axiosTypicode.put(`/posts/${data.postId}`, {title: data.title, body: data.body})
    .then(res => res.data);
}

export const deletePost = (postId: string) => {
    return axiosTypicode.delete(`/posts/${postId}`)
    .then(res => res.data);
}