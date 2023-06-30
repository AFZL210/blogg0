import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { newRequest } from '../../utils/createRequest';
import LineWaveLoader from '../../utils/Loaders';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const PostPage: React.FC = () => {

  const { postId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<any>(null);
  const [liked, setLiked] = useState<boolean>(false);
  let userId: any = "";
  let token: any = "";
  const check = localStorage.getItem("currentUser");
  if (check !== null) {
    userId = JSON.parse(localStorage.getItem("currentUser") || " ")?._id;
    token = JSON.parse(localStorage.getItem("currentUser") || " ")?.token;
  }

  const getPost = async () => {
    const postData = await newRequest.get(`/api/post/get-post/${postId}`);
    setPost(postData.data);
  }


  const likePost = async () => {
    if (check !== null && userId) {
      try {
        const res = await newRequest.post(`/api/post/like-post/${userId}/${postId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data == "liked post") setLiked(true);
        else setLiked(false);

        await getPost();
      } catch (e) {
        setLiked(false);
        alert("error liking post");
      }
    } else {
      alert("login to like the post")
    }
  }

  useEffect(() => {
    setLoading(true);
    getPost().then(() => {
      setLoading(false);
      const likedBy = post?.likedBy;
      let likeCheck: boolean = false;
      likedBy.forEach((e: any) => {
        console.log(e._id)
        if (e._id == userId) likeCheck = true;
      });

      if (likeCheck) setLiked(true);
      else setLiked(false);
    }).catch(e => console.log(e));
  }, [])

  return (
    <div className='w-[100%] h-[90vh] flex justify-center overflow-x-hidden pb-5'>
      {loading ? <LineWaveLoader /> :
        <div className='w-[90%] md:w-[40%] mx-auto flex items-center mt-10 flex-col'>
          <h1 className='font-bold text-[1.9rem] w-[100%]'>{post.title}</h1>
          <div className='w-[100%] flex gap-3 mt-5 items-center'>
            <div><Avatar alt="Travis Howard" src={post.author.icon} sx={{ width: "2.2rem", height: "2.2rem" }} /></div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3'>
                <span>{post.author.name}</span>
                <span className='cursor-pointer'>Follow</span>
              </div>

              <div className='flex gap-3'>
                <span>{post.updatedAt.substring(0, 10)}</span>
              </div>
            </div>
          </div>

          <div className='w-[100%] flex gap-3 mt-5 items-center border-y-2 py-1 justify-between'>
            <div className='flex gap-2'>
              <span>{post.likes}</span>
              <div className='cursor-pointer' onClick={likePost}>{liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
            </div>

            <div className='flex gap-2'>
              <span>Share</span>
              <div className='cursor-pointer'><ShareIcon /></div>
            </div>
          </div>

          <div className='w-[100%] mt-5'>
            <img src={post.cover} className='w-[100%]' />
            <div className='mt-5' dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      }
    </div>
  )
}

export default PostPage