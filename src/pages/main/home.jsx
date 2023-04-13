import CategoryBrowser from "../../components/main/categoryBrowser";

function Home() {
  return (
    <div className="main">
      <div className="overlay"></div>
      <section className="content content-wrapper">
        <CategoryBrowser />
      </section>
    </div>
  );
}

export default Home;
