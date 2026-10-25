import BubbleBackground from "./components/BubbleBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Bio from "./components/Bio";
import Interests from "./components/Interests";
import Tools from "./components/Tools";

function App() {
  return (
    <BubbleBackground>
      <Header />
      <main>
        <Hero />
        <Bio />
        <Interests />
        <Tools />
      </main>
    </BubbleBackground>
  );
}

export default App;
