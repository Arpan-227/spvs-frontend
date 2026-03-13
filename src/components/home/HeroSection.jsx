import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'

function make3D(canvas) {
  if (!canvas) return () => {}
  const W = canvas.offsetWidth, H = canvas.offsetHeight
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
  camera.position.z = 5
  const pGeo = new THREE.BufferGeometry()
  const N = 120, pos = new Float32Array(N * 3)
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 18
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const pMat = new THREE.PointsMaterial({ color: 0xE8761A, size: 0.06, transparent: true, opacity: 0.5 })
  scene.add(new THREE.Points(pGeo, pMat))
  const shapes = []
  const geoms = [new THREE.TetrahedronGeometry(.35,0), new THREE.OctahedronGeometry(.28,0), new THREE.IcosahedronGeometry(.24,0)]
  const cols = [0xE8761A, 0xF5B800, 0xFF9A3C]
  for (let i = 0; i < 12; i++) {
    const m = new THREE.MeshBasicMaterial({ color: cols[i%3], wireframe: true, transparent: true, opacity: 0.18 })
    const mesh = new THREE.Mesh(geoms[i%3], m)
    mesh.position.set((Math.random()-0.5)*12, (Math.random()-0.5)*8, (Math.random()-0.5)*4)
    mesh.userData = { rx: Math.random()*.005, ry: Math.random()*.007 }
    scene.add(mesh); shapes.push(mesh)
  }
  let raf
  const animate = () => {
    raf = requestAnimationFrame(animate)
    shapes.forEach(s => { s.rotation.x += s.userData.rx; s.rotation.y += s.userData.ry })
    renderer.render(scene, camera)
  }
  animate()
  return () => { cancelAnimationFrame(raf); renderer.dispose() }
}

