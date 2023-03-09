import React from 'react'
import { SlSocialGithub, SlSocialInstagram, SlSocialTwitter } from 'react-icons/sl'
import { TiSocialFacebook, TiSocialLinkedin } from 'react-icons/ti'

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className='w-full py-10 gap-3 flex flex-col'>
            {/* socials */}
            <div className='flex gap-5 w-max m-auto items-center'>
                <TiSocialLinkedin className='cursor-pointer' size={26} />
                <SlSocialGithub className='cursor-pointer' size={18} />
                <SlSocialInstagram className='cursor-pointer' size={18} />
                <SlSocialTwitter className='cursor-pointer' size={18} />
                <TiSocialFacebook className='cursor-pointer' size={26} />
            </div>

            {/* content */}
            <div className='flex flex-col text-xs w-max m-auto'>
                <p className='inline font-semibold text-gray-500'>Copyright, ©2023</p>
                <p className='inline font-semibold text-gray-500'>All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer