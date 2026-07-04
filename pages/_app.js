import '../public/css/bootstrap.min.css';
import '../public/css/fontawesome.min.css';
import 'animate.css';
import '../public/css/flaticon.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import '../public/css/style.css';
import '../public/css/responsive.css';

import App from 'next/app';
import Head from 'next/head';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Layouts/Loader';
import GoTop from '../components/Layouts/GoTop';

// Version avec gestion des erreurs et performances optimisées
export default function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const timerRef = useRef(null);
    const router = useRouter();

    // Gestion du chargement
    useEffect(() => {
        // Démarrer le timer de chargement
        timerRef.current = setTimeout(() => {
            setLoading(false);
        }, 800); // Réduit à 800ms pour meilleure UX

        // Vérifier si la page est déjà chargée
        if (document.readyState === 'complete') {
            setLoading(false);
            clearTimeout(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    // Gestion des erreurs de route
    useEffect(() => {
        const handleRouteError = (err) => {
            console.error('Route error:', err);
            setError(err);
            setLoading(false);
        };

        router.events.on('routeChangeError', handleRouteError);
        router.events.on('routeChangeStart', () => setLoading(true));
        router.events.on('routeChangeComplete', () => setLoading(false));

        return () => {
            router.events.off('routeChangeError', handleRouteError);
            router.events.off('routeChangeStart', () => setLoading(true));
            router.events.off('routeChangeComplete', () => setLoading(false));
        };
    }, [router]);

    // Gestionnaire d'erreurs global
    const handleError = useCallback((error) => {
        console.error('Application error:', error);
        setError(error);
        setLoading(false);
    }, []);

    // Si erreur, afficher une page d'erreur simple
    if (error) {
        return (
            <>
                <Head>
                    <title>Erreur - ICS GROUPE</title>
                </Head>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',
                    flexDirection: 'column',
                    padding: '20px'
                }}>
                    <h1>Une erreur est survenue</h1>
                    <p>Nous nous excusons pour la gêne occasionnée.</p>
                    <button 
                        onClick={() => {
                            setError(null);
                            window.location.reload();
                        }}
                        style={{
                            padding: '10px 20px',
                            background: '#2D9CDB',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Réessayer
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>ICS GROUPE - Transformation Digitale, Cybersécurité &amp; Énergies Renouvelables</title>
                <meta name="description" content="ICS GROUPE accompagne les entreprises dans leurs projets de transformation digitale, cybersécurité, énergies renouvelables et télécommunications." />
                <meta name="theme-color" content="#2D9CDB" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta property="og:title" content="ICS GROUPE - Transformation Digitale &amp; Cybersécurité" />
                <meta property="og:description" content="Solutions innovantes en cybersécurité, énergies renouvelables et télécoms." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.icsgroupe.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>

            <Component {...pageProps} />
            
            <Loader 
                loading={loading} 
                role={loading ? "status" : "presentation"}
                aria-label={loading ? "Chargement en cours..." : undefined}
            />

            <GoTop 
                scrollStepInPx={50} 
                delayInMs={16.66}
                aria-label="Retour en haut de la page"
                threshold={300}
            />
        </>
    );
}

// Configuration pour optimisations
MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps,
        // Propriétés personnalisées
    };
};