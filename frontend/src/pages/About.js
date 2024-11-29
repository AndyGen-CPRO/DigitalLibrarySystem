import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Sidebar */}
      <nav className="about-sidebar">
        <ul>
          <li><a href="#introduction01">Introduction</a></li>
          <li><a href="#mission02">Mission</a></li>
          <li><a href="#vision03">Vision</a></li>
          <li><a href="#team">The Team</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="about-content">
        <section id="introduction01" className="mb-5">
          <h1>Welcome to Ebook Hub!</h1>
          <p>
            At Ebook Hub, we believe that reading is a journey that should be accessible to everyone. Our mission is to provide a digital sanctuary for book lovers, where you can explore a vast collection of ebooks that inspire, educate, and entertain.
          </p>
        </section>

        <section id="mission02" className="mb-5">
          <h1>Mission</h1>
          <p>
            To provide a user-friendly digital platform that offers a wide range of ebooks, enabling readers from all backgrounds to access, explore, and enjoy the world of literature. We aim to foster a culture of reading by bridging the gap between technology and literature.
          </p>
        </section>

        <section id="vision03" className="mb-5">
          <h1>Vision</h1>
          <p>
            To become a global leader in digital reading by creating an inclusive platform that connects readers to the books they love. We envision a world where everyone has easy access to quality literature, empowering them to grow, learn, and be entertained.
          </p>
        </section>

        <section id="team" className="mb-5">
          <h1>The Team</h1>
          <p>
            Meet our passionate team of professionals dedicated to making Ebook Hub the best place for digital reading.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
