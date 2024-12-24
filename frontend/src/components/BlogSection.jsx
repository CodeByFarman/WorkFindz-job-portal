import React from "react";
import BlogCarousel from "./BlogCarousel";

const BlogSection = () => {
    return (
        <section className="section-box mt-50">
            <div className="container">
                <div className="row align-items-end">
                    <div className="col-lg-7 col-md-7">
                        <h2 className="section-title mb-20 wow animate__animated animate__fadeInUp hover-up" data-wow-delay=".1s">
                            From blog
                        </h2>
                        <p className="text-md-lh28 color-black-5 wow animate__animated animate__fadeInUp hover-up" data-wow-delay=".1s">
                            Latest News & Events
                        </p>
                    </div>
                    <div className="col-lg-5 col-md-5 text-lg-end text-start">
                        <a href="/Blog" className="btn btn-border icon-chevron-right wow animate__animated animate__fadeInUp hover-up mt-15" data-wow-delay=".1s">
                            View more
                        </a>
                    </div>
                </div>
                <div className="row mt-70">
                    <BlogCarousel />
                    
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
