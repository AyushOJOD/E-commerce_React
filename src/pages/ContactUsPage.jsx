import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../features/Auth/authSlice'

const ContactUsPage = () => {

    const user = useSelector(selectLoggedInUser);

    return (
        <div>
            <div className='w-full h-screen bg-[#1f2937] flex justify-center items-center p-4'>
                <form method='POST' action="https://getform.io/f/e6619a9f-2851-44ea-9e56-7ca536a2c7b0" className='flex flex-col max-w-[800px]'>
                    <div className='lg:pb-3 pb-0'>
                        <p className='text-4xl font-bold inline border-b-4 border-white text-gray-300'>Contact Us</p>
                        <p className='text-gray-300 py-4'>// Reach out to us through the form or Email - <a className='border-b-2' href="mailto: ayushsrivastava.0407@gmail.com">ayushsrivastava.0407@gmail.com</a></p>
                    </div>

                    <input className='bg-[#ccd6fc] rounded-sm p-1' type="text" placeholder='Name' name='name' />
                    <input className='my-4 p-2 bg-[#ccd6fc] rounded-sm' type="text" placeholder='Email' name='email' value={user.email} />
                    <textarea className='bg-[#ccd6fc] rounded-sm p-2' cols='30' rows='10' placeholder='Message' name='message' />
                    <button className='text-white border-2 px-6 py-4 mx-auto my-4 flex item-center gap-2 hover:bg-white hover:text-[#0a192f] hover:font-bold duration-300 rounded-md'>Submit</button>
                    <p className='text-white'>We will reach out to you in 24 hours.</p>
                </form>
            </div>
        </div>
    )
}

export default ContactUsPage



