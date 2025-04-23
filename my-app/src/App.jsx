import React, { useState, useEffect } from 'react';
import Slideshow from './components/Slideshow';
import Navbar from './components/Navbar';
import Link from './components/Link';
import Button from './components/Button';

const images = [
  {
    url: "/jed's mom.jpg",
    title: "Professional Life",
    description: ""
  },
  {
    url: "/flyer.jpg",
    title: "Woman Commisioner",
    description: ""
  },
  {
    url: "/recieving award.jpg",
    title: "Recieving  Award",
    description: ""
  },
  {
    url: "/in a meeting.jpg",
    title: "Admist Friends",
    description: ""
  },
  {
    url: "/with friends.jpg",
    title: "Admist co-workers",
    description: ""
  },
 
];

const pages = [
  {
    url: '/jed\'s mom2.jpg',
    clientName: 'HON. Ps Love Tagoe',
    clientTitle: '(Deputy Women\'s Commisioner U.N)',
    heroTag: 'Introducing To You Ms. LOVE TAGOE',
    heroHead: 'Born on a Sunday in the year 1978 on April 23.',
    heroText: 'Nationality, Ghanaian. Born to Mr Jonas Tagoe and Mrs Joyce Tagoe and was raised in Accra Osu with Three siblings. She has three children.',
  }
];

const App = () => {
  const [aboutActive, setAboutActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (link) => {
    if (link === 'contact') {
      setCurrentPage(1);
      setNavbarVisible(false);
      setAboutActive(false);
      setMenuOpen(false);
    } else {
      setCurrentPage(0);
      setNavbarVisible(true);
      setAboutActive(false);
      setMenuOpen(false);
    }
    const targetSection = document.getElementById(link);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    setAboutActive(!aboutActive);
    setMenuOpen(false);
    const aboutSection = document.getElementById('about-section');
    if(aboutSection && aboutSection.style.opacity !== "0"){
      const aboutRect = aboutSection.getBoundingClientRect();
      if(aboutRect.top < 0 || aboutRect.bottom > window.innerHeight){
        window.scrollTo({
          top: aboutSection.offsetTop - 100,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleGalleryScroll = () => {
    setAboutActive(false);
    setMenuOpen(false);
    setTimeout(() => {
      const galleryElement = document.getElementById('gallery');
      if (galleryElement) {
        const galleryRect = galleryElement.getBoundingClientRect();
        if(galleryRect.top < 0 || galleryRect.bottom > window.innerHeight){
          window.scrollTo({
            top: galleryElement.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }
    }, 500);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="container">
        {aboutActive && (
          <div className="overlay"></div>
        )}

        {/* Mobile Navbar */}
        {isMobile && (
          <div id="mobile-navbar" className="mobile-navbar">
            <h1 id="logo"><span className='logo'>L.</span> Tagoe</h1>
            <button className="menu-toggle" onClick={toggleMenu}>
              ☰
            </button>
            {menuOpen && (
              <div className="mobile-menu">
                <Link link="Home" class="mobile-nav-link" onClick={() => handleNavClick('home')} />
                <Link link="Gallery" class="mobile-nav-link" onClick={handleGalleryScroll} />
                <Button btn="About" class={`mobile-nav-link ${aboutActive ? 'active' : ''}`} onClick={handleAboutClick} />
                <Link link="Contact" class="mobile-nav-link" onClick={() => handleNavClick('contact')} />
              </div>
            )}
          </div>
        )}

        {/* Desktop Navbar */}
        {!isMobile && navbarVisible && (
          <div id="navbar" className="desktop-navbar">
            <h1 id="logo"><span className='logo'>L.</span> Tagoe</h1>
            <nav className="navbar">
              <ul className="nav-links">
                <li className="nav-item">
                  <div className='nav-top'></div>
                  <Link link="Home" class="nav-link" onClick={() => handleNavClick('home')} />
                </li>
                <li className="nav-item">
                  <div className='nav-top'></div>
                  <Link link="Gallery" class="nav-link" onClick={handleGalleryScroll} />
                </li>
                <li className="nav-item">
                  <div className='nav-top'></div>
                  <Button btn="About" class={`nav-btn nav-link ${aboutActive ? 'active' : ''}`} onClick={handleAboutClick} />
                </li>
                <li className="nav-item">
                  <div className='nav-top'></div>
                  <Link link="Contact" class="nav-link" onClick={() => handleNavClick('contact')} />
                </li>
              </ul>
            </nav>
          </div>
        )}

        <div id="pagination" className='page-wrapper'>
          {/* Hero Section */}
          <section id="about-section" className={`page hero ${currentPage === 0 ? 'page-content active' : 'page-content'}`}>
            <div className='hero-container'>
              <div className='hero-profile'>
                <img className='profile-img' src={pages[0].url} alt="Profile Picture" />
                <h4>{pages[0].clientName}</h4>
                <h5>{pages[0].clientTitle}</h5>
              </div>
              <div className={`hero-text ${aboutActive ? 'highlighted' : ''}`}>
                <p className='hero-tag'>{pages[0].heroTag} <span className='hero-bond'></span></p>
                <p className='l-head'>{pages[0].heroHead}</p>
                <p className='m-head'>{pages[0].heroText}</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          {currentPage === 1 && (
            <section className={`page contact-page ${currentPage === 1 ? 'active' : ''}`}>
              <div id="contact" className="contact-container">
                <h4>Contact Form</h4>
                <form className='contact-form'>
                  <div className='form-group'>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter your name" />
                  </div>
                  <div className='form-group'>
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" />
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

        {!isMobile && (
          <div className="navigation-controls">
            <button className="prev-btn" onClick={() => setCurrentPage(0)}>
              <span className='dot'></span>
            </button>
            <button className="next-btn" onClick={() => setCurrentPage(1)}>
              <span className='dot'></span>
            </button>
          </div>
        )}

        {/* Gallery Section */}
        <section id="gallery" className="life-journey">
          <h2 className="section-title">Gallery</h2>
          <Slideshow images={images} isMobile={isMobile} />
        </section>


        <section id="quote">
          <div className='quote'>
            <h2 className='section-title'>Biblical Quote</h2>
            <p className='quote-text'>So do not fear for I am with you, do not be dismayed for I am your God I will strengthen you and help you. I will uphold you with my righteous right Hand. Amen!</p>
            <small className='quoted'>Isaiah 41:10</small>
          </div>
        </section>
      </div>

      <footer>
        <div className='footer-container'>
          <div className='logo'>
            <h1 id="logo"><span className='logo'>L.</span> Tagoe</h1>
          </div>
          <div className='footer-lists'>
            <div className='footer-child'>
              <h4>Reach Out</h4>
              <ul>
                <li><Link href="tel: +233545508197" link="Call me"/></li>
                <li><Link href="mailto: Itagoe92@yahoo.com" link="Email me"/></li>
                <li><Link href="https://wa.me/+233545508197" link="What's App"/></li>
              </ul>
            </div>
            {!isMobile && (
              <div className='footer-child'>
                <h4>Links</h4>
                <ul>
                  <li><Link href="#" link="Home"/></li>
                  <li><Link href="#gallery" link="Gallery"/></li>
                  <li><Link href="#contact" link="Contact"/></li>
                </ul>
              </div>
            )}
          </div>
        </div>
     
        <center><p className='footer-text'>Copyright&copy; Love Tagoe @{new Date().getFullYear()}</p></center>
      </footer>
    </>
  );
};

export default App;