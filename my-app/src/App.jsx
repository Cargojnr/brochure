// import React from 'react';
// import Slideshow from './components/Slideshow';
// import Navbar from './components/Navbar';
// import Link from './components/Link';

const images = [
  {
    url: "/flyer.jpg",
    title: "Early Childhood",
    description: "Age 5 - First day at school"
  },
  {
    url: "/recieving award.jpg",
    title: "Elementary School",
    description: "Age 10 - School performance"
  },
  {
    url: "/in a meeting.jpg",
    title: "Teen Years",
    description: "Age 15 - High school graduation"
  },
  {
    url: "/with friends.jpg",
    title: "Young Adult",
    description: "Age 20 - University days"
  },
  {
    url: "/jed's mom.jpg",
    title: "Professional Life",
    description: "Age 30 - First major achievement"
  },
  // {
  //   url: "/jed's mom.jpg",
  //   title: "Recent Years",
  //   description: "Current role at U.N."
  // }
];

// const App = () => {
//   return (
//     <div className="container">
//       <div id="navbar" className="d-flex flex-row align-items-center align-middle justify-content-between mb-10rem">
//         <h1 id="logo"><span className='logo'>L.</span> Tagoe</h1>
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//           <div className="container-fluid">
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <div className='nav-top'></div>
//                   <Link link="Home" current="page" class="nav-link active text-Fuchsia-600" href="#" />
                  
//                 </li>
//                 <li className="nav-item">
//                   <div className='nav-top'></div>
//                   <Link link="About" class="nav-link active" href="#" />
                  
//                 </li>
//                 <li className="nav-item">
//                   <div className='nav-top'></div>
//                   <Link link="Contact" class="nav-link active" href="#" />
                  
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>

//       <div className="container">
//        <section className='hero my-5 ml-0 '>
//        <div className='hero d-flex flex-row mb-3 g-50 align-items-center justify-content-between text-center'>

//           <div className='hero-profile'>
//         <img className='img-thumbnail' src="/jed's mom2.jpg"  alt="My profile Picture"/>
//          <h4 className='align-center'>HON. Ps Love Tagoe</h4>
//          <h5 className='fst-italic align-center'>(Deputy Women's Commisioner U.N)</h5>
//          </div>

//        <div className='hero-text text-end '>
//            <p className='hero-tag bg-pink-600 p-3'>Introducing To You <br /> MRS LOVE TAGOE <span className='hero-bond' ></span></p>
//           <p className='l-head'>Born on a Sunday in the year 1978 on April 23.</p>
//           <p className='m-head'>Nationality, Ghanaian. Born to Mr Jonas Tagoe and Mrs Joyce Tagoe and was raised in Accra Osu with Three siblings. She has three children.</p>
//         </div>

//       </div>

//     </section>

//       </div>

//       <section className="life-journey d-flex justify-center flex-column">
//         <h2 className="text-center mb-4">Gallery</h2>
//         <Slideshow images={images} />
//       </section>
      

//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import Slideshow from './components/Slideshow';
import Navbar from './components/Navbar';
import Link from './components/Link';
import Button from './components/Button';

const pages = [
  {
    url: '/jed\'s mom2.jpg',
    clientName: 'HON. Ps Love Tagoe',
    clientTitle: '(Deputy Women\'s Commisioner U.N)',
    heroTag: 'Introducing To You MRS LOVE TAGOE',
    heroHead: 'Born on a Sunday in the year 1978 on April 23.',
    heroText: 'Nationality, Ghanaian. Born to Mr Jonas Tagoe and Mrs Joyce Tagoe and was raised in Accra Osu with Three siblings. She has three children.',
  }
];

