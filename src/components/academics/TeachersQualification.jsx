import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const FACULTY = [
  {name:'Sh. Awadhesh Narayan Agarwal', desig:'Director / Manager',  cat:'Management', qual:'School Management',        subject:'–',                             phone:'+91 9198783830'},
  {name:'Mrs. Pooja Agarwal',           desig:'Principal',           cat:'Management', qual:'M.A., B.Ed',               subject:'–',                             phone:'+91 8318842325'},
  {name:'Mr. Bhikha Ram Tripathi',      desig:'Vice Principal',      cat:'Management', qual:'M.Sc., B.Ed',              subject:'Biology',                       phone:'+91 8318600231'},
  {name:'Mrs. Neena Chhabra',           desig:'Primary Wing I/C',    cat:'Management', qual:'M.A., B.Ed',               subject:'English · Primary Wing',        phone:'+91 7007884235'},
  {name:'Mr. K.K. Srivastava',          desig:'PGT Mathematics',     cat:'PGT',        qual:'M.Sc., LT',                subject:'Mathematics'},
  {name:'Mr. Pradeep Kr. Dubey',        desig:'PGT Chemistry',       cat:'PGT',        qual:'M.Sc., B.Ed',              subject:'Chemistry'},
  {name:'Mr. Awadhesh Kr. Shukla',      desig:'PGT Commerce',        cat:'PGT',        qual:'M.Com., B.Ed',             subject:'Accountancy & Business Studies'},
  {name:'Mr. Sayeed Danish',            desig:'PGT Economics',       cat:'PGT',        qual:'M.A., M.B.A',              subject:'Economics'},
  {name:'Mr. Siraj Ali',                desig:'PGT English',         cat:'PGT',        qual:'M.A., B.Ed',               subject:'English'},
  {name:'Mr. Amit Kr. Dubey',           desig:'PGT History',         cat:'PGT',        qual:'M.A., B.Ed',               subject:'History & Social Science'},
  {name:'Mr. Ratandeep Ranjan',         desig:'PGT Physics',         cat:'PGT',        qual:'M.Sc., B.Ed',              subject:'Physics & Science'},
  {name:'Mr. Shubham Tiwari',           desig:'PGT Physics',         cat:'PGT',        qual:'M.Sc., B.Ed',              subject:'Physics & Science'},
  {name:'Mr. Shivam Verma',             desig:'PGT Computer Science',cat:'PGT',        qual:'Inter, B.Tech',            subject:'Computer Science & IT'},
  {name:'Mr. K.K. Tripathi',            desig:'PGT Political Science',cat:'PGT',       qual:'M.A., B.Ed',               subject:'Political Science'},
  {name:'Ms. Sangeeta Singh',           desig:'PGT Hindi',           cat:'PGT',        qual:'M.A., B.Ed',               subject:'Hindi'},
  {name:'Mr. Mohan Rai',                desig:'PGT Physical Education',cat:'PGT',      qual:'M.P.Ed',                   subject:'Physical Education'},
  {name:'Mr. Krishna Kr. Rai',          desig:'TGT Mathematics',     cat:'TGT',        qual:'M.Sc., M.Ed',              subject:'Mathematics'},
  {name:'Mrs. Neelam Rai',              desig:'TGT Hindi',           cat:'TGT',        qual:'M.A., B.Ed',               subject:'Hindi & Sanskrit'},
  {name:'Mr. K.P. Singh',               desig:'TGT Science',         cat:'TGT',        qual:'M.Sc., B.Ed',              subject:'Science'},
  {name:'Mr. Santosh Singh',            desig:'TGT Science',         cat:'TGT',        qual:'B.Sc., B.Ed',              subject:'Science'},
  {name:'Mr. Prem N. Awasthi',          desig:'TGT Social Science',  cat:'TGT',        qual:'M.A., B.Ed',               subject:'Social Science'},
  {name:'Ms. Pragya Dubey',             desig:'TGT English',         cat:'TGT',        qual:'M.A., B.Ed',               subject:'English'},
  {name:'Mr. Vivek Kalia',              desig:'TGT Hindi',           cat:'TGT',        qual:'M.A., B.Ed',               subject:'Hindi & Sanskrit'},
  {name:'Ms. Neha Pandey',              desig:'TGT Social Science',  cat:'TGT',        qual:'M.A.',                     subject:'Social Science'},
  {name:'Mr. Manish Kr. Prajapati',     desig:'TGT Mathematics',     cat:'TGT',        qual:'M.Sc., B.Ed',              subject:'Mathematics'},
  {name:'Mr. Lavlesh Shukla',           desig:'TGT Science',         cat:'TGT',        qual:'B.Sc., B.Ed',              subject:'Biology & Science'},
  {name:'Mr. Ajeet Kumar Yadav',        desig:'TGT Mathematics',     cat:'TGT',        qual:'B.Sc., B.Ed',              subject:'Mathematics'},
  {name:'Ms. Shilpi Srivastava',        desig:'TGT English',         cat:'TGT',        qual:'M.A., B.Ed',               subject:'English'},
  {name:'Mr. Shivram Vishwakarma',      desig:'TGT Social Science',  cat:'TGT',        qual:'M.A., D.EL.Ed',            subject:'Social Science'},
  {name:'Mr. Raja Singh',               desig:'TGT Social Science',  cat:'TGT',        qual:'M.A., B.Ed',               subject:'Social Science'},
  {name:'Mr. Jitendra Verma',           desig:'TGT English',         cat:'TGT',        qual:'M.A., B.Ed',               subject:'English'},
  {name:'Mr. Saif Abbas',               desig:'TGT Science',         cat:'TGT',        qual:'B.Sc., B.Ed',              subject:'Science'},
  {name:'Mr. G.B. Verma',               desig:'TGT Computer',        cat:'TGT',        qual:'M.A., B.Ed',               subject:'Computer Education'},
  {name:'Ms. Dhaneshwari Sahani',       desig:'TGT Hindi',           cat:'TGT',        qual:'M.A., B.Ed',               subject:'Hindi & Sanskrit'},
  {name:'Ms. Amita Agarwal',            desig:'TGT Art',             cat:'TGT',        qual:'M.A. Bombay Art',          subject:'Art'},
  {name:'Mr. D.D. Srivastava',          desig:'TGT Music',           cat:'TGT',        qual:'B.A., B.Mus',              subject:'Music (Vocal & Instrumental)'},
  {name:'Mr. Arvind Pandey',            desig:'TGT Physical Education',cat:'TGT',      qual:'M.A., B.PEd',              subject:'Physical & Health Education'},
  {name:'Ms. Priyanka Singh',           desig:'TGT Physical Education',cat:'TGT',      qual:'B.A., B.PEd',              subject:'Physical & Health Education'},
  {name:'Mr. Akhilesh Kr. Mishra',      desig:'TGT Librarian',       cat:'TGT',        qual:'B.Com., B.Lib',            subject:'Library Incharge'},
]

