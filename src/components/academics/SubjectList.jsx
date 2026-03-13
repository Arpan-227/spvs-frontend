import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LEVELS = [
  { id:'pp',   em:'🌱', label:'Pre-Primary',      tag:'PG – UKG',              color:'#22a35a',
    subjects:[
      {name:'Hindi',              code:'–', type:'Core'},
      {name:'English',            code:'–', type:'Core'},
      {name:'Numbers & Shapes',   code:'–', type:'Core'},
      {name:'Art & Craft',        code:'–', type:'Activity'},
      {name:'Music & Dance',      code:'–', type:'Activity'},
      {name:'Social Skills',      code:'–', type:'Value'},
      {name:'Ethics / Values',    code:'–', type:'Value'},
      {name:'Games & Exercises',  code:'–', type:'Activity'},
    ]
  },
  { id:'pri',  em:'📖', label:'Primary',           tag:'Class I – V',           color:'#E8761A',
    subjects:[
      {name:'English',                    code:'–', type:'Core'},
      {name:'Hindi',                      code:'–', type:'Core'},
      {name:'Mathematics',                code:'–', type:'Core'},
      {name:'Environmental Studies',      code:'–', type:'Core'},
      {name:'Social Science',             code:'–', type:'Core'},
      {name:'Computer Education',         code:'–', type:'Skill'},
      {name:'General Knowledge',          code:'–', type:'Skill'},
      {name:'Art & Craft',                code:'–', type:'Activity'},
      {name:'Music',                      code:'–', type:'Activity'},
      {name:'Physical & Health Education',code:'–', type:'Activity'},
    ]
  },
  { id:'mid',  em:'📐', label:'Middle',             tag:'Class VI – VIII',        color:'#F5B800',
    subjects:[
      {name:'English',                    code:'–', type:'Core'},
      {name:'Hindi',                      code:'–', type:'Core'},
      {name:'Mathematics',                code:'–', type:'Core'},
      {name:'Science',                    code:'–', type:'Core'},
      {name:'Social Science',             code:'–', type:'Core'},
      {name:'Sanskrit',                   code:'–', type:'Core'},
      {name:'Computer Education',         code:'–', type:'Skill'},
      {name:'General Knowledge',          code:'–', type:'Skill'},
      {name:'Art & Craft',                code:'–', type:'Activity'},
      {name:'Music',                      code:'–', type:'Activity'},
      {name:'Physical & Health Education',code:'–', type:'Activity'},
    ]
  },
  { id:'sec',  em:'🔬', label:'Secondary',          tag:'Class IX – X',           color:'#6C3FC5',
    subjects:[
      {name:'English Language & Literature',code:'184', type:'Core'},
      {name:'Hindi Course-A',               code:'002', type:'Core'},
      {name:'Mathematics Standard',         code:'041', type:'Core'},
      {name:'Mathematics Basic',            code:'241', type:'Core'},
      {name:'Science',                      code:'086', type:'Core'},
      {name:'Social Science',               code:'087', type:'Core'},
      {name:'Information Technology',       code:'402', type:'Skill'},
    ]
  },
  { id:'sci',  em:'⚗️', label:'Science XI–XII',     tag:'PCB / PCM',             color:'#E8761A',
    subjects:[
      {name:'English Core',        code:'301', type:'Core'},
      {name:'Physics',             code:'042', type:'Core'},
      {name:'Chemistry',           code:'043', type:'Core'},
      {name:'Biology',             code:'044', type:'Core'},
      {name:'Mathematics',         code:'041', type:'Core'},
      {name:'Hindi Core',          code:'302', type:'Optional'},
      {name:'Computer Science',    code:'083', type:'Optional'},
      {name:'Physical Education',  code:'048', type:'Optional'},
    ]
  },
  { id:'com',  em:'💼', label:'Commerce XI–XII',    tag:'Accountancy / Business', color:'#22a35a',
    subjects:[
      {name:'English Core',        code:'301', type:'Core'},
      {name:'Accountancy',         code:'055', type:'Core'},
      {name:'Business Studies',    code:'054', type:'Core'},
      {name:'Economics',           code:'030', type:'Core'},
      {name:'Hindi Core',          code:'302', type:'Optional'},
      {name:'Computer Science',    code:'083', type:'Optional'},
      {name:'Physical Education',  code:'048', type:'Optional'},
    ]
  },
  { id:'hum',  em:'🌐', label:'Humanities XI–XII',  tag:'History / Pol. Sci.',    color:'#0F1B3D',
    subjects:[
      {name:'English Core',        code:'301', type:'Core'},
      {name:'History',             code:'027', type:'Core'},
      {name:'Political Science',   code:'028', type:'Core'},
      {name:'Economics',           code:'030', type:'Core'},
      {name:'Hindi Core',          code:'302', type:'Optional'},
      {name:'Computer Science',    code:'083', type:'Optional'},
      {name:'Physical Education',  code:'048', type:'Optional'},
    ]
  },
]

const TYPE_STYLE = {
  Core:     { bg:'rgba(232,118,26,.1)',  color:'var(--or2)' },
  Skill:    { bg:'rgba(108,63,197,.1)',  color:'#5A2FA0'    },
  Activity: { bg:'rgba(34,163,90,.1)',   color:'#1a7a40'    },
  Value:    { bg:'rgba(245,184,0,.1)',   color:'#8B6800'    },
  Optional: { bg:'rgba(15,27,61,.07)',   color:'var(--navy)'},
}

