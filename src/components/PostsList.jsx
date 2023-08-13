import React, { useEffect, useState } from "react";
import { useData } from "../contexts/StateProvider";
import Post from "./Post";
import { db } from "../database";
import { Box, CircularProgress } from "@mui/material";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [{ user }] = useData();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="app__posts">
      <div className="app__postsLeft">
        <Box>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
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
                <div className="app__noposts">
                  <h2>There aren`t posts yet!</h2>
                </div>
              )}
            </>
          )}
        </Box>
      </div>
    </div>
  );
}

export default PostsList;
