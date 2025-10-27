import Layout from '@/components/layout/layout';
import LoginContent from './LoginContent';

export const metadata = {
  title: 'ISmart Login - Access Your Refurbished Mobile Account',
  description: 'Log in to your ISmart account to manage your refurbished mobile orders and access support.',
};

export default function Page() {
  return (
    <Layout breadcrumbTitle="Login">
      <div className="min-h-screen flex items-center justify-center">
        <LoginContent />
      </div>
    </Layout>
  );
}