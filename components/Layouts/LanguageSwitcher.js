import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LOCALES, LOCALE_META, useI18n } from '../../lib/i18n';

// Bascule vers la même page dans une autre langue (/en/..., /ar/..., ou la racine pour le français).
export default function LanguageSwitcher() {
    const router = useRouter();
    const { locale, t } = useI18n();

    return (
        <ul className="lang-switcher" aria-label={t('nav.language')}>
            {LOCALES.map((code) => (
                <li key={code}>
                    <Link href={router.asPath} locale={code} scroll={false}>
                        <a
                            className={code === locale ? 'active' : ''}
                            hrefLang={code}
                            lang={code}
                            aria-current={code === locale ? 'true' : undefined}
                            title={LOCALE_META[code].label}
                        >
                            {LOCALE_META[code].short}
                        </a>
                    </Link>
                </li>
            ))}

            <style jsx>{`
                .lang-switcher {
                    display: inline-flex;
                    align-items: center;
                    gap: 2px;
                    list-style: none;
                    margin: 0;
                    padding: 3px;
                    border: 1px solid rgba(27, 94, 32, 0.2);
                    border-radius: 50px;
                    background: #fff;
                }
                .lang-switcher a {
                    display: block;
                    min-width: 34px;
                    padding: 5px 10px;
                    border-radius: 50px;
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 1.2;
                    text-align: center;
                    color: #4a4d5e;
                    text-decoration: none;
                }
                .lang-switcher a:hover {
                    color: #1b5e20;
                }
                .lang-switcher a.active {
                    background: #1b5e20;
                    color: #fff;
                }
            `}</style>
        </ul>
    );
}
