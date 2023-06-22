import React, { useEffect, useState } from 'react'
import { newRequest } from '../utils/createRequest'
import { useQuery } from '../utils/queryHook'
import { Link, useParams } from 'react-router-dom'
import PostCard from '../components/Post/PostCard'
import LineWaveLoader from '../utils/Loaders'

const Home: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>([]);
  const query = useQuery();
  const [selectedTag, setSelectedTag] = useState<string | null>(query.get("tag") == null ? "none" : query.get("tag"));

  const getPosts = async () => {
    const posts = await newRequest.get(`/api/post/?tag=${selectedTag}`);
    return posts;
  }

  useEffect(() => {
    setLoading(true);
    getPosts().then((data) => {
      setPosts(data.data);
      setLoading(false);
    });
  }, [selectedTag])

  return (
    <div className='w-[100vw] h-[90vh] flex flex-col items-center'>
      <div className='mt-5 flex gap-4'>
        <Link to="/"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Top Posts" ? "#fafafa" : "transparent" }} onClick={(e) => setSelectedTag("none")}>Top Posts</span></Link>
        <Link to="/?tag=tech"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Tech" ? "#fafafa" : "transparent" }} onClick={(e) => setSelectedTag("tech")}>Tech</span></Link>
        <Link to="/?tag=coding"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Coding" ? "#fafafa" : "transparent" }} onClick={(e) => setSelectedTag("coding")}>Coding</span></Link>
        <Link to="/?tag=life-style"><span className='h-fit rounded-full px-4 cursor-pointer' style={{ backgroundColor: selectedTag === "Life Style" ? "#fafafa" : "transparent" }} onClick={(e) => setSelectedTag("life-style")}>Lifestyle</span></Link>
      </div>

      {loading ? <div>
        <LineWaveLoader />
      </div> : <div>
        <div className='mt-10 w-[100%] flex flex-col items-center'>
          {posts.map((post: any) =><div key={post._id} className='w-[90%] md:w-[30%]'><Link to={`/post/${post._id}`} ><PostCard author={post.author.name} authorProfile={post.author.icon} cover='https://res.cloudinary.com/primeflix/image/upload/v1687082487/reactjs-benefits_xt3qch.jpg' date='22-02-2023' likes='23' postID='23232' summary='best tut' title='Welcome to my blog' />
          </Link></div>)}
        </div>
      </div>}

    </div>
  )
}

export default Home