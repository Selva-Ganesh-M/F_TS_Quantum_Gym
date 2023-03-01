import MyWorkoutsHeader from '@/components/headers/MyWorkoutsHeader'

type Props = {}


const MyWorkoutsPage = (props: Props) => {
    return (
        <section id='myWorkouts' className='  w-full h-[calc(100vh-72px)]'>
            <MyWorkoutsHeader />
        </section>
    )
}

export default MyWorkoutsPage