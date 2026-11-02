import React from 'react';

export default function Portfolio({ onBackToDashboard }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f5', color: '#222', lineHeight: '1.6', minHeight: '100vh' }}>
      
      {/* Floating Back to Dashboard Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        <button 
          onClick={onBackToDashboard || (() => window.location.href = '/')}
          style={{
            background: '#222',
            color: '#fff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 8%',
        background: 'white',
        borderBottom: '1px solid #ddd',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontSize: '25px', fontWeight: 'bold' }}>YD</div>
        <div style={{ display: 'flex', gap: '25px' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Home</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>About</a>
          <a href="#skills" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Skills</a>
          <a href="#projects" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Projects</a>
          <a href="#journey" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Education</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#222', fontWeight: 500 }}>Contact</a>
        </div>
      </nav>

      {/* Home / Hero */}
      <section id="home" style={{
        minHeight: '85vh',
        maxWidth: '1100px',
        margin: 'auto',
        padding: '50px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '50px',
        flexWrap: 'wrap'
      }}>
        <div style={{ maxWidth: '650px', flex: 1 }}>
          <p style={{ fontSize: '20px', color: '#666', margin: 0 }}>Hello, I'm</p>
          <h1 style={{ fontSize: '55px', margin: '10px 0', color: '#111' }}>Yash Dekate</h1>
          <h2 style={{ fontSize: '22px', fontWeight: 'normal', marginBottom: '20px', color: '#555' }}>
            Aspiring Software Developer | Problem Solver | Tech Enthusiast
          </h2>
          <p style={{ fontSize: '16px', color: '#444' }}>
            I am a B.Tech student interested in Artificial Intelligence,
            Data Science, Machine Learning and Software Development.
            I enjoy solving problems and building useful projects.
          </p>
          <div style={{ marginTop: '25px' }}>
            <a 
              href="#projects" 
              style={{
                display: 'inline-block',
                padding: '11px 22px',
                marginRight: '12px',
                border: '1px solid #222',
                borderRadius: '5px',
                textDecoration: 'none',
                color: '#222',
                fontWeight: 'bold',
                transition: '0.3s'
              }}
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              style={{
                display: 'inline-block',
                padding: '11px 22px',
                border: '1px solid #222',
                borderRadius: '5px',
                textDecoration: 'none',
                color: '#fff',
                background: '#222',
                fontWeight: 'bold',
                transition: '0.3s'
              }}
            >
              Contact Me
            </a>
          </div>
        </div>

        <div style={{ width: '300px', textAlign: 'center' }}>
          <img 
            src="/pr3/Photo.jpeg" 
            alt="Yash Dekate" 
            style={{
              width: '280px',
              height: '280px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '5px solid white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}
          />
        </div>
      </section>

      {/* About */}
      <section id="about" style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '50px 35px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '25px', borderLeft: '5px solid #222', paddingLeft: '15px' }}>About Me</h2>
        <p style={{ fontSize: '17px', marginBottom: '15px', color: '#555' }}>
          I am passionate about technology and programming. I enjoy
          learning new concepts, solving coding problems and developing
          projects that improve my technical skills.
        </p>
        <p style={{ fontSize: '17px', marginBottom: '15px', color: '#555' }}>
          Currently, I am focusing on programming, Data Structures,
          Machine Learning, Artificial Intelligence and Flutter
          App Development.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '30px' }}>
          {['💻 Coding', '📱 App Development', '🤖 AI & ML', '📚 Learning', '📖 Reading'].map((interest, i) => (
            <span key={i} style={{ padding: '10px 18px', background: '#f1f1f1', borderRadius: '20px', fontSize: '14px', fontWeight: 500 }}>
              {interest}
            </span>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '50px 35px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '25px', borderLeft: '5px solid #222', paddingLeft: '15px' }}>Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
          <div style={{ padding: '25px', background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Programming</h3>
            <p style={{ padding: '6px 0', color: '#555' }}>C</p>
            <p style={{ padding: '6px 0', color: '#555' }}>Python</p>
            <p style={{ padding: '6px 0', color: '#555' }}>Java</p>
          </div>
          <div style={{ padding: '25px', background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Development</h3>
            <p style={{ padding: '6px 0', color: '#555' }}>HTML & CSS</p>
            <p style={{ padding: '6px 0', color: '#555' }}>Flutter App Development</p>
            <p style={{ padding: '6px 0', color: '#555' }}>React & JavaScript</p>
          </div>
          <div style={{ padding: '25px', background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Technologies</h3>
            <p style={{ padding: '6px 0', color: '#555' }}>Machine Learning</p>
            <p style={{ padding: '6px 0', color: '#555' }}>Data Science</p>
            <p style={{ padding: '6px 0', color: '#555' }}>Git & GitHub</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '50px 35px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '25px', borderLeft: '5px solid #222', paddingLeft: '15px' }}>Projects</h2>
        
        <div style={{ padding: '25px', marginBottom: '20px', background: '#fafafa', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>Sign Language Recognition</h3>
          <p style={{ color: '#555' }}>
            A machine learning project that recognizes sign language
            gestures using computer vision and machine learning
            techniques.
          </p>
          <p style={{ marginTop: '15px', fontSize: '14px', fontWeight: 'bold', color: '#222' }}>
            Python | OpenCV | MediaPipe | SVM
          </p>
        </div>

        <div style={{ padding: '25px', marginBottom: '20px', background: '#fafafa', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>Loan Approval System</h3>
          <p style={{ color: '#555' }}>
            A machine learning based system that predicts whether a
            loan application should be approved based on applicant
            information and financial factors.
          </p>
          <p style={{ marginTop: '15px', fontSize: '14px', fontWeight: 'bold', color: '#222' }}>
            Python | Machine Learning | Pandas | Scikit-learn
          </p>
        </div>
      </section>

      {/* My Journey */}
      <section id="journey" style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '50px 35px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '25px', borderLeft: '5px solid #222', paddingLeft: '15px' }}>My Journey</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
          
          <div style={{ padding: '30px', background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', padding: '6px 12px', background: '#222', color: 'white', borderRadius: '20px' }}>2024 - 2028</span>
              <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#ddd' }}>01</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>B.Tech - Information Technology</h3>
            <p style={{ color: '#555', marginBottom: '15px' }}>
              Currently in 5th semester at St. Vincent Pallotti College of Engineering & Technology, Nagpur.
              Focusing on core AI concepts, data structures, and software engineering principles.
            </p>
            <strong style={{ fontSize: '15px', color: '#111' }}>CGPA: 7.90</strong>
          </div>

          <div style={{ padding: '30px', background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', padding: '6px 12px', background: '#222', color: 'white', borderRadius: '20px' }}>2022 - 2024</span>
              <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#ddd' }}>02</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>12th Standard (HSC)</h3>
            <p style={{ color: '#555', marginBottom: '15px' }}>
              Completed higher secondary education with a focus on Physics, Chemistry, Mathematics, and Biology.
            </p>
            <strong style={{ fontSize: '15px', color: '#111' }}>Result: 69.80%</strong>
          </div>

          <div style={{ padding: '30px', background: '#f8f8f8', border: '1px solid #ddd', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', padding: '6px 12px', background: '#222', color: 'white', borderRadius: '20px' }}>2020 - 2022</span>
              <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#ddd' }}>03</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>10th Standard (SSC)</h3>
            <p style={{ color: '#555', marginBottom: '15px' }}>
              Completed secondary school education with a strong foundation in science and mathematics.
            </p>
            <strong style={{ fontSize: '15px', color: '#111' }}>Result: 78.50%</strong>
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '50px 35px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.06)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '15px', borderLeft: 'none' }}>Let's Connect!</h2>
        <p style={{ fontSize: '17px', color: '#555', marginBottom: '25px' }}>
          Interested in working together or just want to say hello?
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a 
            href="mailto:yashdekate312@gmail.com" 
            style={{ padding: '12px 25px', background: '#f1f1f1', borderRadius: '30px', textDecoration: 'none', color: '#222', fontWeight: 'bold', border: '1px solid #ccc' }}
          >
            📧 Email
          </a>
          <a 
            href="https://www.linkedin.com/in/yash-dekate-a210a2358" 
            target="_blank" 
            rel="noreferrer"
            style={{ padding: '12px 25px', background: '#0a66c2', color: '#fff', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' }}
          >
            💼 LinkedIn
          </a>
          <a 
            href="https://github.com/YashDekate19" 
            target="_blank" 
            rel="noreferrer"
            style={{ padding: '12px 25px', background: '#24292e', color: '#fff', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' }}
          >
            💻 GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#222', color: 'white', textAlign: 'center', padding: '25px', marginTop: '50px' }}>
        <p style={{ margin: 0, fontSize: '15px' }}>© 2026 Yash Dekate. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
