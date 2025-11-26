import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className="w-full border-t transition-colors duration-300"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="w-full h-40 relative overflow-hidden opacity-100">
        <Image
          src="/assets/banner.png"
          alt="Banner"
          fill
          className="object-contain"
          priority={false}
        />
      </div>
    </footer>
  );
};

export default Footer;
