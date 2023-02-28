import EventCard from '@/components/cards/EventCard'
import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllEvents } from '@/features/events/eventSlice'
import { notFound, TPEvent } from './events/EventsPage'
import FilledBtn from '@/components/shared/FilledBtn'
import { BiCaretDown, BiCaretUp } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { ETogglers, getToggler, toggle } from '@/features/togglers/togglerSlice'
import { BsFilterRight } from 'react-icons/bs'
import { HiTemplate } from 'react-icons/hi'
import { MdOutlineFilterAlt } from 'react-icons/md'

type Props = {}

export enum EFocuses {
    Hamstrings = "Hamstrings",
    Calves = "Calves",
    Chest = "Chest",
    Back = "Back",
    Shoulders = "Shoulders",
    Triceps = "Triceps",
    Biceps = "Biceps",
    Forearms = "Forearms",
    Trapezius = "Trapezius",
    Abs = "Abs",
}

export enum ECategories {
    All = "All Categories",
    Push = "Push",
    Pull = "Pull",
    Legs = "Legs"
}

const MyWorkoutsPage = (props: Props) => {
    //#region : grabbing
    const dispatch = useDispatch()

    //#endregion

    //#region : selectors
    const events = useSelector(selectAllEvents)
    const isFocusFilterOpen = useSelector(getToggler).workoutFocusFilter
    const isCatFilterOpen = useSelector(getToggler).workoutCatFilter

    //#endregion

    //#region : custom-declarations
    const [focuses, setFocuses] = useState<Array<EFocuses>>([
        EFocuses.Hamstrings,
        EFocuses.Calves,
        EFocuses.Chest,
        EFocuses.Back,
        EFocuses.Shoulders,
        EFocuses.Triceps,
        EFocuses.Biceps,
        EFocuses.Forearms,
        EFocuses.Trapezius,
        EFocuses.Abs,
    ])
    const [selectedFocuses, setSelectedFocuses] = useState<Array<EFocuses>>([
        EFocuses.Abs,
        EFocuses.Calves,
    ])

    const [categories, setCategories] = useState<ECategories[]>([
        ECategories.All,
        ECategories.Push,
        ECategories.Pull,
        ECategories.Legs,
    ])

    const [selectedCategory, setSelectedCategory] = useState<ECategories>(ECategories.All)

    //#endregion

    //#region : side-effects
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.myWorkouts))
        return () => {
            dispatch(changeHomeRoute(EHomeRoutes.other))
        }
    }, [])
    //#endregion

    //#region : functions

    // remove selected items from focus filter
    const removeFromFocusFilter = (item: EFocuses) => {
        if (!selectedFocuses.includes(item)) {
            return
        }
        setSelectedFocuses((prev) => {
            return prev.filter(focus => focus !== item)
        })
    }

    // add items to focus filter
    const addItemsToFocusFilter = (item: EFocuses) => {
        if (selectedFocuses.includes(item)) {
            return
        }
        setSelectedFocuses(prev => {
            return [...prev, item]
        })
    }

    //#endregion

    //jsx rendering
    return (
        <section id='myWorkouts' className='  w-full h-[calc(100vh-72px)]'>


            {/* header bar */}
            <div className='w-full flex items-center justify-between bg-pink-200 padding py-3 px-4 '>

                {/* title & search */}
                <div className='flex items-center gap-5'>
                    {/* title */}
                    <div>
                        <h1 className='text-2xl font-extrabold'>MY WORKOUTS</h1>
                    </div>

                    {/* search */}
                    <div>
                        <input type="text" placeholder='eg. Bench Press' className='p-1 px-2 w-[300px] rounded-sm' />
                    </div>
                </div>

                {/* filter and create new workout */}
                <div className='flex items-center gap-3'>

                    {/* filters */}
                    <div className='flex gap-3 items-center'>

                        {/* 1. categories filter */}
                        <div className='w-[150px] bg-white p-2 relative'>

                            {/* selected category */}
                            <div className='w-full cursor-pointer flex gap-2 items-center' onClick={() => dispatch(toggle(ETogglers.workoutCatFilter))}>
                                <MdOutlineFilterAlt />
                                <span>
                                    {selectedCategory}
                                </span>
                            </div>

                            {/* hr and available options */}
                            {
                                isCatFilterOpen && (
                                    <div>
                                        {/* hr */}
                                        <hr className='translate-y-[0.45rem]' />

                                        {/* available options */}
                                        <div className='absolute w-full bg-white top-10 left-0 shadow-md'>
                                            {/* options */}
                                            {
                                                categories.map((cat) => {
                                                    return cat === selectedCategory ? null : (
                                                        <div
                                                            className={'w-full p-2 cursor-pointer hover:bg-teal-50'}
                                                            onClick={() => {
                                                                setSelectedCategory(cat)
                                                                dispatch(toggle(ETogglers.workoutCatFilter))
                                                            }}
                                                        >{cat}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                        {/* 2. focus selection */}
                        <div className='w-[320px] bg-white flex  items-center'>
                            {/* previewer */}
                            <div className=' flex-[10] relative h-10 '>
                                {/* placholder for absolute floater */}
                                <div className=''>
                                </div>

                                {/* floating */}
                                <div
                                    className={
                                        `absolute top-0 left-0 bg-white min-w-full
                                    ${isFocusFilterOpen && "shadow-md"}
                                    `
                                    }>
                                    {/* selected items previewer */}
                                    <div
                                        className={`w-full overflow-y-scroll flex flex-wrap p-2 pt-[0.60rem] gap-3 transition-all
                                    ${isFocusFilterOpen ? "max-h-[101.6px]" : "max-h-[38.4px]"}
                                    `}>
                                        {
                                            selectedFocuses.length > 0 ? (selectedFocuses.map((focus) => (
                                                <div className='w-max h-max px-2 border-2 border-teal-200 bg-teal-50 rounded-lg flex items-center gap-2'>
                                                    <span className='text-xs'>{focus}</span>
                                                    <AiOutlineClose size={10} className="cursor-pointer" onClick={() => removeFromFocusFilter(focus)} />
                                                </div>
                                            ))) : (
                                                <div className='flex gap-3 items-center'>
                                                    <BsFilterRight size={20} className="cursor-pointer" onClick={() => dispatch(toggle(ETogglers.workoutFocusFilter))} />
                                                    <span>filter by target muscles</span>
                                                </div>
                                            )
                                        }

                                    </div>


                                    {/* line break & available options */}
                                    {
                                        isFocusFilterOpen && (
                                            <>
                                                {/* line break */}
                                                <hr className='mt-2 w-[90%] m-auto' />

                                                {/* available options */}
                                                <div className='max-h-[180px] overflow-y-scroll'>
                                                    {
                                                        focuses.map(focus => (
                                                            <div
                                                                className={`text-sm cursor-pointer ${selectedFocuses.includes(focus) && "border-l-4 border-teal-500"} w-full p-2 hover:bg-teal-50 `}
                                                                onClick={() => {
                                                                    if (selectedFocuses.includes(focus)) {
                                                                        removeFromFocusFilter(focus)
                                                                        return
                                                                    }
                                                                    addItemsToFocusFilter(focus)
                                                                }}
                                                            >

                                                                {focus}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
                                </div>

                            </div>

                            {/* seperator bar */}
                            <div className='border-l-2 h-[20px]'></div>

                            {/* toggle caret icon */}
                            <div className='flex-[1] ml-2 cursor-pointer' onClick={() => dispatch(toggle(ETogglers.workoutFocusFilter))}>
                                {/* {
                                    isFocusFilterOpen ? <BiCaretUp /> : <BiCaretDown />
                                } */}
                                <BiCaretDown
                                    className={`
                                transition-all
                                ${isFocusFilterOpen && "rotate-180"}
                                `}
                                />
                            </div>
                        </div>

                    </div>

                    {/* create */}
                    <FilledBtn content={"Create"} />
                </div>

            </div>
        </section>
    )
}

export default MyWorkoutsPage