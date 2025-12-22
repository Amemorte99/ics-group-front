import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';

// Données des articles (tous complets et cohérents)
const blogPosts = {
  1: {
    id: '1',
    title: 'Les risques de sécurité liés au changement de propriétaire de package',
    date: '15 Décembre 2019',
    author: 'Admin',
    readTime: '6 min de lecture',
    image: '/images/blog/blog1.jpg',
    tags: ['Sécurité', 'NPM', 'Supply Chain'],
    content: `
      <p>Le transfert de propriété d'un package populaire sur npm, PyPI ou autre registre peut représenter un risque majeur de sécurité.</p>
      <p>De nombreux cas récents ont montré que des comptes de mainteneurs historiques pouvaient être récupérés par des acteurs malveillants.</p>
      
      <h2>Exemples concrets de compromission</h2>
      <p>En 2018, le package <code>event-stream</code> a été compromis après le transfert de propriété, touchant des millions de projets Node.js.</p>
      
      <blockquote>
        <p>La confiance aveugle en un package tiers est l'une des plus grandes vulnérabilités modernes.</p>
      </blockquote>
      
      <h2>Comment se protéger ?</h2>
      <ul>
        <li>Vérifiez toujours l'historique des mainteneurs sur GitHub</li>
        <li>Utilisez <code>npm audit</code> et <code>yarn audit</code> systématiquement</li>
        <li>Activez GitHub Dependabot pour les alertes automatiques</li>
        <li>Préférez les packages avec une activité récente</li>
      </ul>
      
      <p>La vigilance reste la meilleure arme contre les attaques par la chaîne d’approvisionnement.</p>
    `,
  },
  2: {
    id: '2',
    title: 'Conseils pratiques pour protéger votre entreprise et votre famille',
    date: '16 Décembre 2019',
    author: 'Admin',
    readTime: '8 min de lecture',
    image: '/images/blog/blog2.jpg',
    tags: ['Cybersécurité', 'Protection familiale', 'Bonnes pratiques'],
    content: `
      <p>La cybersécurité n’est plus réservée aux grandes entreprises. Chaque famille et chaque entrepreneur est aujourd’hui une cible potentielle.</p>
      
      <h2>1. Des mots de passe inébranlables</h2>
      <p>Utilisez un gestionnaire de mots de passe (<strong>Bitwarden</strong> gratuit recommandé ou <strong>1Password</strong>).</p>
      
      <h2>2. Authentification à deux facteurs (2FA)</h2>
      <p>Activez-la partout : banque, email, réseaux sociaux. Préférez une application aux SMS.</p>
      
      <h2>3. La sensibilisation : votre meilleur bouclier</h2>
      <p>Formez vos proches et collaborateurs aux techniques de phishing.</p>
      
      <blockquote>
        <p>90 % des cyberattaques réussies exploitent une erreur humaine.</p>
      </blockquote>
      
      <h2>4. Sauvegardes : appliquez la règle 3-2-1</h2>
      <p>3 copies de vos données, sur 2 supports différents, dont 1 hors site.</p>
      
      <p>Avec ces réflexes simples mais rigoureux, vous réduisez drastiquement votre exposition aux risques.</p>
    `,
  },
  3: {
    id: '3',
    title: 'Protégez votre lieu de travail contre les cyberattaques',
    date: '16 Décembre 2019',
    author: 'Admin',
    readTime: '5 min de lecture',
    image: '/images/blog/blog3.jpg',
    tags: ['Cybersécurité', 'Entreprise', 'Prévention'],
    content: `<p>Les entreprises sont des cibles privilégiées. Découvrez comment renforcer vos défenses au quotidien...</p>`,
  },
  4: {
    id: '4',
    title: 'Hausse des frais de débit professionnel en 2019',
    date: '17 Décembre 2019',
    author: 'Admin',
    readTime: '4 min de lecture',
    image: '/images/blog/blog4.jpg',
    tags: ['Finance', 'Entreprise', 'Paiements'],
    content: `<p>Analyse détaillée de l'évolution des tarifs bancaires pour les professionnels...</p>`,
  },
  5: {
    id: '5',
    title: '10 astuces pour réduire vos frais de traitement de cartes',
    date: '18 Décembre 2019',
    author: 'Admin',
    readTime: '7 min de lecture',
    image: '/images/blog/blog5.jpg',
    tags: ['Paiements', 'Économies', 'Conseils'],
    content: `<p>Guide pratique pour optimiser vos coûts de transaction bancaire...</p>`,
  },
  6: {
    id: '6',
    title: 'Test du lecteur de carte PayPal Here (2019)',
    date: '19 Décembre 2019',
    author: 'Admin',
    readTime: '6 min de lecture',
    image: '/images/blog/blog6.jpg',
    tags: ['Paiements mobiles', 'Review', 'TPE'],
    content: `<p>Test complet et avis détaillé sur le lecteur de carte mobile PayPal Here...</p>`,
  },
};

const SingleBlogPage = ({ post }) => {
  if (!post) {
    return (
      <>
        <Head>
          <title>Article non trouvé | Blog</title>
        </Head>
        <Navbar />
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-4">Article non trouvé</h1>
            <p className="lead text-muted mb-5">Désolé, l'article demandé n'existe pas ou a été supprimé.</p>
            <Link href="/blog">
              <a className="btn btn-primary btn-lg px-5 py-3 rounded-pill">Retour au blog</a>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...'} />
        <meta property="og:image" content={`/images/blog/blog${post.id}.jpg`} />
        <meta property="og:type" content="article" />
      </Head>

      <Navbar />

      {/* Hero – CORRIGÉ POUR TOUTES LES VERSIONS NEXT.JS */}
      <div className="position-relative" style={{ height: '70vh', minHeight: '500px' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          layout="fill"           // ← Indispensable pour Next.js 12
          objectFit="cover"       // ← Remplace className object-fit-cover
          priority
          style={{ opacity: '0.65' }}
        />
        {/* Overlay gradient */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%)',
          }}
        />

        {/* Texte du hero */}
        <div className="container h-100 position-relative d-flex align-items-center">
          <div className="row justify-content-center w-100">
            <div className="col-lg-10 col-xl-8 text-center text-white">
              <p className="small text-white-50 mb-3 opacity-90">
                {post.date} • {post.readTime}
              </p>
              <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: '1.2' }}>
                {post.title}
              </h1>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '48px', height: '48px' }}
                  >
                    <i className="far fa-user fa-lg text-white"></i>
                  </div>
                  <span className="fw-semibold fs-5">{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <section className="py-5 py-lg-7 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-5 d-flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge bg-primary text-white px-4 py-2 rounded-pill fw-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Article */}
              <article
                className="blog-content"
                style={{
                  fontSize: '1.15rem',
                  lineHeight: '1.85',
                  color: '#212529',
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <hr className="my-7 border-secondary opacity-25" />

              {/* Boutons retour + partage */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
                <Link href="/blog">
                  <a className="btn btn-outline-primary btn-lg rounded-pill px-5 py-3">
                    ← Tous les articles
                  </a>
                </Link>

                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted small">Partager :</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://ton-site.com/blog/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary rounded-circle p-3"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://ton-site.com/blog/${post.id}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary rounded-circle p-3"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=https://ton-site.com/blog/${post.id}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary rounded-circle p-3"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export async function getStaticProps({ params }) {
  const post = blogPosts[params.id] || null;

  return {
    props: {
      post,
    },
    notFound: !post,
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.values(blogPosts).map((post) => ({
      params: { id: post.id },
    })),
    fallback: false,
  };
}

export default SingleBlogPage;