const App = () => {
  const [aboutActive, setAboutActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [galleryInView, setGalleryInView] = useState(false);

  const handleNavClick = (link) => {
    if (link === 'contact') {
      setCurrentPage(1);  // Switch to the Contact page
      setNavbarVisible(false); // Hide navbar for Contact page
      setAboutActive(false)
      window.scrollTo(0, 0);
    } else {
      setCurrentPage(0); // Switch back to Home page
      setNavbarVisible(true); // Show navbar for Home page
      setAboutActive(false)
      window.scrollTo(0, 0);
    }
    const targetSection = document.getElementById(link);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    setAboutActive(!aboutActive); // Toggle the state

    const aboutSection = document.getElementById('about-section');
    // if (aboutSection) {
    //   aboutSection.scrollIntoView({ behavior: 'smooth' });

    // } else if(){
    //   window.scrollTo({
    //     top: aboutSection.offsetTop - 1000, // Adjust scroll position
    //     behavior: 'smooth',
    //   });
    // }

    if(aboutSection && aboutSection.style.opacity != "0"){
      const aboutRect = aboutSection.getBoundingClientRect();
      if(aboutRect.top < 0 || aboutRect.bottom > window.innerHeight){
        window.href = ""
        window.scrollTo({
          top: aboutSection.offsetTop - 1000,
          behavior: 'smooth',
        });
      }
    }
  };

  // Smooth transition for page switching
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Optional: Reset page transition after a short delay
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  
  useEffect(() => {
    if (aboutActive) {
      // Scroll to the hero text if it's hidden.
      const heroText = document.querySelector('.hero-text');
      if (heroText) {
        const heroRect = heroText.getBoundingClientRect();
        if (heroRect.top < 0 || heroRect.bottom > window.innerHeight) {
          window.scrollTo({
            top: heroText.offsetTop - 1000, // Adjust scroll position
            behavior: 'smooth',
          });
        }
      }
    }
  }, [aboutActive]);
  

  const handleGalleryScroll = () => {
    // Add delay before the scroll effect
    setAboutActive(false)
    setGalleryInView(true);
    
    // Scroll with delay
    setTimeout(() => {
      const galleryElement = document.getElementById('gallery');
      if (galleryElement) {
        const galleryRect = galleryElement.getBoundingClientRect()
        if(galleryRect< 0 || galleryRect.bottom > window.innerHeight){
          window.scrollTo({
            top: galleryElement.offsetTop + 1000,
            behavior: 'smooth',
          })
        }
        // galleryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // Delay in milliseconds (500ms = 0.5s)
  };

  useEffect(() => {
    // Reset gallery animation after the gallery scroll is complete
    if (currentPage === 1) {
      setGalleryInView(false); // Reset after viewing gallery
    }
  }, [currentPage]);

  return (
    <>
    <div className="container">
            {/* Overlay that will appear when about is active */}
            {aboutActive && (
        <div 
          className="overlay" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            pointerEvents: 'none'
          }}
        ></div>
      )}
      {/* Navbar */}
      <div id="navbar" className={`d-flex flex-row align-items-center justify-content-between ${navbarVisible ? 'visible' : 'hidden'}`}>
        <h1 id="logo"><span className='logo'>L.</span> Tagoe</h1>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <div className={`{navbar nav-top ${navbarVisible ? 'visible' : 'hidden'}`}></div>
                  <Link link="Home" class="nav-link active text-Fuchsia-600" href="#" onClick={() => handleNavClick('home')} />
                </li>
                <li className="nav-item">
                <div className={`{navbar nav-top ${navbarVisible ? 'visible' : 'hidden'}`}></div>
                  <Link link="Gallery" class="nav-link" href="#gallery"  onClick={() => handleGalleryScroll()} />
                </li>
                <li className="nav-item">
                <div className={`{navbar nav-top ${navbarVisible ? 'visible' : 'hidden'}`}></div>
                  <Button btn="About" class={`nav-link ${aboutActive ? 'active text-Fuchsia-600' : ''}`} onClick={handleAboutClick} />
                </li>
                <li className="nav-item">
                <div className={`{navbar nav-top ${navbarVisible ? 'visible' : 'hidden'}`}></div>
                  <Link link="Contact" class="nav-link" href="#" onClick={() => handleNavClick('contact')} />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

<div id="pagination" className='page-wrapper'>
      {/* Hero Section */}
      <section  id="about-section" className={`page hero ${currentPage === 0 ? 'page-content active' : 'page-content'}`}>
        <div className='hero d-flex flex-row mb-3 g-50 align-items-center justify-content-between text-center'>
          <div className='hero-profile'>
            <img className='img-thumbnail' src={pages[0].url} alt="My profile Picture" />
            <h4 className='align-center'>{pages[0].clientName}</h4>
            <h5 className='fst-italic align-center'>{pages[0].clientTitle}</h5>
          </div>
          <div className={`hero-text text-end ${aboutActive ? 'highlighted' : ''}`} 
              style={{
                position: 'relative',
                zIndex: aboutActive ? 101 : 'auto',
                border: aboutActive ? '4px solid oklch(50.8% 0.288 312.321)' : 'none',
                padding: aboutActive ? '20px' : '20px',
                transition: 'all 0.3s ease',
                backgroundColor: aboutActive ? 'white' : 'transparent',
                borderRadius: aboutActive ? '8px' : '0'
              }}
            >
            <p className='hero-tag bg-pink-600 p-3'>{pages[0].heroTag} <span className='hero-bond'></span></p>
            <p className='l-head'>{pages[0].heroHead}</p>
            <p className='m-head'>{pages[0].heroText}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {currentPage === 1 && (
        <section className={`page contact-page ${currentPage === 1 ? 'active' : ''}`}>
          <div id="contact" className="contact d-flex flex-column mb-3 align-items-center justify-content-between text-center" >
          <h4>Contact Form</h4>
          <form className='contact-form'>
            <div className='form-group'>
              <label>Name:</label>
              <input  type="text" placeholder="Enter your name" />
            </div>
            <div className='form-group'>
              <label>Email:</label>
              <input  type="email" placeholder="Enter your email" />
            </div>
            <div className='form-group'> 
              <label>Message:</label>
              <textarea rows="4" placeholder="Enter your message" />
            </div>
            <button type="submit">Submit</button>
          </form>
          </div>
        </section>
      )}

</div>

      {/* Pagination Controls */}
      <div className="navigation-controls">
        <button className="prev-btn" onClick={() => setCurrentPage(0)}>
          {/* Prev */}
          <span className='dot'></span>
        </button>
        <button className="next-btn" onClick={() => setCurrentPage(1)}>
          {/* Next */}
          <span className='dot'></span>
        </button>
      </div>
     


      {/* Gallery Section */}
      <section id="gallery" className="life-journey ">
        <h2 className="text-center mb-4">Gallery</h2>
        <Slideshow images={images} />
      </section>

      <section id="quote" >
        <div className='quote'>
        <h2 className='text-center mb-4'>Biblical Quote</h2>
        {/* <p> So do not fear, do not be dismayed for the Lord thy Gord is your right hand. He would guide and protect thee foreve. Amen!</p> */}
        <p className='quote-text'> So do not fear for i am with you, do not be dismayed for i am your God i will strengthen you and help you. i will uphold you with for my righteous right Hand. Amen!</p>
        <small className='quoted'>Isiaiah 41: 10</small>
        </div>
      </section>
   
    </div>
    <footer>
        <div className='footer container'>

          <div className='logo'>
          <h1 id="logo"><span className='logo'>L.</span> Tagoe</h1>
          </div>
          <div className='footer-lists'>
              <div className='footer-child'>
                 <h4>Reach Out</h4>
                <ul className=''>
                  <li><Link href="tel: +233545508197" link="Call me"/></li>
                  <li><Link href="mailto: Itagoe92@yahoo.com" link="Email me"/></li>
                  <li><Link href="https://wa.me/+233545508197" link="What's App"/></li>
                </ul>
              </div>
              <div className='footer-child'>
                <h4>Links</h4>
              <ul>
                  <li><Link href="tel: +233545508197" link="Call me"/></li>
                  <li><Link href="tel: +233545508197" link="Call me"/></li>
                  <li><Link href="tel: +233545508197" link="Call me"/></li>
                </ul>
              </div>
          </div>
        </div>
        <center><p className='footer-pgrph'>Copyright&copy; Love Tagoe @{new Date().getFullYear()} </p></center>
      </footer>
    </>
  );
};

export default App;
