import React, { useState } from 'react';
import Head from 'next/head';

const USERS = {
  admin: { password: 'nwg2026admin', role: 'admin', name: 'Admin' },
  assistente: { password: 'nwg2026ass', role: 'assistente', name: 'Assistente' },
  tiesi_patrizio: { password: 'tiesip2026', role: 'k', name: 'Tiesi Patrizio' },
  tiesi_andrea: { password: 'tiesia2026', role: 'k', name: 'Tiesi Andrea' },
  magri_thomas: { password: 'magri2026', role: 'k', name: "Magrì Thomas" },
  ventura_marcello: { password: 'ventura2026', role: 'k', name: 'Ventura Marcello' },
  colletta_leonardo: { password: 'colletta2026', role: 'k', name: 'Colletta Leonardo' },
};
const K_NAMES = ['TIESI PATRIZIO', 'TIESI ANDREA', "MAGRI' THOMAS", 'VENTURA MARCELLO', 'COLLETTA LEONARDO'];

export default function Home() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [csvData, setCsvData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [csvType, setCsvType] = useState('luce_amica');
  const [rankings, setRankings] = useState(null);
  const [selectedRanking, setSelectedRanking] = useState('ivd_inseriti');
  const [excludeK, setExcludeK] = useState(false);
  const [eventName, setEventName] = useState('LUCE AMICA');
  const [eventDate, setEventDate] = useState('GENNAIO 2026');
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [availableMonths, setAvailableMonths] = useState([]);

  const [sendStatus, setSendStatus] = useState('');

  const handleLogin = () => {
    const u = USERS[loginForm.username.toLowerCase().replace(/\s+/g, '_')];
    if (u && u.password === loginForm.password) { setUser({ ...u, username: loginForm.username }); setLoginError(''); }
    else setLoginError('Credenziali non valide');
  };

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(/[,;]/).map(h => h.trim().replace(/"/g, '').replace(/^\uFEFF/, ''));
    return lines.slice(1).map(line => {
      const values = []; let current = ''; let inQuotes = false;
      for (let c of line) { if (c === '"') inQuotes = !inQuotes; else if ((c === ',' || c === ';') && !inQuotes) { values.push(current.trim()); current = ''; } else current += c; }
      values.push(current.trim());
      const row = {}; headers.forEach((h, i) => { row[h] = (values[i] || '').replace(/"/g, ''); }); return row;
    });
  };

  const getRowMonth = (row) => row['Mese di Produzione'] || row['Mese_di_Produzione'] || null;
  
  const extractMonths = (data) => {
    const months = new Set(); data.forEach(r => { const m = getRowMonth(r); if (m) months.add(m); });
    return Array.from(months).sort((a, b) => {
      const order = { 'Gennaio': 1, 'Febbraio': 2, 'Marzo': 3, 'Aprile': 4, 'Maggio': 5, 'Giugno': 6, 'Luglio': 7, 'Agosto': 8, 'Settembre': 9, 'Ottobre': 10, 'Novembre': 11, 'Dicembre': 12 };
      const [mA, yA] = a.split(' '); const [mB, yB] = b.split(' ');
      return yA !== yB ? parseInt(yB) - parseInt(yA) : order[mB] - order[mA];
    });
  };

  const filterByMonth = (data, month) => month ? data.filter(r => getRowMonth(r) === month) : data;

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    if (csvData && month) { const f = filterByMonth(csvData, month); setFilteredData(f); generateRankings(f, csvType, excludeK); setEventDate(month.toUpperCase()); }
  };

  const handleShowAll = () => { setSelectedMonth(''); if (csvData) { setFilteredData(csvData); generateRankings(csvData, csvType, excludeK); } };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = parseCSV(e.target.result);
      setCsvData(data); setFilteredData(data);
      const months = extractMonths(data); setAvailableMonths(months);
      if (months.length > 0) { setSelectedMonth(months[0]); setEventDate(months[0].toUpperCase()); }
      const headers = Object.keys(data[0] || {}).join(' ').toLowerCase();
      let type = 'luce_amica';
      if (headers.includes('presente')) type = 'seminario';
      else if (headers.includes('fv') || headers.includes('fotovoltaico')) type = 'fotovoltaico';
      else if (headers.includes('attivazione') || headers.includes('vipoffice')) type = 'attivazioni';
      setCsvType(type);
      setEventName(type === 'seminario' ? 'SEMINARIO' : type === 'luce_amica' ? 'LUCE AMICA' : type === 'fotovoltaico' ? 'FOTOVOLTAICO' : 'ATTIVAZIONI');
      generateRankings(data, type, excludeK);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const generateRankings = (data, type, filterK) => {
    const isK = (name) => K_NAMES.some(k => (name||'').toUpperCase().includes(k));
    const ivd = {}, sdp = {}, nw = {}, k = {};
    const getF = (row, fields) => { for (let f of fields) if (row[f]?.trim()) return row[f].trim(); return ''; };
    
    data.forEach(row => {
      const ivdN = getF(row, ['Nome Intermediario', 'IVD', 'Nome IVD']);
      const sdpN = getF(row, ['Nome Primo SDP FV', 'Nome Primo SDP LA', 'Nome Primo SDP']);
      const nwN = getF(row, ['Nome Primo Networker', 'Networker']);
      const kN = getF(row, ['Nome Primo K', 'K']);
      let isV2 = type === 'seminario' ? (row['Presente SI'] || '').toLowerCase() === 'si' : 
        getF(row, ['Stato NWG Energia', 'Stato NWG Spa', 'Stato', 'Stato Vipoffice IVD']).toLowerCase().match(/accettato|attivo|active|aac/);
      
      if (ivdN && (!filterK || !isK(ivdN))) { if (!ivd[ivdN]) ivd[ivdN] = {v1:0,v2:0}; ivd[ivdN].v1++; if (isV2) ivd[ivdN].v2++; }
      if (sdpN && (!filterK || !isK(sdpN))) { if (!sdp[sdpN]) sdp[sdpN] = {v1:0,v2:0}; sdp[sdpN].v1++; if (isV2) sdp[sdpN].v2++; }
      if (nwN && (!filterK || !isK(nwN))) { if (!nw[nwN]) nw[nwN] = {v1:0,v2:0}; nw[nwN].v1++; if (isV2) nw[nwN].v2++; }
      if (kN) { if (!k[kN]) k[kN] = {v1:0,v2:0}; k[kN].v1++; if (isV2) k[kN].v2++; }
    });

    const sV1 = (a, b) => b[1].v1 - a[1].v1, sV2 = (a, b) => b[1].v2 - a[1].v2;
    setRankings({
      type, excludeK: filterK,
      ivd_inseriti: Object.entries(ivd).sort(sV1),
      ivd_accettati: Object.entries(ivd).filter(([,s]) => s.v2 > 0).sort(sV2),
      sdp_inseriti: Object.entries(sdp).sort(sV1),
      sdp_accettati: Object.entries(sdp).filter(([,s]) => s.v2 > 0).sort(sV2),
      nw: Object.entries(nw).sort(sV1),
      k: Object.entries(k).sort(sV1),
      totals: { v1: data.length, v2: Object.values(ivd).reduce((s, x) => s + x.v2, 0) }
    });
    setSelectedRanking('ivd_inseriti');
  };

  const toggleExcludeK = () => { const n = !excludeK; setExcludeK(n); if (filteredData) generateRankings(filteredData, csvType, n); };
  const getData = () => rankings ? (rankings[selectedRanking] || []) : [];
  const getLabels = () => rankings?.type === 'seminario' ? { c1: 'ISCRITTI', c2: 'PRESENTI' } : { c1: 'INSERITI', c2: 'ACCETTATI' };
  const isCombined = () => ['nw', 'k'].includes(selectedRanking);
  
  const getColors = () => {
    const c = {
      ivd_inseriti: { p: '#FF6B35', s: '#FF8C5A', bg: '#1a0f0a' },
      ivd_accettati: { p: '#4CAF50', s: '#81C784', bg: '#0a1a0c' },
      sdp_inseriti: { p: '#2196F3', s: '#64B5F6', bg: '#0a0f1a' },
      sdp_accettati: { p: '#4CAF50', s: '#81C784', bg: '#0a1a0c' },
      nw: { p: '#9C27B0', s: '#BA68C8', bg: '#1a0a1a' },
      k: { p: '#FFD700', s: '#FFA000', bg: '#1a1500' }
    };
    return c[selectedRanking] || { p: '#7C4DFF', s: '#B388FF', bg: '#0f0f1a' };
  };

  // PNG - TUTTI I PARTECIPANTI
  const generatePNG = () => {
    const data = getData(); if (!data.length) return null;
    const colors = getColors(); const labels = getLabels(); const combined = isCombined();
    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
    
    const W = 800, headerH = 150, footerH = 50, rowH = combined ? 48 : 40;
    const H = headerH + (data.length * rowH) + footerH; // TUTTI!
    canvas.width = W; canvas.height = H;
    
    // BG
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0f0f1a'); bg.addColorStop(0.5, colors.bg); bg.addColorStop(1, '#0f0f1a');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    
    // Header bar
    const hg = ctx.createLinearGradient(0, 0, W, 0);
    hg.addColorStop(0, colors.p); hg.addColorStop(1, colors.s);
    ctx.fillStyle = hg; ctx.fillRect(0, 0, W, 5);
    
    // Logo
    ctx.fillStyle = colors.p; ctx.font = 'bold 14px Arial'; ctx.fillText('NWG ITALIA', 25, 35);
    
    // Title
    const titles = { ivd_inseriti: `IVD ${labels.c1}`, ivd_accettati: `IVD ${labels.c2}`, sdp_inseriti: `SDP ${labels.c1}`, sdp_accettati: `SDP ${labels.c2}`, nw: 'NETWORKER', k: 'PRIMO K' };
    ctx.fillStyle = '#FFF'; ctx.font = 'bold 28px Arial'; ctx.fillText(`CLASSIFICA ${titles[selectedRanking]}`, 25, 75);
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '14px Arial'; ctx.fillText(`${eventName} • ${eventDate}`, 25, 100);
    
    // Stats box
    const t = rankings.totals, pct = Math.round(t.v2/t.v1*100)||0;
    ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.beginPath(); ctx.roundRect(W-250, 20, 225, 70, 8); ctx.fill();
    ctx.font = 'bold 24px Arial'; ctx.textAlign = 'center';
    ctx.fillStyle = colors.p; ctx.fillText(t.v1, W-185, 52);
    ctx.fillStyle = '#4CAF50'; ctx.fillText(t.v2, W-105, 52);
    ctx.fillStyle = pct >= 60 ? '#4CAF50' : pct >= 40 ? '#FFC107' : '#FF5722'; ctx.fillText(`${pct}%`, W-35, 52);
    ctx.font = '9px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(labels.c1, W-185, 72); ctx.fillText(labels.c2, W-105, 72); ctx.fillText('CONV', W-35, 72);
    ctx.textAlign = 'left';
    
    // Rows - TUTTI!
    const startY = headerH;
    data.forEach(([name, s], i) => {
      const y = startY + (i * rowH);
      const p = s.v1 > 0 ? Math.round(s.v2/s.v1*100) : 0;
      
      // Row bg
      if (i < 3) { const rg = ctx.createLinearGradient(20, y, W-20, y); rg.addColorStop(0, `${colors.p}20`); rg.addColorStop(1, 'transparent'); ctx.fillStyle = rg; ctx.beginPath(); ctx.roundRect(20, y+1, W-40, rowH-2, 5); ctx.fill(); }
      else if (i % 2 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.01)'; ctx.fillRect(20, y, W-40, rowH); }
      
      // Position
      ctx.font = i < 3 ? 'bold 16px Arial' : '13px Arial';
      if (i === 0) ctx.fillText('🥇', 28, y + 26);
      else if (i === 1) ctx.fillText('🥈', 28, y + 26);
      else if (i === 2) ctx.fillText('🥉', 28, y + 26);
      else { ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillText(`${i+1}°`, 30, y + 24); }
      
      // Name
      ctx.fillStyle = i < 3 ? '#FFF' : 'rgba(255,255,255,0.85)';
      ctx.font = i < 3 ? 'bold 13px Arial' : '12px Arial';
      ctx.fillText((name.length > 32 ? name.substring(0,32)+'...' : name).toUpperCase(), 65, y + 25);
      
      if (combined) {
        ctx.fillStyle = colors.p; ctx.font = 'bold 14px Arial'; ctx.textAlign = 'center';
        ctx.fillText(s.v1, W-180, y + 25);
        // Bar
        ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.beginPath(); ctx.roundRect(W-145, y+13, 60, 10, 3); ctx.fill();
        const fc = p >= 70 ? '#4CAF50' : p >= 40 ? '#FFC107' : '#FF5722';
        ctx.fillStyle = fc; ctx.beginPath(); ctx.roundRect(W-145, y+13, 60*p/100, 10, 3); ctx.fill();
        ctx.fillStyle = '#4CAF50'; ctx.fillText(s.v2, W-65, y + 25);
        ctx.fillStyle = fc; ctx.font = '10px Arial'; ctx.fillText(`${p}%`, W-25, y + 25);
        ctx.textAlign = 'left';
      } else {
        const v = selectedRanking.includes('accettati') ? s.v2 : s.v1;
        ctx.fillStyle = selectedRanking.includes('accettati') ? '#4CAF50' : colors.p;
        ctx.font = i < 3 ? 'bold 18px Arial' : 'bold 15px Arial';
        ctx.textAlign = 'right'; ctx.fillText(v, W-30, y + 26); ctx.textAlign = 'left';
      }
    });
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(20, H-45, W-40, 1);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '11px Arial';
    ctx.fillText(`📊 ${data.length} partecipanti totali`, 25, H-18);
    ctx.textAlign = 'right'; ctx.fillText('LEADER RANKING • TEAM TIESI', W-25, H-18);
    
    return canvas.toDataURL('image/png');
  };

  const handleGenerate = () => { const img = generatePNG(); if (img) { setPreviewImage(img); setShowPreview(true); } };
  const download = () => { if (previewImage) { const a = document.createElement('a'); a.download = `classifica_${selectedRanking}_${eventDate.replace(/\s/g,'_')}.png`; a.href = previewImage; a.click(); } };

  const handleSendToBot = async () => {
    setSendStatus('Invio...');
    const img = generatePNG();
    if (!img) { setSendStatus('Errore'); return; }
    try {
      await fetch('https://hook.eu1.make.com/yxawj0edtdnd4a7rvap2loca9vqccrk7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          source: 'webapp',
          ranking_type: selectedRanking,
          csv_type: csvType,
          event_name: eventName,
          event_date: eventDate,
          exclude_k: excludeK,
          timestamp: new Date().toISOString(),
          image_base64: img,
          top10: getData().slice(0, 10).map(([name, s], i) => ({ pos: i+1, name, v1: s.v1, v2: s.v2, pct: Math.round(s.v2/s.v1*100)||0 })),
          totals: rankings?.totals,
          total_participants: getData().length
        })
      });
      setSendStatus('✅ Inviato!');
      setTimeout(() => setSendStatus(''), 3000);
    } catch (e) {
      setSendStatus('❌ Errore');
      setTimeout(() => setSendStatus(''), 3000);
    }
  };

  const labels = getLabels(); const colors = getColors();

  // LOGIN
  if (!user) return (
    <><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/></Head>
    <div style={S.loginWrap}><div style={S.loginCard}>
      <div style={S.logo}><span style={{color:'#7C4DFF',fontWeight:800}}>LEADER</span> <span style={{fontWeight:300}}>RANKING</span></div>
      <h1 style={{fontSize:22,margin:'10px 0 5px'}}>Team Tiesi</h1>
      <p style={{color:'rgba(255,255,255,0.5)',marginBottom:25,fontSize:13}}>Accedi per gestire le classifiche</p>
      <input style={S.input} placeholder="Username" value={loginForm.username} onChange={e=>setLoginForm({...loginForm,username:e.target.value})}/>
      <input style={S.input} type="password" placeholder="Password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} onKeyPress={e=>e.key==='Enter'&&handleLogin()}/>
      {loginError && <p style={{color:'#f44',fontSize:13}}>{loginError}</p>}
      <button style={S.btn} onClick={handleLogin}>ACCEDI</button>
    </div></div></>
  );

  // PREVIEW
  if (showPreview && previewImage) return (
    <><Head><title>Anteprima</title></Head>
    <div style={S.previewWrap}><div style={S.previewModal}>
      <h2 style={{color:'#fff',marginBottom:5}}>📸 Classifica Completa</h2>
      <p style={{color:'rgba(255,255,255,0.5)',fontSize:13,marginBottom:15}}>✅ {getData().length} partecipanti - Scorri per vedere tutti</p>
      <div style={S.previewImg}><img src={previewImage} style={{maxWidth:'100%'}}/></div>
      <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:15}}>
        <button style={{...S.btn,background:'transparent',border:'1px solid rgba(255,255,255,0.2)'}} onClick={()=>setShowPreview(false)}>Chiudi</button>
        <button style={{...S.btn,background:'linear-gradient(135deg,#4CAF50,#81C784)'}} onClick={download}>📥 Scarica PNG</button>
      </div>
    </div></div></>
  );

  // DASHBOARD
  return (
    <><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/></Head>
    <div style={S.dash}>
      <header style={S.header}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button style={S.menuBtn} onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
          <span style={{fontWeight:800,color:'#7C4DFF'}}>LEADER RANKING</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={S.badge}>{user.role.toUpperCase()}</span>
          <button style={{...S.btn,padding:'6px 12px',fontSize:12,background:'transparent',border:'1px solid rgba(255,255,255,0.2)'}} onClick={()=>{setUser(null);setCsvData(null);setRankings(null);}}>Esci</button>
        </div>
      </header>

      <main style={{display:'flex'}}>
        <aside style={{...S.sidebar,...(mobileMenuOpen?{transform:'translateX(0)'}:{})}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:15}}>
            <span style={{fontSize:12,color:'rgba(255,255,255,0.4)',letterSpacing:1}}>📊 CLASSIFICHE</span>
            <button style={{background:'none',border:'none',color:'#fff',fontSize:18,cursor:'pointer'}} onClick={()=>setMobileMenuOpen(false)}>✕</button>
          </div>
          
          {rankings ? (<>
            <p style={S.catLabel}>IVD</p>
            <button style={{...S.menuItem,...(selectedRanking==='ivd_inseriti'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('ivd_inseriti');setMobileMenuOpen(false);}}>🟠 {labels.c1} ({rankings.ivd_inseriti.length})</button>
            <button style={{...S.menuItem,...(selectedRanking==='ivd_accettati'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('ivd_accettati');setMobileMenuOpen(false);}}>🟢 {labels.c2} ({rankings.ivd_accettati.length})</button>
            <p style={S.catLabel}>SDP</p>
            <button style={{...S.menuItem,...(selectedRanking==='sdp_inseriti'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('sdp_inseriti');setMobileMenuOpen(false);}}>🔵 {labels.c1} ({rankings.sdp_inseriti.length})</button>
            <button style={{...S.menuItem,...(selectedRanking==='sdp_accettati'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('sdp_accettati');setMobileMenuOpen(false);}}>🟢 {labels.c2} ({rankings.sdp_accettati.length})</button>
            <p style={S.catLabel}>MANAGER</p>
            <button style={{...S.menuItem,...(selectedRanking==='nw'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('nw');setMobileMenuOpen(false);}}>🟣 Networker ({rankings.nw.length})</button>
            <button style={{...S.menuItem,...(selectedRanking==='k'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('k');setMobileMenuOpen(false);}}>🟡 Primo K ({rankings.k.length})</button>
          </>) : <p style={{color:'rgba(255,255,255,0.4)',fontSize:12}}>Carica CSV</p>}
          
          <div style={S.divider}/>
          
          {(user.role==='admin'||user.role==='assistente') && (<>
            <p style={S.catLabel}>⚙️ FILTRI</p>
            <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,cursor:'pointer',color:'rgba(255,255,255,0.8)'}}>
              <input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={{accentColor:'#7C4DFF'}}/> Escludi K
            </label>
            
            <div style={S.divider}/>
            
            <p style={S.catLabel}>📅 PERIODO</p>
            <button style={{...S.periodBtn,...(!selectedMonth?{background:'rgba(124,77,255,0.2)',color:'#7C4DFF'}:{})}} onClick={handleShowAll}>Tutti ({csvData?.length||0})</button>
            {availableMonths.length > 0 && <select style={S.select} value={selectedMonth} onChange={e=>handleMonthChange(e.target.value)}>
              <option value="">-- Mese --</option>
              {availableMonths.map(m=><option key={m} value={m}>{m}</option>)}
            </select>}
            
            <div style={S.divider}/>
            
            <p style={S.catLabel}>🏷️ ETICHETTE</p>
            <input style={S.inputSm} value={eventName} onChange={e=>setEventName(e.target.value)} placeholder="Nome evento"/>
            <input style={S.inputSm} value={eventDate} onChange={e=>setEventDate(e.target.value)} placeholder="Periodo"/>
          </>)}
        </aside>

        {mobileMenuOpen && <div style={S.overlay} onClick={()=>setMobileMenuOpen(false)}/>}

        <section style={S.content}>
          {(user.role==='admin'||user.role==='assistente') && (
            <div style={{...S.uploadBox,...(isDragging?{borderColor:'#7C4DFF',background:'rgba(124,77,255,0.1)'}:{})}} 
              onDragOver={e=>{e.preventDefault();setIsDragging(true);}} onDragLeave={e=>{e.preventDefault();setIsDragging(false);}} 
              onDrop={e=>{e.preventDefault();setIsDragging(false);const f=e.dataTransfer.files[0];if(f?.name.endsWith('.csv'))processFile(f);}}>
              <input type="file" accept=".csv" id="csv" style={{display:'none'}} onChange={e=>{if(e.target.files[0])processFile(e.target.files[0]);}}/>
              <label htmlFor="csv" style={{cursor:'pointer',padding:'10px 20px',background:'rgba(124,77,255,0.1)',borderRadius:8,color:'#7C4DFF',fontWeight:600}}>
                {filteredData ? `✅ ${filteredData.length} righe` : '📤 Carica CSV'}
              </label>
            </div>
          )}

          {rankings ? (
            <div style={S.rankCard}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:10,marginBottom:15}}>
                <div>
                  <h2 style={{color:colors.p,fontSize:18,margin:0}}>
                    {selectedRanking==='ivd_inseriti'&&`🟠 IVD ${labels.c1}`}
                    {selectedRanking==='ivd_accettati'&&`🟢 IVD ${labels.c2}`}
                    {selectedRanking==='sdp_inseriti'&&`🔵 SDP ${labels.c1}`}
                    {selectedRanking==='sdp_accettati'&&`🟢 SDP ${labels.c2}`}
                    {selectedRanking==='nw'&&'🟣 Networker'}
                    {selectedRanking==='k'&&'🟡 Primo K'}
                  </h2>
                  <p style={{color:'rgba(255,255,255,0.5)',fontSize:12,marginTop:4}}>{getData().length} partecipanti</p>
                </div>
                <div style={{display:'flex',gap:15}}>
                  <div style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:700,color:colors.p}}>{rankings.totals.v1}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.4)'}}>{labels.c1}</div></div>
                  <div style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:700,color:'#4CAF50'}}>{rankings.totals.v2}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.4)'}}>{labels.c2}</div></div>
                  <div style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:700,color:'#7C4DFF'}}>{Math.round(rankings.totals.v2/rankings.totals.v1*100)||0}%</div><div style={{fontSize:9,color:'rgba(255,255,255,0.4)'}}>CONV</div></div>
                </div>
              </div>
              
              <div style={{overflowX:'auto',maxHeight:'55vh',overflowY:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',minWidth:300}}>
                  <thead><tr style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
                    <th style={S.th}>#</th><th style={{...S.th,textAlign:'left'}}>Nome</th>
                    {isCombined() ? <><th style={S.th}>{labels.c1}</th><th style={S.th}>%</th><th style={S.th}>{labels.c2}</th></> : <th style={S.th}>{selectedRanking.includes('accettati')?labels.c2:labels.c1}</th>}
                  </tr></thead>
                  <tbody>
                    {getData().map(([name,s],i)=>{
                      const p = s.v1>0?Math.round(s.v2/s.v1*100):0;
                      return <tr key={name} style={{borderBottom:'1px solid rgba(255,255,255,0.05)',...(i<3?{background:`${colors.p}10`}:{})}}>
                        <td style={{padding:10,textAlign:'center'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td>
                        <td style={{padding:10,fontWeight:i<3?700:500,fontSize:13}}>{name}</td>
                        {isCombined() ? <>
                          <td style={{padding:10,textAlign:'center',color:colors.p,fontWeight:700}}>{s.v1}</td>
                          <td style={{padding:10,textAlign:'center',color:p>=70?'#4CAF50':p>=40?'#FFC107':'#FF5722',fontSize:12}}>{p}%</td>
                          <td style={{padding:10,textAlign:'center',color:'#4CAF50',fontWeight:700}}>{s.v2}</td>
                        </> : <td style={{padding:10,textAlign:'center',color:selectedRanking.includes('accettati')?'#4CAF50':colors.p,fontWeight:700,fontSize:16}}>{selectedRanking.includes('accettati')?s.v2:s.v1}</td>}
                      </tr>;
                    })}
                  </tbody>
                </table>
              </div>
              
              {(user.role==='admin'||user.role==='assistente') && (
                <div style={{display:'flex',gap:10,marginTop:15,flexWrap:'wrap',alignItems:'center'}}>
                  <button style={{...S.btn,flex:1,minWidth:120,background:`linear-gradient(135deg,${colors.p},${colors.s})`}} onClick={handleGenerate}>
                    📸 PNG ({getData().length})
                  </button>
                  <button style={{...S.btn,flex:1,minWidth:120,background:'linear-gradient(135deg,#00BFA5,#1DE9B6)'}} onClick={handleSendToBot}>
                    🤖 Invia a Bot
                  </button>
                  {sendStatus && <span style={{fontSize:13,color:sendStatus.includes('✅')?'#4CAF50':sendStatus.includes('❌')?'#f44':'#FFC107'}}>{sendStatus}</span>}
                </div>
              )}
            </div>
          ) : <div style={{textAlign:'center',padding:60,color:'rgba(255,255,255,0.4)'}}><div style={{fontSize:50}}>📊</div><p>Carica un CSV</p></div>}
        </section>
      </main>
    </div></>
  );
}