const CAT_STYLE = {
  Management: { color:'#E8761A', bg:'rgba(232,118,26,.1)',  dot:'#E8761A', grad:'linear-gradient(135deg,#E8761A,#F5B800)' },
  PGT:        { color:'#6C3FC5', bg:'rgba(108,63,197,.1)',  dot:'#6C3FC5', grad:'linear-gradient(135deg,#6C3FC5,#9B59F5)' },
  TGT:        { color:'#22a35a', bg:'rgba(34,163,90,.1)',   dot:'#22a35a', grad:'linear-gradient(135deg,#22a35a,#2ecc71)' },
  PRT:        { color:'#F5B800', bg:'rgba(245,184,0,.1)',   dot:'#F5B800', grad:'linear-gradient(135deg,#F5B800,#ffd700)' },
}

function getInitials(name) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Sh\.)\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map(function(p) { return p[0] || '' })
    .join('')
    .toUpperCase()
}

function Avatar({ f, st }) {
  if (f.photo) {
    return (
      <div style={{width:'50px',height:'50px',borderRadius:'14px',overflow:'hidden',flexShrink:0,border:'2px solid '+st.dot+'44',boxShadow:'0 4px 14px '+st.dot+'33'}}>
        <img src={f.photo} alt={f.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </div>
    )
  }
  return (
    <div style={{
      width:'50px', height:'50px', borderRadius:'14px', flexShrink:0,
      background: st.grad,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:"'DM Sans',sans-serif", fontSize:'16px',
      fontWeight:'900', color:'#fff', letterSpacing:'1px',
      boxShadow:'0 4px 14px '+st.dot+'44',
    }}>
      {getInitials(f.name)}
    </div>
  )
}

function FacultyCard({ f, st }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'12px',
      padding:'16px 18px', borderRadius:'16px',
      background:'var(--card)', border:'1.5px solid var(--brd)',
    }}>
      <Avatar f={f} st={st} />
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontFamily:"'Playfair Display',serif", fontSize:'14px', fontWeight:'700', color:'var(--dark)', marginBottom:'4px', lineHeight:'1.3'}}>{f.name}</div>
        <div style={{display:'inline-flex', alignItems:'center', fontSize:'10px', fontWeight:'800', color:st.color, background:st.bg, padding:'2px 9px', borderRadius:'50px', marginBottom:'6px'}}>{f.desig}</div>
        <div style={{fontSize:'12px', color:'var(--txt2)', marginBottom:'2px'}}><span style={{color:'var(--txt3)'}}>Subject: </span>{f.subject}</div>
        <div style={{fontSize:'11px', color:'var(--txt3)', fontStyle:'italic'}}>{f.qual}</div>
        {f.phone && (
          <a href={'tel:'+f.phone} style={{display:'inline-block', fontSize:'11px', color:'var(--or)', marginTop:'5px', fontWeight:'700', textDecoration:'none'}}>📞 {f.phone}</a>
        )}
      </div>
    </div>
  )
}

