import "./App.css";
import WaterDropHero from "./components/hero/index.jsx";
import Example from "./components/projects section/index.jsx";
function App() {
  return (
    <>
      <section className="hero">
        <WaterDropHero />
      </section>
      <section className="scroll">
        <Example />
      </section>
    </>
  );
}

export default App;
