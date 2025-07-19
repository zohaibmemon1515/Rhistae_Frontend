import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#FDF8F3] px-6 lg:py-20 py-32 text-[#2F2F2F]">
      <div className="max-w-7xl mx-auto flex flex-col md:items-center md:text-center lg:flex-row lg:items-start lg:text-left gap-10">
        <div className="w-full md:max-w-2xl lg:w-1/2 xl:pr-12 lg:pr-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#9D6D7A] mb-8 text-center lg:text-left">
            💞 About Rhistaé
          </h1>

          <p className="text-base leading-relaxed text-[#5f5f5f] mb-6">
            <strong className="text-[#9D6D7A]">Rhistaé</strong> is a heartfelt
            matchmaking platform built for today’s world — blending tradition
            with trust. We help individuals and families connect with genuine
            rishtas based on shared values and compatibility.
          </p>

          <p className="text-base text-[#5f5f5f] mb-4">
            Whether you&apos;re registering for yourself or a loved one, we&apos;ll guide
            you every step of the way.
          </p>

          <p className="text-sm italic text-[#9D6D7A] mb-6">
            “At Rhistaé, we don&apos;t just match people — we bring hearts together.”
          </p>

          <ul className="list-disc md:list-none md:text-center lg:list-disc lg:text-left ml-5 md:ml-0 text-[#5f5f5f] text-sm space-y-2 mb-8">
            <li>Genuine, verified rishtas</li>
            <li>Private and respectful environment</li>
            <li>For individuals and families alike</li>
            <li>Support from our caring team</li>
          </ul>

          <div className="border-t border-[#e0c7cc] max-w-[200px] mx-auto lg:mx-0 mb-4"></div>

          <p className="text-sm text-[#9D6D7A]">
            Trusted by families across Pakistan & beyond 🌍
          </p>
        </div>

        <div className="w-full md:max-w-2xl lg:w-1/2 mt-12 lg:mt-0">
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative w-full h-80">
              <Image
                src="/assets/images/Find-Rhista.jpg"
                alt="Find a Rishta"
                width={200}
                height={350}
                className="object-fill w-full h-[350px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDF8F3] to-transparent opacity-70"></div>
            </div>

            <div className="p-6 mt-6 text-left">
              <h2 className="text-xl font-semibold text-[#9D6D7A] mb-1">
                💘 Browse Rishtas
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Search for profiles that match your values. Save, shortlist, and
                connect with confidence.
              </p>
              <ul className="text-xs text-[#5f5f5f] font-semibold space-y-1 mb-4">
                <li>🔍 Filter by age, city, background</li>
                <li>📬 View interested matches</li>
                <li>🔐 Safe & private communication</li>
              </ul>
              <Link
                href="/matchform"
                className="inline-block bg-[#9D6D7A] text-white px-5 py-2.5 font-medium rounded-md hover:bg-[#854a5c] transition"
              >
                Start Exploring →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
