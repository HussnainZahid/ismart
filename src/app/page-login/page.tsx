
import LoginContent from './LoginContent';

export const metadata = {
  title: 'ISmart Login - Access Your Refurbished Mobile Account',
  description: 'Log in to your ISmart account to manage your refurbished mobile orders and access support.',
};

export default function Page() {
  return (
    
      <div className="min-h-screen flex items-center justify-center">
        <LoginContent />
      </div>
    
  );
}