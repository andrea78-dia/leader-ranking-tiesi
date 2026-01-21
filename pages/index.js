import React, { useState } from 'react';
import Head from 'next/head';

const USERS = {
  admin: { password: 'admin2026', role: 'admin', name: 'Admin' },
  assistente: { password: 'assist2026', role: 'assistente', name: 'Assistente' },
  manager1: { password: 'manager1', role: 'k', name: 'Manager 1' },
  manager2: { password: 'manager2', role: 'k', name: 'Manager 2' },
  manager3: { password: 'manager3', role: 'k', name: 'Manager 3' },
  manager4: { password: 'manager4', role: 'k', name: 'Manager 4' },
  manager5: { password: 'manager5', role: 'k', name: 'Manager 5' },
};

const K_NAMES = [];
const EVENT_TYPES = ['LUCE AMICA', 'FOTOVOLTAICO', 'INSERITI SEMINARIO', 'ATTIVATI', 'FORMAZIONE', 'ENERGIA', 'GAS'];
const WEBHOOK_URL = 'https://hook.eu1.make.com/sm6lrhpoet204lv6xkwj10xiypwnn4qm';

const RANKING_CONFIG = {
  ivd_inseriti: { label: 'IVD INSERITI', category: 'ivd', color: '#FF6B35', emoji: '🟠', design: 'impact' },
  ivd_accettati: { label: 'IVD ACCETTATI', category: 'ivd', color: '#4CAF50', emoji: '🟢', design: 'impact' },
  sdp_inseriti: { label: 'SDP INSERITI', category: 'sdp', color: '#2196F3', emoji: '🔵', design: 'impact' },
  sdp_accettati: { label: 'SDP ACCETTATI', category: 'sdp', color: '#4CAF50', emoji: '🟢', design: 'impact' },
  nw: { label: 'NETWORKER', category: 'manager', color: '#9C27B0', emoji: '⭐', design: 'exclusive' },
  k: { label: 'K MANAGER', category: 'manager', color: '#FFD700', emoji: '👑', design: 'exclusive' },
  eb: { label: 'ENERGY BROKER', category: 'broker', color: '#00BCD4', emoji: '🔷', design: 'exclusive' },
  frm: { label: 'FORMATORI', category: 'formatore', color: '#673AB7', emoji: '🎓', design: 'exclusive' },
};

const PRODUCTION_CALENDAR = {
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
};

