// HOOKS
import { useState } from "react"
import { useDispatch } from "react-redux"

// ICONS
import { BsHeart, BsHeartFill } from "react-icons/bs"

// SLICE FUNC
import { likePhoto, resetMessage } from "../../slices/photoSlice"

const LikeBtn = ({ photo, user }) => {
  const [btnLiked, setBtnLiked] = useState(false)

  const dispatch = useDispatch()

  const handleLikePhoto = photo => {
    setBtnLiked(true)

    dispatch(likePhoto(photo._id))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 3000)
  }

  return (
    <div>
      {user && photo.likes && (
        <>
          {!photo.likes.includes(user.id) && !btnLiked ? (
            <BsHeart onClick={() => handleLikePhoto(photo)} />
          ) : (
            <BsHeartFill />
          )}
        </>
      )}
    </div>
  )
}

export default LikeBtn
