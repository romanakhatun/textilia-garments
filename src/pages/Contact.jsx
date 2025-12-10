import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold highlight-title inline-block">
          Contact Us
        </h1>
        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          Have questions? Need help? We’re here to support your garments order
          and production journey every step of the way.
        </p>
      </section>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        {/* Phone */}
        <div className="p-8 border rounded-xl text-center hover:shadow-lg transition">
          <FaPhoneAlt size={35} className="text-primary mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Phone</h3>
          <p className="text-base-content/70">+880 123 456 789</p>
        </div>

        {/* Email */}
        <div className="p-8 border rounded-xl text-center hover:shadow-lg transition">
          <FaEnvelope size={35} className="text-primary mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Email</h3>
          <p className="text-base-content/70">support@textila.com</p>
        </div>

        {/* Address */}
        <div className="p-8 border rounded-xl text-center hover:shadow-lg transition">
          <FaMapMarkerAlt size={35} className="text-primary mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Address</h3>
          <p className="text-base-content/70">Uttara, Dhaka – Bangladesh</p>
        </div>
      </div>

      {/* Contact Form + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Map */}
        <div className="rounded-xl overflow-hidden h-96 shadow">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.77119541021!2d90.40083327531931!3d23.791599187175253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c63edfedba23%3A0x1c27bfe3999e1bb0!2sUttara%20Sector%2011!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Form */}
        <form className="space-y-6 bg-base-100 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Send us a message</h2>

          <div>
            <label className="label font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div>
            <label className="label font-medium">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div>
            <label className="label font-medium">Message</label>
            <textarea
              className="textarea textarea-bordered w-full bg-base-100"
              rows="5"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
