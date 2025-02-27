// components
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span>hello i'm software developer</span>
            <h2 className="h2">
              <span className="text-accent">Kyle Ming Zhang</span>
            </h2>
            <p className="max-w-[500px] mb-9 text-white/80">
              i love learning to create. i have a passion for making meaningful
              applications by integrating generative ai in hopes of a positive
              impact on the world.
            </p>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      {/* <Stats /> */}
    </section>
  );
};

export default Home;
