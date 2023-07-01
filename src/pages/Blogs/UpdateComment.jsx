import { useEffect, useState, useContext } from "react";
import "./updateComment.css";
import { IoSend } from "react-icons/io5";
import Axios from "axios";
import { Context } from "../../context/userContext/Context";
import { apidomain } from "../../utils/domain";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateComment({ comment, fetchCommentsDetails }) {
  const { user } = useContext(Context); // user details
  const [newComment, setNewComment] = useState(""); // comment details
  useEffect(() => {
    setNewComment(comment.Coment);
  }, []);

  // HANDLE UPDATE BTN
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.put(
      `${apidomain}/comments/${comment.CommentID}`,
      { Coment: newComment },
      {
        headers: {
          Authorization: `${user.token}`,
        },
      }
    )
      .then((response) => {
        fetchCommentsDetails();
        //console.log(response);
        toast.success(response.data, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
       // alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form className="updateComment">
        <textarea
          className="inputupdateComment"
          placeholder="Write a comment"
          name="Coment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          //   defaultValue={comment.Coment}
        ></textarea>

        <button type="submit" className="submitUpdate" onClick={handleSubmit}>
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default UpdateComment;
