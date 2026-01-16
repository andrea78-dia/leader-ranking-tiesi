import React, { useState, useCallback, useRef, useEffect } from 'react';
import Head from 'next/head';

const CONFIG = {
  MAKE_WEBHOOK: 'https://hook.eu1.make.com/yxawj0edtdnd4a7rvap2loca9vqccrk7',
};

// Calendario Produzione 2025-2026
const PRODUCTION_CALENDAR = {
  'Gennaio 2026': { start: '2026-01-07 13:00', end: '2026-02-02 11:00' },
  'Febbraio 2026': { start: '2026-02-02 13:00', end: '2026-03-02 10:30' },
  'Marzo 2026': { start: '2026-03-02 13:00', end: '2026-04-07 11:00' },
  'Aprile 2026': { start: '2026-04-07 13:00', end: '2026-05-04 11:00' },
  'Maggio 2026': { start: '2026-05-04 13:00', end: '2026-06-03 11:00' },
  'Giugno 2026': { start: '2026-06-03 13:00', end: '2026-07-01 11:00' },
  'Luglio 2026': { start: '2026-07-01 13:00', end: '2026-08-03 11:00' },
  'Agosto 2026': { start: '2026-08-03 13:00', end: '2026-09-01 11:00' },
  'Settembre 2026': { start: '2026-09-01 13:00', end: '2026-10-01 11:00' },
  'Ottobre 2026': { start: '2026-10-01 13:00', end: '2026-11-03 11:00' },
  'Novembre 2026': { start: '2026-11-03 13:00', end: '2026-12-01 11:00' },
  'Dicembre 2026': { start: '2026-12-01 13:00', end: '2027-01-07 11:00' },
  'Gennaio 2025': { start: '2025-01-07 13:00', end: '2025-02-03 11:00' },
  'Febbraio 2025': { start: '2025-02-03 13:00', end: '2025-03-03 11:00' },
  'Marzo 2025': { start: '2025-03-03 13:00', end: '2025-04-07 11:00' },
  'Aprile 2025': { start: '2025-04-07 13:00', end: '2025-05-05 11:00' },
  'Maggio 2025': { start: '2025-05-05 13:00', end: '2025-06-02 11:00' },
  'Giugno 2025': { start: '2025-06-02 13:00', end: '2025-07-07 11:00' },
  'Luglio 2025': { start: '2025-07-07 13:00', end: '2025-08-04 11:00' },
  'Agosto 2025': { start: '2025-08-04 13:00', end: '2025-09-01 11:00' },
  'Settembre 2025': { start: '2025-09-01 13:00', end: '2025-10-06 11:00' },
  'Ottobre 2025': { start: '2025-10-06 13:00', end: '2025-11-03 11:00' },
  'Novembre 2025': { start: '2025-11-03 13:00', end: '2025-12-01 11:00' },
  'Dicembre 2025': { start: '2025-12-01 13:00', end: '2026-01-07 11:00' },
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
  const [filteredData, setFilteredData] = useState(null);
  const [csvType, setCsvType] = useState('seminario');
  const [rankings, setRankings] = useState(null);
  const [selectedRanking, setSelectedRanking] = useState('ivd_inseriti');
  const [excludeK, setExcludeK] = useState(false);
  const [eventName, setEventName] = useState('LUCE AMICA');
  const [eventDate, setEventDate] = useState('GENNAIO 2026');
  const [isDragging, setIsDragging] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [selectedMonth, setSelectedMonth] = useState('');
  const [availableMonths, setAvailableMonths] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [periodType, setPeriodType] = useState('all');

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
    setUser(null); setCsvData(null); setFilteredData(null); setRankings(null); 
    setLoginForm({ username: '', password: '' }); setShowPreview(false);
    setAvailableMonths([]); setSelectedMonth('');
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

  const parseDateTime = (str) => {
    if (!str) return null;
    const match = str.match(/(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/);
    if (match) {
      return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]),
        parseInt(match[4] || 0), parseInt(match[5] || 0), parseInt(match[6] || 0));
    }
    return null;
  };

  const getRowDate = (row) => {
    const fields = ['Inserimento', 'Data Inserimento', 'Data_Inserimento', 'Data'];
    for (let f of fields) { if (row[f]) return parseDateTime(row[f]); }
    return null;
  };

  const getRowMonth = (row) => {
    if (row['Mese di Produzione']) return row['Mese di Produzione'];
    if (row['Mese_di_Produzione']) return row['Mese_di_Produzione'];
    if (row['Periodo di Produzione']) return row['Periodo di Produzione'];
    return null;
  };

  const extractAvailableMonths = (data) => {
    const months = new Set();
    data.forEach(row => { const m = getRowMonth(row); if (m) months.add(m); });
    return Array.from(months).sort((a, b) => {
      const order = { 'Gennaio': 1, 'Febbraio': 2, 'Marzo': 3, 'Aprile': 4, 'Maggio': 5, 'Giugno': 6,
                      'Luglio': 7, 'Agosto': 8, 'Settembre': 9, 'Ottobre': 10, 'Novembre': 11, 'Dicembre': 12 };
      const [mA, yA] = a.split(' '); const [mB, yB] = b.split(' ');
      if (yA !== yB) return parseInt(yB) - parseInt(yA);
      return order[mB] - order[mA];
    });
  };

  const filterByMonth = (data, month) => month ? data.filter(row => getRowMonth(row) === month) : data;

  const filterByDateRange = (data, from, to) => {
    if (!from && !to) return data;
    const fromDate = from ? parseDateTime(from) : null;
    const toDate = to ? parseDateTime(to) : null;
    return data.filter(row => {
      const rowDate = getRowDate(row);
      if (!rowDate) return true;
      if (fromDate && rowDate < fromDate) return false;
      if (toDate && rowDate > toDate) return false;
      return true;
    });
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setPeriodType('month');
    if (csvData && month) {
      if (PRODUCTION_CALENDAR[month]) {
        setDateFrom(PRODUCTION_CALENDAR[month].start);
        setDateTo(PRODUCTION_CALENDAR[month].end);
      }
      const filtered = filterByMonth(csvData, month);
      setFilteredData(filtered);
      generateRankings(filtered, csvType, excludeK);
      setEventDate(month.toUpperCase());
    }
  };

  const handleShowAll = () => {
    setPeriodType('all'); setSelectedMonth('');
    if (csvData) { setFilteredData(csvData); generateRankings(csvData, csvType, excludeK); }
  };

  const handleCustomFilter = () => {
    setPeriodType('custom');
    if (csvData && dateFrom && dateTo) {
      const filtered = filterByDateRange(csvData, dateFrom, dateTo);
      setFilteredData(filtered);
      generateRankings(filtered, csvType, excludeK);
    }
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
        setCsvData(data); setFilteredData(data);
        const months = extractAvailableMonths(data);
        setAvailableMonths(months);
        if (months.length > 0) { setSelectedMonth(months[0]); setEventDate(months[0].toUpperCase()); }
        const headers = Object.keys(data[0] || {}).join(' ').toLowerCase();
        let type = 'seminario';
        if (headers.includes('presente')) type = 'seminario';
        else if (headers.includes('pod') || headers.includes('luce') || headers.includes('energia')) type = 'luce_amica';
        else if (headers.includes('fv') || headers.includes('fotovoltaico') || headers.includes('impianto')) type = 'fotovoltaico';
        else if (headers.includes('attivazione') || headers.includes('vipoffice') || headers.includes('start')) type = 'attivazioni';
        setCsvType(type);
        setEventName(type === 'seminario' ? 'SEMINARIO' : type === 'luce_amica' ? 'LUCE AMICA' : type === 'fotovoltaico' ? 'FOTOVOLTAICO' : 'ATTIVAZIONI');
        generateRankings(data, type, excludeK);
      } catch (err) { alert('Errore: ' + err.message); }
    };
    reader.readAsText(file, 'UTF-8');
  };

  const generateRankings = (data, type, filterK) => {
    const isK = (name) => K_NAMES.some(k => (name||'').toUpperCase().includes(k));
    const ivdStats = {}, sdpStats = {}, nwStats = {}, kStats = {};
    const getField = (row, fields) => { for (let f of fields) { if (row[f] && row[f].trim()) return row[f].trim(); } return ''; };
    
    data.forEach(row => {
      const ivd = getField(row, ['Nome Intermediario', 'IVD', 'Nome IVD']);
      const sdp = getField(row, ['Nome Primo SDP FV', 'Nome Primo SDP LA', 'Nome Primo SDP Fv', 'Nome Primo SDP La']);
      const nw = getField(row, ['Nome Primo Networker']);
      const k = getField(row, ['Nome Primo K']);
      let isVal2 = false;
      if (type === 'seminario') { isVal2 = (row['Presente SI'] || '').toLowerCase() === 'si'; }
      else {
        const stato = getField(row, ['Stato NWG Energia', 'Stato NWG Spa', 'Stato', 'Stato Vipoffice IVD']).toLowerCase();
        isVal2 = stato.includes('accettato') || stato.includes('attivo') || stato.includes('active') || stato.includes('aac');
      }
      if (ivd && (!filterK || !isK(ivd))) { if (!ivdStats[ivd]) ivdStats[ivd] = { v1: 0, v2: 0 }; ivdStats[ivd].v1++; if (isVal2) ivdStats[ivd].v2++; }
      if (sdp && (!filterK || !isK(sdp))) { if (!sdpStats[sdp]) sdpStats[sdp] = { v1: 0, v2: 0 }; sdpStats[sdp].v1++; if (isVal2) sdpStats[sdp].v2++; }
      if (nw && (!filterK || !isK(nw))) { if (!nwStats[nw]) nwStats[nw] = { v1: 0, v2: 0 }; nwStats[nw].v1++; if (isVal2) nwStats[nw].v2++; }
      if (k) { if (!kStats[k]) kStats[k] = { v1: 0, v2: 0 }; kStats[k].v1++; if (isVal2) kStats[k].v2++; }
    });

    const sortV1 = (a, b) => b[1].v1 - a[1].v1;
    const sortV2 = (a, b) => b[1].v2 - a[1].v2;
    setRankings({
      type, excludeK: filterK,
      ivd_inseriti: Object.entries(ivdStats).sort(sortV1),
      ivd_accettati: Object.entries(ivdStats).filter(([,s]) => s.v2 > 0).sort(sortV2),
      sdp_inseriti: Object.entries(sdpStats).sort(sortV1),
      sdp_accettati: Object.entries(sdpStats).filter(([,s]) => s.v2 > 0).sort(sortV2),
      nw: Object.entries(nwStats).sort(sortV1),
      k: Object.entries(kStats).sort(sortV1),
      totals: { v1: data.length, v2: Object.values(ivdStats).reduce((sum, s) => sum + s.v2, 0) }
    });
    setSelectedRanking('ivd_inseriti');
  };

  const toggleExcludeK = () => { const nv = !excludeK; setExcludeK(nv); if (filteredData) generateRankings(filteredData, csvType, nv); };
  const getRankingData = () => rankings ? (rankings[selectedRanking] || []) : [];
  const getLabels = () => rankings?.type === 'seminario' ? { c1: 'ISCRITTI', c2: 'PRESENTI' } : { c1: 'INSERITI', c2: 'ACCETTATI' };
  const isCombinedRanking = () => ['nw', 'k'].includes(selectedRanking);
  const getColorScheme = () => {
    if (selectedRanking.includes('ivd')) return { primary: '#FF6B35', bg: 'rgba(255,107,53,0.1)' };
    if (selectedRanking.includes('sdp')) return { primary: '#2196F3', bg: 'rgba(33,150,243,0.1)' };
    if (selectedRanking === 'nw') return { primary: '#7C4DFF', bg: 'rgba(124,77,255,0.1)' };
    if (selectedRanking === 'k') return { primary: '#D4AF37', bg: 'rgba(212,175,55,0.1)' };
    return { primary: '#7C4DFF', bg: 'rgba(124,77,255,0.1)' };
  };

  const generatePNG = () => {
    const data = getRankingData(); if (data.length === 0) return null;
    const colors = getColorScheme(); const labels = getLabels(); const isCombined = isCombinedRanking();
    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
    const width = 700; const rowHeight = isCombined ? 55 : 45; const headerHeight = 140; const footerHeight = 80;
    const maxRows = Math.min(data.length, isCombined ? 10 : 15);
    const height = headerHeight + (maxRows * rowHeight) + footerHeight;
    canvas.width = width; canvas.height = height;
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#1a1a2e'); bgGrad.addColorStop(1, '#16213e');
    ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = colors.primary; ctx.font = 'bold 14px Arial'; ctx.fillText('NWG ITALIA', 30, 35);
    ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 28px Arial';
    let title = selectedRanking === 'ivd_inseriti' ? `CLASSIFICA IVD ${labels.c1}` :
                selectedRanking === 'ivd_accettati' ? `CLASSIFICA IVD ${labels.c2}` :
                selectedRanking === 'sdp_inseriti' ? `CLASSIFICA SDP ${labels.c1}` :
                selectedRanking === 'sdp_accettati' ? `CLASSIFICA SDP ${labels.c2}` :
                selectedRanking === 'nw' ? 'CLASSIFICA NETWORKER' : 'CLASSIFICA PRIMO K';
    ctx.fillText(title, 30, 75);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '14px Arial';
    ctx.fillText(`${eventName} - ${eventDate}`, 30, 105);
    ctx.fillStyle = colors.primary; ctx.font = 'bold 32px Arial'; ctx.textAlign = 'right';
    ctx.fillText(rankings.totals.v1.toString(), width - 120, 55);
    ctx.fillStyle = '#4CAF50'; ctx.fillText(rankings.totals.v2.toString(), width - 40, 55);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '11px Arial';
    ctx.fillText(labels.c1, width - 120, 75); ctx.fillText(labels.c2, width - 40, 75); ctx.textAlign = 'left';
    const startY = headerHeight;
    data.slice(0, maxRows).forEach(([name, stats], i) => {
      const y = startY + (i * rowHeight); const pct = stats.v1 > 0 ? Math.round(stats.v2 / stats.v1 * 100) : 0;
      if (i === 0) { ctx.fillStyle = colors.bg; ctx.fillRect(20, y, width - 40, rowHeight - 5); }
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = i === 0 ? colors.primary : i < 3 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)';
      ctx.fillText(i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`, 35, y + 32);
      ctx.fillStyle = i === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.9)';
      ctx.font = i === 0 ? 'bold 16px Arial' : '15px Arial';
      ctx.fillText((name.length > 25 ? name.substring(0, 25) + '...' : name).toUpperCase(), 85, y + 32);
      if (isCombined) {
        ctx.fillStyle = colors.primary; ctx.font = 'bold 18px Arial'; ctx.textAlign = 'center';
        ctx.fillText(stats.v1.toString(), width - 200, y + 32);
        ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(width - 170, y + 18, 80, 12);
        const fillColor = pct >= 70 ? '#4CAF50' : pct >= 40 ? '#FFC107' : '#FF5722';
        ctx.fillStyle = fillColor; ctx.fillRect(width - 170, y + 18, (80 * pct / 100), 12);
        ctx.fillStyle = '#4CAF50'; ctx.font = 'bold 18px Arial'; ctx.fillText(stats.v2.toString(), width - 70, y + 32);
        ctx.fillStyle = fillColor; ctx.font = 'bold 14px Arial'; ctx.fillText(`${pct}%`, width - 30, y + 32); ctx.textAlign = 'left';
      } else {
        ctx.fillStyle = selectedRanking.includes('accettati') ? '#4CAF50' : colors.primary;
        ctx.font = 'bold 22px Arial'; ctx.textAlign = 'right';
        ctx.fillText((selectedRanking.includes('accettati') ? stats.v2 : stats.v1).toString(), width - 40, y + 32); ctx.textAlign = 'left';
      }
    });
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(20, height - 70, width - 40, 1);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '12px Arial';
    ctx.fillText(`${data.length} partecipanti • ${Math.round(rankings.totals.v2 / rankings.totals.v1 * 100) || 0}% conversione`, 30, height - 40);
    return canvas.toDataURL('image/png');
  };

  const handleGeneratePNG = () => { const img = generatePNG(); if (img) { setPreviewImage(img); setShowPreview(true); } };
  const downloadPNG = () => { if (previewImage) { const a = document.createElement('a'); a.download = `classifica_${selectedRanking}_${eventDate.replace(/\s/g,'_')}.png`; a.href = previewImage; a.click(); } };
  
  const sendToMake = async () => {
    setIsSending(true); setSendStatus('Invio...');
    try {
      const imageData = previewImage || generatePNG();
      await fetch(CONFIG.MAKE_WEBHOOK, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, mode: 'no-cors',
        body: JSON.stringify({
          ranking_type: selectedRanking, csv_type: csvType, event_name: eventName, event_date: eventDate,
          exclude_k: excludeK, timestamp: new Date().toISOString(), image_base64: imageData,
          top10: getRankingData().slice(0, 10).map(([name, s], i) => ({ pos: i+1, name, v1: s.v1, v2: s.v2, pct: Math.round(s.v2/s.v1*100)||0 })),
          totals: rankings?.totals
        })
      });
      setSendStatus('✅ Inviato!'); setShowPreview(false); setTimeout(() => setSendStatus(''), 3000);
    } catch { setSendStatus('❌ Errore'); setTimeout(() => setSendStatus(''), 3000); }
    finally { setIsSending(false); }
  };

  const labels = getLabels();
  const colors = getColorScheme();

  // LOGIN SCREEN - Mobile Responsive
  if (!user) {
    return (
      <><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /></Head>
      <div style={S.loginContainer}>
        <div style={S.loginCard}>
          <div style={S.loginLogo}><span style={S.logoL}>LEADER</span><span style={S.logoR}>RANKING</span></div>
          <h1 style={S.loginTitle}>Team Tiesi</h1>
          <p style={S.loginSub}>Accedi per gestire le classifiche</p>
          <div style={S.inputGroup}><label style={S.label}>USERNAME</label><input type="text" style={S.input} value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} placeholder="Inserisci username" /></div>
          <div style={S.inputGroup}><label style={S.label}>PASSWORD</label><input type="password" style={S.input} value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} /></div>
          {loginError && <p style={S.error}>{loginError}</p>}
          <button style={S.loginBtn} onClick={handleLogin}>ACCEDI</button>
        </div>
      </div></>
    );
  }

  // PREVIEW MODAL
  if (showPreview && previewImage) {
    return (
      <><Head><title>Anteprima</title></Head>
      <div style={S.previewOverlay}>
        <div style={S.previewModal}>
          <h2 style={S.previewTitle}>📸 Anteprima</h2>
          <div style={S.previewImageContainer}><img src={previewImage} alt="Preview" style={S.previewImage} /></div>
          <div style={S.previewButtons}>
            <button style={S.btnCancel} onClick={() => setShowPreview(false)}>❌</button>
            <button style={S.btnDownload} onClick={downloadPNG}>📥 Scarica</button>
            <button style={S.btnSend} onClick={sendToMake} disabled={isSending}>{isSending ? '⏳' : '🤖 Invia'}</button>
          </div>
          {sendStatus && <p style={S.statusMsg}>{sendStatus}</p>}
        </div>
      </div></>
    );
  }

  // MAIN DASHBOARD - Mobile Responsive
  return (
    <><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /></Head>
    <div style={S.dash}>
      {/* HEADER */}
      <header style={S.header}>
        <div style={S.headerL}>
          <button style={S.menuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
          <span style={S.headerLogo}>LEADER RANKING</span>
        </div>
        <div style={S.headerR}>
          <span style={S.badge}>{user.role.toUpperCase()}</span>
          <button style={S.logoutBtn} onClick={handleLogout}>Esci</button>
        </div>
      </header>
      
      <main style={S.main}>
        {/* SIDEBAR - Collapsible on Mobile */}
        <aside style={{...S.sidebar, ...(mobileMenuOpen ? S.sidebarOpen : {})}}>
          <div style={S.sidebarHeader}>
            <h3 style={S.sideTitle}>📊 Classifiche</h3>
            <button style={S.closeBtn} onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          
          {rankings ? (
            <>
              <p style={S.catLabel}>IVD</p>
              <button style={{...S.menuItem, ...(selectedRanking==='ivd_inseriti'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('ivd_inseriti');setMobileMenuOpen(false);}}>🟠 {labels.c1}</button>
              <button style={{...S.menuItem, ...(selectedRanking==='ivd_accettati'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('ivd_accettati');setMobileMenuOpen(false);}}>🟢 {labels.c2}</button>
              <p style={S.catLabel}>SDP</p>
              <button style={{...S.menuItem, ...(selectedRanking==='sdp_inseriti'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('sdp_inseriti');setMobileMenuOpen(false);}}>🔵 {labels.c1}</button>
              <button style={{...S.menuItem, ...(selectedRanking==='sdp_accettati'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('sdp_accettati');setMobileMenuOpen(false);}}>🟢 {labels.c2}</button>
              <p style={S.catLabel}>Manager</p>
              <button style={{...S.menuItem, ...(selectedRanking==='nw'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('nw');setMobileMenuOpen(false);}}>🟣 Networker</button>
              <button style={{...S.menuItem, ...(selectedRanking==='k'?S.menuActive:{})}} onClick={()=>{setSelectedRanking('k');setMobileMenuOpen(false);}}>🟡 Primo K</button>
            </>
          ) : <p style={S.noMenu}>Carica CSV</p>}
          
          <div style={S.divider}/>
          
          {(user.role==='admin'||user.role==='assistente') && (
            <>
              <h4 style={S.filterTitle}>⚙️ Filtri</h4>
              <label style={S.toggle}><input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={S.check}/><span>Escludi K</span></label>
              
              <div style={S.divider}/>
              
              <h4 style={S.filterTitle}>📅 Mese Produzione</h4>
              <button style={{...S.periodBtn, ...(periodType==='all'?S.periodActive:{})}} onClick={handleShowAll}>📋 Tutti ({csvData?.length || 0})</button>
              {availableMonths.length > 0 && (
                <select style={S.select} value={selectedMonth} onChange={(e) => handleMonthChange(e.target.value)}>
                  <option value="">-- Mese --</option>
                  {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              )}
              
              <div style={S.divider}/>
              
              <h4 style={S.filterTitle}>📆 Custom</h4>
              <input type="datetime-local" style={S.dateInput} value={dateFrom.replace(' ','T')} onChange={e=>setDateFrom(e.target.value.replace('T',' '))} />
              <input type="datetime-local" style={S.dateInput} value={dateTo.replace(' ','T')} onChange={e=>setDateTo(e.target.value.replace('T',' '))} />
              <button style={S.applyBtn} onClick={handleCustomFilter}>Applica</button>
              
              <div style={S.divider}/>
              
              <h4 style={S.filterTitle}>🏷️ Evento</h4>
              <input style={S.inputSm} value={eventName} onChange={e=>setEventName(e.target.value)} placeholder="Nome"/>
              <input style={S.inputSm} value={eventDate} onChange={e=>setEventDate(e.target.value)} placeholder="Data"/>
            </>
          )}
        </aside>

        {/* OVERLAY for mobile menu */}
        {mobileMenuOpen && <div style={S.overlay} onClick={() => setMobileMenuOpen(false)}/>}

        {/* CONTENT */}
        <section style={S.content}>
          {/* UPLOAD */}
          {(user.role==='admin'||user.role==='assistente') && (
            <div style={S.uploadSec}>
              <div style={{...S.uploadBox,...(isDragging?S.uploadDrag:{})}} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <input type="file" accept=".csv" onChange={handleFileUpload} style={S.fileInput} id="csv"/>
                <label htmlFor="csv" style={S.uploadLabel}>
                  {isDragging ? '📥 Rilascia!' : filteredData ? `✅ ${filteredData.length} righe` : '📤 Carica CSV'}
                </label>
              </div>
            </div>
          )}

          {/* TYPE BADGE */}
          {csvData && (
            <div style={S.typeBadgeRow}>
              <span style={{...S.typeBadge, background: colors.bg, color: colors.primary}}>{csvType.replace('_',' ').toUpperCase()}</span>
              {selectedMonth && <span style={S.monthBadge}>📅 {selectedMonth}</span>}
            </div>
          )}

          {/* RANKINGS TABLE */}
          {rankings ? (
            <div style={S.rankSec}>
              <div style={S.rankHeader}>
                <h2 style={{...S.secTitle, color: colors.primary, fontSize: 18}}>
                  {selectedRanking==='ivd_inseriti' && `🟠 IVD ${labels.c1}`}
                  {selectedRanking==='ivd_accettati' && `🟢 IVD ${labels.c2}`}
                  {selectedRanking==='sdp_inseriti' && `🔵 SDP ${labels.c1}`}
                  {selectedRanking==='sdp_accettati' && `🟢 SDP ${labels.c2}`}
                  {selectedRanking==='nw' && '🟣 Networker'}
                  {selectedRanking==='k' && '🟡 Primo K'}
                </h2>
                <div style={S.stats}>
                  <span style={S.statItem}><span style={{...S.statV, color: colors.primary, fontSize: 20}}>{rankings.totals.v1}</span><span style={S.statL}>{labels.c1}</span></span>
                  <span style={S.statItem}><span style={{...S.statV, color: '#4CAF50', fontSize: 20}}>{rankings.totals.v2}</span><span style={S.statL}>{labels.c2}</span></span>
                  <span style={S.statItem}><span style={{...S.statV, color: '#7C4DFF', fontSize: 20}}>{Math.round(rankings.totals.v2/rankings.totals.v1*100)||0}%</span><span style={S.statL}>Conv</span></span>
                </div>
              </div>
              
              {rankings.excludeK && !selectedRanking.includes('k') && <div style={S.filterBadge}>🚫 K esclusi</div>}
              
              <div style={S.tableWrap}>
                <table style={S.table}>
                  <thead><tr>
                    <th style={S.th}>#</th>
                    <th style={{...S.th, textAlign:'left'}}>Nome</th>
                    {isCombinedRanking() ? (<><th style={S.th}>{labels.c1}</th><th style={S.th}>{labels.c2}</th><th style={S.th}>%</th></>) : (<th style={S.th}>{selectedRanking.includes('accettati') ? labels.c2 : labels.c1}</th>)}
                  </tr></thead>
                  <tbody>
                    {getRankingData().slice(0, 20).map(([name, s], i) => {
                      const pct = s.v1 > 0 ? Math.round(s.v2/s.v1*100) : 0;
                      return (
                        <tr key={name} style={i===0 ? {...S.tr, background: colors.bg} : S.tr}>
                          <td style={S.tdPos}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}`}</td>
                          <td style={S.tdName}>{name.length > 20 ? name.substring(0,20)+'...' : name}</td>
                          {isCombinedRanking() ? (
                            <><td style={{...S.tdV, color: colors.primary}}>{s.v1}</td>
                            <td style={{...S.tdV, color: '#4CAF50'}}>{s.v2}</td>
                            <td style={{...S.tdV, color: pct>=70?'#4CAF50':pct>=40?'#FFC107':'#FF5722', fontSize: 12}}>{pct}%</td></>
                          ) : (
                            <td style={{...S.tdV, color: selectedRanking.includes('accettati') ? '#4CAF50' : colors.primary}}>{selectedRanking.includes('accettati') ? s.v2 : s.v1}</td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* BUTTONS */}
              {(user.role==='admin'||user.role==='assistente') && (
                <div style={S.exportSec}>
                  <button style={S.btnPng} onClick={handleGeneratePNG}>📸 PNG</button>
                  <button style={S.btnBot} onClick={handleGeneratePNG}>🤖 Bot</button>
                  {sendStatus && <span style={S.status}>{sendStatus}</span>}
                </div>
              )}
            </div>
          ) : (
            <div style={S.noData}><span style={{fontSize: 50}}>📊</span><p>Carica un CSV per iniziare</p></div>
          )}
        </section>
      </main>
    </div></>
  );
}

