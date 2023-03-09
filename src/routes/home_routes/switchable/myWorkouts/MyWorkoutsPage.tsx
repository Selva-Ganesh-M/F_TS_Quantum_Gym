import MyWorkoutsHeader, { ECategories } from '@/components/headers/MyWorkoutsHeader'
import { dislikeWorkout, likeWorkout, selectAllWorkouts, selectOneWorkout, TPWorkout } from '@/features/workouts/workouts.slice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from "react"
import { api, TPayload } from '@/api/api'
import { TRootState, TStoreDispatch } from '@/store/store'
import { getUser } from '@/features/user/authSlice'
import EventCardLoader from '@/components/loaders/EventCardLoader'
import { notFound } from '../events/EventsPage'
import WorkoutCard from '@/components/cards/WorkoutCard'

type Props = {}


const MyWorkoutsPage = (props: Props) => {

    //#region : grabbing
    const workouts = useSelector(selectAllWorkouts)
    const { isWorkoutsLoading } = useSelector((state: TRootState) => state.workout)
    //#endregion

    //#region : selectors
    //#endregion

    //#region : custom-declarations
    const user = useSelector(getUser).user

    // #region : togglers
    const [showDetails, setShowDetails] = useState<Boolean>(true)

    // #endregion

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions


    //#endregion

    //jsx rendering
    return (
        <section id='myWorkouts' className='  w-full h-[calc(100vh-72px)] overflow-scroll relative'>
            <MyWorkoutsHeader />
            {/* body */}
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 pt-6 pb-24 relative bg-white`}
            >
                {
                    isWorkoutsLoading ? (
                        [...Array(10).keys()].map((item, index) => (
                            <EventCardLoader key={index} />

                        ))
                    ) : (<>
                        {
                            workouts.length > 0 ? (
                                workouts.map(item => (
                                    <WorkoutCard item={item} />
                                ))
                            ) : (
                                <div className='top-[50%] left-[50%] translate-x-[-50%] m-auto flex flex-col gap-5 absolute'>
                                    <img src={notFound} alt="" />
                                    <span className='text-center'>No results found.</span>
                                    <span className='text-center'>
                                        <Link to={"/home/my_workouts/create"}>Create your first workout.</Link>
                                    </span>
                                </div>
                            )
                        }
                    </>
                    )
                }
            </div>
        </section>
    )
}

export default MyWorkoutsPage