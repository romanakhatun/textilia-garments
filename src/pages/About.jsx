import { FaCheckCircle, FaCogs, FaTruck, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold highlight-title inline-block">
          About Textila
        </h1>
        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          We are committed to delivering high-quality garments and production
          solutions with efficiency, reliability, and modern technology.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-base-content/70 leading-relaxed">
            At Textila, our mission is simple — provide businesses with a
            seamless and transparent garments ordering and production tracking
            experience. We empower buyers and managers with real-time visibility
            and ensure timely delivery with full quality assurance.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/4492089/pexels-photo-4492089.jpeg"
            alt="Garments Production"
            className="w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* Company Values */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why Choose Textila?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Feature 1 */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <FaCheckCircle size={40} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Quality Assurance</h3>
            <p className="text-base-content/70">
              Every garment goes through strict quality checks to ensure maximum
              reliability.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <FaTruck size={40} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Fast & Reliable Delivery</h3>
            <p className="text-base-content/70">
              We ensure on-time delivery with real-time order and production
              tracking.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <FaCogs size={40} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Modern Production</h3>
            <p className="text-base-content/70">
              Our modern manufacturing process ensures efficiency and precision.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <FaUsers size={40} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Dedicated Support</h3>
            <p className="text-base-content/70">
              Our team is always ready to support and assist throughout your
              order journey.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg"
            alt="Our Team"
            className="w-full h-80 object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-base-content/70 leading-relaxed">
            Textila started with a vision to simplify the garments ordering
            process. As the industry grew, so did the complexity — from managing
            production to tracking delivery milestones. We built Textila to make
            this easier for buyers, managers, and production teams.
          </p>
          <p className="mt-4 text-base-content/70 leading-relaxed">
            Today, we serve clients nationwide with a digital-first platform
            designed to provide transparency, speed, and unmatched efficiency.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
