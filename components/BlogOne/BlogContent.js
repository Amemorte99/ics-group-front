import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Données des articles (à terme, à charger depuis une API ou CMS)
const blogPosts = [
  {
    id: 1,
    image: '/images/blog/blog1.jpg',
    title: 'The security risks of changing package owners',
    date: 'December 15, 2019',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  },
  {
    id: 2,
    image: '/images/blog/blog2.jpg',
    title: 'Tips for protecting business and Family',
    date: 'December 16, 2019',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  },
  {
    id: 3,
    image: '/images/blog/blog3.jpg',
    title: 'Protect Your workplace from cyber attacks',
    date: 'December 16, 2019',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  },
  {
    id: 4,
    image: '/images/blog/blog4.jpg',
    title: 'Business debit Fees to increase in 2019',
    date: 'December 17, 2019',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  },
  {
    id: 5,
    image: '/images/blog/blog5.jpg',
    title: '10 tips to reduce your card processing costs',
    date: 'December 18, 2019',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  },
  {
    id: 6,
    image: '/images/blog/blog6.jpg',
    title: 'PayPal here card reader review 2019',
    date: 'December 19, 2019',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  },
];

const BlogContent = () => {
  return (
    <section className="blog-area ptb-70">
      <div className="container">
        <div className="row">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6">
              <div className="single-blog-post">
                <div className="blog-image">
                  <Link href={`/blog/${post.id}`}>
                    <a>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={500}
                        className="img-fluid"
                      />
                    </a>
                  </Link>
                </div>

                <div className="blog-post-content">
                  <ul className="entry-meta">
                    <li>
                      <i className="far fa-user"></i>
                      <span>Admin</span>
                    </li>
                    <li>
                      <i className="far fa-calendar"></i>
                      {post.date}
                    </li>
                  </ul>
                  <h3>
                    <Link href={`/blog/${post.id}`}>
                      <a>{post.title}</a>
                    </Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`}>
                    <a className="btn btn-primary">Lire plus</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="col-lg-12 col-md-12">
            <div className="pagination-area">
              <a href="#" className="prev page-numbers">
                <i className="fas fa-angle-double-left"></i>
              </a>
              <a href="#" className="page-numbers">1</a>
              <span className="page-numbers current">2</span>
              <a href="#" className="page-numbers">3</a>
              <a href="#" className="page-numbers">4</a>
              <a href="#" className="next page-numbers">
                <i className="fas fa-angle-double-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;