export default function SubjectList({ embedded }) {
  const [active, setActive] = useState('pp')
  const lvl = LEVELS.find(l => l.id === active)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    document.querySelectorAll('.rv,.rv3d').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip">📚 Academics</div>
            <h1 className="pb-title">Subject <span style={{color:'var(--gd2)',fontStyle:'italic'}}>Listing</span></h1>
            <p className="pb-sub">Class-wise subject listing from Pre-Primary to Class XII — CBSE / NCERT curriculum</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/academics">Academics</Link><span>›</span>
              <span className="bc-cur">Subjects</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', minHeight:'60vh', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>

          {/* Level tabs — horizontally scrollable on mobile */}
          <div style={{overflowX:'auto', WebkitOverflowScrolling:'touch', marginBottom:'32px', paddingBottom:'4px'}}>
            <div style={{display:'flex', gap:'6px', background:'var(--bg2)', padding:'6px', borderRadius:'16px', border:'1.5px solid var(--brd)', minWidth:'max-content'}}>
              {LEVELS.map(l => (
                <button key={l.id} onClick={() => setActive(l.id)} style={{
                  display:'flex', alignItems:'center', gap:'6px', padding:'9px 14px',
                  borderRadius:'10px', border:'none', cursor:'pointer',
                  fontFamily:"'DM Sans',sans-serif", fontSize:'12.5px', fontWeight:'700', transition:'all .25s',
                  background: active===l.id ? 'var(--card)' : 'transparent',
                  color: active===l.id ? l.color : 'var(--txt2)',
                  boxShadow: active===l.id ? `0 4px 18px ${l.color}25` : 'none',
                  whiteSpace:'nowrap',
                }}>
                  <span>{l.em}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div key={active} style={{animation:'fU .35s ease both'}}>
            {/* Header */}
            <div style={{display:'flex', alignItems:'center', gap:'14px', marginBottom:'24px', padding:'18px 20px', borderRadius:'18px', background:`linear-gradient(135deg,${lvl.color}10,${lvl.color}04)`, border:`1.5px solid ${lvl.color}25`, flexWrap:'wrap'}}>
              <div style={{fontSize:'36px'}}>{lvl.em}</div>
              <div style={{flex:1, minWidth:'160px'}}>
                <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:'var(--dark)', margin:'0 0 4px'}}>{lvl.label}</h2>
                <div style={{fontSize:'11px', fontWeight:'700', color:lvl.color, letterSpacing:'1px', textTransform:'uppercase'}}>{lvl.tag}</div>
              </div>
              <div style={{padding:'10px 18px', borderRadius:'12px', background:`${lvl.color}15`, textAlign:'center', flexShrink:0}}>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:'24px', fontWeight:'700', color:lvl.color}}>{lvl.subjects.length}</div>
                <div style={{fontSize:'11px', color:'var(--txt3)'}}>Subjects</div>
              </div>
            </div>

            {/* Type legend */}
            <div style={{display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'18px'}}>
              {Object.entries(TYPE_STYLE).map(([type, st]) => (
                <span key={type} style={{padding:'3px 10px', borderRadius:'50px', fontSize:'11px', fontWeight:'700', background:st.bg, color:st.color}}>{type}</span>
              ))}
            </div>

            {/* Subject cards */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'10px', marginBottom:'28px'}}>
              {lvl.subjects.map((s,i) => {
                const st = TYPE_STYLE[s.type] || TYPE_STYLE.Core
                return (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:'12px',
                    padding:'14px 16px', borderRadius:'14px',
                    background:'var(--card)', border:'1.5px solid var(--brd)',
                  }}>
                    <div style={{width:'34px', height:'34px', borderRadius:'10px', background:`${lvl.color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <div style={{width:'9px', height:'9px', borderRadius:'50%', background:lvl.color, boxShadow:`0 0 6px ${lvl.color}`}}></div>
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:'13.5px', fontWeight:'700', color:'var(--dark)', marginBottom:'4px', lineHeight:'1.3'}}>{s.name}</div>
                      <div style={{display:'flex', alignItems:'center', gap:'5px', flexWrap:'wrap'}}>
                        {s.code !== '–' && <span style={{fontSize:'10px', fontWeight:'700', color:'var(--txt3)'}}>Code: {s.code}</span>}
                        <span style={{fontSize:'10px', fontWeight:'800', padding:'2px 7px', borderRadius:'50px', background:st.bg, color:st.color}}>{s.type}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Download CTA */}
            <div style={{padding:'18px 20px', borderRadius:'16px', background:'var(--bg2)', border:'1.5px solid var(--brd)', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap'}}>
              <div style={{fontSize:'28px'}}>📥</div>
              <div style={{flex:1, minWidth:'180px'}}>
                <div style={{fontWeight:'700', color:'var(--dark)', marginBottom:'3px'}}>Download Complete Syllabus</div>
                <div style={{fontSize:'13px', color:'var(--txt2)'}}>Get the detailed CBSE syllabus PDF for {lvl.label} from our Downloads section.</div>
              </div>
              <Link to="/downloads/syllabus" className="btn-or" style={{padding:'10px 20px', fontSize:'13px', flexShrink:0}}>Download PDF →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}