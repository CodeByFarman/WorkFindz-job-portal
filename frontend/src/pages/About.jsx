import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const About = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  const teamMembers = [
    {
      name: "Alfiya Suroor Khan",
      role: "CEO",
      imgSrc: "assets/imgs/page/about/man-146638_1280.png",
    },
    {
      name: "Amanuddin Shariff",
      role: "HR Manager",
      imgSrc: "assets/imgs/page/about/man-146638_1280.png",
    },
    {
      name: "MD Owaise Shariff",
      role: "HR CO-Ordinator",
      imgSrc: "assets/imgs/page/about/man-146638_1280.png",
    },
  ];
  const sections = [
    {
      title: "About the Company",
      content: (
        <div>
          <p>
            WorkFindz Consultants is a career consultancy and recruitment firm
            focused on helping job seekers connect with employment opportunities
            across various sectors. Based in Bangalore, India, facilitating
            placements in industries such as IT, customer service, and sales.
            Their services extend beyond just job listings to include career
            guidance, skill development, resume building, and interview
            coaching, aimed at increasing the chances of securing desirable
            roles. The firm also supports companies with talent acquisition,
            offering staffing solutions for temporary, permanent, and
            specialized roles. Their approach integrates personalized guidance
            with technology to ensure job seekers and employers achieve optimal
            results. The company emphasizes long-term career growth and
            stability by aligning job opportunities with candidates' skills and
            aspirations.
          </p>
        </div>
      ),
      imgSrc: "assets/imgs/page/about/2965738-removebg.png",
    },
    {
      title: "Vision",
      content: (
        <div>
          <p>
            WorkFindz aims to revolutionize the way companies recruit talent by
            using innovative approaches and technologies. Our vision
            encompasses:
          </p>
          <ul className="vision-list">
            <li>
              <strong>Connecting Talent with Opportunity:</strong> Helping job
              seekers find fulfilling careers while assisting employers in
              finding the most suitable candidates.
            </li>
            <li>
              <strong>Building a Skilled Workforce:</strong> Enhancing
              employability by promoting skill development and supporting career
              growth for candidates.
            </li>
            <li>
              <strong>Providing World-Class Staffing Solutions:</strong>{" "}
              Delivering reliable and efficient recruitment services that cater
              to the dynamic needs of diverse industries.
            </li>
          </ul>
        </div>
      ),
      imgSrc: "assets/imgs/page/about/eyes-35615_1920.png",
    },
    {
      title: "Mission",
      content: (
        <div>
          <p>Our mission includes:</p>
          <ul className="mission-list">
            <li>
              <strong>Building Long-Term Partnerships:</strong> Establishing
              lasting relationships with clients and candidates by delivering
              exceptional service.
            </li>
            <li>
              <strong>Promoting a Seamless Hiring Experience:</strong>{" "}
              Streamlining the recruitment process using technology and
              expertise.
            </li>
            <li>
              <strong>Supporting Workforce Development:</strong> Building a
              skilled workforce through strategic recruitment and talent
              management.
            </li>
            <li>
              <strong>Matching the Right Talent:</strong> Ensuring candidates
              find roles aligned with their skills and career aspirations.
            </li>
            <li>
              <strong>Enhancing Employability:</strong> Providing guidance and
              training to improve job seekers' skills.
            </li>
          </ul>
        </div>
      ),
      imgSrc: "assets/imgs/page/about/66-removebg-preview.png",
    },
    {
      title: "Goals",
      content: (
        <div>
          <p>Our primary goals are:</p>
          <ol className="goals-list">
            <li>Place a significant number of candidates in suitable roles.</li>
            <li>
              Maintain a high match rate between candidates’ skills and job
              requirements.
            </li>
            <li>Focus on client retention by delivering quality talent.</li>
            <li>
              Build long-term partnerships with businesses for recruitment
              needs.
            </li>
            <li>
              Support workforce development to meet the evolving job market
              demands.
            </li>
          </ol>
        </div>
      ),
      imgSrc: "assets/imgs/page/about/20943958.jpg",
    },
    {
      title: "Our Services",
      content: (
        <div>
          <p>WorkFindz offers:</p>
          <div className="services-list">
            <div className="service-category">
              <h4>Recruitment Services</h4>
              <ul>
                <li>Permanent Staffing</li>
                <li>Temporary Staffing</li>
              </ul>
            </div>
            <div className="service-category">
              <h4>Job Search Support</h4>
              <ul>
                <li>Job Alerts</li>
                <li>Career Counseling</li>
              </ul>
            </div>
            <div className="service-category">
              <h4>Employer Services</h4>
              <ul>
                <li>Workforce Planning</li>
                <li>Candidate Screening</li>
              </ul>
            </div>
            <div className="service-category">
              <h4>Career Guidance</h4>
              <ul>
                <li>Resume Writing Services</li>
                <li>Interview Preparation</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      imgSrc: "assets/imgs/page/about/call-center-1015274_1920.jpg",
    },
  ];

  return (
    <main className="main">
      {sections.map((section, index) => (
        <section className="section-box bg-banner-about" key={index}>
          <div className="banner-hero banner-about pt-20">
            <div className="banner-inner">
              <div className="row">
                {/* Text Section */}
                <div
                  className={`col-lg-7 ${
                    index % 2 === 0 ? "order-lg-1" : "order-lg-2"
                  }`}
                >
                  <div className="block-banner">
                    <h1 className="heading-banner heading-lg">
                      {section.title}
                    </h1>
                    <div className="banner-description box-mw-70 mt-30">
                      {section.content}
                    </div>
                    {/* Button only for "About the Company" */}
                    {index === 0 && (
                      <div className="mt-60">
                        <div className="box-button-shadow mr-10">
                          <a href="/contact" className="btn btn-default">
                            Contact us
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Image Section */}
                <div
                  className={`col-lg-5 d-block d-lg-block ${
                    index % 2 === 0 ? "order-lg-2" : "order-lg-1"
                  }`}
                >
                  <div className="banner-imgs">
                    <img
                      alt={section.title}
                      src={section.imgSrc}
                      // className="img-responsive main-banner shape-3"
                      className="img-fluid main-banner shape-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section className="section-box mt-90 mt-md-50" id="team">
        <div className="container">
          <h2 className="section-title text-center mb-15 wow animate__animated animate__fadeInUp">
            Meet our team
          </h2>
          <div className="text-normal text-center color-black-5 box-mw-60 wow animate__animated animate__fadeInUp">
            Find the type of work you need, clearly defined and ready to start.
            Work begins as soon as you purchase and provide requirements.
          </div>
          <div className="row mt-60 justify-content-center">
            {/* Team Members */}
            {teamMembers.slice(0, 3).map((member, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="card-grid-2 wow animate__animated animate__fadeIn">
                  <div className="text-center card-grid-2-image">
                    <a href="#">
                      <figure>
                        <img src={member.imgSrc} alt="WorkFindz" />
                      </figure>
                    </a>
                  </div>
                  <div className="card-block-info pt-10 text-center">
                    <h5 className="font-bold text-lg mb-5">{member.name}</h5>
                    <p className="text-small text-muted">{member.role}</p>
                    {/* <div className="card-2-bottom mt-15">
                      <a
                        href="#"
                        className="card-grid-2-socials icon-fb-sym"
                      ></a>
                      <a
                        href="#"
                        className="card-grid-2-socials icon-tw-sym"
                      ></a>
                      <a
                        href="#"
                        className="card-grid-2-socials icon-inst-sym"
                      ></a>
                      <a
                        href="#"
                        className="card-grid-2-socials icon-linkedin-sym"
                      ></a>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
