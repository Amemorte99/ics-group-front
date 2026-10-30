// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Les outils de mesure ne sont chargés que si leur identifiant est défini dans l'environnement.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export default class MyDocument extends Document {
  render() {
    const locale = this.props.locale || 'fr';
    return (
      <Html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Head>
          <link rel="preconnect" href="https://api.icsolution.fr" />
          <link rel="preconnect" href="https://res.cloudinary.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {locale === 'ar' && (
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
          )}
          <link rel="dns-prefetch" href="//api.icsolution.fr" />
          <link rel="dns-prefetch" href="//res.cloudinary.com" />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="referrer" content="strict-origin-when-cross-origin" />

          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#1B5E20" />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

          {GSC_VERIFICATION && <meta name="google-site-verification" content={GSC_VERIFICATION} />}

          {GA_ID && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
                }}
              />
            </>
          )}
          {GTM_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
          )}
          {CLARITY_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
              }}
            />
          )}
        </Head>

        <body>
          {GTM_ID && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
