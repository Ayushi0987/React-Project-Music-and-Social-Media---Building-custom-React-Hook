import React, { useState } from 'react'
import Image from 'next/image';
import css from '@/styles/FeedPost.module.css'
import constants from '@/constants'
import { useAuth } from '@/context/AuthContext';
import FeedComment from './FeedComment';
import defaultImage from '../../public/assets/images/profile images.jpeg'

const {BASE_API_PATH, PROJECT_ID} = constants;

export default function FeedPost({ post, getPostsFeed}) {
    const [isComment, setIsComment] = useState(false);
    const {token} = useAuth()
    const {
        _id,
        title,
        content,
        images,
        isLiked,
        likeCount,
        commentCount,
        author
    } = post;
    const { name, profileImage} = author;

    async function applyUserLike() {
        try {
          const response = await fetch(`${BASE_API_PATH}/api/v1/quora/like/${_id}`, {
            method: 'POST',
            headers: {
              "content-type": "application/json",
              "projectId": PROJECT_ID,
              "Authorization": `Bearer ${token}`
            },
          });
          await response.json();
          getPostsFeed()
        }
        catch (err) {
          console.error(err);
        }
      }

    function handlePostLike(){
        if(isLiked){
            alert('you already liked the post')
            return;
        }
        applyUserLike();
    }
  return (
    <div className={`${css.postContainer}`}>
        <div className={`flex ${css.postHead}`}>
            <div className={`${css.imgBox}`}>
                <Image src={profileImage || defaultImage} alt='' width={"64"} height={"64"}/>
            </div>
            <div className={`flex ${css.postHeadContent} ${css.colFlexDirection}`}>
                <div>{title}</div>
                <div>By: {name}</div>
            </div>
        </div>
        <div className={`flex ${css.postBody}`}>
            <div>{content}</div>
        </div>
        <div className={`flex ${css.postFoot}`}>
            <div className={`flex ${css.rowFlexDirection}`}>
                <div className={`${css.imgBox}`}>
                    <img src={images} />
                </div>
                <div>Some random text</div>
            </div>
            <div>
                <span className={`${isLiked && css.liked}`} onClick={handlePostLike}>Likes: {likeCount}</span>
                <span onClick={()=>setIsComment(!isComment)}>Comments: {commentCount}</span>
            </div>
        </div>
        {isComment && <FeedComment postId={_id} />}
    </div>
  )
}
