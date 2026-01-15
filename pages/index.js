import React, { useState, useCallback, useRef, useEffect } from 'react';
import Head from 'next/head';

const CONFIG = {
  MAKE_WEBHOOK: 'https://hook.eu1.make.com/pnvv5e9q48jl2z38kl13cvqtzaiwb9q2',
};

// Calendario Produzione 2026
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
  // 2025
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
  
  // Filtri periodo
  const [selectedMonth, setSelectedMonth] = useState('');
  const [availableMonths, setAvailableMonths] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [periodType, setPeriodType] = useState('all'); // all, month, custom

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
    // Formato: "2026-01-09 14:09:22" o "2026-01-09"
    const match = str.match(/(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/);
    if (match) {
      return new Date(
        parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]),
        parseInt(match[4] || 0), parseInt(match[5] || 0), parseInt(match[6] || 0)
      );
    }
    return null;
  };

  const getRowDate = (row) => {
    const fields = ['Inserimento', 'Data Inserimento', 'Data_Inserimento', 'Data'];
    for (let f of fields) {
      if (row[f]) return parseDateTime(row[f]);
    }
    return null;
  };

  const getRowMonth = (row) => {
    // Prima prova "Mese di Produzione"
    if (row['Mese di Produzione']) return row['Mese di Produzione'];
    if (row['Mese_di_Produzione']) return row['Mese_di_Produzione'];
    if (row['Periodo di Produzione']) return row['Periodo di Produzione'];
    return null;
  };

  const extractAvailableMonths = (data) => {
    const months = new Set();
    data.forEach(row => {
      const month = getRowMonth(row);
      if (month) months.add(month);
    });
    return Array.from(months).sort((a, b) => {
      const order = { 'Gennaio': 1, 'Febbraio': 2, 'Marzo': 3, 'Aprile': 4, 'Maggio': 5, 'Giugno': 6,
                      'Luglio': 7, 'Agosto': 8, 'Settembre': 9, 'Ottobre': 10, 'Novembre': 11, 'Dicembre': 12 };
      const [mA, yA] = a.split(' '); const [mB, yB] = b.split(' ');
      if (yA !== yB) return parseInt(yB) - parseInt(yA);
      return order[mB] - order[mA];
    });
  };

  const filterByMonth = (data, month) => {
    if (!month) return data;
    return data.filter(row => {
      const rowMonth = getRowMonth(row);
      return rowMonth === month;
    });
  };

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
      // Usa le date del calendario produzione se disponibili
      const calendarKey = month;
      if (PRODUCTION_CALENDAR[calendarKey]) {
        setDateFrom(PRODUCTION_CALENDAR[calendarKey].start);
        setDateTo(PRODUCTION_CALENDAR[calendarKey].end);
      }
      const filtered = filterByMonth(csvData, month);
      setFilteredData(filtered);
      generateRankings(filtered, csvType, excludeK);
      setEventDate(month.toUpperCase());
    }
  };

  const handleShowAll = () => {
    setPeriodType('all');
    setSelectedMonth('');
    if (csvData) {
      setFilteredData(csvData);
      generateRankings(csvData, csvType, excludeK);
    }
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
        setCsvData(data);
        setFilteredData(data);
        
        // Estrai mesi disponibili
        const months = extractAvailableMonths(data);
        setAvailableMonths(months);
        if (months.length > 0) {
          setSelectedMonth(months[0]);
          setEventDate(months[0].toUpperCase());
        }
        
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
    
    const getField = (row, fields) => {
      for (let f of fields) { if (row[f] && row[f].trim()) return row[f].trim(); }
      return '';
    };
    
    data.forEach(row => {
      const ivd = getField(row, ['Nome Intermediario', 'IVD', 'Nome IVD']);
      const sdp = getField(row, ['Nome Primo SDP FV', 'Nome Primo SDP LA', 'Nome Primo SDP Fv', 'Nome Primo SDP La']);
      const nw = getField(row, ['Nome Primo Networker']);
      const k = getField(row, ['Nome Primo K']);
      
      let isVal2 = false;
      if (type === 'seminario') {
        isVal2 = (row['Presente SI'] || '').toLowerCase() === 'si';
      } else {
        const stato = getField(row, ['Stato NWG Energia', 'Stato NWG Spa', 'Stato', 'Stato Vipoffice IVD']).toLowerCase();
        isVal2 = stato.includes('accettato') || stato.includes('attivo') || stato.includes('active') || stato.includes('aac');
      }
      
      if (ivd && (!filterK || !isK(ivd))) {
        if (!ivdStats[ivd]) ivdStats[ivd] = { v1: 0, v2: 0 };
        ivdStats[ivd].v1++; if (isVal2) ivdStats[ivd].v2++;
      }
      if (sdp && (!filterK || !isK(sdp))) {
        if (!sdpStats[sdp]) sdpStats[sdp] = { v1: 0, v2: 0 };
        sdpStats[sdp].v1++; if (isVal2) sdpStats[sdp].v2++;
      }
      if (nw && (!filterK || !isK(nw))) {
        if (!nwStats[nw]) nwStats[nw] = { v1: 0, v2: 0 };
        nwStats[nw].v1++; if (isVal2) nwStats[nw].v2++;
      }
      if (k) {
        if (!kStats[k]) kStats[k] = { v1: 0, v2: 0 };
        kStats[k].v1++; if (isVal2) kStats[k].v2++;
      }
    });

    const sortV1 = (a, b) => b[1].v1 - a[1].v1;
    const sortV2 = (a, b) => b[1].v2 - a[1].v2;
    const totV1 = data.length;
    const totV2 = Object.values(ivdStats).reduce((sum, s) => sum + s.v2, 0);

    setRankings({
      type, excludeK: filterK,
      ivd_inseriti: Object.entries(ivdStats).sort(sortV1),
      ivd_accettati: Object.entries(ivdStats).filter(([,s]) => s.v2 > 0).sort(sortV2),
      sdp_inseriti: Object.entries(sdpStats).sort(sortV1),
      sdp_accettati: Object.entries(sdpStats).filter(([,s]) => s.v2 > 0).sort(sortV2),
      nw: Object.entries(nwStats).sort(sortV1),
      k: Object.entries(kStats).sort(sortV1),
      totals: { v1: totV1, v2: totV2 }
    });
    setSelectedRanking('ivd_inseriti');
  };

  const toggleExcludeK = () => {
    const newVal = !excludeK; setExcludeK(newVal);
    if (filteredData) generateRankings(filteredData, csvType, newVal);
  };

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
    const data = getRankingData();
    if (data.length === 0) return null;
    const colors = getColorScheme();
    const labels = getLabels();
    const isCombined = isCombinedRanking();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 700;
    const rowHeight = isCombined ? 55 : 45;
    const headerHeight = 140;
    const footerHeight = 80;
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
      const y = startY + (i * rowHeight);
      const pct = stats.v1 > 0 ? Math.round(stats.v2 / stats.v1 * 100) : 0;
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
        ctx.fillStyle = fillColor; ctx.font = 'bold 14px Arial'; ctx.fillText(`${pct}%`, width - 30, y + 32);
        ctx.textAlign = 'left';
      } else {
        ctx.fillStyle = selectedRanking.includes('accettati') ? '#4CAF50' : colors.primary;
        ctx.font = 'bold 22px Arial'; ctx.textAlign = 'right';
        ctx.fillText((selectedRanking.includes('accettati') ? stats.v2 : stats.v1).toString(), width - 40, y + 32);
        ctx.textAlign = 'left';
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

  if (showPreview && previewImage) {
    return (
      <><Head><title>Anteprima</title></Head>
      <div style={S.previewOverlay}>
        <div style={S.previewModal}>
          <h2 style={S.previewTitle}>📸 Anteprima Classifica</h2>
          <div style={S.previewImageContainer}><img src={previewImage} alt="Preview" style={S.previewImage} /></div>
          <div style={S.previewButtons}>
            <button style={S.btnCancel} onClick={() => setShowPreview(false)}>❌ Annulla</button>
            <button style={S.btnDownload} onClick={downloadPNG}>📥 Scarica PNG</button>
            <button style={S.btnSend} onClick={sendToMake} disabled={isSending}>{isSending ? '⏳...' : '🤖 Invia a Bot'}</button>
          </div>
          {sendStatus && <p style={S.statusMsg}>{sendStatus}</p>}
        </div>
      </div></>
    );
  }

  return (
    <><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width, initial-scale=1" /></Head>
    <div style={S.dash}>
      <header style={S.header}>
        <div style={S.headerL}>
          <span style={S.headerLogo}>LEADER RANKING</span>
          <span style={S.badge}>{user.role.toUpperCase()}</span>
          {csvData && <span style={{...S.csvBadge, background: colors.bg, color: colors.primary}}>{csvType.replace('_',' ').toUpperCase()}</span>}
        </div>
        <div style={S.headerR}>
          <span style={S.userName}>👤 {user.name}</span>
          <button style={S.logoutBtn} onClick={handleLogout}>Esci</button>
        </div>
      </header>
      
      <main style={S.main}>
        <aside style={S.sidebar}>
          <h3 style={S.sideTitle}>📊 Classifiche</h3>
          {rankings ? (
            <>
              <p style={S.catLabel}>IVD</p>
              <button style={{...S.menuItem, ...(selectedRanking==='ivd_inseriti'?S.menuActive:{})}} onClick={()=>setSelectedRanking('ivd_inseriti')}>🟠 {labels.c1}</button>
              <button style={{...S.menuItem, ...(selectedRanking==='ivd_accettati'?S.menuActive:{})}} onClick={()=>setSelectedRanking('ivd_accettati')}>🟢 {labels.c2}</button>
              <p style={S.catLabel}>SDP</p>
              <button style={{...S.menuItem, ...(selectedRanking==='sdp_inseriti'?S.menuActive:{})}} onClick={()=>setSelectedRanking('sdp_inseriti')}>🔵 {labels.c1}</button>
              <button style={{...S.menuItem, ...(selectedRanking==='sdp_accettati'?S.menuActive:{})}} onClick={()=>setSelectedRanking('sdp_accettati')}>🟢 {labels.c2}</button>
              <p style={S.catLabel}>Manager</p>
              <button style={{...S.menuItem, ...(selectedRanking==='nw'?S.menuActive:{})}} onClick={()=>setSelectedRanking('nw')}>🟣 Networker</button>
              <button style={{...S.menuItem, ...(selectedRanking==='k'?S.menuActive:{})}} onClick={()=>setSelectedRanking('k')}>🟡 Primo K</button>
            </>
          ) : <p style={S.noMenu}>Carica CSV</p>}
          
          <div style={S.divider}/>
          
          {(user.role==='admin'||user.role==='assistente') && (
            <>
              <h4 style={S.filterTitle}>⚙️ Filtri</h4>
              <label style={S.toggle}><input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={S.check}/><span>Escludi K</span></label>
              {excludeK && <p style={S.filterNote}>⚠️ K esclusi</p>}
              
              <div style={S.divider}/>
              
              <h4 style={S.filterTitle}>📅 Mese Produzione</h4>
              <button style={{...S.periodBtn, ...(periodType==='all'?S.periodActive:{})}} onClick={handleShowAll}>📋 Tutti i dati ({csvData?.length || 0})</button>
              
              {availableMonths.length > 0 && (
                <select style={S.select} value={selectedMonth} onChange={(e) => handleMonthChange(e.target.value)}>
                  <option value="">-- Seleziona Mese --</option>
                  {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              )}
              
              <div style={S.divider}/>
              
              <h4 style={S.filterTitle}>📆 Date Custom</h4>
              <input type="datetime-local" style={S.dateInput} value={dateFrom.replace(' ','T')} onChange={e=>setDateFrom(e.target.value.replace('T',' '))} />
              <input type="datetime-local" style={S.dateInput} value={dateTo.replace(' ','T')} onChange={e=>setDateTo(e.target.value.replace('T',' '))} />
              <button style={S.applyBtn} onClick={handleCustomFilter}>Applica Filtro</button>
              
              <div style={S.divider}/>
              
              <h4 style={S.filterTitle}>🏷️ Evento</h4>
              <input style={S.inputSm} value={eventName} onChange={e=>setEventName(e.target.value)} placeholder="Nome"/>
              <input style={S.inputSm} value={eventDate} onChange={e=>setEventDate(e.target.value)} placeholder="Data"/>
            </>
          )}
        </aside>

        <section style={S.content}>
          {(user.role==='admin'||user.role==='assistente') && (
            <div style={S.uploadSec}>
              <h2 style={S.secTitle}>📤 Carica CSV</h2>
              <div style={{...S.uploadBox,...(isDragging?S.uploadDrag:{})}} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <input type="file" accept=".csv" onChange={handleFileUpload} style={S.fileInput} id="csv"/>
                <label htmlFor="csv" style={S.uploadLabel}>{isDragging ? '📥 Rilascia qui!' : filteredData ? `✅ ${filteredData.length} righe (filtrate)` : '📁 Trascina CSV o clicca'}</label>
              </div>
            </div>
          )}

          {rankings ? (
            <div style={S.rankSec}>
              <div style={S.rankHeader}>
                <h2 style={{...S.secTitle, color: colors.primary}}>
                  {selectedRanking==='ivd_inseriti' && `🟠 IVD ${labels.c1}`}
                  {selectedRanking==='ivd_accettati' && `🟢 IVD ${labels.c2}`}
                  {selectedRanking==='sdp_inseriti' && `🔵 SDP ${labels.c1}`}
                  {selectedRanking==='sdp_accettati' && `🟢 SDP ${labels.c2}`}
                  {selectedRanking==='nw' && '🟣 Networker'}
                  {selectedRanking==='k' && '🟡 Primo K'}
                </h2>
                <div style={S.stats}>
                  <span style={S.statItem}><span style={S.statL}>{labels.c1}</span><span style={{...S.statV, color: colors.primary}}>{rankings.totals.v1}</span></span>
                  <span style={S.statItem}><span style={S.statL}>{labels.c2}</span><span style={{...S.statV, color: '#4CAF50'}}>{rankings.totals.v2}</span></span>
                  <span style={S.statItem}><span style={S.statL}>%</span><span style={{...S.statV, color: '#7C4DFF'}}>{Math.round(rankings.totals.v2/rankings.totals.v1*100)||0}%</span></span>
                </div>
              </div>
              
              {selectedMonth && <div style={S.monthBadge}>📅 {selectedMonth}</div>}
              {rankings.excludeK && !selectedRanking.includes('k') && <div style={S.filterBadge}>🚫 K esclusi</div>}
              
              <table style={S.table}>
                <thead><tr>
                  <th style={S.th}>#</th>
                  <th style={{...S.th, textAlign:'left'}}>Nome</th>
                  {isCombinedRanking() ? (<><th style={S.th}>{labels.c1}</th><th style={S.th}>Conv.</th><th style={S.th}>{labels.c2}</th><th style={S.th}>%</th></>) : (<th style={S.th}>{selectedRanking.includes('accettati') ? labels.c2 : labels.c1}</th>)}
                </tr></thead>
                <tbody>
                  {getRankingData().map(([name, s], i) => {
                    const pct = s.v1 > 0 ? Math.round(s.v2/s.v1*100) : 0;
                    return (
                      <tr key={name} style={i===0 ? {...S.tr, background: colors.bg} : S.tr}>
                        <td style={S.tdPos}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}°`}</td>
                        <td style={S.tdName}>{name}</td>
                        {isCombinedRanking() ? (
                          <><td style={{...S.tdV, color: colors.primary}}>{s.v1}</td>
                          <td style={S.tdBar}><div style={S.pctBar}><div style={{...S.pctFill, width:`${pct}%`, background: pct>=70?'#4CAF50':pct>=40?'#FFC107':'#FF5722'}}/></div></td>
                          <td style={{...S.tdV, color: '#4CAF50'}}>{s.v2}</td>
                          <td style={{...S.tdV, color: pct>=70?'#4CAF50':pct>=40?'#FFC107':'#FF5722'}}>{pct}%</td></>
                        ) : (
                          <td style={{...S.tdV, color: selectedRanking.includes('accettati') ? '#4CAF50' : colors.primary}}>{selectedRanking.includes('accettati') ? s.v2 : s.v1}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {(user.role==='admin'||user.role==='assistente') && (
                <div style={S.exportSec}>
                  <button style={S.btnPng} onClick={handleGeneratePNG}>📸 Genera PNG</button>
                  <button style={S.btnBot} onClick={handleGeneratePNG}>🤖 Invia a Bot</button>
                  {sendStatus && <span style={S.status}>{sendStatus}</span>}
                </div>
              )}
            </div>
          ) : (
            <div style={S.noData}><span style={{fontSize:'60px'}}>📊</span><h3>Carica un CSV</h3><p>Seminario, Luce Amica, FV, Attivazioni</p></div>
          )}
        </section>
      </main>
    </div></>
  );
}

const S = {
  loginContainer:{minHeight:'100vh',background:'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'-apple-system,sans-serif'},
  loginCard:{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'50px 40px',width:'100%',maxWidth:420,textAlign:'center'},
  loginLogo:{marginBottom:20},logoL:{fontSize:38,fontWeight:800,color:'#7C4DFF',letterSpacing:3},logoR:{fontSize:38,fontWeight:300,color:'white',marginLeft:10},
  loginTitle:{fontSize:28,fontWeight:600,color:'white',marginBottom:8},loginSub:{fontSize:14,color:'rgba(255,255,255,0.5)',marginBottom:30},
  inputGroup:{marginBottom:20,textAlign:'left'},label:{display:'block',fontSize:12,color:'rgba(255,255,255,0.6)',marginBottom:8,textTransform:'uppercase',letterSpacing:1},
  input:{width:'100%',padding:'15px 18px',fontSize:16,border:'2px solid rgba(255,255,255,0.1)',borderRadius:12,background:'rgba(255,255,255,0.05)',color:'white',outline:'none',boxSizing:'border-box'},
  error:{color:'#FF5252',fontSize:14,marginBottom:15},
  loginBtn:{width:'100%',padding:16,fontSize:16,fontWeight:700,border:'none',borderRadius:12,background:'linear-gradient(135deg,#7C4DFF,#536DFE)',color:'white',cursor:'pointer',textTransform:'uppercase',letterSpacing:2,marginTop:10},
  previewOverlay:{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:20},
  previewModal:{background:'#1a1a2e',borderRadius:20,padding:30,maxWidth:800,width:'100%',textAlign:'center'},
  previewTitle:{color:'white',fontSize:24,marginBottom:20},previewImageContainer:{background:'#0f0f1a',borderRadius:12,padding:20,marginBottom:20,overflow:'auto',maxHeight:'60vh'},
  previewImage:{maxWidth:'100%',borderRadius:8},previewButtons:{display:'flex',gap:15,justifyContent:'center',flexWrap:'wrap'},
  btnCancel:{padding:'14px 28px',fontSize:14,fontWeight:700,border:'2px solid rgba(255,255,255,0.2)',borderRadius:10,background:'transparent',color:'white',cursor:'pointer'},
  btnDownload:{padding:'14px 28px',fontSize:14,fontWeight:700,border:'none',borderRadius:10,background:'linear-gradient(135deg,#7C4DFF,#536DFE)',color:'white',cursor:'pointer'},
  btnSend:{padding:'14px 28px',fontSize:14,fontWeight:700,border:'none',borderRadius:10,background:'linear-gradient(135deg,#00BFA5,#1DE9B6)',color:'white',cursor:'pointer'},
  statusMsg:{color:'#4CAF50',marginTop:15,fontSize:14},
  dash:{minHeight:'100vh',background:'#0f0f1a',color:'white',fontFamily:'-apple-system,sans-serif'},
  header:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 30px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.05)',flexWrap:'wrap',gap:10},
  headerL:{display:'flex',alignItems:'center',gap:15,flexWrap:'wrap'},headerLogo:{fontSize:22,fontWeight:800,color:'#7C4DFF',letterSpacing:2},
  badge:{fontSize:11,padding:'5px 12px',background:'rgba(124,77,255,0.2)',color:'#7C4DFF',borderRadius:20,fontWeight:700},
  csvBadge:{fontSize:10,padding:'4px 10px',borderRadius:15,fontWeight:700},headerR:{display:'flex',alignItems:'center',gap:20},
  userName:{fontSize:14,color:'rgba(255,255,255,0.7)'},logoutBtn:{padding:'8px 20px',fontSize:13,border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,background:'transparent',color:'white',cursor:'pointer'},
  main:{display:'flex',minHeight:'calc(100vh - 60px)'},
  sidebar:{width:280,minWidth:280,background:'rgba(255,255,255,0.02)',borderRight:'1px solid rgba(255,255,255,0.05)',padding:'25px 20px',overflowY:'auto'},
  sideTitle:{fontSize:13,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:2,marginBottom:15},
  catLabel:{fontSize:11,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:1,marginTop:15,marginBottom:8,paddingLeft:5},
  menuItem:{display:'block',width:'100%',padding:'12px 18px',fontSize:14,fontWeight:500,border:'none',borderRadius:10,background:'transparent',color:'rgba(255,255,255,0.7)',cursor:'pointer',textAlign:'left',marginBottom:3},
  menuActive:{background:'rgba(124,77,255,0.2)',color:'#7C4DFF'},noMenu:{fontSize:13,color:'rgba(255,255,255,0.4)',padding:10},
  divider:{height:1,background:'rgba(255,255,255,0.1)',margin:'20px 0'},
  filterTitle:{fontSize:12,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:1,marginBottom:12},
  toggle:{display:'flex',alignItems:'center',gap:10,cursor:'pointer',fontSize:13,color:'rgba(255,255,255,0.8)'},
  check:{width:18,height:18,accentColor:'#7C4DFF'},filterNote:{fontSize:11,color:'#FFC107',marginTop:10,padding:'8px 10px',background:'rgba(255,193,7,0.1)',borderRadius:6},
  periodBtn:{display:'block',width:'100%',padding:'10px 15px',fontSize:13,border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,background:'transparent',color:'rgba(255,255,255,0.6)',cursor:'pointer',marginBottom:10,textAlign:'left'},
  periodActive:{background:'rgba(124,77,255,0.2)',color:'#7C4DFF',borderColor:'#7C4DFF'},
  select:{width:'100%',padding:'12px 15px',fontSize:14,border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,background:'rgba(255,255,255,0.05)',color:'white',cursor:'pointer',marginBottom:10,outline:'none'},
  dateInput:{width:'100%',padding:'10px 12px',fontSize:13,border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,background:'rgba(255,255,255,0.05)',color:'white',marginBottom:8,outline:'none',boxSizing:'border-box'},
  applyBtn:{width:'100%',padding:'10px 15px',fontSize:13,border:'none',borderRadius:8,background:'#7C4DFF',color:'white',cursor:'pointer',marginTop:5},
  inputSm:{width:'100%',padding:'10px 12px',fontSize:13,border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,background:'rgba(255,255,255,0.05)',color:'white',marginBottom:10,outline:'none',boxSizing:'border-box'},
  content:{flex:1,padding:30,overflowY:'auto'},secTitle:{fontSize:20,fontWeight:600,color:'white',marginBottom:20},
  uploadSec:{marginBottom:30},uploadBox:{border:'2px dashed rgba(124,77,255,0.3)',borderRadius:12,padding:'40px 30px',textAlign:'center',transition:'all 0.3s',cursor:'pointer'},
  uploadDrag:{borderColor:'#7C4DFF',background:'rgba(124,77,255,0.1)',transform:'scale(1.02)'},fileInput:{display:'none'},
  uploadLabel:{display:'inline-block',padding:'15px 30px',fontSize:15,fontWeight:600,color:'#7C4DFF',cursor:'pointer',borderRadius:10,background:'rgba(124,77,255,0.1)'},
  rankSec:{background:'rgba(255,255,255,0.02)',borderRadius:16,padding:25,border:'1px solid rgba(255,255,255,0.05)'},
  rankHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:15},
  stats:{display:'flex',gap:20},statItem:{display:'flex',flexDirection:'column',alignItems:'center'},statL:{fontSize:11,color:'rgba(255,255,255,0.4)',textTransform:'uppercase'},statV:{fontSize:24,fontWeight:700},
  monthBadge:{display:'inline-block',padding:'8px 15px',fontSize:12,background:'rgba(124,77,255,0.15)',color:'#7C4DFF',borderRadius:20,marginBottom:10,marginRight:10},
  filterBadge:{display:'inline-block',padding:'8px 15px',fontSize:12,background:'rgba(255,193,7,0.15)',color:'#FFC107',borderRadius:20,marginBottom:15},
  table:{width:'100%',borderCollapse:'collapse'},th:{padding:'12px 15px',fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:1,textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.1)'},
  tr:{borderBottom:'1px solid rgba(255,255,255,0.05)'},tdPos:{padding:15,fontSize:18,textAlign:'center',width:60},tdName:{padding:15,fontSize:14,fontWeight:600,textTransform:'uppercase'},
  tdV:{padding:15,fontSize:18,fontWeight:700,textAlign:'center'},tdBar:{padding:'15px 10px',width:100},pctBar:{height:10,background:'rgba(255,255,255,0.1)',borderRadius:5,overflow:'hidden'},pctFill:{height:'100%',borderRadius:5},
  exportSec:{display:'flex',gap:15,marginTop:25,paddingTop:20,borderTop:'1px solid rgba(255,255,255,0.1)',alignItems:'center',flexWrap:'wrap'},
  btnPng:{padding:'14px 28px',fontSize:14,fontWeight:700,border:'none',borderRadius:10,background:'linear-gradient(135deg,#7C4DFF,#536DFE)',color:'white',cursor:'pointer'},
  btnBot:{padding:'14px 28px',fontSize:14,fontWeight:700,border:'none',borderRadius:10,background:'linear-gradient(135deg,#00BFA5,#1DE9B6)',color:'white',cursor:'pointer'},
  status:{fontSize:13,color:'#4CAF50',marginLeft:10},noData:{textAlign:'center',padding:'80px 20px',color:'rgba(255,255,255,0.4)'},
};
