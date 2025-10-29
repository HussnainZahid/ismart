import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/layout/layout';

export const metadata: Metadata = {
  title: 'ISmart',
  description: 'Refurbished tech that\'s better for the planet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100" suppressHydrationWarning={true}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
