import BubbleBackground from "./components/BubbleBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Bio from "./components/Bio";

function App() {
  return (
    <BubbleBackground>
      <Header />
      <main>
        <Hero />
        <Bio />
      </main>
    </BubbleBackground>
  );
}

export default App;
