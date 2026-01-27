import React, { useState } from 'react';
import Head from 'next/head';

const USERS = {
  admin: { password: 'admin2026', role: 'admin', name: 'Admin' },
  assistente: { password: 'assist2026', role: 'assistente', name: 'Assistente' },
  thomas: { password: 'thomas2026', role: 'k', name: 'Thomas Magri' },
  marcello: { password: 'marcello2026', role: 'k', name: 'Marcello Ventura' },
  patrizio: { password: 'patrizio2026', role: 'k', name: 'Patrizio Tiesi' },
  andrea: { password: 'andrea2026', role: 'k', name: 'Andrea Tiesi' },
  leonardo: { password: 'leonardo2026', role: 'k', name: 'Leonardo Colletta' },
};

const K_NAMES = ['TIESI PATRIZIO', 'MAGRI THOMAS', 'COLLETTA LEONARDO', 'VENTURA MARCELLO', 'TIESI ANDREA', 'PATRIZIO TIESI', 'THOMAS MAGRI', 'LEONARDO COLLETTA', 'MARCELLO VENTURA', 'ANDREA TIESI'];
const EVENT_TYPES = ['LUCE AMICA', 'FOTOVOLTAICO', 'INSERITI SEMINARIO', 'ATTIVATI', 'FORMAZIONE', 'ENERGIA', 'GAS'];
const WEBHOOK_URL = 'https://hook.eu1.make.com/sm6lrhpoet204lv6xkwj10xiypwnn4qm';

