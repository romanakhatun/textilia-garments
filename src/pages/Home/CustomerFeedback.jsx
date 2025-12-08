// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    quote:
      "The Garments Tracker revolutionized our small factory. Order tracking is seamless, and being able to monitor the cutting stage from the dashboard is invaluable. Delivery times are now 20% faster!",
    name: "Riley Foster",
    title: "Factory Owner",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "We used to lose track of our inventory after the sewing stage. This system provides perfect transparency. The Manager dashboard pages make product approval and order management incredibly efficient.",
    name: "Taylor Mitchell",
    title: "Production Manager",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "As a buyer, placing an order is simple, and the Order Price calculation is fast. The live tracking feature is fantastic—I always know if my shipment has passed QC or is out for delivery.",
    name: "Alex Johnson",
    title: "Buyer (Client)",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    rating: 4,
  },
  {
    id: 4,
    quote:
      "The UI design is clean and professional. It’s exactly what recruiters look for in a modern web application. The dark theme implementation is flawless.",
    name: "Chris Lee",
    title: "Web Recruiter",
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    rating: 5,
  },
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const TestimonialCard = ({ quote, name, title, avatar, rating }) => (
  <div className="p-6 h-full flex flex-col justify-between rounded-xl bg-base-100 shadow-xl border border-base-300/50">
    <div className="flex text-accent text-lg mb-4">
      {[...Array(rating)].map((_, i) => (
        <FaStar key={i} />
      ))}
    </div>

    <p className="text-base text-base-content leading-relaxed grow">
      "{quote}"
    </p>
    <div className="flex items-center mt-6 pt-4 border-t border-base-300">
      <div className="avatar mr-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div>
        <h4 className="text-lg font-arsenal font-bold text-base-content">
          {name}
        </h4>
        <p className="text-sm text-secondary">{title}</p>
      </div>
    </div>
  </div>
);

const CustomerFeedback = () => {
  return (
    <motion.section className="py-20" variants={itemVariants}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium uppercase tracking-widest text-primary mb-2 highlight-title inline-block"
          >
            TESTIMONIAL
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="section-heading text-4xl font-arsenal font-medium text-base-content"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-4 mt-8">
            <button className="swiper-button-prev-custom btn btn-circle bg-primary text-primary-content hover:bg-base-300 shadow-md">
              <FaArrowLeft />
            </button>
            <button className="swiper-button-next-custom btn btn-circle bg-primary text-primary-content hover:bg-base-300 shadow-md">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerFeedback;
