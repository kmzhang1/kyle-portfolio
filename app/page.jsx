// components
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import Image from "next/image";

const Home = () => {
  return (
    <section className="h-full">
      <header
        className="w-full h-[200px] bg-cover bg-center"
        style={{ backgroundImage: `url(${"./assets/banner.png"})` }}
      ></header>
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span>hello i'm software developer</span>
            <h2 className="h2">
              <span className="text-accent">Kyle Ming Zhang</span>
            </h2>
            <p className="max-w-[500px] mb-9 mt-6 text-white/80">
              i love learning, creating, and collaborating. i have a passion for
              making meaningful applications by integrating generative ai in
              hopes of a positive impact on the world.
            </p>
            <p>
              feel free to connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/kyle-zhang-3a6551194/"
                className="text-accent"
              >
                linkedin
              </a>{" "}
              or through my email at{" "}
              <a href="mailto:kylemzhang@gmail.com" className="text-accent">
                kylemzhang@gmail.com
              </a>
              .
            </p>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0 mt-8">
            <Photo />
          </div>
        </div>
      </div>
      {/* <Stats /> */}
    </section>
  );
};

export default Home;