const RANKING_CONFIG = {
  ivd_inseriti: { label: 'IVD INSERITI', category: 'ivd', color: '#2AAA8A', emoji: '🟠', design: 'impact' },
  ivd_accettati: { label: 'IVD ACCETTATI', category: 'ivd', color: '#4CAF50', emoji: '🟢', design: 'impact' },
  sdp_inseriti: { label: 'SDP INSERITI', category: 'sdp', color: '#2AAA8A', emoji: '🔵', design: 'impact' },
  sdp_accettati: { label: 'SDP ACCETTATI', category: 'sdp', color: '#4CAF50', emoji: '🟢', design: 'impact' },
  nw: { label: 'NETWORKER', category: 'manager', color: '#2AAA8A', emoji: '⭐', design: 'exclusive' },
  k: { label: 'K MANAGER', category: 'manager', color: '#FFD700', emoji: '👑', design: 'exclusive' },
  eb: { label: 'ENERGY BROKER', category: 'broker', color: '#2AAA8A', emoji: '🔷', design: 'exclusive' },
  frm: { label: 'FORMATORI', category: 'formatore', color: '#2AAA8A', emoji: '🎓', design: 'exclusive' },
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
  const [periodType, setPeriodType] = useState('progressiva');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'classifiche', 'report'
  const [animatedStats, setAnimatedStats] = useState({ ins: 0, acc: 0, part: 0, conv: 0 });
  const [darkMode, setDarkMode] = useState(false); // Toggle dark/light mode
  
  // REPORT AGGREGATO - Multi CSV upload
  const [reportCSVs, setReportCSVs] = useState({ ivd: null, energy: null, fv: null, consultings: null });
  const [reportData, setReportData] = useState(null);
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
  const getConfig = () => RANKING_CONFIG[selectedRanking] || { label: '', category: '', color: '#2AAA8A', emoji: '📊', design: 'impact' };
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

  // Dashboard helper functions
  const getDashboardStats = () => {
    if (!filteredData || !rankings) return { ins: 0, acc: 0, part: 0, conv: 0, top3: [], top10: [], weeklyData: [], monthlyData: [], maxV1: 1, isMonthly: false };
    
    // USA LA CLASSIFICA SELEZIONATA invece di sempre IVD
    const currentData = getData(); // Usa la stessa funzione delle classifiche
    
    const totIns = currentData.reduce((s, [,x]) => s + x.v1, 0);
    const totAcc = currentData.reduce((s, [,x]) => s + x.v2, 0);
    const conv = totIns > 0 ? Math.round(totAcc / totIns * 100) : 0;
    
    // TOP 3 e TOP 10
    const top3 = currentData.slice(0, 3).map(([name, s]) => ({ name, v1: s.v1, v2: s.v2 }));
    const top10 = currentData.slice(0, 10).map(([name, s]) => ({ name, v1: s.v1, v2: s.v2 }));
    const maxV1 = top10.length > 0 ? Math.max(...top10.map(t => t.v1)) : 1;
    
    // Heatmap - analizza date inserimento
    const weeklyData = [0, 0, 0, 0, 0, 0, 0]; // Lun-Dom
    const monthlyData = Array(31).fill(0); // Giorni 1-31
    let minDate = null, maxDate = null;
    
    filteredData.forEach(row => {
      const dateStr = row['Inserimento'] || row['Data'] || row['Data Inserimento'] || '';
      if (dateStr) {
        try {
          const d = new Date(dateStr.replace(' ', 'T'));
          if (!isNaN(d.getTime())) {
            // Weekly
            const day = d.getDay();
            const idx = day === 0 ? 6 : day - 1;
            weeklyData[idx]++;
            
            // Monthly (giorno del mese 1-31)
            const dayOfMonth = d.getDate();
            if (dayOfMonth >= 1 && dayOfMonth <= 31) {
              monthlyData[dayOfMonth - 1]++;
            }
            
            // Track date range
            if (!minDate || d < minDate) minDate = d;
            if (!maxDate || d > maxDate) maxDate = d;
          }
        } catch (e) {}
      }
    });
    
    // Determina se mostrare vista mensile (più di 7 giorni di range)
    const dayRange = minDate && maxDate ? Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) : 0;
    const isMonthly = dayRange > 7 || selectedMonth || periodType === 'progressiva' || periodType === 'finale';
    
    // Info mese per calendario
    let monthInfo = null;
    if (isMonthly && minDate) {
      const year = minDate.getFullYear();
      const month = minDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay(); // 0=Dom
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      monthInfo = { year, month, firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth };
    }
    
    return { ins: totIns, acc: totAcc, part: currentData.length, conv, top3, top10, maxV1, weeklyData, monthlyData, isMonthly, monthInfo };
  };

  // Calcola distribuzioni per grafici torta
  const getPieDistributions = () => {
    if (!filteredData) return { k: [], nw: [], sdp: [], stati: [] };
    
    const kCount = {}, nwCount = {}, sdpCount = {}, statiCount = {};
    
    filteredData.forEach(row => {
      // K Manager
      const k = row['Nome Primo K'] || '';
      if (k && k !== 'Nome Primo K') kCount[k] = (kCount[k] || 0) + 1;
      
      // Networker
      const nw = row['Nome Primo Networker'] || '';
      if (nw && nw !== 'Nome Primo Networker') nwCount[nw] = (nwCount[nw] || 0) + 1;
      
      // SDP (prova FV poi LA)
      const sdp = row['Nome Primo SDP FV'] || row['Nome Primo SDP Fv'] || row['Nome Primo SDP LA'] || row['Nome Primo SDP La'] || '';
      if (sdp && !sdp.includes('Nome Primo')) sdpCount[sdp] = (sdpCount[sdp] || 0) + 1;
      
      // Stati
      const stato = row['Stato'] || row['Stato NWG Spa'] || row['Presente SI'] || '';
      if (stato && stato !== 'Stato' && stato !== 'Stato NWG Spa' && stato !== 'Presente SI') {
        const statoNorm = stato.toLowerCase().includes('accett') ? 'Accettato' : 
                          stato.toLowerCase().includes('sospes') ? 'Sospeso' : 
                          stato === 'Si' ? 'Presente' : 
                          stato === 'No' ? 'Assente' : stato;
        statiCount[statoNorm] = (statiCount[statoNorm] || 0) + 1;
      }
    });
    
    // Converti in array ordinati
    const toArray = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]);
    
    return {
      k: toArray(kCount),
      nw: toArray(nwCount),
      sdp: toArray(sdpCount).slice(0, 10), // TOP 10 SDP
      stati: toArray(statiCount)
    };
  };

  // Colori per torte e stati - DIFFERENZIATI
  const PIE_COLORS_K = ['#FFD700', '#2AAA8A', '#2196F3', '#9C27B0', '#FF5722']; // K Manager - colori diversi!
  const PIE_COLORS_NW = ['#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1']; // Blu per Networker
  const PIE_COLORS_STATI = ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9']; // Verde per Stati
  const PIE_COLORS = ['#FFD700', '#2AAA8A', '#2196F3', '#9C27B0', '#FF5722', '#E91E63', '#607D8B', '#795548', '#4CAF50', '#666666'];
  const STATO_COLORS = { 
    'Accettato': '#4CAF50', 'Sospeso': '#FFD700', 'In sospeso': '#FFD700', 'Presente': '#4CAF50', 'Assente': '#E53935', 
    'In lavorazione': '#FFD700', 'Installato': '#4CAF50', 'Impianto installato': '#4CAF50', 'Recesso': '#E53935', 
    'Annullato': '#E53935', 'In fornitura': '#4CAF50', 'Attivo': '#4CAF50', 'Cessato': '#E53935', 'Negativo': '#E53935',
    'Non perfezionato': '#E53935', 'Respinto': '#E53935', 'Da attivare': '#FFD700', 'Risoluzione': '#E53935'
  };
  
  // Colori heatmap - FREDDO = ROSSO
  const HEATMAP_COLORS = {
    hot: '#4CAF50',      // >70% 🟢 Verde
    warm: '#FFD700',     // 40-70% 🟡 Giallo
    cool: '#E53935',     // 10-40% 🔴 Rosso (era verde)
    cold: '#E53935',     // <10% 🔴 Rosso
    zero: '#F5F5F5' // 0 ⬜
  };
  
  const getHeatmapColor = (val, max) => {
    if (val === 0) return HEATMAP_COLORS.zero;
    const pct = val / max;
    if (pct > 0.7) return HEATMAP_COLORS.hot;
    if (pct > 0.4) return HEATMAP_COLORS.warm;
    if (pct > 0.1) return HEATMAP_COLORS.cool;
    return HEATMAP_COLORS.cold;
  };

  // === MAPPATURA STATI (Aggiornata secondo documento) ===
  const STATO_MAP_FV = {
    // 🟢 POSITIVO (contratti definitivamente chiusi/installati)
    'Impianto installato': 'positivo', 
    'AAC contratto accettato': 'positivo', // AAC senza "attesa sblocco" = OK
    'Impianto pronto per spedizione': 'positivo', 'Impianto pronto spedizione': 'positivo',
    'Cantiere aperto': 'positivo', 
    'Impianto in consegna': 'positivo',
    'Rep.Amm – Contratto appena inserito': 'positivo', 'Rep.Amm appena inserito': 'positivo', 'Appena inserito': 'positivo', 'Rep.Amm - Contratto appena inserito': 'positivo',
    'Ok finanziario ma non tecnico': 'positivo', 'Ok finanziario': 'positivo', 'Ok fin ma non tecnico': 'positivo',
    // 🟡 IN LAVORAZIONE (recuperabili, da sbloccare)
    'AAC – Contratto accettato in attesa sblocco': 'lavorazione', 'AAC - Contratto accettato in attesa sblocco': 'lavorazione', 'attesa sblocco': 'lavorazione', // SPOSTATO QUI!
    'Rep.Fin – In lavorazione': 'lavorazione', 'Rep.Fin in lavorazione': 'lavorazione', 'Rep.Fin - In lavorazione': 'lavorazione', 'In lavorazione': 'lavorazione',
    'Rep.Amm – Sospeso': 'lavorazione', 'Rep.Amm sospeso': 'lavorazione', 'Rep.Amm - Sospeso': 'lavorazione', 'Sospeso': 'lavorazione',
    // 🔴 NEGATIVO (persi)
    'Recesso': 'negativo', 
    'Rep.Fin – Negativo': 'negativo', 'Rep.Fin negativo': 'negativo', 'Rep.Fin - Negativo': 'negativo', 'Negativo': 'negativo',
    'Annullato': 'negativo', 
    'Rep.Amm – Non perfezionato': 'negativo', 'Rep.Amm non perfezionato': 'negativo', 'Rep.Amm - Non perfezionato': 'negativo', 'Non perfezionato': 'negativo',
    'No': 'negativo', 
    'Respinto': 'negativo'
  };
  
  const STATO_MAP_LA_SPA = {
    // 🟢 POSITIVO
    'Accettato': 'positivo',
    // 🟡 LAVORABILE
    'In sospeso': 'lavorabile', 'Sospeso': 'lavorabile', 'In Sospeso': 'lavorabile',
    // 🔴 MENO (negativi)
    'Risoluzione': 'meno', 'Non perfezionato': 'meno', 'Recesso': 'meno', 'Respinto': 'meno', 'Annullato': 'meno'
  };
  
  const STATO_MAP_LA_ENERGIA = {
    // 🟢 POSITIVO
    'Attivo': 'positivo', 'In fornitura': 'positivo', 'ATTIVO': 'positivo',
    // 🟡 LAVORABILE
    'Da attivare': 'lavorabile', 'In attivazione': 'lavorabile', 'DA ATTIVARE': 'lavorabile',
    // 🔴 MENO
    'Cessato': 'meno', 'Disdetta': 'meno', 'CESSATO': 'meno'
  };
  
  const STATO_MAP_IVD = {
    // 🟢 ATTIVO
    'Attivo': 'attivo', 'In regola': 'attivo', 'Operativo': 'attivo',
    // 🟡 LAVORABILE
    'In attesa': 'lavorabile', 'Da completare': 'lavorabile', 'In formazione': 'lavorabile',
    // 🔴 PERSO
    'Cessato': 'perso', 'Dimesso': 'perso', 'Annullato': 'perso', 'Recesso': 'perso'
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // 💰 LISTINI PREZZI E PUNTI FV - Per calcolo fatturato
  // ═══════════════════════════════════════════════════════════════════════════════
  const LISTINO_FV = {
    // ELITE 35 - Con Batteria Full Optional (Anticipo Zero)
    'Elite 35_02+05 Full Optional': { prezzo: 11480, punti: 160, kw: 2, kwh: 5 },
    'Elite 35_03+05 Full Optional': { prezzo: 12970, punti: 200, kw: 3, kwh: 5 },
    'Elite 35_03+10 Full Optional': { prezzo: 15280, punti: 240, kw: 3, kwh: 10 },
    'Elite 35_04+05 Full Optional': { prezzo: 14880, punti: 220, kw: 4, kwh: 5 },
    'Elite 35_04+10 Full Optional': { prezzo: 16980, punti: 270, kw: 4, kwh: 10 },
    'Elite 35_05+05 Full Optional': { prezzo: 16480, punti: 260, kw: 5, kwh: 5 },
    'Elite 35_05+10 Full Optional': { prezzo: 18280, punti: 300, kw: 5, kwh: 10 },
    'Elite 35_05+15 Full Optional': { prezzo: 20280, punti: 325, kw: 5, kwh: 15 },
    'Elite 35_06+05 Full Optional': { prezzo: 17980, punti: 290, kw: 6, kwh: 5 },
    'Elite 35_06+10 Full Optional': { prezzo: 18980, punti: 320, kw: 6, kwh: 10 },
    'Elite 35_06+10T Full Optional': { prezzo: 20980, punti: 350, kw: 6, kwh: 10 },
    'Elite 35_06+15 Full Optional': { prezzo: 21780, punti: 360, kw: 6, kwh: 15 },
    'Elite 35_06+15T Full Optional': { prezzo: 22980, punti: 370, kw: 6, kwh: 15 },
    'Elite 35_08+10 Full Optional': { prezzo: 23480, punti: 400, kw: 8, kwh: 10 },
    'Elite 35_08+10T Full Optional': { prezzo: 25280, punti: 410, kw: 8, kwh: 10 },
    'Elite 35_08+15T Full Optional': { prezzo: 26980, punti: 420, kw: 8, kwh: 15 },
    'Elite 35_10+10T Full Optional': { prezzo: 27480, punti: 480, kw: 10, kwh: 10 },
    'Elite 35_10+15T Full Optional': { prezzo: 29480, punti: 500, kw: 10, kwh: 15 },
    'Elite 35_15+15T Full Optional': { prezzo: 38480, punti: 670, kw: 15, kwh: 15 },
    'Elite 35_15+20T Full Optional': { prezzo: 40980, punti: 770, kw: 15, kwh: 20 },
    'Elite 35_20+20T Full Optional': { prezzo: 47980, punti: 840, kw: 20, kwh: 20 },
    'Elite 35_20+25T Full Optional': { prezzo: 50480, punti: 890, kw: 20, kwh: 25 },
    // ELITE 35 - Con Batteria Standard (Anticipo Zero)
    'Elite 35_02+05': { prezzo: 10490, punti: 120, kw: 2, kwh: 5 },
    'Elite 35_03+05': { prezzo: 11980, punti: 160, kw: 3, kwh: 5 },
    'Elite 35_03+10': { prezzo: 14290, punti: 200, kw: 3, kwh: 10 },
    'Elite 35_04+05': { prezzo: 13890, punti: 180, kw: 4, kwh: 5 },
    'Elite 35_04+10': { prezzo: 15990, punti: 230, kw: 4, kwh: 10 },
    'Elite 35_05+05': { prezzo: 15490, punti: 220, kw: 5, kwh: 5 },
    'Elite 35_05+10': { prezzo: 17290, punti: 260, kw: 5, kwh: 10 },
    'Elite 35_05+15': { prezzo: 19290, punti: 285, kw: 5, kwh: 15 },
    'Elite 35_06+05': { prezzo: 16990, punti: 250, kw: 6, kwh: 5 },
    'Elite 35_06+10': { prezzo: 17990, punti: 280, kw: 6, kwh: 10 },
    'Elite 35_06+10T': { prezzo: 19990, punti: 310, kw: 6, kwh: 10 },
    'Elite 35_06+15': { prezzo: 20790, punti: 320, kw: 6, kwh: 15 },
    'Elite 35_06+15T': { prezzo: 21990, punti: 330, kw: 6, kwh: 15 },
    'Elite 35_08+10': { prezzo: 22490, punti: 360, kw: 8, kwh: 10 },
    'Elite 35_08+10T': { prezzo: 24290, punti: 370, kw: 8, kwh: 10 },
    'Elite 35_08+15T': { prezzo: 25990, punti: 380, kw: 8, kwh: 15 },
    'Elite 35_10+10T': { prezzo: 26490, punti: 440, kw: 10, kwh: 10 },
    'Elite 35_10+15T': { prezzo: 28490, punti: 460, kw: 10, kwh: 15 },
    'Elite 35_15+15T': { prezzo: 37490, punti: 630, kw: 15, kwh: 15 },
    'Elite 35_15+20T': { prezzo: 39990, punti: 730, kw: 15, kwh: 20 },
    'Elite 35_20+20T': { prezzo: 46990, punti: 800, kw: 20, kwh: 20 },
    'Elite 35_20+25T': { prezzo: 49490, punti: 850, kw: 20, kwh: 25 },
    // ELITE 35 - Senza Batteria
    'Elite 35_02': { prezzo: 7990, punti: 100, kw: 2, kwh: 0 },
    'Elite 35_03': { prezzo: 8990, punti: 140, kw: 3, kwh: 0 },
    'Elite 35_04': { prezzo: 10390, punti: 170, kw: 4, kwh: 0 },
    'Elite 35_05': { prezzo: 12490, punti: 220, kw: 5, kwh: 0 },
    'Elite 35_06': { prezzo: 13890, punti: 250, kw: 6, kwh: 0 },
    'Elite 35_08': { prezzo: 18490, punti: 350, kw: 8, kwh: 0 },
    'Elite 35_10': { prezzo: 22490, punti: 430, kw: 10, kwh: 0 },
    'Elite 35_12': { prezzo: 26990, punti: 470, kw: 12, kwh: 0 },
    'Elite 35_15': { prezzo: 30990, punti: 520, kw: 15, kwh: 0 },
    'Elite 35_20': { prezzo: 37990, punti: 600, kw: 20, kwh: 0 },
    'Elite 35_30': { prezzo: 50990, punti: 700, kw: 30, kwh: 0 },
    'Elite 35_40': { prezzo: 59990, punti: 800, kw: 40, kwh: 0 },
    'Elite 35_50': { prezzo: 72990, punti: 900, kw: 50, kwh: 0 },
    'Elite 35_60': { prezzo: 82990, punti: 1000, kw: 60, kwh: 0 },
    'Elite 35_70': { prezzo: 92990, punti: 1100, kw: 70, kwh: 0 },
    'Elite 35_80': { prezzo: 99990, punti: 1200, kw: 80, kwh: 0 },
    'Elite 35_90': { prezzo: 109990, punti: 1300, kw: 90, kwh: 0 },
    'Elite 35_100': { prezzo: 118990, punti: 1500, kw: 100, kwh: 0 },
    // EVOLUTION 30 - Con Batteria
    'Evolution 30_02+05': { prezzo: 9490, punti: 80, kw: 2, kwh: 5 },
    'Evolution 30_03+05': { prezzo: 10690, punti: 100, kw: 3, kwh: 5 },
    'Evolution 30_03+10': { prezzo: 12980, punti: 160, kw: 3, kwh: 10 },
    'Evolution 30_04+05': { prezzo: 12380, punti: 150, kw: 4, kwh: 5 },
    'Evolution 30_04+10': { prezzo: 14490, punti: 180, kw: 4, kwh: 10 },
    'Evolution 30_05+05': { prezzo: 13990, punti: 170, kw: 5, kwh: 5 },
    'Evolution 30_05+10': { prezzo: 15790, punti: 190, kw: 5, kwh: 10 },
    'Evolution 30_05+15': { prezzo: 17590, punti: 205, kw: 5, kwh: 15 },
    'Evolution 30_06+05': { prezzo: 15290, punti: 180, kw: 6, kwh: 5 },
    'Evolution 30_06+10': { prezzo: 16580, punti: 200, kw: 6, kwh: 10 },
    'Evolution 30_06+10T': { prezzo: 17990, punti: 210, kw: 6, kwh: 10 },
    'Evolution 30_06+15': { prezzo: 18990, punti: 215, kw: 6, kwh: 15 },
    'Evolution 30_06+15T': { prezzo: 20290, punti: 225, kw: 6, kwh: 15 },
    'Evolution 30_08+10': { prezzo: 20490, punti: 230, kw: 8, kwh: 10 },
    'Evolution 30_08+10T': { prezzo: 21490, punti: 240, kw: 8, kwh: 10 },
    'Evolution 30_08+15T': { prezzo: 23490, punti: 260, kw: 8, kwh: 15 },
    'Evolution 30_10+10T': { prezzo: 24490, punti: 270, kw: 10, kwh: 10 },
    'Evolution 30_10+15T': { prezzo: 26490, punti: 290, kw: 10, kwh: 15 },
    'Evolution 30_15+15T': { prezzo: 34990, punti: 340, kw: 15, kwh: 15 },
    'Evolution 30_15+20T': { prezzo: 37490, punti: 390, kw: 15, kwh: 20 },
    'Evolution 30_20+20T': { prezzo: 43990, punti: 430, kw: 20, kwh: 20 },
    'Evolution 30_20+25T': { prezzo: 46490, punti: 480, kw: 20, kwh: 25 },
    // EXTENDED - Con Batteria
    'Extended_02+05': { prezzo: 12319, punti: 140, kw: 2, kwh: 5 },
    'Extended_03+05': { prezzo: 13938, punti: 180, kw: 3, kwh: 5 },
    'Extended_03+10': { prezzo: 16248, punti: 220, kw: 3, kwh: 10 },
    'Extended_04+05': { prezzo: 15848, punti: 200, kw: 4, kwh: 5 },
    'Extended_04+10': { prezzo: 17948, punti: 250, kw: 4, kwh: 10 },
    'Extended_05+05': { prezzo: 17448, punti: 240, kw: 5, kwh: 5 },
    'Extended_05+10': { prezzo: 19248, punti: 280, kw: 5, kwh: 10 },
    'Extended_05+15': { prezzo: 21248, punti: 305, kw: 5, kwh: 15 },
    'Extended_06+05': { prezzo: 18948, punti: 270, kw: 6, kwh: 5 },
    'Extended_06+10': { prezzo: 19948, punti: 300, kw: 6, kwh: 10 },
    'Extended_06+15': { prezzo: 22748, punti: 340, kw: 6, kwh: 15 }
  };

  // LUCE AMICA - Fasce consumo per stima fatturato + PUNTI!
  const FASCE_CONSUMO_LA = {
    '0 a 1000': { kwhMedi: 500, prezzoKwh: 0.26 },
    '1001 a 1800': { kwhMedi: 1400, prezzoKwh: 0.26 },
    '1801 a 2500': { kwhMedi: 2150, prezzoKwh: 0.26 },
    '2501 a 3500': { kwhMedi: 3000, prezzoKwh: 0.26 },
    '3501 a 5000': { kwhMedi: 4250, prezzoKwh: 0.26 },
    '5001 a 15000': { kwhMedi: 10000, prezzoKwh: 0.26 },
    'oltre 15001': { kwhMedi: 18000, prezzoKwh: 0.26 }
  };

  // Funzione MIGLIORATA per matchare prodotto CSV con listino FV
  const matchProdottoFV = (prodotto) => {
    if (!prodotto) return null;
    const p = prodotto.toLowerCase().trim();
    
    // Estrai configurazione kW+kWh dal prodotto (es. "06+10", "6+10", "35_06+10")
    const configMatch = p.match(/(\d+)[_\s]*\+[_\s]*(\d+)/);
    // Estrai solo kW per impianti senza batteria (es. "35_06", "Elite 35_06")
    const soloKwMatch = p.match(/35[_\s]+(\d+)(?![+\d])/);
    
    // Determina il tipo di prodotto
    const isElite = p.includes('elite');
    const isEvolution = p.includes('evolution');
    const isExtended = p.includes('extended');
    const isFullOptional = p.includes('full optional') || p.includes('full_optional') || p.includes('fo');
    const isTrifase = p.includes('trifase') || p.includes('trif') || p.endsWith('t');
    
    if (configMatch) {
      // Impianto CON batteria
      let kw = parseInt(configMatch[1]);
      let kwh = parseInt(configMatch[2]);
      
      // Normalizza kW se è tipo "35_06" → kW = 6
      if (kw === 35) kw = parseInt(configMatch[1]);
      
      // Cerca nel listino
      for (const [key, value] of Object.entries(LISTINO_FV)) {
        const keyLower = key.toLowerCase();
        const keyConfig = keyLower.match(/(\d+)\+(\d+)/);
        
        if (keyConfig) {
          const keyKw = parseInt(keyConfig[1]);
          const keyKwh = parseInt(keyConfig[2]);
          
          if (kw === keyKw && kwh === keyKwh) {
            // Match configurazione - verifica tipo
            if (isElite && keyLower.includes('elite')) {
              if (isFullOptional && keyLower.includes('full optional')) return value;
              if (!isFullOptional && !keyLower.includes('full optional')) return value;
            }
            if (isEvolution && keyLower.includes('evolution')) return value;
            if (isExtended && keyLower.includes('extended')) return value;
            
            // Fallback se tipo non specificato - usa Elite standard
            if (!isElite && !isEvolution && !isExtended && keyLower.includes('elite') && !keyLower.includes('full optional')) {
              return value;
            }
          }
        }
      }
      
      // Fallback: stima basata su configurazione
      const prezzoBase = isFullOptional ? 2800 : 2500;
      const puntiBase = isFullOptional ? 45 : 40;
      return { 
        prezzo: (kw * prezzoBase) + (kwh * 400), 
        punti: (kw * puntiBase) + (kwh * 8), 
        kw: kw, 
        kwh: kwh 
      };
    }
    
    if (soloKwMatch) {
      // Impianto SENZA batteria
      const kw = parseInt(soloKwMatch[1]);
      
      // Cerca nel listino
      for (const [key, value] of Object.entries(LISTINO_FV)) {
        const keyLower = key.toLowerCase();
        const keySoloKw = keyLower.match(/elite\s*35[_\s]*(\d+)$/);
        
        if (keySoloKw && parseInt(keySoloKw[1]) === kw) {
          return value;
        }
      }
      
      // Fallback
      return { prezzo: kw * 2200, punti: kw * 35, kw: kw, kwh: 0 };
    }
    
    // Ultimo fallback: cerca kW nel nome
    const anyKw = p.match(/(\d+)\s*kw/i);
    if (anyKw) {
      const kw = parseInt(anyKw[1]);
      return { prezzo: kw * 2500, punti: kw * 40, kw: kw, kwh: 0 };
    }
    
    return null;
  };

  // Funzione per estrarre fascia consumo E PUNTI da prodotto LA
  const getFasciaConsumoLA = (prodotto) => {
    if (!prodotto) return null;
    const p = prodotto.toUpperCase();
    
    // Determina punti: LA 15 = 15 punti, LA 20 = 20 punti
    let punti = 15; // default
    if (p.includes('20')) punti = 20;
    if (p.includes('15')) punti = 15;
    
    // Trova fascia consumo
    for (const [fascia, dati] of Object.entries(FASCE_CONSUMO_LA)) {
      if (prodotto.includes(fascia)) {
        return { ...dati, punti };
      }
    }
    
    // Default fascia media
    return { kwhMedi: 2150, prezzoKwh: 0.26, punti };
  };

  // === REPORT AGGREGATO v3 - 3 PILASTRI CON CONVERSIONE ===
  const processReportCSV = (type, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const data = parseCSV(text);
      
      // Filtra IVD: solo "Attivazione START&GO" (escludi rinnovi)
      let filteredRows = data;
      if (type === 'ivd') {
        filteredRows = data.filter(row => {
          const prodotto = (row['Prodotto'] || '').toLowerCase();
          return prodotto.includes('attivazione') || prodotto.includes('start');
        });
      }
      
      setReportCSVs(prev => ({ ...prev, [type]: { name: file.name, rows: filteredRows.length, data: filteredRows } }));
    };
    reader.readAsText(file);
  };

  const generateReportData = () => {
    const result = {
      pilastri: {},
      heatmapMesi: {},
      selectedMonth: null
    };
    
    // Helper per categorizzare uno stato
    const categorizeStato = (stato, map) => {
      const statoLower = (stato || '').trim();
      for (const [key, cat] of Object.entries(map)) {
        if (statoLower.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(statoLower.toLowerCase())) {
          return cat;
        }
      }
      return 'altro';
    };
    
    // Helper per estrarre classifiche CON 3 COLONNE di conversione
    const extractClassificheConConversione = (data, statoField, statoMap, cats = ['positivo', 'lavorazione', 'negativo']) => {
      const kStats = {}, nwStats = {}, sdpStats = {};
      
      data.forEach(row => {
        const k = row['Nome Primo K'] || '';
        const nw = row['Nome Primo Networker'] || '';
        const sdp = row['Nome Primo SDP FV'] || row['Nome Primo SDP Fv'] || row['Nome Primo SDP LA'] || row['Nome Primo SDP La'] || '';
        const stato = row[statoField] || row['Stato'] || '';
        const cat = categorizeStato(stato, statoMap);
        
        // K Manager
        if (k && !k.includes('Nome Primo')) {
          if (!kStats[k]) kStats[k] = { positivo: 0, lavorazione: 0, lavorabile: 0, negativo: 0, meno: 0, attivo: 0, perso: 0, altro: 0, total: 0 };
          kStats[k][cat]++;
          kStats[k].total++;
        }
        // Networker
        if (nw && !nw.includes('Nome Primo')) {
          if (!nwStats[nw]) nwStats[nw] = { positivo: 0, lavorazione: 0, lavorabile: 0, negativo: 0, meno: 0, attivo: 0, perso: 0, altro: 0, total: 0 };
          nwStats[nw][cat]++;
          nwStats[nw].total++;
        }
        // SDP
        if (sdp && !sdp.includes('Nome Primo')) {
          if (!sdpStats[sdp]) sdpStats[sdp] = { positivo: 0, lavorazione: 0, lavorabile: 0, negativo: 0, meno: 0, attivo: 0, perso: 0, altro: 0, total: 0 };
          sdpStats[sdp][cat]++;
          sdpStats[sdp].total++;
        }
      });
      
      const toSorted = (obj) => Object.entries(obj).sort((a, b) => b[1].total - a[1].total);
      return { k: toSorted(kStats), nw: toSorted(nwStats), sdp: toSorted(sdpStats) };
    };
    
    // Helper per contare stati raggruppati
    const countStatiRaggruppati = (data, field, map) => {
      const groups = { positivo: 0, lavorazione: 0, lavorabile: 0, negativo: 0, meno: 0, attivo: 0, perso: 0, altro: 0 };
      const dettaglio = {};
      
      data.forEach(row => {
        const stato = row[field] || '';
        if (stato && !stato.includes('Stato')) {
          const cat = categorizeStato(stato, map);
          groups[cat]++;
          dettaglio[stato] = (dettaglio[stato] || 0) + 1;
        }
      });
      
      return { groups, dettaglio: Object.entries(dettaglio).sort((a, b) => b[1] - a[1]) };
    };
    
    // Helper per heatmap mesi (12 mesi) con giorni e orari
    const calcHeatmapMesi = (data) => {
      const mesi = Array(12).fill(0);
      const giorniPerMese = {};
      const orariPerMese = {}; // Nuovo: orari per ogni mese
      const settimanePerMese = {}; // Nuovo: settimane per ogni mese
      const anniTrovati = {}; // Tiene traccia degli anni trovati
      const mesiConDati = new Set(); // Quali mesi hanno almeno 1 dato
      
      data.forEach(row => {
        const dateStr = row['Inserimento'] || row['Data'] || row['Data Inserimento'] || row['Data SI'] || '';
        if (dateStr) {
          try {
            const d = new Date(dateStr.replace(' ', 'T'));
            if (!isNaN(d.getTime())) {
              const year = d.getFullYear();
              const month = d.getMonth();
              const day = d.getDate();
              const hour = d.getHours();
              const weekNum = Math.ceil(day / 7); // Settimana 1-5
              
              mesi[month]++;
              mesiConDati.add(month);
              anniTrovati[year] = (anniTrovati[year] || 0) + 1;
              
              // Giorni
              if (!giorniPerMese[month]) giorniPerMese[month] = Array(31).fill(0);
              if (day >= 1 && day <= 31) giorniPerMese[month][day - 1]++;
              
              // Orari (fasce: 0-6, 6-9, 9-12, 12-15, 15-18, 18-21, 21-24)
              if (!orariPerMese[month]) orariPerMese[month] = { notte: 0, mattinaPrima: 0, mattina: 0, pranzo: 0, pomeriggio: 0, sera: 0, notturno: 0 };
              if (hour < 6) orariPerMese[month].notte++;
              else if (hour < 9) orariPerMese[month].mattinaPrima++;
              else if (hour < 12) orariPerMese[month].mattina++;
              else if (hour < 15) orariPerMese[month].pranzo++;
              else if (hour < 18) orariPerMese[month].pomeriggio++;
              else if (hour < 21) orariPerMese[month].sera++;
              else orariPerMese[month].notturno++;
              
              // Settimane
              if (!settimanePerMese[month]) settimanePerMese[month] = Array(5).fill(0);
              if (weekNum >= 1 && weekNum <= 5) settimanePerMese[month][weekNum - 1]++;
            }
          } catch (e) {}
        }
      });
      
      // Determina l'anno prevalente nei dati
      let annoPrincipale = new Date().getFullYear();
      let maxConteggio = 0;
      Object.entries(anniTrovati).forEach(([anno, conteggio]) => {
        if (conteggio > maxConteggio) {
          maxConteggio = conteggio;
          annoPrincipale = parseInt(anno);
        }
      });
      
      return { mesi, giorniPerMese, orariPerMese, settimanePerMese, anno: annoPrincipale, mesiConDati: Array.from(mesiConDati).sort((a,b) => a-b) };
    };
    
    // ═══════════════════════════════════════════════════════════
    // ☀️ PILASTRO FOTOVOLTAICO
    // ═══════════════════════════════════════════════════════════
    if (reportCSVs.fv?.data?.length > 0) {
      const fvData = reportCSVs.fv.data;
      const statiRagg = countStatiRaggruppati(fvData, 'Stato', STATO_MAP_FV);
      const classifiche = extractClassificheConConversione(fvData, 'Stato', STATO_MAP_FV);
      const heatmap = calcHeatmapMesi(fvData);
      
      const positivi = statiRagg.groups.positivo;
      const lavorazione = statiRagg.groups.lavorazione + statiRagg.groups.altro;
      const negativi = statiRagg.groups.negativo;
      
      result.pilastri.fv = {
        nome: 'FOTOVOLTAICO',
        emoji: '☀️',
        color: '#2AAA8A',
        totale: fvData.length,
        funnel: {
          inseriti: fvData.length,
          positivi: positivi,
          lavorazione: lavorazione,
          negativi: negativi,
          pctPositivi: fvData.length > 0 ? Math.round(positivi / fvData.length * 100) : 0,
          pctNegativi: fvData.length > 0 ? Math.round(negativi / fvData.length * 100) : 0
        },
        statiDettaglio: statiRagg.dettaglio,
        statiGroups: statiRagg.groups,
        classifiche: classifiche,
        totaleK: classifiche.k.reduce((s, [,v]) => s + v.total, 0),
        catLabels: { c1: '🟢 Positivi', c2: '🟡 Lavoraz.', c3: '🔴 Persi' },
        catKeys: ['positivo', 'lavorazione', 'negativo']
      };
      result.heatmapMesi.fv = heatmap;
    }
    
    // ═══════════════════════════════════════════════════════════
    // ⚡ PILASTRO LUCE AMICA
    // ═══════════════════════════════════════════════════════════
    if (reportCSVs.energy?.data?.length > 0) {
      const laData = reportCSVs.energy.data;
      const statiSpa = countStatiRaggruppati(laData, 'Stato NWG Spa', STATO_MAP_LA_SPA);
      const statiEnergia = countStatiRaggruppati(laData, 'Stato NWG Energia', STATO_MAP_LA_ENERGIA);
      const statiGenerico = countStatiRaggruppati(laData, 'Stato', STATO_MAP_LA_SPA);
      const classifiche = extractClassificheConConversione(laData, 'Stato NWG Spa', STATO_MAP_LA_SPA, ['positivo', 'lavorabile', 'meno']);
      const heatmap = calcHeatmapMesi(laData);
      
      // Usa statiSpa se disponibile, altrimenti generico
      const useSpa = statiSpa.dettaglio.length > 0;
      const mainStati = useSpa ? statiSpa : statiGenerico;
      
      const accettati = mainStati.groups.positivo;
      const lavorabili = mainStati.groups.lavorabile + mainStati.groups.altro;
      const persi = mainStati.groups.meno + mainStati.groups.negativo;
      const inFornitura = statiEnergia.groups.positivo;
      
      result.pilastri.energy = {
        nome: 'LUCE AMICA',
        emoji: '⚡',
        color: '#FFD700',
        totale: laData.length,
        funnel: {
          inseriti: laData.length,
          accettati: accettati,
          lavorabili: lavorabili,
          persi: persi,
          inFornitura: inFornitura,
          pctAccettati: laData.length > 0 ? Math.round(accettati / laData.length * 100) : 0,
          pctFornitura: accettati > 0 ? Math.round(inFornitura / accettati * 100) : 0
        },
        statiNwgSpa: mainStati.dettaglio,
        statiNwgEnergia: statiEnergia.dettaglio,
        statiGroupsSpa: mainStati.groups,
        statiGroupsEnergia: statiEnergia.groups,
        classifiche: classifiche,
        totaleK: classifiche.k.reduce((s, [,v]) => s + v.total, 0),
        catLabels: { c1: '🟢 Accettati', c2: '🟡 Lavorab.', c3: '🔴 Persi' },
        catKeys: ['positivo', 'lavorabile', 'meno']
      };
      result.heatmapMesi.energy = heatmap;
    }
    
    // ═══════════════════════════════════════════════════════════
    // 🎓 PILASTRO COLLABORATORI (Seminari + Attivati)
    // ═══════════════════════════════════════════════════════════
    const collabData = { iscritti: 0, presenti: 0, attivati: 0, statiAttivati: null, classifiche: null };
    
    // Seminari: Iscritti e Presenti
    if (reportCSVs.consultings?.data?.length > 0) {
      const semData = reportCSVs.consultings.data;
      collabData.iscritti = semData.length;
      collabData.presenti = semData.filter(row => {
        const presente = (row['Presente SI'] || row['Presente'] || '').toLowerCase();
        return presente === 'si' || presente === 'sì' || presente === 'yes' || presente === '1';
      }).length;
      
      // Classifiche basate su tutti i dati seminario con conteggio presenti
      const kStats = {}, nwStats = {}, sdpStats = {};
      semData.forEach(row => {
        const k = row['Nome Primo K'] || '';
        const nw = row['Nome Primo Networker'] || '';
        const sdp = row['Nome Primo SDP FV'] || row['Nome Primo SDP Fv'] || row['Nome Primo SDP LA'] || row['Nome Primo SDP La'] || '';
        const presente = (row['Presente SI'] || row['Presente'] || '').toLowerCase();
        const isPresente = presente === 'si' || presente === 'sì' || presente === 'yes' || presente === '1';
        
        if (k && !k.includes('Nome Primo')) {
          if (!kStats[k]) kStats[k] = { iscritti: 0, presenti: 0, attivati: 0, total: 0 };
          kStats[k].iscritti++;
          kStats[k].total++;
          if (isPresente) kStats[k].presenti++;
        }
        if (nw && !nw.includes('Nome Primo')) {
          if (!nwStats[nw]) nwStats[nw] = { iscritti: 0, presenti: 0, attivati: 0, total: 0 };
          nwStats[nw].iscritti++;
          nwStats[nw].total++;
          if (isPresente) nwStats[nw].presenti++;
        }
        if (sdp && !sdp.includes('Nome Primo')) {
          if (!sdpStats[sdp]) sdpStats[sdp] = { iscritti: 0, presenti: 0, attivati: 0, total: 0 };
          sdpStats[sdp].iscritti++;
          sdpStats[sdp].total++;
          if (isPresente) sdpStats[sdp].presenti++;
        }
      });
      
      const toSorted = (obj) => Object.entries(obj).sort((a, b) => b[1].total - a[1].total);
      collabData.classifiche = { k: toSorted(kStats), nw: toSorted(nwStats), sdp: toSorted(sdpStats) };
      
      result.heatmapMesi.consultings = calcHeatmapMesi(semData);
      
      // Heatmap solo per PRESENTI
      const presentiData = semData.filter(row => {
        const presente = (row['Presente SI'] || row['Presente'] || '').toLowerCase();
        return presente === 'si' || presente === 'sì' || presente === 'yes' || presente === '1';
      });
      result.heatmapMesi.presenti = calcHeatmapMesi(presentiData);
    }
    
    // Attivati (IVD Contracts)
    if (reportCSVs.ivd?.data?.length > 0) {
      const ivdData = reportCSVs.ivd.data;
      collabData.attivati = ivdData.length;
      collabData.statiAttivati = countStatiRaggruppati(ivdData, 'Stato', STATO_MAP_IVD);
      
      // Aggiungi attivati alle classifiche esistenti o crea nuove
      if (collabData.classifiche) {
        ivdData.forEach(row => {
          const k = row['Nome Primo K'] || '';
          const nw = row['Nome Primo Networker'] || '';
          
          if (k && !k.includes('Nome Primo')) {
            const found = collabData.classifiche.k.find(([name]) => name === k);
            if (found) found[1].attivati = (found[1].attivati || 0) + 1;
          }
          if (nw && !nw.includes('Nome Primo')) {
            const found = collabData.classifiche.nw.find(([name]) => name === nw);
            if (found) found[1].attivati = (found[1].attivati || 0) + 1;
          }
        });
      } else {
        collabData.classifiche = extractClassificheConConversione(ivdData, 'Stato', STATO_MAP_IVD, ['attivo', 'lavorabile', 'perso']);
      }
      
      result.heatmapMesi.ivd = calcHeatmapMesi(ivdData);
    }
    
    if (collabData.iscritti > 0 || collabData.attivati > 0) {
      result.pilastri.collaboratori = {
        nome: 'COLLABORATORI',
        emoji: '🎓',
        color: '#2AAA8A',
        funnel: {
          iscritti: collabData.iscritti,
          presenti: collabData.presenti,
          attivati: collabData.attivati,
          pctPresenti: collabData.iscritti > 0 ? Math.round(collabData.presenti / collabData.iscritti * 100) : 0,
          pctAttivati: collabData.presenti > 0 ? Math.round(collabData.attivati / collabData.presenti * 100) : 0
        },
        statiAttivati: collabData.statiAttivati,
        classifiche: collabData.classifiche || { k: [], nw: [], sdp: [] },
        totaleK: collabData.classifiche ? collabData.classifiche.k.reduce((s, [,v]) => s + v.total, 0) : 0,
        catLabels: { c1: '📝 Iscritti', c2: '✅ Presenti', c3: '🟠 Attivati' },
        catKeys: ['iscritti', 'presenti', 'attivati']
      };
    }
    
    // ═══════════════════════════════════════════════════════════
    // 🚨 ALERT DA ATTIVARE - Luce Amica
    // ═══════════════════════════════════════════════════════════
    if (reportCSVs.energy?.data?.length > 0) {
      const laData = reportCSVs.energy.data;
      const oggi = new Date();
      const alertDaAttivare = [];
      
      laData.forEach(row => {
        const statoEnergia = (row['Stato NWG Energia'] || '').toLowerCase();
        if (statoEnergia.includes('da attivare') || statoEnergia.includes('attivazione')) {
          const dateStr = row['Inserimento'] || row['Data'] || '';
          if (dateStr) {
            try {
              const dataIns = new Date(dateStr.replace(' ', 'T'));
              const giorni = Math.floor((oggi - dataIns) / (1000 * 60 * 60 * 24));
              let fascia = 'verde';
              if (giorni > 60) fascia = 'rosso';
              else if (giorni > 30) fascia = 'giallo';
              
              alertDaAttivare.push({
                contratto: row['N° Contratto'] || row['Contratto'] || row['ID'] || '-',
                cliente: row['Cliente'] || row['Nome Cliente'] || row['Cognome Cliente'] || '-',
                intermediario: row['Nome Intermediario'] || '-',
                dataInserimento: dateStr.split(' ')[0],
                giorni,
                fascia
              });
            } catch (e) {}
          }
        }
      });
      
      // Ordina per giorni (più urgenti prima)
      alertDaAttivare.sort((a, b) => b.giorni - a.giorni);
      
      result.alertDaAttivare = {
        totale: alertDaAttivare.length,
        rosso: alertDaAttivare.filter(a => a.fascia === 'rosso'),
        giallo: alertDaAttivare.filter(a => a.fascia === 'giallo'),
        verde: alertDaAttivare.filter(a => a.fascia === 'verde'),
        lista: alertDaAttivare
      };
    }
    
    // ═══════════════════════════════════════════════════════════
    // 🎯 TRACKER COACHING - Performance nuovi attivati
    // ═══════════════════════════════════════════════════════════
    if (reportCSVs.ivd?.data?.length > 0) {
      const ivdData = reportCSVs.ivd.data;
      const laData = reportCSVs.energy?.data || [];
      const fvData = reportCSVs.fv?.data || [];
      const semData = reportCSVs.consultings?.data || [];
      
      const trackerCoaching = [];
      
      // Helper per normalizzare nomi per confronto
      const normalizza = (nome) => (nome || '').toLowerCase().trim().replace(/\s+/g, ' ');
      const confrontaNomi = (n1, n2) => {
        if (!n1 || !n2) return false;
        const nome1 = normalizza(n1);
        const nome2 = normalizza(n2);
        return nome1 === nome2 || nome1.includes(nome2) || nome2.includes(nome1);
      };
      
      // Filtro: solo IVD attivati dal 2024 in poi (esclude dati troppo vecchi)
      const annoMinimo = 2024;
      
      ivdData.forEach(row => {
        const nomeIvd = row['IVD'] || row['Cliente'] || '';
        const dataAttStr = row['Data Inserimento'] || '';
        const networker = row['Nome Primo Networker'] || ''; // Chi lo ha formato
        
        if (nomeIvd && dataAttStr) {
          try {
            const dataAttivazione = new Date(dataAttStr.replace(' ', 'T'));
            if (isNaN(dataAttivazione.getTime())) return;
            
            // Filtro per anno - escludi IVD attivati prima del 2024
            if (dataAttivazione.getFullYear() < annoMinimo) return;
            
            const tracker = {
              nome: nomeIvd,
              dataAttivazione: dataAttStr.split(' ')[0],
              networker: networker, // Chi lo ha formato/sponsorizzato
              primaLA: null,
              giorniLA: null,
              primaFV: null,
              giorniFV: null,
              primoIscritto: null,
              giorniIscritto: null,
              primoAttivato: null,
              giorniAttivato: null,
              nomeAttivato: null // Chi ha attivato
            };
            
            // 1° LUCE AMICA - Cerca contratti dove 'Nome Intermediario' = nome IVD
            laData.forEach(la => {
              const intermediario = la['Nome Intermediario'] || '';
              if (confrontaNomi(intermediario, nomeIvd)) {
                const dataLA = la['Inserimento'] || '';
                if (dataLA) {
                  const d = new Date(dataLA.replace(' ', 'T'));
                  if (!isNaN(d.getTime()) && d >= dataAttivazione) {
                    if (!tracker.primaLA || d < new Date(tracker.primaLA.replace(' ', 'T'))) {
                      tracker.primaLA = dataLA.split(' ')[0];
                      tracker.giorniLA = Math.floor((d - dataAttivazione) / (1000 * 60 * 60 * 24));
                    }
                  }
                }
              }
            });
            
            // 1° FOTOVOLTAICO - Cerca contratti dove 'Nome Intermediario' = nome IVD
            fvData.forEach(fv => {
              const intermediario = fv['Nome Intermediario'] || '';
              if (confrontaNomi(intermediario, nomeIvd)) {
                const dataFV = fv['Data'] || fv['Data Inserimento'] || '';
                if (dataFV) {
                  const d = new Date(dataFV.replace(' ', 'T'));
                  if (!isNaN(d.getTime()) && d >= dataAttivazione) {
                    if (!tracker.primaFV || d < new Date(tracker.primaFV.replace(' ', 'T'))) {
                      tracker.primaFV = dataFV.split(' ')[0];
                      tracker.giorniFV = Math.floor((d - dataAttivazione) / (1000 * 60 * 60 * 24));
                    }
                  }
                }
              }
            });
            
            // 1° ISCRITTO SEMINARIO - Cerca iscrizioni dove 'Nome Intermediario' = nome IVD
            semData.forEach(sem => {
              const intermediario = sem['Nome Intermediario'] || '';
              if (confrontaNomi(intermediario, nomeIvd)) {
                const dataSem = sem['Inserimento'] || sem['Data SI'] || '';
                if (dataSem) {
                  const d = new Date(dataSem.replace(' ', 'T'));
                  if (!isNaN(d.getTime()) && d >= dataAttivazione) {
                    if (!tracker.primoIscritto || d < new Date(tracker.primoIscritto.replace(' ', 'T'))) {
                      tracker.primoIscritto = dataSem.split(' ')[0];
                      tracker.giorniIscritto = Math.floor((d - dataAttivazione) / (1000 * 60 * 60 * 24));
                    }
                  }
                }
              }
            });
            
            // 1° ATTIVATO - Match Seminari → IVD
            // Cerco iscritti al seminario fatti da questo IVD, poi verifico se sono diventati IVD
            semData.forEach(sem => {
              const intermediario = sem['Nome Intermediario'] || '';
              if (confrontaNomi(intermediario, nomeIvd)) {
                // Questo IVD ha iscritto qualcuno - prendo nome iscritto
                const cognomeIscritto = sem['Cognome'] || '';
                const nomeIscritto = sem['Nome'] || '';
                const nomeCompletoIscritto = `${cognomeIscritto} ${nomeIscritto}`.trim();
                
                if (nomeCompletoIscritto) {
                  // Cerco se questo iscritto è diventato IVD
                  ivdData.forEach(ivd => {
                    const nomeNuovoIvd = ivd['IVD'] || ivd['Cliente'] || '';
                    if (confrontaNomi(nomeNuovoIvd, nomeCompletoIscritto) && ivd !== row) {
                      const dataAtt = ivd['Data Inserimento'] || '';
                      if (dataAtt) {
                        const d = new Date(dataAtt.replace(' ', 'T'));
                        if (!isNaN(d.getTime()) && d >= dataAttivazione) {
                          if (!tracker.primoAttivato || d < new Date(tracker.primoAttivato.replace(' ', 'T'))) {
                            tracker.primoAttivato = dataAtt.split(' ')[0];
                            tracker.giorniAttivato = Math.floor((d - dataAttivazione) / (1000 * 60 * 60 * 24));
                            tracker.nomeAttivato = nomeNuovoIvd;
                          }
                        }
                      }
                    }
                  });
                }
              }
            });
            
            trackerCoaching.push(tracker);
          } catch (e) {}
        }
      });
      
      // Ordina per data attivazione (più recenti prima)
      trackerCoaching.sort((a, b) => new Date(b.dataAttivazione) - new Date(a.dataAttivazione));
      
      // Calcola medie
      const conLA = trackerCoaching.filter(t => t.giorniLA !== null);
      const conFV = trackerCoaching.filter(t => t.giorniFV !== null);
      const conIscr = trackerCoaching.filter(t => t.giorniIscritto !== null);
      const conAtt = trackerCoaching.filter(t => t.giorniAttivato !== null);
      
      result.trackerCoaching = {
        lista: trackerCoaching.slice(0, 50), // Limita a 50
        totale: trackerCoaching.length,
        medie: {
          la: conLA.length > 0 ? Math.round(conLA.reduce((s, t) => s + t.giorniLA, 0) / conLA.length) : null,
          fv: conFV.length > 0 ? Math.round(conFV.reduce((s, t) => s + t.giorniFV, 0) / conFV.length) : null,
          iscritto: conIscr.length > 0 ? Math.round(conIscr.reduce((s, t) => s + t.giorniIscritto, 0) / conIscr.length) : null,
          attivato: conAtt.length > 0 ? Math.round(conAtt.reduce((s, t) => s + t.giorniAttivato, 0) / conAtt.length) : null
        },
        completamento: {
          la: Math.round(conLA.length / trackerCoaching.length * 100) || 0,
          fv: Math.round(conFV.length / trackerCoaching.length * 100) || 0,
          iscritto: Math.round(conIscr.length / trackerCoaching.length * 100) || 0,
          attivato: Math.round(conAtt.length / trackerCoaching.length * 100) || 0
        }
      };
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // 💰 ANALISI FATTURATO - Calcolo da listini (COERENTE CON PILASTRI!)
    // IMPORTANTE: I contratti DEVONO corrispondere ai numeri dei pilastri
    // ═══════════════════════════════════════════════════════════════════════════════
    const fatturato = {
      fv: { 
        // I numeri contratti DEVONO corrispondere a quelli del pilastro
        inseriti: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0, noMatch: 0 },
        effettivi: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 },
        lavorazione: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 },
        persi: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 },
        perK: {}, perNW: {},
        perMese: {} // Fatturato per mese
      },
      la: { 
        inseriti: { totale: 0, punti: 0, kwh: 0, contratti: 0 },
        // PUNTI: basati su Stato NWG Spa = Accettato (anche se poi cessa, pagano!)
        accettatiPunti: { totale: 0, punti: 0, kwh: 0, contratti: 0 },
        // FATTURATO: basati su Stato NWG Energia = Attivo/In fornitura (effettivi ricorrenti)
        attiviEffettivi: { totale: 0, punti: 0, kwh: 0, contratti: 0 },
        perK: {}, perNW: {},
        perMese: {} // Fatturato per mese
      },
      // Dati per calendario
      perMese: {
        fv: {}, // { 'Gennaio': { totale, punti, contratti }, ... }
        la: {}, // { 'Gennaio': { totale, punti, contratti }, ... }
        punti: {} // { 'Gennaio': { fv, la, totale }, ... }
      }
    };
    
    // 💰 FATTURATO FV - TUTTI i contratti (stessa logica del pilastro!)
    if (reportCSVs.fv?.data?.length > 0) {
      const fvData = reportCSVs.fv.data;
      
      fvData.forEach(row => {
        const prodotto = row['Prodotto'] || row['Descrizione'] || '';
        const stato = row['Stato'] || '';
        const k = row['Nome Primo K'] || '';
        const nw = row['Nome Primo Networker'] || '';
        const meseProd = row['Mese di Produzione'] || '';
        
        // Categorizza stato ESATTAMENTE come il pilastro
        const cat = categorizeStato(stato, STATO_MAP_FV);
        
        // Prova match listino, se fallisce usa stima default
        let match = matchProdottoFV(prodotto);
        if (!match) {
          // Stima default: prezzo medio e punti medi per non perdere contratti
          match = { prezzo: 18000, punti: 300, kw: 6, kwh: 10 };
          fatturato.fv.inseriti.noMatch++;
        }
        
        // SEMPRE conta come inserito (come fa il pilastro)
        fatturato.fv.inseriti.totale += match.prezzo;
        fatturato.fv.inseriti.punti += match.punti;
        fatturato.fv.inseriti.kw += match.kw;
        fatturato.fv.inseriti.kwh += match.kwh;
        fatturato.fv.inseriti.contratti++;
        
        // Track per mese (inseriti)
        if (meseProd) {
          if (!fatturato.perMese.fv[meseProd]) fatturato.perMese.fv[meseProd] = { inseriti: 0, effettivi: 0, puntiIns: 0, puntiEff: 0, fatturatoIns: 0, fatturatoEff: 0 };
          fatturato.perMese.fv[meseProd].inseriti++;
          fatturato.perMese.fv[meseProd].puntiIns += match.punti;
          fatturato.perMese.fv[meseProd].fatturatoIns += match.prezzo;
          
          if (!fatturato.perMese.punti[meseProd]) fatturato.perMese.punti[meseProd] = { fvIns: 0, fvEff: 0, laIns: 0, laAcc: 0, totaleIns: 0, totaleEff: 0 };
          fatturato.perMese.punti[meseProd].fvIns += match.punti;
          fatturato.perMese.punti[meseProd].totaleIns += match.punti;
        }
        
        // Breakdown per stato (DEVE corrispondere al pilastro!)
        if (cat === 'positivo') {
          fatturato.fv.effettivi.totale += match.prezzo;
          fatturato.fv.effettivi.punti += match.punti;
          fatturato.fv.effettivi.kw += match.kw;
          fatturato.fv.effettivi.kwh += match.kwh;
          fatturato.fv.effettivi.contratti++;
          
          // Track per mese (effettivi)
          if (meseProd) {
            fatturato.perMese.fv[meseProd].effettivi++;
            fatturato.perMese.fv[meseProd].puntiEff += match.punti;
            fatturato.perMese.fv[meseProd].fatturatoEff += match.prezzo;
            fatturato.perMese.punti[meseProd].fvEff += match.punti;
            fatturato.perMese.punti[meseProd].totaleEff += match.punti;
          }
          
          // Classifiche K e NW
          if (k && !k.includes('Nome Primo')) {
            if (!fatturato.fv.perK[k]) fatturato.fv.perK[k] = { fatturato: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 };
            fatturato.fv.perK[k].fatturato += match.prezzo;
            fatturato.fv.perK[k].punti += match.punti;
            fatturato.fv.perK[k].kw += match.kw;
            fatturato.fv.perK[k].kwh += match.kwh;
            fatturato.fv.perK[k].contratti++;
          }
          if (nw && !nw.includes('Nome Primo')) {
            if (!fatturato.fv.perNW[nw]) fatturato.fv.perNW[nw] = { fatturato: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 };
            fatturato.fv.perNW[nw].fatturato += match.prezzo;
            fatturato.fv.perNW[nw].punti += match.punti;
            fatturato.fv.perNW[nw].kw += match.kw;
            fatturato.fv.perNW[nw].kwh += match.kwh;
            fatturato.fv.perNW[nw].contratti++;
          }
        } else if (cat === 'lavorazione' || cat === 'altro') {
          fatturato.fv.lavorazione.totale += match.prezzo;
          fatturato.fv.lavorazione.punti += match.punti;
          fatturato.fv.lavorazione.kw += match.kw;
          fatturato.fv.lavorazione.kwh += match.kwh;
          fatturato.fv.lavorazione.contratti++;
        } else if (cat === 'negativo') {
          fatturato.fv.persi.totale += match.prezzo;
          fatturato.fv.persi.punti += match.punti;
          fatturato.fv.persi.kw += match.kw;
          fatturato.fv.persi.kwh += match.kwh;
          fatturato.fv.persi.contratti++;
        }
      });
    }
    
    // 🌱 FATTURATO LA - TUTTI i contratti (STESSA LOGICA DEL PILASTRO!)
    if (reportCSVs.energy?.data?.length > 0) {
      const laData = reportCSVs.energy.data;
      
      // Determina quale campo stato usare (stessa logica del pilastro)
      const hasStatoSpa = laData.some(row => row['Stato NWG Spa'] && row['Stato NWG Spa'].trim() !== '');
      const hasStatoEnergia = laData.some(row => row['Stato NWG Energia'] && row['Stato NWG Energia'].trim() !== '');
      
      laData.forEach(row => {
        const prodotto = row['Prodotto'] || '';
        const statoSpa = row['Stato NWG Spa'] || '';
        const statoEnergia = row['Stato NWG Energia'] || '';
        const statoGenerico = row['Stato'] || '';
        const k = row['Nome Primo K'] || '';
        const nw = row['Nome Primo Networker'] || '';
        const meseProd = row['Mese di Produzione'] || '';
        
        // Calcola fatturato e punti
        const fascia = getFasciaConsumoLA(prodotto);
        const fatturatoAnnuo = fascia ? fascia.kwhMedi * fascia.prezzoKwh : 559;
        const fatturatoMensile = fatturatoAnnuo / 12;
        const punti = fascia?.punti || 15;
        const kwh = fascia?.kwhMedi || 2150;
        
        // SEMPRE conta come inserito
        fatturato.la.inseriti.totale += fatturatoAnnuo;
        fatturato.la.inseriti.punti += punti;
        fatturato.la.inseriti.kwh += kwh;
        fatturato.la.inseriti.contratti++;
        
        // Track per mese (inseriti)
        if (meseProd) {
          if (!fatturato.perMese.la[meseProd]) fatturato.perMese.la[meseProd] = { inseriti: 0, accettati: 0, attivi: 0, puntiIns: 0, puntiAcc: 0, fatturatoIns: 0, fatturatoAcc: 0, fatturatoAttivi: 0 };
          fatturato.perMese.la[meseProd].inseriti++;
          fatturato.perMese.la[meseProd].puntiIns += punti;
          fatturato.perMese.la[meseProd].fatturatoIns += fatturatoMensile;
          
          if (!fatturato.perMese.punti[meseProd]) fatturato.perMese.punti[meseProd] = { fvIns: 0, fvEff: 0, laIns: 0, laAcc: 0, totaleIns: 0, totaleEff: 0 };
          fatturato.perMese.punti[meseProd].laIns += punti;
          fatturato.perMese.punti[meseProd].totaleIns += punti;
        }
        
        // ═══════════════════════════════════════════════════════════════════
        // PUNTI LA: Stato NWG Spa = Accettato (anche se poi cessa, PAGANO!)
        // ═══════════════════════════════════════════════════════════════════
        const statoToCheckPunti = hasStatoSpa ? statoSpa : statoGenerico;
        const catStatoPunti = categorizeStato(statoToCheckPunti, STATO_MAP_LA_SPA);
        const isAccettatoPunti = catStatoPunti === 'positivo';
        
        if (isAccettatoPunti) {
          fatturato.la.accettatiPunti.totale += fatturatoAnnuo;
          fatturato.la.accettatiPunti.punti += punti;
          fatturato.la.accettatiPunti.kwh += kwh;
          fatturato.la.accettatiPunti.contratti++;
          
          // Track per mese (accettati per punti)
          if (meseProd) {
            fatturato.perMese.la[meseProd].accettati++;
            fatturato.perMese.la[meseProd].puntiAcc += punti;
            fatturato.perMese.la[meseProd].fatturatoAcc += fatturatoMensile;
            fatturato.perMese.punti[meseProd].laAcc += punti;
            fatturato.perMese.punti[meseProd].totaleEff += punti;
          }
          
          // Classifiche K e NW (per punti)
          if (k && !k.includes('Nome Primo')) {
            if (!fatturato.la.perK[k]) fatturato.la.perK[k] = { fatturato: 0, punti: 0, kwh: 0, contratti: 0, contrattiAttivi: 0 };
            fatturato.la.perK[k].punti += punti;
            fatturato.la.perK[k].contratti++;
          }
          if (nw && !nw.includes('Nome Primo')) {
            if (!fatturato.la.perNW[nw]) fatturato.la.perNW[nw] = { fatturato: 0, punti: 0, kwh: 0, contratti: 0, contrattiAttivi: 0 };
            fatturato.la.perNW[nw].punti += punti;
            fatturato.la.perNW[nw].contratti++;
          }
        }
        
        // ═══════════════════════════════════════════════════════════════════
        // FATTURATO LA: Stato NWG Energia = Attivo/In fornitura (EFFETTIVI!)
        // ═══════════════════════════════════════════════════════════════════
        const catStatoFatturato = categorizeStato(statoEnergia, STATO_MAP_LA_ENERGIA);
        const isAttivoFatturato = catStatoFatturato === 'positivo';
        
        if (isAttivoFatturato) {
          fatturato.la.attiviEffettivi.totale += fatturatoAnnuo;
          fatturato.la.attiviEffettivi.punti += punti;
          fatturato.la.attiviEffettivi.kwh += kwh;
          fatturato.la.attiviEffettivi.contratti++;
          
          // Track per mese (attivi effettivi)
          if (meseProd) {
            fatturato.perMese.la[meseProd].attivi++;
            fatturato.perMese.la[meseProd].fatturatoAttivi += fatturatoMensile;
          }
          
          // Classifiche K e NW (per fatturato attivo)
          if (k && !k.includes('Nome Primo')) {
            if (!fatturato.la.perK[k]) fatturato.la.perK[k] = { fatturato: 0, punti: 0, kwh: 0, contratti: 0, contrattiAttivi: 0 };
            fatturato.la.perK[k].fatturato += fatturatoAnnuo;
            fatturato.la.perK[k].kwh += kwh;
            fatturato.la.perK[k].contrattiAttivi++;
          }
          if (nw && !nw.includes('Nome Primo')) {
            if (!fatturato.la.perNW[nw]) fatturato.la.perNW[nw] = { fatturato: 0, punti: 0, kwh: 0, contratti: 0, contrattiAttivi: 0 };
            fatturato.la.perNW[nw].fatturato += fatturatoAnnuo;
            fatturato.la.perNW[nw].kwh += kwh;
            fatturato.la.perNW[nw].contrattiAttivi++;
          }
        }
      });
    }
    
    // Calcola mese migliore per ogni categoria
    const mesiNomi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    
    // Mese migliore FV
    let meseMaxFV = { mese: '-', fatturato: 0, punti: 0 };
    Object.entries(fatturato.perMese.fv).forEach(([mese, dati]) => {
      if (dati.fatturatoEff > meseMaxFV.fatturato) {
        meseMaxFV = { mese, fatturato: dati.fatturatoEff, punti: dati.puntiEff };
      }
    });
    fatturato.meseMaxFV = meseMaxFV;
    
    // Mese migliore LA (attivi)
    let meseMaxLA = { mese: '-', fatturato: 0, contratti: 0 };
    Object.entries(fatturato.perMese.la).forEach(([mese, dati]) => {
      if (dati.fatturatoAttivi > meseMaxLA.fatturato) {
        meseMaxLA = { mese, fatturato: dati.fatturatoAttivi * 12, contratti: dati.attivi }; // Annualizzato
      }
    });
    fatturato.meseMaxLA = meseMaxLA;
    
    // Mese migliore Punti (effettivi)
    let meseMaxPunti = { mese: '-', punti: 0 };
    Object.entries(fatturato.perMese.punti).forEach(([mese, dati]) => {
      if (dati.totaleEff > meseMaxPunti.punti) {
        meseMaxPunti = { mese, punti: dati.totaleEff };
      }
    });
    fatturato.meseMaxPunti = meseMaxPunti;
    
    // Ordina classifiche fatturato
    fatturato.fv.classificaK = Object.entries(fatturato.fv.perK).sort((a, b) => b[1].fatturato - a[1].fatturato);
    fatturato.fv.classificaNW = Object.entries(fatturato.fv.perNW).sort((a, b) => b[1].fatturato - a[1].fatturato);
    fatturato.la.classificaK = Object.entries(fatturato.la.perK).sort((a, b) => b[1].fatturato - a[1].fatturato);
    fatturato.la.classificaNW = Object.entries(fatturato.la.perNW).sort((a, b) => b[1].fatturato - a[1].fatturato);
    
    // ✅ CHECK COERENZA - Verifica che i numeri battano con i pilastri
    fatturato.coerenza = {
      fv: {
        pilastroInseriti: result.pilastri.fv?.funnel?.inseriti || 0,
        fatturatoInseriti: fatturato.fv.inseriti.contratti,
        pilastroPositivi: result.pilastri.fv?.funnel?.positivi || 0,
        fatturatoEffettivi: fatturato.fv.effettivi.contratti,
        pilastroLavorazione: result.pilastri.fv?.funnel?.lavorazione || 0,
        fatturatoLavorazione: fatturato.fv.lavorazione.contratti,
        pilastroPersi: result.pilastri.fv?.funnel?.negativi || 0,
        fatturatoPersi: fatturato.fv.persi.contratti,
        ok: false
      },
      la: {
        pilastroInseriti: result.pilastri.energy?.funnel?.inseriti || 0,
        fatturatoInseriti: fatturato.la.inseriti.contratti,
        pilastroAccettati: result.pilastri.energy?.funnel?.accettati || 0,
        fatturatoAccettatiPunti: fatturato.la.accettatiPunti.contratti, // Per PUNTI
        pilastroInFornitura: result.pilastri.energy?.funnel?.inFornitura || 0,
        fatturatoAttiviEffettivi: fatturato.la.attiviEffettivi.contratti, // Per FATTURATO
        ok: false
      }
    };
    
    // Verifica coerenza FV
    fatturato.coerenza.fv.ok = 
      fatturato.coerenza.fv.pilastroInseriti === fatturato.coerenza.fv.fatturatoInseriti &&
      fatturato.coerenza.fv.pilastroPositivi === fatturato.coerenza.fv.fatturatoEffettivi;
    
    // Verifica coerenza LA (inseriti + accettati per punti)
    fatturato.coerenza.la.ok = 
      fatturato.coerenza.la.pilastroInseriti === fatturato.coerenza.la.fatturatoInseriti &&
      fatturato.coerenza.la.pilastroAccettati === fatturato.coerenza.la.fatturatoAccettatiPunti;
    
    result.fatturato = fatturato;
    
    if (Object.keys(result.pilastri).length === 0) return null;
    
    return result;
  };

  const clearReportCSVs = () => {
    setReportCSVs({ ivd: null, energy: null, fv: null, consultings: null });
    setReportData(null);
  };
  
  // Stato per drill-down heatmap mesi
  const [heatmapDrilldown, setHeatmapDrilldown] = useState(null);

  // === SCREENSHOT DASHBOARD (solo canvas nativo, no dipendenze esterne) ===
  const generateDashboardCanvas = (format = 'png') => {
    const stats = getDashboardStats();
    const pies = getPieDistributions();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1920, H = 1400;
    canvas.width = W; canvas.height = H;
    
    // Sfondo scuro
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, W, H);
    
    // Header
    ctx.fillStyle = '#2AAA8A';
    ctx.font = 'bold 48px Arial';
    ctx.fillText('📊 DASHBOARD', 50, 70);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(`${config.emoji} ${config.label} - ${eventDate}`, 50, 110);
    
    // Stats cards
    const cardW = 400, cardH = 120, cardY = 150;
    const cardData = [
      { label: labels.c1, value: stats.ins, color: '#2AAA8A' },
      { label: labels.c2, value: stats.acc, color: '#4CAF50' },
      { label: 'Partecipanti', value: stats.part, color: '#2AAA8A' },
      { label: 'Conversione', value: stats.conv + '%', color: '#FFD700' }
    ];
    cardData.forEach((card, i) => {
      const x = 50 + i * (cardW + 30);
      ctx.fillStyle = card.color + '30';
      ctx.beginPath();
      ctx.roundRect(x, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.strokeStyle = card.color + '60';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = card.color;
      ctx.font = 'bold 52px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(card.value.toString(), x + cardW/2, cardY + 65);
      ctx.fillStyle = '#fff';
      ctx.font = '18px Arial';
      ctx.fillText(card.label, x + cardW/2, cardY + 100);
    });
    ctx.textAlign = 'left';
    
    // Podio
    const podioY = 320, podioH = 280;
    ctx.fillStyle = '#FAFAFA';
    ctx.beginPath();
    ctx.roundRect(50, podioY, 600, podioH, 20);
    ctx.fill();
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('🏆 PODIO', 80, podioY + 40);
    
    // Disegna podio semplificato
    const podioData = stats.top3;
    const barColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    const barHeights = [160, 120, 80];
    const barX = [280, 130, 430];
    podioData.forEach((p, i) => {
      const bx = barX[i], bh = barHeights[i], by = podioY + podioH - bh - 30;
      ctx.fillStyle = barColors[i];
      ctx.beginPath();
      ctx.roundRect(bx, by, 140, bh, [15, 15, 0, 0]);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(p.v1.toString(), bx + 70, by + bh - 20);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText(p.name.split(' ')[0], bx + 70, by - 10);
    });
    ctx.textAlign = 'left';
    
    // Heatmap mensile
    const heatY = 320, heatX = 700;
    ctx.fillStyle = '#FAFAFA';
    ctx.beginPath();
    ctx.roundRect(heatX, heatY, 1170, podioH, 20);
    ctx.fill();
    ctx.fillStyle = '#2AAA8A';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('🔥 TEMPERATURA CONTRATTI', heatX + 30, heatY + 40);
    
    // Griglia calendario
    const cellW = 45, cellH = 35, gridX = heatX + 30, gridY = heatY + 70;
    const dayNames = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
    const maxMonthly = Math.max(...stats.monthlyData, 1);
    
    // Header giorni
    dayNames.forEach((d, i) => {
      ctx.fillStyle = '#666666';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(d, gridX + i * cellW + cellW/2, gridY - 10);
    });
    
    // Celle calendario
    const firstDay = stats.monthInfo?.firstDay || 0;
    stats.monthlyData.slice(0, stats.monthInfo?.daysInMonth || 31).forEach((val, i) => {
      const col = (i + firstDay) % 7;
      const row = Math.floor((i + firstDay) / 7);
      const cx = gridX + col * cellW;
      const cy = gridY + row * cellH;
      const intensity = val / maxMonthly;
      const bgColor = val === 0 ? '#F5F5F5' : 
                      intensity > 0.7 ? '#4CAF50' : 
                      intensity > 0.4 ? '#FFD700' : '#2AAA8A';
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cellW - 4, cellH - 4, 6);
      ctx.fill();
      ctx.fillStyle = val === 0 ? '#AAAAAA' : '#fff';
      ctx.font = val > 0 ? 'bold 14px Arial' : '12px Arial';
      ctx.fillText((i + 1).toString(), cx + cellW/2 - 2, cy + cellH/2 + 2);
      if (val > 0) {
        ctx.font = '10px Arial';
        ctx.fillText(val.toString(), cx + cellW/2 - 2, cy + cellH - 8);
      }
    });
    ctx.textAlign = 'left';
    
    // Legenda
    const legY = heatY + 230;
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath(); ctx.roundRect(heatX + 800, legY, 20, 20, 4); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '12px Arial';
    ctx.fillText('Alto', heatX + 830, legY + 15);
    ctx.fillStyle = '#FFD700';
    ctx.beginPath(); ctx.roundRect(heatX + 900, legY, 20, 20, 4); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('Medio', heatX + 930, legY + 15);
    ctx.fillStyle = '#2AAA8A';
    ctx.beginPath(); ctx.roundRect(heatX + 1010, legY, 20, 20, 4); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('Basso', heatX + 1040, legY + 15);
    
    // TOP 4-10
    const topY = 640;
    ctx.fillStyle = '#FAFAFA';
    ctx.beginPath();
    ctx.roundRect(50, topY, 900, 320, 20);
    ctx.fill();
    ctx.fillStyle = '#2AAA8A';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('📈 TOP 4° - 10°', 80, topY + 40);
    
    stats.top10.slice(3, 10).forEach((p, i) => {
      const ry = topY + 70 + i * 35;
      const barW = (p.v1 / stats.maxV1) * 600;
      ctx.fillStyle = 'rgba(124,77,255,0.3)';
      ctx.beginPath();
      ctx.roundRect(150, ry, barW, 28, 6);
      ctx.fill();
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(`${i + 4}°`, 90, ry + 20);
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(p.name, 160, ry + 20);
      ctx.fillStyle = '#2AAA8A';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(p.v1.toString(), 900, ry + 22);
      ctx.textAlign = 'left';
    });
    
    // Torte K e NW
    const pieY = 640, pieX = 1000;
    ctx.fillStyle = '#FAFAFA';
    ctx.beginPath();
    ctx.roundRect(pieX, pieY, 870, 320, 20);
    ctx.fill();
    
    // K Manager pie
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('👑 K MANAGER', pieX + 30, pieY + 40);
    const totalK = pies.k.reduce((s, [,v]) => s + v, 0);
    pies.k.slice(0, 5).forEach(([name, val], i) => {
      const py = pieY + 70 + i * 28;
      ctx.fillStyle = PIE_COLORS[i];
      ctx.beginPath();
      ctx.roundRect(pieX + 30, py, 15, 15, 3);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText(`${name}: ${val} (${Math.round(val/totalK*100)}%)`, pieX + 55, py + 12);
    });
    
    // NW pie
    ctx.fillStyle = '#2AAA8A';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('⭐ NETWORKER TOP 5', pieX + 400, pieY + 40);
    pies.nw.slice(0, 5).forEach(([name, val], i) => {
      const py = pieY + 70 + i * 28;
      ctx.fillStyle = PIE_COLORS[i];
      ctx.beginPath();
      ctx.roundRect(pieX + 400, py, 15, 15, 3);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText(`${name}: ${val}`, pieX + 425, py + 12);
    });
    
    // Footer
    ctx.fillStyle = '#E0E0E0';
    ctx.fillRect(0, H - 60, W, 60);
    ctx.fillStyle = '#666666';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Leader Ranking v13.5 • Generato il ${new Date().toLocaleDateString('it-IT')}`, W/2, H - 25);
    
    // Download
    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `dashboard_${eventDate.replace(/\s/g, '_')}_${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      // PDF semplice
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `dashboard_${eventDate.replace(/\s/g, '_')}_${new Date().toISOString().slice(0,10)}.png`;
      link.href = imgData;
      link.click();
    }
  };

  // Genera PNG per slide NWG (16:9) - VERSIONE WOW
  const generateSlidePNG = (mode = 'full') => {
    const stats = getDashboardStats();
    if (!stats.top3.length) return null;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1920, H = 1080;
    canvas.width = W; canvas.height = H;
    
    // Sfondo verde teal NWG
    ctx.fillStyle = '#2AAA8A';
    ctx.fillRect(0, 0, W, H);
    
    // Funzione per disegnare stelle
    const drawStar = (cx, cy, spikes, outerR, innerR, color, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (Math.PI * i) / spikes - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    
    // Stelle decorative sparse
    const starPositions = [
      { x: 120, y: 100, size: 14 }, { x: 200, y: 250, size: 10 }, { x: 100, y: 500, size: 12 },
      { x: 1800, y: 80, size: 16 }, { x: 1850, y: 280, size: 11 }, { x: 1750, y: 550, size: 13 },
      { x: 500, y: 80, size: 10 }, { x: 700, y: 150, size: 8 }, { x: 1300, y: 100, size: 12 },
      { x: 1450, y: 180, size: 9 }, { x: 400, y: 750, size: 11 }, { x: 1600, y: 800, size: 10 },
      { x: 250, y: 650, size: 8 }, { x: 1700, y: 700, size: 9 }
    ];
    starPositions.forEach(s => drawStar(s.x, s.y, 4, s.size, s.size * 0.4, '#FFD700', 0.5));

    if (mode === 'solo') {
      // ============ SOLO PODIO - CENTRATO E GRANDE ============
      const podioBaseY = 820;
      const barW = 280;
      const gap = 50;
      const centerX = W / 2;
      const maxH = 550;
      const minH = 250;
      
      const maxVal = Math.max(stats.top3[0]?.v1 || 1, stats.top3[1]?.v1 || 1, stats.top3[2]?.v1 || 1);
      
      const positions = [
        { x: centerX - barW - gap, data: stats.top3[1], medal: '🥈', pos: 2, colors: ['#F5F5F5', '#C0C0C0', '#909090'], sideColor: '#707070' },
        { x: centerX, data: stats.top3[0], medal: '🥇', pos: 1, colors: ['#FFFDE7', '#FFD700', '#20917A'], sideColor: '#CC9900' },
        { x: centerX + barW + gap, data: stats.top3[2], medal: '🥉', pos: 3, colors: ['#E8F5F1', '#CD7F32', '#8B4513'], sideColor: '#6B3A0A' }
      ];
      
      positions.forEach(p => {
        if (p.data) {
          const ratio = p.data.v1 / maxVal;
          p.h = minH + (maxH - minH) * ratio;
          if (p.pos === 1) p.h = maxH;
        } else {
          p.h = 0;
        }
      });
      
      // Array per memorizzare posizioni medaglie (da disegnare dopo le stelle)
      const medalPositions = [];
      
      positions.forEach(p => {
        if (!p.data || p.h === 0) return;
        const barX = p.x - barW / 2;
        const barY = podioBaseY - p.h;
        const depth = 25; // Profondità 3D
        
        // Glow per primo posto
        if (p.pos === 1) {
          ctx.save();
          ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
          ctx.shadowBlur = 80;
          ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
          ctx.beginPath();
          ctx.roundRect(barX - 20, barY - 20, barW + 40 + depth, p.h + 20, [30, 30, 0, 0]);
          ctx.fill();
          ctx.restore();
        }
        
        // OMBRA sotto la barra
        ctx.fillStyle = '#F0F0F0';
        ctx.beginPath();
        ctx.roundRect(barX + 8, barY + 8, barW + depth, p.h, [25, 25, 0, 0]);
        ctx.fill();
        
        // LATO DESTRO 3D (più scuro)
        ctx.fillStyle = p.sideColor;
        ctx.beginPath();
        ctx.moveTo(barX + barW, barY + 25);
        ctx.lineTo(barX + barW + depth, barY + 25 - 15);
        ctx.lineTo(barX + barW + depth, barY + p.h);
        ctx.lineTo(barX + barW, barY + p.h);
        ctx.closePath();
        ctx.fill();
        
        // TOP 3D (parte superiore inclinata)
        const topGrad = ctx.createLinearGradient(barX, barY, barX + barW + depth, barY - 15);
        topGrad.addColorStop(0, p.colors[0]);
        topGrad.addColorStop(1, p.colors[1]);
        ctx.fillStyle = topGrad;
        ctx.beginPath();
        ctx.moveTo(barX + 25, barY);
        ctx.lineTo(barX + barW - 25, barY);
        ctx.quadraticCurveTo(barX + barW, barY, barX + barW, barY + 25);
        ctx.lineTo(barX + barW + depth, barY + 25 - 15);
        ctx.lineTo(barX + barW + depth - 25, barY - 15);
        ctx.lineTo(barX + 25, barY - 15);
        ctx.quadraticCurveTo(barX, barY - 15, barX, barY);
        ctx.quadraticCurveTo(barX, barY, barX + 25, barY);
        ctx.closePath();
        ctx.fill();
        
        // Barra FRONTALE gradient
        const grad = ctx.createLinearGradient(barX, barY, barX, barY + p.h);
        grad.addColorStop(0, p.colors[0]);
        grad.addColorStop(0.5, p.colors[1]);
        grad.addColorStop(1, p.colors[2]);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, p.h, [25, 25, 0, 0]);
        ctx.fill();
        
        // Riflesso lucido
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath();
        ctx.roundRect(barX + 18, barY + 18, barW * 0.22, p.h - 36, [12, 12, 12, 12]);
        ctx.fill();
        
        // Salva posizione medaglia per dopo (più in alto)
        medalPositions.push({ x: p.x, y: barY + 80, pos: p.pos, medal: p.medal });
        
        // Numero alla BASE della colonna
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${p.pos === 1 ? 120 : 90}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(p.data.v1.toString(), p.x, podioBaseY - 30);
        
        // Nome su due righe - ALZATI
        const nameParts = p.data.name.toUpperCase().split(' ');
        const cognome = nameParts[0] || '';
        const nome = nameParts.slice(1).join(' ') || '';
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${p.pos === 1 ? 48 : 40}px Arial`;
        ctx.fillText(cognome, p.x, barY - 90);
        ctx.font = `${p.pos === 1 ? 38 : 30}px Arial`;
        ctx.fillStyle = '#333333';
        ctx.fillText(nome, p.x, barY - 45);
      });
      
      // Stelle attorno al vincitore
      const winnerY = podioBaseY - (positions[1].h || maxH);
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const dist = 200 + Math.random() * 60;
        const sx = centerX + Math.cos(angle) * dist;
        const sy = winnerY + 150 + Math.sin(angle) * dist * 0.5;
        drawStar(sx, sy, 4, 12 + Math.random() * 10, 5, '#FFD700', 0.4 + Math.random() * 0.4);
      }
      
      // MEDAGLIE SOLIDE (disegnate DOPO le stelle per stare in primo piano)
      medalPositions.forEach(m => {
        const size = m.pos === 1 ? 70 : 55;
        
        // Ombra medaglia
        ctx.beginPath();
        ctx.arc(m.x + 4, m.y + 4, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fill();
        
        // Sfondo circolare solido
        const medalBg = m.pos === 1 ? '#FFFDE7' : m.pos === 2 ? '#F5F5F5' : '#E8F5F1';
        ctx.beginPath();
        ctx.arc(m.x, m.y, size, 0, Math.PI * 2);
        ctx.fillStyle = medalBg;
        ctx.fill();
        
        // Bordo medaglia
        const medalBorder = m.pos === 1 ? '#FFD700' : m.pos === 2 ? '#A0A0A0' : '#CD7F32';
        ctx.strokeStyle = medalBorder;
        ctx.lineWidth = 6;
        ctx.stroke();
        
        // Emoji medaglia
        ctx.font = `${m.pos === 1 ? 90 : 70}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(m.medal, m.x, m.y + (m.pos === 1 ? 32 : 25));
      });
      
    } else {
      // ============ PODIO + CLASSIFICA ============
      const podioOffsetX = 250; // ANCORA PIU A DESTRA
      const podioBaseY = 800; // Base podio
      const barW = 240; // Più largo
      const gap = 35;
      const centerX = 480 + podioOffsetX;
      const maxH = 480;
      const minH = 200;
      
      const maxVal = Math.max(stats.top3[0]?.v1 || 1, stats.top3[1]?.v1 || 1, stats.top3[2]?.v1 || 1);
      
      const positions = [
        { x: centerX - barW - gap, data: stats.top3[1], medal: '🥈', pos: 2, colors: ['#F5F5F5', '#C0C0C0', '#909090'], sideColor: '#707070' },
        { x: centerX, data: stats.top3[0], medal: '🥇', pos: 1, colors: ['#FFFDE7', '#FFD700', '#20917A'], sideColor: '#CC9900' },
        { x: centerX + barW + gap, data: stats.top3[2], medal: '🥉', pos: 3, colors: ['#E8F5F1', '#CD7F32', '#8B4513'], sideColor: '#6B3A0A' }
      ];
      
      positions.forEach(p => {
        if (p.data) {
          const ratio = p.data.v1 / maxVal;
          p.h = minH + (maxH - minH) * ratio;
          if (p.pos === 1) p.h = maxH;
        } else {
          p.h = 0;
        }
      });
      
      // Array per memorizzare posizioni medaglie
      const medalPositions = [];
      
      positions.forEach(p => {
        if (!p.data || p.h === 0) return;
        const barX = p.x - barW / 2;
        const barY = podioBaseY - p.h;
        const depth = 20; // Profondità 3D
        
        // Glow per primo posto
        if (p.pos === 1) {
          ctx.save();
          ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
          ctx.shadowBlur = 70;
          ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
          ctx.beginPath();
          ctx.roundRect(barX - 18, barY - 18, barW + 36 + depth, p.h + 18, [28, 28, 0, 0]);
          ctx.fill();
          ctx.restore();
        }
        
        // OMBRA sotto la barra
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.roundRect(barX + 6, barY + 6, barW + depth, p.h, [22, 22, 0, 0]);
        ctx.fill();
        
        // LATO DESTRO 3D
        ctx.fillStyle = p.sideColor;
        ctx.beginPath();
        ctx.moveTo(barX + barW, barY + 22);
        ctx.lineTo(barX + barW + depth, barY + 22 - 12);
        ctx.lineTo(barX + barW + depth, barY + p.h);
        ctx.lineTo(barX + barW, barY + p.h);
        ctx.closePath();
        ctx.fill();
        
        // Barra FRONTALE gradient
        const grad = ctx.createLinearGradient(barX, barY, barX, barY + p.h);
        grad.addColorStop(0, p.colors[0]);
        grad.addColorStop(0.5, p.colors[1]);
        grad.addColorStop(1, p.colors[2]);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, p.h, [22, 22, 0, 0]);
        ctx.fill();
        
        // Riflesso lucido
        ctx.fillStyle = '#AAAAAA';
        ctx.beginPath();
        ctx.roundRect(barX + 14, barY + 14, barW * 0.24, p.h - 28, [10, 10, 10, 10]);
        ctx.fill();
        
        // Salva posizione medaglia (più in alto)
        medalPositions.push({ x: p.x, y: barY + 70, pos: p.pos, medal: p.medal });
        
        // Numero alla BASE della colonna
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${p.pos === 1 ? 100 : 75}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(p.data.v1.toString(), p.x, podioBaseY - 25);
        
        // Nome su due righe - ALZATI
        const nameParts = p.data.name.toUpperCase().split(' ');
        const cognome = nameParts[0] || '';
        const nome = nameParts.slice(1).join(' ') || '';
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${p.pos === 1 ? 40 : 32}px Arial`;
        ctx.fillText(cognome, p.x, barY - 80);
        ctx.font = `${p.pos === 1 ? 30 : 24}px Arial`;
        ctx.fillStyle = '#333333';
        ctx.fillText(nome, p.x, barY - 42);
      });
      
      // Stelle attorno al vincitore
      const winnerY = podioBaseY - (positions[1].h || maxH);
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const dist = 180 + Math.random() * 50;
        const sx = centerX + Math.cos(angle) * dist;
        const sy = winnerY + 120 + Math.sin(angle) * dist * 0.5;
        drawStar(sx, sy, 4, 11 + Math.random() * 8, 4, '#FFD700', 0.4 + Math.random() * 0.35);
      }
      
      // MEDAGLIE SOLIDE (dopo le stelle)
      medalPositions.forEach(m => {
        const size = m.pos === 1 ? 60 : 48;
        
        // Ombra medaglia
        ctx.beginPath();
        ctx.arc(m.x + 3, m.y + 3, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fill();
        
        // Sfondo circolare solido
        const medalBg = m.pos === 1 ? '#FFFDE7' : m.pos === 2 ? '#F5F5F5' : '#E8F5F1';
        ctx.beginPath();
        ctx.arc(m.x, m.y, size, 0, Math.PI * 2);
        ctx.fillStyle = medalBg;
        ctx.fill();
        
        // Bordo medaglia
        const medalBorder = m.pos === 1 ? '#FFD700' : m.pos === 2 ? '#A0A0A0' : '#CD7F32';
        ctx.strokeStyle = medalBorder;
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // Emoji medaglia
        ctx.font = `${m.pos === 1 ? 75 : 60}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(m.medal, m.x, m.y + (m.pos === 1 ? 28 : 22));
      });
      
      // === CLASSIFICA 4°-10° - PIU A SINISTRA ===
      const listX = 1100 + podioOffsetX - 150; // Spostata a sinistra
      const rowH = 80;
      const top7 = stats.top10.slice(3, 10);
      const numRows = top7.length;
      // Allinea in modo che l'ultima riga finisca alla base del podio
      const listStartY = podioBaseY - (numRows * rowH) + 10;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('📊 CLASSIFICA', listX, listStartY - 25);
      
      const maxV1 = stats.maxV1;
      
      top7.forEach((p, i) => {
        const y = listStartY + i * rowH;
        const pos = i + 4;
        
        // Sfondo riga
        ctx.fillStyle = '#E0E0E0';
        ctx.beginPath();
        ctx.roundRect(listX, y, 560, 68, 14);
        ctx.fill();
        
        // Barra progresso
        const barWidth = (p.v1 / maxV1) * 400;
        const barGrad = ctx.createLinearGradient(listX, 0, listX + barWidth, 0);
        barGrad.addColorStop(0, 'rgba(124,77,255,0.7)');
        barGrad.addColorStop(1, 'rgba(124,77,255,0.2)');
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(listX, y, barWidth, 68, 14);
        ctx.fill();
        
        // Posizione
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${pos}°`, listX + 18, y + 45);
        
        // Nome
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '26px Arial';
        ctx.fillText(p.name.toUpperCase(), listX + 80, y + 45);
        
        // Valore
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(p.v1.toString(), listX + 538, y + 47);
        ctx.textAlign = 'left';
      });
    }
    
    // === FOOTER STATS ===
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, H - 75, W, 75);
    
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = '26px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`📥 ${stats.ins} Inseriti   •   ✅ ${stats.acc} Accettati   •   📈 ${stats.conv}% Conversione   •   👥 ${stats.part} Partecipanti`, W / 2, H - 28);
    
    return canvas.toDataURL('image/png');
  };

  const downloadSlidePNG = (mode = 'full') => {
    const img = generateSlidePNG(mode);
    if (img) {
      const a = document.createElement('a');
      const suffix = mode === 'solo' ? 'solo_podio' : 'podio_classifica';
      a.download = `classifica_${suffix}_${eventDate.replace(/\s/g, '_')}.png`;
      a.href = img;
      a.click();
    }
  };

  // Animazione contatori
  const animateStats = (target) => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      setAnimatedStats({
        ins: Math.round(target.ins * eased),
        acc: Math.round(target.acc * eased),
        part: Math.round(target.part * eased),
        conv: Math.round(target.conv * eased)
      });
      
      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  // Trigger animazione quando cambiano i dati
  React.useEffect(() => {
    if (rankings && filteredData) {
      const stats = getDashboardStats();
      animateStats(stats);
    }
  }, [rankings, filteredData, selectedMonth, selectedWeek]);

  const generatePNG_Impact = () => {
    const data = getData(); if (!data.length) return null;
    const config = getConfig(), labels = getLabels(), isAcc = selectedRanking.includes('accettati'), grouped = groupByValue(data, isAcc);
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), W = 1080;
    
    // Calcola altezza necessaria PRIMA
    let estimatedH = 220; // Header
    const testFontSize = 18;
    ctx.font = `bold ${testFontSize}px Arial`;
    
    grouped.forEach((group) => {
      const allNames = group.members.map(m => m.name.toUpperCase());
      const namesText = allNames.join('  •  ');
      const estimatedLines = Math.ceil(ctx.measureText(namesText).width / (W - 180)) || 1;
      estimatedH += Math.max(50, 20 + estimatedLines * (testFontSize + 8)) + 12;
    });
    estimatedH += 60; // Footer
    
    // Altezza minima 1080, ma può crescere se necessario
    const H = Math.max(1080, estimatedH);
    canvas.width = W; canvas.height = H;
    
    // Background - ELEGANTE con sfumatura verde NWG
    const bg = ctx.createLinearGradient(0, 0, 0, H); 
    bg.addColorStop(0, '#FFFFFF'); 
    bg.addColorStop(0.3, 'rgba(42,170,138,0.03)'); 
    bg.addColorStop(0.7, 'rgba(42,170,138,0.05)'); 
    bg.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `${config.color}60`; ctx.lineWidth = 3; ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.fillStyle = config.color; ctx.fillRect(35, 35, W - 70, 4);
    
    // Header
    ctx.fillStyle = config.color; ctx.font = 'bold 16px Arial'; ctx.fillText('LEADER RANKING', 45, 65);
    ctx.fillStyle = '#333333'; ctx.font = 'bold 42px Arial'; ctx.fillText(`${config.emoji} CLASSIFICA ${config.label}`, 45, 115);
    ctx.fillStyle = '#666666'; ctx.font = '18px Arial'; ctx.fillText(`${eventName} • ${eventDate}`, 45, 148);
    
    // Partecipanti e contratti inline
    const totIns = getClassificaTotal();
    ctx.fillStyle = '#666666'; ctx.font = '16px Arial';
    ctx.fillText(`${data.length} partecipanti • ${totIns} contratti`, 45, 178);
    
    // Separator
    ctx.fillStyle = '#E0E0E0'; ctx.fillRect(45, 195, W - 90, 2);
    
    // Calcola font size proporzionale in base al numero di gruppi e membri totali
    const totalMembers = data.length;
    const numGroups = grouped.length;
    
    // Font più piccolo se tanti partecipanti, ma mai sotto 13px
    let baseFontSize;
    if (totalMembers <= 15) baseFontSize = 22;
    else if (totalMembers <= 25) baseFontSize = 20;
    else if (totalMembers <= 40) baseFontSize = 18;
    else if (totalMembers <= 60) baseFontSize = 16;
    else if (totalMembers <= 80) baseFontSize = 14;
    else baseFontSize = 13;
    
    const lineHeight = baseFontSize + 6;
    const groupPadding = totalMembers <= 30 ? 12 : 8;
    
    let currentY = 215;
    let position = 1;
    
    // MOSTRA TUTTI I GRUPPI - nessun taglio!
    grouped.forEach((group) => {
      const { value, members } = group;
      const isTop3 = position <= 3;
      const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : null;
      
      // Font size per questo gruppo
      const fontSize = isTop3 ? Math.min(baseFontSize + 2, 24) : baseFontSize;
      ctx.font = `bold ${fontSize}px Arial`;
      
      // Costruisci linee di nomi - TUTTI i nomi
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
      
      // Altezza blocco basata sulle linee effettive
      const blockH = Math.max(isTop3 ? 55 : 45, 18 + lines.length * lineHeight);
      
      // Background
      if (isTop3) {
        const grad = ctx.createLinearGradient(45, currentY, W - 45, currentY);
        grad.addColorStop(0, `${config.color}25`); grad.addColorStop(1, `${config.color}08`);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = '#F5F5F5';
      }
      ctx.beginPath(); ctx.roundRect(45, currentY, W - 90, blockH, 10); ctx.fill();
      
      // Medaglia/Posizione
      const textStartY = currentY + (blockH - lines.length * lineHeight) / 2 + fontSize;
      
      if (medal) {
        ctx.font = `${Math.min(28, fontSize + 8)}px Arial`;
        ctx.fillText(medal, 55, textStartY + (lines.length > 1 ? 0 : 4));
      } else {
        ctx.fillStyle = '#666666';
        ctx.font = `bold ${Math.min(18, fontSize)}px Arial`;
        ctx.fillText(`${position}°`, 58, textStartY + (lines.length > 1 ? 0 : 4));
      }
      
      // Nomi - TUTTO NERO per leggibilità
      ctx.fillStyle = '#333333';
      ctx.font = `bold ${fontSize}px Arial`;
      lines.forEach((line, i) => {
        ctx.fillText(line, 100, textStartY + i * lineHeight);
      });
      
      // Valore contratti - NERO
      ctx.fillStyle = '#333333';
      ctx.font = `bold ${isTop3 ? 32 : 26}px Arial`;
      ctx.textAlign = 'right';
      ctx.fillText(value.toString(), W - 55, currentY + blockH / 2 + 10);
      ctx.textAlign = 'left';
      
      currentY += blockH + groupPadding;
      position++;
    });
    
    // Footer - posizionato dopo l'ultimo gruppo
    const footerY = currentY + 10;
    ctx.fillStyle = '#E0E0E0'; ctx.fillRect(45, footerY, W - 90, 2);
    ctx.fillStyle = '#666666'; ctx.font = '15px Arial';
    ctx.fillText(`📊 ${data.length} partecipanti • ${totIns} contratti`, 50, footerY + 28);
    ctx.textAlign = 'right'; ctx.fillText('LEADER RANKING', W - 50, footerY + 28);
    ctx.textAlign = 'left';
    ctx.fillStyle = config.color; ctx.fillRect(35, footerY + 45, W - 70, 4);
    
    return canvas.toDataURL('image/png');
  };

  const generatePNG_Exclusive = () => {
    const data = getData(); if (!data.length) return null;
    const config = getConfig(), labels = getLabels();
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;
    
    // Background - ELEGANTE con sfumatura verde NWG (come NW)
    const bg = ctx.createLinearGradient(0, 0, 0, H); 
    bg.addColorStop(0, '#FFFFFF'); 
    bg.addColorStop(0.3, 'rgba(42,170,138,0.03)'); 
    bg.addColorStop(0.7, 'rgba(42,170,138,0.05)'); 
    bg.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `${config.color}60`; ctx.lineWidth = 3; ctx.strokeRect(18, 18, W - 36, H - 36);
    ctx.strokeStyle = `${config.color}30`; ctx.lineWidth = 1; ctx.strokeRect(28, 28, W - 56, H - 56);
    
    // Header bar
    const hg = ctx.createLinearGradient(0, 0, W, 0); hg.addColorStop(0, 'transparent'); hg.addColorStop(0.15, config.color); hg.addColorStop(0.85, config.color); hg.addColorStop(1, 'transparent');
    ctx.fillStyle = hg; ctx.fillRect(45, 45, W - 90, 4);
    
    // Title - NERO
    ctx.fillStyle = '#333333'; ctx.font = 'bold 40px Arial'; ctx.textAlign = 'center';
    ctx.fillText(`${config.emoji} CLASSIFICA ${config.label} ${config.emoji}`, W/2, 105);
    ctx.fillStyle = '#666666'; ctx.font = '18px Arial';
    ctx.fillText(`${eventName} • ${eventDate}`, W/2, 138);
    
    // Stats - INLINE format
    const totIns = getClassificaTotal(), totAcc = getData().reduce((sum, [,s]) => sum + s.v2, 0), pct = Math.round(totAcc / totIns * 100) || 0;
    ctx.fillStyle = 'rgba(42,170,138,0.1)'; ctx.beginPath(); ctx.roundRect(W/2 - 175, 158, 350, 42, 8); ctx.fill();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#333333'; ctx.fillText(`${totIns} INS.`, W/2 - 85, 186);
    ctx.fillStyle = pct >= 50 ? '#4CAF50' : '#FF8F00'; ctx.fillText(`${pct}%`, W/2, 186);
    ctx.fillStyle = '#4CAF50'; ctx.fillText(`${totAcc} ACC.`, W/2 + 85, 186);
    ctx.textAlign = 'left';
    
    // Cards - STILE NUOVO (sfondo verde, testo nero)
    const startY = 225, footerY = H - 70, availH = footerY - startY - 15, cardH = Math.min(135, availH / data.length - 12);
    
    data.forEach(([name, s], i) => {
      const y = startY + i * (cardH + 12), isTop3 = i < 3, pctM = s.v1 > 0 ? Math.round(s.v2 / s.v1 * 100) : 0;
      
      // Card background - VERDE per top 3, grigio per altri
      const grad = ctx.createLinearGradient(55, y, W - 55, y);
      if (isTop3) { 
        grad.addColorStop(0, 'rgba(42,170,138,0.18)'); 
        grad.addColorStop(1, 'rgba(42,170,138,0.06)'); 
      } else { 
        grad.addColorStop(0, '#F5F5F5'); 
        grad.addColorStop(1, '#FCFCFC'); 
      }
      
      ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(55, y, W - 110, cardH, 12); ctx.fill();
      
      if (isTop3) {
        ctx.strokeStyle = 'rgba(42,170,138,0.4)';
        ctx.lineWidth = 2; ctx.stroke();
      }
      
      const centerY = y + cardH / 2, medals = ['🏆', '🥈', '🥉'];
      
      if (isTop3) {
        ctx.font = '38px Arial'; ctx.fillText(medals[i], 75, centerY + 14);
      }
      
      // Position e Nome - SEMPRE NERO
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 26px Arial';
      ctx.fillText(`${i + 1}°`, isTop3 ? 130 : 80, centerY + 10);
      
      // Name - NERO
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 26px Arial';
      ctx.fillText(name.toUpperCase(), isTop3 ? 185 : 130, centerY + 10);
      
      // Stats con label INLINE - NERO
      ctx.textAlign = 'right';
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 30px Arial';
      ctx.fillText(`${s.v1}`, W - 300, centerY + 5);
      ctx.fillStyle = '#999999'; ctx.font = '11px Arial';
      ctx.fillText('INS.', W - 300, centerY + 22);
      
      // Progress bar
      const barX = W - 270, barW = 105;
      ctx.fillStyle = '#E0E0E0'; ctx.beginPath(); ctx.roundRect(barX, centerY - 10, barW, 18, 5); ctx.fill();
      const barC = pctM >= 50 ? '#4CAF50' : pctM >= 20 ? '#FF8F00' : '#2AAA8A';
      ctx.fillStyle = barC; ctx.beginPath(); ctx.roundRect(barX, centerY - 10, Math.max(barW * pctM / 100, 1), 18, 5); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = 'bold 12px Arial'; ctx.textAlign = 'center';
      ctx.fillText(`${pctM}%`, barX + barW / 2, centerY + 4);
      
      // Accettati - VERDE
      ctx.textAlign = 'right';
      ctx.fillStyle = '#4CAF50'; ctx.font = 'bold 30px Arial';
      ctx.fillText(`${s.v2}`, W - 75, centerY + 5);
      ctx.fillStyle = '#999999'; ctx.font = '11px Arial';
      ctx.fillText('ACC.', W - 75, centerY + 22);
      ctx.textAlign = 'left';
    });
    
    // Footer
    ctx.fillStyle = '#E0E0E0'; ctx.fillRect(55, footerY, W - 110, 1);
    ctx.fillStyle = '#999999'; ctx.font = '15px Arial';
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

  const handleSendToBot = async (confirmed = false) => {
    // K Manager: messaggio ironico
    if (user.role === 'k') {
      alert('🚫 Ehi campione! Questo bottone è riservato ai Supremi Amministratori.\n\nSe vuoi l\'automazione anche per te, contatta il Genio Creatore Andrea Tiesi 🧞‍♂️\n\nNel frattempo... scarica l\'immagine e postala tu, che fa bene ai muscoli delle dita! 💪');
      return;
    }
    
    // Assistente: mostra conferma
    if (user.role === 'assistente' && !confirmed) {
      setShowConfirmModal(true);
      return;
    }
    
    setSendStatus('Invio...');
    const img = generatePNG();  // Genera SEMPRE nuova immagine per la classifica corrente
    if (!img) { setSendStatus('Errore'); return; }
    const config = getConfig(), totIns = getClassificaTotal(), totAcc = getData().reduce((sum, [,s]) => sum + s.v2, 0);
    
    // Converti base64 in Blob
    const base64Data = img.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    
    // Upload immagine su catbox.moe (no CORS issues)
    let imageUrl = '';
    try {
      setSendStatus('Upload immagine...');
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', blob, 'classifica.png');
      
      const uploadRes = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
      });
      
      if (uploadRes.ok) {
        const urlText = await uploadRes.text();
        if (urlText.startsWith('https://')) {
          imageUrl = urlText.trim();
          console.log('Upload Catbox OK:', imageUrl);
        }
      }
    } catch (uploadErr) {
      console.log('Errore upload Catbox:', uploadErr);
    }
    
    // Se catbox fallisce, prova litterbox (file temporanei 1h)
    if (!imageUrl) {
      try {
        setSendStatus('Upload alternativo...');
        const formData2 = new FormData();
        formData2.append('reqtype', 'fileupload');
        formData2.append('time', '1h');
        formData2.append('fileToUpload', blob, 'classifica.png');
        
        const uploadRes2 = await fetch('https://litterbox.catbox.moe/resources/internals/api.php', {
          method: 'POST',
          body: formData2
        });
        
        if (uploadRes2.ok) {
          const urlText2 = await uploadRes2.text();
          if (urlText2.startsWith('https://')) {
            imageUrl = urlText2.trim();
            console.log('Upload Litterbox OK:', imageUrl);
          }
        }
      } catch (uploadErr2) {
        console.log('Errore upload Litterbox:', uploadErr2);
      }
    }
    
    setSendStatus('Invio webhook...');
    
    // Se non abbiamo URL, non inviare (evita errori su Make)
    if (!imageUrl) {
      setSendStatus('❌ Upload fallito');
      setTimeout(() => setSendStatus(''), 3000);
      return;
    }
    
    try {
      const webhookData = {
        source: 'leader_ranking_app',
        timestamp: new Date().toISOString(),
        ranking_type: selectedRanking,
        ranking_label: config.label,
        ranking_category: config.category,
        event_name: eventName,
        event_date: eventDate,
        period_type: periodType,
        csv_type: csvType,
        exclude_k: excludeK,
        image_url: imageUrl,
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
      };
      
      await fetch(WEBHOOK_URL, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });
      
      setSendStatus('✅ Inviato!');
      setTimeout(() => setSendStatus(''), 3000);
    } catch (e) { 
      console.log('Errore webhook:', e);
      setSendStatus('❌ Errore'); 
      setTimeout(() => setSendStatus(''), 3000); 
    }
  };

  // FUNZIONE DOWNLOAD REPORT PNG
  const downloadReportPNG = () => {
    if (!reportData || !reportData.pilastri) return alert('Nessun report da scaricare');
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1200, H = 1600;
    canvas.width = W; canvas.height = H;
    
    // Background elegante
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);
    
    // Border
    ctx.strokeStyle = '#2AAA8A';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    
    // Header
    ctx.fillStyle = '#2AAA8A';
    ctx.fillRect(40, 40, W - 80, 80);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('📊 REPORT AGGREGATO', W/2, 95);
    
    let y = 160;
    
    // FV
    if (reportData.pilastri.fv) {
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('☀️ FOTOVOLTAICO', 50, y);
      ctx.font = '18px Arial';
      ctx.fillText(`Inseriti: ${reportData.pilastri.fv.totale} | Positivi: ${reportData.pilastri.fv.funnel.positivi} (${reportData.pilastri.fv.funnel.pctPositivi}%) | Persi: ${reportData.pilastri.fv.funnel.negativi}`, 50, y + 30);
      y += 80;
    }
    
    // LA
    if (reportData.pilastri.energy) {
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('⚡ LUCE AMICA', 50, y);
      ctx.font = '18px Arial';
      ctx.fillText(`Inseriti: ${reportData.pilastri.energy.totale} | Accettati: ${reportData.pilastri.energy.funnel.accettati} (${reportData.pilastri.energy.funnel.pctAccettati}%)`, 50, y + 30);
      y += 80;
    }
    
    // COLLABORATORI
    if (reportData.pilastri.collaboratori) {
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('🎓 COLLABORATORI', 50, y);
      ctx.font = '18px Arial';
      ctx.fillText(`Iscritti: ${reportData.pilastri.collaboratori.funnel.iscritti} | Presenti: ${reportData.pilastri.collaboratori.funnel.presenti} | Attivati: ${reportData.pilastri.collaboratori.funnel.attivati}`, 50, y + 30);
      y += 80;
    }
    
    // Alert
    if (reportData.alertDaAttivare) {
      ctx.fillStyle = '#E53935';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('🚨 ALERT DA ATTIVARE', 50, y);
      ctx.font = '18px Arial';
      ctx.fillStyle = '#333333';
      ctx.fillText(`Verde (0-30g): ${reportData.alertDaAttivare.verde.length} | Giallo (31-60g): ${reportData.alertDaAttivare.giallo.length} | Rosso (>60g): ${reportData.alertDaAttivare.rosso.length}`, 50, y + 30);
      y += 80;
    }
    
    // Footer
    ctx.fillStyle = '#999999';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Leader Ranking v13.5 • ${new Date().toLocaleDateString('it-IT')}`, W/2, H - 40);
    
    // Download
    const link = document.createElement('a');
    link.download = `report_aggregato_${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // COMPONENTE REPORT RESULTS - Layout completo con tutti i pilastri
  // ═══════════════════════════════════════════════════════════════════════════════
  const ReportResultsComponent = ({ reportData }) => {
    if (!reportData || !reportData.pilastri) return null;
    
    const STATO_COLORS_DISPLAY = {
      positivo: '#4CAF50', lavorazione: '#FFD700', lavorabile: '#FFD700', 
      negativo: '#E53935', meno: '#E53935', attivo: '#4CAF50', perso: '#E53935', altro: '#999999'
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* CALENDARIO CON DRILL-DOWN */}
        {Object.keys(reportData.heatmapMesi).length > 0 && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <h3 style={{ color: '#2AAA8A', fontSize: 16, margin: 0, fontWeight: 700 }}>🗓️ CALENDARIO ATTIVITÀ</h3>
              {heatmapDrilldown && (
                <button 
                  onClick={() => setHeatmapDrilldown(null)}
                  style={{ padding: '6px 12px', background: '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: 6, fontSize: 11, cursor: 'pointer', color: '#666' }}
                >
                  ← Torna ai mesi
                </button>
              )}
            </div>
            
            {!heatmapDrilldown ? (
              /* VISTA MESI - Cliccabile */
              <>
                {/* LEGENDA COLORI + SPIEGAZIONE ORARI */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ fontSize: 10, color: '#888', fontStyle: 'italic' }}>
                    💡 Il numero piccolo sotto indica la <strong>fascia oraria più produttiva</strong> (es. 09-12 = mattina)
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#4CAF50' }} /><span style={{ fontSize: 10, color: '#666' }}>Caldo</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FFD700' }} /><span style={{ fontSize: 10, color: '#666' }}>Tiepido</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FF8F00' }} /><span style={{ fontSize: 10, color: '#666' }}>Freddo</span></div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 15 }}>
                  {Object.entries(reportData.heatmapMesi).map(([type, heatData]) => {
                    const info = { 
                      fv: { emoji: '☀️', label: 'Fotovoltaico', color: '#2AAA8A' }, 
                      energy: { emoji: '⚡', label: 'Luce Amica', color: '#FFD700' }, 
                      consultings: { emoji: '🎓', label: 'Seminari', color: '#9C27B0' },
                      presenti: { emoji: '✅', label: 'Presenti', color: '#4CAF50' },
                      ivd: { emoji: '🟠', label: 'Attivati', color: '#FF9800' } 
                    }[type];
                    if (!info) return null;
                    const mesiNomi = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
                    const maxMese = Math.max(...heatData.mesi, 1);
                    const totale = heatData.mesi.reduce((a,b) => a+b, 0);
                    const mesiConDati = heatData.mesi.filter(v => v > 0).length;
                    const media = mesiConDati > 0 ? Math.round(totale / mesiConDati) : 0;
                    
                    // Miglior mese
                    const bestMeseIdx = heatData.mesi.indexOf(Math.max(...heatData.mesi));
                    const bestMese = heatData.mesi[bestMeseIdx] > 0 ? mesiNomi[bestMeseIdx] : '-';
                    
                    // Miglior orario dell'anno (somma tutti i mesi)
                    const orariLabels = ['00-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'];
                    const orariKeys = ['notte', 'mattinaPrima', 'mattina', 'pranzo', 'pomeriggio', 'sera', 'notturno'];
                    const totaliOrari = { notte: 0, mattinaPrima: 0, mattina: 0, pranzo: 0, pomeriggio: 0, sera: 0, notturno: 0 };
                    Object.values(heatData.orariPerMese || {}).forEach(orari => {
                      orariKeys.forEach(key => { totaliOrari[key] += orari[key] || 0; });
                    });
                    let bestOrarioIdx = 2; // default mattina
                    let maxOrarioVal = 0;
                    orariKeys.forEach((key, idx) => {
                      if (totaliOrari[key] > maxOrarioVal) { maxOrarioVal = totaliOrari[key]; bestOrarioIdx = idx; }
                    });
                    const bestOrario = maxOrarioVal > 0 ? orariLabels[bestOrarioIdx] : '-';
                    
                    // Calcola best hour per ogni mese
                    const bestHourPerMonth = {};
                    mesiNomi.forEach((_, i) => {
                      const orari = heatData.orariPerMese?.[i];
                      if (orari) {
                        let maxVal = 0, bestIdx = 2;
                        orariKeys.forEach((key, idx) => {
                          if (orari[key] > maxVal) { maxVal = orari[key]; bestIdx = idx; }
                        });
                        if (maxVal > 0) bestHourPerMonth[i] = orariLabels[bestIdx];
                      }
                    });
                    
                    // Anno dai dati (non corrente!)
                    const annoDati = heatData.anno || new Date().getFullYear();
                    
                    // Filtra solo mesi con dati
                    const mesiDaMostrare = heatData.mesiConDati || heatData.mesi.map((v, i) => v > 0 ? i : -1).filter(i => i >= 0);
                    const numMesiAttivi = mesiDaMostrare.length;
                    
                    return (
                      <div key={type} style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: '1px solid #E8E8E8' }}>
                        {/* Header con stats e anno */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                          <div>
                            <div style={{ fontSize: 13, color: info.color, fontWeight: 600 }}>{info.emoji} {info.label}</div>
                            <div style={{ fontSize: 9, color: '#999' }}>Anno {annoDati} • {numMesiAttivi} mesi caricati</div>
                          </div>
                          <div style={{ display: 'flex', gap: 8, fontSize: 9, color: '#666' }}>
                            <span title="Media mensile">📊 {media}/mese</span>
                            <span title="Miglior mese">🏆 {bestMese}</span>
                            <span title="Miglior orario">🕐 {bestOrario}</span>
                          </div>
                        </div>
                        {/* Griglia DINAMICA - solo mesi con dati */}
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(numMesiAttivi, 6)}, 1fr)`, gap: 4 }}>
                          {mesiDaMostrare.map((meseIdx) => {
                            const val = heatData.mesi[meseIdx];
                            const intensity = val / maxMese;
                            const bgColor = val === 0 ? '#F0F0F0' : intensity > 0.7 ? '#4CAF50' : intensity > 0.3 ? '#FFD700' : '#FF8F00';
                            return (
                              <div 
                                key={meseIdx} 
                                onClick={() => val > 0 && setHeatmapDrilldown({ type, mese: meseIdx, label: mesiNomi[meseIdx], data: heatData, anno: annoDati })}
                                style={{ 
                                  height: 46, 
                                  borderRadius: 6, 
                                  background: bgColor, 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  cursor: val > 0 ? 'pointer' : 'default',
                                  transition: 'all 0.2s ease',
                                  border: val > 0 ? '2px solid transparent' : 'none'
                                }}
                                onMouseOver={e => { if (val > 0) e.currentTarget.style.transform = 'scale(1.05)'; }}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                              >
                                <span style={{ fontSize: 9, color: val === 0 ? '#AAA' : '#FFF', fontWeight: 600 }}>{mesiNomi[meseIdx]}</span>
                                {val > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: '#FFF' }}>{val}</span>}
                                {bestHourPerMonth[meseIdx] && <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.8)' }}>{bestHourPerMonth[meseIdx]}</span>}
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <span style={{ fontSize: 10, color: '#999' }}>Clicca un mese per dettagli</span>
                          <span style={{ fontSize: 12, color: '#666' }}>Totale: <strong style={{ color: info.color }}>{heatData.mesi.reduce((a,b) => a+b, 0)}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* DRILL-DOWN: Giorni + Settimane + Orari del mese selezionato */
              (() => {
                const { type, mese, label, data: heatData, anno } = heatmapDrilldown;
                const annoDrilldown = anno || heatData.anno || new Date().getFullYear();
                const info = { fv: { emoji: '☀️', label: 'Fotovoltaico', color: '#2AAA8A' }, energy: { emoji: '⚡', label: 'Luce Amica', color: '#FFD700' }, consultings: { emoji: '🎓', label: 'Seminari', color: '#9C27B0' }, presenti: { emoji: '✅', label: 'Presenti', color: '#4CAF50' }, ivd: { emoji: '🟠', label: 'Attivati', color: '#FF9800' } }[type];
                const giorni = heatData.giorniPerMese?.[mese] || Array(31).fill(0);
                const settimane = heatData.settimanePerMese?.[mese] || Array(5).fill(0);
                const orari = heatData.orariPerMese?.[mese] || { notte: 0, mattinaPrima: 0, mattina: 0, pranzo: 0, pomeriggio: 0, sera: 0, notturno: 0 };
                const maxGiorno = Math.max(...giorni, 1);
                const maxSettimana = Math.max(...settimane, 1);
                const orariArray = [
                  { label: '00-06', val: orari.notte, emoji: '🌙' },
                  { label: '06-09', val: orari.mattinaPrima, emoji: '🌅' },
                  { label: '09-12', val: orari.mattina, emoji: '☀️' },
                  { label: '12-15', val: orari.pranzo, emoji: '🍽️' },
                  { label: '15-18', val: orari.pomeriggio, emoji: '🌤️' },
                  { label: '18-21', val: orari.sera, emoji: '🌆' },
                  { label: '21-24', val: orari.notturno, emoji: '🌙' }
                ];
                const maxOrario = Math.max(...orariArray.map(o => o.val), 1);
                
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <div style={{ background: `linear-gradient(135deg, ${info.color}15, ${info.color}05)`, borderRadius: 12, padding: 15, border: `1px solid ${info.color}30` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 14, color: info.color, fontWeight: 700, marginBottom: 5 }}>
                            {info.emoji} {info.label} - {label.toUpperCase()} {annoDrilldown}
                          </div>
                          <div style={{ fontSize: 24, fontWeight: 800, color: '#333' }}>{heatData.mesi[mese]} contratti</div>
                        </div>
                        {/* Legenda */}
                        <div style={{ display: 'flex', gap: 10, fontSize: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#4CAF50' }} /><span style={{ color: '#666' }}>Caldo</span></div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FFD700' }} /><span style={{ color: '#666' }}>Tiepido</span></div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FF8F00' }} /><span style={{ color: '#666' }}>Freddo</span></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* SETTIMANE */}
                    <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15 }}>
                      <div style={{ fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 10 }}>📅 SETTIMANE</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                        {settimane.map((val, i) => {
                          const intensity = val / maxSettimana;
                          const bgColor = val === 0 ? '#F0F0F0' : intensity > 0.7 ? '#4CAF50' : intensity > 0.3 ? '#FFD700' : '#FF8F00';
                          return (
                            <div key={i} style={{ background: bgColor, borderRadius: 8, padding: '12px 8px', textAlign: 'center' }}>
                              <div style={{ fontSize: 10, color: val === 0 ? '#AAA' : '#FFF' }}>Sett {i+1}</div>
                              <div style={{ fontSize: 18, fontWeight: 700, color: val === 0 ? '#CCC' : '#FFF' }}>{val}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* ORARI */}
                    <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15 }}>
                      <div style={{ fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 10 }}>🕐 FASCE ORARIE</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                        {orariArray.map((o, i) => {
                          const intensity = o.val / maxOrario;
                          const bgColor = o.val === 0 ? '#F0F0F0' : intensity > 0.7 ? '#2AAA8A' : intensity > 0.3 ? '#4DB6AC' : '#B2DFDB';
                          return (
                            <div key={i} style={{ background: bgColor, borderRadius: 8, padding: '10px 4px', textAlign: 'center' }}>
                              <div style={{ fontSize: 14 }}>{o.emoji}</div>
                              <div style={{ fontSize: 9, color: o.val === 0 ? '#AAA' : '#FFF', marginTop: 2 }}>{o.label}</div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: o.val === 0 ? '#CCC' : '#FFF' }}>{o.val}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* GIORNI DEL MESE */}
                    <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15 }}>
                      <div style={{ fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 10 }}>📆 GIORNI DEL MESE</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                        {giorni.slice(0, 31).map((val, i) => {
                          const intensity = val / maxGiorno;
                          const bgColor = val === 0 ? '#F5F5F5' : intensity > 0.7 ? '#4CAF50' : intensity > 0.3 ? '#FFD700' : '#FF8F00';
                          return (
                            <div key={i} style={{ height: 36, borderRadius: 4, background: bgColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: 8, color: val === 0 ? '#AAA' : '#FFF' }}>{i+1}</span>
                              {val > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: '#FFF' }}>{val}</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}
        
        {/* PILASTRO FOTOVOLTAICO */}
        {reportData.pilastri.fv && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>☀️</span>
              <div>
                <h3 style={{ color: '#2AAA8A', fontSize: 20, margin: 0, fontWeight: 700 }}>PILASTRO FOTOVOLTAICO</h3>
                <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Totale inseriti: {reportData.pilastri.fv.totale}</p>
              </div>
            </div>
            
            {/* FUNNEL GRANDE - CON TUTTE LE % */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, marginBottom: 25, flexWrap: 'wrap', padding: '15px 0' }}>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#2AAA8A' }}>{reportData.pilastri.fv.funnel.inseriti}</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Inseriti</div>
              </div>
              <div style={{ fontSize: 28, color: '#D0D0D0' }}>→</div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.fv.funnel.positivi}</div>
                <div style={{ fontSize: 13, color: '#333', marginTop: 4 }}>Positivi <span style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600 }}>({reportData.pilastri.fv.funnel.pctPositivi}%)</span></div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#FFD700' }}>{reportData.pilastri.fv.funnel.lavorazione}</div>
                <div style={{ fontSize: 13, color: '#333', marginTop: 4 }}>Lavoraz. <span style={{ fontSize: 11, color: '#FF8F00', fontWeight: 600 }}>({reportData.pilastri.fv.funnel.inseriti > 0 ? Math.round(reportData.pilastri.fv.funnel.lavorazione / reportData.pilastri.fv.funnel.inseriti * 100) : 0}%)</span></div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#E53935' }}>{reportData.pilastri.fv.funnel.negativi}</div>
                <div style={{ fontSize: 13, color: '#333', marginTop: 4 }}>Persi <span style={{ fontSize: 11, color: '#E53935', fontWeight: 600 }}>({reportData.pilastri.fv.funnel.pctNegativi}%)</span></div>
              </div>
            </div>
            
            {/* DETTAGLIO STATI RAGGRUPPATI PER COLORE */}
            <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}>📋 DETTAGLIO STATI</div>
              {(() => {
                const statiVerdi = reportData.pilastri.fv.statiDettaglio.filter(([stato]) => {
                  const cat = Object.entries(STATO_MAP_FV).find(([k]) => k.toLowerCase() === stato.toLowerCase())?.[1] || 'altro';
                  return cat === 'positivo';
                });
                const statiGialli = reportData.pilastri.fv.statiDettaglio.filter(([stato]) => {
                  const cat = Object.entries(STATO_MAP_FV).find(([k]) => k.toLowerCase() === stato.toLowerCase())?.[1] || 'altro';
                  return cat === 'lavorazione';
                });
                const statiRossi = reportData.pilastri.fv.statiDettaglio.filter(([stato]) => {
                  const cat = Object.entries(STATO_MAP_FV).find(([k]) => k.toLowerCase() === stato.toLowerCase())?.[1] || 'altro';
                  return cat === 'negativo' || cat === 'altro';
                });
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {/* POSITIVI - VERDE */}
                    {statiVerdi.length > 0 && (
                      <div style={{ background: 'rgba(76,175,80,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(76,175,80,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}>🟢 POSITIVI ({statiVerdi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {statiVerdi.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
                              {stato} <strong style={{ color: '#4CAF50' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* LAVORAZIONE - GIALLO */}
                    {statiGialli.length > 0 && (
                      <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,215,0,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#FF8F00', fontWeight: 600, marginBottom: 8 }}>🟡 LAVORAZIONE ({statiGialli.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {statiGialli.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FFD700' }}>
                              {stato} <strong style={{ color: '#FF8F00' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* NEGATIVI - ROSSO */}
                    {statiRossi.length > 0 && (
                      <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(229,57,53,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#E53935', fontWeight: 600, marginBottom: 8 }}>🔴 NEGATIVI ({statiRossi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {statiRossi.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #E53935' }}>
                              {stato} <strong style={{ color: '#E53935' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
            
            {/* CLASSIFICHE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { title: 'K MANAGER', emoji: '👑', data: reportData.pilastri.fv.classifiche.k, color: '#FFD700' },
                { title: 'NETWORKER', emoji: '⭐', data: reportData.pilastri.fv.classifiche.nw, color: '#2AAA8A' },
                { title: 'SDP', emoji: '🔵', data: reportData.pilastri.fv.classifiche.sdp, color: '#2196F3' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: '#FAFAFA', borderRadius: 12, padding: 12, border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 12, color: color, fontWeight: 600, marginBottom: 8 }}>{emoji} {title}</div>
                  <div style={{ maxHeight: 180, overflowY: 'auto', paddingRight: 10 }}>
                    {data.slice(0, 10).map(([name, stats], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F0F0F0', fontSize: 11 }}>
                        <span style={{ color: '#333', fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                        <div style={{ display: 'flex', gap: 10, minWidth: 70, justifyContent: 'flex-end' }}>
                          <span style={{ color: '#4CAF50', fontWeight: 600 }}>{stats.positivo || 0}</span>
                          <span style={{ color: '#FFD700' }}>{stats.lavorazione || 0}</span>
                          <span style={{ color: '#E53935' }}>{stats.negativo || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* PILASTRO LUCE AMICA */}
        {reportData.pilastri.energy && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>⚡</span>
              <div>
                <h3 style={{ color: '#FFD700', fontSize: 20, margin: 0, fontWeight: 700 }}>PILASTRO LUCE AMICA</h3>
                <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Totale inseriti: {reportData.pilastri.energy.totale}</p>
              </div>
            </div>
            
            {/* FUNNEL GRANDE */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 25, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#2AAA8A' }}>{reportData.pilastri.energy.funnel.inseriti}</div>
                <div style={{ fontSize: 12, color: '#666' }}>📋 Inseriti</div>
              </div>
              <div style={{ fontSize: 24, color: '#E0E0E0' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.energy.funnel.accettati}</div>
                <div style={{ fontSize: 12, color: '#4CAF50' }}>🟢 Accettati <span style={{ fontSize: 10 }}>({reportData.pilastri.energy.funnel.pctAccettati}%)</span></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#FFD700' }}>{reportData.pilastri.energy.funnel.lavorabili}</div>
                <div style={{ fontSize: 12, color: '#FFD700' }}>🟡 Lavorabili</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#E53935' }}>{reportData.pilastri.energy.funnel.persi}</div>
                <div style={{ fontSize: 12, color: '#E53935' }}>🔴 Persi</div>
              </div>
            </div>
            
            {/* DETTAGLIO STATI - STESSO STILE DI FV */}
            <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}>📋 DETTAGLIO STATI</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* NWG SPA - Raggruppati per colore */}
                {(() => {
                  const positivi = reportData.pilastri.energy.statiNwgSpa.filter(([s]) => STATO_MAP_LA_SPA[s] === 'positivo');
                  const lavorabili = reportData.pilastri.energy.statiNwgSpa.filter(([s]) => STATO_MAP_LA_SPA[s] === 'lavorabile');
                  const negativi = reportData.pilastri.energy.statiNwgSpa.filter(([s]) => STATO_MAP_LA_SPA[s] === 'meno' || !STATO_MAP_LA_SPA[s] || STATO_MAP_LA_SPA[s] === 'altro');
                  return (<>
                    {/* POSITIVI */}
                    {positivi.length > 0 && (
                      <div style={{ background: 'rgba(76,175,80,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(76,175,80,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}>🟢 NWG SPA - POSITIVI ({positivi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {positivi.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
                              {stato} <strong style={{ color: '#4CAF50' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* LAVORABILI */}
                    {lavorabili.length > 0 && (
                      <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,215,0,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#FF8F00', fontWeight: 600, marginBottom: 8 }}>🟡 NWG SPA - LAVORABILI ({lavorabili.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {lavorabili.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FFD700' }}>
                              {stato} <strong style={{ color: '#FF8F00' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* NEGATIVI */}
                    {negativi.length > 0 && (
                      <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(229,57,53,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#E53935', fontWeight: 600, marginBottom: 8 }}>🔴 NWG SPA - NEGATIVI ({negativi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {negativi.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #E53935' }}>
                              {stato} <strong style={{ color: '#E53935' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>);
                })()}
                
                {/* NWG ENERGIA - Raggruppati per colore */}
                {(() => {
                  const attivi = reportData.pilastri.energy.statiNwgEnergia.filter(([s]) => {
                    const cat = STATO_MAP_LA_ENERGIA[s] || STATO_MAP_LA_ENERGIA[s?.toUpperCase()];
                    return cat === 'positivo';
                  });
                  const daAttivare = reportData.pilastri.energy.statiNwgEnergia.filter(([s]) => {
                    const cat = STATO_MAP_LA_ENERGIA[s] || STATO_MAP_LA_ENERGIA[s?.toUpperCase()];
                    return cat === 'lavorabile';
                  });
                  const cessati = reportData.pilastri.energy.statiNwgEnergia.filter(([s]) => {
                    const cat = STATO_MAP_LA_ENERGIA[s] || STATO_MAP_LA_ENERGIA[s?.toUpperCase()];
                    return cat === 'meno' || !cat;
                  });
                  return (<>
                    {attivi.length > 0 && (
                      <div style={{ background: 'rgba(76,175,80,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(76,175,80,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}>🟢 NWG ENERGIA - ATTIVI ({attivi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {attivi.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
                              {stato} <strong style={{ color: '#4CAF50' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {daAttivare.length > 0 && (
                      <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,215,0,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#FF8F00', fontWeight: 600, marginBottom: 8 }}>🟡 NWG ENERGIA - DA ATTIVARE ({daAttivare.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {daAttivare.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FFD700' }}>
                              {stato} <strong style={{ color: '#FF8F00' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {cessati.length > 0 && (
                      <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(229,57,53,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#E53935', fontWeight: 600, marginBottom: 8 }}>🔴 NWG ENERGIA - CESSATI ({cessati.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {cessati.map(([stato, count], i) => (
                            <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #E53935' }}>
                              {stato} <strong style={{ color: '#E53935' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>);
                })()}
              </div>
            </div>
            
            {/* CLASSIFICHE LA - CON 3 COLONNE COME FV */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { title: 'K MANAGER', emoji: '👑', data: reportData.pilastri.energy.classifiche.k, color: '#FFD700' },
                { title: 'NETWORKER', emoji: '⭐', data: reportData.pilastri.energy.classifiche.nw, color: '#2AAA8A' },
                { title: 'SDP', emoji: '🔵', data: reportData.pilastri.energy.classifiche.sdp, color: '#2196F3' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: '#FAFAFA', borderRadius: 12, padding: 12, border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 12, color: color, fontWeight: 600, marginBottom: 8 }}>{emoji} {title}</div>
                  <div style={{ maxHeight: 180, overflowY: 'auto', paddingRight: 10 }}>
                    {data.slice(0, 10).map(([name, stats], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F0F0F0', fontSize: 11 }}>
                        <span style={{ color: '#333', fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                        <div style={{ display: 'flex', gap: 10, minWidth: 70, justifyContent: 'flex-end' }}>
                          <span style={{ color: '#4CAF50', fontWeight: 600 }}>{stats.positivo || 0}</span>
                          <span style={{ color: '#FFD700' }}>{stats.lavorabile || 0}</span>
                          <span style={{ color: '#E53935' }}>{stats.meno || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* PILASTRO COLLABORATORI */}
        {reportData.pilastri.collaboratori && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>🎓</span>
              <div>
                <h3 style={{ color: '#2AAA8A', fontSize: 20, margin: 0, fontWeight: 700 }}>PILASTRO COLLABORATORI</h3>
                <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Funnel: Iscritti → Presenti → Attivati</p>
              </div>
            </div>
            
            {/* FUNNEL */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 25, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#2AAA8A' }}>{reportData.pilastri.collaboratori.funnel.iscritti}</div>
                <div style={{ fontSize: 12, color: '#666' }}>📝 Iscritti</div>
              </div>
              <div style={{ fontSize: 24, color: '#E0E0E0' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.funnel.presenti}</div>
                <div style={{ fontSize: 12, color: '#4CAF50' }}>✅ Presenti <span style={{ fontSize: 10 }}>({reportData.pilastri.collaboratori.funnel.pctPresenti}%)</span></div>
              </div>
              <div style={{ fontSize: 24, color: '#E0E0E0' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#FF9800' }}>{reportData.pilastri.collaboratori.funnel.attivati}</div>
                <div style={{ fontSize: 12, color: '#FF9800' }}>🟠 Attivati <span style={{ fontSize: 10 }}>({reportData.pilastri.collaboratori.funnel.pctAttivati}%)</span></div>
              </div>
            </div>
            
            {/* DETTAGLIO STATI COLLABORATORI */}
            {reportData.pilastri.collaboratori.statiDettaglio && reportData.pilastri.collaboratori.statiDettaglio.length > 0 && (
              <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}>📋 DETTAGLIO STATI</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(() => {
                    const iscritti = reportData.pilastri.collaboratori.statiDettaglio.filter(([s]) => s.toLowerCase().includes('iscritt'));
                    const presenti = reportData.pilastri.collaboratori.statiDettaglio.filter(([s]) => s.toLowerCase().includes('present'));
                    const attivati = reportData.pilastri.collaboratori.statiDettaglio.filter(([s]) => s.toLowerCase().includes('attiv'));
                    const altri = reportData.pilastri.collaboratori.statiDettaglio.filter(([s]) => 
                      !s.toLowerCase().includes('iscritt') && 
                      !s.toLowerCase().includes('present') && 
                      !s.toLowerCase().includes('attiv')
                    );
                    return (<>
                      {iscritti.length > 0 && (
                        <div style={{ background: 'rgba(42,170,138,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(42,170,138,0.3)' }}>
                          <div style={{ fontSize: 11, color: '#2AAA8A', fontWeight: 600, marginBottom: 8 }}>📝 ISCRITTI ({iscritti.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {iscritti.map(([stato, count], i) => (
                              <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #2AAA8A' }}>
                                {stato} <strong style={{ color: '#2AAA8A' }}>{count}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {presenti.length > 0 && (
                        <div style={{ background: 'rgba(76,175,80,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(76,175,80,0.3)' }}>
                          <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}>✅ PRESENTI ({presenti.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {presenti.map(([stato, count], i) => (
                              <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
                                {stato} <strong style={{ color: '#4CAF50' }}>{count}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {attivati.length > 0 && (
                        <div style={{ background: 'rgba(255,152,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,152,0,0.3)' }}>
                          <div style={{ fontSize: 11, color: '#FF9800', fontWeight: 600, marginBottom: 8 }}>🟠 ATTIVATI ({attivati.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {attivati.map(([stato, count], i) => (
                              <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FF9800' }}>
                                {stato} <strong style={{ color: '#FF9800' }}>{count}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {altri.length > 0 && (
                        <div style={{ background: 'rgba(158,158,158,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(158,158,158,0.3)' }}>
                          <div style={{ fontSize: 11, color: '#666', fontWeight: 600, marginBottom: 8 }}>📋 ALTRI ({altri.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {altri.map(([stato, count], i) => (
                              <span key={i} style={{ background: '#FFF', padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #9E9E9E' }}>
                                {stato} <strong style={{ color: '#666' }}>{count}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>);
                  })()}
                </div>
              </div>
            )}
            
            {/* CLASSIFICHE COLLAB */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { title: 'K MANAGER', emoji: '👑', data: reportData.pilastri.collaboratori.classifiche.k, color: '#FFD700' },
                { title: 'NETWORKER', emoji: '⭐', data: reportData.pilastri.collaboratori.classifiche.nw, color: '#2AAA8A' },
                { title: 'SDP', emoji: '🔵', data: reportData.pilastri.collaboratori.classifiche.sdp, color: '#2196F3' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: '#FAFAFA', borderRadius: 12, padding: 12, border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 12, color: color, fontWeight: 600, marginBottom: 8 }}>{emoji} {title}</div>
                  <div style={{ maxHeight: 180, overflowY: 'auto', paddingRight: 10 }}>
                    {data.slice(0, 10).map(([name, stats], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F0F0F0', fontSize: 11 }}>
                        <span style={{ color: '#333', fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                        <div style={{ display: 'flex', gap: 10, minWidth: 70, justifyContent: 'flex-end' }}>
                          <span style={{ color: '#2AAA8A' }}>{stats.iscritti || stats.total || 0}</span>
                          <span style={{ color: '#4CAF50' }}>{stats.presenti || 0}</span>
                          <span style={{ color: '#FF9800' }}>{stats.attivati || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ALERT + TRACKER COACHING - Layout 2 colonne */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 20 }}>
          {/* ALERT DA ATTIVARE - Con funnel + 3 liste separate */}
          {reportData.alertDaAttivare && reportData.alertDaAttivare.totale > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                <span style={{ fontSize: 24 }}>🚨</span>
                <div>
                  <h3 style={{ color: '#E53935', fontSize: 16, margin: 0, fontWeight: 700 }}>ALERT DA ATTIVARE</h3>
                  <p style={{ color: '#666', fontSize: 11, margin: 0 }}>Luce Amica in attesa NWG Energia (max 150g)</p>
                </div>
              </div>
              
              {/* FUNNEL NUMERI */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20, padding: 15, background: 'linear-gradient(90deg, rgba(76,175,80,0.1), rgba(255,215,0,0.1), rgba(229,57,53,0.1))', borderRadius: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#4CAF50' }}>{reportData.alertDaAttivare.verde.length}</div>
                  <div style={{ fontSize: 10, color: '#4CAF50' }}>🟢 0-30g</div>
                </div>
                <span style={{ fontSize: 20, color: '#CCC' }}>→</span>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#FF8F00' }}>{reportData.alertDaAttivare.giallo.length}</div>
                  <div style={{ fontSize: 10, color: '#FF8F00' }}>🟡 31-60g</div>
                </div>
                <span style={{ fontSize: 20, color: '#CCC' }}>→</span>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#E53935' }}>{reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length}</div>
                  <div style={{ fontSize: 10, color: '#E53935' }}>🔴 61-150g</div>
                </div>
                <span style={{ fontSize: 20, color: '#CCC' }}>→</span>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#666' }}>{reportData.alertDaAttivare.rosso.filter(a => a.giorni > 150).length}</div>
                  <div style={{ fontSize: 10, color: '#666' }}>⚫ Persi</div>
                </div>
              </div>
              
              {/* 3 SEZIONI SEPARATE SCARICABILI */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* VERDE 0-30g */}
                <div style={{ background: 'rgba(76,175,80,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(76,175,80,0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: '#4CAF50', fontWeight: 600 }}>🟢 VERDE (0-30g): {reportData.alertDaAttivare.verde.length}</span>
                    <button onClick={() => {
                      const csv = 'Cliente;Intermediario;Giorni\n' + reportData.alertDaAttivare.verde.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
                      const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                      const link = document.createElement('a'); link.href = url; link.download = 'alert_verde_0-30g.csv'; link.click();
                    }} style={{ padding: '4px 8px', background: '#4CAF50', color: '#FFF', border: 'none', borderRadius: 4, fontSize: 10, cursor: 'pointer' }}>📥 CSV</button>
                  </div>
                  {/* Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, fontSize: 9, color: '#666', marginBottom: 4, padding: '0 4px' }}>
                    <span>Cliente</span><span>Intermediario</span><span style={{ textAlign: 'right' }}>Giorni</span>
                  </div>
                  <div style={{ maxHeight: 100, overflowY: 'auto', fontSize: 10, paddingRight: 8 }}>
                    {reportData.alertDaAttivare.verde.slice(0,6).map((a,i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px', gap: 8, padding: '4px', color: '#333', background: i % 2 === 0 ? 'transparent' : 'rgba(76,175,80,0.05)', borderRadius: 4 }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.cliente}</span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#666' }}>{a.intermediario}</span>
                        <span style={{ textAlign: 'right', color: '#4CAF50', fontWeight: 600 }}>{a.giorni}g</span>
                      </div>
                    ))}
                    {reportData.alertDaAttivare.verde.length > 6 && <div style={{ color: '#999', fontStyle: 'italic', padding: '4px' }}>...e altri {reportData.alertDaAttivare.verde.length - 6}</div>}
                  </div>
                </div>
                
                {/* GIALLO 31-60g */}
                <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,215,0,0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: '#FF8F00', fontWeight: 600 }}>🟡 GIALLO (31-60g): {reportData.alertDaAttivare.giallo.length}</span>
                    <button onClick={() => {
                      const csv = 'Cliente;Intermediario;Giorni\n' + reportData.alertDaAttivare.giallo.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
                      const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                      const link = document.createElement('a'); link.href = url; link.download = 'alert_giallo_31-60g.csv'; link.click();
                    }} style={{ padding: '4px 8px', background: '#FFD700', color: '#333', border: 'none', borderRadius: 4, fontSize: 10, cursor: 'pointer' }}>📥 CSV</button>
                  </div>
                  {/* Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, fontSize: 9, color: '#666', marginBottom: 4, padding: '0 4px' }}>
                    <span>Cliente</span><span>Intermediario</span><span style={{ textAlign: 'right' }}>Giorni</span>
                  </div>
                  <div style={{ maxHeight: 100, overflowY: 'auto', fontSize: 10, paddingRight: 8 }}>
                    {reportData.alertDaAttivare.giallo.slice(0,6).map((a,i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, padding: '4px', color: '#333', background: i % 2 === 0 ? 'transparent' : 'rgba(255,215,0,0.05)', borderRadius: 4 }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.cliente}</span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#666' }}>{a.intermediario}</span>
                        <span style={{ textAlign: 'right', color: '#FF8F00', fontWeight: 600 }}>{a.giorni}g</span>
                      </div>
                    ))}
                    {reportData.alertDaAttivare.giallo.length > 6 && <div style={{ color: '#999', fontStyle: 'italic', padding: '4px' }}>...e altri {reportData.alertDaAttivare.giallo.length - 6}</div>}
                  </div>
                </div>
                
                {/* ROSSO 61-150g */}
                <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(229,57,53,0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: '#E53935', fontWeight: 600 }}>🔴 ROSSO (61-150g): {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length}</span>
                    <button onClick={() => {
                      const filtered = reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150);
                      const csv = 'Cliente;Intermediario;Giorni\n' + filtered.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
                      const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                      const link = document.createElement('a'); link.href = url; link.download = 'alert_rosso_61-150g.csv'; link.click();
                    }} style={{ padding: '4px 8px', background: '#E53935', color: '#FFF', border: 'none', borderRadius: 4, fontSize: 10, cursor: 'pointer' }}>📥 CSV</button>
                  </div>
                  {/* Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, fontSize: 9, color: '#666', marginBottom: 4, padding: '0 4px' }}>
                    <span>Cliente</span><span>Intermediario</span><span style={{ textAlign: 'right' }}>Giorni</span>
                  </div>
                  <div style={{ maxHeight: 100, overflowY: 'auto', fontSize: 10, paddingRight: 8 }}>
                    {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).slice(0,6).map((a,i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, padding: '4px', color: '#333', background: i % 2 === 0 ? 'transparent' : 'rgba(229,57,53,0.05)', borderRadius: 4 }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.cliente}</span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#666' }}>{a.intermediario}</span>
                        <span style={{ textAlign: 'right', color: '#E53935', fontWeight: 600 }}>{a.giorni}g</span>
                      </div>
                    ))}
                    {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length > 6 && <div style={{ color: '#999', fontStyle: 'italic', padding: '4px' }}>...e altri {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length - 6}</div>}
                  </div>
                </div>
                
                {/* PERSI >150g - Da riformulare */}
                {reportData.alertDaAttivare.rosso.filter(a => a.giorni > 150).length > 0 && (
                  <div style={{ background: 'rgba(100,100,100,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(100,100,100,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>⚫ PERSI (&gt;150g - Da Riformulare): {reportData.alertDaAttivare.rosso.filter(a => a.giorni > 150).length}</span>
                      <button onClick={() => {
                        const filtered = reportData.alertDaAttivare.rosso.filter(a => a.giorni > 150);
                        const csv = 'Cliente;Intermediario;Giorni\n' + filtered.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
                        const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                        const link = document.createElement('a'); link.href = url; link.download = 'persi_da_riformulare_150g+.csv'; link.click();
                      }} style={{ padding: '4px 8px', background: '#666', color: '#FFF', border: 'none', borderRadius: 4, fontSize: 10, cursor: 'pointer' }}>📥 CSV</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* TRACKER COACHING */}
          {reportData.trackerCoaching && reportData.trackerCoaching.totale > 0 ? (
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>🎯</span>
                  <div>
                    <h3 style={{ color: '#2AAA8A', fontSize: 16, margin: 0, fontWeight: 700 }}>TRACKER COACHING</h3>
                    <p style={{ color: '#666', fontSize: 11, margin: 0 }}>Milestone nuovi IVD attivati ({reportData.trackerCoaching.totale} IVD)</p>
                  </div>
                </div>
                <button onClick={() => {
                  const csv = 'Nome IVD;Data Attivazione;Networker;LA (giorni);FV (giorni);Iscritto (giorni);Attivato (giorni)\n' + 
                    reportData.trackerCoaching.lista.map(t => 
                      `${t.nome};${t.dataAttivazione};${t.networker || '-'};${t.giorniLA !== null ? t.giorniLA : '-'};${t.giorniFV !== null ? t.giorniFV : '-'};${t.giorniIscritto !== null ? t.giorniIscritto : '-'};${t.giorniAttivato !== null ? t.giorniAttivato : '-'}`
                    ).join('\n');
                  const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                  const link = document.createElement('a'); link.href = url; link.download = 'tracker_coaching_completo.csv'; link.click();
                }} style={{ padding: '6px 12px', background: '#2AAA8A', color: '#FFF', border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>📥 Scarica CSV</button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 15 }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(42,170,138,0.1), rgba(42,170,138,0.02))', borderRadius: 8, padding: 10, textAlign: 'center', border: '1px solid rgba(42,170,138,0.2)' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>⚡ 1° LA</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#2AAA8A' }}>{reportData.trackerCoaching.medie.la !== null ? `${reportData.trackerCoaching.medie.la}g` : '-'}</div>
                  <div style={{ fontSize: 10, color: '#4CAF50', fontWeight: 600 }}>{reportData.trackerCoaching.completamento.la}% fatto</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.02))', borderRadius: 8, padding: 10, textAlign: 'center', border: '1px solid rgba(255,215,0,0.2)' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>☀️ 1° FV</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#FFD700' }}>{reportData.trackerCoaching.medie.fv !== null ? `${reportData.trackerCoaching.medie.fv}g` : '-'}</div>
                  <div style={{ fontSize: 10, color: '#4CAF50', fontWeight: 600 }}>{reportData.trackerCoaching.completamento.fv}% fatto</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, rgba(156,39,176,0.1), rgba(156,39,176,0.02))', borderRadius: 8, padding: 10, textAlign: 'center', border: '1px solid rgba(156,39,176,0.2)' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>📝 1° Iscr</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#9C27B0' }}>{reportData.trackerCoaching.medie.iscritto !== null ? `${reportData.trackerCoaching.medie.iscritto}g` : '-'}</div>
                  <div style={{ fontSize: 10, color: '#4CAF50', fontWeight: 600 }}>{reportData.trackerCoaching.completamento.iscritto}% fatto</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, rgba(255,152,0,0.1), rgba(255,152,0,0.02))', borderRadius: 8, padding: 10, textAlign: 'center', border: '1px solid rgba(255,152,0,0.2)' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>🟠 1° Att</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#FF9800' }}>{reportData.trackerCoaching.medie.attivato !== null ? `${reportData.trackerCoaching.medie.attivato}g` : '-'}</div>
                  <div style={{ fontSize: 10, color: '#4CAF50', fontWeight: 600 }}>{reportData.trackerCoaching.completamento.attivato}% fatto</div>
                </div>
              </div>
              
              {/* 🏆 MINI CLASSIFICA VELOCITÀ - TOP 3 per categoria */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 15 }}>
                {[
                  { key: 'giorniLA', label: '⚡ TOP 3 LA', color: '#2AAA8A' },
                  { key: 'giorniFV', label: '☀️ TOP 3 FV', color: '#FFD700' },
                  { key: 'giorniIscritto', label: '📝 TOP 3 Iscr', color: '#9C27B0' },
                  { key: 'giorniAttivato', label: '🟠 TOP 3 Att', color: '#FF9800' }
                ].map(({ key, label, color }) => {
                  const top3 = reportData.trackerCoaching.lista
                    .filter(t => t[key] !== null)
                    .sort((a, b) => a[key] - b[key])
                    .slice(0, 3);
                  return (
                    <div key={key} style={{ background: '#F8F8F8', borderRadius: 8, padding: 8, border: '1px solid #E8E8E8' }}>
                      <div style={{ fontSize: 10, color, fontWeight: 600, marginBottom: 6, textAlign: 'center' }}>{label}</div>
                      {top3.length > 0 ? top3.map((t, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 9, padding: '3px 0', borderBottom: i < 2 ? '1px solid #E8E8E8' : 'none' }}>
                          <span style={{ color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                            {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {t.nome.split(' ')[0]}
                          </span>
                          <span style={{ color, fontWeight: 700 }}>{t[key]}g</span>
                        </div>
                      )) : <div style={{ fontSize: 9, color: '#999', textAlign: 'center' }}>-</div>}
                    </div>
                  );
                })}
              </div>
              
              {/* Header lista con colonna Networker */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px repeat(4, 40px)', gap: 4, padding: '8px 12px', background: '#F0F0F0', borderRadius: '8px 8px 0 0', fontSize: 9, color: '#666', fontWeight: 600 }}>
                <span>Nome IVD</span>
                <span>Networker</span>
                <span style={{ textAlign: 'center' }}>LA</span>
                <span style={{ textAlign: 'center' }}>FV</span>
                <span style={{ textAlign: 'center' }}>Iscr</span>
                <span style={{ textAlign: 'center' }}>Att</span>
              </div>
              
              {/* Lista COMPLETA con scroll */}
              <div style={{ background: '#FAFAFA', borderRadius: '0 0 10px 10px', padding: '0 12px', maxHeight: 350, overflowY: 'auto', paddingRight: 8 }}>
                {reportData.trackerCoaching.lista.map((t, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px repeat(4, 40px)', gap: 4, padding: '6px 0', borderBottom: '1px solid #E8E8E8', fontSize: 10, alignItems: 'center' }}>
                    <span style={{ color: '#333', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.nome}</span>
                    <span style={{ color: '#666', fontSize: 9, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.networker || '-'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniLA !== null ? '#4CAF50' : '#CCC', fontWeight: t.giorniLA !== null ? 600 : 400 }}>{t.giorniLA !== null ? `${t.giorniLA}g` : '-'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniFV !== null ? '#4CAF50' : '#CCC', fontWeight: t.giorniFV !== null ? 600 : 400 }}>{t.giorniFV !== null ? `${t.giorniFV}g` : '-'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniIscritto !== null ? '#4CAF50' : '#CCC', fontWeight: t.giorniIscritto !== null ? 600 : 400 }}>{t.giorniIscritto !== null ? `${t.giorniIscritto}g` : '-'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniAttivato !== null ? '#4CAF50' : '#CCC', fontWeight: t.giorniAttivato !== null ? 600 : 400 }}>{t.giorniAttivato !== null ? `${t.giorniAttivato}g` : '-'}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : reportCSVs.ivd ? (
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0', textAlign: 'center' }}>
              <span style={{ fontSize: 40 }}>🎯</span>
              <h3 style={{ color: '#999', fontSize: 14, margin: '10px 0 5px', fontWeight: 600 }}>TRACKER COACHING</h3>
              <p style={{ color: '#AAA', fontSize: 11 }}>Nessun match trovato tra IVD e altri CSV.<br/>Verifica che i nomi corrispondano.</p>
            </div>
          ) : null}
        </div>
        
        {/* 💰 ANALISI FATTURATO */}
        {reportData.fatturato && (reportData.fatturato.fv.inseriti.contratti > 0 || reportData.fatturato.la.inseriti.contratti > 0) && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ color: '#2AAA8A', fontSize: 18, margin: 0, fontWeight: 700 }}>💰 ANALISI FATTURATO LEADER</h3>
                <p style={{ color: '#666', fontSize: 11, margin: '5px 0 0' }}>Fatturato e punti generati (Inseriti vs Effettivi)</p>
              </div>
              {/* Badge coerenza */}
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: 20, 
                  fontSize: 10, 
                  fontWeight: 600,
                  background: reportData.fatturato.coerenza?.fv?.ok ? '#E8F5E9' : '#FFEBEE',
                  color: reportData.fatturato.coerenza?.fv?.ok ? '#2E7D32' : '#C62828',
                  border: `1px solid ${reportData.fatturato.coerenza?.fv?.ok ? '#A5D6A7' : '#EF9A9A'}`
                }}>
                  {reportData.fatturato.coerenza?.fv?.ok ? '✅' : '⚠️'} FV: {reportData.fatturato.coerenza?.fv?.fatturatoInseriti || 0}/{reportData.fatturato.coerenza?.fv?.pilastroInseriti || 0}
                </span>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: 20, 
                  fontSize: 10, 
                  fontWeight: 600,
                  background: reportData.fatturato.coerenza?.la?.ok ? '#E8F5E9' : '#FFEBEE',
                  color: reportData.fatturato.coerenza?.la?.ok ? '#2E7D32' : '#C62828',
                  border: `1px solid ${reportData.fatturato.coerenza?.la?.ok ? '#A5D6A7' : '#EF9A9A'}`
                }}>
                  {reportData.fatturato.coerenza?.la?.ok ? '✅' : '⚠️'} LA: {reportData.fatturato.coerenza?.la?.fatturatoInseriti || 0}/{reportData.fatturato.coerenza?.la?.pilastroInseriti || 0}
                </span>
              </div>
            </div>
            
            {/* Alert se non coerente */}
            {(!reportData.fatturato.coerenza?.fv?.ok || !reportData.fatturato.coerenza?.la?.ok) && (
              <div style={{ background: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 11, color: '#E65100' }}>
                ⚠️ <strong>Attenzione:</strong> I numeri potrebbero non corrispondere esattamente ai pilastri. 
                FV: Positivi {reportData.fatturato.coerenza?.fv?.fatturatoEffettivi}/{reportData.fatturato.coerenza?.fv?.pilastroPositivi} | 
                LA: Accettati {reportData.fatturato.coerenza?.la?.fatturatoAccettati}/{reportData.fatturato.coerenza?.la?.pilastroAccettati}
              </div>
            )}
            
            {/* RIEPILOGO FV - INSERITI vs EFFETTIVI */}
            <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRadius: 16, padding: 20, marginBottom: 15, color: '#FFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 13, color: '#FFD700', fontWeight: 700 }}>☀️ FOTOVOLTAICO</span>
                <span style={{ fontSize: 9, color: '#666' }}>
                  Pilastro: {reportData.fatturato.coerenza?.fv?.pilastroInseriti} ins / {reportData.fatturato.coerenza?.fv?.pilastroPositivi} pos / {reportData.fatturato.coerenza?.fv?.pilastroLavorazione} lav / {reportData.fatturato.coerenza?.fv?.pilastroPersi} persi
                </span>
              </div>
              
              {/* Riga 1: Confronto INSERITI vs EFFETTIVI */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 15 }}>
                {/* Inseriti (Potenziale) */}
                <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 9, color: '#888', marginBottom: 3 }}>📋 INSERITI (Potenziale)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#FFF' }}>€{reportData.fatturato.fv.inseriti.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.fv?.pilastroInseriti === reportData.fatturato.fv.inseriti.contratti ? '#4CAF50' : '#FF5722', fontWeight: 600 }}>{reportData.fatturato.fv.inseriti.contratti} contratti</div>
                </div>
                
                {/* Effettivi (Positivi) */}
                <div style={{ textAlign: 'center', padding: 12, background: 'rgba(76,175,80,0.15)', borderRadius: 10, border: '1px solid rgba(76,175,80,0.3)' }}>
                  <div style={{ fontSize: 9, color: '#4CAF50', marginBottom: 3 }}>✅ EFFETTIVI (Positivi)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#4CAF50' }}>€{reportData.fatturato.fv.effettivi.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.fv?.pilastroPositivi === reportData.fatturato.fv.effettivi.contratti ? '#4CAF50' : '#FF5722', fontWeight: 600 }}>{reportData.fatturato.fv.effettivi.contratti} contratti</div>
                </div>
                
                {/* In Lavorazione */}
                <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,215,0,0.15)', borderRadius: 10, border: '1px solid rgba(255,215,0,0.3)' }}>
                  <div style={{ fontSize: 9, color: '#FFD700', marginBottom: 3 }}>⏳ DA SBLOCCARE</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#FFD700' }}>€{reportData.fatturato.fv.lavorazione.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.fv?.pilastroLavorazione === reportData.fatturato.fv.lavorazione.contratti ? '#4CAF50' : '#FF5722', fontWeight: 600 }}>{reportData.fatturato.fv.lavorazione.contratti} contratti</div>
                </div>
                
                {/* Persi */}
                <div style={{ textAlign: 'center', padding: 12, background: 'rgba(229,57,53,0.15)', borderRadius: 10, border: '1px solid rgba(229,57,53,0.3)' }}>
                  <div style={{ fontSize: 9, color: '#E53935', marginBottom: 3 }}>❌ PERSI</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#E53935' }}>€{reportData.fatturato.fv.persi.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: '#666' }}>{reportData.fatturato.fv.persi.contratti} contratti</div>
                </div>
              </div>
              
              {/* Riga 2: Dettagli tecnici */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                <div style={{ textAlign: 'center', padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: '#888' }}>⚡ kWp INSTALLATI</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#2AAA8A' }}>{reportData.fatturato.fv.effettivi.kw}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: '#888' }}>🔋 kWh BATTERIE</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#9C27B0' }}>{reportData.fatturato.fv.effettivi.kwh}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: '#888' }}>⭐ PUNTI EFFETTIVI</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#FFD700' }}>{reportData.fatturato.fv.effettivi.punti.toLocaleString('it-IT')}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: '#888' }}>📊 PUNTI INSERITI</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#888' }}>{reportData.fatturato.fv.inseriti.punti.toLocaleString('it-IT')}</div>
                </div>
              </div>
            </div>
            
            {/* RIEPILOGO LA - FATTURATO + PUNTI */}
            <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderRadius: 16, padding: 20, marginBottom: 20, color: '#FFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 13, color: '#FF9800', fontWeight: 700 }}>🌱 LUCE AMICA</span>
                <span style={{ fontSize: 9, color: '#666' }}>
                  Pilastro: {reportData.fatturato.coerenza?.la?.pilastroInseriti} ins / {reportData.fatturato.coerenza?.la?.pilastroAccettati} acc / {reportData.fatturato.coerenza?.la?.pilastroInFornitura} attivi
                </span>
              </div>
              
              {/* Riga 1: FATTURATO POTENZIALE (basato su Accettati NWG Spa) */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: 10, color: '#FFD700', fontWeight: 600, marginBottom: 8 }}>💰 FATTURATO POTENZIALE (Stato NWG Spa = Accettato)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: '#888', marginBottom: 3 }}>📋 INSERITI</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#FFF' }}>€{Math.round(reportData.fatturato.la.inseriti.totale).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>{reportData.fatturato.la.inseriti.contratti} contr.</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,215,0,0.15)', borderRadius: 10, border: '1px solid rgba(255,215,0,0.3)' }}>
                    <div style={{ fontSize: 9, color: '#FFD700', marginBottom: 3 }}>✅ POTENZIALE/ANNO</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#FFD700' }}>€{Math.round(reportData.fatturato.la.accettatiPunti.totale).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.la?.pilastroAccettati === reportData.fatturato.la.accettatiPunti.contratti ? '#4CAF50' : '#FF5722', fontWeight: 600 }}>{reportData.fatturato.la.accettatiPunti.contratti} accettati</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,215,0,0.08)', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: '#FFD700', marginBottom: 3 }}>📅 POTENZ./MESE</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#FFD700' }}>€{Math.round(reportData.fatturato.la.accettatiPunti.totale / 12).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>/mese</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: '#888', marginBottom: 3 }}>🍃 kWh GREEN</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#FFF' }}>{reportData.fatturato.la.accettatiPunti.kwh.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>/anno</div>
                  </div>
                </div>
              </div>
              
              {/* Riga 2: FATTURATO EFFETTIVO (basato su Attivi NWG Energia - ad oggi) */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: 10, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}>💰 FATTURATO EFFETTIVO AD OGGI (Stato NWG Energia = Attivo/In fornitura)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(76,175,80,0.15)', borderRadius: 10, border: '1px solid rgba(76,175,80,0.3)' }}>
                    <div style={{ fontSize: 9, color: '#4CAF50', marginBottom: 3 }}>✅ ATTIVI OGGI</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#4CAF50' }}>{reportData.fatturato.la.attiviEffettivi.contratti}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>in fornitura</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(76,175,80,0.2)', borderRadius: 10, border: '1px solid rgba(76,175,80,0.4)' }}>
                    <div style={{ fontSize: 9, color: '#4CAF50', marginBottom: 3 }}>💰 EFFETTIVO/ANNO</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#4CAF50' }}>€{Math.round(reportData.fatturato.la.attiviEffettivi.totale).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>ricorrente</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(76,175,80,0.1)', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: '#4CAF50', marginBottom: 3 }}>📅 EFFETT./MESE</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#4CAF50' }}>€{Math.round(reportData.fatturato.la.attiviEffettivi.totale / 12).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>/mese</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(76,175,80,0.08)', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: '#4CAF50', marginBottom: 3 }}>🍃 kWh GREEN</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#4CAF50' }}>{reportData.fatturato.la.attiviEffettivi.kwh.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>/anno</div>
                  </div>
                </div>
              </div>
              
              {/* Riga 3: PUNTI (basati su Accettato NWG Spa - anche se poi cessa, pagano!) */}
              <div>
                <div style={{ fontSize: 10, color: '#FFD700', fontWeight: 600, marginBottom: 8 }}>⭐ PUNTI LA (Stato NWG Spa = Accettato) - anche se poi cessa, pagano!</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: '#888', marginBottom: 3 }}>📋 INSERITI</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#FFF' }}>{reportData.fatturato.la.inseriti.punti.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: '#666' }}>{reportData.fatturato.la.inseriti.contratti} contratti</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,215,0,0.15)', borderRadius: 10, border: '1px solid rgba(255,215,0,0.3)' }}>
                    <div style={{ fontSize: 9, color: '#FFD700', marginBottom: 3 }}>✅ ACCETTATI (punti)</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#FFD700' }}>{reportData.fatturato.la.accettatiPunti.punti.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.la?.pilastroAccettati === reportData.fatturato.la.accettatiPunti.contratti ? '#4CAF50' : '#FF5722', fontWeight: 600 }}>{reportData.fatturato.la.accettatiPunti.contratti} contratti</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: '#888', marginBottom: 3 }}>📊 % CONVERSIONE</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#FFF' }}>{reportData.fatturato.la.inseriti.contratti > 0 ? Math.round(reportData.fatturato.la.accettatiPunti.contratti / reportData.fatturato.la.inseriti.contratti * 100) : 0}%</div>
                    <div style={{ fontSize: 10, color: '#666' }}>punti guadagnati</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* TOTALE COMPLESSIVO LEADER */}
            <div style={{ background: 'linear-gradient(135deg, #2AAA8A 0%, #20917A 100%)', borderRadius: 16, padding: 20, marginBottom: 10, color: '#FFF', textAlign: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>💰 FATTURATO TOTALE EFFETTIVO</div>
                  <div style={{ fontSize: 36, fontWeight: 800 }}>€{(reportData.fatturato.fv.effettivi.totale + reportData.fatturato.la.attiviEffettivi.totale).toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>FV positivi + LA attivi annuo</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>⭐ PUNTI TOTALI EFFETTIVI</div>
                  <div style={{ fontSize: 36, fontWeight: 800 }}>{ (reportData.fatturato.fv.effettivi.punti + reportData.fatturato.la.accettatiPunti.punti).toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>FV positivi + LA accettati</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>📊 PUNTI TOTALI INSERITI</div>
                  <div style={{ fontSize: 36, fontWeight: 800 }}>{ (reportData.fatturato.fv.inseriti.punti + reportData.fatturato.la.inseriti.punti).toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>potenziale</div>
                </div>
              </div>
            </div>
            
            {/* DISCLAIMER PUNTI */}
            <div style={{ background: '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 10, color: '#666', lineHeight: 1.5 }}>
              <strong style={{ color: '#555' }}>ℹ️ Nota sui punti calcolati:</strong><br/>
              • I punti potrebbero non corrispondere esattamente a VipOffice per <strong>variazioni di listini o piani marketing</strong> nel periodo calcolato<br/>
              • Questo calcolo conta solo <strong>contratti inseriti nel periodo selezionato</strong>, non include punti accettati provenienti da periodi precedenti<br/>
              • Per FV: punti stimati dai listini attuali (Elite/Evolution/Extended). Per LA: 15pt (LA 15 IG) o 20pt (LA 20 IG) per contratto<br/>
              • I punti VipOffice potrebbero includere <strong>accettati di inserimenti anni precedenti</strong> non presenti in questo export
            </div>
            
            {/* CLASSIFICHE FATTURATO - 2 colonne */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 15 }}>
              {/* Classifica K Manager FV */}
              <div style={{ background: '#F8F8F8', borderRadius: 12, padding: 15 }}>
                <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 700, marginBottom: 10 }}>👑 TOP K MANAGER - FV Effettivo</div>
                <div style={{ maxHeight: 200, overflowY: 'auto', paddingRight: 5 }}>
                  {reportData.fatturato.fv.classificaK.slice(0, 10).map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E8E8E8', fontSize: 11 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: i < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i < 3 ? '#FFF' : '#666' }}>{i + 1}</span>
                        <span style={{ fontWeight: 500, color: '#333', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: '#4CAF50' }}>€{dati.fatturato.toLocaleString('it-IT')}</div>
                        <div style={{ fontSize: 9, color: '#888' }}>{dati.kw}kW | {dati.kwh}kWh | {dati.punti}pt</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Classifica Networker FV */}
              <div style={{ background: '#F8F8F8', borderRadius: 12, padding: 15 }}>
                <div style={{ fontSize: 12, color: '#9C27B0', fontWeight: 700, marginBottom: 10 }}>⭐ TOP NETWORKER - FV Effettivo</div>
                <div style={{ maxHeight: 200, overflowY: 'auto', paddingRight: 5 }}>
                  {reportData.fatturato.fv.classificaNW.slice(0, 10).map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E8E8E8', fontSize: 11 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: i < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i < 3 ? '#FFF' : '#666' }}>{i + 1}</span>
                        <span style={{ fontWeight: 500, color: '#333', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: '#4CAF50' }}>€{dati.fatturato.toLocaleString('it-IT')}</div>
                        <div style={{ fontSize: 9, color: '#888' }}>{dati.kw}kW | {dati.kwh}kWh | {dati.punti}pt</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Classifica K Manager LA */}
              <div style={{ background: '#F8F8F8', borderRadius: 12, padding: 15 }}>
                <div style={{ fontSize: 12, color: '#FF9800', fontWeight: 700, marginBottom: 10 }}>👑 TOP K MANAGER - LA Accettati</div>
                <div style={{ maxHeight: 200, overflowY: 'auto', paddingRight: 5 }}>
                  {reportData.fatturato.la.classificaK.slice(0, 10).map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E8E8E8', fontSize: 11 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: i < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i < 3 ? '#FFF' : '#666' }}>{i + 1}</span>
                        <span style={{ fontWeight: 500, color: '#333', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: '#FF9800' }}>€{Math.round(dati.fatturato).toLocaleString('it-IT')}/anno</div>
                        <div style={{ fontSize: 9, color: '#888' }}>{dati.contratti} contr. | {dati.punti}pt | {dati.kwh.toLocaleString('it-IT')}kWh</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Classifica Networker LA */}
              <div style={{ background: '#F8F8F8', borderRadius: 12, padding: 15 }}>
                <div style={{ fontSize: 12, color: '#4CAF50', fontWeight: 700, marginBottom: 10 }}>⭐ TOP NETWORKER - LA Accettati</div>
                <div style={{ maxHeight: 200, overflowY: 'auto', paddingRight: 5 }}>
                  {reportData.fatturato.la.classificaNW.slice(0, 10).map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #E8E8E8', fontSize: 11 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: i < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i < 3 ? '#FFF' : '#666' }}>{i + 1}</span>
                        <span style={{ fontWeight: 500, color: '#333', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: '#4CAF50' }}>€{Math.round(dati.fatturato).toLocaleString('it-IT')}/anno</div>
                        <div style={{ fontSize: 9, color: '#888' }}>{dati.punti}pt | {dati.kwh.toLocaleString('it-IT')}kWh green</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* BOTTONE DOWNLOAD */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: '1px solid #E0E0E0', textAlign: 'center' }}>
          <button 
            onClick={downloadReportPNG}
            style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #2AAA8A, #20917A)', color: '#FFF', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            📷 SCARICA REPORT PNG
          </button>
        </div>
      </div>
    );
  };

  const labels = getLabels(), config = getConfig();

  // LOGIN - TOP MANAGER STYLE con foto dinamica
  if (!user) return (<><Head><title>Leader Ranking | Top Manager Analytics</title><meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>{`
      @keyframes kenBurns {
        0% { transform: scale(1) translate(0, 0); }
        50% { transform: scale(1.12) translate(-2%, -1%); }
        100% { transform: scale(1.06) translate(1%, 2%); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .login-card { animation: fadeInUp 0.6s ease-out; }
      .login-input:focus { border-color: #2AAA8A; box-shadow: 0 0 0 3px rgba(42,170,138,0.15); outline: none; }
      .login-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(42,170,138,0.35); }
    `}</style>
  </Head>
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image con Ken Burns */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'kenBurns 25s ease-in-out infinite alternate'
      }} />
      {/* Overlay scuro elegante */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(22,33,62,0.88) 50%, rgba(15,52,96,0.85) 100%)'
      }} />
      
      {/* Card Login */}
      <div className="login-card" style={{ 
        position: 'relative',
        background: 'rgba(255,255,255,0.98)', 
        borderRadius: 24, 
        padding: '50px 45px', 
        width: '100%', 
        maxWidth: 420, 
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        margin: 20
      }}>
        {/* Logo TOP MANAGER */}
        <div style={{ textAlign: 'center', marginBottom: 35 }}>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            <span style={{ color: '#2AAA8A' }}>LEADER</span>
            <span style={{ color: '#1a1a2e', fontWeight: 300, marginLeft: 10 }}>RANKING</span>
          </div>
          <div style={{ fontSize: 12, color: '#888', letterSpacing: '3px', textTransform: 'uppercase' }}>Top Manager Analytics</div>
        </div>
        
        {/* Divider elegante */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #E0E0E0, transparent)', marginBottom: 30 }} />
        
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input 
            className="login-input" 
            style={{ padding: '16px 20px', borderRadius: 12, border: '1.5px solid #E8E8E8', fontSize: 15, background: '#FAFAFA', transition: 'all 0.2s ease' }} 
            placeholder="Username" 
            value={loginForm.username} 
            onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} 
          />
          <input 
            className="login-input" 
            style={{ padding: '16px 20px', borderRadius: 12, border: '1.5px solid #E8E8E8', fontSize: 15, background: '#FAFAFA', transition: 'all 0.2s ease' }} 
            type="password" 
            placeholder="Password" 
            value={loginForm.password} 
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} 
            onKeyPress={e => e.key === 'Enter' && handleLogin()} 
          />
          {loginError && <p style={{ color: '#E53935', fontSize: 14, margin: 0, textAlign: 'center' }}>{loginError}</p>}
          <button 
            className="login-btn" 
            style={{ padding: '16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #2AAA8A, #1E8A6E)', color: '#FFF', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 8, transition: 'all 0.2s ease', letterSpacing: '1px' }} 
            onClick={handleLogin}
          >
            ACCEDI
          </button>
        </div>
        
        {/* Footer versione */}
        <p style={{ color: '#CCC', fontSize: 11, marginTop: 30, textAlign: 'center', letterSpacing: '1px' }}>v13.5</p>
      </div>
    </div></>);

  // HOMEPAGE - TABS SEMPRE VISIBILI (senza area CSV)
  if (!csvData && (user.role === 'admin' || user.role === 'assistente' || user.role === 'k')) return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={{ minHeight: '100vh', background: darkMode ? '#1a1a2e' : '#F8F9FA', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif', transition: 'background 0.3s ease' }}>
      <header style={{ background: darkMode ? '#16213e' : '#FFFFFF', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${darkMode ? '#0f3460' : '#E0E0E0'}` }}>
        <div><span style={{ color: '#2AAA8A', fontWeight: 800, fontSize: 18 }}>LEADER</span><span style={{ fontWeight: 300, fontSize: 18, color: darkMode ? '#FFF' : '#333' }}> RANKING</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Toggle Dark/Light Mode */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ 
              padding: '6px 12px', 
              background: darkMode ? '#FFD700' : '#333', 
              color: darkMode ? '#333' : '#FFF', 
              border: 'none', 
              borderRadius: 20, 
              fontSize: 12, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <span style={{ fontSize: 13, color: darkMode ? '#AAA' : '#666666' }}>Ciao, {user.name}</span>
          <span style={{ padding: '4px 10px', background: '#2AAA8A', color: '#FFF', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{user.role.toUpperCase()}</span>
          <button style={{ ...S.btn, padding: '6px 14px', fontSize: 12, background: 'transparent', border: `1px solid ${darkMode ? '#444' : '#E0E0E0'}`, color: darkMode ? '#FFF' : '#666' }} onClick={() => setUser(null)}>Esci</button>
        </div>
      </header>
      
      <main style={{ padding: 20, maxWidth: 1400, margin: '0 auto' }}>
        {/* 2 TABS - Dashboard e Report */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 25 }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ 
              padding: '20px', 
              background: activeTab === 'dashboard' ? 'linear-gradient(135deg, #2AAA8A, #20917A)' : darkMode ? '#16213e' : '#FFFFFF', 
              color: activeTab === 'dashboard' ? '#FFF' : darkMode ? '#AAA' : '#666666',
              border: activeTab === 'dashboard' ? 'none' : `1px solid ${darkMode ? '#0f3460' : '#E0E0E0'}`,
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'dashboard' ? '0 8px 25px rgba(42,170,138,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >📊 DASHBOARD</button>
          <button 
            onClick={() => setActiveTab('report')}
            style={{ 
              padding: '20px', 
              background: activeTab === 'report' ? 'linear-gradient(135deg, #FFD700, #FFC107)' : darkMode ? '#16213e' : '#FFFFFF', 
              color: activeTab === 'report' ? '#333' : darkMode ? '#AAA' : '#666666',
              border: activeTab === 'report' ? 'none' : `1px solid ${darkMode ? '#0f3460' : '#E0E0E0'}`,
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'report' ? '0 8px 25px rgba(255,215,0,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >📈 REPORT</button>
        </div>
        
        {/* CONTENUTO TAB */}
        {activeTab === 'dashboard' && (
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 50, textAlign: 'center', border: '1px solid #E8E8E8', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h2 style={{ color: '#1a1a2e', fontSize: 28, marginBottom: 8, fontWeight: 700, letterSpacing: '-0.5px' }}>Dashboard Classifiche</h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 35 }}>Carica un file CSV per visualizzare classifiche e statistiche in tempo reale</p>
            
            <div style={{ maxWidth: 480, margin: '0 auto' }}>
              <div 
                style={{ 
                  border: `2px dashed ${isDragging ? '#2AAA8A' : '#D0D0D0'}`, 
                  borderRadius: 20, 
                  padding: 50,
                  background: isDragging ? 'rgba(42,170,138,0.05)' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} 
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }} 
                onDragLeave={e => { e.preventDefault(); setIsDragging(false); }} 
                onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) processFile(f); }}
              >
                <input type="file" accept=".csv" id="csvUploadMain" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processFile(e.target.files[0]); }} />
                <label htmlFor="csvUploadMain" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ width: 70, height: 70, borderRadius: 20, background: 'linear-gradient(135deg, #2AAA8A, #20917A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 25px rgba(42,170,138,0.3)' }}>
                    <span style={{ fontSize: 30, filter: 'brightness(10)' }}>📤</span>
                  </div>
                  <div style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Carica file CSV</div>
                  <div style={{ color: '#AAA', fontSize: 13 }}>Trascina qui o clicca per selezionare</div>
                </label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#FF9800' }} /><span style={{ fontSize: 12, color: '#666' }}>IVD</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#2196F3' }} /><span style={{ fontSize: 12, color: '#666' }}>SDP</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#2AAA8A' }} /><span style={{ fontSize: 12, color: '#666' }}>Networker</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#FFD700' }} /><span style={{ fontSize: 12, color: '#666' }}>K Manager</span></div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'report' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* UPLOAD CSV PER REPORT - TOP MANAGER STYLE */}
            <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 35, border: '1px solid #E8E8E8', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <h2 style={{ color: '#1a1a2e', fontSize: 24, marginBottom: 6, fontWeight: 700, letterSpacing: '-0.5px' }}>Report Aggregato</h2>
              <p style={{ color: '#888', fontSize: 13, marginBottom: 25 }}>Carica i CSV per generare report dettagliati con classifiche e statistiche</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15, marginBottom: 25 }}>
                {/* IVD */}
                <div style={{ background: reportCSVs.ivd ? 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)', borderRadius: 16, padding: 20, border: reportCSVs.ivd ? '2px solid #4CAF50' : '1px solid #E8E8E8', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FF9800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, filter: 'brightness(10)' }}>📋</span>
                    </div>
                    <span style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>IVD Attivati</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-ivd-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('ivd', e.target.files[0]); }} />
                  <label htmlFor="csv-ivd-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.ivd ? 'rgba(76,175,80,0.1)' : '#FFF', borderRadius: 10, textAlign: 'center', color: reportCSVs.ivd ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
                    {reportCSVs.ivd ? `✓ ${reportCSVs.ivd.rows} righe caricate` : 'Carica CSV'}
                  </label>
                </div>
                
                {/* Luce Amica */}
                <div style={{ background: reportCSVs.energy ? 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)', borderRadius: 16, padding: 20, border: reportCSVs.energy ? '2px solid #4CAF50' : '1px solid #E8E8E8', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16 }}>⚡</span>
                    </div>
                    <span style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>Luce Amica</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-energy-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('energy', e.target.files[0]); }} />
                  <label htmlFor="csv-energy-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.energy ? 'rgba(76,175,80,0.1)' : '#FFF', borderRadius: 10, textAlign: 'center', color: reportCSVs.energy ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
                    {reportCSVs.energy ? `✓ ${reportCSVs.energy.rows} righe caricate` : 'Carica CSV'}
                  </label>
                </div>
                
                {/* FV */}
                <div style={{ background: reportCSVs.fv ? 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)', borderRadius: 16, padding: 20, border: reportCSVs.fv ? '2px solid #4CAF50' : '1px solid #E8E8E8', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#2AAA8A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, filter: 'brightness(10)' }}>☀️</span>
                    </div>
                    <span style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>Fotovoltaico</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-fv-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('fv', e.target.files[0]); }} />
                  <label htmlFor="csv-fv-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.fv ? 'rgba(76,175,80,0.1)' : '#FFF', borderRadius: 10, textAlign: 'center', color: reportCSVs.fv ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
                    {reportCSVs.fv ? `✓ ${reportCSVs.fv.rows} righe caricate` : 'Carica CSV'}
                  </label>
                </div>
                
                {/* Seminari */}
                <div style={{ background: reportCSVs.consultings ? 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)', borderRadius: 16, padding: 20, border: reportCSVs.consultings ? '2px solid #4CAF50' : '1px solid #E8E8E8', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, filter: 'brightness(10)' }}>🎓</span>
                    </div>
                    <span style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>Seminari</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-cons-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('consultings', e.target.files[0]); }} />
                  <label htmlFor="csv-cons-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.consultings ? 'rgba(76,175,80,0.1)' : '#FFF', borderRadius: 10, textAlign: 'center', color: reportCSVs.consultings ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
                    {reportCSVs.consultings ? `✓ ${reportCSVs.consultings.rows} righe caricate` : 'Carica CSV'}
                  </label>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  style={{ flex: 2, padding: '16px 24px', background: Object.values(reportCSVs).some(v => v) ? 'linear-gradient(135deg, #2AAA8A, #1E8A6E)' : '#E8E8E8', color: Object.values(reportCSVs).some(v => v) ? '#FFF' : '#AAA', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: Object.values(reportCSVs).some(v => v) ? 'pointer' : 'not-allowed', boxShadow: Object.values(reportCSVs).some(v => v) ? '0 8px 25px rgba(42,170,138,0.3)' : 'none', transition: 'all 0.2s ease' }} 
                  onClick={() => setReportData(generateReportData())}
                  disabled={!Object.values(reportCSVs).some(v => v)}
                >GENERA REPORT</button>
                <button 
                  style={{ flex: 1, padding: '16px 24px', background: '#FFF', color: '#888', border: '1px solid #E0E0E0', borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer' }} 
                  onClick={clearReportCSVs}
                >Reset</button>
              </div>
            </div>
            
            {/* RISULTATI REPORT */}
            {reportData && reportData.pilastri && (
              <ReportResultsComponent reportData={reportData} />
            )}
          </div>
        )}
      </main>
      <footer style={{ textAlign: 'center', padding: 20, color: '#999', fontSize: 12 }}>v13.5 • Leader Ranking</footer>
    </div></>);

  // PREVIEW
  if (showPreview && previewImage) return (<><Head><title>Anteprima</title></Head>
    <div style={S.previewWrap}><div style={S.previewModal}>
      <h2 style={{ color: '#333333', marginBottom: 5 }}>📸 Anteprima 1080x1080</h2>
      <p style={{ color: '#666666', fontSize: 13, marginBottom: 15 }}>✅ {getData().length} partecipanti • {getClassificaTotal()} contratti</p>
      <div style={S.previewImg}><img src={previewImage} style={{ maxWidth: '100%', maxHeight: '55vh' }} /></div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 15, flexWrap: 'wrap' }}>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: '#F5F5F5', border: '1px solid #E0E0E0', color: '#333333' }} onClick={() => setShowPreview(false)}>✕ Chiudi</button>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg,#2AAA8A,#20917A)', color: '#FFFFFF' }} onClick={download}>📥 SCARICA</button>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg,#FFD700,#FFC107)', color: '#333333' }} onClick={handleSendToBot}>🤖 INVIA A BOT</button>
      </div>
      {sendStatus && <p style={{ textAlign: 'center', marginTop: 10, color: sendStatus.includes('✅') ? '#4CAF50' : sendStatus.includes('❌') ? '#f44' : '#FFD700' }}>{sendStatus}</p>}
    </div></div></>);

  // DASHBOARD
  return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={S.dash}>
      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={S.menuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
          <span style={{ fontWeight: 800, color: '#2AAA8A' }}>LEADER</span>
          <span style={{ fontWeight: 300, color: '#333333' }}>RANKING</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Tasto Indietro */}
          <button 
            style={{ ...S.btn, padding: '6px 12px', fontSize: 12, background: '#F5F5F5', border: '1px solid #E0E0E0', color: '#333' }} 
            onClick={() => { setCsvData(null); setRankings(null); setFilteredData(null); setReportData(null); }}
          >← Indietro</button>
          <span style={S.badge}>{user.role.toUpperCase()}</span>
          <button style={{ ...S.btn, padding: '6px 12px', fontSize: 12, background: 'transparent', border: '1px solid #E0E0E0' }} onClick={() => { setUser(null); setCsvData(null); setRankings(null); }}>Esci</button>
        </div>
      </header>
      <main style={{ display: 'flex' }}>
        <aside style={{ ...S.sidebar, ...(mobileMenuOpen ? { transform: 'translateX(0)' } : {}) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}><span style={{ fontSize: 12, color: '#999999', letterSpacing: 1 }}>📊 CLASSIFICHE</span><button style={{ background: 'none', border: 'none', color: '#333333', fontSize: 18, cursor: 'pointer' }} onClick={() => setMobileMenuOpen(false)}>✕</button></div>
          {rankings ? (<><p style={S.catLabel}>IVD</p><button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_inseriti'); setMobileMenuOpen(false); }}>🟠 {labels.c1} ({rankings.ivd_inseriti.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_accettati'); setMobileMenuOpen(false); }}>🟢 {labels.c2} ({rankings.ivd_accettati.length})</button><p style={S.catLabel}>SDP</p><button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_inseriti'); setMobileMenuOpen(false); }}>🔵 {labels.c1} ({rankings.sdp_inseriti.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_accettati'); setMobileMenuOpen(false); }}>🟢 {labels.c2} ({rankings.sdp_accettati.length})</button><p style={S.catLabel}>MANAGER</p><button style={{ ...S.menuItem, ...(selectedRanking === 'nw' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('nw'); setMobileMenuOpen(false); }}>⭐ Networker ({rankings.nw.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'k' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('k'); setMobileMenuOpen(false); }}>👑 K Manager ({rankings.k.length})</button></>) : <p style={{ color: '#999999', fontSize: 12 }}>Carica CSV</p>}
          <div style={S.divider} />
          {(user.role === 'admin' || user.role === 'assistente') && (<><p style={S.catLabel}>⚙️ FILTRI</p><label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: '#333333' }}><input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={{ accentColor: '#2AAA8A' }} /> Escludi K</label><div style={S.divider} /><p style={S.catLabel}>📅 PERIODO</p><button style={{ ...S.periodBtn, ...(!selectedMonth ? { background: 'rgba(124,77,255,0.2)', color: '#2AAA8A' } : {}) }} onClick={handleShowAll}>📋 Tutti ({csvData?.length || 0})</button>{availableMonths.length > 0 && (<select style={S.select} value={selectedMonth} onChange={e => handleMonthChange(e.target.value)}><option value="">-- Mese --</option>{availableMonths.map(m => <option key={m} value={m}>{m}</option>)}</select>)}{weeks.length > 0 && (<select style={S.select} value={selectedWeek?.num || ''} onChange={e => handleWeekChange(e.target.value)}><option value="">-- Settimana --</option>{weeks.map(w => <option key={w.num} value={w.num}>{w.label}</option>)}</select>)}<div style={S.divider} /><p style={S.catLabel}>📊 TIPO CLASSIFICA</p><select style={S.select} value={periodType} onChange={e => setPeriodType(e.target.value)}><option value="progressiva">📈 Progressiva (mese in corso)</option><option value="settimanale">📅 Settimanale</option><option value="finale">🏆 Finale mese</option></select><div style={S.divider} /><p style={S.catLabel}>🏷️ ETICHETTE</p><select style={S.select} value={eventName} onChange={e => setEventName(e.target.value)}>{EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select><input style={S.inputSm} value={eventDate} onChange={e => setEventDate(e.target.value)} placeholder="Periodo" /></>)}
        </aside>
        {mobileMenuOpen && <div style={S.overlay} onClick={() => setMobileMenuOpen(false)} />}
        <section style={S.content}>
          {(user.role === 'admin' || user.role === 'assistente') && (<div style={{ ...S.uploadBox, ...(isDragging ? { borderColor: '#2AAA8A', background: 'rgba(124,77,255,0.1)' } : {}) }} onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={e => { e.preventDefault(); setIsDragging(false); }} onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) processFile(f); }}><input type="file" accept=".csv" id="csv" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processFile(e.target.files[0]); }} /><label htmlFor="csv" style={{ cursor: 'pointer', padding: '10px 20px', background: 'rgba(124,77,255,0.1)', borderRadius: 8, color: '#2AAA8A', fontWeight: 600 }}>{filteredData ? `✅ ${filteredData.length} righe caricate` : '📤 Carica CSV'}</label></div>)}
          
          {/* TABS - Dashboard e Classifiche (Report è nella Homepage) */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: '#FFFFFF', padding: 8, borderRadius: 12, border: '1px solid #E0E0E0' }}>
            <button 
              style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'dashboard' ? '#2AAA8A' : 'transparent', color: activeTab === 'dashboard' ? '#fff' : '#666666', border: 'none', opacity: rankings ? 1 : 0.5 }} 
              onClick={() => rankings && setActiveTab('dashboard')}
              disabled={!rankings}
            >📊 Dashboard</button>
            <button 
              style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'classifiche' ? '#2AAA8A' : 'transparent', color: activeTab === 'classifiche' ? '#fff' : '#666666', border: 'none', opacity: rankings ? 1 : 0.5 }} 
              onClick={() => rankings && setActiveTab('classifiche')}
              disabled={!rankings}
            >🏆 Classifiche</button>
          </div>
          
          {/* DASHBOARD TAB */}
          {rankings && activeTab === 'dashboard' && (() => {
            const stats = getDashboardStats();
            const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
            const maxWeekly = Math.max(...stats.weeklyData, 1);
            
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* TITOLO CLASSIFICA SELEZIONATA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                  <span style={{ fontSize: 24 }}>{config.emoji}</span>
                  <div>
                    <h2 style={{ color: config.color, fontSize: 18, margin: 0 }}>{config.label}</h2>
                    <p style={{ color: '#666666', fontSize: 12, margin: 0 }}>{eventDate}</p>
                  </div>
                </div>
                
                {/* STATS CARDS - PIU GRANDI */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,107,53,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(255,107,53,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#2AAA8A' }}>{animatedStats.ins}</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>{labels.c1}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.25), rgba(76,175,80,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(76,175,80,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#4CAF50' }}>{animatedStats.acc}</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>{labels.c2}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.25), rgba(124,77,255,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(124,77,255,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#2AAA8A' }}>{animatedStats.part}</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>Partecipanti</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(255,215,0,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#FFD700' }}>{animatedStats.conv}%</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>Conversione</div>
                  </div>
                </div>

                {/* PODIO + TOP 7 affiancati - PIU GRANDI */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 15 }}>
                  {/* PODIO */}
                  <div style={{ background: '#FAFAFA', borderRadius: 20, padding: 20, border: '1px solid #F0F0F0' }}>
                    <h3 style={{ color: '#FFD700', fontSize: 16, marginBottom: 15, textAlign: 'center' }}>🏆 PODIO</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10, height: 170 }}>
                      {/* 2° */}
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: 12, color: '#333333', fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{stats.top3[1]?.name || '-'}</div>
                        <div style={{ background: 'linear-gradient(180deg, #E8E8E8, #A0A0A0)', borderRadius: '10px 10px 0 0', height: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 24, fontWeight: 800, color: '#333' }}>🥈</span>
                          <span style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>{stats.top3[1]?.v1 || 0}</span>
                        </div>
                      </div>
                      {/* 1° */}
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: 14, color: '#FFD700', fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{stats.top3[0]?.name || '-'}</div>
                        <div style={{ background: 'linear-gradient(180deg, #FFE082, #FFD700)', borderRadius: '10px 10px 0 0', height: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(255,215,0,0.4)' }}>
                          <span style={{ fontSize: 32, fontWeight: 800, color: '#333' }}>🥇</span>
                          <span style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{stats.top3[0]?.v1 || 0}</span>
                        </div>
                      </div>
                      {/* 3° */}
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: 12, color: '#333333', fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{stats.top3[2]?.name || '-'}</div>
                        <div style={{ background: 'linear-gradient(180deg, #B2DFDB, #CD7F32)', borderRadius: '10px 10px 0 0', height: 65, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 20, fontWeight: 800, color: '#333' }}>🥉</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>{stats.top3[2]?.v1 || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TOP 4-10 */}
                  <div style={{ background: '#FAFAFA', borderRadius: 20, padding: 20, border: '1px solid #F0F0F0' }}>
                    <h3 style={{ color: '#2AAA8A', fontSize: 16, marginBottom: 12 }}>📈 TOP 4° - 10°</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {stats.top10.slice(3, 10).map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 28, fontSize: 13, color: '#666666', fontWeight: 600 }}>{i + 4}°</span>
                          <div style={{ flex: 1, height: 28, background: '#F5F5F5', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                            <div style={{ width: `${(p.v1 / stats.maxV1) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #2AAA8A, #4DB6AC)', borderRadius: 6 }} />
                            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#333333', fontWeight: 500 }}>{p.name}</span>
                          </div>
                          <span style={{ width: 28, fontSize: 14, fontWeight: 700, color: '#2AAA8A', textAlign: 'right' }}>{p.v1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DONUT + HEATMAP affiancati */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
                  {/* DONUT */}
                  <div style={{ background: '#FCFCFC', borderRadius: 16, padding: 15, border: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', gap: 15 }}>
                    <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#E0E0E0" strokeWidth="15" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4CAF50" strokeWidth="15" strokeLinecap="round" strokeDasharray={`${stats.conv * 2.51} 251`} />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#4CAF50' }}>{stats.conv}%</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#666666', marginBottom: 5 }}>CONVERSIONE</div>
                      <div style={{ display: 'flex', gap: 15 }}>
                        <div><span style={{ fontSize: 16, fontWeight: 700, color: '#2AAA8A' }}>{stats.ins}</span><span style={{ fontSize: 10, color: '#999999', marginLeft: 4 }}>ins</span></div>
                        <div><span style={{ fontSize: 16, fontWeight: 700, color: '#4CAF50' }}>{stats.acc}</span><span style={{ fontSize: 10, color: '#999999', marginLeft: 4 }}>acc</span></div>
                      </div>
                    </div>
                  </div>

                  {/* HEATMAP DINAMICO - Settimanale o Mensile */}
                  {!stats.isMonthly ? (
                    // HEATMAP SETTIMANALE
                    <div style={{ background: '#FCFCFC', borderRadius: 16, padding: 15, border: '1px solid #F5F5F5' }}>
                      <div style={{ fontSize: 12, color: '#666666', marginBottom: 8 }}>🗓️ ATTIVITÀ SETTIMANALE</div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {dayNames.map((day, i) => {
                          const val = stats.weeklyData[i];
                          const intensity = val / maxWeekly;
                          const bgColor = val === 0 ? '#F5F5F5' : intensity > 0.7 ? '#4CAF50' : intensity > 0.4 ? '#FFD700' : '#2AAA8A';
                          return (
                            <div key={day} style={{ flex: 1, textAlign: 'center' }}>
                              <div style={{ fontSize: 9, color: '#999999', marginBottom: 4 }}>{day}</div>
                              <div style={{ height: 36, borderRadius: 6, background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: val === 0 ? '#E0E0E0' : '#fff' }}>{val}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#4CAF50' }} /><span style={{ fontSize: 9, color: '#666666' }}>Alto (&gt;70%)</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#FFD700' }} /><span style={{ fontSize: 9, color: '#666666' }}>Medio</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#2AAA8A' }} /><span style={{ fontSize: 9, color: '#666666' }}>Basso</span></div>
                      </div>
                    </div>
                  ) : (
                    // HEATMAP MENSILE - Griglia Calendario WOW
                    <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,107,53,0.02))', borderRadius: 16, padding: 15, border: '1px solid rgba(255,107,53,0.2)', gridColumn: 'span 2' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ fontSize: 14, color: '#2AAA8A', fontWeight: 600 }}>🔥 TEMPERATURA CONTRATTI</div>
                        <div style={{ fontSize: 10, color: '#666666' }}>Giorni caldi del mese</div>
                      </div>
                      {(() => {
                        const maxM = Math.max(...stats.monthlyData, 1);
                        const daysInMonth = stats.monthInfo?.daysInMonth || 31;
                        const firstDay = stats.monthInfo?.firstDay || 0;
                        const dayLabels = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
                        
                        return (
                          <div>
                            {/* Header giorni settimana */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 6 }}>
                              {dayLabels.map((d, i) => (
                                <div key={i} style={{ textAlign: 'center', fontSize: 10, color: '#999999', fontWeight: 600 }}>{d}</div>
                              ))}
                            </div>
                            {/* Griglia calendario */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                              {/* Celle vuote prima del primo giorno */}
                              {Array(firstDay).fill(null).map((_, i) => (
                                <div key={`empty-${i}`} style={{ height: 32 }} />
                              ))}
                              {/* Giorni del mese */}
                              {stats.monthlyData.slice(0, daysInMonth).map((val, i) => {
                                const intensity = val / maxM;
                                const bgColor = val === 0 ? '#F5F5F5' : 
                                               intensity > 0.7 ? '#4CAF50' : 
                                               intensity > 0.4 ? '#FFD700' : '#E53935';
                                const isHot = intensity > 0.7 && val > 0;
                                return (
                                  <div key={i} style={{ 
                                    height: 32, 
                                    borderRadius: 6, 
                                    background: bgColor, 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    position: 'relative',
                                    boxShadow: isHot ? '0 0 10px rgba(76,175,80,0.5)' : 'none',
                                    transition: 'all 0.2s'
                                  }}>
                                    <span style={{ fontSize: 10, color: val === 0 ? '#AAAAAA' : '#fff', fontWeight: val > 0 ? 600 : 400 }}>{i + 1}</span>
                                    {val > 0 && <span style={{ fontSize: 8, color: '#333333', fontWeight: 700 }}>{val}</span>}
                                    {isHot && <span style={{ position: 'absolute', top: -4, right: -2, fontSize: 8 }}>🔥</span>}
                                  </div>
                                );
                              })}
                            </div>
                            {/* Legenda */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 12 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#4CAF50', boxShadow: '0 0 6px rgba(76,175,80,0.5)' }} /><span style={{ fontSize: 10, color: '#666666' }}>🔥 Caldo</span></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#FFD700' }} /><span style={{ fontSize: 10, color: '#666666' }}>Tiepido</span></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#E53935' }} /><span style={{ fontSize: 10, color: '#666666' }}>Freddo</span></div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* GRAFICI TORTA - DISTRIBUZIONI */}
                {(() => {
                  const pies = getPieDistributions();
                  const totalK = pies.k.reduce((s, [,v]) => s + v, 0);
                  const totalStati = pies.stati.reduce((s, [,v]) => s + v, 0);
                  
                  // Funzione per disegnare torta mini SVG
                  const MiniPie = ({ data, total, colors, size = 70 }) => {
                    if (!data.length || total === 0) return <div style={{ width: size, height: size, borderRadius: '50%', background: '#E0E0E0' }} />;
                    let cumulative = 0;
                    const paths = data.slice(0, 6).map(([name, val], i) => {
                      const pct = val / total;
                      const startAngle = cumulative * 360;
                      cumulative += pct;
                      const endAngle = cumulative * 360;
                      const largeArc = pct > 0.5 ? 1 : 0;
                      const r = size / 2 - 2;
                      const cx = size / 2, cy = size / 2;
                      const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180);
                      const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180);
                      const x2 = cx + r * Math.cos((endAngle - 90) * Math.PI / 180);
                      const y2 = cy + r * Math.sin((endAngle - 90) * Math.PI / 180);
                      return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`} fill={colors[i % colors.length]} />;
                    });
                    return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{paths}</svg>;
                  };
                  
                  return (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                      {/* TORTA K MANAGER - ORO */}
                      {pies.k.length > 0 && (
                        <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,215,0,0.02))', borderRadius: 16, padding: 15, border: '2px solid rgba(255,215,0,0.3)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <MiniPie data={pies.k} total={totalK} colors={PIE_COLORS_K} size={65} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, color: '#FFD700', fontWeight: 600, marginBottom: 6 }}>👑 K MANAGER</div>
                              {pies.k.slice(0, 5).map(([name, val], i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#444444', marginBottom: 2 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS_K[i] }} />
                                    {name}
                                  </span>
                                  <span style={{ fontWeight: 600, color: '#333' }}>{val} ({Math.round(val/totalK*100)}%)</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* TORTA STATI - VERDE */}
                      {pies.stati.length > 0 && (
                        <div style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))', borderRadius: 16, padding: 15, border: '2px solid rgba(76,175,80,0.3)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <MiniPie data={pies.stati} total={totalStati} colors={pies.stati.map(([s]) => STATO_COLORS[s] || '#666666')} size={65} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, color: '#4CAF50', fontWeight: 600, marginBottom: 6 }}>📋 STATI</div>
                              {pies.stati.slice(0, 4).map(([name, val], i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#444444', marginBottom: 2 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: 2, background: STATO_COLORS[name] || '#666666' }} />
                                    {name}
                                  </span>
                                  <span style={{ fontWeight: 600, color: '#333' }}>{val} ({Math.round(val/totalStati*100)}%)</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* BARRA NW TOP 5 - BLU */}
                      {pies.nw.length > 0 && (
                        <div style={{ background: 'linear-gradient(135deg, rgba(33,150,243,0.08), rgba(33,150,243,0.02))', borderRadius: 16, padding: 15, border: '2px solid rgba(33,150,243,0.3)', gridColumn: pies.k.length > 0 && pies.stati.length > 0 ? 'span 2' : 'span 1' }}>
                          <div style={{ fontSize: 12, color: '#2196F3', fontWeight: 600, marginBottom: 10 }}>⭐ TOP 5 NETWORKER</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {pies.nw.slice(0, 5).map(([name, val], i) => {
                              const maxNw = pies.nw[0]?.[1] || 1;
                              return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ width: 20, fontSize: 10, color: '#666666' }}>{i+1}°</span>
                                  <div style={{ flex: 1, height: 18, background: '#F0F7FF', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                                    <div style={{ width: `${(val/maxNw)*100}%`, height: '100%', background: `linear-gradient(90deg, ${PIE_COLORS_NW[i]}, ${PIE_COLORS_NW[i]}88)`, borderRadius: 4 }} />
                                    <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 9, color: '#333333' }}>{name}</span>
                                  </div>
                                  <span style={{ width: 25, fontSize: 11, fontWeight: 600, color: '#333', textAlign: 'right' }}>{val}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* CLASSIFICHE COMPLETE - STILE NUOVO */}
                {(() => {
                  const pies = getPieDistributions();
                  // Tabella stile nuovo - sfondo verde, testo nero
                  const ClassificaTable = ({ title, emoji, data, color }) => {
                    if (!data || data.length === 0) return null;
                    return (
                      <div style={{ background: 'linear-gradient(135deg, rgba(42,170,138,0.12), rgba(42,170,138,0.04))', borderRadius: 16, padding: 15, border: `2px solid ${color}40` }}>
                        <div style={{ fontSize: 14, color: color, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{emoji}</span> {title}
                        </div>
                        <div style={{ overflowX: 'auto', maxHeight: 280, overflowY: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid rgba(42,170,138,0.3)' }}>
                                <th style={{ padding: '8px 4px', textAlign: 'center', color: '#333', fontWeight: 600, width: 30 }}>#</th>
                                <th style={{ padding: '8px 4px', textAlign: 'left', color: '#333', fontWeight: 600 }}>Nome</th>
                                <th style={{ padding: '8px 4px', textAlign: 'center', color: '#333', fontWeight: 600 }}>Tot</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.slice(0, 15).map(([name, val], i) => {
                                const tot = typeof val === 'object' ? (val.v1 || val.total || 0) : val;
                                return (
                                  <tr key={i} style={{ borderBottom: '1px solid rgba(42,170,138,0.15)', background: i < 3 ? 'rgba(42,170,138,0.15)' : 'transparent' }}>
                                    <td style={{ padding: '8px 4px', textAlign: 'center', fontWeight: i < 3 ? 700 : 400, fontSize: 11, color: '#333' }}>
                                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}
                                    </td>
                                    <td style={{ padding: '8px 4px', fontWeight: i < 3 ? 600 : 400, color: '#333', fontSize: 11, maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</td>
                                    <td style={{ padding: '8px 4px', textAlign: 'center', color: '#333', fontWeight: 700, fontSize: 13 }}>{tot}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  };
                  
                  return (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                      <ClassificaTable title="K MANAGER" emoji="👑" data={pies.k} color="#FFD700" />
                      <ClassificaTable title="NETWORKER" emoji="⭐" data={pies.nw} color="#2AAA8A" />
                      <ClassificaTable title="SDP" emoji="🔵" data={rankings?.sdp_inseriti || []} color="#2196F3" />
                      <ClassificaTable title="IVD" emoji="🟠" data={rankings?.ivd_inseriti || []} color="#FF9800" />
                    </div>
                  );
                })()}

                {/* BOTTONI DOWNLOAD SLIDE */}
                <div style={{ background: 'linear-gradient(135deg, rgba(42,170,138,0.2), rgba(42,170,138,0.05))', borderRadius: 16, padding: 20, border: '1px solid rgba(42,170,138,0.3)' }}>
                  <div style={{ fontSize: 16, color: '#2AAA8A', fontWeight: 700, marginBottom: 5 }}>📥 SCARICA PER SLIDE</div>
                  <div style={{ fontSize: 12, color: '#666666', marginBottom: 15 }}>PNG 1920x1080 (16:9) - Sfondo verde NWG</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button style={{ ...S.btn, flex: 1, minWidth: 180, padding: '14px 20px', background: 'linear-gradient(135deg, #2AAA8A, #20917A)', fontSize: 14 }} onClick={() => downloadSlidePNG('full')}>📊 Podio + Classifica</button>
                    <button style={{ ...S.btn, flex: 1, minWidth: 180, padding: '14px 20px', background: 'linear-gradient(135deg, #FFD700, #20917A)', color: '#FFFFFF', fontSize: 14 }} onClick={() => downloadSlidePNG('solo')}>🏆 Solo Podio</button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* CLASSIFICHE TAB */}
          {rankings && activeTab === 'classifiche' ? (<div style={S.rankCard}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}><div><h2 style={{ color: config.color, fontSize: 18, margin: 0 }}>{config.emoji} {config.label}</h2><p style={{ color: '#666666', fontSize: 12, marginTop: 4 }}>{getData().length} partecipanti • {getClassificaTotal()} contratti • {eventDate}</p></div><div style={{ display: 'flex', gap: 15 }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: config.color }}>{getClassificaTotal()}</div><div style={{ fontSize: 9, color: '#999999' }}>{labels.c1}</div></div><div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#4CAF50' }}>{getData().reduce((s,[,x])=>s+x.v2,0)}</div><div style={{ fontSize: 9, color: '#999999' }}>{labels.c2}</div></div></div></div><div style={{ overflowX: 'auto', maxHeight: '50vh', overflowY: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 300 }}><thead><tr style={{ borderBottom: '1px solid #E0E0E0' }}><th style={S.th}>#</th><th style={{ ...S.th, textAlign: 'left' }}>Nome</th><th style={S.th}>{labels.c1}</th>{isExclusive() && <><th style={S.th}>%</th><th style={S.th}>{labels.c2}</th></>}</tr></thead><tbody>{getData().map(([name, s], i) => { const p = s.v1 > 0 ? Math.round(s.v2 / s.v1 * 100) : 0; return (<tr key={name} style={{ borderBottom: '1px solid #F5F5F5', ...(i < 3 ? { background: `${config.color}10` } : {}) }}><td style={{ padding: 10, textAlign: 'center' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td><td style={{ padding: 10, fontWeight: i < 3 ? 700 : 500, fontSize: 13 }}>{name}</td><td style={{ padding: 10, textAlign: 'center', color: config.color, fontWeight: 700 }}>{s.v1}</td>{isExclusive() && <><td style={{ padding: 10, textAlign: 'center', color: p >= 50 ? '#4CAF50' : '#FFD700', fontSize: 12 }}>{p}%</td><td style={{ padding: 10, textAlign: 'center', color: '#4CAF50', fontWeight: 700 }}>{s.v2}</td></>}</tr>); })}</tbody></table></div>{(user.role === 'admin' || user.role === 'assistente') && (<div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', alignItems: 'center' }}><button style={{ ...S.btn, flex: 1, minWidth: 120, background: `linear-gradient(135deg,${config.color},${config.color}88)` }} onClick={handleGenerate}>📸 PNG 1080x1080</button><button style={{ ...S.btn, flex: 1, minWidth: 120, background: 'linear-gradient(135deg,#2AAA8A,#4DB6AC)' }} onClick={() => handleSendToBot()}>🤖 Invia a Bot</button>{sendStatus && <span style={{ fontSize: 13, color: sendStatus.includes('✅') ? '#4CAF50' : sendStatus.includes('❌') ? '#f44' : '#FFD700' }}>{sendStatus}</span>}</div>)}{user.role === 'k' && (<div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', alignItems: 'center' }}><button style={{ ...S.btn, flex: 1, minWidth: 120, background: `linear-gradient(135deg,${config.color},${config.color}88)` }} onClick={handleGenerate}>📸 PNG 1080x1080</button><button style={{ ...S.btn, flex: 1, minWidth: 120, background: 'linear-gradient(135deg,#2AAA8A,#20917A)' }} onClick={() => handleSendToBot()}>🤖 Invia a Bot</button></div>)}</div>) : !rankings && (<div style={{ textAlign: 'center', padding: 60, color: '#999999' }}><div style={{ fontSize: 50 }}>📊</div><p>Carica un CSV per iniziare</p></div>)}
        </section>
      </main>
      {showConfirmModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: 'linear-gradient(135deg,#FFFFFF,#F5F5F5)', borderRadius: 20, padding: 30, maxWidth: 450, width: '100%', border: '1px solid #E0E0E0' }}>
            <h2 style={{ color: '#FFD700', marginBottom: 20, fontSize: 20 }}>⚠️ VERIFICA PRIMA DI INVIARE</h2>
            <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <p style={{ color: '#444444', marginBottom: 10, fontSize: 14 }}>📊 <strong style={{ color: '#333333' }}>Classifica:</strong> {config.label}</p>
              <p style={{ color: '#444444', marginBottom: 10, fontSize: 14 }}>📅 <strong style={{ color: '#333333' }}>Evento:</strong> {eventName} - {eventDate}</p>
              <p style={{ color: '#444444', marginBottom: 10, fontSize: 14 }}>📈 <strong style={{ color: '#333333' }}>Tipo:</strong> {periodType === 'progressiva' ? 'Progressiva' : periodType === 'settimanale' ? 'Settimanale' : 'Finale mese'}</p>
              <div style={{ height: 1, background: '#E0E0E0', margin: '15px 0' }} />
              <p style={{ color: '#444444', marginBottom: 8, fontSize: 14 }}>📥 <strong style={{ color: config.color }}>{getClassificaTotal()}</strong> {labels.c1}</p>
              <p style={{ color: '#444444', marginBottom: 8, fontSize: 14 }}>✅ <strong style={{ color: '#4CAF50' }}>{getData().reduce((s,[,x])=>s+x.v2,0)}</strong> {labels.c2}</p>
              <p style={{ color: '#444444', fontSize: 14 }}>👥 <strong style={{ color: '#333333' }}>{getData().length}</strong> partecipanti</p>
            </div>
            <p style={{ color: '#FFD700', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>✅ I numeri sono corretti?</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ ...S.btn, flex: 1, background: 'transparent', border: '1px solid #E0E0E0' }} onClick={() => setShowConfirmModal(false)}>Annulla</button>
              <button style={{ ...S.btn, flex: 1, background: 'linear-gradient(135deg,#4CAF50,#81C784)' }} onClick={() => { setShowConfirmModal(false); handleSendToBot(true); }}>✅ Conferma e Invia</button>
            </div>
          </div>
        </div>
      )}
    </div></>);
}

const S = {
  loginWrap: { 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20, 
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif',
    position: 'relative',
    overflow: 'hidden',
    background: '#0a0a0f'
  },
  loginBgImage: {
    position: 'absolute',
    inset: '-20px',
    backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    animation: 'kenBurns 25s ease-in-out infinite alternate',
    zIndex: 0
  },
  loginOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(42,170,138,0.25) 50%, rgba(0,0,0,0.7) 100%)',
    zIndex: 1
  },
  loginCard: { 
    background: 'rgba(255,255,255,0.92)', 
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.3)', 
    borderRadius: 24, 
    padding: '50px 40px', 
    width: '100%', 
    maxWidth: 420, 
    textAlign: 'center', 
    color: '#333333', 
    boxShadow: '0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset',
    position: 'relative',
    zIndex: 2
  },
  logoContainer: { marginBottom: 30 }, 
  logoIcon: { marginBottom: 20 },
  podium: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 6, height: 65 },
  podiumBar: { width: 36, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  podiumNum: { fontSize: 14, fontWeight: 800, color: '#333333' },
  logoText: { fontSize: 36, marginBottom: 8, color: '#333333', letterSpacing: '-0.5px' }, 
  logoTagline: { color: '#2AAA8A', fontSize: 14, fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' },
  loginDivider: { height: 2, background: 'linear-gradient(90deg, transparent, #2AAA8A, transparent)', margin: '28px 0', borderRadius: 1 },
  input: { width: '100%', padding: '18px 20px', fontSize: 16, border: '2px solid #E8E8E8', borderRadius: 14, background: 'rgba(255,255,255,0.9)', color: '#333333', marginBottom: 16, outline: 'none', boxSizing: 'border-box', transition: 'all 0.3s ease' },
  btn: { padding: '18px 28px', fontSize: 16, fontWeight: 700, border: 'none', borderRadius: 14, background: 'linear-gradient(135deg, #2AAA8A 0%, #20917A 100%)', color: '#FFFFFF', cursor: 'pointer', width: '100%', boxShadow: '0 8px 25px rgba(42,170,138,0.35)', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px' },
  categoryIcons: { display: 'flex', justifyContent: 'center', gap: 24, marginTop: 35 }, 
  catIcon: { fontSize: 28, opacity: 0.7, transition: 'all 0.3s ease' },
  homeWrap: { minHeight: '100vh', background: '#F5F5F5', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif' },
  homeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #E0E0E0', background: '#FFFFFF' },
  homeLogoSmall: { fontSize: 18, color: '#333333' },
  logoutBtn: { padding: '8px 16px', fontSize: 13, border: '1px solid #E0E0E0', borderRadius: 8, background: 'transparent', color: '#333333', cursor: 'pointer' },
  homeMain: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', padding: 30 },
  homeLogo: { textAlign: 'center', marginBottom: 50 }, homeLogoIcon: { marginBottom: 20 },
  homePodium: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, height: 90 },
  homePodiumBar: { width: 50, borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
  homePodiumNum: { fontSize: 20, fontWeight: 800, color: '#333333' },
  homeTitle: { fontSize: 48, fontWeight: 300, color: '#333333', marginBottom: 8 }, homeSubtitle: { fontSize: 16, color: '#666666', fontStyle: 'italic' },
  uploadArea: { width: '100%', maxWidth: 500, border: '3px dashed #2AAA8A50', borderRadius: 20, padding: '60px 40px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: '#FFFFFF' },
  uploadAreaActive: { borderColor: '#2AAA8A', background: 'rgba(42,170,138,0.05)', transform: 'scale(1.02)' },
  uploadLabel: { cursor: 'pointer', display: 'block' }, uploadIcon: { fontSize: 70, marginBottom: 20 }, uploadText: { fontSize: 22, fontWeight: 700, color: '#2AAA8A', marginBottom: 10 }, uploadHint: { fontSize: 14, color: '#666666' },
  categoriesPreview: { display: 'flex', gap: 20, marginTop: 50, flexWrap: 'wrap', justifyContent: 'center' },
  catPreviewItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '15px 25px', background: '#FFFFFF', borderRadius: 12, color: '#666666', fontSize: 13, border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  catPreviewIcon: { fontSize: 28 }, homeFooter: { marginTop: 40, color: '#999999', fontSize: 12 },
  previewWrap: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 15 },
  previewModal: { background: '#FFFFFF', borderRadius: 20, padding: 25, width: '100%', maxWidth: 600, maxHeight: '95vh', display: 'flex', flexDirection: 'column', border: '1px solid #E0E0E0', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  previewImg: { background: '#F8F9FA', borderRadius: 12, padding: 12, overflow: 'auto', flex: 1 },
  dash: { minHeight: '100vh', background: '#F5F5F5', color: '#333333', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#FFFFFF', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  menuBtn: { background: 'none', border: 'none', color: '#333333', fontSize: 22, cursor: 'pointer' },
  badge: { fontSize: 10, padding: '4px 10px', background: 'rgba(42,170,138,0.15)', color: '#2AAA8A', borderRadius: 15, fontWeight: 700 },
  sidebar: { position: 'fixed', top: 0, left: 0, width: 280, height: '100vh', background: '#FFFFFF', padding: '60px 15px 20px', overflowY: 'auto', zIndex: 200, transform: 'translateX(-100%)', transition: 'transform 0.3s', boxSizing: 'border-box', borderRight: '1px solid #E0E0E0', boxShadow: '4px 0 20px rgba(0,0,0,0.08)' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 },
  catLabel: { fontSize: 10, color: '#999999', letterSpacing: 1, marginTop: 15, marginBottom: 6, textTransform: 'uppercase' },
  menuItem: { display: 'block', width: '100%', padding: '10px 14px', fontSize: 13, border: 'none', borderRadius: 8, background: 'transparent', color: '#666666', cursor: 'pointer', textAlign: 'left', marginBottom: 2 },
  menuActive: { background: 'rgba(42,170,138,0.12)', color: '#2AAA8A' },
  divider: { height: 1, background: '#E0E0E0', margin: '15px 0' },
  periodBtn: { display: 'block', width: '100%', padding: '8px 12px', fontSize: 12, border: '1px solid #E0E0E0', borderRadius: 6, background: '#FFFFFF', color: '#666666', cursor: 'pointer', marginBottom: 8, textAlign: 'left' },
  select: { width: '100%', padding: '10px', fontSize: 13, border: '1px solid #E0E0E0', borderRadius: 8, background: '#FFFFFF', color: '#333333', marginBottom: 8 },
  inputSm: { width: '100%', padding: '8px 10px', fontSize: 12, border: '1px solid #E0E0E0', borderRadius: 6, background: '#FFFFFF', color: '#333333', marginBottom: 8, boxSizing: 'border-box' },
  content: { flex: 1, padding: 15, minHeight: 'calc(100vh - 60px)' },
  uploadBox: { border: '2px dashed #2AAA8A40', borderRadius: 12, padding: '20px', textAlign: 'center', marginBottom: 15, transition: 'all 0.3s', background: '#FFFFFF' },
  rankCard: { background: '#FFFFFF', borderRadius: 16, padding: 18, border: '1px solid #E0E0E0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' },
  th: { padding: 10, fontSize: 10, fontWeight: 700, color: '#999999', textTransform: 'uppercase', textAlign: 'center' },
};
