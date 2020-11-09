import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../database";
import firebase from "firebase";
import { Button } from "@material-ui/core";

function Post({ username, caption, imgUrl, postId, user }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    let unsunscribe;
    if (postId) {
      unsunscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
          );
        });
    }
    return () => {
      unsunscribe();
    };
  }, [postId]);

  const handlePostComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment: commentText,
      username: user.displayName,
    });

    setCommentText("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="static/images/avatar/1.png"
        />
        <h3>{username}</h3>
      </div>
      {imgUrl ? (
        <img className="post__image" src={imgUrl} alt="post" />
      ) : (
        <p>Can`t load image</p>
      )}
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
      <div className="post__comments">
        {user && (
          <form className="post__comments__form">
            <input
              type="text"
              placeholder="Add a comment..."
              className="post__comments__input"
              value={commentText}
              onChange={(event) => {
                setCommentText(event.target.value);
              }}
            />
            <Button
              className="post__comments__btn"
              onClick={handlePostComment}
              type="submit"
            >
              Post
            </Button>
          </form>
        )}
        <span className="post__comments__title">Comments</span>
        {comments.map(({ id, comment }) => (
          <p className="post__comments__comment" key={id}>
            {comment.username} : {comment.comment}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Post;
