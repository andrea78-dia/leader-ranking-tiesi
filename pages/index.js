import React, { useState, useCallback, useRef } from 'react';
import Head from 'next/head';

const CONFIG = {
  MAKE_WEBHOOK: 'https://hook.eu1.make.com/pnvv5e9q48jl2z38kl13cvqtzaiwb9q2',
};

const USERS = {
  admin: { password: 'nwg2026admin', role: 'admin', name: 'Admin', canSeeAll: true },
  assistente: { password: 'nwg2026ass', role: 'assistente', name: 'Assistente', canSeeAll: true },
  tiesi_patrizio: { password: 'tiesip2026', role: 'k', name: 'Tiesi Patrizio', group: 'TIESI PATRIZIO' },
  tiesi_andrea: { password: 'tiesia2026', role: 'k', name: 'Tiesi Andrea', group: 'TIESI ANDREA' },
  magri_thomas: { password: 'magri2026', role: 'k', name: "Magrì Thomas", group: "MAGRI' THOMAS" },
  ventura_marcello: { password: 'ventura2026', role: 'k', name: 'Ventura Marcello', group: 'VENTURA MARCELLO' },
  colletta_leonardo: { password: 'colletta2026', role: 'k', name: 'Colletta Leonardo', group: 'COLLETTA LEONARDO' },
};

const K_NAMES = ['TIESI PATRIZIO', 'TIESI ANDREA', "MAGRI' THOMAS", 'VENTURA MARCELLO', 'COLLETTA LEONARDO'];

