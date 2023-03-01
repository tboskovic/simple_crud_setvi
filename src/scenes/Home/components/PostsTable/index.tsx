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

    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/details/${rowData.id}`)} 
            className='flex py-3 border-b border-gray-200 hover:cursor-pointer hover:bg-gray-bg-1'
        >
            <Text 
                className='w-2/5 max-h-[25px] max-h-[25px] px-3 overflow-hidden text-ellipsis whitespace-nowrap'
            >
                {rowData.title}
            </Text>
            <Text 
                className='w-3/5 max-h-[25px] max-h-[25px] px-3 overflow-hidden text-ellipsis whitespace-nowrap'
            >
                {rowData.body}
            </Text>
        </div>
    )
}

const OffsetButton = ({value, onClickAction, active, borderStyle}: {value: number, onClickAction: (value: number) => void, active: number, borderStyle: string}) => {
    return (
        <Button 
            className={`border-white text-white p-0 h-[23px] w-[25px] hover:bg-transparent relative ${active === value ? 'font-bold' : 'font-thin'} ${borderStyle || ''}`}
            onClick={() => onClickAction(value)}
        >
            <Text className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'>{value}</Text>
        </Button>
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
    }, [posts, page, offset])

    const renderTableBody = () => {
        return data.map(row => {
            return <TableRow rowData={row} key={`tablerow${row.id}`}/>
        })
    }

    const handleChangeOffset = (value: number) => {
        if(offset !== value) {
            setOffset(value);
            setPage(0);
        }
    }

    return (
      <div className='bg-white rounded-lg'>
        <div className='flex items-center rounded-t-lg justify-end px-6 py-3 gap-4 bg-cyan-800 text-gray-dark'>
            <div className='flex items-end'>
                <OffsetButton
                    value={10}
                    onClickAction={handleChangeOffset}
                    active={offset}
                    borderStyle='rounded-r-none'
                />
                <OffsetButton
                    value={15}
                    onClickAction={handleChangeOffset}
                    active={offset}
                    borderStyle='border-l-none border-r-none rounded-none'
                />
                <OffsetButton
                    value={20}
                    onClickAction={handleChangeOffset}
                    active={offset}
                    borderStyle='rounded-l-none'
                />
                <Text size='xs' className='ml-2 text-white'>per page</Text>
            </div>
            <Button onClick={() => navigate('/create')} className='border-white hover:bg-transparent'>Add New</Button>
        </div>
        <div className='flex w-full py-3 border-b border-gray-200'>
            <Text className='w-2/5 px-3' weight={500}>Title</Text>
            <Text className='w-3/5 px-3' weight={500}>Body</Text>
        </div>
        <div>
            {renderTableBody()}
            <Pagination
                page={page + 1} 
                onChange={(value) => setPage(value-1)} 
                total={Math.floor(posts.length/offset)}
                className='mt-4'
                position='center'
            />
        </div>
      </div>
    )
}

export default PostsTable;