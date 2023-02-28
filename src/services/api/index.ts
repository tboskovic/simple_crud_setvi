import axios from 'axios';

//This could be in individual folder/file where we can define default settings for axios variables,
//but since this is small project I decided to declare it just right here since to make it less complicated
const axiosTypicode = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = () => {
    return axiosTypicode.get('/posts')
    .then(res => res.data);
}