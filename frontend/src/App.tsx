import BubbleBackground from "./components/BubbleBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Bio from "./components/Bio";
import Interests from "./components/Interests";

function App() {
  return (
    <BubbleBackground>
      <Header />
      <main>
        <Hero />
        <Bio />
        <Interests />
      </main>
    </BubbleBackground>
  );
}

export default App;
