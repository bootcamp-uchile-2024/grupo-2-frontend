export const CarouselSection = () => {

  return (
    <div id="auto-play" data-carousel='{ "loadingClasses": "opacity-0", "dotsItemClasses": "carousel-dot", "isAutoPlay": true, "speed": 3000}' className="relative w-full">
      <div className="carousel h-[300px] overflow-hidden rounded-none">
        <div className="carousel-body opacity-0 h-full">
          <div className="carousel-slide">
            <img src="assets/baner-descubre.png" className="w-full h-[300px] md:h-auto object-cover" alt="" />
          </div>
          <div className="carousel-slide">
            <img src="assets/baner-disfruta.png" className="w-full h-[300px] md:h-auto object-cover" alt="" />
          </div>
          <div className="carousel-slide">
            <img src="assets/baner-atrevete.png" className="w-full h-[300px] md:h-auto object-cover" alt="" />
          </div>
        </div>
      </div>
      <div className="carousel-pagination absolute end-0 start-0 flex justify-center gap-3 mt-12"></div>
    </div>
    
  );
};
