import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'; // Import Axios
import emailjs from "@emailjs/browser"; // Import emailjs
import CustomCalender from "../../components/CustomCalender/CustomCalender";
import "./BookAppointment.css";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom'; // Import useLocation
import { servicesPricingData } from '../../sections/PricingSection/PricingSection'; 
import AOS from "aos"; 
import "aos/dist/aos.css";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; // Import Alert for styling Snackbar messages

// import MapSection from "../../sections/Map/MapSection";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

const BookAppointment = () => {
  const location = useLocation(); // Get the location object
  const { serviceTitle } = location.state || {}; // Get the service title from the passed state

  const timeSlots = [
    "10 PM (UTC+5)",
    "11 PM (UTC+5)",
    "12 AM (UTC+5)",
    "1 AM (UTC+5)",
    "2 AM (UTC+5)",
    "3 AM (UTC+5)",
  ];

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots); // State for available time slots
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    note: "",
    serviceName: serviceTitle || "", // Populate with received service title
  });
  const [bookingStatus, setBookingStatus] = useState(""); // Set booking status message
  const [StatusSeverity, setStatusSeverity] = useState(""); // Set booking status message
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false); // Snackbar visibility state

  const formRef = useRef();


  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  // Function to fetch available time slots for the selected date
  const fetchAvailableTimeSlots = async (selectedDate) => {
    try {
      const response = await axios.get('http://localhost:5000/api/available-times', {
        params: { date: selectedDate }
      });

      if (response.status === 200) {
        setAvailableTimeSlots(response.data.availableTimes);
      } else {
        setBookingStatus('Failed to fetch available time slots. Please try again.');
        setStatusSeverity("error"); 
        setIsSnackbarOpen(true); // Open Snackbar if there's an error
      }
    } catch (error) {
      console.error('Error fetching available time slots:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableTimeSlots(date); // Fetch available time slots for the selected date
  };

  const sendDataToBackend = async (appointmentData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
      if (response.status === 201) {
        setBookingStatus("Appointment successfully booked");
        setStatusSeverity("success"); 
      } else {
        setBookingStatus("Failed to book the appointment. Please try again.");
        setStatusSeverity("error"); 
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      setBookingStatus("Failed to book the appointment. Please try again.");
      setStatusSeverity("error"); 
      setIsSnackbarOpen(true); // Open Snackbar on error
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.serviceName || !selectedDate || !selectedTime) {
      setBookingStatus("Please fill all required fields.");
      setStatusSeverity("warning"); 
      setIsSnackbarOpen(true); // Open Snackbar if validation fails
      return; // Prevent submission if fields are not filled
    }

    const serviceAmount = servicesPricingData.find(service => service.title === formData.serviceName)?.price || 0;

    const appointmentData = {
      serviceName: formData.serviceName,
      name: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phone,
      note: formData.note,
      date: selectedDate,
      time: selectedTime,
      amount: serviceAmount
    };

    const recipients = `${formData.email}, hozefarauf@gmail.com`;
    const templateParams = {
      serviceName: formData.serviceName,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      note: formData.note,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      amount: serviceAmount,
      to_email: recipients
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
          setBookingStatus("Appointment successfully booked!");
          setStatusSeverity("success"); 
          setIsSnackbarOpen(true); // Open Snackbar on success
          sendDataToBackend(appointmentData);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setBookingStatus("Failed to send the email. Please try again.");
          setStatusSeverity("error"); 
          setIsSnackbarOpen(true); // Open Snackbar on error
        }
      );
    };

// Add the handleCloseSnackbar function
const handleCloseSnackbar = () => {
  setIsSnackbarOpen(false);
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
      <div className="book-apointment-container" style={{color: "white"}}>
        <h3 data-aos="fade-down" data-aos-duration="1800" data-aos-easing="ease-out-back" className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-center font-semibold mt-4 mb-4 text-white">
          Book An <span style={{ color: "rgb(199,47,72)" }}>Appointment</span>
        </h3>
        {/* {bookingStatus &&  <Snackbar
        autoHideDuration={5000}
        message={bookingStatus}
      />} */}
        <form ref={formRef} onSubmit={sendEmail}>
          <div className="flex items-center justify-evenly column-gap-5 row-gap-3 flex-col-reverse lg:flex-row text-white pt-2" style={{marginTop:'75px'}}>
            <ThemeProvider theme={theme}>
              <div data-aos="fade-right" data-aos-duration="1800" data-aos-easing="ease-out-back" className="flex flex-col row-gap-2 text-white">
                <TextField
                  className="w-[350px] text-white"
                  label="Full Name"
                  name="fullName"
                  variant="outlined"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <TextField
                  className="w-[350px]"
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <TextField
                  className="w-[350px]"
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                <TextField
                  select
                  className="w-[350px]"
                  label="Select Service"
                  name="serviceName"
                  variant="outlined"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  {servicesPricingData.map((service, index) => (
                    <option key={index} value={service.title} style={{color:'white' , backgroundColor: '#171820'}}>
                      {service.title}
                    </option>
                  ))}
                </TextField>

                <TextField
                  className="w-[350px]"
                  label="Note"
                  name="note"
                  variant="outlined"
                  value={formData.note}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Notes To Help Us Prepare For The Meeting?"
                          arrow
                        >
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
                <input
                  type="hidden"
                  name="selected_time"
                  value={selectedTime || ""}
                />
              </div>
            </ThemeProvider>

            <div data-aos="fade-left" data-aos-duration="1800" data-aos-easing="ease-out-back" className="flex items-center justify-center flex-col md:flex-row row-gap-3">
              <CustomCalender onDateChange={handleDateChange} />
              <div className="time-buttons-container flex flex-col row-gap-2">
                <h4 className="text-lg text-center font-semibold text-[#C72F48]">
                  Select Time
                </h4>
                {availableTimeSlots.map((time, index) => (
                  <Button
                    key={index}
                    className={` time-button ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    variant="outline-primary"
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1800" data-aos-easing="ease-out-back" className="flex justify-center mt-3">
            {/* <Button
            // style={{borderRadius: "20px !important"}}
              className="mt-4 rounded-3xl bg-[#C72F48] hover:bg-[#a92339] border-[#C72F48] hover:border-[#a92339] w-[350px] text-2xl mb-2"
              variant="primary"
              type="submit"
            >
              Submit
            </Button> */}
            <Button
            // className="bg-[#C72F48] hover:bg-[#a92339] border-[#C72F48] hover:border-[#a92339] w-[350px] text-2xl mb-2"
            className='mt-3 bn4 border-none hover:border-none w-[350px] py-2 text-base'
            variant="primary"
            type="submit"
            >
            Submit
          </Button>
          </div>
        </form>
      </div>
      {/* Snackbar for notifications */}
      <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={StatusSeverity} sx={{ width: '100%' }}>
            {bookingStatus}
          </Alert>
        </Snackbar>
      <Footer />
    </>
  );
};

export default BookAppointment;