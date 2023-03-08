import EventCard from '@/components/cards/EventCard'
import { changeHomeRoute, EHomeRoutes } from '@/features/routes/homeRoutesSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllEvents } from '@/features/events/eventSlice'
import { notFound, TPEvent } from '@/routes/home_routes/switchable/events/EventsPage'
import FilledBtn from '@/components/shared/FilledBtn'
import { BiCaretDown, BiCaretUp } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { ETogglers, getToggler, toggle, toggleSetFalse, toggleSetTrue } from '@/features/togglers/togglerSlice'
import { BsFilterRight, BsSearch } from 'react-icons/bs'
import { HiOutlineSwitchVertical, HiTemplate } from 'react-icons/hi'
import { MdOutlineFilterAlt } from 'react-icons/md'
import useMediaQuery from '@/hooks/useMediaQuery'
import { api } from '@/api/api'
import { filter, search } from '@/features/workouts/workouts.slice'
import { TStoreDispatch } from '@/store/store'

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
    Wings = "Wings",
}

export enum ECategories {
    All = "All Categories",
    Push = "Push",
    Pull = "Pull",
    Legs = "Legs"
}

export enum EWorkouts {
    mine = "My Workouts",
    global = "Workouts"
}

const MyWorkoutsHeader = (props: Props) => {
    //#region : grabbing
    const dispatch: TStoreDispatch = useDispatch()

    const wrapSrcFil = useMediaQuery("(max-width:1171px)")
    const flexCol = useMediaQuery("(max-width:970px)")
    const filterFlexCol = useMediaQuery("(max-width:696px)")
    const ifMobile = useMediaQuery("(max-width:586px)")
    const isSmallMobile = useMediaQuery("(max-width:348px)")

    //#endregion

    //#region : selectors
    const events = useSelector(selectAllEvents)
    const isFocusFilterOpen = useSelector(getToggler).workoutFocusFilter
    const isCatFilterOpen = useSelector(getToggler).workoutCatFilter
    const toggler = useSelector(getToggler)

    //#endregion

    //#region : custom-declarations

    // #region : functionality
    const [focuses, setFocuses] = useState<Array<EFocuses>>([
        EFocuses.Wings,
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
    const [selectedFocuses, setSelectedFocuses] = useState<Array<EFocuses>>([])

    const [categories, setCategories] = useState<ECategories[]>([
        ECategories.All,
        ECategories.Push,
        ECategories.Pull,
        ECategories.Legs,
    ])

    const [selectedCategory, setSelectedCategory] = useState<ECategories>(ECategories.All)

    const [whichWorkouts, setWhichWorkouts] = useState(EWorkouts.global)

    // #endregion
    //#endregion

    // #region : custom
    const [src, setSrc] = useState<string>("")

    // #endregion





    //#region : side-effects

    // handle the home route route change
    useEffect(() => {
        dispatch(changeHomeRoute(EHomeRoutes.myWorkouts))
        return () => {
            dispatch(changeHomeRoute(EHomeRoutes.other))
        }
    }, [])

    // controls the hiding and showing of the src and filter tabs acc to screen width
    useEffect(() => {
        if (wrapSrcFil) {
            // when device width goes below the respective values, this hides the search and filter bars
            dispatch(toggleSetFalse(ETogglers.isFilterOpen))
            dispatch(toggleSetFalse(ETogglers.isSearchOpen))
        } else {
            // when device has a big screen it automatically shows both the search and filter bar
            dispatch(toggleSetTrue(ETogglers.isFilterOpen))
            dispatch(toggleSetTrue(ETogglers.isSearchOpen))
        }
    }, [wrapSrcFil])

    // handle search input
    useEffect(() => {
        // reset the filter's once the user touches the search
        console.log(
            "src effect"
        );


        // don't execute if the search is set as empty
        if (src) {
            selectedFocuses.length && setSelectedFocuses([])
            selectedCategory !== "All Categories" && setSelectedCategory(ECategories.All)
            toggler.workoutCatFilter && dispatch(toggleSetFalse(ETogglers.workoutFocusFilter))
            toggler.workoutFocusFilter && dispatch(toggleSetFalse(ETogglers.workoutCatFilter));

            // fetch data
            (async () => {
                dispatch(search({ src, mine: whichWorkouts === EWorkouts.global ? "" : true }))
            })()
        } else {
            selectedCategory === "All Categories" && selectedFocuses.length === 0 && (
                dispatch(filter({ selectedCategory, selectedFocuses, mine: whichWorkouts === EWorkouts.global ? "" : true }))
            )
        }



    }, [src, whichWorkouts])

    // handle filters
    useEffect(() => {
        src && setSrc("");
        (async () => {
            dispatch(filter({ selectedCategory, selectedFocuses, mine: whichWorkouts === EWorkouts.global ? "" : true }))
        })()
    }, [selectedCategory, selectedFocuses, whichWorkouts])

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
        <>
            {/* header bar */}
            <div className={`${flexCol ? "items-start" : "items-center"} ${ifMobile && "flex-col gap-5"} w-full flex  justify-between bg-pink-200 padding py-3 px-4 h-auto transition-all sticky top-0 left-0 z-[49]`}>

                {/* title & search */}
                <div className={`flex gap-5 ${flexCol ? "flex-col justify-start" : "items-center"}`}>
                    {/* title */}
                    <div className='flex gap-2 items-center justify-start'>
                        <h1
                            className={`${ifMobile ? "text-2xl" : "text-2xl"} font-extrabold`}>{whichWorkouts === EWorkouts.global ? "All Workouts" : "MY WORKOUTS"}</h1>
                        <HiOutlineSwitchVertical
                            size={26}
                            className={"bg-white rounded-full p-[3px] cursor-pointer"}
                            onClick={() => {

                                // switching overall to my workouts
                                setWhichWorkouts(prev => {
                                    if (prev === EWorkouts.global) {
                                        return EWorkouts.mine
                                    } else {
                                        return EWorkouts.global
                                    }
                                })

                                // clearing the src and filter
                                setSrc("")
                                setSelectedCategory(ECategories.All)
                                setSelectedFocuses([])


                            }}
                        />
                    </div>

                    {/* search */}
                    {
                        toggler.isSearchOpen && (
                            <div className={`${ifMobile && "hidden"}`}>
                                <input
                                    type="text"
                                    placeholder='eg. Bench Press'
                                    className={`p-1 h-10 px-2 w-[300px] rounded-sm`}
                                    value={src}
                                    onChange={(e) => {
                                        setSrc(e.target.value)
                                    }} />
                            </div>
                        )
                    }
                </div>

                {/* filter and create new workout */}
                <div className={`flex gap-3 
${flexCol ?
                        `${ifMobile ? "items-start" : "items-end"} flex-col`
                        : "items-center"
                    }`}>
                    {/* filter */}
                    {
                        toggler.isFilterOpen && (
                            <div className={`flex gap-3 ${flexCol && "order-2"} ${filterFlexCol ? `flex-col ${ifMobile ? "items-start" : "items-end"} ` : "items-center"}`}>

                                {/* 1. categories filter */}
                                <div className='w-[150px] bg-white p-2 relative'>

                                    {/* selected category */}
                                    <div className='w-full cursor-pointer flex gap-2 items-center' onClick={() => {
                                        dispatch(toggle(ETogglers.workoutCatFilter))
                                        filterFlexCol && dispatch(toggleSetFalse(ETogglers.workoutFocusFilter))
                                    }}>
                                        <MdOutlineFilterAlt />
                                        <span>
                                            {selectedCategory}
                                        </span>
                                    </div>

                                    {/* hr and available options */}
                                    {
                                        // show available options only when it got clicked
                                        isCatFilterOpen && (
                                            <div>
                                                {/* hr */}
                                                <hr className='translate-y-[0.45rem]' />

                                                {/* available options */}
                                                <div className='absolute w-full bg-white top-10 left-0 shadow-md z-[49]'>
                                                    {/* options */}
                                                    {
                                                        categories.map((cat, index) => {
                                                            return cat === selectedCategory ? <React.Fragment key={index}></React.Fragment> : (
                                                                <div
                                                                    key={index}
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
                                <div className='w-[280px] bg-white flex items-center'>
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
                                                    selectedFocuses.length > 0 ? (selectedFocuses.map((focus, index) => (
                                                        <div key={index} className='w-max h-max px-2 border-2 border-teal-200 bg-teal-50 rounded-lg flex items-center gap-2'>
                                                            <span className='text-xs'>{focus}</span>
                                                            <AiOutlineClose size={10} className="cursor-pointer" onClick={() => removeFromFocusFilter(focus)} />
                                                        </div>
                                                    ))) : (
                                                        <div
                                                            className='flex gap-3 items-center'>
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
                                                        <div className={`max-h-[180px] overflow-y-scroll transition-all`}>
                                                            {
                                                                focuses.map((focus, index) => (
                                                                    <div
                                                                        key={index}
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
                                    <div className='flex-[1] ml-2 cursor-pointer' onClick={() => {
                                        dispatch(toggle(ETogglers.workoutFocusFilter))
                                        filterFlexCol && dispatch(toggleSetFalse(ETogglers.workoutCatFilter))
                                    }}>
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
                        )
                    }


                    {/* create and toggler */}
                    <div className={`flex ${flexCol ? ifMobile ? "items-center" : "items-start" : "items-center"} gap-4`}>

                        {/* search & filter toggler */}
                        <div className={`items-center bg-white p-1 gap-4 rounded-md ${wrapSrcFil ? "flex" : "hidden"}`}>
                            {/* search */}
                            <BsSearch size={25} onClick={() => {
                                // shows search
                                dispatch(toggle(ETogglers.isSearchOpen))

                                // hides filter and closes all the dropdowns
                                dispatch(toggleSetFalse(ETogglers.isFilterOpen))
                                dispatch(toggleSetFalse(ETogglers.workoutCatFilter))
                                dispatch(toggleSetFalse(ETogglers.workoutFocusFilter))
                            }} className={`cursor-pointer`} />

                            {/* hr */}
                            <div className='h-[20px] border-l-2'></div>
                            {/* filter */}
                            <MdOutlineFilterAlt size={30} onClick={() => {
                                dispatch(toggle(ETogglers.isFilterOpen))
                                dispatch(toggleSetFalse(ETogglers.isSearchOpen))
                            }}
                                className={`cursor-pointer`} />
                        </div>

                        {/* create */}
                        <FilledBtn content={"Create"} to={"/home/my_workouts/create"} />

                    </div>

                    {/* search only for mobile screens */}
                    {
                        ifMobile && toggler.isSearchOpen && (
                            <div className={``}>
                                <input
                                    type="text"
                                    placeholder='eg. Bench Press'
                                    className={`p-1 h-10 px-2 w-[300px] rounded-sm`}
                                    value={src}
                                    onChange={(e) => {
                                        setSrc(e.target.value)
                                    }} />
                            </div>
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default MyWorkoutsHeader