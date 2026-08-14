// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* ============================================
              PRÉCONNEXION - Performance SEO
              ============================================ */}
          <link rel="preconnect" href="https://api.icsolution.fr" />
          <link rel="preconnect" href="https://res.cloudinary.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />

          {/* ============================================
              DNS PREFETCH - Performance
              ============================================ */}
          <link rel="dns-prefetch" href="//api.icsolution.fr" />
          <link rel="dns-prefetch" href="//res.cloudinary.com" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />

          {/* ============================================
              SÉCURITÉ - Trust SEO
              ============================================ */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="referrer" content="strict-origin-when-cross-origin" />

          {/* ============================================
              FAVICON - Branding
              ============================================ */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          {/* ============================================
              MANIFEST - PWA (optionnel)
              ============================================ */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#1B5E20" />

          {/* ============================================
              GOOGLE ANALYTICS 4
              ============================================ */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
            strategy="afterInteractive"
          />
          <script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
            strategy="afterInteractive"
          />

          {/* ============================================
              GOOGLE TAG MANAGER (head)
              ============================================ */}
          <script
            id="gtm-script"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];
                  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;
                  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXXXXX');
              `,
            }}
            strategy="afterInteractive"
          />

          {/* ============================================
              MICROSOFT CLARITY - Heatmaps (optionnel)
              ============================================ */}
          <script
            id="clarity-script"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
              `,
            }}
            strategy="afterInteractive"
          />

          {/* ============================================
              SITEMAP - Découverte automatique
              ============================================ */}
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

          {/* ============================================
              ALTERNATES - Multilingue
              ============================================ */}
          <link rel="alternate" href="https://icsolution.fr" hrefLang="fr" />
          <link rel="alternate" href="https://icsolution.fr/en" hrefLang="en" />
          <link rel="alternate" href="https://icsolution.fr" hrefLang="x-default" />

          {/* ============================================
              VERIFICATION - Google Search Console
              ============================================ */}
          <meta name="google-site-verification" content="VOTRE_CODE_VERIFICATION" />
        </Head>

        <body>
          {/* ============================================
              GOOGLE TAG MANAGER (body)
              ============================================ */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}