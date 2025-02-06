import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-screen mt-20">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Image src="/img/hero1.png" alt="Logo" width={1500} height={900} />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/hero2.png" alt="Logo" width={1500} height={900} />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/hero3.png" alt="Logo" width={1500} height={900} />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Hero;