const S = {
  // Login - Mobile First
  loginContainer:{minHeight:'100vh',background:'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',display:'flex',alignItems:'center',justifyContent:'center',padding:15,fontFamily:'-apple-system,sans-serif',boxSizing:'border-box'},
  loginCard:{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:'40px 25px',width:'100%',maxWidth:360,textAlign:'center',boxSizing:'border-box'},
  loginLogo:{marginBottom:15,display:'flex',justifyContent:'center',flexWrap:'wrap',gap:5},
  logoL:{fontSize:28,fontWeight:800,color:'#7C4DFF',letterSpacing:2},
  logoR:{fontSize:28,fontWeight:300,color:'white'},
  loginTitle:{fontSize:22,fontWeight:600,color:'white',marginBottom:5,marginTop:0},
  loginSub:{fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:25},
  inputGroup:{marginBottom:15,textAlign:'left'},
  label:{display:'block',fontSize:11,color:'rgba(255,255,255,0.6)',marginBottom:6,letterSpacing:1},
  input:{width:'100%',padding:'14px 16px',fontSize:15,border:'1px solid rgba(255,255,255,0.15)',borderRadius:10,background:'rgba(255,255,255,0.05)',color:'white',outline:'none',boxSizing:'border-box'},
  error:{color:'#FF5252',fontSize:13,marginBottom:10},
  loginBtn:{width:'100%',padding:14,fontSize:15,fontWeight:700,border:'none',borderRadius:10,background:'linear-gradient(135deg,#7C4DFF,#536DFE)',color:'white',cursor:'pointer',letterSpacing:1},
  
  // Preview
  previewOverlay:{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.95)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:15},
  previewModal:{background:'#1a1a2e',borderRadius:16,padding:20,width:'100%',maxWidth:700,textAlign:'center',maxHeight:'90vh',overflow:'auto'},
  previewTitle:{color:'white',fontSize:20,marginBottom:15},
  previewImageContainer:{background:'#0f0f1a',borderRadius:10,padding:10,marginBottom:15,overflow:'auto'},
  previewImage:{maxWidth:'100%',borderRadius:6},
  previewButtons:{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'},
  btnCancel:{padding:'12px 20px',fontSize:14,fontWeight:700,border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,background:'transparent',color:'white',cursor:'pointer'},
  btnDownload:{padding:'12px 20px',fontSize:14,fontWeight:700,border:'none',borderRadius:8,background:'#7C4DFF',color:'white',cursor:'pointer'},
  btnSend:{padding:'12px 20px',fontSize:14,fontWeight:700,border:'none',borderRadius:8,background:'#00BFA5',color:'white',cursor:'pointer'},
  statusMsg:{color:'#4CAF50',marginTop:10,fontSize:13},

  // Dashboard - Mobile First
  dash:{minHeight:'100vh',background:'#0f0f1a',color:'white',fontFamily:'-apple-system,sans-serif'},
  header:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 15px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.05)',position:'sticky',top:0,zIndex:100},
  headerL:{display:'flex',alignItems:'center',gap:10},
  menuBtn:{background:'none',border:'none',color:'white',fontSize:22,cursor:'pointer',padding:5},
  headerLogo:{fontSize:16,fontWeight:800,color:'#7C4DFF',letterSpacing:1},
  headerR:{display:'flex',alignItems:'center',gap:10},
  badge:{fontSize:10,padding:'4px 10px',background:'rgba(124,77,255,0.2)',color:'#7C4DFF',borderRadius:15,fontWeight:700},
  logoutBtn:{padding:'6px 12px',fontSize:12,border:'1px solid rgba(255,255,255,0.2)',borderRadius:6,background:'transparent',color:'white',cursor:'pointer'},
  
  main:{display:'flex',position:'relative'},
  
  // Sidebar - Mobile Drawer
  sidebar:{position:'fixed',top:0,left:0,width:280,height:'100vh',background:'#12121f',borderRight:'1px solid rgba(255,255,255,0.05)',padding:'60px 15px 20px',overflowY:'auto',zIndex:200,transform:'translateX(-100%)',transition:'transform 0.3s ease',boxSizing:'border-box'},
  sidebarOpen:{transform:'translateX(0)'},
  sidebarHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:15},
  closeBtn:{background:'none',border:'none',color:'rgba(255,255,255,0.5)',fontSize:20,cursor:'pointer'},
  overlay:{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',zIndex:150},
  
  sideTitle:{fontSize:12,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:2,margin:0},
  catLabel:{fontSize:10,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:1,marginTop:15,marginBottom:6,paddingLeft:3},
  menuItem:{display:'block',width:'100%',padding:'10px 14px',fontSize:13,fontWeight:500,border:'none',borderRadius:8,background:'transparent',color:'rgba(255,255,255,0.7)',cursor:'pointer',textAlign:'left',marginBottom:2},
  menuActive:{background:'rgba(124,77,255,0.2)',color:'#7C4DFF'},
  noMenu:{fontSize:12,color:'rgba(255,255,255,0.4)',padding:10},
  divider:{height:1,background:'rgba(255,255,255,0.08)',margin:'15px 0'},
  filterTitle:{fontSize:11,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:1,marginBottom:10},
  toggle:{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:12,color:'rgba(255,255,255,0.8)'},
  check:{width:16,height:16,accentColor:'#7C4DFF'},
  filterNote:{fontSize:10,color:'#FFC107',marginTop:8,padding:'6px 8px',background:'rgba(255,193,7,0.1)',borderRadius:5},
  periodBtn:{display:'block',width:'100%',padding:'8px 12px',fontSize:12,border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,background:'transparent',color:'rgba(255,255,255,0.6)',cursor:'pointer',marginBottom:8,textAlign:'left'},
  periodActive:{background:'rgba(124,77,255,0.2)',color:'#7C4DFF',borderColor:'#7C4DFF'},
  select:{width:'100%',padding:'10px 12px',fontSize:13,border:'1px solid rgba(255,255,255,0.15)',borderRadius:6,background:'rgba(255,255,255,0.05)',color:'white',cursor:'pointer',marginBottom:8,outline:'none'},
  dateInput:{width:'100%',padding:'8px 10px',fontSize:12,border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,background:'rgba(255,255,255,0.05)',color:'white',marginBottom:6,outline:'none',boxSizing:'border-box'},
  applyBtn:{width:'100%',padding:'8px 12px',fontSize:12,border:'none',borderRadius:6,background:'#7C4DFF',color:'white',cursor:'pointer'},
  inputSm:{width:'100%',padding:'8px 10px',fontSize:12,border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,background:'rgba(255,255,255,0.05)',color:'white',marginBottom:8,outline:'none',boxSizing:'border-box'},

  // Content
  content:{flex:1,padding:15,overflowY:'auto',minHeight:'calc(100vh - 60px)'},
  uploadSec:{marginBottom:15},
  uploadBox:{border:'2px dashed rgba(124,77,255,0.3)',borderRadius:10,padding:'20px 15px',textAlign:'center',transition:'all 0.3s',cursor:'pointer'},
  uploadDrag:{borderColor:'#7C4DFF',background:'rgba(124,77,255,0.1)'},
  fileInput:{display:'none'},
  uploadLabel:{display:'inline-block',padding:'10px 20px',fontSize:14,fontWeight:600,color:'#7C4DFF',cursor:'pointer',borderRadius:8,background:'rgba(124,77,255,0.1)'},
  
  typeBadgeRow:{display:'flex',gap:8,marginBottom:15,flexWrap:'wrap'},
  typeBadge:{fontSize:11,padding:'5px 12px',borderRadius:15,fontWeight:700},
  monthBadge:{fontSize:11,padding:'5px 12px',background:'rgba(124,77,255,0.15)',color:'#7C4DFF',borderRadius:15},
  
  rankSec:{background:'rgba(255,255,255,0.02)',borderRadius:12,padding:15,border:'1px solid rgba(255,255,255,0.05)'},
  rankHeader:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:15,flexWrap:'wrap',gap:10},
  secTitle:{fontSize:16,fontWeight:600,color:'white',margin:0},
  stats:{display:'flex',gap:15},
  statItem:{display:'flex',flexDirection:'column',alignItems:'center'},
  statL:{fontSize:9,color:'rgba(255,255,255,0.4)',textTransform:'uppercase'},
  statV:{fontSize:18,fontWeight:700},
  filterBadge:{display:'inline-block',padding:'6px 12px',fontSize:11,background:'rgba(255,193,7,0.15)',color:'#FFC107',borderRadius:15,marginBottom:10},
  
  tableWrap:{overflowX:'auto',marginBottom:15},
  table:{width:'100%',borderCollapse:'collapse',minWidth:300},
  th:{padding:'10px 8px',fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:0.5,textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.1)'},
  tr:{borderBottom:'1px solid rgba(255,255,255,0.05)'},
  tdPos:{padding:'10px 5px',fontSize:14,textAlign:'center',width:35},
  tdName:{padding:'10px 5px',fontSize:12,fontWeight:600,textTransform:'uppercase'},
  tdV:{padding:'10px 5px',fontSize:14,fontWeight:700,textAlign:'center'},
  
  exportSec:{display:'flex',gap:10,paddingTop:15,borderTop:'1px solid rgba(255,255,255,0.08)',flexWrap:'wrap'},
  btnPng:{flex:1,padding:'12px 15px',fontSize:13,fontWeight:700,border:'none',borderRadius:8,background:'#7C4DFF',color:'white',cursor:'pointer',minWidth:100},
  btnBot:{flex:1,padding:'12px 15px',fontSize:13,fontWeight:700,border:'none',borderRadius:8,background:'#00BFA5',color:'white',cursor:'pointer',minWidth:100},
  status:{fontSize:12,color:'#4CAF50'},
  
  noData:{textAlign:'center',padding:'60px 20px',color:'rgba(255,255,255,0.4)'},
};
