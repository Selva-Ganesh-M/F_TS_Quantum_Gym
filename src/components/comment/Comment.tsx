import { api, TPayload } from '@/api/api'
import { deleteComment, TPComment, updateComment } from '@/features/comments/comment.slice'
import { TPUser } from '@/features/user/user.slice'
import { TRootState, TStoreDispatch } from '@/store/store'
import React, { useState, useEffect } from 'react'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import { BsTrashFill } from "react-icons/bs"
import { MdUpload } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross1 } from "react-icons/rx"
import { format } from "timeago.js"

type Props = {
    item: TPComment
}

const Comment = ({ item }: Props) => {
    //#region : grabbing
    const dispatch = useDispatch<TStoreDispatch>()


    const commentState = useSelector((state: TRootState) => state.comment)


    //#endregion

    //#region : selectors

    //#endregion

    //#region : custom-declarations

    const [readMore, setReadMore] = useState<Boolean>(false)
    const [currentUser, setCurrentUser] = useState<TPUser>({} as TPUser)
    const [isCommentOpen, setIsCommentOpen] = useState<Boolean>(false)
    const [newValue, setNewValue] = useState<string>("")
    const [count, setCount] = useState<number>(1)

    // loaders
    const [isUpdating, setIsUpdating] = useState<Boolean>(false)
    const [isDeleting, setIsDeleting] = useState<Boolean>(false)

    //#endregion

    //#region : side-effects
    useEffect(() => {
        // fetch the user
        (async () => {
            const res = await api.get<TPayload<TPUser>>(`/users/${item.userId}`)
            res.data.statusText === "success" && setCurrentUser(res.data.payload)
        })()
    }, [])

    useEffect(() => {
        setNewValue(item.content)
    }, [item])

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <div className="w-full flex gap-3 items-start px-3 pt-5 py-3 border-2 border-gray-200 " key={item._id}>
            {/* image */}
            <div className='rounded-full w-[40px] h-[40px] sticky top-[60px]'>
                <img src={currentUser.image} alt="" className='h-full w-full rounded-full object-cover' />
            </div>
            {/* content */}
            <div className='flex-1 self-center flex flex-col gap-1'>
                {/* username and time */}
                <div className='flex items-center gap-2'>
                    <span className='font-bold text-md capitalize'>
                        {currentUser.username}
                    </span>
                    <span className='text-xs text-gray-600'>{format(item.createdAt)}</span>
                </div>
                {/* comment text */}
                <div>
                    {

                        isCommentOpen ? (<>
                            <textarea
                                value={newValue}
                                className="w-full p-2 border-2 border-gray-300 outline-neutral-300 resize-none h-[150px]"
                                onChange={(e) => setNewValue(e.target.value)}
                            />
                        </>) : (<>
                            <div className='self-center'>
                                {
                                    item.content.substring(0, count * 300)}
                                {item.content.length > 300 && item.content.length < count * 300 && (
                                    <span className='text-blue-500 cursor-pointer' onClick={() => setCount(1)}>
                                        " show less..."
                                    </span>
                                )}
                                {item.content.length > count * 300 && <span className='text-blue-500 cursor-pointer' onClick={() => setCount(prev => prev + 1)}>
                                    " show more..."
                                </span>}
                            </div>
                        </>)

                    }
                </div>
            </div>

            {/* actions */}
            <div className='flex gap-3 items-center sticky top-[60px]'>
                {/* edit */}

                {
                    isCommentOpen ? (
                        <div className='flex items-center gap-3'>
                            <RxCross1 size={26} style={{ color: "red" }} className={`cursor-pointer`} onClick={() => {
                                setIsCommentOpen(false)
                                setNewValue(item.content)
                            }} />

                            {
                                commentState.isUpdating ? (
                                    <div
                                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        role="status">
                                        <span
                                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                        >Loading...</span
                                        >
                                    </div>
                                ) : (
                                    <MdUpload size={30} style={{ color: "red" }} className={`cursor-pointer`} onClick={
                                        async () => {
                                            setIsUpdating(true)
                                            await dispatch(
                                                updateComment(
                                                    {
                                                        id: item._id,
                                                        content: newValue
                                                    }
                                                )
                                            )
                                            setIsUpdating(false)
                                            setIsCommentOpen(false)
                                        }
                                    } />
                                )
                            }
                        </div>
                    ) : (
                        <>
                            <BiEditAlt size={30} style={{ color: "red" }} className={`cursor-pointer`} onClick={() => setIsCommentOpen(true)} />
                        </>
                    )
                }
                {/* delete */}
                {
                    isDeleting ? (
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span
                            >
                        </div>
                    ) : (
                        <BiTrashAlt size={26} className={`cursor-pointer`} onClick={async () => {
                            setIsDeleting(true)
                            await dispatch(deleteComment(item._id))
                            setIsDeleting(false)
                        }} />
                    )
                }
            </div>
        </div>
    )
}

export default Comment