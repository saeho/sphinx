import './globals.css'

/**
 * Types
 */

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * Meta data
 */

export const metadata = {
  title: 'jslee.bruno@gmail.com',
  description: 'Engineering Take Home Project',
};

/**
 * Layout; root
 */

async function RootLayout(p: LayoutProps) {
  const { children } = p;

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
