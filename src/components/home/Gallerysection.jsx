import { useState } from 'react'
import { Link } from 'react-router-dom'

const CATS = ['All', 'Events', 'Sports Day', 'Annual Function', 'Activities']

const ITEMS = [
  { cat:'Events',          em:'🎉', lbl:'Independence Day Celebration' },
  { cat:'Sports Day',      em:'🏃', lbl:'District Sports Champions'    },
  { cat:'Annual Function', em:'🎭', lbl:'Annual Function 2024'         },
  { cat:'Activities',      em:'🎨', lbl:'Art & Craft Exhibition'       },
  { cat:'Events',          em:'📚', lbl:'Science Exhibition'           },
  { cat:'Sports Day',      em:'🏆', lbl:'Kabaddi Champions'            },
  { cat:'Activities',      em:'🎵', lbl:'Music Competition'            },
  { cat:'Annual Function', em:'🌟', lbl:'Prize Distribution Ceremony'  },
]

const COLORS = [
  'linear-gradient(135deg,#FFF3CC,#FFD94A)',
  'linear-gradient(135deg,#FFE0A0,#E8761A33)',
  'linear-gradient(135deg,#FFF8DC,#F5B80033)',
  'linear-gradient(135deg,#FEF0D4,#FF9A3C33)',
  'linear-gradient(135deg,#FFF3E0,#FFBB7A33)',
]

export default function GallerySection() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.cat === active)

  return (
    <section className="sect" style={{background:'var(--bg)'}}>
      <div className="s-cont">

        {/* Header */}
        <div className="gallery-header rv">
          <div>
            <div className="chip"><span className="chip-dot"></span>Gallery</div>
            <h2 className="sec-title">Life at <span className="hl">SPVS</span></h2>
            <div className="s-bar" style={{marginBottom:0}}></div>
          </div>
          <Link to="/gallery" className="btn-out gallery-view-btn">View All Photos →</Link>
        </div>

        {/* Filter tabs */}
        <div className="gallery-filters rv">
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)} className={'gal-tab' + (active===c ? ' gal-tab-act' : '')}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid — NO rv3d on items (causes opacity:0 bug) */}
        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <div key={i} className="gallery-item" style={{
              transitionDelay: `${(i%4)*0.07}s`,
              background: COLORS[i % COLORS.length],
            }}>
              <div className="gallery-item-inner">
                <div className="gallery-em">{item.em}</div>
                <div className="gallery-lbl">{item.lbl}</div>
                <div className="gallery-cat">{item.cat}</div>
              </div>
              <div className="gi-ov">
                <span>{item.lbl}</span>
              </div>
            </div>
          ))}

          {/* View all tile — desktop only, hidden on mobile */}
          <div className="gallery-more">
            <div style={{fontSize:'32px',marginBottom:'8px'}}>📷</div>
            <Link to="/gallery" style={{fontSize:'13px',fontWeight:'700',color:'var(--gd2)',textDecoration:'none'}}>View All →</Link>
          </div>
        </div>

        {/* Mobile-only button — sits below grid with clear spacing */}
        <div className="gallery-mob-btn">
          <Link to="/gallery" className="btn-or" style={{width:'100%',justifyContent:'center'}}>
            📷 View Full Gallery →
          </Link>
        </div>

      </div>

      <style>{`
        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .gallery-view-btn { flex-shrink: 0; }
        .gallery-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .gal-tab {
          padding: 7px 16px;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all .25s;
          background: transparent;
          color: var(--txt2);
          border: 1.5px solid rgba(232,118,26,.2);
        }
        .gal-tab-act {
          background: var(--or);
          color: #fff;
          border-color: var(--or);
          box-shadow: 0 5px 18px var(--shd);
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 170px;
          gap: 12px;
        }
        .gallery-item {
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          border: 1.5px solid var(--brd);
          transition: all .4s cubic-bezier(.34,1.56,.64,1);
        }
        .gallery-item:hover {
          transform: scale(1.04);
          z-index: 10;
          box-shadow: 0 20px 50px var(--shd);
        }
        .gallery-item:hover .gi-ov { opacity: 1; }
        .gallery-item-inner {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; padding: 12px;
        }
        .gallery-em  { font-size: 36px; }
        .gallery-lbl { font-size: 12px; font-weight: 700; color: var(--txt2); text-align: center; line-height: 1.3; }
        .gallery-cat { font-size: 10px; font-weight: 700; color: var(--or); letter-spacing: 1px; text-transform: uppercase; background: rgba(232,118,26,.08); padding: 3px 10px; border-radius: 50px; }
        .gi-ov {
          position: absolute; inset: 0;
          background: linear-gradient(0deg,rgba(28,10,0,.75),transparent 55%);
          opacity: 0; transition: .3s;
          display: flex; align-items: flex-end; padding: 12px;
        }
        .gi-ov span { color: #fff; font-size: 12px; font-weight: 700; }
        .gallery-more {
          border-radius: 16px;
          background: linear-gradient(135deg,var(--dark),var(--dark2));
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          cursor: pointer;
          border: 1.5px solid rgba(245,184,0,.15);
        }
        /* Mobile button hidden on desktop */
        .gallery-mob-btn { display: none; }

        /* Tablet */
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 150px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .gallery-header    { flex-direction: column; align-items: flex-start; gap: 12px; }
          .gallery-view-btn  { display: none; }
          .gallery-filters   { gap: 6px; }
          .gal-tab           { font-size: 11.5px; padding: 6px 12px; }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 130px;
            gap: 8px;
          }
          .gallery-em  { font-size: 28px; }
          .gallery-lbl { font-size: 11px; }

          /* Hide the dark "View All" tile inside grid on mobile */
          .gallery-more { display: none !important; }

          /* Show button below grid with clear gap */
          .gallery-mob-btn {
            display: flex;
            margin-top: 16px;
            padding: 0 2px;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 110px;
            gap: 6px;
          }
          .gallery-em  { font-size: 24px; }
          .gallery-lbl { font-size: 10px; }
          .gallery-cat { font-size: 9px; }
          .gal-tab     { font-size: 11px; padding: 5px 10px; }
        }
      `}</style>
    </section>
  )
}