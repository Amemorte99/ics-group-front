// components/Common/CustomersFeedback.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CustomersFeedback = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jean Dupont',
      position: 'CEO, TechCorp',
      content: 'ICS GROUPE a transformé notre infrastructure digitale. Leur expertise en cybersécurité nous a permis de protéger efficacement nos données.',
      image: '/images/author1.jpg',
    },
    {
      id: 2,
      name: 'Marie Kamga',
      position: 'Directrice, EnergyPlus',
      content: 'Grâce à ICS GROUPE, nous avons pu optimiser notre consommation énergétique avec des solutions solaires innovantes. Un partenaire de confiance.',
      image: '/images/author2.jpg',
    },
    {
      id: 3,
      name: 'Pierre Mbala',
      position: 'CTO, WebSolutions',
      content: 'La qualité des développements web réalisés par ICS GROUPE est exceptionnelle. Leur équipe est réactive et professionnelle.',
      image: '/images/author3.jpg',
    },
  ];

  return (
    <section className="customers-feedback">
      <div className="container">
        <div className="section-header">
          <h2>Ce que nos clients disent</h2>
          <p>Des retours authentiques de nos partenaires</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="feedback-carousel"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="feedback-item">
                <div className="feedback-content">
                  <div className="feedback-quote">
                    <span className="quote-icon">"</span>
                    <p>{item.content}</p>
                  </div>
                  <div className="feedback-author">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="author-image" 
                      />
                    )}
                    <div className="author-info">
                      <h4>{item.name}</h4>
                      <span>{item.position}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .customers-feedback {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e8f5e9 100%);
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
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

        .feedback-item {
          max-width: 700px;
          margin: 0 auto;
        }

        .feedback-content {
          background: #fff;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .feedback-quote {
          position: relative;
          padding: 10px 0 20px;
        }

        .quote-icon {
          font-size: 40px;
          color: #1B5E20;
          opacity: 0.15;
          line-height: 1;
          display: block;
          margin-bottom: 8px;
        }

        .feedback-quote p {
          font-size: 18px;
          line-height: 1.8;
          color: #1a1a2e;
          font-style: italic;
          margin: 0;
        }

        .feedback-author {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eef0f2;
        }

        .author-image {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-info h4 {
          font-size: 16px;
          font-weight: 600;
          color: #0A0A2E;
          margin: 0 0 2px 0;
        }

        .author-info span {
          font-size: 14px;
          color: #8c8f9c;
        }

        @media (max-width: 640px) {
          .customers-feedback {
            padding: 50px 0;
          }

          .feedback-content {
            padding: 24px;
          }

          .feedback-quote p {
            font-size: 16px;
          }

          .section-header h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default CustomersFeedback;