const S = {
  loginWrap:{minHeight:'100vh',background:'linear-gradient(135deg,#1a1a2e,#16213e)',display:'flex',alignItems:'center',justifyContent:'center',padding:15,fontFamily:'-apple-system,sans-serif'},
  loginCard:{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:'40px 25px',width:'100%',maxWidth:360,textAlign:'center',color:'#fff'},
  logo:{fontSize:26,marginBottom:10},
  input:{width:'100%',padding:'14px 16px',fontSize:15,border:'1px solid rgba(255,255,255,0.15)',borderRadius:10,background:'rgba(255,255,255,0.05)',color:'#fff',marginBottom:12,outline:'none',boxSizing:'border-box'},
  btn:{padding:'14px 24px',fontSize:14,fontWeight:700,border:'none',borderRadius:10,background:'linear-gradient(135deg,#7C4DFF,#536DFE)',color:'#fff',cursor:'pointer',width:'100%'},
  previewWrap:{position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:15},
  previewModal:{background:'#1a1a2e',borderRadius:16,padding:20,width:'100%',maxWidth:850,maxHeight:'95vh',display:'flex',flexDirection:'column'},
  previewImg:{background:'#0a0a15',borderRadius:10,padding:10,overflow:'auto',flex:1,maxHeight:'70vh'},
  dash:{minHeight:'100vh',background:'#0f0f1a',color:'#fff',fontFamily:'-apple-system,sans-serif'},
  header:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 15px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.05)',position:'sticky',top:0,zIndex:100},
  menuBtn:{background:'none',border:'none',color:'#fff',fontSize:22,cursor:'pointer'},
  badge:{fontSize:10,padding:'4px 10px',background:'rgba(124,77,255,0.2)',color:'#7C4DFF',borderRadius:15,fontWeight:700},
  sidebar:{position:'fixed',top:0,left:0,width:260,height:'100vh',background:'#12121f',padding:'60px 15px 20px',overflowY:'auto',zIndex:200,transform:'translateX(-100%)',transition:'transform 0.3s',boxSizing:'border-box'},
  overlay:{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:150},
  catLabel:{fontSize:10,color:'rgba(255,255,255,0.3)',letterSpacing:1,marginTop:15,marginBottom:6},
  menuItem:{display:'block',width:'100%',padding:'10px 14px',fontSize:13,border:'none',borderRadius:8,background:'transparent',color:'rgba(255,255,255,0.7)',cursor:'pointer',textAlign:'left',marginBottom:2},
  menuActive:{background:'rgba(124,77,255,0.2)',color:'#7C4DFF'},
  divider:{height:1,background:'rgba(255,255,255,0.08)',margin:'15px 0'},
  periodBtn:{display:'block',width:'100%',padding:'8px 12px',fontSize:12,border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,background:'transparent',color:'rgba(255,255,255,0.6)',cursor:'pointer',marginBottom:8,textAlign:'left'},
  select:{width:'100%',padding:'10px',fontSize:13,border:'1px solid rgba(255,255,255,0.15)',borderRadius:6,background:'rgba(255,255,255,0.05)',color:'#fff',marginBottom:8},
  inputSm:{width:'100%',padding:'8px 10px',fontSize:12,border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,background:'rgba(255,255,255,0.05)',color:'#fff',marginBottom:8,boxSizing:'border-box'},
  content:{flex:1,padding:15,minHeight:'calc(100vh - 60px)'},
  uploadBox:{border:'2px dashed rgba(124,77,255,0.3)',borderRadius:10,padding:'20px',textAlign:'center',marginBottom:15,transition:'all 0.3s'},
  rankCard:{background:'rgba(255,255,255,0.02)',borderRadius:12,padding:15,border:'1px solid rgba(255,255,255,0.05)'},
  th:{padding:10,fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',textAlign:'center'},
};
