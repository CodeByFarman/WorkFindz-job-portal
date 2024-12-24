import React, { useEffect } from 'react';
import JobSearchForm from '../components/JobSearchForm';
import WOW from 'wow.js';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import RecentJobs from '../components/RecentJobs';
import Advertisement from '../components/Advertisement';
import BlogSection from '../components/BlogSection';

const HomePage = () => {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);
  
  return (
    <main className="main">
      <section className="section-box">
        <div className="banner-hero hero-1">
          <div className="banner-inner">
            <div className="row">
              <div className="col-lg-8">
                <div className="block-banner">
                  <span className="text-small-primary text-small-primary--disk text-uppercase wow animate__animated animate__fadeInUp">
                    Best jobs place
                  </span>
                  <h1 className="heading-banner wow animate__animated animate__fadeInUp">
                    The Easiest Way to Get Your New Job
                  </h1>
                  <div className="banner-description mt-30 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                    Each month, more than 3 million job seekers turn to our website in their search for work, making over 140,000 applications every single day.
                  </div>
                  <div className="list-tags-banner mt-60 wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                  <JobSearchForm />
                  <div className="list-tags-banner mt-60 wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                    <strong>Popular Searches: </strong>
                    <a href="#">Designer</a>, <a href="#">Developer</a>, <a href="#">Web</a>, <a href="#">Engineer</a>, <a href="#">Senior</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="banner-imgs">
                  <img alt="jobhub" src="assets/imgs/banner/Untitled design.png" className="img-responsive shape-1" />
                  <span className="union-icon">
                    <img alt="jobhub" src="assets/imgs/banner/union.svg" className="img-responsive shape-3" />
                  </span>
                  <span className="congratulation-icon">
                    <img alt="jobhub" src="assets/imgs/banner/congratulation.svg" className="img-responsive shape-2" />
                  </span>
                  <span className="docs-icon">
                    <img alt="jobhub" src="assets/imgs/banner/docs.svg" className="img-responsive shape-2" />
                  </span>
                  <span className="course-icon">
                    <img alt="jobhub" src="assets/imgs/banner/course.svg" className="img-responsive shape-3" />
                  </span>
                  <span className="web-dev-icon">
                    <img alt="jobhub" src="assets/imgs/banner/web-dev.svg" className="img-responsive shape-3" />
                  </span>
                  <span className="tick-icon">
                    <img alt="jobhub" src="assets/imgs/banner/tick.svg" className="img-responsive shape-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Slider />
      <section className='section-box'>
        <div className='container'>
        <div className="row align-items-end">
                    <div className="col-lg-7">
                        <h2 className="section-title mb-20 wow animate__animated animate__fadeInUp">Browse by category</h2>
                        <p className="text-md-lh28 color-black-5 wow animate__animated animate__fadeInUp">Find the type of work
                            you need, clearly defined and ready to start. Work begins as soon as you purchase and provide
                            requirements.</p>
                    </div>
                    <div className="col-lg-5 text-lg-end text-start wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                        <a href="/JobList" className="mt-sm-15 mt-lg-30 btn btn-border icon-chevron-right">Browse all</a>
                    </div>
                </div>
        </div>
        <Categories />
        <RecentJobs />
        <Advertisement />
        <BlogSection />
      </section>
    </main>
   
  );
};

export default HomePage;
