import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact : "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    setErrors({
      ...errors,
      [name]: "", // Clear error for the field being updated
    });
  };



  // most important part 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.contact) {
      newErrors.contact = "Contact number is required.";
    } else if (form.contact.length < 11) {
      newErrors.contact = "Contact number must be at least 11 digits.";
    }
    if (!form.message) newErrors.message = "Message is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);



    // functionality 
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        // third parameter ko object provide kiya
        {
          from_name: form.name,
          to_name: "Mohsin Mustafa",
          from_email: form.email,
          to_email: "mohsinmustafaansari@gmail.com",
          from_contact: form.contact,
          message: form.message,
        },
        // last variable and 4th parameter
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY

      )
      // when this execute then show
      .then(
        () => {
          setLoading(false);
          // alert("Thank you. I will get back to you as soon as possible.");
          toast.success("Thank you. I will get back to you as soon as possible.!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // reset form
          setForm({
            name: "", //empty string
            email: "",
            contact : "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("Ahh, something went wrong. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // alert("Ahh, something went wrong. Please try again.");
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
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
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
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Contact</span>
            <input
              type='number'
              name='contact'
              value={form.contact}
              onChange={handleChange}
              placeholder="What's your contact number?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
            {errors.contact && <span className="text-red-500 text-sm">{errors.contact}</span>}
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
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}
          </label>

          {/*  */}
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </form>

        <ToastContainer />
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        // className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        className="xl:flex-1 xl:h-[600px] md:h-[550px] h-[350px] flex justify-center items-center"

      >
        <EarthCanvas />
      </motion.div>

    </div>
  )
}

// export default Contact
export default SectionWrapper(Contact, "contact");