export default function Home() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [csvData, setCsvData] = useState(null);
  const [csvType, setCsvType] = useState('seminario');
  const [rankings, setRankings] = useState(null);
  const [selectedRanking, setSelectedRanking] = useState('ivd_iscritti');
  const [excludeK, setExcludeK] = useState(false);
  const [eventName, setEventName] = useState('SEMINARIO');
  const [eventDate, setEventDate] = useState('14 GENNAIO 2026');
  const [isDragging, setIsDragging] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');

  const handleLogin = () => {
    const userConfig = USERS[loginForm.username.toLowerCase().replace(/\s+/g, '_')];
    if (userConfig && userConfig.password === loginForm.password) {
      setUser({ ...userConfig, username: loginForm.username });
      setLoginError('');
    } else {
      setLoginError('Username o password non validi');
    }
  };

  const handleLogout = () => {
    setUser(null); setCsvData(null); setRankings(null); setLoginForm({ username: '', password: '' });
  };

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(/[,;]/).map(h => h.trim().replace(/"/g, '').replace(/^\uFEFF/, ''));
    return lines.slice(1).map(line => {
      const values = []; let current = ''; let inQuotes = false;
      for (let char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if ((char === ',' || char === ';') && !inQuotes) { values.push(current.trim()); current = ''; }
        else current += char;
      }
      values.push(current.trim());
      const row = {};
      headers.forEach((h, i) => { row[h] = (values[i] || '').replace(/"/g, ''); });
      return row;
    });
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) processFile(file);
    else alert('Per favore carica un file CSV');
  };

  const handleFileUpload = (e) => { const file = e.target.files[0]; if (file) processFile(file); };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = parseCSV(event.target.result);
        setCsvData(data);
        const headers = Object.keys(data[0] || {});
        if (headers.some(h => h.includes('Presente'))) { setCsvType('seminario'); generateRankings(data, 'seminario', excludeK); }
        else if (headers.some(h => h.includes('POD') || h.includes('Energia'))) { setCsvType('luce_amica'); generateRankings(data, 'luce_amica', excludeK); }
        else if (headers.some(h => h.includes('Fv') || h.includes('FV'))) { setCsvType('fotovoltaico'); generateRankings(data, 'fotovoltaico', excludeK); }
        else if (headers.some(h => h.includes('Attivazione') || h.includes('Vipoffice'))) { setCsvType('attivazioni'); generateRankings(data, 'attivazioni', excludeK); }
        else { setCsvType('seminario'); generateRankings(data, 'seminario', excludeK); }
      } catch (err) { alert('Errore: ' + err.message); }
    };
    reader.readAsText(file, 'UTF-8');
  };

  const generateRankings = (data, type, filterK) => {
    const isK = (name) => K_NAMES.some(k => (name||'').toUpperCase().includes(k));
    const ivdStats = {}, sdpStats = {}, nwStats = {}, kStats = {};
    
    const ivdField = type === 'attivazioni' ? 'IVD' : 'Nome Intermediario';
    const sdpField = type === 'fotovoltaico' ? 'Nome Primo SDP FV' : 'Nome Primo SDP LA';
    const statoField = type === 'seminario' ? 'Presente SI' : (type === 'attivazioni' ? 'Stato' : (type === 'fotovoltaico' ? 'Stato' : 'Stato NWG Energia'));
    
    data.forEach(row => {
      const ivd = (row[ivdField] || row['Nome Intermediario'] || '').trim();
      const sdp = (row[sdpField] || row['Nome Primo SDP Fv'] || row['Nome Primo SDP La'] || '').trim();
      const nw = (row['Nome Primo Networker'] || '').trim();
      const k = (row['Nome Primo K'] || '').trim();
      const stato = (row[statoField] || row['Stato NWG Spa'] || row['Stato Vipoffice IVD'] || '').toLowerCase();
      
      const val2Check = type === 'seminario' ? stato === 'si' : (stato.includes('accettato') || stato.includes('attivo') || stato.includes('active') || stato.includes('aac'));
      
      if (ivd && (!filterK || !isK(ivd))) {
        if (!ivdStats[ivd]) ivdStats[ivd] = { v1: 0, v2: 0 };
        ivdStats[ivd].v1++; if (val2Check) ivdStats[ivd].v2++;
      }
      if (sdp && (!filterK || !isK(sdp))) {
        if (!sdpStats[sdp]) sdpStats[sdp] = { v1: 0, v2: 0 };
        sdpStats[sdp].v1++; if (val2Check) sdpStats[sdp].v2++;
      }
      if (nw && (!filterK || !isK(nw))) {
        if (!nwStats[nw]) nwStats[nw] = { v1: 0, v2: 0 };
        nwStats[nw].v1++; if (val2Check) nwStats[nw].v2++;
      }
      if (k) {
        if (!kStats[k]) kStats[k] = { v1: 0, v2: 0 };
        kStats[k].v1++; if (val2Check) kStats[k].v2++;
      }
    });

    const sort = (a, b) => b[1].v1 - a[1].v1;
    const totV2 = data.filter(r => {
      const stato = (r[statoField] || r['Stato NWG Spa'] || r['Stato Vipoffice IVD'] || '').toLowerCase();
      return type === 'seminario' ? stato === 'si' : (stato.includes('accettato') || stato.includes('attivo') || stato.includes('active') || stato.includes('aac'));
    }).length;

    setRankings({
      type, excludeK: filterK,
      ivd: Object.entries(ivdStats).sort(sort),
      sdp: Object.entries(sdpStats).sort(sort),
      nw: Object.entries(nwStats).sort(sort),
      k: Object.entries(kStats).sort(sort),
      totals: { v1: data.length, v2: totV2 }
    });
    setSelectedRanking('ivd');
  };

  const toggleExcludeK = () => {
    const newVal = !excludeK; setExcludeK(newVal);
    if (csvData) generateRankings(csvData, csvType, newVal);
  };

  const getRankingData = () => {
    if (!rankings) return [];
    if (selectedRanking === 'ivd') return rankings.ivd || [];
    if (selectedRanking === 'sdp') return rankings.sdp || [];
    if (selectedRanking === 'nw') return rankings.nw || [];
    if (selectedRanking === 'k') return rankings.k || [];
    return [];
  };

  const sendToMake = async () => {
    setIsSending(true); setSendStatus('Invio...');
    try {
      const data = getRankingData();
      await fetch(CONFIG.MAKE_WEBHOOK, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, mode: 'no-cors',
        body: JSON.stringify({
          ranking_type: selectedRanking, csv_type: csvType, event_name: eventName, event_date: eventDate,
          exclude_k: excludeK, timestamp: new Date().toISOString(),
          top10: data.slice(0, 10).map(([name, s], i) => ({ pos: i+1, name, v1: s.v1, v2: s.v2, pct: Math.round(s.v2/s.v1*100)||0 })),
          totals: rankings?.totals
        })
      });
      setSendStatus('✅ Inviato!'); setTimeout(() => setSendStatus(''), 3000);
    } catch (err) { setSendStatus('❌ Errore'); setTimeout(() => setSendStatus(''), 3000); }
    finally { setIsSending(false); }
  };

  const labels = rankings?.type === 'seminario' ? { c1: 'ISCRITTI', c2: 'PRESENTI' } : { c1: 'INSERITI', c2: 'ACCETTATI' };

  if (!user) {
    return (
      <><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width, initial-scale=1" /></Head>
      <div style={S.loginContainer}>
        <div style={S.loginCard}>
          <div style={S.loginLogo}><span style={S.logoL}>LEADER</span><span style={S.logoR}>RANKING</span></div>
          <h1 style={S.loginTitle}>Team Tiesi</h1>
          <p style={S.loginSub}>Accedi per gestire le classifiche</p>
          <div style={S.inputGroup}><label style={S.label}>Username</label><input type="text" style={S.input} value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} placeholder="Inserisci username" /></div>
          <div style={S.inputGroup}><label style={S.label}>Password</label><input type="password" style={S.input} value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} /></div>
          {loginError && <p style={S.error}>{loginError}</p>}
          <button style={S.loginBtn} onClick={handleLogin}>Accedi</button>
        </div>
      </div></>
    );
  }

  return (
    <><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width, initial-scale=1" /></Head>
    <div style={S.dash}>
      <header style={S.header}>
        <div style={S.headerL}><span style={S.headerLogo}>LEADER RANKING</span><span style={S.badge}>{user.role.toUpperCase()}</span>{csvData && <span style={S.csvBadge}>{csvType.replace('_',' ').toUpperCase()}</span>}</div>
        <div style={S.headerR}><span style={S.userName}>👤 {user.name}</span><button style={S.logoutBtn} onClick={handleLogout}>Esci</button></div>
      </header>
      <main style={S.main}>
        <aside style={S.sidebar}>
          <h3 style={S.sideTitle}>📊 Classifiche</h3>
          {rankings ? ['ivd','sdp','nw','k'].map(t => (
            <button key={t} style={{...S.menuItem, ...(selectedRanking===t?S.menuActive:{})}} onClick={()=>setSelectedRanking(t)}>
              {t==='ivd'&&'🟠 IVD'}{t==='sdp'&&'🔵 SDP'}{t==='nw'&&'🟣 Networker'}{t==='k'&&'🟡 Primo K'}
            </button>
          )) : <p style={S.noMenu}>Carica CSV</p>}
          <div style={S.divider}/>
          {(user.role==='admin'||user.role==='assistente') && <div style={S.filterSec}>
            <h4 style={S.filterTitle}>⚙️ Filtri</h4>
            <label style={S.toggle}><input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={S.check}/><span>Escludi K</span></label>
            {excludeK && <p style={S.filterNote}>⚠️ K esclusi</p>}
          </div>}
          <div style={S.divider}/>
          {(user.role==='admin'||user.role==='assistente') && <div style={S.eventCfg}>
            <h4 style={S.filterTitle}>📅 Evento</h4>
            <input style={S.inputSm} value={eventName} onChange={e=>setEventName(e.target.value)} placeholder="Nome"/>
            <input style={S.inputSm} value={eventDate} onChange={e=>setEventDate(e.target.value)} placeholder="Data"/>
          </div>}
        </aside>
        <section style={S.content}>
          {(user.role==='admin'||user.role==='assistente') && <div style={S.uploadSec}>
            <h2 style={S.secTitle}>📤 Carica CSV</h2>
            <div style={{...S.uploadBox,...(isDragging?S.uploadDrag:{})}} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              <input type="file" accept=".csv" onChange={handleFileUpload} style={S.fileInput} id="csv"/>
              <label htmlFor="csv" style={S.uploadLabel}>{isDragging?'📥 Rilascia qui!':csvData?`✅ ${csvData.length} righe`:'📁 Trascina CSV o clicca'}</label>
            </div>
          </div>}
          {rankings ? <div style={S.rankSec}>
            <div style={S.rankHeader}>
              <h2 style={S.secTitle}>{selectedRanking==='ivd'&&'🟠 IVD'}{selectedRanking==='sdp'&&'🔵 SDP'}{selectedRanking==='nw'&&'🟣 Networker'}{selectedRanking==='k'&&'🟡 K'}</h2>
              <div style={S.stats}><span style={S.statItem}><span style={S.statL}>{labels.c1}</span><span style={S.statV1}>{rankings.totals.v1}</span></span><span style={S.statItem}><span style={S.statL}>{labels.c2}</span><span style={S.statV2}>{rankings.totals.v2}</span></span><span style={S.statItem}><span style={S.statL}>%</span><span style={S.statV3}>{Math.round(rankings.totals.v2/rankings.totals.v1*100)||0}%</span></span></div>
            </div>
            {rankings.excludeK && selectedRanking!=='k' && <div style={S.filterBadge}>🚫 K esclusi</div>}
            <table style={S.table}><thead><tr><th style={S.th}>#</th><th style={{...S.th,textAlign:'left'}}>Nome</th><th style={S.th}>{labels.c1}</th><th style={S.th}>{labels.c2}</th><th style={S.th}>%</th></tr></thead>
            <tbody>{getRankingData().map(([name,s],i)=>{const pct=s.v1>0?Math.round(s.v2/s.v1*100):0;return(
              <tr key={name} style={i===0?S.trFirst:S.tr}><td style={S.tdPos}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}°`}</td><td style={S.tdName}>{name}</td><td style={S.tdV1}>{s.v1}</td><td style={S.tdV2}>{s.v2}</td><td style={S.tdPct}><div style={S.pctBar}><div style={{...S.pctFill,width:`${pct}%`,background:pct>=70?'#4CAF50':pct>=40?'#FFC107':'#FF5722'}}/></div>{pct}%</td></tr>
            );})}</tbody></table>
            {(user.role==='admin'||user.role==='assistente') && <div style={S.exportSec}>
              <button style={S.btnBot} onClick={sendToMake} disabled={isSending}>{isSending?'⏳...':'🤖 Invia a Bot'}</button>
              {sendStatus && <span style={S.status}>{sendStatus}</span>}
            </div>}
          </div> : <div style={S.noData}><span style={{fontSize:'60px'}}>📊</span><h3>Carica un CSV</h3><p>Trascina: Seminario, Luce Amica, FV, Attivazioni</p></div>}
        </section>
      </main>
    </div></>
  );
}

const S={loginContainer:{minHeight:'100vh',background:'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'-apple-system,sans-serif'},loginCard:{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'50px 40px',width:'100%',maxWidth:420,textAlign:'center'},loginLogo:{marginBottom:20},logoL:{fontSize:38,fontWeight:800,color:'#7C4DFF',letterSpacing:3},logoR:{fontSize:38,fontWeight:300,color:'white',marginLeft:10},loginTitle:{fontSize:28,fontWeight:600,color:'white',marginBottom:8},loginSub:{fontSize:14,color:'rgba(255,255,255,0.5)',marginBottom:30},inputGroup:{marginBottom:20,textAlign:'left'},label:{display:'block',fontSize:12,color:'rgba(255,255,255,0.6)',marginBottom:8,textTransform:'uppercase',letterSpacing:1},input:{width:'100%',padding:'15px 18px',fontSize:16,border:'2px solid rgba(255,255,255,0.1)',borderRadius:12,background:'rgba(255,255,255,0.05)',color:'white',outline:'none',boxSizing:'border-box'},error:{color:'#FF5252',fontSize:14,marginBottom:15},loginBtn:{width:'100%',padding:16,fontSize:16,fontWeight:700,border:'none',borderRadius:12,background:'linear-gradient(135deg,#7C4DFF,#536DFE)',color:'white',cursor:'pointer',textTransform:'uppercase',letterSpacing:2,marginTop:10},
dash:{minHeight:'100vh',background:'#0f0f1a',color:'white',fontFamily:'-apple-system,sans-serif'},header:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 30px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.05)',flexWrap:'wrap',gap:10},headerL:{display:'flex',alignItems:'center',gap:15,flexWrap:'wrap'},headerLogo:{fontSize:22,fontWeight:800,color:'#7C4DFF',letterSpacing:2},badge:{fontSize:11,padding:'5px 12px',background:'rgba(124,77,255,0.2)',color:'#7C4DFF',borderRadius:20,fontWeight:700},csvBadge:{fontSize:10,padding:'4px 10px',background:'rgba(76,175,80,0.2)',color:'#4CAF50',borderRadius:15,fontWeight:700},headerR:{display:'flex',alignItems:'center',gap:20},userName:{fontSize:14,color:'rgba(255,255,255,0.7)'},logoutBtn:{padding:'8px 20px',fontSize:13,border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,background:'transparent',color:'white',cursor:'pointer'},
main:{display:'flex',minHeight:'calc(100vh - 60px)'},sidebar:{width:280,minWidth:280,background:'rgba(255,255,255,0.02)',borderRight:'1px solid rgba(255,255,255,0.05)',padding:'25px 20px',overflowY:'auto'},sideTitle:{fontSize:13,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:2,marginBottom:15},menuItem:{display:'block',width:'100%',padding:'14px 18px',fontSize:14,fontWeight:500,border:'none',borderRadius:10,background:'transparent',color:'rgba(255,255,255,0.7)',cursor:'pointer',textAlign:'left',marginBottom:5},menuActive:{background:'rgba(124,77,255,0.2)',color:'#7C4DFF'},noMenu:{fontSize:13,color:'rgba(255,255,255,0.4)',padding:10},divider:{height:1,background:'rgba(255,255,255,0.1)',margin:'20px 0'},filterSec:{padding:'0 5px'},filterTitle:{fontSize:12,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:1,marginBottom:12},toggle:{display:'flex',alignItems:'center',gap:10,cursor:'pointer',fontSize:13,color:'rgba(255,255,255,0.8)'},check:{width:18,height:18,accentColor:'#7C4DFF'},filterNote:{fontSize:11,color:'#FFC107',marginTop:10,padding:'8px 10px',background:'rgba(255,193,7,0.1)',borderRadius:6},eventCfg:{padding:'0 5px'},inputSm:{width:'100%',padding:'10px 12px',fontSize:13,border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,background:'rgba(255,255,255,0.05)',color:'white',marginBottom:10,outline:'none',boxSizing:'border-box'},
content:{flex:1,padding:30,overflowY:'auto'},secTitle:{fontSize:20,fontWeight:600,color:'white',marginBottom:20},uploadSec:{marginBottom:30},uploadBox:{border:'2px dashed rgba(124,77,255,0.3)',borderRadius:12,padding:'40px 30px',textAlign:'center',transition:'all 0.3s',cursor:'pointer'},uploadDrag:{borderColor:'#7C4DFF',background:'rgba(124,77,255,0.1)',transform:'scale(1.02)'},fileInput:{display:'none'},uploadLabel:{display:'inline-block',padding:'15px 30px',fontSize:15,fontWeight:600,color:'#7C4DFF',cursor:'pointer',borderRadius:10,background:'rgba(124,77,255,0.1)'},
rankSec:{background:'rgba(255,255,255,0.02)',borderRadius:16,padding:25,border:'1px solid rgba(255,255,255,0.05)'},rankHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:15},stats:{display:'flex',gap:20},statItem:{display:'flex',flexDirection:'column',alignItems:'center'},statL:{fontSize:11,color:'rgba(255,255,255,0.4)',textTransform:'uppercase'},statV1:{fontSize:24,fontWeight:700,color:'#FF6B35'},statV2:{fontSize:24,fontWeight:700,color:'#4CAF50'},statV3:{fontSize:24,fontWeight:700,color:'#7C4DFF'},filterBadge:{display:'inline-block',padding:'8px 15px',fontSize:12,background:'rgba(255,193,7,0.15)',color:'#FFC107',borderRadius:20,marginBottom:15},
table:{width:'100%',borderCollapse:'collapse'},th:{padding:'12px 15px',fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:1,textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.1)'},tr:{borderBottom:'1px solid rgba(255,255,255,0.05)'},trFirst:{background:'rgba(124,77,255,0.1)',borderBottom:'1px solid rgba(124,77,255,0.2)'},tdPos:{padding:15,fontSize:18,textAlign:'center',width:60},tdName:{padding:15,fontSize:14,fontWeight:600,textTransform:'uppercase'},tdV1:{padding:15,fontSize:18,fontWeight:700,textAlign:'center',color:'#FF6B35'},tdV2:{padding:15,fontSize:18,fontWeight:700,textAlign:'center',color:'#4CAF50'},tdPct:{padding:15,width:120},pctBar:{height:8,background:'rgba(255,255,255,0.1)',borderRadius:4,overflow:'hidden',marginBottom:5},pctFill:{height:'100%',borderRadius:4},
exportSec:{display:'flex',gap:15,marginTop:25,paddingTop:20,borderTop:'1px solid rgba(255,255,255,0.1)',alignItems:'center',flexWrap:'wrap'},btnBot:{padding:'14px 28px',fontSize:14,fontWeight:700,border:'none',borderRadius:10,background:'linear-gradient(135deg,#00BFA5,#1DE9B6)',color:'white',cursor:'pointer'},status:{fontSize:13,color:'#4CAF50',marginLeft:10},
noData:{textAlign:'center',padding:'80px 20px',color:'rgba(255,255,255,0.4)'}};
