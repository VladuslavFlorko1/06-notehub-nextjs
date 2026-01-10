import './globals.css';
import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Notes application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>

        <div id="root"></div>
      </body>
    </html>
  );
}

