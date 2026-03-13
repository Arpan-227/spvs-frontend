import { Link } from 'react-router-dom'
import SchoolLogo from './SchoolLogo'

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        {/* Brand */}
        <div>
          <div className="foot-brand-row">
            <div className="foot-logo"><SchoolLogo size={54} /></div>
            <div>
              <div className="foot-sn">Sant Pathik Vidyalaya</div>
              <div className="foot-st">CBSE Affiliated · Est. 1987</div>
            </div>
          </div>
          <p className="foot-desc">
            A co-educational Day & Boarding Senior Secondary School committed to education with values and excellence since 1987 in Pashupati Nagar, Bahraich, UP.
          </p>
          <div className="foot-motto">✨ "Work is Worship"</div>
          <div className="foot-soc">
            <a className="fsoc" href="#" aria-label="Facebook">f</a>
            <a className="fsoc" href="#" aria-label="YouTube">▶</a>
            <a className="fsoc" href="#" aria-label="Instagram">In</a>
            <a className="fsoc" href="https://wa.me/919198783830" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">W</a>
          </div>

          {/* Welltechup branding */}
          <a href="https://www.welltechup.com" target="_blank" rel="noopener noreferrer"
            style={{marginTop:'20px',display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',borderRadius:'12px',background:'rgba(108,63,197,.12)',border:'1px solid rgba(108,63,197,.25)',textDecoration:'none',transition:'all .25s',width:'fit-content'}}
            onMouseEnter={function(e){e.currentTarget.style.background='rgba(108,63,197,.22)';e.currentTarget.style.borderColor='rgba(155,89,245,.5)';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={function(e){e.currentTarget.style.background='rgba(108,63,197,.12)';e.currentTarget.style.borderColor='rgba(108,63,197,.25)';e.currentTarget.style.transform='none'}}>
            <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'linear-gradient(135deg,#6C3FC5,#9B59F5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'900',color:'#fff',flexShrink:0,boxShadow:'0 4px 12px rgba(108,63,197,.4)'}}>W</div>
            <div>
              <div style={{fontSize:'10px',fontWeight:'700',color:'rgba(255,255,255,.5)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'2px'}}>Designed &amp; Developed by</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'15px',fontWeight:'700',background:'linear-gradient(135deg,#B57BFF,#9B59F5)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',letterSpacing:'.4px'}}>Welltechup <span style={{fontSize:'10px',WebkitTextFillColor:'rgba(155,89,245,.6)'}}>↗</span></div>
            </div>
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <div className="foot-col-h">Quick Links</div>
          <ul className="foot-ul">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About School</Link></li>
            <li><Link to="/about#vision">Vision &amp; Mission</Link></li>
            <li><Link to="/about#principal">Principal's Message</Link></li>
            <li><Link to="/about#faculty">Our Faculty</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/facilities">Facilities</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/why-choose-us">Why Choose Us</Link></li>
            <li><Link to="/alumni">Alumni</Link></li>
            <li><Link to="/campus-life">Campus Life</Link></li>
            <li><Link to="/campus-life?tab=jobs">Jobs &amp; Careers</Link></li>
            <li><Link to="/mandatory-disclosure">Mandatory Disclosure</Link></li>
          </ul>
        </div>

        {/* Academics */}
        <div>
          <div className="foot-col-h">Academics</div>
          <ul className="foot-ul">
            <li><Link to="/academics">Classes (PG – XII)</Link></li>
            <li><Link to="/academics#science">Science Stream</Link></li>
            <li><Link to="/academics#commerce">Commerce Stream</Link></li>
            <li><Link to="/academics#humanities">Humanities Stream</Link></li>
            <li><Link to="/academics/fees">Fee Structure</Link></li>
            <li><Link to="/downloads">Certificates</Link></li>
            <li><Link to="/blog">Updates &amp; News</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="foot-col-h">Contact Us</div>
          <ul className="foot-ul" style={{marginBottom:'18px'}}>
            <li><a href="tel:+919198783830">+91 9198783830</a></li>
            <li><a href="tel:+918318842325">+91 8318842325 (Principal)</a></li>
            <li><a href="mailto:spvbrh@gmail.com">spvbrh@gmail.com</a></li>
            <li><span style={{color:'rgba(255,255,255,.85)'}}>Pashupati Nagar, Bahraich UP 271802</span></li>
          </ul>
          <div className="foot-col-h" style={{marginTop:'20px'}}>Newsletter</div>
          <div className="nl-row">
            <input className="nl-inp" type="email" placeholder="Your email..." />
            <button className="nl-btn">Subscribe</button>
          </div>
          <div className="foot-acts">
            <Link className="fa fa1" to="/contact">📋 Apply Now</Link>
            <a className="fa fa2" href="https://wa.me/919198783830" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="foot-bot">
        <div className="foot-copy">
          © {new Date().getFullYear()} Sant Pathik Vidyalaya. All rights reserved. CBSE Affiliation No. 2130176
        </div>
        <div className="foot-bl">
          <Link to="/mandatory-disclosure">Mandatory Disclosure</Link>
          <Link to="/contact">Admission Policy</Link>
          <Link to="/about">Privacy Policy</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>

      <style>{`
        .foot-bot {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 16px 32px;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .foot-copy {
          font-size: 12px;
          color: rgba(255,255,255,.45);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }
        .foot-bl {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 16px;
          align-items: center;
        }
        .foot-bl a {
          font-size: 12px;
          color: rgba(255,255,255,.45);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: color .2s;
          white-space: nowrap;
        }
        .foot-bl a:hover { color: #E8761A; }

        @media (max-width: 640px) {
          .foot-bot {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 18px;
            gap: 14px;
          }
          .foot-copy {
            font-size: 11.5px;
            line-height: 1.75;
            color: rgba(255,255,255,.5);
          }
          .foot-bl {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 16px;
            width: 100%;
          }
          .foot-bl a {
            font-size: 12px;
            padding: 6px 10px;
            border-radius: 8px;
            background: rgba(255,255,255,.05);
            border: 1px solid rgba(255,255,255,.08);
            text-align: center;
            color: rgba(255,255,255,.55);
          }
        }
      `}</style>
    </footer>
  )
}