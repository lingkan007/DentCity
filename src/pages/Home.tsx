import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import AboutDoctor from '../sections/AboutDoctor';
import TrustSection from '../sections/TrustSection';
import ClinicHours from '../sections/ClinicHours';
import Testimonials from '../sections/Testimonials';
import Gallery from '../sections/Gallery';
import FAQ from '../sections/FAQ';
import Footer from '../sections/Footer';
import FloatingButtons from '../sections/FloatingButtons';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <Services />
      <AboutDoctor />
      <TrustSection />
      <ClinicHours />
      <Testimonials />
      <Gallery />
      <FAQ />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
