import React, { useEffect, useRef, useState } from "react";
import "./Post.css";
import { db } from "../database";
import firebase from "firebase";
import { Avatar, Box, Button, Popover, TextField } from "@mui/material";
import MentionPopover from "./MentionPopover";

const properties = [
  "font-size",
  "font-family",
  "line-height",
  "width",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
];

function Post({ username, caption, imgUrl, postId, user }) {
  const inputRef = useRef(null);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [coords, setCoords] = useState(null);

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

  const handlePostComment = () => {
    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment: commentText,
      username: user.displayName,
    });

    setCommentText("");
  };

  const getUpdatedText = (element, text = "") => {
    const selectionStart = element.selectionStart;
    const startPart = element.innerHTML.slice(0, selectionStart);
    const endPart = element.innerHTML.slice(selectionStart);
    return `${startPart}${text}${endPart}`;
  };

  const createDiv = () => {
    const div = document.createElement("div");
    div.innerHTML = getUpdatedText(inputRef.current, '@<span id="target" />');
    const styles = getComputedStyle(inputRef.current);
    const styleText = properties.reduce(
      (str, property) =>
        `${str}${property}:${styles.getPropertyValue(property)};`,
      ""
    );
    div.style.cssText = `${styleText}white-space:pre;position:absolute;overflow:auto;max-height:170px;opacity:0;`;

    const parentRect = inputRef.current.getBoundingClientRect();
    div.top = parentRect.top;
    div.left = parentRect.left;
    document.body.append(div);

    const target = div.querySelector("#target");
    const top = parentRect.top + target.offsetTop - inputRef.current.scrollTop;
    const left = parentRect.left + target.offsetLeft + 4;
    setCoords({ top, left });
    div.remove();
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handlePostComment();
    }

    const value = event.target.value;
    const selectionIndex = event.target.selectionStart;
    const prevSymbol = value[selectionIndex - 1];
    const nextSymbol = value[selectionIndex];

    if (
      event.key === "@" &&
      !(
        (prevSymbol && !prevSymbol.match(/.*\s$/)) ||
        (nextSymbol && !nextSymbol.match(/.*\s$/))
      )
    ) {
      createDiv();
      setCommentText(getUpdatedText(inputRef.current, "@"));
    }
  };

  const closeMentions = () => setCoords(null);

  const onMentionClick = (user) => {
    setCommentText(getUpdatedText(inputRef.current, `${user.username} `));
    closeMentions();
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
        <strong>{username}</strong>: {caption ? caption : "..."}
      </h4>
      <div className="post__comments">
        {user && (
          <Box className="post__comments__form">
            <TextField
              type="text"
              placeholder="Add a comment..."
              fullWidth
              value={commentText}
              inputProps={{ style: { color: "white" } }}
              inputRef={inputRef}
              onKeyDown={onKeyDown}
              onChange={(event) => {
                setCommentText(event.target.value);
              }}
              maxRows={3}
              minRows={1}
              multiline
            />
            <Button
              className="post__comments__btn"
              onClick={handlePostComment}
              type="submit"
            >
              Post
            </Button>
          </Box>
        )}
        {comments.length > 0 && (
          <span className="post__comments__title">Comments</span>
        )}
        {comments.map(({ id, comment }) => (
          <p className="post__comments__comment" key={id}>
            {comment.username} : {comment.comment}
          </p>
        ))}
        <div id="here"></div>
        {coords && (
          <MentionPopover
            coords={coords}
            onClose={closeMentions}
            onMentionClick={onMentionClick}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