const getWeeksForMonth = (month) => {
  const cal = PRODUCTION_CALENDAR[month]; if (!cal) return [];
  const start = new Date(cal.start.replace(' ', 'T')), end = new Date(cal.end.replace(' ', 'T')), weeks = [];
  let weekStart = new Date(start), weekEnd = new Date(start);
  while (weekEnd.getDay() !== 0) weekEnd.setDate(weekEnd.getDate() + 1);
  weekEnd.setHours(23, 59, 59); if (weekEnd > end) weekEnd = new Date(end);
  weeks.push({ num: 1, start: new Date(weekStart), end: new Date(weekEnd), label: `Sett.1 (${weekStart.getDate()}/${weekStart.getMonth()+1} - ${weekEnd.getDate()}/${weekEnd.getMonth()+1})` });
  let weekNum = 2; weekStart = new Date(weekEnd); weekStart.setDate(weekStart.getDate() + 1); weekStart.setHours(0, 0, 0);
  while (weekStart < end) {
    weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6); weekEnd.setHours(23, 59, 59);
    if (weekEnd >= end || weekNum >= 5) weekEnd = new Date(end);
    weeks.push({ num: weekNum, start: new Date(weekStart), end: new Date(weekEnd), label: `Sett.${weekNum} (${weekStart.getDate()}/${weekStart.getMonth()+1} - ${weekEnd.getDate()}/${weekEnd.getMonth()+1})` });
    if (weekEnd >= end) break; weekStart = new Date(weekEnd); weekStart.setDate(weekStart.getDate() + 1); weekStart.setHours(0, 0, 0); weekNum++;
  }
  return weeks;
};

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
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [sendStatus, setSendStatus] = useState('');

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(';').map(h => h.trim().replace(/"/g, '').replace(/^\uFEFF/, ''));
    return lines.slice(1).map(line => {
      const values = line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
      const row = {}; headers.forEach((h, i) => { row[h] = values[i] || ''; }); return row;
    }).filter(row => Object.values(row).some(v => v));
  };

  const getRowMonth = (row) => row['Mese di Produzione'] || null;
  const getRowDate = (row) => { const d = row['Inserimento'] || ''; return d ? new Date(d.replace(' ', 'T')) : null; };
  const extractMonths = (data) => {
    const months = new Set(); data.forEach(r => { const m = getRowMonth(r); if (m) months.add(m); });
    return Array.from(months).sort((a, b) => {
      const order = { 'Gennaio':1,'Febbraio':2,'Marzo':3,'Aprile':4,'Maggio':5,'Giugno':6,'Luglio':7,'Agosto':8,'Settembre':9,'Ottobre':10,'Novembre':11,'Dicembre':12 };
      const [mA, yA] = a.split(' '), [mB, yB] = b.split(' ');
      return yA !== yB ? parseInt(yB) - parseInt(yA) : order[mB] - order[mA];
    });
  };

  const filterByMonth = (data, month) => month ? data.filter(r => getRowMonth(r) === month) : data;
  const filterByWeek = (data, week) => week ? data.filter(r => { const d = getRowDate(r); return d && d >= week.start && d <= week.end; }) : data;

  const handleMonthChange = (month) => {
    setSelectedMonth(month); setSelectedWeek(null); setWeeks(getWeeksForMonth(month));
    if (csvData && month) { const filtered = filterByMonth(csvData, month); setFilteredData(filtered); generateRankings(filtered, csvType, excludeK); setEventDate(month.toUpperCase()); }
  };

  const handleWeekChange = (weekNum) => {
    if (!weekNum) { setSelectedWeek(null); if (csvData && selectedMonth) { const filtered = filterByMonth(csvData, selectedMonth); setFilteredData(filtered); generateRankings(filtered, csvType, excludeK); setEventDate(selectedMonth.toUpperCase()); } return; }
    const week = weeks.find(w => w.num === parseInt(weekNum)); setSelectedWeek(week);
    if (csvData && selectedMonth && week) { let filtered = filterByMonth(csvData, selectedMonth); filtered = filterByWeek(filtered, week); setFilteredData(filtered); generateRankings(filtered, csvType, excludeK); setEventDate(`${selectedMonth.toUpperCase()} - SETT.${week.num}`); }
  };

  const handleShowAll = () => { setSelectedMonth(''); setSelectedWeek(null); setWeeks([]); if (csvData) { setFilteredData(csvData); generateRankings(csvData, csvType, excludeK); setEventDate('TOTALE'); } };
  const handleLogin = () => { const u = USERS[loginForm.username.toLowerCase().replace(/\s+/g, '_')]; if (u && u.password === loginForm.password) { setUser({ ...u, username: loginForm.username }); setLoginError(''); } else setLoginError('Credenziali non valide'); };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = parseCSV(e.target.result); setCsvData(data); setFilteredData(data);
      const months = extractMonths(data); setAvailableMonths(months);
      if (months.length > 0) { setSelectedMonth(months[0]); setEventDate(months[0].toUpperCase()); setWeeks(getWeeksForMonth(months[0])); }
      const headers = Object.keys(data[0] || {}).join(' ').toLowerCase();
      let type = 'luce_amica';
      if (headers.includes('presente')) type = 'seminario';
      else if (headers.includes('fv') || headers.includes('fotovoltaico')) type = 'fotovoltaico';
      else if (headers.includes('attivazione')) type = 'attivazioni';
      setCsvType(type);
      if (type === 'seminario') setEventName('INSERITI SEMINARIO'); else if (type === 'fotovoltaico') setEventName('FOTOVOLTAICO'); else setEventName('LUCE AMICA');
      generateRankings(data, type, excludeK);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const generateRankings = (data, type, filterK) => {
    const isK = (name) => K_NAMES.some(k => (name||'').toUpperCase().includes(k));
    const ivd = {}, sdp = {}, nw = {}, k = {};
    const getField = (row, fieldName) => { const val = row[fieldName]; if (!val || val.trim() === '' || val.trim().toUpperCase().startsWith('NWG')) return ''; return val.trim(); };
    data.forEach(row => {
      const ivdN = getField(row, 'Nome Intermediario');
      let sdpN = getField(row, 'Nome Primo SDP FV') || getField(row, 'Nome Primo SDP LA');
      const nwN = getField(row, 'Nome Primo Networker'), kN = getField(row, 'Nome Primo K');
      let isV2 = false;
      if (type === 'seminario') isV2 = (row['Presente SI'] || '').toLowerCase() === 'si';
      else { const stato = (row['Stato NWG Energia'] || row['Stato NWG Spa'] || row['Stato'] || '').toLowerCase(); isV2 = stato.includes('accettato') || stato.includes('attivo') || stato.includes('active'); }
      if (ivdN && (!filterK || !isK(ivdN))) { if (!ivd[ivdN]) ivd[ivdN] = {v1:0,v2:0}; ivd[ivdN].v1++; if (isV2) ivd[ivdN].v2++; }
      if (sdpN && (!filterK || !isK(sdpN))) { if (!sdp[sdpN]) sdp[sdpN] = {v1:0,v2:0}; sdp[sdpN].v1++; if (isV2) sdp[sdpN].v2++; }
      if (nwN && (!filterK || !isK(nwN))) { if (!nw[nwN]) nw[nwN] = {v1:0,v2:0}; nw[nwN].v1++; if (isV2) nw[nwN].v2++; }
      if (kN) { if (!k[kN]) k[kN] = {v1:0,v2:0}; k[kN].v1++; if (isV2) k[kN].v2++; }
    });
    const sV1 = (a, b) => b[1].v1 - a[1].v1, sV2 = (a, b) => b[1].v2 - a[1].v2;
    const totV1 = data.length, totV2 = data.filter(row => { const stato = (row['Stato NWG Energia'] || row['Stato NWG Spa'] || row['Stato'] || row['Presente SI'] || '').toLowerCase(); return stato.includes('accettato') || stato.includes('attivo') || stato.includes('active') || stato === 'si'; }).length;
    setRankings({ type, excludeK: filterK, ivd_inseriti: Object.entries(ivd).sort(sV1), ivd_accettati: Object.entries(ivd).filter(([,s]) => s.v2 > 0).sort(sV2), sdp_inseriti: Object.entries(sdp).sort(sV1), sdp_accettati: Object.entries(sdp).filter(([,s]) => s.v2 > 0).sort(sV2), nw: Object.entries(nw).sort(sV1), k: Object.entries(k).sort(sV1), totals: { v1: totV1, v2: totV2 } });
    setSelectedRanking('ivd_inseriti');
  };

  const toggleExcludeK = () => { const n = !excludeK; setExcludeK(n); if (filteredData) generateRankings(filteredData, csvType, n); };
  const getData = () => rankings ? (rankings[selectedRanking] || []) : [];
  const getLabels = () => rankings?.type === 'seminario' ? { c1: 'ISCRITTI', c2: 'PRESENTI' } : { c1: 'INSERITI', c2: 'ACCETTATI' };
  const isExclusive = () => ['nw', 'k', 'eb', 'frm'].includes(selectedRanking);
  const getConfig = () => RANKING_CONFIG[selectedRanking] || { label: '', category: '', color: '#7C4DFF', emoji: '📊', design: 'impact' };
  const getClassificaTotal = () => getData().reduce((sum, [,s]) => sum + s.v1, 0);
  const groupByValue = (data, useV2 = false) => {
    const groups = {}; data.forEach(([name, s]) => { const val = useV2 ? s.v2 : s.v1; if (!groups[val]) groups[val] = []; groups[val].push({ name, ...s }); });
    return Object.entries(groups).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([val, members]) => ({ value: parseInt(val), members }));
  };
  const wrapText = (ctx, text, maxWidth, font) => {
    ctx.font = font; const words = text.split(' '), lines = []; let currentLine = '';
    words.forEach(word => { const testLine = currentLine ? `${currentLine} ${word}` : word; if (ctx.measureText(testLine).width > maxWidth && currentLine) { lines.push(currentLine); currentLine = word; } else currentLine = testLine; });
    if (currentLine) lines.push(currentLine); return lines;
  };

  const generatePNG_Impact = () => {
    const data = getData(); if (!data.length) return null;
    const config = getConfig(), labels = getLabels(), isAcc = selectedRanking.includes('accettati'), grouped = groupByValue(data, isAcc);
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;
    
    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0a0a12'); bg.addColorStop(0.5, '#12121f'); bg.addColorStop(1, '#0a0a12');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `${config.color}30`; ctx.lineWidth = 2; ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.fillStyle = config.color; ctx.fillRect(35, 35, W - 70, 4);
    
    // Header - più compatto senza stats box
    ctx.fillStyle = config.color; ctx.font = 'bold 16px Arial'; ctx.fillText('LEADER RANKING', 45, 65);
    ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 42px Arial'; ctx.fillText(`${config.emoji} CLASSIFICA ${config.label}`, 45, 115);
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '18px Arial'; ctx.fillText(`${eventName} • ${eventDate}`, 45, 148);
    
    // Partecipanti e contratti inline
    const totIns = getClassificaTotal();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '16px Arial';
    ctx.fillText(`${data.length} partecipanti • ${totIns} contratti`, 45, 178);
    
    // Separator
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(45, 195, W - 90, 2);
    
    // Calcola spazio disponibile - ORA HO PIÙ SPAZIO!
    let currentY = 215;
    const footerY = H - 55;
    const availableH = footerY - currentY;
    
    // Calcola font size in base ai gruppi
    const numGroups = grouped.length;
    const baseFontSize = numGroups <= 5 ? 24 : numGroups <= 8 ? 21 : numGroups <= 12 ? 18 : 16;
    const lineHeight = baseFontSize + 10;
    const groupPadding = numGroups <= 8 ? 18 : 12;
    
    let position = 1;
    
    grouped.forEach((group) => {
      if (currentY > footerY - 50) return;
      const { value, members } = group;
      const isTop3 = position <= 3;
      const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : null;
      
      // Font size per questo gruppo
      const fontSize = isTop3 ? baseFontSize + 3 : baseFontSize;
      ctx.font = `bold ${fontSize}px Arial`;
      
      // Costruisci linee di nomi
      const maxLineWidth = W - 170;
      const allNames = members.map(m => m.name.toUpperCase());
      const lines = [];
      let currentLine = '';
      
      allNames.forEach((name, idx) => {
        const separator = idx > 0 ? '  •  ' : '';
        const testLine = currentLine + separator + name;
        
        if (ctx.measureText(testLine).width > maxLineWidth && currentLine) {
          lines.push(currentLine);
          currentLine = name;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      
      // Altezza blocco
      const blockH = Math.max(isTop3 ? 60 : 52, 22 + lines.length * lineHeight);
      
      if (currentY + blockH > footerY - 35) return;
      
      // Background
      if (isTop3) {
        const grad = ctx.createLinearGradient(45, currentY, W - 45, currentY);
        grad.addColorStop(0, `${config.color}25`); grad.addColorStop(1, `${config.color}08`);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
      }
      ctx.beginPath(); ctx.roundRect(45, currentY, W - 90, blockH, 12); ctx.fill();
      
      // Medaglia/Posizione
      const textStartY = currentY + (blockH - lines.length * lineHeight) / 2 + fontSize;
      
      if (medal) {
        ctx.font = '32px Arial';
        ctx.fillText(medal, 60, textStartY + (lines.length > 1 ? 0 : 6));
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`${position}°`, 62, textStartY + (lines.length > 1 ? 0 : 6));
      }
      
      // Nomi
      ctx.fillStyle = isTop3 ? '#FFF' : 'rgba(255,255,255,0.9)';
      ctx.font = `bold ${fontSize}px Arial`;
      lines.forEach((line, i) => {
        ctx.fillText(line, 108, textStartY + i * lineHeight);
      });
      
      // Valore contratti
      ctx.fillStyle = isAcc ? '#4CAF50' : config.color;
      ctx.font = `bold ${isTop3 ? 36 : 30}px Arial`;
      ctx.textAlign = 'right';
      ctx.fillText(value.toString(), W - 55, currentY + blockH / 2 + 12);
      ctx.textAlign = 'left';
      
      currentY += blockH + groupPadding;
      position++;
    });
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(45, footerY, W - 90, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '15px Arial';
    ctx.fillText(`📊 ${data.length} partecipanti • ${totIns} contratti`, 50, footerY + 30);
    ctx.textAlign = 'right'; ctx.fillText('LEADER RANKING', W - 50, footerY + 30);
    ctx.textAlign = 'left';
    ctx.fillStyle = config.color; ctx.fillRect(35, H - 16, W - 70, 4);
    
    return canvas.toDataURL('image/png');
  };

  const generatePNG_Exclusive = () => {
    const data = getData(); if (!data.length) return null;
    const config = getConfig(), labels = getLabels();
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;
    
    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#08080f'); bg.addColorStop(0.3, '#101020'); bg.addColorStop(0.7, '#101020'); bg.addColorStop(1, '#08080f');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `${config.color}50`; ctx.lineWidth = 3; ctx.strokeRect(18, 18, W - 36, H - 36);
    ctx.strokeStyle = `${config.color}25`; ctx.lineWidth = 1; ctx.strokeRect(28, 28, W - 56, H - 56);
    
    // Header bar
    const hg = ctx.createLinearGradient(0, 0, W, 0); hg.addColorStop(0, 'transparent'); hg.addColorStop(0.15, config.color); hg.addColorStop(0.85, config.color); hg.addColorStop(1, 'transparent');
    ctx.fillStyle = hg; ctx.fillRect(45, 45, W - 90, 4);
    
    // Title
    ctx.fillStyle = config.color; ctx.font = 'bold 40px Arial'; ctx.textAlign = 'center';
    ctx.fillText(`${config.emoji} CLASSIFICA ${config.label} ${config.emoji}`, W/2, 105);
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '18px Arial';
    ctx.fillText(`${eventName} • ${eventDate}`, W/2, 138);
    
    // Stats - INLINE format (fix richiesto)
    const totIns = getClassificaTotal(), totAcc = getData().reduce((sum, [,s]) => sum + s.v2, 0), pct = Math.round(totAcc / totIns * 100) || 0;
    ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.beginPath(); ctx.roundRect(W/2 - 175, 158, 350, 42, 8); ctx.fill();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = config.color; ctx.fillText(`${totIns} INS.`, W/2 - 85, 186);
    ctx.fillStyle = pct >= 50 ? '#4CAF50' : '#FFC107'; ctx.fillText(`${pct}%`, W/2, 186);
    ctx.fillStyle = '#4CAF50'; ctx.fillText(`${totAcc} ACC.`, W/2 + 85, 186);
    ctx.textAlign = 'left';
    
    // Cards - ORIGINALE v8.0
    const startY = 225, footerY = H - 70, availH = footerY - startY - 15, cardH = Math.min(135, availH / data.length - 12);
    
    data.forEach(([name, s], i) => {
      const y = startY + i * (cardH + 12), isTop3 = i < 3, pctM = s.v1 > 0 ? Math.round(s.v2 / s.v1 * 100) : 0;
      
      // Card background
      const grad = ctx.createLinearGradient(55, y, W - 55, y);
      if (i === 0) { grad.addColorStop(0, 'rgba(255,215,0,0.18)'); grad.addColorStop(1, 'rgba(255,215,0,0.04)'); }
      else if (i === 1) { grad.addColorStop(0, 'rgba(192,192,192,0.14)'); grad.addColorStop(1, 'rgba(192,192,192,0.03)'); }
      else if (i === 2) { grad.addColorStop(0, 'rgba(205,127,50,0.12)'); grad.addColorStop(1, 'rgba(205,127,50,0.03)'); }
      else { grad.addColorStop(0, 'rgba(255,255,255,0.05)'); grad.addColorStop(1, 'rgba(255,255,255,0.02)'); }
      
      ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(55, y, W - 110, cardH, 12); ctx.fill();
      
      if (isTop3) {
        ctx.strokeStyle = i === 0 ? 'rgba(255,215,0,0.5)' : i === 1 ? 'rgba(192,192,192,0.4)' : 'rgba(205,127,50,0.4)';
        ctx.lineWidth = 2; ctx.stroke();
      }
      
      const centerY = y + cardH / 2, medals = ['🏆', '🥈', '🥉'];
      
      if (isTop3) {
        ctx.font = '38px Arial'; ctx.fillText(medals[i], 75, centerY + 14);
        ctx.fillStyle = i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : '#CD7F32';
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
      }
      
      ctx.font = 'bold 26px Arial';
      ctx.fillText(`${i + 1}°`, isTop3 ? 130 : 80, centerY + 10);
      
      // Name
      ctx.fillStyle = isTop3 ? (i === 0 ? '#FFD700' : '#FFF') : 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 26px Arial';
      ctx.fillText(name.toUpperCase(), isTop3 ? 185 : 130, centerY + 10);
      
      // Stats con label INLINE (fix richiesto)
      ctx.textAlign = 'right';
      ctx.fillStyle = isTop3 ? (i === 0 ? '#FFD700' : '#FFF') : 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 30px Arial';
      ctx.fillText(`${s.v1}`, W - 300, centerY + 5);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '11px Arial';
      ctx.fillText('INS.', W - 300, centerY + 22);
      
      // Progress bar
      const barX = W - 270, barW = 105;
      ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.beginPath(); ctx.roundRect(barX, centerY - 10, barW, 18, 5); ctx.fill();
      const barC = pctM >= 50 ? '#4CAF50' : pctM >= 20 ? '#FFC107' : '#FF5722';
      ctx.fillStyle = barC; ctx.beginPath(); ctx.roundRect(barX, centerY - 10, Math.max(barW * pctM / 100, 1), 18, 5); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = 'bold 12px Arial'; ctx.textAlign = 'center';
      ctx.fillText(`${pctM}%`, barX + barW / 2, centerY + 4);
      
      // Accettati con label INLINE
      ctx.textAlign = 'right';
      ctx.fillStyle = '#4CAF50'; ctx.font = 'bold 30px Arial';
      ctx.fillText(`${s.v2}`, W - 75, centerY + 5);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '11px Arial';
      ctx.fillText('ACC.', W - 75, centerY + 22);
      ctx.textAlign = 'left';
    });
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(55, footerY, W - 110, 1);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '15px Arial';
    ctx.fillText(`📊 ${data.length} ${config.label} • ${totIns} contratti`, 60, footerY + 28);
    ctx.textAlign = 'right'; ctx.fillText('LEADER RANKING', W - 60, footerY + 28);
    ctx.textAlign = 'left';
    
    // Bottom bar
    const fg = ctx.createLinearGradient(0, 0, W, 0); fg.addColorStop(0, 'transparent'); fg.addColorStop(0.15, config.color); fg.addColorStop(0.85, config.color); fg.addColorStop(1, 'transparent');
    ctx.fillStyle = fg; ctx.fillRect(45, H - 20, W - 90, 4);
    
    return canvas.toDataURL('image/png');
  };

  const generatePNG = () => isExclusive() ? generatePNG_Exclusive() : generatePNG_Impact();
  const handleGenerate = () => { const img = generatePNG(); if (img) { setPreviewImage(img); setShowPreview(true); } };
  const download = () => { if (previewImage) { const a = document.createElement('a'); a.download = `classifica_${selectedRanking}_${eventDate.replace(/\s/g, '_').replace(/\./g, '')}.png`; a.href = previewImage; a.click(); } };

  const handleSendToBot = async () => {
    setSendStatus('Invio...');
    const img = previewImage || generatePNG();
    if (!img) { setSendStatus('Errore'); return; }
    const config = getConfig(), totIns = getClassificaTotal(), totAcc = getData().reduce((sum, [,s]) => sum + s.v2, 0);
    
    // Upload immagine su imgbb.com per ottenere URL
    let imageUrl = '';
    try {
      setSendStatus('Upload immagine...');
      const base64Data = img.split(',')[1]; // Rimuovi prefisso data:image/png;base64,
      const formData = new FormData();
      formData.append('key', 'b9e5c1a8e0e6f8a8e0e6f8a8e0e6f8a8'); // API key pubblica demo
      formData.append('image', base64Data);
      
      // Prova imgbb
      const uploadRes = await fetch('https://api.imgbb.com/1/upload?key=cf5765432de7dce80184381b02832924', {
        method: 'POST',
        body: formData
      });
      
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          imageUrl = uploadData.data.url;
        }
      }
    } catch (uploadErr) {
      console.log('Upload fallito, uso base64:', uploadErr);
    }
    
    setSendStatus('Invio webhook...');
    
    try {
      await fetch(WEBHOOK_URL, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'leader_ranking_app',
          timestamp: new Date().toISOString(),
          ranking_type: selectedRanking,
          ranking_label: config.label,
          ranking_category: config.category,
          event_name: eventName,
          event_date: eventDate,
          csv_type: csvType,
          exclude_k: excludeK,
          image_url: imageUrl,
          image_base64: img,
          top10: getData().slice(0, 10).map(([name, s], i) => ({ 
            pos: i + 1, 
            name, 
            v1: s.v1, 
            v2: s.v2, 
            pct: Math.round(s.v2 / s.v1 * 100) || 0 
          })),
          totals: { v1: totIns, v2: totAcc },
          total_participants: getData().length,
          conversion_pct: Math.round(totAcc / totIns * 100) || 0
        })
      });
      setSendStatus('✅ Inviato!'); 
      setTimeout(() => setSendStatus(''), 3000);
    } catch (e) { 
      setSendStatus('❌ Errore'); 
      setTimeout(() => setSendStatus(''), 3000); 
    }
  };

  const labels = getLabels(), config = getConfig();

  // LOGIN
  if (!user) return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={S.loginWrap}><div style={S.loginCard}>
      <div style={S.logoContainer}>
        <div style={S.logoIcon}><div style={S.podium}>
          <div style={{ ...S.podiumBar, height: 35, background: '#C0C0C0' }}><span style={S.podiumNum}>2</span></div>
          <div style={{ ...S.podiumBar, height: 50, background: '#FFD700' }}><span style={S.podiumNum}>1</span></div>
          <div style={{ ...S.podiumBar, height: 25, background: '#CD7F32' }}><span style={S.podiumNum}>3</span></div>
        </div></div>
        <div style={S.logoText}><span style={{ color: '#7C4DFF', fontWeight: 800 }}>LEADER</span><span style={{ fontWeight: 300, marginLeft: 8 }}>RANKING</span></div>
        <div style={S.logoTagline}>Power your team rankings</div>
      </div>
      <div style={S.loginDivider} />
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 25, fontSize: 14 }}>Accedi per gestire le classifiche</p>
      <input style={S.input} placeholder="Username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} />
      <input style={S.input} type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} onKeyPress={e => e.key === 'Enter' && handleLogin()} />
      {loginError && <p style={{ color: '#f44', fontSize: 13, marginBottom: 10 }}>{loginError}</p>}
      <button style={S.btn} onClick={handleLogin}>ACCEDI</button>
      <div style={S.categoryIcons}><span style={S.catIcon}>🟠</span><span style={S.catIcon}>🔵</span><span style={S.catIcon}>⭐</span><span style={S.catIcon}>👑</span></div>
      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 25 }}>v8.0</p>
    </div></div></>);

  // HOMEPAGE CSV
  if (!csvData && (user.role === 'admin' || user.role === 'assistente')) return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={S.homeWrap}>
      <header style={S.homeHeader}><div style={S.homeLogoSmall}><span style={{ color: '#7C4DFF', fontWeight: 800 }}>LEADER</span><span style={{ fontWeight: 300 }}> RANKING</span></div><button style={S.logoutBtn} onClick={() => setUser(null)}>Esci</button></header>
      <main style={S.homeMain}>
        <div style={S.homeLogo}>
          <div style={S.homeLogoIcon}><div style={S.homePodium}>
            <div style={{ ...S.homePodiumBar, height: 55, background: 'linear-gradient(180deg, #E0E0E0 0%, #9E9E9E 100%)' }}><span style={S.homePodiumNum}>2</span></div>
            <div style={{ ...S.homePodiumBar, height: 80, background: 'linear-gradient(180deg, #FFE082 0%, #FFD700 100%)' }}><span style={S.homePodiumNum}>1</span></div>
            <div style={{ ...S.homePodiumBar, height: 40, background: 'linear-gradient(180deg, #FFAB91 0%, #CD7F32 100%)' }}><span style={S.homePodiumNum}>3</span></div>
          </div></div>
          <h1 style={S.homeTitle}><span style={{ color: '#7C4DFF' }}>LEADER</span> RANKING</h1>
          <p style={S.homeSubtitle}>Power your team rankings</p>
        </div>
        <div style={{ ...S.uploadArea, ...(isDragging ? S.uploadAreaActive : {}) }} onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={e => { e.preventDefault(); setIsDragging(false); }} onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) processFile(f); }}>
          <input type="file" accept=".csv" id="csvUpload" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processFile(e.target.files[0]); }} />
          <label htmlFor="csvUpload" style={S.uploadLabel}><div style={S.uploadIcon}>📊</div><div style={S.uploadText}>CARICA FILE CSV</div><div style={S.uploadHint}>Trascina qui o clicca per selezionare</div></label>
        </div>
        <div style={S.categoriesPreview}><div style={S.catPreviewItem}><span style={S.catPreviewIcon}>🟠</span><span>IVD</span></div><div style={S.catPreviewItem}><span style={S.catPreviewIcon}>🔵</span><span>SDP</span></div><div style={S.catPreviewItem}><span style={S.catPreviewIcon}>⭐</span><span>NW</span></div><div style={S.catPreviewItem}><span style={S.catPreviewIcon}>👑</span><span>K</span></div></div>
        <p style={S.homeFooter}>Formati supportati: Luce Amica, Fotovoltaico, Seminario, Attivazioni</p>
      </main>
    </div></>);

  // PREVIEW
  if (showPreview && previewImage) return (<><Head><title>Anteprima</title></Head>
    <div style={S.previewWrap}><div style={S.previewModal}>
      <h2 style={{ color: '#fff', marginBottom: 5 }}>📸 Anteprima 1080x1080</h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 15 }}>✅ {getData().length} partecipanti • {getClassificaTotal()} contratti</p>
      <div style={S.previewImg}><img src={previewImage} style={{ maxWidth: '100%', maxHeight: '55vh' }} /></div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 15, flexWrap: 'wrap' }}>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setShowPreview(false)}>Chiudi</button>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg,#4CAF50,#81C784)' }} onClick={download}>📥 Scarica</button>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg,#00BFA5,#1DE9B6)' }} onClick={handleSendToBot}>🤖 Invia a Bot</button>
      </div>
      {sendStatus && <p style={{ textAlign: 'center', marginTop: 10, color: sendStatus.includes('✅') ? '#4CAF50' : sendStatus.includes('❌') ? '#f44' : '#FFC107' }}>{sendStatus}</p>}
    </div></div></>);

  // DASHBOARD
  return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={S.dash}>
      <header style={S.header}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><button style={S.menuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button><span style={{ fontWeight: 800, color: '#7C4DFF' }}>LEADER</span><span style={{ fontWeight: 300, color: '#fff' }}>RANKING</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={S.badge}>{user.role.toUpperCase()}</span><button style={{ ...S.btn, padding: '6px 12px', fontSize: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => { setUser(null); setCsvData(null); setRankings(null); }}>Esci</button></div></header>
      <main style={{ display: 'flex' }}>
        <aside style={{ ...S.sidebar, ...(mobileMenuOpen ? { transform: 'translateX(0)' } : {}) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>📊 CLASSIFICHE</span><button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }} onClick={() => setMobileMenuOpen(false)}>✕</button></div>
          {rankings ? (<><p style={S.catLabel}>IVD</p><button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_inseriti'); setMobileMenuOpen(false); }}>🟠 {labels.c1} ({rankings.ivd_inseriti.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_accettati'); setMobileMenuOpen(false); }}>🟢 {labels.c2} ({rankings.ivd_accettati.length})</button><p style={S.catLabel}>SDP</p><button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_inseriti'); setMobileMenuOpen(false); }}>🔵 {labels.c1} ({rankings.sdp_inseriti.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_accettati'); setMobileMenuOpen(false); }}>🟢 {labels.c2} ({rankings.sdp_accettati.length})</button><p style={S.catLabel}>MANAGER</p><button style={{ ...S.menuItem, ...(selectedRanking === 'nw' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('nw'); setMobileMenuOpen(false); }}>⭐ Networker ({rankings.nw.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'k' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('k'); setMobileMenuOpen(false); }}>👑 K Manager ({rankings.k.length})</button></>) : <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Carica CSV</p>}
          <div style={S.divider} />
          {(user.role === 'admin' || user.role === 'assistente') && (<><p style={S.catLabel}>⚙️ FILTRI</p><label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}><input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={{ accentColor: '#7C4DFF' }} /> Escludi K</label><div style={S.divider} /><p style={S.catLabel}>📅 PERIODO</p><button style={{ ...S.periodBtn, ...(!selectedMonth ? { background: 'rgba(124,77,255,0.2)', color: '#7C4DFF' } : {}) }} onClick={handleShowAll}>📋 Tutti ({csvData?.length || 0})</button>{availableMonths.length > 0 && (<select style={S.select} value={selectedMonth} onChange={e => handleMonthChange(e.target.value)}><option value="">-- Mese --</option>{availableMonths.map(m => <option key={m} value={m}>{m}</option>)}</select>)}{weeks.length > 0 && (<select style={S.select} value={selectedWeek?.num || ''} onChange={e => handleWeekChange(e.target.value)}><option value="">-- Settimana --</option>{weeks.map(w => <option key={w.num} value={w.num}>{w.label}</option>)}</select>)}<div style={S.divider} /><p style={S.catLabel}>🏷️ ETICHETTE</p><select style={S.select} value={eventName} onChange={e => setEventName(e.target.value)}>{EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select><input style={S.inputSm} value={eventDate} onChange={e => setEventDate(e.target.value)} placeholder="Periodo" /></>)}
        </aside>
        {mobileMenuOpen && <div style={S.overlay} onClick={() => setMobileMenuOpen(false)} />}
        <section style={S.content}>
          {(user.role === 'admin' || user.role === 'assistente') && (<div style={{ ...S.uploadBox, ...(isDragging ? { borderColor: '#7C4DFF', background: 'rgba(124,77,255,0.1)' } : {}) }} onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={e => { e.preventDefault(); setIsDragging(false); }} onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) processFile(f); }}><input type="file" accept=".csv" id="csv" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processFile(e.target.files[0]); }} /><label htmlFor="csv" style={{ cursor: 'pointer', padding: '10px 20px', background: 'rgba(124,77,255,0.1)', borderRadius: 8, color: '#7C4DFF', fontWeight: 600 }}>{filteredData ? `✅ ${filteredData.length} righe caricate` : '📤 Carica CSV'}</label></div>)}
          {rankings ? (<div style={S.rankCard}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}><div><h2 style={{ color: config.color, fontSize: 18, margin: 0 }}>{config.emoji} {config.label}</h2><p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>{getData().length} partecipanti • {getClassificaTotal()} contratti • {eventDate}</p></div><div style={{ display: 'flex', gap: 15 }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: config.color }}>{getClassificaTotal()}</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{labels.c1}</div></div><div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#4CAF50' }}>{getData().reduce((s,[,x])=>s+x.v2,0)}</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{labels.c2}</div></div></div></div><div style={{ overflowX: 'auto', maxHeight: '50vh', overflowY: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 300 }}><thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}><th style={S.th}>#</th><th style={{ ...S.th, textAlign: 'left' }}>Nome</th><th style={S.th}>{labels.c1}</th>{isExclusive() && <><th style={S.th}>%</th><th style={S.th}>{labels.c2}</th></>}</tr></thead><tbody>{getData().map(([name, s], i) => { const p = s.v1 > 0 ? Math.round(s.v2 / s.v1 * 100) : 0; return (<tr key={name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', ...(i < 3 ? { background: `${config.color}10` } : {}) }}><td style={{ padding: 10, textAlign: 'center' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td><td style={{ padding: 10, fontWeight: i < 3 ? 700 : 500, fontSize: 13 }}>{name}</td><td style={{ padding: 10, textAlign: 'center', color: config.color, fontWeight: 700 }}>{s.v1}</td>{isExclusive() && <><td style={{ padding: 10, textAlign: 'center', color: p >= 50 ? '#4CAF50' : '#FFC107', fontSize: 12 }}>{p}%</td><td style={{ padding: 10, textAlign: 'center', color: '#4CAF50', fontWeight: 700 }}>{s.v2}</td></>}</tr>); })}</tbody></table></div>{(user.role === 'admin' || user.role === 'assistente') && (<div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', alignItems: 'center' }}><button style={{ ...S.btn, flex: 1, minWidth: 120, background: `linear-gradient(135deg,${config.color},${config.color}88)` }} onClick={handleGenerate}>📸 PNG 1080x1080</button><button style={{ ...S.btn, flex: 1, minWidth: 120, background: 'linear-gradient(135deg,#00BFA5,#1DE9B6)' }} onClick={handleSendToBot}>🤖 Invia a Bot</button>{sendStatus && <span style={{ fontSize: 13, color: sendStatus.includes('✅') ? '#4CAF50' : sendStatus.includes('❌') ? '#f44' : '#FFC107' }}>{sendStatus}</span>}</div>)}</div>) : (<div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.4)' }}><div style={{ fontSize: 50 }}>📊</div><p>Carica un CSV per iniziare</p></div>)}
        </section>
      </main>
    </div></>);
}

