import React, { useState } from 'react';
import Head from 'next/head';

// ==================== CONFIGURAZIONE ====================
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
const EVENT_TYPES = ['LUCE AMICA', 'FOTOVOLTAICO', 'INSERITI SEMINARIO', 'ATTIVATI', 'FORMAZIONE'];
const WEBHOOK_URL = 'https://hook.eu1.make.com/sm6lrhpoet204lv6xkwj10xiypwnn4qm';

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
  const cal = PRODUCTION_CALENDAR[month];
  if (!cal) return [];
  const start = new Date(cal.start.replace(' ', 'T'));
  const end = new Date(cal.end.replace(' ', 'T'));
  const weeks = [];
  let weekStart = new Date(start);
  let weekEnd = new Date(start);
  while (weekEnd.getDay() !== 0) weekEnd.setDate(weekEnd.getDate() + 1);
  weekEnd.setHours(23, 59, 59);
  if (weekEnd > end) weekEnd = new Date(end);
  weeks.push({ num: 1, start: new Date(weekStart), end: new Date(weekEnd), label: `Sett.1 (${weekStart.getDate()}/${weekStart.getMonth()+1} - ${weekEnd.getDate()}/${weekEnd.getMonth()+1})` });
  let weekNum = 2;
  weekStart = new Date(weekEnd);
  weekStart.setDate(weekStart.getDate() + 1);
  weekStart.setHours(0, 0, 0);
  while (weekStart < end) {
    weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59);
    if (weekEnd >= end || weekNum >= 5) weekEnd = new Date(end);
    weeks.push({ num: weekNum, start: new Date(weekStart), end: new Date(weekEnd), label: `Sett.${weekNum} (${weekStart.getDate()}/${weekStart.getMonth()+1} - ${weekEnd.getDate()}/${weekEnd.getMonth()+1})` });
    if (weekEnd >= end) break;
    weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() + 1);
    weekStart.setHours(0, 0, 0);
    weekNum++;
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

  // Parser CSV - SOLO punto e virgola
  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(';').map(h => h.trim().replace(/"/g, '').replace(/^\uFEFF/, ''));
    return lines.slice(1).map(line => {
      const values = line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
      const row = {};
      headers.forEach((h, i) => { row[h] = values[i] || ''; });
      return row;
    }).filter(row => Object.values(row).some(v => v));
  };

  const getRowMonth = (row) => row['Mese di Produzione'] || null;
  const getRowDate = (row) => {
    const d = row['Inserimento'] || '';
    return d ? new Date(d.replace(' ', 'T')) : null;
  };

  const extractMonths = (data) => {
    const months = new Set();
    data.forEach(r => { const m = getRowMonth(r); if (m) months.add(m); });
    return Array.from(months).sort((a, b) => {
      const order = { 'Gennaio':1,'Febbraio':2,'Marzo':3,'Aprile':4,'Maggio':5,'Giugno':6,'Luglio':7,'Agosto':8,'Settembre':9,'Ottobre':10,'Novembre':11,'Dicembre':12 };
      const [mA, yA] = a.split(' '); const [mB, yB] = b.split(' ');
      return yA !== yB ? parseInt(yB) - parseInt(yA) : order[mB] - order[mA];
    });
  };

  const filterByMonth = (data, month) => month ? data.filter(r => getRowMonth(r) === month) : data;
  const filterByWeek = (data, week) => week ? data.filter(r => { const d = getRowDate(r); return d && d >= week.start && d <= week.end; }) : data;

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setSelectedWeek(null);
    setWeeks(getWeeksForMonth(month));
    if (csvData && month) {
      const filtered = filterByMonth(csvData, month);
      setFilteredData(filtered);
      generateRankings(filtered, csvType, excludeK);
      setEventDate(month.toUpperCase());
    }
  };

  const handleWeekChange = (weekNum) => {
    if (!weekNum) {
      setSelectedWeek(null);
      if (csvData && selectedMonth) {
        const filtered = filterByMonth(csvData, selectedMonth);
        setFilteredData(filtered);
        generateRankings(filtered, csvType, excludeK);
        setEventDate(selectedMonth.toUpperCase());
      }
      return;
    }
    const week = weeks.find(w => w.num === parseInt(weekNum));
    setSelectedWeek(week);
    if (csvData && selectedMonth && week) {
      let filtered = filterByMonth(csvData, selectedMonth);
      filtered = filterByWeek(filtered, week);
      setFilteredData(filtered);
      generateRankings(filtered, csvType, excludeK);
      setEventDate(`${selectedMonth.toUpperCase()} - SETT.${week.num}`);
    }
  };

  const handleShowAll = () => {
    setSelectedMonth('');
    setSelectedWeek(null);
    setWeeks([]);
    if (csvData) {
      setFilteredData(csvData);
      generateRankings(csvData, csvType, excludeK);
      setEventDate('TOTALE');
    }
  };

  const handleLogin = () => {
    const u = USERS[loginForm.username.toLowerCase().replace(/\s+/g, '_')];
    if (u && u.password === loginForm.password) { setUser({ ...u, username: loginForm.username }); setLoginError(''); }
    else setLoginError('Credenziali non valide');
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = parseCSV(e.target.result);
      setCsvData(data);
      setFilteredData(data);
      const months = extractMonths(data);
      setAvailableMonths(months);
      if (months.length > 0) {
        setSelectedMonth(months[0]);
        setEventDate(months[0].toUpperCase());
        setWeeks(getWeeksForMonth(months[0]));
      }
      const headers = Object.keys(data[0] || {}).join(' ').toLowerCase();
      let type = 'luce_amica';
      if (headers.includes('presente')) type = 'seminario';
      else if (headers.includes('fv') || headers.includes('fotovoltaico')) type = 'fotovoltaico';
      else if (headers.includes('attivazione')) type = 'attivazioni';
      setCsvType(type);
      if (type === 'seminario') setEventName('INSERITI SEMINARIO');
      else if (type === 'fotovoltaico') setEventName('FOTOVOLTAICO');
      else setEventName('LUCE AMICA');
      generateRankings(data, type, excludeK);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const generateRankings = (data, type, filterK) => {
    const isK = (name) => K_NAMES.some(k => (name||'').toUpperCase().includes(k));
    const ivd = {}, sdp = {}, nw = {}, k = {};
    const getField = (row, fieldName) => {
      const val = row[fieldName];
      if (!val || val.trim() === '' || val.trim().toUpperCase().startsWith('NWG')) return '';
      return val.trim();
    };

    data.forEach(row => {
      const ivdN = getField(row, 'Nome Intermediario');
      let sdpN = getField(row, 'Nome Primo SDP FV') || getField(row, 'Nome Primo SDP LA');
      const nwN = getField(row, 'Nome Primo Networker');
      const kN = getField(row, 'Nome Primo K');
      
      let isV2 = false;
      if (type === 'seminario') isV2 = (row['Presente SI'] || '').toLowerCase() === 'si';
      else {
        const stato = (row['Stato NWG Energia'] || row['Stato NWG Spa'] || row['Stato'] || '').toLowerCase();
        isV2 = stato.includes('accettato') || stato.includes('attivo') || stato.includes('active');
      }
      
      if (ivdN && (!filterK || !isK(ivdN))) { if (!ivd[ivdN]) ivd[ivdN] = {v1:0,v2:0}; ivd[ivdN].v1++; if (isV2) ivd[ivdN].v2++; }
      if (sdpN && (!filterK || !isK(sdpN))) { if (!sdp[sdpN]) sdp[sdpN] = {v1:0,v2:0}; sdp[sdpN].v1++; if (isV2) sdp[sdpN].v2++; }
      if (nwN && (!filterK || !isK(nwN))) { if (!nw[nwN]) nw[nwN] = {v1:0,v2:0}; nw[nwN].v1++; if (isV2) nw[nwN].v2++; }
      if (kN) { if (!k[kN]) k[kN] = {v1:0,v2:0}; k[kN].v1++; if (isV2) k[kN].v2++; }
    });

    const sV1 = (a, b) => b[1].v1 - a[1].v1;
    const sV2 = (a, b) => b[1].v2 - a[1].v2;
    const totV1 = data.length;
    const totV2 = data.filter(row => {
      const stato = (row['Stato NWG Energia'] || row['Stato NWG Spa'] || row['Stato'] || row['Presente SI'] || '').toLowerCase();
      return stato.includes('accettato') || stato.includes('attivo') || stato.includes('active') || stato === 'si';
    }).length;
    
    setRankings({
      type, excludeK: filterK,
      ivd_inseriti: Object.entries(ivd).sort(sV1),
      ivd_accettati: Object.entries(ivd).filter(([,s]) => s.v2 > 0).sort(sV2),
      sdp_inseriti: Object.entries(sdp).sort(sV1),
      sdp_accettati: Object.entries(sdp).filter(([,s]) => s.v2 > 0).sort(sV2),
      nw: Object.entries(nw).sort(sV1),
      k: Object.entries(k).sort(sV1),
      totals: { v1: totV1, v2: totV2 }
    });
    setSelectedRanking('ivd_inseriti');
  };

  const toggleExcludeK = () => { const n = !excludeK; setExcludeK(n); if (filteredData) generateRankings(filteredData, csvType, n); };
  const getData = () => rankings ? (rankings[selectedRanking] || []) : [];
  const getLabels = () => rankings?.type === 'seminario' ? { c1: 'ISCRITTI', c2: 'PRESENTI' } : { c1: 'INSERITI', c2: 'ACCETTATI' };
  const isExclusive = () => ['nw', 'k'].includes(selectedRanking);
  const getColors = () => {
    const c = {
      ivd_inseriti: { p: '#FF6B35', s: '#FF8C5A', bg: '#1a0f0a', name: 'IVD' },
      ivd_accettati: { p: '#4CAF50', s: '#81C784', bg: '#0a1a0c', name: 'IVD' },
      sdp_inseriti: { p: '#2196F3', s: '#64B5F6', bg: '#0a0f1a', name: 'SDP' },
      sdp_accettati: { p: '#4CAF50', s: '#81C784', bg: '#0a1a0c', name: 'SDP' },
      nw: { p: '#9C27B0', s: '#E040FB', bg: '#1a0a1f', name: 'NETWORKER' },
      k: { p: '#FFD700', s: '#FFA000', bg: '#1a1505', name: 'K MANAGER' }
    };
    return c[selectedRanking] || { p: '#7C4DFF', s: '#B388FF', bg: '#0f0f1a', name: '' };
  };
  const getClassificaTotal = () => getData().reduce((sum, [,s]) => sum + s.v1, 0);

  // Raggruppa per pari merito
  const groupByValue = (data, useV2 = false) => {
    const groups = {};
    data.forEach(([name, s]) => {
      const val = useV2 ? s.v2 : s.v1;
      if (!groups[val]) groups[val] = [];
      groups[val].push({ name, ...s });
    });
    return Object.entries(groups)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .map(([val, members]) => ({ value: parseInt(val), members }));
  };

  // ==================== PNG 1080x1080 IVD/SDP ====================
  const generatePNG_Impact = () => {
    const data = getData();
    if (!data.length) return null;
    const colors = getColors();
    const labels = getLabels();
    const isAcc = selectedRanking.includes('accettati');
    const grouped = groupByValue(data, isAcc);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;
    
    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0d0d14');
    bg.addColorStop(0.5, colors.bg);
    bg.addColorStop(1, '#0d0d14');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    
    // Border
    ctx.strokeStyle = `${colors.p}40`;
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, W - 30, H - 30);
    
    // Header bar
    ctx.fillStyle = colors.p;
    ctx.fillRect(30, 30, W - 60, 4);
    
    // Logo
    ctx.fillStyle = colors.p;
    ctx.font = 'bold 18px Arial';
    ctx.fillText('NWG ITALIA', 40, 65);
    
    // Title
    const emoji = selectedRanking === 'ivd_inseriti' ? '🟠' : selectedRanking === 'ivd_accettati' ? '🟢' : selectedRanking === 'sdp_inseriti' ? '🔵' : '🟢';
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 38px Arial';
    ctx.fillText(`${emoji} CLASSIFICA ${colors.name} ${isAcc ? labels.c2 : labels.c1}`, 40, 115);
    
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '20px Arial';
    ctx.fillText(`${eventName} • ${eventDate}`, 40, 150);
    
    // Stats box
    const totIns = getClassificaTotal();
    const totAcc = getData().reduce((sum, [,s]) => sum + s.v2, 0);
    const convPct = Math.round(totAcc / totIns * 100) || 0;
    
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.roundRect(W - 320, 50, 280, 70, 12);
    ctx.fill();
    
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = colors.p;
    ctx.fillText(totIns.toString(), W - 230, 95);
    ctx.fillStyle = '#4CAF50';
    ctx.fillText(totAcc.toString(), W - 130, 95);
    ctx.fillStyle = convPct >= 50 ? '#4CAF50' : '#FFC107';
    ctx.fillText(`${convPct}%`, W - 50, 95);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(labels.c1, W - 230, 112);
    ctx.fillText(labels.c2, W - 130, 112);
    ctx.fillText('CONV', W - 50, 112);
    ctx.textAlign = 'left';
    
    // Partecipanti count
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '16px Arial';
    ctx.fillText(`${data.length} partecipanti in classifica`, 40, 180);
    
    // Separator
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(40, 195, W - 80, 2);
    
    // Rankings
    let currentY = 220;
    let position = 1;
    const maxY = H - 80;
    
    grouped.forEach((group, groupIdx) => {
      if (currentY > maxY) return;
      
      const { value, members } = group;
      const isTop3 = position <= 3;
      const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : null;
      
      if (isTop3 && members.length <= 2) {
        // TOP 3: Card grande per ogni membro (se pochi)
        members.forEach((member, mIdx) => {
          if (currentY > maxY) return;
          
          // Card background
          const cardGrad = ctx.createLinearGradient(40, currentY, W - 40, currentY);
          cardGrad.addColorStop(0, `${colors.p}25`);
          cardGrad.addColorStop(1, `${colors.p}08`);
          ctx.fillStyle = cardGrad;
          ctx.beginPath();
          ctx.roundRect(40, currentY, W - 80, 65, 10);
          ctx.fill();
          
          // Medal/Position
          ctx.font = '36px Arial';
          ctx.fillText(medal || `${position}°`, 60, currentY + 45);
          
          // Name
          ctx.fillStyle = '#FFF';
          ctx.font = 'bold 28px Arial';
          const displayName = member.name.length > 30 ? member.name.substring(0, 28) + '...' : member.name;
          ctx.fillText(displayName.toUpperCase(), 130, currentY + 43);
          
          // Value
          ctx.fillStyle = isAcc ? '#4CAF50' : colors.p;
          ctx.font = 'bold 36px Arial';
          ctx.textAlign = 'right';
          ctx.fillText(value.toString(), W - 60, currentY + 45);
          ctx.textAlign = 'left';
          
          currentY += 75;
        });
      } else if (isTop3) {
        // TOP 3 con molti pari merito: Card con nomi in riga
        const cardGrad = ctx.createLinearGradient(40, currentY, W - 40, currentY);
        cardGrad.addColorStop(0, `${colors.p}25`);
        cardGrad.addColorStop(1, `${colors.p}08`);
        ctx.fillStyle = cardGrad;
        
        const namesText = members.map(m => m.name.toUpperCase()).join(' • ');
        const lines = wrapText(ctx, namesText, W - 250, 'bold 22px Arial');
        const cardHeight = Math.max(65, 40 + lines.length * 28);
        
        ctx.beginPath();
        ctx.roundRect(40, currentY, W - 80, cardHeight, 10);
        ctx.fill();
        
        // Medal
        ctx.font = '36px Arial';
        ctx.fillText(medal, 60, currentY + 45);
        
        // Names
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 22px Arial';
        lines.forEach((line, i) => {
          ctx.fillText(line, 130, currentY + 35 + i * 28);
        });
        
        // Value
        ctx.fillStyle = isAcc ? '#4CAF50' : colors.p;
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), W - 60, currentY + 45);
        ctx.textAlign = 'left';
        
        currentY += cardHeight + 10;
      } else {
        // Altri: Lista compatta con nomi separati da •
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.beginPath();
        
        const namesText = members.map(m => m.name.toUpperCase()).join(' • ');
        ctx.font = '18px Arial';
        const lines = wrapText(ctx, namesText, W - 200, '18px Arial');
        const blockHeight = Math.max(40, 25 + lines.length * 24);
        
        ctx.roundRect(40, currentY, W - 80, blockHeight, 8);
        ctx.fill();
        
        // Position
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`${position}°`, 55, currentY + 28);
        
        // Names
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = '18px Arial';
        lines.forEach((line, i) => {
          ctx.fillText(line, 100, currentY + 26 + i * 24);
        });
        
        // Value
        ctx.fillStyle = isAcc ? '#4CAF50' : colors.p;
        ctx.font = 'bold 26px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), W - 55, currentY + 30);
        ctx.textAlign = 'left';
        
        currentY += blockHeight + 8;
      }
      
      position++;
    });
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(40, H - 55, W - 80, 2);
    
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '16px Arial';
    ctx.fillText(`📊 ${data.length} partecipanti • ${totIns} contratti`, 45, H - 25);
    ctx.textAlign = 'right';
    ctx.fillText('LEADER RANKING • TEAM TIESI', W - 45, H - 25);
    ctx.textAlign = 'left';
    
    // Bottom bar
    ctx.fillStyle = colors.p;
    ctx.fillRect(30, H - 15, W - 60, 4);
    
    return canvas.toDataURL('image/png');
  };

  // ==================== PNG 1080x1080 NETWORKER/K ====================
  const generatePNG_Exclusive = () => {
    const data = getData();
    if (!data.length) return null;
    const colors = getColors();
    const labels = getLabels();
    const isK = selectedRanking === 'k';
    const grouped = groupByValue(data, false);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;
    
    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0a10');
    bg.addColorStop(0.3, colors.bg);
    bg.addColorStop(0.7, colors.bg);
    bg.addColorStop(1, '#0a0a10');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    
    // Double border
    ctx.strokeStyle = isK ? 'rgba(255,215,0,0.4)' : 'rgba(156,39,176,0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, W - 30, H - 30);
    ctx.strokeStyle = isK ? 'rgba(255,215,0,0.2)' : 'rgba(156,39,176,0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(25, 25, W - 50, H - 50);
    
    // Header gradient bar
    const hg = ctx.createLinearGradient(0, 0, W, 0);
    hg.addColorStop(0, 'transparent');
    hg.addColorStop(0.2, colors.p);
    hg.addColorStop(0.8, colors.s);
    hg.addColorStop(1, 'transparent');
    ctx.fillStyle = hg;
    ctx.fillRect(40, 40, W - 80, 5);
    
    // Title
    const emoji = isK ? '👑' : '⭐';
    ctx.fillStyle = colors.p;
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${emoji} CLASSIFICA ${colors.name} ${emoji}`, W/2, 100);
    
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '22px Arial';
    ctx.fillText(`${eventName} • ${eventDate}`, W/2, 135);
    
    // Stats
    const totIns = getClassificaTotal();
    const totAcc = getData().reduce((sum, [,s]) => sum + s.v2, 0);
    const pct = Math.round(totAcc / totIns * 100) || 0;
    
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.roundRect(W/2 - 200, 155, 400, 50, 10);
    ctx.fill();
    
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors.p;
    ctx.fillText(`${totIns} ${labels.c1}`, W/2 - 100, 188);
    ctx.fillStyle = pct >= 50 ? '#4CAF50' : '#FFC107';
    ctx.fillText(`${pct}%`, W/2, 188);
    ctx.fillStyle = '#4CAF50';
    ctx.fillText(`${totAcc} ${labels.c2}`, W/2 + 100, 188);
    ctx.textAlign = 'left';
    
    // Rankings
    let currentY = 230;
    let position = 1;
    const maxY = H - 80;
    
    grouped.forEach((group) => {
      if (currentY > maxY) return;
      
      const { value, members } = group;
      const isTop3 = position <= 3;
      const medal = position === 1 ? '🏆' : position === 2 ? '🥈' : position === 3 ? '🥉' : null;
      
      if (isTop3) {
        members.forEach((member) => {
          if (currentY > maxY) return;
          
          // Card
          const cardGrad = ctx.createLinearGradient(50, currentY, W - 50, currentY);
          if (position === 1) {
            cardGrad.addColorStop(0, 'rgba(255,215,0,0.20)');
            cardGrad.addColorStop(1, 'rgba(255,215,0,0.05)');
          } else if (position === 2) {
            cardGrad.addColorStop(0, 'rgba(192,192,192,0.15)');
            cardGrad.addColorStop(1, 'rgba(192,192,192,0.03)');
          } else {
            cardGrad.addColorStop(0, 'rgba(205,127,50,0.12)');
            cardGrad.addColorStop(1, 'rgba(205,127,50,0.03)');
          }
          ctx.fillStyle = cardGrad;
          ctx.beginPath();
          ctx.roundRect(50, currentY, W - 100, 120, 15);
          ctx.fill();
          
          ctx.strokeStyle = position === 1 ? 'rgba(255,215,0,0.5)' : position === 2 ? 'rgba(192,192,192,0.4)' : 'rgba(205,127,50,0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Medal + Position
          ctx.font = '48px Arial';
          ctx.fillText(medal, 75, currentY + 70);
          
          ctx.fillStyle = position === 1 ? '#FFD700' : position === 2 ? '#C0C0C0' : '#CD7F32';
          ctx.font = 'bold 32px Arial';
          ctx.fillText(`${position}°`, 140, currentY + 65);
          
          // Name
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 30px Arial';
          ctx.fillText(member.name.toUpperCase(), 200, currentY + 65);
          
          // Stats
          const pctMember = member.v1 > 0 ? Math.round(member.v2 / member.v1 * 100) : 0;
          
          // Inseriti
          ctx.textAlign = 'center';
          ctx.fillStyle = colors.p;
          ctx.font = 'bold 34px Arial';
          ctx.fillText(member.v1.toString(), W - 320, currentY + 55);
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.font = '12px Arial';
          ctx.fillText(labels.c1, W - 320, currentY + 75);
          
          // Progress bar
          const barX = W - 260;
          const barW = 120;
          ctx.fillStyle = 'rgba(255,255,255,0.15)';
          ctx.beginPath();
          ctx.roundRect(barX, currentY + 40, barW, 22, 6);
          ctx.fill();
          
          const barColor = pctMember >= 60 ? '#4CAF50' : pctMember >= 30 ? '#FFC107' : '#FF5722';
          ctx.fillStyle = barColor;
          ctx.beginPath();
          ctx.roundRect(barX, currentY + 40, barW * pctMember / 100, 22, 6);
          ctx.fill();
          
          ctx.fillStyle = '#FFF';
          ctx.font = 'bold 14px Arial';
          ctx.fillText(`${pctMember}%`, barX + barW / 2, currentY + 56);
          
          // Accettati
          ctx.fillStyle = '#4CAF50';
          ctx.font = 'bold 34px Arial';
          ctx.fillText(member.v2.toString(), W - 80, currentY + 55);
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.font = '12px Arial';
          ctx.fillText(labels.c2, W - 80, currentY + 75);
          
          ctx.textAlign = 'left';
          currentY += 135;
        });
      } else {
        // Altri: Riga compatta, pari merito insieme
        const namesText = members.map(m => m.name.toUpperCase()).join(' • ');
        ctx.font = '20px Arial';
        const lines = wrapText(ctx, namesText, W - 400, '20px Arial');
        const blockHeight = Math.max(55, 30 + lines.length * 26);
        
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.beginPath();
        ctx.roundRect(50, currentY, W - 100, blockHeight, 10);
        ctx.fill();
        
        // Position
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`${position}°`, 70, currentY + 35);
        
        // Names
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = '20px Arial';
        lines.forEach((line, i) => {
          ctx.fillText(line, 120, currentY + 32 + i * 26);
        });
        
        // Stats (primo del gruppo come riferimento)
        const first = members[0];
        const pctFirst = first.v1 > 0 ? Math.round(first.v2 / first.v1 * 100) : 0;
        
        ctx.textAlign = 'center';
        ctx.fillStyle = colors.p;
        ctx.font = 'bold 24px Arial';
        ctx.fillText(first.v1.toString(), W - 250, currentY + 35);
        
        // Mini bar
        const barX = W - 200;
        const barW = 80;
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.roundRect(barX, currentY + 20, barW, 16, 4);
        ctx.fill();
        
        const barColor = pctFirst >= 60 ? '#4CAF50' : pctFirst >= 30 ? '#FFC107' : '#FF5722';
        ctx.fillStyle = barColor;
        ctx.beginPath();
        ctx.roundRect(barX, currentY + 20, barW * pctFirst / 100, 16, 4);
        ctx.fill();
        
        ctx.fillStyle = barColor;
        ctx.font = '14px Arial';
        ctx.fillText(`${pctFirst}%`, barX + barW / 2, currentY + 33);
        
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(first.v2.toString(), W - 70, currentY + 35);
        
        ctx.textAlign = 'left';
        currentY += blockHeight + 10;
      }
      
      position++;
    });
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(50, H - 60, W - 100, 2);
    
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '18px Arial';
    ctx.fillText(`📊 ${data.length} ${isK ? 'K Manager' : 'Networker'} • ${totIns} contratti`, 55, H - 30);
    ctx.textAlign = 'right';
    ctx.fillText('LEADER RANKING • TEAM TIESI', W - 55, H - 30);
    ctx.textAlign = 'left';
    
    // Bottom bar
    const fg = ctx.createLinearGradient(0, 0, W, 0);
    fg.addColorStop(0, 'transparent');
    fg.addColorStop(0.2, colors.p);
    fg.addColorStop(0.8, colors.s);
    fg.addColorStop(1, 'transparent');
    ctx.fillStyle = fg;
    ctx.fillRect(40, H - 15, W - 80, 5);
    
    return canvas.toDataURL('image/png');
  };

  // Utility: wrap text
  const wrapText = (ctx, text, maxWidth, font) => {
    ctx.font = font;
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const generatePNG = () => isExclusive() ? generatePNG_Exclusive() : generatePNG_Impact();

  const handleGenerate = () => {
    const img = generatePNG();
    if (img) { setPreviewImage(img); setShowPreview(true); }
  };

  const download = () => {
    if (previewImage) {
      const a = document.createElement('a');
      a.download = `classifica_${selectedRanking}_${eventDate.replace(/\s/g, '_').replace(/\./g, '')}.png`;
      a.href = previewImage;
      a.click();
    }
  };

  const handleSendToBot = async () => {
    setSendStatus('Invio...');
    const img = previewImage || generatePNG();
    if (!img) { setSendStatus('Errore'); return; }
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          source: 'webapp', ranking_type: selectedRanking, csv_type: csvType,
          event_name: eventName, event_date: eventDate, exclude_k: excludeK,
          timestamp: new Date().toISOString(), image_base64: img,
          top10: getData().slice(0, 10).map(([name, s], i) => ({ pos: i + 1, name, v1: s.v1, v2: s.v2, pct: Math.round(s.v2 / s.v1 * 100) || 0 })),
          totals: { v1: getClassificaTotal(), v2: getData().reduce((sum, [,s]) => sum + s.v2, 0) },
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

  const labels = getLabels();
  const colors = getColors();

  // LOGIN
  if (!user) return (
    <>
      <Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
      <div style={S.loginWrap}>
        <div style={S.loginCard}>
          <div style={S.logo}><span style={{ color: '#7C4DFF', fontWeight: 800 }}>LEADER</span> <span style={{ fontWeight: 300 }}>RANKING</span></div>
          <h1 style={{ fontSize: 22, margin: '10px 0 5px', color: '#fff' }}>Team Tiesi</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 25, fontSize: 13 }}>Accedi per gestire le classifiche</p>
          <input style={S.input} placeholder="Username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} />
          <input style={S.input} type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} onKeyPress={e => e.key === 'Enter' && handleLogin()} />
          {loginError && <p style={{ color: '#f44', fontSize: 13 }}>{loginError}</p>}
          <button style={S.btn} onClick={handleLogin}>ACCEDI</button>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 20 }}>v7.2</p>
        </div>
      </div>
    </>
  );

  // PREVIEW
  if (showPreview && previewImage) return (
    <>
      <Head><title>Anteprima</title></Head>
      <div style={S.previewWrap}>
        <div style={S.previewModal}>
          <h2 style={{ color: '#fff', marginBottom: 5 }}>📸 Anteprima 1080x1080</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 15 }}>✅ {getData().length} partecipanti • {getClassificaTotal()} contratti</p>
          <div style={S.previewImg}><img src={previewImage} style={{ maxWidth: '100%', maxHeight: '60vh' }} /></div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 15, flexWrap: 'wrap' }}>
            <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setShowPreview(false)}>Chiudi</button>
            <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg,#4CAF50,#81C784)' }} onClick={download}>📥 Scarica</button>
            <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg,#00BFA5,#1DE9B6)' }} onClick={handleSendToBot}>🤖 Invia a Bot</button>
          </div>
          {sendStatus && <p style={{ textAlign: 'center', marginTop: 10, color: sendStatus.includes('✅') ? '#4CAF50' : sendStatus.includes('❌') ? '#f44' : '#FFC107' }}>{sendStatus}</p>}
        </div>
      </div>
    </>
  );

  // DASHBOARD
  return (
    <>
      <Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
      <div style={S.dash}>
        <header style={S.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={S.menuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
            <span style={{ fontWeight: 800, color: '#7C4DFF' }}>LEADER RANKING</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>v7.2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={S.badge}>{user.role.toUpperCase()}</span>
            <button style={{ ...S.btn, padding: '6px 12px', fontSize: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => { setUser(null); setCsvData(null); setRankings(null); }}>Esci</button>
          </div>
        </header>

        <main style={{ display: 'flex' }}>
          <aside style={{ ...S.sidebar, ...(mobileMenuOpen ? { transform: 'translateX(0)' } : {}) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>📊 CLASSIFICHE</span>
              <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }} onClick={() => setMobileMenuOpen(false)}>✕</button>
            </div>

            {rankings ? (
              <>
                <p style={S.catLabel}>IVD</p>
                <button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_inseriti'); setMobileMenuOpen(false); }}>🟠 {labels.c1} ({rankings.ivd_inseriti.length})</button>
                <button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_accettati'); setMobileMenuOpen(false); }}>🟢 {labels.c2} ({rankings.ivd_accettati.length})</button>
                <p style={S.catLabel}>SDP</p>
                <button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_inseriti'); setMobileMenuOpen(false); }}>🔵 {labels.c1} ({rankings.sdp_inseriti.length})</button>
                <button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_accettati'); setMobileMenuOpen(false); }}>🟢 {labels.c2} ({rankings.sdp_accettati.length})</button>
                <p style={S.catLabel}>MANAGER</p>
                <button style={{ ...S.menuItem, ...(selectedRanking === 'nw' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('nw'); setMobileMenuOpen(false); }}>🟣 Networker ({rankings.nw.length})</button>
                <button style={{ ...S.menuItem, ...(selectedRanking === 'k' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('k'); setMobileMenuOpen(false); }}>👑 K Manager ({rankings.k.length})</button>
              </>
            ) : <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Carica CSV</p>}

            <div style={S.divider} />

            {(user.role === 'admin' || user.role === 'assistente') && (
              <>
                <p style={S.catLabel}>⚙️ FILTRI</p>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}>
                  <input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={{ accentColor: '#7C4DFF' }} /> Escludi K
                </label>

                <div style={S.divider} />

                <p style={S.catLabel}>📅 PERIODO</p>
                <button style={{ ...S.periodBtn, ...(!selectedMonth ? { background: 'rgba(124,77,255,0.2)', color: '#7C4DFF' } : {}) }} onClick={handleShowAll}>📋 Tutti ({csvData?.length || 0})</button>
                {availableMonths.length > 0 && (
                  <select style={S.select} value={selectedMonth} onChange={e => handleMonthChange(e.target.value)}>
                    <option value="">-- Mese --</option>
                    {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                )}
                {weeks.length > 0 && (
                  <select style={S.select} value={selectedWeek?.num || ''} onChange={e => handleWeekChange(e.target.value)}>
                    <option value="">-- Settimana --</option>
                    {weeks.map(w => <option key={w.num} value={w.num}>{w.label}</option>)}
                  </select>
                )}

                <div style={S.divider} />

                <p style={S.catLabel}>🏷️ ETICHETTE</p>
                <select style={S.select} value={eventName} onChange={e => setEventName(e.target.value)}>
                  {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input style={S.inputSm} value={eventDate} onChange={e => setEventDate(e.target.value)} placeholder="Periodo" />
              </>
            )}
          </aside>

          {mobileMenuOpen && <div style={S.overlay} onClick={() => setMobileMenuOpen(false)} />}

          <section style={S.content}>
            {(user.role === 'admin' || user.role === 'assistente') && (
              <div style={{ ...S.uploadBox, ...(isDragging ? { borderColor: '#7C4DFF', background: 'rgba(124,77,255,0.1)' } : {}) }}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
                onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) processFile(f); }}>
                <input type="file" accept=".csv" id="csv" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processFile(e.target.files[0]); }} />
                <label htmlFor="csv" style={{ cursor: 'pointer', padding: '10px 20px', background: 'rgba(124,77,255,0.1)', borderRadius: 8, color: '#7C4DFF', fontWeight: 600 }}>
                  {filteredData ? `✅ ${filteredData.length} righe caricate` : '📤 Carica CSV'}
                </label>
              </div>
            )}

            {rankings ? (
              <div style={S.rankCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}>
                  <div>
                    <h2 style={{ color: colors.p, fontSize: 18, margin: 0 }}>
                      {selectedRanking === 'ivd_inseriti' && `🟠 IVD ${labels.c1}`}
                      {selectedRanking === 'ivd_accettati' && `🟢 IVD ${labels.c2}`}
                      {selectedRanking === 'sdp_inseriti' && `🔵 SDP ${labels.c1}`}
                      {selectedRanking === 'sdp_accettati' && `🟢 SDP ${labels.c2}`}
                      {selectedRanking === 'nw' && '🟣 Networker'}
                      {selectedRanking === 'k' && '👑 K Manager'}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>{getData().length} partecipanti • {getClassificaTotal()} contratti • {eventDate}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 15 }}>
                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: colors.p }}>{getClassificaTotal()}</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{labels.c1}</div></div>
                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#4CAF50' }}>{getData().reduce((s,[,x])=>s+x.v2,0)}</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{labels.c2}</div></div>
                  </div>
                </div>

                <div style={{ overflowX: 'auto', maxHeight: '50vh', overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 300 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <th style={S.th}>#</th>
                        <th style={{ ...S.th, textAlign: 'left' }}>Nome</th>
                        <th style={S.th}>{labels.c1}</th>
                        {isExclusive() && <><th style={S.th}>%</th><th style={S.th}>{labels.c2}</th></>}
                      </tr>
                    </thead>
                    <tbody>
                      {getData().map(([name, s], i) => {
                        const p = s.v1 > 0 ? Math.round(s.v2 / s.v1 * 100) : 0;
                        return (
                          <tr key={name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', ...(i < 3 ? { background: `${colors.p}10` } : {}) }}>
                            <td style={{ padding: 10, textAlign: 'center' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td>
                            <td style={{ padding: 10, fontWeight: i < 3 ? 700 : 500, fontSize: 13 }}>{name}</td>
                            <td style={{ padding: 10, textAlign: 'center', color: colors.p, fontWeight: 700 }}>{s.v1}</td>
                            {isExclusive() && <><td style={{ padding: 10, textAlign: 'center', color: p >= 50 ? '#4CAF50' : '#FFC107', fontSize: 12 }}>{p}%</td><td style={{ padding: 10, textAlign: 'center', color: '#4CAF50', fontWeight: 700 }}>{s.v2}</td></>}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {(user.role === 'admin' || user.role === 'assistente') && (
                  <div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button style={{ ...S.btn, flex: 1, minWidth: 120, background: `linear-gradient(135deg,${colors.p},${colors.s})` }} onClick={handleGenerate}>📸 PNG 1080x1080</button>
                    <button style={{ ...S.btn, flex: 1, minWidth: 120, background: 'linear-gradient(135deg,#00BFA5,#1DE9B6)' }} onClick={handleSendToBot}>🤖 Invia a Bot</button>
                    {sendStatus && <span style={{ fontSize: 13, color: sendStatus.includes('✅') ? '#4CAF50' : sendStatus.includes('❌') ? '#f44' : '#FFC107' }}>{sendStatus}</span>}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ fontSize: 50 }}>📊</div>
                <p>Carica un CSV per iniziare</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

const S = {
  loginWrap: { minHeight: '100vh', background: 'linear-gradient(135deg,#1a1a2e,#16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 15, fontFamily: '-apple-system,sans-serif' },
  loginCard: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '40px 25px', width: '100%', maxWidth: 360, textAlign: 'center', color: '#fff' },
  logo: { fontSize: 26, marginBottom: 10 },
  input: { width: '100%', padding: '14px 16px', fontSize: 15, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', marginBottom: 12, outline: 'none', boxSizing: 'border-box' },
  btn: { padding: '14px 24px', fontSize: 14, fontWeight: 700, border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#7C4DFF,#536DFE)', color: '#fff', cursor: 'pointer', width: '100%' },
  previewWrap: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 15 },
  previewModal: { background: '#1a1a2e', borderRadius: 16, padding: 20, width: '100%', maxWidth: 600, maxHeight: '95vh', display: 'flex', flexDirection: 'column' },
  previewImg: { background: '#0a0a15', borderRadius: 10, padding: 10, overflow: 'auto', flex: 1 },
  dash: { minHeight: '100vh', background: '#0f0f1a', color: '#fff', fontFamily: '-apple-system,sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 100 },
  menuBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  badge: { fontSize: 10, padding: '4px 10px', background: 'rgba(124,77,255,0.2)', color: '#7C4DFF', borderRadius: 15, fontWeight: 700 },
  sidebar: { position: 'fixed', top: 0, left: 0, width: 280, height: '100vh', background: '#12121f', padding: '60px 15px 20px', overflowY: 'auto', zIndex: 200, transform: 'translateX(-100%)', transition: 'transform 0.3s', boxSizing: 'border-box' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 150 },
  catLabel: { fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, marginTop: 15, marginBottom: 6, textTransform: 'uppercase' },
  menuItem: { display: 'block', width: '100%', padding: '10px 14px', fontSize: 13, border: 'none', borderRadius: 8, background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', textAlign: 'left', marginBottom: 2 },
  menuActive: { background: 'rgba(124,77,255,0.2)', color: '#7C4DFF' },
  divider: { height: 1, background: 'rgba(255,255,255,0.08)', margin: '15px 0' },
  periodBtn: { display: 'block', width: '100%', padding: '8px 12px', fontSize: 12, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginBottom: 8, textAlign: 'left' },
  select: { width: '100%', padding: '10px', fontSize: 13, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, background: 'rgba(255,255,255,0.05)', color: '#fff', marginBottom: 8 },
  inputSm: { width: '100%', padding: '8px 10px', fontSize: 12, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, background: 'rgba(255,255,255,0.05)', color: '#fff', marginBottom: 8, boxSizing: 'border-box' },
  content: { flex: 1, padding: 15, minHeight: 'calc(100vh - 60px)' },
  uploadBox: { border: '2px dashed rgba(124,77,255,0.3)', borderRadius: 10, padding: '20px', textAlign: 'center', marginBottom: 15, transition: 'all 0.3s' },
  rankCard: { background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 15, border: '1px solid rgba(255,255,255,0.05)' },
  th: { padding: 10, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', textAlign: 'center' },
};
