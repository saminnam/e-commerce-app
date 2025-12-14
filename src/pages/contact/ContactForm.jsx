import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Radio,
  Youtube,
} from "lucide-react";

// ZOD SCHEMA
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must contain at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        reset();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <section className="p-2 md:p-6 mt-10">
      <div className="container mx-auto content-font">
        <div className="grid md:grid-cols-2 gap-8 bg-white overflow-hidden">
          {/* LEFT FORM SECTION */}
          <div className="p-8 border-2 rounded-lg border-[#E5B236] overflow-hidden">
            <h2 className="text-2xl text-[#E5B236] mb-5 relative pb-4">
              Have a Question? We’re Just a Message Away
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#E5B236]"></span>
            </h2>
            <p className="mb-5 text-gray-600">
              Get fast and reliable support from our customer service team.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block mb-2 font-medium">Your Name</label>
                <input
                  {...register("name")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#E5B236]"
                />
                <p className="text-red-600 text-sm">{errors.name?.message}</p>
              </div>

              <div>
                <label className="block mb-2 font-medium">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#E5B236]"
                />
                <p className="text-red-600 text-sm">{errors.email?.message}</p>
              </div>

              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input
                  {...register("phone")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#E5B236]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Subject</label>
                <input
                  {...register("subject")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#E5B236]"
                />
                <p className="text-red-600 text-sm">
                  {errors.subject?.message}
                </p>
              </div>

              <div>
                <label className="block mb-2 font-medium">Your Message</label>
                <textarea
                  {...register("message")}
                  className="w-full p-3 border border-gray-300 rounded-md min-h-[150px] resize-y focus:ring-[#E5B236]"
                ></textarea>
                <p className="text-red-600 text-sm">
                  {errors.message?.message}
                </p>
              </div>

              <button
                type="submit"
                className="flex cursor-pointer items-center gap-2 bg-[#111825] text-white py-3 px-5 rounded hover:bg-yellow-600 transition"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SECTION (NO CHANGES) */}
          <div className="p-8 bg-black text-white rounded-lg">
            <h2 className="text-2xl text-[#E5B236] mb-8 relative pb-4">
              Contact Information
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#E5B236]"></span>
            </h2>

            {/* Location */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#E5B236] flex items-center justify-center rounded-full text-xl">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-lg mb-1">Our Location</h3>
                <a
                  href="https://maps.app.goo.gl/w1NTwN4vjaNUMxXg8"
                  className="text-gray-300 leading-relaxed hover:text-[#E5B236] transition-animation"
                >
                  Near Eidgah Masjid, Angappan Street, <br /> Mannady, Chennai -
                  600 001
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#E5B236] flex items-center justify-center rounded-full text-xl">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-lg mb-1">Phone Numbers</h3>
                <p className="text-gray-300 leading-relaxed">
                  <a
                    href="tel:+917448888336"
                    className="hover:text-[#E5B236] transition-animation"
                  >
                    +91 74488 88336
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#E5B236] flex items-center justify-center rounded-full text-xl">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-lg mb-1">Email Address</h3>
                <p className="text-gray-300 leading-relaxed">
                  <a
                    href="mailto:baqavibookcentre@gmail.com"
                    className="hover:text-[#E5B236] transition-animation"
                  >
                    baqavibookcentre@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-10 border-4 rounded-lg border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d15543.904437821024!2d80.289125!3d13.1007!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA2JzAyLjUiTiA4MMKwMTcnMzAuMSJF!5e0!3m2!1sen!2sin!4v1764492405085!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-10">
              <h3 className="text-lg mb-4">Follow Us For More</h3>
              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/BaqaviBooks?rdid=46rRSBkAd9aifITY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CBcqbsNFV%2F#"
                  className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded-full text-white transition duration-300 hover:bg-blue-600 transform hover:-translate-y-1"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://wa.me/+917448888336"
                  className="w-10 h-10 bg-gray-700 text-white flex items-center justify-center rounded-full
             transition duration-300 hover:bg-green-500 transform hover:-translate-y-1"
                >
                  <i class="fa-brands fa-whatsapp"></i>
                </a>

                <a
                  href="https://www.whatsapp.com/channel/0029VbAm1L15EjxsYm8ndw0b"
                  className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded-full text-white 
             transition duration-300 hover:bg-green-600 transform hover:-translate-y-1"
                >
                  <Radio size={20} />
                </a>

                <a
                  href="https://www.youtube.com/@baqavibookcentre"
                  className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded-full text-white 
             transition duration-300 hover:bg-red-600 transform hover:-translate-y-1"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
