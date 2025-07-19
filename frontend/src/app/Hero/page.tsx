import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#FDF8F3] lg:py-20 py-32 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#9D6D7A] leading-tight mb-6">
            Find the Heart That Matches Yours 💖
          </h1>
          <p className="text-lg text-[#5f5f5f] mb-8 md:px-6 lg:px-0">
            Rhistaé is a modern matchmaker designed to bring soulmates together.
            Register now or explore heartfelt connections waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/register"
              className="bg-[#9D6D7A] text-white px-6 py-3 rounded-lg text-base hover:bg-[#854a5c] transition"
            >
              💍 Register for Rishta
            </Link>
            <Link
              href="/matchform"
              className="bg-white text-[#9D6D7A] border border-[#9D6D7A] px-6 py-3 rounded-lg hover:bg-[#f7e9ec] transition"
            >
              💘 Find a Rishta
            </Link>
          </div>
        </div>

        <div className="w-full mt-12 lg:mt-0">
          <Image
            src="/assets/images/Hero.jpg"
            alt="Happy Couple"
            width={600}
            height={0} 
            className="rounded-xl shadow-lg w-full object-cover max-h-[350px] lg:max-h-[390px]"
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
