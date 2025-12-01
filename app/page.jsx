// components
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import Image from "next/image";

const Home = () => {
  return (
    <section className="h-full flex items-center">
      <div className="container mx-auto max-w-6xl px-6 xl:px-12 py-24">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
          {/* text */}
          <div className="text-left order-2 xl:order-none max-w-2xl">
            <span className="text-sm opacity-60 font-light tracking-wide uppercase">
              Software Developer
            </span>
            <h2 className="text-4xl xl:text-5xl font-light mt-4 mb-6 leading-tight">
              Kyle Ming Zhang
            </h2>
            <p className="text-base mb-6 opacity-70 leading-relaxed">
              Hi! Welcome! I love learning, creating, and collaborating. I have
              a passion for integrating generative AI with applications in hopes
              of creating a meaningful impact on the world.
            </p>
            <p className="text-sm opacity-60">
              Feel free to connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/kyle-zhang-3a6551194/"
                className="underline hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                LinkedIn
              </a>{" "}
              or through email at{" "}
              <a
                href="mailto:kylemzhang@gmail.com"
                className="underline hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                kylemzhang@gmail.com
              </a>
              .
            </p>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none">
            <Photo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