export default function HeroSection() {
  const cvRef = useRef(null)
  useEffect(() => {
    const cleanup = make3D(cvRef.current)
    return cleanup
  }, [])

  return (
    <section className="hero" id="home">
      <canvas ref={cvRef} className="hero-canvas" />

      {/* ═══════════════════════════════════════
          DESKTOP LAYOUT — hidden on mobile
      ═══════════════════════════════════════ */}
      <div className="hero-inner hero-desk">

        {/* LEFT */}
        <div>
          <div className="hero-badge">
            <span className="hero-dot"></span>
            CBSE Affiliated · Est. 1987 · Bahraich
          </div>
          <h1 className="hero-h1">
            <span className="ita">SPVS</span> — The<br />
            <span className="gol">Smart</span> Choice<br />
            for <span className="ita">Excellence</span>
          </h1>
          <p className="hero-sub">"Education with Values and Excellence"</p>
          <p className="hero-desc">
            Sant Pathik Vidyalaya Senior Secondary School — nurturing curious minds, strong values, and lifelong learners since 1987 in Pashupati Nagar, Bahraich.
          </p>
          <div className="hero-btns">
            <Link to="/contact" className="btn-or">📋 Enrol Now →</Link>
            <Link to="/about" className="btn-out">🏫 Explore School</Link>
          </div>
          <div className="hero-trust">
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div className="avs">
                <div className="av">A</div><div className="av">S</div>
                <div className="av">R</div><div className="av">M</div>
              </div>
              <div className="tr-info"><strong>1,410+</strong> students</div>
            </div>
            <div className="tr-div"></div>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <div className="stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div className="rat-txt"><strong>4.9/5</strong></div>
            </div>
            <div className="tr-div"></div>
            <div className="tr-info">🏆 <strong>100%</strong> Pass</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="hero-img-card" style={{background:'linear-gradient(135deg,#FFF3CC,#FFE0A0)'}}>
            <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',background:'linear-gradient(135deg,#FFF8DC,#FFD94A)'}}>
              <div style={{fontSize:'80px'}}>🏫</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'22px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 20px'}}>Sant Pathik Vidyalaya</div>
              <div style={{fontSize:'14px',color:'var(--txt2)',textAlign:'center'}}>Pashupati Nagar, Bahraich</div>
            </div>
            <div className="hero-img-ov"></div>
            <div className="hero-img-txt">
              <div className="h-img-badge">🏆 Est. 1987 · 10 Acres Campus</div>
              <div className="h-img-t">Where Values Meet Excellence</div>
              <div className="h-img-s">CBSE No. 70178 · Affiliation 2130176</div>
            </div>
          </div>
          <div className="fbdg fb1">
            <div className="fbdg-ic ic-or">🎓</div>
            <div><div className="fbdg-n">1410+</div><div className="fbdg-l">Students Enrolled</div></div>
          </div>
          <div className="fbdg fb2">
            <div className="fbdg-ic ic-gd">🏅</div>
            <div><div className="fbdg-n">100%</div><div className="fbdg-l">Board Results</div></div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE LAYOUT — shown only on mobile
          Order: 1-text  2-image+stats  3-btns  4-trust
      ═══════════════════════════════════════ */}
      <div className="hero-mob">

        {/* 1 ── Writing */}
        <div className="hm-text">
          <div className="hero-badge hm-badge">
            <span className="hero-dot"></span>
            CBSE Affiliated · Est. 1987 · Bahraich
          </div>
          <h1 className="hero-h1 hm-h1">
            <span className="ita">SPVS</span> — The<br />
            <span className="gol">Smart</span> Choice<br />
            for <span className="ita">Excellence</span>
          </h1>
          <p className="hero-sub hm-sub">"Education with Values and Excellence"</p>
          <p className="hero-desc hm-desc">
            Sant Pathik Vidyalaya — nurturing curious minds and strong values since 1987 in Pashupati Nagar, Bahraich.
          </p>
        </div>

        {/* 2 ── Image card */}
        <div className="hm-card">
          <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'10px',background:'linear-gradient(135deg,#FFF8DC,#FFD94A)'}}>
            <div style={{fontSize:'60px'}}>🏫</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:'700',color:'var(--dark2)',textAlign:'center',padding:'0 14px'}}>Sant Pathik Vidyalaya</div>
            <div style={{fontSize:'12px',color:'var(--txt2)',textAlign:'center'}}>Pashupati Nagar, Bahraich</div>
          </div>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(28,10,0,.65) 0%,transparent 55%)'}}/>
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px 14px'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'5px',background:'rgba(245,184,0,.9)',padding:'3px 9px',borderRadius:'50px',fontSize:'10px',fontWeight:700,color:'var(--dark)',marginBottom:'4px'}}>🏆 Est. 1987 · 10 Acres</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'14px',fontWeight:700,color:'#fff',lineHeight:1.3}}>Where Values Meet Excellence</div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,.6)',marginTop:'2px'}}>CBSE No. 70178 · Affiliation 2130176</div>
          </div>
          <div style={{position:'absolute',top:'10px',right:'10px',background:'rgba(255,255,255,.92)',borderRadius:'9px',padding:'6px 10px',display:'flex',alignItems:'center',gap:'6px'}}>
            <span style={{fontSize:'14px'}}>🎓</span>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'13px',fontWeight:700,color:'var(--dark)'}}>1410+</div>
              <div style={{fontSize:'9px',color:'var(--txt3)',fontWeight:600}}>Students</div>
            </div>
          </div>
        </div>

        {/* 2b ── Stats row (below image) */}
        <div className="hm-stats">
          {[['1410+','Students'],['100%','Pass Rate'],['37+','Years'],['73','Classes']].map(([n,l],i) => (
            <div key={i} className="hm-stat">
              <div className="hm-stat-n">{n}</div>
              <div className="hm-stat-l">{l}</div>
            </div>
          ))}
        </div>

        {/* 3 ── Buttons */}
        <div className="hm-btns">
          <Link to="/contact" className="btn-or hm-btn">📋 Enrol Now →</Link>
          <Link to="/about"   className="btn-out hm-btn">🏫 Explore School</Link>
        </div>

        {/* 4 ── Trust row */}
        <div className="hm-trust">
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <span style={{color:'#F5B800',fontSize:'12px'}}>★★★★★</span>
            <strong style={{fontSize:'12px',color:'var(--dark2)'}}>4.9/5</strong>
          </div>
          <div className="hm-tdiv"/>
          <div style={{fontSize:'12px',color:'var(--dark2)'}}><strong>1,410+</strong> Students</div>
          <div className="hm-tdiv"/>
          <div style={{fontSize:'12px',color:'var(--dark2)'}}>🏆 <strong>100%</strong> Pass</div>
        </div>

      </div>

      <div className="scroll-hint">
        <span>Scroll Down</span>
        <div className="s-wheel"><div className="s-wd"></div></div>
      </div>
      <div className="hero-dots">
        <div className="hd act"></div><div className="hd"></div><div className="hd"></div>
      </div>

      <style>{`
        /* Mobile layout hidden on desktop */
        .hero-mob { display: none; }

        @media (max-width: 768px) {
          /* ── Kill desktop layout ── */
          .hero-desk   { display: none !important; }
          .scroll-hint { display: none !important; }
          .hero-dots   { display: none !important; }
          .hero        { min-height: auto !important; padding-bottom: 28px; }

          /* ── Mobile wrapper ── */
          .hero-mob {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 24px 16px 4px;
            position: relative;
            z-index: 4;
          }

          /* 1 — Writing */
          .hm-badge { font-size: 10px !important; padding: 5px 12px !important; margin-bottom: 10px !important; display: inline-flex !important; }
          .hm-h1    { font-size: 32px !important; line-height: 1.2 !important; margin-bottom: 8px !important; }
          .hm-sub   { font-size: 13px !important; margin-bottom: 6px !important; }
          .hm-desc  { font-size: 13px !important; line-height: 1.6 !important; margin: 0 !important; }

          /* 2 — Image card */
          .hm-card {
            border-radius: 18px;
            overflow: hidden;
            height: 215px;
            position: relative;
            box-shadow: 0 12px 36px rgba(232,118,26,.22);
            border: 1.5px solid rgba(232,118,26,.2);
          }

          /* 2b — Stats */
          .hm-stats {
            display: flex;
            align-items: center;
            background: rgba(255,255,255,.92);
            backdrop-filter: blur(12px);
            border-radius: 14px;
            padding: 12px 6px;
            border: 1.5px solid rgba(232,118,26,.14);
            box-shadow: 0 4px 18px rgba(232,118,26,.08);
          }
          .hm-stat { flex: 1; text-align: center; }
          .hm-stat + .hm-stat { border-left: 1px solid rgba(232,118,26,.15); }
          .hm-stat-n {
            font-family: 'Playfair Display', serif;
            font-size: 18px; font-weight: 700;
            color: var(--or); line-height: 1; margin-bottom: 2px;
          }
          .hm-stat-l {
            font-size: 9px; font-weight: 600;
            color: var(--txt3); text-transform: uppercase; letter-spacing: 0.4px;
          }

          /* 3 — Buttons */
          .hm-btns {
            display: flex;
            flex-direction: row;
            gap: 10px;
          }
          .hm-btn {
            flex: 1 !important;
            justify-content: center !important;
            text-align: center !important;
            font-size: 13px !important;
            padding: 12px 8px !important;
          }

          /* 4 — Trust */
          .hm-trust {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 10px 14px;
            background: rgba(255,255,255,.85);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            border: 1px solid rgba(232,118,26,.12);
            margin-bottom: 4px;
          }
          .hm-tdiv {
            width: 1px; height: 16px;
            background: rgba(232,118,26,.2);
            flex-shrink: 0;
          }
        }

        @media (max-width: 480px) {
          .hm-h1     { font-size: 27px !important; }
          .hm-card   { height: 185px; }
          .hm-stat-n { font-size: 15px; }
          .hm-btn    { font-size: 12px !important; padding: 11px 5px !important; }
        }
      `}</style>
    </section>
  )
}