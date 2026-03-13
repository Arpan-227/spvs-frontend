import { useState } from 'react'
import BlogCard from './BlogCard'

var POSTS = [
  { slug:'annual-sports-meet-2026', image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', title:'Annual Sports Meet 2026 — A Grand Celebration', category:'Sports', emoji:'⚽', author:'SPVS Admin', date:'15 Feb 2026', featured:true, excerpt:'The Annual Sports Meet 2026 was a spectacular event with over 600 students participating in 20+ events including athletics, football, kabaddi and yoga. Our students won multiple district-level honours.' },
  { slug:'cbse-results-2025', image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', title:'SPVS Achieves 100% Results in CBSE Board 2025', category:'Achievement', emoji:'🏆', author:'Principal Office', date:'10 Feb 2026', featured:false, excerpt:'We are proud to announce that Sant Pathik Vidyalaya achieved 100% pass rate in CBSE Class X and XII Board Examinations 2025. Several students scored above 90% in all subjects.' },
  { slug:'admissions-open-2026', image:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', title:'Admissions Open for Academic Year 2026–27', category:'Admission', emoji:'📋', author:'Admissions Office', date:'1 Jan 2026', featured:false, excerpt:'Sant Pathik Vidyalaya is pleased to announce that admissions are now open for the academic year 2026–27 for classes Play Group to Class XII. Limited seats available.' },
  { slug:'science-exhibition-2025', image:'https://images.unsplash.com/photo-1532094349884-543559a8c9bd?w=800&q=80', title:'Science Exhibition 2025 — Innovation on Display', category:'Academic', emoji:'🔬', author:'Science Dept.', date:'20 Sep 2025', featured:false, excerpt:'Students from Classes VI to XII presented 40+ innovative science projects at the Annual Science Exhibition. Projects ranged from solar energy models to water purification systems.' },
  { slug:'cultural-fest-2025', image:'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', title:'Cultural Fest 2025 — Colors of Talent', category:'Event', emoji:'🎨', author:'SPVS Admin', date:'15 Nov 2025', featured:false, excerpt:'The Annual Cultural Fest saw breathtaking performances in classical dance, music, drama and art. Over 300 students showcased their talents in front of a packed auditorium.' },
  { slug:'independence-day-2025', image:'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80', title:'Independence Day Celebration at SPVS', category:'Event', emoji:'🇮🇳', author:'SPVS Admin', date:'15 Aug 2025', featured:false, excerpt:'Independence Day was celebrated with great patriotic fervour at SPVS. The Principal hoisted the flag, followed by cultural programmes, march past and speeches by students.' },
  { slug:'new-smart-classes', image:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', title:'New Smart Classrooms Inaugurated', category:'Academic', emoji:'📱', author:'Management', date:'1 Apr 2025', featured:false, excerpt:'SPVS inaugurated 10 new smart classrooms equipped with digital boards, projectors and high-speed internet. This is part of our ongoing commitment to modern education.' },
  { slug:'winter-carnival-2024', image:'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80', title:'Winter Carnival & Annual Prize Day 2024', category:'Event', emoji:'🎉', author:'SPVS Admin', date:'20 Dec 2024', featured:false, excerpt:'The Winter Carnival and Annual Prize Distribution Ceremony was held with great enthusiasm. Top performers were felicitated by the Director and Principal in the presence of parents.' },
  { slug:'holiday-list-2026', title:'School Holiday List 2026 — Full Year Calendar', category:'Holiday', emoji:'📅', author:'Principal Office', date:'1 Jan 2026', featured:false, excerpt:'The complete list of school holidays for the year 2026 including national holidays, festival holidays, summer vacation, winter break and examination breaks.' },
  { slug:'summer-vacation-2026', title:'Summer Vacation Notice 2026', category:'Holiday', emoji:'☀️', author:'Principal Office', date:'10 Apr 2026', featured:false, excerpt:'Summer vacation for the academic year 2026 will commence from 20th May and school will reopen on 1st July. Hostel students may collect their belongings before departure.' },
  { slug:'diwali-break-2025', title:'Diwali Holiday Notice 2025', category:'Holiday', emoji:'🪔', author:'Principal Office', date:'15 Oct 2025', featured:false, excerpt:'School will remain closed from 20th to 26th October 2025 on account of Diwali and related festivals. Classes will resume from 27th October as per the regular timetable.' },
  { slug:'eid-holiday-2026', title:'Eid-ul-Fitr Holiday Notice 2026', category:'Holiday', emoji:'🌙', author:'Principal Office', date:'28 Mar 2026', featured:false, excerpt:'School will remain closed on 31st March 2026 on account of Eid-ul-Fitr. All students and staff are wished a joyful celebration.' },
  { slug:'cbse-science-olympiad-2026', title:'CBSE Science Olympiad 2026 — Registrations Open', category:'Competition', emoji:'🔭', author:'Science Dept.', date:'5 Mar 2026', featured:false, excerpt:'Registrations are open for the CBSE National Science Olympiad 2026 for students of Classes VI to XII. Interested students must submit their names to the Science teacher by 20th March.' },
  { slug:'inter-school-debate-2026', title:'Inter-School Debate Competition — Bahraich 2026', category:'Competition', emoji:'🎤', author:'SPVS Admin', date:'20 Feb 2026', featured:false, excerpt:'SPVS will be participating in the Inter-School Debate Competition to be held at Govt. Girls Inter College, Bahraich on 5th March 2026. Students of Classes IX–XII can apply.' },
  { slug:'district-sports-2026', title:'District Level Sports Competition 2026', category:'Competition', emoji:'🏅', author:'Sports Dept.', date:'10 Feb 2026', featured:false, excerpt:'The District Level Sports Competition 2026 will be held in March. SPVS students who wish to represent the school in athletics, football or kabaddi must register with the Sports teacher.' },
  { slug:'math-olympiad-2025', title:'National Mathematics Olympiad 2025 — Results', category:'Competition', emoji:'🧮', author:'Maths Dept.', date:'15 Dec 2025', featured:false, excerpt:'Congratulations to our students who participated in the National Mathematics Olympiad 2025! Rohan Sharma (Class X) won Silver and Priya Singh (Class IX) won Bronze at district level.' },
]

var CATS = [
  { id:'All',         emoji:'✨' },
  { id:'Academic',    emoji:'🎓' },
  { id:'Achievement', emoji:'🏆' },
  { id:'Event',       emoji:'🎉' },
  { id:'Holiday',     emoji:'📅' },
  { id:'Competition', emoji:'🏅' },
  { id:'Notice',      emoji:'📌' },
  { id:'Sports',      emoji:'⚽' },
  { id:'Admission',   emoji:'📋' },
]

export default function BlogList() {
  var [filter, setFilter] = useState('All')
  var [search, setSearch] = useState('')

  var filtered = POSTS.filter(function(p) {
    var matchCat    = filter === 'All' || p.category === filter
    var matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  var featured = filtered.find(function(p) { return p.featured })
  var rest      = filtered.filter(function(p) { return !p.featured })

  return (
    <>
      <style>{`
        /* ── Search ── */
        .bl-search-wrap { position: relative; margin-bottom: 14px; }
        .bl-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 15px; pointer-events: none; }
        .bl-search {
          width: 100%; box-sizing: border-box;
          padding: 13px 46px 13px 46px;
          border-radius: 14px; border: 1.5px solid var(--brd);
          background: var(--card); color: var(--txt);
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          outline: none; transition: border-color .2s, box-shadow .2s;
          box-shadow: 0 2px 12px rgba(0,0,0,.04);
        }
        .bl-search:focus { border-color: var(--or); box-shadow: 0 0 0 3px rgba(232,118,26,.1); }
        .bl-search-clear {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: var(--bg2); border: none; border-radius: 50%;
          width: 24px; height: 24px; cursor: pointer; font-size: 12px;
          color: var(--txt3); display: flex; align-items: center; justify-content: center;
        }

        /* ── Pills ── */
        .bl-pills {
          display: flex;
          flex-wrap: wrap;        /* laptop: wrap to multiple lines */
          gap: 8px;
          padding-bottom: 4px;
        }
        .bl-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 50px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 700;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: all .25s cubic-bezier(.34,1.56,.64,1);
          border: 1.5px solid var(--brd);
          background: var(--card); color: var(--txt2);
          box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }
        .bl-pill:hover {
          border-color: rgba(232,118,26,.35);
          background: #FFF6EA;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(232,118,26,.14);
        }
        .bl-pill.active {
          background: linear-gradient(135deg, var(--or), var(--gd));
          border-color: var(--or);
          color: #fff;
          box-shadow: 0 6px 18px rgba(232,118,26,.35);
          transform: translateY(-2px);
        }
        .bl-pill.active:hover { box-shadow: 0 8px 22px rgba(232,118,26,.45); transform: translateY(-3px); }
        .bl-pill-count {
          font-size: 10px; font-weight: 800;
          padding: 1px 7px; border-radius: 50px;
        }

        /* mobile: switch to horizontal scroll */
        @media (max-width: 768px) {
          .bl-pills {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .bl-pills::-webkit-scrollbar { display: none; }
          .bl-pill { padding: 7px 13px; font-size: 12px; }
        }

        /* ── Results count ── */
        .bl-result-count { margin-top: 12px; font-size: 13px; color: var(--txt3); font-weight: 600; }

        /* ── Section label ── */
        .bl-section-label {
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .bl-section-bar {
          width: 4px; height: 24px; border-radius: 2px;
          background: linear-gradient(to bottom, var(--or), var(--gd));
          flex-shrink: 0;
        }
        .bl-section-text {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 700;
          color: var(--txt3); letter-spacing: 1px; text-transform: uppercase;
        }
      `}</style>

      <div>
        {/* ── Search ── */}
        <div className="bl-search-wrap">
          <span className="bl-search-icon">🔍</span>
          <input
            className="bl-search"
            value={search}
            onChange={function(e){ setSearch(e.target.value) }}
            placeholder="Search posts, events, notices..."
          />
          {search && (
            <button className="bl-search-clear" onClick={function(){ setSearch('') }}>✕</button>
          )}
        </div>

        {/* ── Category pills ── */}
        <div className="bl-pills">
          {CATS.map(function(c) {
            var isActive = filter === c.id
            var count    = c.id === 'All' ? POSTS.length : POSTS.filter(function(p){ return p.category === c.id }).length
            return (
              <button
                key={c.id}
                className={'bl-pill' + (isActive ? ' active' : '')}
                onClick={function(){ setFilter(c.id) }}
              >
                <span style={{fontSize:'13px'}}>{c.emoji}</span>
                {c.id}
                <span className="bl-pill-count" style={{
                  background: isActive ? 'rgba(255,255,255,.25)' : 'var(--bg2)',
                  color:      isActive ? '#fff'                  : 'var(--txt3)',
                }}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {(search || filter !== 'All') && (
          <div className="bl-result-count">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {filter !== 'All' ? ' in ' + filter : ''}
            {search ? ' for "' + search + '"' : ''}
          </div>
        )}

        <div style={{marginBottom:'36px'}} />

        {/* ── Featured post ── */}
        {featured && (
          <div style={{marginBottom:'36px'}}>
            <div className="bl-section-label">
              <div className="bl-section-bar" />
              <span className="bl-section-text">Featured Story</span>
            </div>
            <BlogCard post={featured} featured={true} />
          </div>
        )}

        {/* ── Rest of posts ── */}
        {rest.length > 0 && (
          <>
            <div className="bl-section-label">
              <div className="bl-section-bar" />
              <span className="bl-section-text">
                {filter === 'All' ? 'All Posts' : filter} · {rest.length} article{rest.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:'20px'}}>
              {rest.map(function(post) {
                return <BlogCard key={post.slug} post={post} featured={false} />
              })}
            </div>
          </>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div style={{textAlign:'center', padding:'80px 20px'}}>
            <div style={{fontSize:'56px', marginBottom:'16px'}}>📭</div>
            <div style={{fontFamily:"'Playfair Display',serif", fontSize:'20px', fontWeight:'700', color:'var(--dark)', marginBottom:'8px'}}>No posts found</div>
            <div style={{fontSize:'14px', color:'var(--txt3)', marginBottom:'20px'}}>Try a different search or category</div>
            <button onClick={function(){ setSearch(''); setFilter('All') }} style={{padding:'10px 24px',borderRadius:'50px',border:'none',cursor:'pointer',background:'var(--or)',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:'13px',fontWeight:'700'}}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}