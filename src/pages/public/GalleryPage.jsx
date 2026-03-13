import { useState, useCallback } from 'react'
import GalleryFilter from '../../components/gallery/GalleryFilter'
import GalleryGrid   from '../../components/gallery/GalleryGrid'
import Lightbox      from '../../components/gallery/Lightbox'

var PHOTOS = [
  { id:1,  cat:'events',   title:'Annual Day Celebration 2024',       year:'2024', img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=85',  span:2 },
  { id:2,  cat:'events',   title:'Independence Day Parade',           year:'2024', img:'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=900&q=85',  span:1 },
  { id:3,  cat:'events',   title:'Republic Day Celebration',          year:'2024', img:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85',  span:1 },
  { id:4,  cat:'events',   title:'Science Exhibition 2024',           year:'2024', img:'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900&q=85',  span:1 },
  { id:5,  cat:'sports',   title:'Annual Sports Day 2024',            year:'2024', img:'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85',  span:2 },
  { id:6,  cat:'sports',   title:'Inter-School Cricket Tournament',   year:'2023', img:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&q=85',  span:1 },
  { id:7,  cat:'sports',   title:'Kabaddi Championship',              year:'2024', img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=85',  span:1 },
  { id:8,  cat:'sports',   title:'Badminton Inter-House Finals',      year:'2023', img:'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&q=85',  span:1 },
  { id:9,  cat:'labs',     title:'Physics Lab Practical Session',     year:'2024', img:'https://images.unsplash.com/photo-1532094349884-543559b4081c?w=900&q=85',  span:1 },
  { id:10, cat:'labs',     title:'Chemistry Lab Experiments',         year:'2024', img:'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=900&q=85',     span:2 },
  { id:11, cat:'labs',     title:'Biology Practical Class',           year:'2023', img:'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=85',  span:1 },
  { id:12, cat:'labs',     title:'Computer Lab Activity',             year:'2024', img:'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85',  span:1 },
  { id:13, cat:'campus',   title:'Morning Assembly',                  year:'2024', img:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=85',  span:2 },
  { id:14, cat:'campus',   title:'Library Reading Hour',              year:'2024', img:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=85',  span:1 },
  { id:15, cat:'campus',   title:'Smart Classroom Session',           year:'2023', img:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=85',  span:1 },
  { id:16, cat:'campus',   title:'School Campus — Pashupati Nagar',  year:'2024', img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=85',  span:1 },
  { id:17, cat:'cultural', title:'Classical Dance Performance',       year:'2024', img:'https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&q=85',     span:1 },
  { id:18, cat:'cultural', title:'Drama & Theatre Show',              year:'2024', img:'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=900&q=85',  span:2 },
  { id:19, cat:'cultural', title:'Singing & Music Contest',           year:'2023', img:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=85',  span:1 },
  { id:20, cat:'cultural', title:'Folk Dance Festival',               year:'2024', img:'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=85',  span:1 },
  { id:21, cat:'prize',    title:'Board Toppers Felicitation 2024',   year:'2024', img:'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=85',  span:2 },
  { id:22, cat:'prize',    title:'Merit Scholarship Award Ceremony',  year:'2024', img:'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=900&q=85',     span:1 },
  { id:23, cat:'prize',    title:'Sports Trophy Ceremony',            year:'2023', img:'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&q=85',  span:1 },
  { id:24, cat:'prize',    title:'Cultural Achievement Award Night',  year:'2024', img:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=85',  span:1 },
]

export default function GalleryPage() {
  var [activeCat, setActiveCat] = useState('all')
  var [search,    setSearch]    = useState('')
  var [lightbox,  setLightbox]  = useState(null)

  var filtered = PHOTOS.filter(function(p){
    var matchCat    = activeCat === 'all' || p.cat === activeCat
    var matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  var lbIdx = lightbox ? filtered.findIndex(function(p){ return p.id === lightbox.id }) : -1

  var openLightbox  = useCallback(function(photo){ setLightbox(photo) }, [])
  var closeLightbox = useCallback(function(){ setLightbox(null) }, [])
  var prevPhoto     = useCallback(function(){ if(lbIdx > 0) setLightbox(filtered[lbIdx-1]) }, [lbIdx, filtered])
  var nextPhoto     = useCallback(function(){ if(lbIdx < filtered.length-1) setLightbox(filtered[lbIdx+1]) }, [lbIdx, filtered])

  function handleCatChange(cat){
    setActiveCat(cat)
    setSearch('')
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  return (
    <>
      <style>{`
        .gp-stat-chip {
          padding: 13px 20px; border-radius: 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.09);
          backdrop-filter: blur(8px);
          min-width: 80px; text-align: center;
          transition: all .25s; cursor: default;
        }
        .gp-stat-chip:hover {
          background: rgba(232,118,26,.13);
          border-color: rgba(232,118,26,.32);
          transform: translateY(-2px);
        }
        .gp-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 14px;
          background: linear-gradient(135deg,#1C0A00,#3D1A00);
          color: #FFCF40; font-weight: 800; font-size: 14.5px;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(28,10,0,.22);
          border: 1.5px solid rgba(232,118,26,.22);
          transition: all .22s;
        }
        .gp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(28,10,0,.3); }

        @media (max-width: 480px) {
          .gp-hero-stats { gap: 8px !important; }
          .gp-stat-chip  { padding: 10px 14px; min-width: 64px; }
          .gp-stat-chip .stat-n { font-size: 18px !important; }
          .gp-stat-chip .stat-l { font-size: 9.5px !important; }
          .gp-grid-pad { padding: 28px 14px 60px !important; }
        }
      `}</style>

      <div style={{fontFamily:"'DM Sans',sans-serif",minHeight:'100vh',background:'#FFFDF8'}}>

        {/* ── HERO ── */}
        <section style={{background:'linear-gradient(135deg,#1C0A00 0%,#3D1A00 50%,#1C0A00 100%)',padding:'clamp(70px,10vw,110px) 24px clamp(60px,8vw,90px)',position:'relative',overflow:'hidden'}}>
          {/* BG orbs */}
          <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
            <div style={{position:'absolute',width:'520px',height:'520px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,118,26,.1),transparent 70%)',top:'-180px',right:'-150px'}} />
            <div style={{position:'absolute',width:'360px',height:'360px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,184,0,.07),transparent 70%)',bottom:'-100px',left:'-80px'}} />
            <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(232,118,26,.05) 1px,transparent 1px)',backgroundSize:'34px 34px'}} />
          </div>

          <div style={{maxWidth:'740px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
            {/* Chip */}
            <div className="chip" style={{background:'rgba(245,184,0,.1)',borderColor:'rgba(245,184,0,.25)',color:'#F5B800',display:'inline-flex',marginBottom:'20px',gap:'8px',alignItems:'center'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#F5B800',animation:'blink 2s infinite',flexShrink:0}} />
              School Life &amp; Memories
            </div>

            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(30px,5vw,58px)',fontWeight:'700',color:'#FFFDF8',margin:'0 0 14px',lineHeight:'1.15'}}>
              Our Photo{' '}
              <span style={{background:'linear-gradient(90deg,#E8761A,#F5B800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Gallery</span>
            </h1>

            {/* Divider line */}
            <div style={{display:'flex',alignItems:'center',gap:'12px',justifyContent:'center',marginBottom:'16px'}}>
              <div style={{height:'1.5px',width:'40px',background:'linear-gradient(90deg,transparent,rgba(232,118,26,.5))'}} />
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#E8761A'}} />
              <div style={{height:'1.5px',width:'40px',background:'linear-gradient(90deg,rgba(232,118,26,.5),transparent)'}} />
            </div>

            <p style={{fontSize:'clamp(13.5px,2vw,16.5px)',color:'rgba(255,220,150,.6)',lineHeight:'1.8',marginBottom:'40px',maxWidth:'480px',margin:'0 auto 40px'}}>
              Precious moments from classrooms, stages, fields and celebrations — the living story of Sant Pathik Vidyalaya.
            </p>

            {/* Stat chips */}
            <div className="gp-hero-stats" style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
              {[
                { n: PHOTOS.length+'+', l:'Photos'     },
                { n:'6',                l:'Categories' },
                { n:'2023–24',          l:'Sessions'   },
                { n:'1410+',            l:'Students'   },
              ].map(function(st){
                return (
                  <div key={st.l} className="gp-stat-chip">
                    <div className="stat-n" style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'#FFCF40',marginBottom:'4px',lineHeight:1}}>{st.n}</div>
                    <div className="stat-l" style={{fontSize:'10.5px',fontWeight:'700',color:'rgba(255,220,150,.4)',letterSpacing:'.7px',textTransform:'uppercase'}}>{st.l}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <GalleryFilter
          activeCat={activeCat}
          onCatChange={handleCatChange}
          search={search}
          onSearchChange={setSearch}
          photos={PHOTOS}
          filteredCount={filtered.length}
        />

        {/* ── PHOTO GRID ── */}
        <div className="gp-grid-pad" style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px 80px'}}>
          <GalleryGrid photos={filtered} onPhotoClick={openLightbox} />
        </div>

        {/* ── LIGHTBOX ── */}
        {lightbox && (
          <Lightbox
            photo={lightbox}
            photos={filtered}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}

        {/* ── BOTTOM CTA ── */}
        <section style={{background:'linear-gradient(135deg,#FFF3CC,#FFE8A0,#FFD8A0)',padding:'60px 24px',textAlign:'center',borderTop:'1.5px solid rgba(232,118,26,.1)'}}>
          <div style={{maxWidth:'520px',margin:'0 auto'}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(20px,4vw,27px)',fontWeight:'700',color:'#1C0A00',marginBottom:'10px'}}>Want to see more?</div>
            <p style={{fontSize:'14.5px',color:'rgba(60,25,0,.6)',lineHeight:'1.75',marginBottom:'26px'}}>Visit our campus and experience the SPVS environment in person. Admissions open for 2026-27.</p>
            <a href="tel:+919198783830" className="gp-cta-btn">
              📞 Call Us — +91 91987 83830
            </a>
          </div>
        </section>

      </div>
    </>
  )
}