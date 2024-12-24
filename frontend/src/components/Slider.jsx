import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <div className="section-box wow animate__animated animate__fadeIn mt-70">
      <div className="container">
        <div className="box-swiper">
        <div className="swiper-wrapper pb-70 pt-5">
        <div className="swiper-slide hover-up">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={30}
            slidesPerView={5}
            loop={true}
            className="swiper-container swiper-group-6"
            breakpoints={{
              1200: { slidesPerView: 5 }, // Desktop (large screens)
              1024: { slidesPerView: 4 }, // Tablets landscape
              768: { slidesPerView: 3 },  // Tablets portrait
              480: { slidesPerView: 2 },  // Small devices
              0: { slidesPerView: 1 },    // Mobile devices (extra small)
            }}
          >
            <SwiperSlide>            
              <div className="item-logo">
                <a href="https://www.bigbasket.com/">
                  <img alt="bigbasket" src="assets/imgs/slider/logo/1.png" />
                </a>
             
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.247.ai/">
                  <img alt="[24]7.ai" src="assets/imgs/slider/logo/2.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.isonxperiences.com/">
                  <img alt="ison" src="assets/imgs/slider/logo/3.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://moneyview.in/">
                  <img alt="moneyview" src="assets/imgs/slider/logo/4.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://navi.com/">
                  <img alt="navi" src="assets/imgs/slider/logo/5.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.firstsource.com/">
                  <img alt="firstsource" src="assets/imgs/slider/logo/6.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.shaadi.com/">
                  <img alt="shaadi" src="assets/imgs/slider/logo/7.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.medibuddy.in/">
                  <img alt="meddibuddy" src="assets/imgs/slider/logo/8.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://taurusbpo.com/">
                  <img alt="taurus" src="assets/imgs/slider/logo/9.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://athenabpo.com/">
                  <img alt="athena" src="assets/imgs/slider/logo/10.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.expertcallers.com/">
                  <img alt="ecpl" src="assets/imgs/slider/logo/11.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.kreditbee.in/">
                  <img alt="kreditbee" src="assets/imgs/slider/logo/12.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.teleperformance.com/">
                  <img alt="teleperformance" src="assets/imgs/slider/logo/13.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.alorica.com/">
                  <img alt="alorica" src="assets/imgs/slider/logo/14.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.airtel.in/">
                  <img alt="airtel" src="assets/imgs/slider/logo/15.png" />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item-logo">
                <a href="https://www.altruistindia.com/">
                  <img alt="altruist" src="assets/imgs/slider/logo/16.png" />
                </a>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Left and Right Navigation Buttons */}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
