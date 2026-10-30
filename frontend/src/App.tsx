import BubbleBackground from "./components/BubbleBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Bio from "./components/Bio";
import Interests from "./components/Interests";
import Tools from "./components/Tools";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";

function App() {
  return (
    <BubbleBackground>
      <Header />
      <main>
        <Hero />
        <Bio />
        <Interests />
        <Tools />
        <Certifications />
        <Projects />
      </main>
    </BubbleBackground>
  );
}

export default App;
