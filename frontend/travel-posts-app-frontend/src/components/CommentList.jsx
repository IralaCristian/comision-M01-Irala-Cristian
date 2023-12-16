import Comment from "./Comment";

const PostList = ({ comments }) => {
  if (comments == [])
    return (
      <div className="container">
        <p className="display-6"> This Post has not comments yet ..</p>
      </div>
    );

    console.log(comments)

  return (
    <>
      {comments.map((comment) => {
        return (
          <Comment
            commentId={comment._id}
            description={comment.description}
            commentAuthor={comment.author}
            createdAt={comment.createdAt}
          />
        );
      })}
    </>
  );
};
export default PostList;
