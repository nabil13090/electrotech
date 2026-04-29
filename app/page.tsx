import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Certifications from "@/components/sections/Certifications";
import ClientsConfiance from "@/components/sections/ClientsConfiance";
import Illuminez from "@/components/sections/Illuminez";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Certifications />
      <Services />
      <About />
      <ClientsConfiance />
      <Illuminez />
      <Testimonials />
      <Stats />
      <CTA />
    </>
  );
}