const S = {
  loginWrap: { minHeight: '100vh', background: 'linear-gradient(135deg,#0a0a15 0%,#1a1a2e 50%,#0a0a15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif' },
  loginCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '45px 35px', width: '100%', maxWidth: 400, textAlign: 'center', color: '#fff', backdropFilter: 'blur(10px)' },
  logoContainer: { marginBottom: 25 }, logoIcon: { marginBottom: 15 },
  podium: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4, height: 55 },
  podiumBar: { width: 30, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 4 },
  podiumNum: { fontSize: 12, fontWeight: 800, color: '#000' },
  logoText: { fontSize: 32, marginBottom: 5 }, logoTagline: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontStyle: 'italic' },
  loginDivider: { height: 1, background: 'linear-gradient(90deg, transparent, rgba(124,77,255,0.3), transparent)', margin: '25px 0' },
  input: { width: '100%', padding: '16px 18px', fontSize: 15, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, background: 'rgba(255,255,255,0.03)', color: '#fff', marginBottom: 14, outline: 'none', boxSizing: 'border-box' },
  btn: { padding: '16px 28px', fontSize: 15, fontWeight: 700, border: 'none', borderRadius: 12, background: 'linear-gradient(135deg,#7C4DFF,#536DFE)', color: '#fff', cursor: 'pointer', width: '100%' },
  categoryIcons: { display: 'flex', justifyContent: 'center', gap: 20, marginTop: 30 }, catIcon: { fontSize: 24, opacity: 0.6 },
  homeWrap: { minHeight: '100vh', background: 'linear-gradient(135deg,#0a0a15 0%,#12121f 50%,#0a0a15 100%)', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif' },
  homeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  homeLogoSmall: { fontSize: 18, color: '#fff' },
  logoutBtn: { padding: '8px 16px', fontSize: 13, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, background: 'transparent', color: '#fff', cursor: 'pointer' },
  homeMain: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', padding: 30 },
  homeLogo: { textAlign: 'center', marginBottom: 50 }, homeLogoIcon: { marginBottom: 20 },
  homePodium: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, height: 90 },
  homePodiumBar: { width: 50, borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
  homePodiumNum: { fontSize: 20, fontWeight: 800, color: 'rgba(0,0,0,0.7)' },
  homeTitle: { fontSize: 48, fontWeight: 300, color: '#fff', marginBottom: 8 }, homeSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' },
  uploadArea: { width: '100%', maxWidth: 500, border: '3px dashed rgba(124,77,255,0.3)', borderRadius: 20, padding: '60px 40px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(124,77,255,0.03)' },
  uploadAreaActive: { borderColor: '#7C4DFF', background: 'rgba(124,77,255,0.1)', transform: 'scale(1.02)' },
  uploadLabel: { cursor: 'pointer', display: 'block' }, uploadIcon: { fontSize: 70, marginBottom: 20 }, uploadText: { fontSize: 22, fontWeight: 700, color: '#7C4DFF', marginBottom: 10 }, uploadHint: { fontSize: 14, color: 'rgba(255,255,255,0.4)' },
  categoriesPreview: { display: 'flex', gap: 20, marginTop: 50, flexWrap: 'wrap', justifyContent: 'center' },
  catPreviewItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '15px 25px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  catPreviewIcon: { fontSize: 28 }, homeFooter: { marginTop: 40, color: 'rgba(255,255,255,0.3)', fontSize: 12 },
  previewWrap: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 15 },
  previewModal: { background: 'linear-gradient(135deg,#1a1a2e,#12121f)', borderRadius: 20, padding: 25, width: '100%', maxWidth: 600, maxHeight: '95vh', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.1)' },
  previewImg: { background: '#0a0a15', borderRadius: 12, padding: 12, overflow: 'auto', flex: 1 },
  dash: { minHeight: '100vh', background: '#0a0a12', color: '#fff', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 100 },
  menuBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  badge: { fontSize: 10, padding: '4px 10px', background: 'rgba(124,77,255,0.2)', color: '#7C4DFF', borderRadius: 15, fontWeight: 700 },
  sidebar: { position: 'fixed', top: 0, left: 0, width: 280, height: '100vh', background: '#0f0f1a', padding: '60px 15px 20px', overflowY: 'auto', zIndex: 200, transform: 'translateX(-100%)', transition: 'transform 0.3s', boxSizing: 'border-box', borderRight: '1px solid rgba(255,255,255,0.05)' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 150 },
  catLabel: { fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, marginTop: 15, marginBottom: 6, textTransform: 'uppercase' },
  menuItem: { display: 'block', width: '100%', padding: '10px 14px', fontSize: 13, border: 'none', borderRadius: 8, background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', textAlign: 'left', marginBottom: 2 },
  menuActive: { background: 'rgba(124,77,255,0.2)', color: '#7C4DFF' },
  divider: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '15px 0' },
  periodBtn: { display: 'block', width: '100%', padding: '8px 12px', fontSize: 12, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginBottom: 8, textAlign: 'left' },
  select: { width: '100%', padding: '10px', fontSize: 13, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'rgba(255,255,255,0.03)', color: '#fff', marginBottom: 8 },
  inputSm: { width: '100%', padding: '8px 10px', fontSize: 12, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, background: 'rgba(255,255,255,0.03)', color: '#fff', marginBottom: 8, boxSizing: 'border-box' },
  content: { flex: 1, padding: 15, minHeight: 'calc(100vh - 60px)' },
  uploadBox: { border: '2px dashed rgba(124,77,255,0.25)', borderRadius: 12, padding: '20px', textAlign: 'center', marginBottom: 15, transition: 'all 0.3s' },
  rankCard: { background: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: 18, border: '1px solid rgba(255,255,255,0.05)' },
  th: { padding: 10, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', textAlign: 'center' },
};
