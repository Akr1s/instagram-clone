import React, { useEffect, useState } from "react";
import { useData } from "../contexts/StateProvider";
import Post from "./Post";
import { db } from "../database";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [{ user }] = useData();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  return (
    <div className="app__posts">
      <div className="app__postsLeft">
        {posts.length ? (
          <>
            {posts.map(({ id, post }) => (
              <Post
                key={id}
                imgUrl={post.imgUrl}
                username={post.username}
                caption={post.caption}
                postId={id}
                user={user}
              />
            ))}
          </>
        ) : (
          <h2 className="app__noposts">There aren`t posts yet!</h2>
        )}
      </div>
    </div>
  );
}

export default PostsList;
