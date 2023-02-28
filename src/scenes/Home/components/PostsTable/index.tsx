import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Components
import { Button, Pagination, Text } from '@mantine/core';

interface TaleRowData {
    id: number,
    title: string,
    body: string,
}

const TableRow = ({ rowData }: { rowData: TaleRowData }) => {
    return (
        <div className='flex py-3 border-b border-gray-200 hover:cursor-pointer hover:bg-gray-bg-1'>
            <Text className='w-2/5 max-h-[25px] max-h-[25px] px-3 overflow-hidden text-ellipsis whitespace-nowrap'>{rowData.title}</Text>
            <Text className='w-3/5 max-h-[25px] max-h-[25px] px-3 overflow-hidden text-ellipsis whitespace-nowrap'>{rowData.body}</Text>
        </div>
    )
}

const PostsTable = ({ posts } : { posts: TaleRowData[] }) => {

    const [page, setPage] = useState<number>(0);
    const [offset, setOffset] = useState<number>(10);
    const [data, setData] = useState<TaleRowData[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(posts && posts.length > 0) {
            const start = page * offset;
            const end = start + offset;
            setData(posts.slice(start, end));
        }
    }, [posts, page])

    const renderTableBody = () => {
        return data.map(row => {
            return <TableRow rowData={row} key={`tablerow${row.id}`}/>
        })
    }

    return (
      <div className='bg-white rounded-lg'>
        <div className='flex items-center rounded-t-lg justify-end px-6 py-3 gap-4 bg-cyan-800 text-gray-dark'>
            <div className='flex items-end'>
                <Button className='border-white text-white rounded-r-none p-1.5 h-auto'>10</Button>
                <Button className='border-t-white border-b-white text-white rounded-none p-1.5 h-auto'>15</Button>
                <Button className='border-white text-white rounded-l-none p-1.5 h-auto'>20</Button>
                <Text size='xs' className='ml-2 text-white'>per page</Text>
            </div>
            <Button onClick={() => navigate('/create')} className='border-white'>Add New</Button>
        </div>
        <div className='flex w-full py-3 border-b border-gray-200'>
            <Text className='w-2/5 px-3' weight={500}>Title</Text>
            <Text className='w-3/5 px-3' weight={500}>Body</Text>
        </div>
        <div>
            {renderTableBody()}
            <Pagination
                page={page} 
                onChange={setPage} 
                total={Math.ceil(posts.length/offset)}
                className='mt-4'
                position='center'
            />
        </div>
      </div>
    )
}

export default PostsTable;