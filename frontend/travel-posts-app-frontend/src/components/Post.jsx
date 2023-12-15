import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Post({
  postId,
  title,
  description,
  imageURL,
  author,
  comments,
  createdAt,
}) {
    let commentsCount;
    if (!comments){
        commentsCount= 0;
    }else{
        commentsCount= comments.length;
    }


  return (
    <div className="row">
      <div className="col md-3 sm-12">
        <img
          src={imageURL}
          className="rounded"
          height="300"
          width="300"
          alt="imagen del post"
        />
      </div>
      <div className="col md-9 sm-12">
        <Link to={`/post/${postId}`}> {title} </Link>
        <div className="row">
          <p className="display-4">{description}</p>
          <p className="display-5">Comments: {`${commentsCount}`}</p>
          <p> {createdAt.toString()} </p>
        </div>
        <div className="row">
          <div className="col-6 sm-12">
            <p> {author.username}</p>
          </div>
          <div className="col-6 sm-12">
            <Link to={`/post/edit/${postId}`}></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
