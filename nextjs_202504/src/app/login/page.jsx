import { useTranslations } from 'next-intl';
export default function Dashboard() {
  const t = useTranslations('Route');
  return (
    <h1>
      {t('dashboard')}
    </h1>
  );
}
