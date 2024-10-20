import Navbar from "@/components/Navbar";
import HeroImage from "@/assets/HeroImage.webp";
import { Button, Link } from "@nextui-org/react";

const Root = () => {
  return (
    <section className="lg:h-[100dvh]">
      <Navbar />
      <div className="relative flex flex-col items-center h-full max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8 lg:h-[calc(100dvh-73px)] mt-auto">
        <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
          <div className="text-left">
            <h2 className="text-2xl font-extrabold leading-10 tracking-tight text-gray-800 sm:text-3xl sm:leading-none md:text-4xl lg:text-5xl">
              Transform Long Links into Tiny, Powerful Connections!
            </h2>
            <p className="max-w-md mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              With Tinylink, shorten, share, and track your URLs
              seamlessly—simplify your online experience.
            </p>
            <div className="mt-3 sm:flex md:mt-5">
              <Button
                size="lg"
                color="primary"
                radius="sm"
                href="register"
                as={Link}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center py-5 md:w-1/2 md:pb-10 md:pt-10 md:pl-10">
          <div className="relative w-full p-3 rounded  md:p-8">
            <img src={HeroImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Root;
