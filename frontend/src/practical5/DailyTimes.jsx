import React from 'react';

export default function DailyTimes({ onBackToDashboard }) {
  return (
    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', background: '#ffffff', color: '#111', minHeight: '100vh' }}>
      
      {/* Floating Back to Dashboard Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        <button 
          onClick={onBackToDashboard || (() => window.location.href = '/')}
          style={{
            background: '#b00000',
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
            gap: '8px',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <header style={{
        width: '90%',
        maxWidth: '1200px',
        margin: 'auto',
        height: '65px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc'
      }}>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#555' }}>
          Mumbai | 28 September 2026
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '1px' }}>
          THE DAILY TIMES
        </div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#555' }}>
          ☀ 28°C &nbsp; Mumbai
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        borderBottom: '1px solid #bbb',
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center',
        gap: '25px',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px',
        flexWrap: 'wrap'
      }}>
        {['Home', 'India', 'World', 'Sports', 'Economy', 'Tech', 'Health', 'Opinion', 'Science', 'Premium'].map((item, i) => (
          <a key={i} href="#" style={{ textDecoration: 'none', color: '#111', fontWeight: 500 }}>{item}</a>
        ))}
      </nav>

      {/* Breaking News */}
      <div style={{
        width: '90%',
        maxWidth: '1200px',
        margin: '10px auto',
        padding: '8px',
        background: '#f5f5f5',
        borderLeft: '4px solid #b00000',
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px'
      }}>
        <b style={{ color: '#b00000' }}>BREAKING:</b> Latest news and important updates from around the world
      </div>

      {/* Main Container */}
      <div style={{
        width: '90%',
        maxWidth: '1200px',
        margin: '20px auto',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gap: '20px'
      }}>

        {/* LEFT COLUMN */}
        <aside style={{ borderRight: '1px solid #ccc', paddingRight: '15px' }}>
          <h3 style={{ color: '#b00000', borderBottom: '2px solid #b00000', paddingBottom: '7px', marginBottom: '10px', fontSize: '18px' }}>NEWS</h3>

          <div style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <h4 style={{ fontSize: '14px', margin: 0 }}>Global markets show positive movement</h4>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', marginTop: '5px' }}>Markets continue to react to latest economic updates.</p>
          </div>

          <div style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <h4 style={{ fontSize: '14px', margin: 0 }}>New education policy announced</h4>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', marginTop: '5px' }}>Schools and colleges prepare for new changes.</p>
          </div>

          <div style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <h4 style={{ fontSize: '14px', margin: 0 }}>Heavy rainfall affects several regions</h4>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', marginTop: '5px' }}>Authorities issue advisory to citizens.</p>
          </div>

          <div style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <h4 style={{ fontSize: '14px', margin: 0 }}>Supreme Court gives important ruling</h4>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', marginTop: '5px' }}>Latest developments from the court.</p>
          </div>

          <img src="https://picsum.photos/250/150?random=1" alt="News" style={{ width: '100%', marginTop: '15px', borderRadius: '4px' }} />

          <h4 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '5px' }}>Latest National Updates</h4>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#666' }}>
            Important developments from different parts of the country.
          </p>
        </aside>

        {/* CENTER CONTENT */}
        <main>
          <div style={{ borderTop: '1px solid #aaa', borderBottom: '1px solid #aaa', textAlign: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', color: '#b00000', padding: '5px', margin: 0 }}>News</h2>
          </div>

          {/* Main Story */}
          <article>
            <img src="https://picsum.photos/600/300?random=2" alt="Tata Trusts" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <h1 style={{ fontSize: '24px', marginTop: '10px', marginBottom: '8px' }}>
              Tata Trusts proposes new reforms to strengthen development
            </h1>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#555', marginTop: '7px', lineHeight: '1.5' }}>
              Major developments were announced today as organizations discussed new initiatives and future plans.
            </p>
          </article>

          {/* Two News */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px', paddingBottom: '15px' }}>
            <article style={{ borderTop: '1px solid #aaa', paddingTop: '10px' }}>
              <img src="https://picsum.photos/300/170?random=3" alt="Infrastructure" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3 style={{ fontSize: '15px', marginTop: '8px', marginBottom: '4px' }}>New infrastructure projects announced</h3>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Several new projects are expected to begin soon.</p>
            </article>

            <article style={{ borderTop: '1px solid #aaa', paddingTop: '10px' }}>
              <img src="https://picsum.photos/300/170?random=4" alt="Police Advisory" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3 style={{ fontSize: '15px', marginTop: '8px', marginBottom: '4px' }}>Police issue new public advisory</h3>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Citizens are advised to remain alert.</p>
            </article>
          </div>

          {/* India Section */}
          <div style={{ borderTop: '1px solid #aaa', borderBottom: '1px solid #aaa', textAlign: 'center', margin: '20px 0 12px' }}>
            <h2 style={{ fontSize: '20px', color: '#b00000', padding: '5px', margin: 0 }}>India</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <article>
              <img src="https://picsum.photos/300/170?random=5" alt="India project" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3 style={{ fontSize: '15px', marginTop: '8px', marginBottom: '4px' }}>New development projects announced</h3>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Government announces new initiatives.</p>
            </article>

            <article>
              <img src="https://picsum.photos/300/170?random=6" alt="Education" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3 style={{ fontSize: '15px', marginTop: '8px', marginBottom: '4px' }}>Education sector sees major changes</h3>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>New programs introduced across institutions.</p>
            </article>

            <article>
              <img src="https://picsum.photos/300/170?random=7" alt="Business" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3 style={{ fontSize: '15px', marginTop: '8px', marginBottom: '4px' }}>Business activity increases</h3>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Markets record positive movement.</p>
            </article>

            <article>
              <img src="https://picsum.photos/300/170?random=8" alt="Tech" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3 style={{ fontSize: '15px', marginTop: '8px', marginBottom: '4px' }}>New technology initiative launched</h3>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Technology will improve public services.</p>
            </article>
          </div>

          {/* World Section */}
          <div style={{ borderTop: '1px solid #aaa', borderBottom: '1px solid #aaa', textAlign: 'center', margin: '25px 0 12px' }}>
            <h2 style={{ fontSize: '20px', color: '#b00000', padding: '5px', margin: 0 }}>World</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <article>
              <img src="https://picsum.photos/300/170?random=9" alt="World Leaders" style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
              <h4 style={{ fontSize: '13px', marginTop: '6px', marginBottom: '3px' }}>Global leaders discuss major issues</h4>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Important discussions continue worldwide.</p>
            </article>

            <article>
              <img src="https://picsum.photos/300/170?random=10" alt="Markets" style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
              <h4 style={{ fontSize: '13px', marginTop: '6px', marginBottom: '3px' }}>International markets remain active</h4>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Markets respond to latest developments.</p>
            </article>

            <article>
              <img src="https://picsum.photos/300/170?random=11" alt="Agreement" style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
              <h4 style={{ fontSize: '13px', marginTop: '6px', marginBottom: '3px' }}>New international agreement announced</h4>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666', margin: 0 }}>Countries discuss cooperation and development.</p>
            </article>
          </div>

        </main>

        {/* RIGHT COLUMN */}
        <aside style={{ borderLeft: '1px solid #ccc', paddingLeft: '15px' }}>
          <div style={{ marginBottom: '25px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', color: '#999', margin: '0 0 5px' }}>ADVERTISEMENT</p>
            <img src="https://picsum.photos/250/250?random=12" alt="Ad" style={{ width: '100%', borderRadius: '4px' }} />
          </div>

          <h3 style={{ color: '#b00000', borderBottom: '2px solid #b00000', paddingBottom: '7px', marginBottom: '15px', fontSize: '18px' }}>
            Most Popular
          </h3>

          {[
            { num: "01", text: "Latest technology trends around the world" },
            { num: "02", text: "Major changes announced today" },
            { num: "03", text: "Top stories from India" },
            { num: "04", text: "Important business updates" },
            { num: "05", text: "Sports world reacts to latest news" }
          ].map((pop, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <b style={{ color: '#b00000', fontSize: '18px' }}>{pop.num}</b>
              <p style={{ margin: 0, fontSize: '13px', fontFamily: 'Arial, sans-serif', lineHeight: '1.4' }}>{pop.text}</p>
            </div>
          ))}
        </aside>

      </div>

      {/* More Stories */}
      <section style={{ width: '90%', maxWidth: '1200px', margin: '40px auto 20px', borderTop: '2px solid #111', paddingTop: '20px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>More Stories from News</h2>
        
        {[
          { img: "https://picsum.photos/180/110?random=13", title: "Top news of the day", desc: "Important updates from India and around the world. Read the latest headlines and stories." },
          { img: "https://picsum.photos/180/110?random=14", title: "Morning News", desc: "Today's major headlines and important developments." },
          { img: "https://picsum.photos/180/110?random=15", title: "Business and Technology", desc: "Latest updates from the business and technology sectors." }
        ].map((story, i) => (
          <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
            <img src={story.img} alt={story.title} style={{ width: '150px', height: '90px', objectFit: 'cover' }} />
            <div>
              <h3 style={{ fontSize: '17px', margin: '0 0 6px' }}>{story.title}</h3>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#555', margin: 0 }}>{story.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ background: '#111', color: '#fff', textAlign: 'center', padding: '30px 20px', marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', letterSpacing: '1px', margin: '0 0 10px' }}>THE DAILY TIMES</h2>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#aaa', margin: '0 0 10px' }}>
          Home | India | World | Sports | Technology | Business | Contact
        </p>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#777', margin: 0 }}>© 2026 The Daily Times. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
