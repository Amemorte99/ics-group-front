import LegalPage from '../components/Layouts/LegalPage';
import { privacy } from '../data/legal';

const PrivacyPolicy = () => (
  <LegalPage
    path="/privacy-policy"
    title={{ fr: 'Politique de confidentialité', en: 'Privacy policy', ar: 'سياسة الخصوصية' }}
    caption={{ fr: 'Comment nous protégeons vos données personnelles', en: 'How we protect your personal data', ar: 'كيف نحمي بياناتكم الشخصية' }}
    content={privacy}
  />
);

export default PrivacyPolicy;
