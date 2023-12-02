import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faArrowRight,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter,  } from '@fortawesome/free-brands-svg-icons'
import FadeIn from './FadeIn';
const Footer = () => {
  const Community = ["Search Properties", "For Agents", "Reviews", "FAQs"];
  const AboutUs = ["Our Story", "Meet the team", "Careers"];
  const Company = ["About Us", "Press", "Contact", "Careers"];

  return (
    <div className='bg-gray-100 min-h-screen p-8 md:p-12'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='md:col-span-1'>
          <h1 className='text-3xl mb-8'>Uptown</h1>
          <p className='mb-8'>Far far away, behind the word mountains, far from the countries.</p>
            <FadeIn direction={"up"} delay={0.2} padding fullWidth>
            <div className='flex justify-center gap-4 text-4xl text-pink-400'>

            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            </div>
            </FadeIn>
           
       
        </div>
        <div className='md:col-span-1'>
          <h1 className='text-3xl mb-8'>Community</h1>
          {Community.map((community, index) => (
            <ul key={index} className='p-1'>
              <li>
                <FontAwesomeIcon icon={faArrowRight} className='text-xl text-pink-400 mr-2' />
                {community}
              </li>
            </ul>
          ))}
        </div>
        <div className='md:col-span-1'>
          <h1 className='text-3xl mb-8'>About us</h1>
          {AboutUs.map((about, index) => (
            <ul key={index} className='p-1'>
              <li>
                <FontAwesomeIcon icon={faArrowRight} className='text-xl text-pink-400 mr-2' />
                {about}
              </li>
            </ul>
          ))}
        </div>
        <div className='md:col-span-1'>
          <h1 className='text-3xl mb-8'>Company</h1>
          {Company.map((Company, index) => (
            <ul key={index} className='p-1'>
              <li>

                <FontAwesomeIcon icon={faArrowRight} className='text-xl text-pink-400 mr-2' />
                {Company}
              </li>
            </ul>
          ))}
        </div>
        <div className='md:col-span-1'>
          <h1 className='text-3xl mb-8'>Have Questions</h1>
          <ul>
            <li className='p-2'>
              <FontAwesomeIcon icon={faLocationDot} className='mr-2 text-pink-400' />
              203 Fake St. Mountain <br /> View, San Francisco, <br />
              California, USA
            </li>
            <li className='p-2'>
              <FontAwesomeIcon icon={faPhone} className='mr-2 text-pink-400' />
              +977 9830843233
            </li>
            <li className='p-2'>
              <FontAwesomeIcon icon={faEnvelope} className='mr-2 text-pink-400' />
              Email: info@uptown.com
            </li>
          </ul>
        </div>
      </div>
      <div className='flex justify-center items-center md:mt-20 p-8'>
        <h5>© 2023 UpTown™ All Rights Reserved.</h5>
      </div>
    </div>
  );
};

export default Footer;
