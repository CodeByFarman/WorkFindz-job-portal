import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Basic Swiper styles
import "swiper/css/pagination"; // Swiper pagination styles
import { Pagination } from "swiper/modules";
import BlogCard from "./BlogCard";

const blogs = [
    {
        id: 1,
        title: "How to ace a virtual interview?",
    },
    {
        id: 2,
        title: "How to write an effective resume?",
    },
    {
        id: 3,
        title: "Interview Tips for Job Seekers!",
    },
    {
        id: 4,
        title: "The importance of networking in job searching",
    },
    {
        id: 5,
        title: "Understanding a Job Description",
    },
];

const BlogCarousel = () => {
    return (
        <div className="box-swiper">
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true }}
                breakpoints={{
                    // 1024: { slidesPerView: 3 },
                    // 768: { slidesPerView: 2 },
                    // 480: { slidesPerView: 1 },
                    1200: { slidesPerView: 3, spaceBetween: 30 }, // Large screens
                    1024: { slidesPerView: 2, spaceBetween: 20 }, // Tablets landscape
                    768: { slidesPerView: 2, spaceBetween: 15 },  // Tablets portrait
                    480: { slidesPerView: 1, spaceBetween: 10 },  // Mobile screens
                    0: { slidesPerView: 1, spaceBetween: 10 },    // Extra small screens
                }}
            >
                {blogs.map((blog) => (
                    <SwiperSlide key={blog.id}>
                        <BlogCard blog={blog} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BlogCarousel;
