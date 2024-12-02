'use client';

import type { AppProps } from 'next/app'
import AssayPlatesApp from '@/containers/AssayPlates.tsx';

/**
 * Index page
 */

function Page(p: AppProps) {

  return (
    <AssayPlatesApp />
  );
}

export default Page;
