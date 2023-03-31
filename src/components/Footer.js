import React from "react";
import { Element } from "react-scroll";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const content = (
    <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
      <div className="container flex px-3 py-6 ">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full lg:w-1/2 ">
            <Element name="about">
              <div className="about-section">
                <div className="px-3 md:px-0">
                  <h3 className="font-bold text-gray-900 fontStyle">About</h3>
                  <p className="py-4">
                    This website is being made for a Dynamic Web Technologies
                    coursework at University of the West by Lloyd Edgar
                    Evangelista. Any information this website contain are
                    fictional.
                  </p>
                </div>
              </div>
            </Element>
          </div>
          <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
            <div className="px-3 md:px-0">
              <h3 className="font-bold text-gray-900 fontStyle">Follow Us</h3>
              <ul className="list-reset items-center pt-3">
                <li>
                  <SocialIcon className="m-1" url="https://www.linkedin.com/in/lloyd-edgar-evangelista/" />
                  <SocialIcon className="m-1" url="https://www.facebook.com/" />
                  <SocialIcon className="m-1" url="https://www.twitter.com/" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return content;
};

export default Footer;
