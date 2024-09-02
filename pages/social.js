import FeedPost from '@/components/SocialComponents/FeedPost'
import React, { useEffect, useState } from 'react'
import constants from '@/constants'

const {BASE_API_PATH, PROJECT_ID} = constants;

export default function social() {
  const [postFeed, setPostFeed] = useState([]);

  async function getPostsFeed() {
    try {
      const response = await fetch(`${BASE_API_PATH}/api/v1/quora/post`, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
          "projectId": PROJECT_ID
        },
      });
      const data = await response.json();
      setPostFeed(data.data)
    }
    catch (err) {
      console.error(err);
    }
  }
  
  useEffect(()=>{
    getPostsFeed();
  },[])

  return (
    <section className='flex socialPostsContainer'>
      <section className='socialPosts'>
        {postFeed.map((post)=>{
          return (
            <FeedPost post={post} getPostsFeed={getPostsFeed} />
          )
        })}
      </section>
    </section>
  )
}
