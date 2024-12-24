import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    // Handle "Keep Reading" button click
    const handleKeepReading = (e) => {
        e.preventDefault(); // Prevent default link behavior
        // Navigate to the blog page with a query parameter
        navigate(`/blogs/${blog.id}`);
    };

    return (
        <div className="swiper-container swiper-group-3">
            <div className="swiper-wrapper pb-70 pt-5">
                <div className="swiper-slide">
                    <div className="card-grid-3 hover-up">
                        <div className="text-center card-grid-3-image">
                            <a href={blog.link}> 
                            </a>
                        </div>
                        <div className="card-block-info">
                            <div className="row">
                            </div>
                            <h5 className="mt-15 heading-md">
                            {blog.title}
                            </h5>
                            <div className="card-2-bottom mt-50">
                                <div className="row">
                                    <div className="col-lg-9 col-8">
                                        <button
                                            onClick={handleKeepReading}
                                            className="btn btn-border btn-brand-hover"
                                        >
                                            Keep reading
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
