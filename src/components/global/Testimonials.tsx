import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { faker } from '@faker-js/faker';
import TestimonialCard from '../cards/TestimonialCard';

type Props = {}

const testimonials = [
    {
        _id: 1,
        username: "selva",
        content: "This apps helped me a lot along my fitness journey.",
        image: faker.image.animals(),
        designition: "CEO, AIT InfoTech."
    },
    {
        _id: 2,
        username: "ganesh",
        content: "During my metamorphosis, Quantum Gym is my personel trainer.",
        image: faker.image.city(),
        designition: "Senior Engineer, VPI Solutions."
    },
    {
        _id: 3,
        username: "sekar",
        content: "Good place to be for, a clean and clear workout and upcoming event details.",
        image: faker.image.people(),
        designition: "VAO, Tuticorin."
    },
    {
        _id: 4,
        username: "livi",
        content: "Quantum Gym rocks.",
        image: faker.image.fashion(),
        designition: "VAO, Tuticorin."
    },
    // {
    //     _id: 4,
    //     username: "livi",
    //     content: "Quantum Gym rocks.",
    //     image: faker.image.people(),
    //     designition: "Associate analyst, Asphault Industries."
    // },
]

const Testimonials = (props: Props) => {
    return (
        <>
            <div className='bg-blue-50 py-16'>
                <div className=' xs:w-[90%] sm:w-[80%] m-auto mb-5'>
                    <h1 className='text-center font-extrabold text-4xl mb-8'>TESTIMONIALS</h1>
                    <Carousel
                        className='w-full'
                        autoPlay={true}
                        autoPlaySpeed={2500}
                        transitionDuration={1000}
                        infinite={true}
                        responsive={{
                            large: {
                                breakpoint: { max: 4000, min: 1440 },
                                items: 3,
                            },
                            medium: {
                                breakpoint: { max: 1440, min: 1024 },
                                items: 2,
                            },
                            small: {
                                breakpoint: { max: 1024, min: 768 },
                                items: 2,
                            },
                            xs: {
                                breakpoint: { min: 0, max: 768 },
                                items: 1,
                            },
                        }}
                    >
                        {testimonials.map((item) => (
                            <TestimonialCard item={item} key={item._id} />
                        ))}
                    </Carousel>


                </div>
            </div>
        </>
    )
}

export default Testimonials