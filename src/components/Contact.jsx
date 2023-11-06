import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";




const Contact = () => {

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    // imp
    // e.target.name 
    // e.target.value exists in this (e) event 



    // ...form is ka mtlb spread entire/previous form
    // or phr is ke bad [name]:value yani name ko update kr deya new update value jo user dega

    setForm({
      ...form,
      [name]: value, //update name to new updated value
    });
  };



  // most important part 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);


    // QI0n0nLsJ2HU-2CGs
    // service_80exlbf
    // template_sm8j4zt
    // functionality 
    emailjs
      .send(
        // import.meta.env.REACT_APP_EMAILJS_SERVICE_ID,
        // import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        "service_80exlbf",
        "template_ebxl1zd",
        // third parameter ko object provide kiya
        {
          from_name: form.name,
          to_name: "Mohsin Mustafa",
          from_email: form.email,
          to_email: "mohsinmustafansari@gmail.com",
          message: form.message,
        },
        // last variable and 4th parameter
        // import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY
        "QI0n0nLsJ2HU-2CGs"
        
      )
      // when this execute then show
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          // reset form
          setForm({
            name: "", //empty string
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };




  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/*   */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What do you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          {/*  */}
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </form>

      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>

    </div>
  )
}

// export default Contact
export default SectionWrapper(Contact, "contact");