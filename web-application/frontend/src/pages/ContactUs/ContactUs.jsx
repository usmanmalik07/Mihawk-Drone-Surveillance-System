import React, { useState, useRef, useEffect } from 'react';
import "./ContactUs.css";
import Footer from '../../components/Footer/Footer'
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser"; // Import emailjs
import AOS from "aos"; 
import "aos/dist/aos.css";
import MapSection from "../../sections/Map/MapSection";

const ContactUs = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceName: '',
    message: '',
  });

  // Sample servicesPricingData
  const servicesPricingData = [
    { title: 'Service 1', price: 100 },
    { title: 'Service 2', price: 200 },
    // Add more services as needed
  ];

  // Ref for the form
  const formRef = useRef();

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const sendEmail = (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.fullName || !formData.email || !formData.phone ) {
      alert("Please fill all required fields.");
      return;
    }

    const serviceAmount = servicesPricingData.find(service => service.title === formData.serviceName)?.price || 0;

    const templateParams = {
      serviceName: formData.serviceName,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      amount: serviceAmount,
      to_email: `${formData.email}, hozefarauf@gmail.com`
    };

    emailjs
      .send(
        "service_5jc9upo",
        "template_3qmiclr",
        templateParams,
        "02XBjNAd_Wbg_mzrC"
      )
      .then(
        (result) => {
          console.log("EmailJS result:", result);
          alert("Appointment successfully booked!");
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Failed to send the email. Please try again.");
        }
      );
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(199, 47, 72)",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#b1b1b1', // Set border color to white when inactive
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(199, 47, 72)', // Set border color when hovered
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(199, 47, 72)', // Set border color when focused
            },
            color: 'whitesmoke', // Text color inside input
            backgroundColor: 'rgb(23, 24, 32) !important', // Ensure background stays transparent
          },
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px rgb(23, 24, 32) inset !important', // Transparent background for autofill
              WebkitTextFillColor: 'whitesmoke !important', // Autofill text color
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'whitesmoke', // Set label color to white when inactive
            '&.Mui-focused': {
              color: 'rgb(199, 47, 72)', // Set label color when focused
            },
          },
        },
      },
    },
  });


  useEffect(() => {
    AOS.init()
  }, []);
  
  

  return (
    <>
    <div className='contact-us-container' style={{ color: "whitesmoke"}}>

      <h3 data-aos="fade-down" data-aos-duration="1800" data-aos-easing="ease-out-back" className="2xl:text-6xl xl:text-5xl lg:text-4xl text-3xl font-semibold text-center mt-16">
        <span style={{ color: "rgb(230,47,72)" }}>Contact Us</span>
      </h3>
        <div className='flex flex-col md:flex-row justify-between mt-16 xl:gap-x-68 md:gap-x-28 lg:gap-x-40 gap-y-10'>

        <div data-aos="fade-right" data-aos-duration="1800" data-aos-easing="ease-out-back" className='w-full'>
        <h6 className='2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-lg' style={{ color: "rgb(230,47,72)" }}>Let's get in touch!</h6>
      <p className='2xl:text-2xl xl:text-xl lg:text-lg md:text-base text-sm mt-2 font-light'>Feel free to ask.</p>
      <div className='h-[1px] bg-[#b1b1b1] mt-5 mb-4'></div>
      <div>
        <div className='my-2'>
        <i class="fa-solid fa-envelope mr-1" style={{color: "rgb(199, 47, 72)"}}></i> buzzsols1122@gmail.com
        </div>
        <div className='my-2'>
        <i class="fa-solid fa-phone mr-1" style={{color: "rgb(199, 47, 72)"}}></i> +92 321 5211814
        </div>
        <div className='my-2'>
        <i class="fa-brands fa-linkedin mr-1" style={{color: "rgb(199, 47, 72)"}}></i> <a style={{color:"white", fontSize: "inherit"}} href="www.linkedin.com/company/buzz-sol/">Buzz Solutions</a>
        </div>
      </div>
      <div className='h-[1px] bg-[#b1b1b1] mt-4'></div>
        </div>
      <form ref={formRef} onSubmit={sendEmail}>
        <div data-aos="fade-left" data-aos-duration="1800" data-aos-easing="ease-out-back" className="flex items-center justify-center column-gap-5 row-gap-3 flex-col-reverse lg:flex-row">
          <ThemeProvider theme={theme}>
            <div className="flex flex-col row-gap-3">
              <TextField
                className="w-[350px] lg:w-[500px]"
                label="Full Name"
                name="fullName"
                variant="outlined"
                value={formData.fullName}
                onChange={handleInputChange}
                />
              <TextField
                className="w-[350px] lg:w-[500px]"
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
                />
              <TextField
                className="w-[350px] lg:w-[500px]"
                label="Phone"
                name="phone"
                variant="outlined"
                value={formData.phone}
                onChange={handleInputChange}
                />

              <TextField
                id="outlined-multiline-flexible"
                className="w-[350px] lg:w-[500px]"
                label="Message"
                name="message"
                multiline
                maxRows={4}
                variant="outlined"
                value={formData.message}
                onChange={handleInputChange}
                sx={{
                    '& .MuiInputBase-input': {
                        paddingTop: '4px',  // Reduce top padding
                        paddingBottom: '4px',  // Reduce bottom padding
                        height: "16px !important",
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                      <Tooltip title="Notes To Help Us Prepare For The Meeting?" arrow>
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          style={{
                              color: "rgb(199, 47, 72)",
                              cursor: "pointer",
                            }}
                            />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                />
        <div className="flex justify-center mt-1">
          <Button
            // className="bg-[#C72F48] hover:bg-[#a92339] border-[#C72F48] hover:border-[#a92339] w-[350px] text-2xl mb-2"
            className='bn4 border-none hover:border-none w-[350px] lg:w-[500px] py-2 text-base'
            variant="primary"
            type="submit"
            >
            Submit
          </Button>
        </div>
            </div>
          </ThemeProvider>
        </div>
      </form>
              </div>
              <MapSection/>
    </div>
              <Footer/>
              </>
  );
};

export default ContactUs;
