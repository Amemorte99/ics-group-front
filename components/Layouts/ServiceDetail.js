import React from 'react';
import { useRouter } from 'next/router';
import ServiceLayout from './ServiceLayout';
import { useI18n } from '../../lib/i18n';
import servicePages from '../../data/servicePages';

// **mot** -> <strong>mot</strong>
const rich = (text) =>
  String(text)
    .split('**')
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));

// Page de détail d'un service (contenu trilingue dans data/servicePages.js).
const ServiceDetail = ({ slug, title, caption }) => {
  const { tx, isRtl } = useI18n();
  const router = useRouter();
  const page = servicePages[slug];

  return (
    <ServiceLayout title={title} caption={caption}>
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>{tx(page.heading)}</h2>

            {page.lead && <p className="lead mb-4">{tx(page.lead)}</p>}

            {page.paragraphs.map((paragraph, i) => (
              <p key={i}>{rich(tx(paragraph))}</p>
            ))}

            <ul className="list-check">
              {page.items.map((item, i) => (
                <li key={i}>{rich(tx(item))}</li>
              ))}
            </ul>

            {page.closing && <p className="mt-4">{rich(tx(page.closing))}</p>}

            {page.quote && <p className="font-italic text-primary mt-4">{tx(page.quote)}</p>}
          </div>

          <div className="col-lg-6">
            <img src={page.image} alt={tx(page.alt)} className="img-fluid rounded shadow" loading="lazy" width="800" height="600" />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default ServiceDetail;
