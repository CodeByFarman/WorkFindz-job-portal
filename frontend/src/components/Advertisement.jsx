import React from 'react'

const Advertisement = () => {
  return (
<section className="section-box mt-50 mb-70 bg-patern">
  <div className="container">
    <div className="row">
      <div className="col-lg-6 col-sm-12">
        <div className="content-job-inner">
          <h2 className="section-title heading-lg wow animate__animated animate__fadeInUp">
            The #1 Job Board for Top Opportunities
          </h2>
          <div className="mt-40 pr-50 text-md-lh28 wow animate__animated animate__fadeInUp">
          Effortlessly search and connect with the most qualified and exceptional talent, faster than ever before. Our platform empowers you to discover and engage with candidates who are the perfect match for your roles, skillfully tailored to meet the needs of diverse industries. Whether you're seeking specialists, innovators, or dynamic professionals, we streamline the process to help you build the ideal team with precision and efficiency.  With advanced search tools, filters, and a user-friendly interface, you can explore a vast pool of talent that aligns perfectly with your company’s vision and goals.
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-sm-12">
        <div className="box-image-job">
          <figure className="wow animate__animated animate__fadeIn">
            <img alt="WorkFindz" src="assets/imgs/blog/5439-removebg-preview.png" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Advertisement;
