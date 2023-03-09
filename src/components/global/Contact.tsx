import React, { useState } from 'react'
import BlueGirl from "@/assets/blue_girl.jpg"
import FilledBtn, { EButtonType } from '../shared/FilledBtn'
import OutlineBtn from '../shared/OutlineBtn'


type Props = {}


const Contact = (props: Props) => {
    //#region : grabbing


    //#region: functionality


    //#endregion

    //#region: data


    //#endregion


    //#endregion

    //#region : selectors

    //#endregion

    //#region : custom-declarations


    //#region: simple states
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    //#endregion

    //#region: loaders


    //#endregion

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions

    //#endregion

    //jsx rendering
    return (
        <div
            id="contact"
            className='h-[calc(100vh-72px)] overflow-clip relative'>
            {/* background-img */}
            <div className='w-full lg:h-full'>
                <img src={BlueGirl} alt="" className='lg:block hidden w-full h-full object-cover' />
            </div>

            {/* overlay */}
            {/* <div
                className='absolute top-0 left-0 w-max h-max'
                style={{
                    background: " linear-gradient(90deg, rgba(23,27,42,0.6268558448770133) 32%, rgba(52,68,120,0.5428222314316351) 61%, rgba(5,129,219,0) 68%)"
                }} ></div> */}

            {/* form div */}
            <div className='
             pt-[75px] lg:pt-[20px] pb-10 rounded-lg px-7
            lg:absolute lg:z-[99] lg:top-16 lg:left-20 

            '>
                <h1 className='text-center font-extrabold text-4xl mb-8 lg:text-white'>Lets Talk</h1>

                {/* actual form */}
                <div className=' 
                w-[90%]  m-auto
                sm:w-[450px]
                lg:w-[400px]
                '>
                    <form action="https://formsubmit.co/selvadev2k@gmail.com" method="POST">
                        {/* username */}
                        <input type="text"
                            name="name"
                            className='w-full p-2 mb-3 border-2 border-gray-200 outline-none rounded-lg'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        {/* email */}
                        <input
                            type="email"
                            name="email"
                            className='w-full p-2 mb-3 border-2 border-gray-200 outline-none rounded-lg'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* content */}
                        <textarea
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            id=""
                            cols={30}
                            rows={10}
                            placeholder={"Message"}
                            className='outline-none rounded-lg resize-none w-full p-2 mb-3 border-2 border-gray-200'></textarea>

                        {/* submit reset */}
                        <div className='flex gap-1 xs:gap-3'>
                            <FilledBtn type={EButtonType.submit} content={"Submit"} />
                            <OutlineBtn type={EButtonType.reset} border={"border-2 lg:border-white"} sx={"lg:text-white"} content={"reset"} />
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Contact