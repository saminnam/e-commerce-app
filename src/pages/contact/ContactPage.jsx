import React from "react";
import GlobalHero from "../../components/GlobalHero";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <section>
      <GlobalHero title={"📩 Contact Us"} />
      <ContactForm />
    </section>
  );
};

export default ContactPage;
