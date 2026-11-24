import { Navbar } from "./components/Navbar";
import { About } from "./home/About";
import { ClientVoices } from "./home/ClientVoices";
import { Contact } from "./home/Contact";
import { Footer } from "./home/Footer";
import { Hero } from "./home/Hero";
import { OurWorks } from "./home/OurWorks";
import { TheMethod } from "./home/TheMethod";
import { VideoGallery } from "./home/VideoGallery";

export default function HomePage() {
  return (
    <main id="top" className="relative scroll-smooth">
      <Navbar />

      <div id="hero">
        <Hero />
      </div>

      <div id="about" className="scroll-mt-28">
        <About />
      </div>

      <div id="works" className="scroll-mt-28">
        <OurWorks />
      </div>

      <div id="gallery" className="scroll-mt-28">
        <VideoGallery />
      </div>

      <div id="method" className="scroll-mt-28">
        <TheMethod />
      </div>

      <div id="voices" className="scroll-mt-28">
        <ClientVoices />
      </div>

      <div id="contact" className="scroll-mt-28">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
