import LegalPage from '../components/Layouts/LegalPage';
import { terms } from '../data/legal';

const TermsCondition = () => (
  <LegalPage
    path="/terms-condition"
    title={{ fr: "Conditions d'utilisation", en: 'Terms of use', ar: 'شروط الاستخدام' }}
    caption={{ fr: 'Les règles d’utilisation du site ICS GROUPE', en: 'The rules for using the ICS GROUPE website', ar: 'قواعد استخدام موقع ICS GROUPE' }}
    content={terms}
  />
);

export default TermsCondition;
