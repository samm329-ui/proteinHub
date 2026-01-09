import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProteinZone Scroll',
  description: 'A premium scroll-driven animation experience for Protein Zone.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}