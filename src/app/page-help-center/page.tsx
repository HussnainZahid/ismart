import Layout from '@/components/layout/layout';
import HelpContent from './HelpContent';

export const metadata = {
  title: 'ISmart Help Center - Mobile Support',
  description: 'Get support for your refurbished mobile devices at ISmart.',
};

export default function HelpCenterPage() {
  return (
    <Layout breadcrumbTitle="Help Centre">
      <HelpContent />
    </Layout>
  );
}