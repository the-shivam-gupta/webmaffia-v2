"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

function Arrow({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      data-direction={direction}
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// "Latest work" on service pages: every relevant project as an image card with
// the name over a dark gradient. Two across on desktop; on mobile one card with
// the next one peeking in. A progress line and arrow buttons sit underneath.
export default function ServiceWorkSlider({ items, title }) {
  const swiperRef = useRef(null);
  const [state, setState] = useState({ begin: true, end: false });

  const sync = (swiper) => {
    setState({ begin: swiper.isBeginning, end: swiper.isEnd });
  };

  const canSlide = items.length > 1;

  return (
    <div className="work_slider">
      <div className="work_slider_head">
        {title ? <h2 className="h2">{title}</h2> : <span />}
        {canSlide && (
          <div className="work_slider_buttons">
            <button
              type="button"
              aria-label="Previous projects"
              disabled={state.begin}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Arrow direction="prev" />
              <span>View Previous</span>
            </button>
            <button
              type="button"
              aria-label="Next projects"
              disabled={state.end}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <span>View Next</span>
              <Arrow direction="next" />
            </button>
          </div>
        )}
      </div>
      <Swiper
        slidesPerView={1.12}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 40 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          sync(swiper);
        }}
        onProgress={sync}
        onBreakpoint={sync}
        onResize={sync}
      >
        {items.map((item) => (
          <SwiperSlide key={item.url + item.name}>
            <Link href={item.url || "#"} className="work_card">
              <span className="work_card_media">
                <Image
                  src={item.image}
                  alt={item.name || "Webmaffia project"}
                  width={821}
                  height={601}
                />
              </span>
              <span className="work_card_info">
                <h3 className="work_card_name">{item.name}</h3>
                {item.type ? <span className="work_card_type">{item.type}</span> : null}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
