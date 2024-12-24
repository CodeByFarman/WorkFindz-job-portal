// import React from "react";
// import { Link } from "react-router-dom";

// const categories = [
//   {
//     id: 1,
//     name: "Marketing & Communication",
//     icon: "assets/imgs/theme/icons/marketing.svg",
//     vacancies: 156,
//     delay: "0s",
//   },
//   {
//     id: 2,
//     name: "Content Writer",
//     icon: "assets/imgs/theme/icons/content-writer.svg",
//     vacancies: 268,
//     delay: ".1s",
//   },
//   {
//     id: 3,
//     name: "Marketing Director",
//     icon: "assets/imgs/theme/icons/marketing-director.svg",
//     vacancies: 145,
//     delay: ".2s",
//   },
//   {
//     id: 4,
//     name: "System Analyst",
//     icon: "assets/imgs/theme/icons/system-analyst.svg",
//     vacancies: 236,
//     delay: ".3s",
//   },
//   {
//     id: 5,
//     name: "Digital Designer",
//     icon: "assets/imgs/theme/icons/business-development.svg",
//     vacancies: 56,
//     delay: "0s",
//   },
//   {
//     id: 6,
//     name: "Market Research",
//     icon: "assets/imgs/theme/icons/proof-reading.svg",
//     vacancies: 168,
//     delay: ".1s",
//   },
//   {
//     id: 7,
//     name: "Human Resource",
//     icon: "assets/imgs/theme/icons/testing.svg",
//     vacancies: 628,
//     delay: ".2s",
//   },
// ];

// const Categories = () => {
//   return (
//     <section className='section-box'>
//         <div className='container'>
//     <div className="row mt-70">
//       {categories.map((category) => (
//         <div
//           key={category.id}
//           className={`col-lg-3 col-md-6 col-sm-12 col-12 wow animate__animated animate__fadeInUp`}
//           data-wow-delay={category.delay}
//         >
//           <div className="card-grid hover-up">
//             <div className="text-center">
//               <Link to="/JobList">
//                 <figure>
//                   <img alt="jobhub" src={category.icon} />
//                 </figure>
//               </Link>
//             </div>
//             <h5 className="text-center mt-20 card-heading">
//               <Link to="/JobList">{category.name}</Link>
//             </h5>
//             <p className="text-center text-stroke-40 mt-20">
//               {category.vacancies} Available Vacancy
//             </p>
//           </div>
//         </div>
//       ))}

//       <div className="col-lg-3 col-md-6 col-sm-12 col-12 wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
//         <div className="card-grid hover-up">
//           <div className="text-center mt-15">
//             <h3>18,265+</h3>
//           </div>
//           <p className="text-center mt-30 text-stroke-40">
//             Jobs are waiting for you
//           </p>
//           <div className="text-center mt-30">
//             <div className="box-button-shadow">
//               <Link to="/JobList" className="btn btn-default">
//                 Explore more
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//     </section>
//   );
// };

// export default Categories;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

const categories = [
  {
    id: 1,
    name: "Marketing & Communication",
    icon: "assets/imgs/theme/icons/marketing.svg",
    delay: "0s",
  },
  {
    id: 2,
    name: "Content Writer",
    icon: "assets/imgs/theme/icons/content-writer.svg",
    delay: ".1s",
  },
  {
    id: 3,
    name: "Graphic Design",
    icon: "assets/imgs/theme/icons/marketing-director.svg",
    delay: ".2s",
  },
  {
    id: 4,
    name: "UI/UX Design",
    icon: "assets/imgs/theme/icons/system-analyst.svg",
    delay: ".3s",
  },
  {
    id: 5,
    name: "Web Development",
    icon: "assets/imgs/theme/icons/business-development.svg",
    delay: "0s",
  },
  {
    id: 6,
    name: "Data Science",
    icon: "assets/imgs/theme/icons/proof-reading.svg",
    delay: ".1s",
  },
  {
    id: 7,
    name: "Human Resource",
    icon: "assets/imgs/theme/icons/testing.svg",
    delay: ".2s",
  },
];

const Categories = () => {
  const [categoryCounts, setCategoryCounts] = useState({}); // State to store counts
  const [totalJobs, setTotalJobs] = useState(0); // State to store total job count

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        // Fetch category counts from backend
        const response = await axios.get("http://localhost:5000/api/v1/job/categories/count");

        // Transform response into a lookup object for category counts
        const counts = {};
        let total = 0; // Initialize total job count

        response.data.categories.forEach((item) => {
          counts[item.category] = item.count;
          total += item.count; // Accumulate total job count
        });

        setCategoryCounts(counts);
        setTotalJobs(total); // Set total jobs dynamically
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <section className="section-box">
      <div className="container">
        <div className="row mt-70">
          {categories.map((category) => (
            <div
              key={category.id}
              className="col-lg-3 col-md-6 col-sm-12 col-12 wow animate__animated animate__fadeInUp"
              data-wow-delay={category.delay}
            >
              <div className="card-grid hover-up">
                <div className="text-center">
                  <Link to="/JobList">
                    <figure>
                      <img alt="jobhub" src={category.icon} />
                    </figure>
                  </Link>
                </div>
                <h5 className="text-center mt-20 card-heading">
                  <Link to="/JobList">{category.name}</Link>
                </h5>
                <p className="text-center text-stroke-40 mt-20">
                  {categoryCounts[category.name] || 0} Available Vacancy
                </p>
              </div>
            </div>
          ))}

          {/* Total Jobs Component */}
          <div
            className="col-lg-3 col-md-6 col-sm-12 col-12 wow animate__animated animate__fadeInUp"
            data-wow-delay=".3s"
          >
            <div className="card-grid hover-up">
              <div className="text-center mt-15">
                <h3>{totalJobs.toLocaleString()}+</h3> {/* Dynamic total job count */}
              </div>
              <p className="text-center mt-30 text-stroke-40">
                Jobs are waiting for you
              </p>
              <div className="text-center mt-30">
                <div className="box-button-shadow">
                  <Link to="/JobList" className="btn btn-default">
                    Explore more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
