import React, { useEffect, useState } from 'react'
import { newRequest } from '../utils/createRequest'
import { useQuery } from '../utils/queryHook'
import { Link, useParams } from 'react-router-dom'
import PostCard from '../components/Post/PostCard'

const Home = () => {

  const [selectedTag, setSelectedTag] = useState<string>("Top Posts");
  const query = useQuery();
  console.log(query.get("tag") === null)

  return (
    <div className='w-[100vw] h-[90vh] flex flex-col items-center'>
      <div className='mt-5 flex gap-4'>
        <span className='h-fit rounded-full px-4 cursor-pointer' style={{backgroundColor: selectedTag==="Top Posts"? "#fafafa": "transparent"}} onClick={(e) => setSelectedTag("Top Posts")}>Top Posts</span>
        <span className='h-fit rounded-full px-4 cursor-pointer' style={{backgroundColor: selectedTag==="Tech"? "#fafafa": "transparent"}} onClick={(e) => setSelectedTag("Tech")}>Tech</span>
        <span className='h-fit rounded-full px-4 cursor-pointer' style={{backgroundColor: selectedTag==="Coding"? "#fafafa": "transparent"}} onClick={(e) => setSelectedTag("Coding")}>Coding</span>
        <span className='h-fit rounded-full px-4 cursor-pointer' style={{backgroundColor: selectedTag==="Life Style"? "#fafafa": "transparent"}} onClick={(e) => setSelectedTag("Life Style")}>Lifestyle</span>
      </div>

      <div className='mt-10 w-[100%] flex flex-col items-center'>
        <div className='w-[90%] md:w-[30%]'><PostCard author='AFZL210' authorProfile='' cover='https://res.cloudinary.com/primeflix/image/upload/v1687082487/reactjs-benefits_xt3qch.jpg' date='22-02-2023' likes='23' postID='23232' summary='best tut' title='Welcome to my blog'/>
      
        </div>
      </div>
    </div>
  )
}

export default Home