// components/Common/CustomersFeedback.js
import React, { useState, useEffect } from 'react';
import { testimonialApi } from '../../utils/api';
import { useI18n } from '../../lib/i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CustomersFeedback = () => {
  const { tx } = useI18n();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    let cancelled = false;
    testimonialApi
      .getAll()
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setTestimonials(
          list.map((t) => ({
            id: t.id,
            name: t.clientName,
            position: [t.clientPosition, t.clientCompany].filter(Boolean).join(', '),
            content: t.content,
            image: t.photo || t.photoAlt,
          }))
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="customers-feedback">
      <div className="container">
        <div className="section-header">
          <h2>{tx({ fr: 'Ce que nos clients disent', en: 'What our clients say', ar: 'ماذا يقول عملاؤنا' })}</h2>
          <p>{tx({ fr: 'Les retours de ceux qui nous font confiance', en: 'Feedback from those who trust us', ar: 'آراء من وثقوا بنا' })}</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={testimonials.length > 1}
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