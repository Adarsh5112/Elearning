import React from 'react'
import './footer.css'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <footer>
            <div className="footer-content">
                <p>
                   &copy; 2024 Your E-Learning Platform, reserved. <br/>
                   Made with ❤️ <a href="Adarsh Jat"></a>
                </p>
                <div className="social-links">
                    <a href=""><FaFacebookSquare/>
                    </a>
                    <a href=""><FaTwitterSquare/>
                    </a>
                    <a href=""><FaInstagramSquare/>
                    </a>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer