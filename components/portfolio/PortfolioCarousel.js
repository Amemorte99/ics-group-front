// components/portfolio/PortfolioCarousel.js
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const PortfolioCarousel = ({ items, title }) => {
  return (
    <section className="carousel-section">
      <div className="container">
        <div className="section-header">
          <h2>{title || 'Nos réalisations'}</h2>
          <p>Découvrez une sélection de nos projets</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          className="portfolio-carousel"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="carousel-item">
                <div className="carousel-image">
                  <img 
                    src={item.image || '/images/placeholder.png'} 
                    alt={item.title} 
                  />
                </div>
                <div className="carousel-content">
                  <span className="carousel-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={`/portfolio/${item.slug}`} className="carousel-link">
                    Voir le projet →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .carousel-section {
          padding: 60px 0;
          background: #f8fafc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: #0A0A2E;
        }

        .section-header p {
          font-size: 16px;
          color: #6b7280;
        }

        .carousel-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .carousel-image {
          height: 400px;
          overflow: hidden;
        }

        .carousel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-content {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .carousel-category {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: #1B5E20;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .carousel-content h3 {
          font-size: 28px;
          font-weight: 700;
          color: #0A0A2E;
          margin-bottom: 12px;
        }

        .carousel-content p {
          font-size: 16px;
          color: #4a4d5e;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .carousel-link {
          font-size: 16px;
          font-weight: 600;
          color: #1B5E20;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .carousel-link:hover {
          color: #4CAF50;
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .carousel-item {
            grid-template-columns: 1fr;
            border-radius: 16px;
          }

          .carousel-image {
            height: 250px;
          }

          .carousel-content {
            padding: 24px;
          }

          .carousel-content h3 {
            font-size: 22px;
          }
        }
      `}</style>
    </section>
  );
};

export default PortfolioCarousel;