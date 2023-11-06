import React from 'react';


// for cards
import { Tilt } from "react-tilt";

import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";


// hyer order component
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";




// create ServiceCard
const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >

        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img
            src={icon}
            alt='web-development'
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>


      </motion.div>

    </Tilt>
  )
}


const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>

      </motion.div>

      {/* four parameters in variants 1-direction 2-type 3-delay 4-duration of animation */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        With a proven track record as a Full Stack Developer and overall 2 + years hands-on expertise in HTML5, CSS3, Bootstrap5, TailwindCSS, JavaScript, ReactJS, React Native, Google Firebase, MongoDB, and
        Node.js, I am well-versed in building robust and user-centric applications. My proficiency in a diverse skill
        set enables me to create innovative web and mobile solutions that consistently deliver exceptional user
        experiences. Committed to continuous growth, I actively stay abreast of industry advancements, ensuring I
        remain at the forefront of technology to drive optimal results and surpass expectations.



      </motion.p>



      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}

      </div>


    </>
  )
}

// export default About

// hoc banane ke baad
export default SectionWrapper(About, "about");