export default function TeachersQualification({ embedded }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [view,   setView]   = useState('grid')

  const cats = ['All', 'Management', 'PGT', 'TGT']

  const filtered = FACULTY.filter(function(f) {
    var matchCat = filter === 'All' || f.cat === filter
    var q = search.toLowerCase()
    var matchSearch = f.name.toLowerCase().includes(q) || f.subject.toLowerCase().includes(q) || f.qual.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <>
      {!embedded && (
        <div className="page-banner">
          <div className="pb-inner">
            <div className="pb-chip">👨‍🏫 Academics</div>
            <h1 className="pb-title">Teachers & <span style={{color:'var(--gd2)', fontStyle:'italic'}}>Qualifications</span></h1>
            <p className="pb-sub">Meet our 64+ dedicated faculty members — experienced, qualified and committed to excellence</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/academics">Academics</Link><span>›</span>
              <span className="bc-cur">Faculty</span>
            </div>
          </div>
        </div>
      )}

      <div style={{background:'var(--bg)', minHeight:'40vh', padding: embedded ? '0' : '60px 20px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto'}}>

          {/* Stats */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'12px', marginBottom:'28px'}}>
            {[
              ['64+','Total Staff',  '👥','#E8761A'],
              ['14', 'PGTs',         '🎓','#6C3FC5'],
              ['20', 'TGTs',         '📚','#22a35a'],
              ['30', 'PRTs',         '✏️','#F5B800'],
              ['4',  'Management',   '👩‍💼','#E8761A'],
            ].map(function(item) {
              var n=item[0], l=item[1], ic=item[2], clr=item[3]
              return (
                <div key={l} style={{padding:'16px 10px', borderRadius:'14px', background:'var(--card)', textAlign:'center', border:'1.5px solid var(--brd)'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'12px',background:clr+'18',border:'1.5px solid '+clr+'30',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',margin:'0 auto 10px'}}>{ic}</div>
                  <div style={{fontFamily:"'Playfair Display',serif", fontSize:'22px', fontWeight:'700', color:clr, lineHeight:'1'}}>{n}</div>
                  <div style={{fontSize:'10px', color:'var(--txt3)', marginTop:'4px', letterSpacing:'.8px', textTransform:'uppercase'}}>{l}</div>
                </div>
              )
            })}
          </div>

          {/* Controls — search full width on mobile, filters + toggle below */}
          <div style={{marginBottom:'24px'}}>
            <input
              value={search}
              onChange={function(e) { setSearch(e.target.value) }}
              placeholder="🔍 Search name, subject or qualification..."
              style={{width:'100%', boxSizing:'border-box', padding:'11px 16px', borderRadius:'10px', border:'1.5px solid var(--brd)', background:'var(--bg)', color:'var(--txt)', fontFamily:"'DM Sans',sans-serif", fontSize:'13.5px', outline:'none', marginBottom:'10px'}}
              onFocus={function(e) { e.target.style.borderColor='var(--or)' }}
              onBlur={function(e)  { e.target.style.borderColor='var(--brd)' }}
            />
            <div style={{display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap'}}>
              {/* Category filters */}
              <div style={{display:'flex', gap:'5px', flexWrap:'wrap', flex:1}}>
                {cats.map(function(c) {
                  var isActive = filter === c
                  return (
                    <button key={c} onClick={function() { setFilter(c) }} style={{
                      padding:'8px 14px', borderRadius:'50px', border:'none', cursor:'pointer',
                      fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:'700',
                      background: isActive ? 'var(--or)' : 'var(--bg2)',
                      color:      isActive ? '#fff'      : 'var(--txt2)',
                      boxShadow:  isActive ? '0 4px 14px rgba(232,118,26,.3)' : 'none',
                    }}>
                      {c}{isActive && filter !== 'All' ? ' ('+filtered.length+')' : isActive ? ' ('+filtered.length+')' : ''}
                    </button>
                  )
                })}
              </div>
              {/* Grid / List toggle */}
              <div style={{display:'flex', gap:'4px', background:'var(--bg2)', padding:'4px', borderRadius:'10px', border:'1.5px solid var(--brd)', flexShrink:0}}>
                {[['grid','⊞'], ['list','☰']].map(function(pair) {
                  var v=pair[0], ic=pair[1]
                  return (
                    <button key={v} onClick={function() { setView(v) }} style={{
                      padding:'7px 12px', borderRadius:'8px', border:'none', cursor:'pointer',
                      fontSize:'14px', transition:'all .2s',
                      background: view===v ? 'var(--card)' : 'transparent',
                      color:      view===v ? 'var(--or)'   : 'var(--txt3)',
                      boxShadow:  view===v ? '0 2px 8px rgba(232,118,26,.15)' : 'none',
                    }}>{ic}</button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* GRID VIEW */}
          {view === 'grid' && (
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'12px'}}>
              {filtered.map(function(f, i) {
                var st = CAT_STYLE[f.cat] || CAT_STYLE.PRT
                return <FacultyCard key={i} f={f} st={st} />
              })}
            </div>
          )}

          {/* LIST VIEW — scrollable on mobile */}
          {view === 'list' && (
            <div style={{borderRadius:'18px', overflow:'hidden', border:'1.5px solid var(--brd)', boxShadow:'0 6px 28px rgba(232,118,26,.06)'}}>
              <div style={{overflowX:'auto', WebkitOverflowScrolling:'touch'}}>
                <table style={{width:'100%', borderCollapse:'collapse', minWidth:'560px'}}>
                  <thead>
                    <tr style={{background:'linear-gradient(135deg,var(--dark),var(--dark2))'}}>
                      {['#','Name','Designation','Qualification','Subject'].map(function(h) {
                        return <th key={h} style={{padding:'12px 14px', textAlign:'left', fontSize:'10px', fontWeight:'800', color:'rgba(255,255,255,.6)', letterSpacing:'1px', textTransform:'uppercase', whiteSpace:'nowrap'}}>{h}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(function(f, i) {
                      var st = CAT_STYLE[f.cat] || CAT_STYLE.PRT
                      return (
                        <tr key={i}
                          style={{borderTop:'1px solid var(--brd)', background: i%2===0 ? 'transparent' : 'rgba(0,0,0,.012)'}}
                          onMouseEnter={function(e) { e.currentTarget.style.background='rgba(232,118,26,.03)' }}
                          onMouseLeave={function(e) { e.currentTarget.style.background= i%2===0 ? 'transparent' : 'rgba(0,0,0,.012)' }}
                        >
                          <td style={{padding:'10px 14px', fontSize:'11px', color:'var(--txt3)', fontWeight:'600'}}>{i+1}</td>
                          <td style={{padding:'10px 14px', fontWeight:'700', color:'var(--dark)', fontSize:'13px', fontFamily:"'Playfair Display',serif", whiteSpace:'nowrap'}}>{f.name}</td>
                          <td style={{padding:'10px 14px', whiteSpace:'nowrap'}}>
                            <span style={{fontSize:'10px', fontWeight:'800', color:st.color, background:st.bg, padding:'2px 9px', borderRadius:'50px'}}>{f.desig}</span>
                          </td>
                          <td style={{padding:'10px 14px', fontSize:'12.5px', color:'var(--txt2)', fontStyle:'italic', whiteSpace:'nowrap'}}>{f.qual}</td>
                          <td style={{padding:'10px 14px', fontSize:'12.5px', color:'var(--txt2)'}}>{f.subject}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{textAlign:'center', padding:'60px', color:'var(--txt3)'}}>
              <div style={{fontSize:'40px', marginBottom:'12px'}}>🔍</div>
              <div style={{fontSize:'16px', fontWeight:'600', color:'var(--txt2)'}}>No results for "{search}"</div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}