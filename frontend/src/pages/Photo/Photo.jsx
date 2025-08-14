// CSS
import "./Photo.css"

import { images } from "../../utils/config"

// RESPONSIVE
import { useMediaQuery } from "react-responsive"

// HOOKS
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

// COMPONENTS
import Message from "../../components/Message/Message"
import LikeBtn from "../../components/LikeBtn/LikeBtn"

// ICONS
import { BsHeart, BsHeartFill, BsTrash, BsPencil } from "react-icons/bs"

// SLICE FUNCTIONS
import {
  deletePhoto,
  getPhotoById,
  resetMessage,
  addComment
} from "../../slices/photoSlice"
import { likePhoto } from "../../slices/photoSlice"

const Photo = () => {
  const [comment, setComment] = useState("")

  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" })

  const { photo, error, message } = useSelector(state => state.photo)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const { id } = params

  useEffect(() => {
    dispatch(getPhotoById(id))
  }, [id, message, dispatch])

  const handleLikePhoto = async () => {
    dispatch(likePhoto(id))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000)
  }

  const handleDeletePhoto = async () => {
    dispatch(deletePhoto(id))

    navigate(`/dashboard/${user.id}`)

    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000)
  }

  const handleAddComment = async e => {
    e.preventDefault()

    const userComment = {
      comment,
      id
    }

    dispatch(addComment(userComment))

    setComment("")

    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000)
  }

  if (error && error.includes("encontrada")) {
    return <Message msg={error} type="error" />
  }

  return (
    <>
      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
      <div className={isMobile ? "mobile_photo_page" : "desktop_photo_page"}>
        {photo && photo && photo.image && (
          <>
            <h2 className="photo_title">{photo.title}</h2>
            <img src={`${images}/photos/${photo.image}`} alt={photo.title} />
          </>
        )}

        <div className="actions">
          {user && photo && photo.likes?.includes(user.id) ? (
            <BsHeartFill onClick={handleLikePhoto} />
          ) : (
            <BsHeart onClick={handleLikePhoto} className="heart-icon" />
          )}

          {user && photo && photo.userId === user.id && (
            <>
              <div className="creator_actions">
                <BsTrash onClick={handleDeletePhoto} />

                <NavLink to={`/edit/${photo._id}`}>
                  <BsPencil />
                </NavLink>
              </div>
            </>
          )}
        </div>

        <div className="comments_container">
          <form onSubmit={handleAddComment}>
            <label>
              <input
                type="text"
                placeholder="Adicionar um comentário"
                onChange={e => setComment(e.target.value)}
                value={comment || ""}
              />
              <input type="submit" value="Enviar" />
            </label>
          </form>

          {photo && photo.comments && photo.comments.length === 0 ? (
            ""
          ) : (
            <>
              <div className="users_comments">
                {photo.comments &&
                  photo.comments.map(
                    comment =>
                      comment.comment && (
                        <div
                          key={comment.comment}
                          className="user_comment_container"
                        >
                          {comment && comment.userName && (
                            <p className="user_name bold">{comment.userName}</p>
                          )}

                          {comment && comment.comment && (
                            <p className="user_comment">{comment.comment}</p>
                          )}
                        </div>
                      )
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Photo
