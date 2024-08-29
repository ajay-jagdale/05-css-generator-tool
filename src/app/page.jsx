'use client';

import Header from '@/components/Header';
import ShadowGenerator from '@/components/ShadowGenerator';
import GlassmorphismGenerator from '@/components/GlassmorphismGenerator';
import GradientGenerator from '@/components/GradientGenerator';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <ShadowGenerator />
      <GlassmorphismGenerator />
      <GradientGenerator />
      <Footer />
    </>
  );
}
