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

  // Colori per torte e stati
  const PIE_COLORS = ['#FFD700', '#2AAA8A', '#2AAA8A', '#4CAF50', '#2AAA8A', '#E91E63', '#2AAA8A', '#2AAA8A', '#2AAA8A', '#666666'];
  const STATO_COLORS = { 
    'Accettato': '#4CAF50', 'Sospeso': '#FFD700', 'In sospeso': '#FFD700', 'Presente': '#4CAF50', 'Assente': '#2AAA8A', 
    'In lavorazione': '#2AAA8A', 'Installato': '#2AAA8A', 'Impianto installato': '#2AAA8A', 'Recesso': '#f44336', 
    'Annullato': '#999999', 'In fornitura': '#4CAF50', 'Attivo': '#4CAF50', 'Cessato': '#666666', 'Negativo': '#f44336',
    'Non perfezionato': '#999999', 'Respinto': '#f44336', 'Da attivare': '#FFD700', 'Risoluzione': '#2AAA8A'
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
    // 🟢 POSITIVO (alta probabilità conversione)
    'Impianto installato': 'positivo', 
    'AAC contratto accettato': 'positivo', 'AAC – Contratto accettato in attesa sblocco': 'positivo',
    'Impianto pronto per spedizione': 'positivo', 'Impianto pronto spedizione': 'positivo',
    'Cantiere aperto': 'positivo', 
    'Impianto in consegna': 'positivo',
    'Rep.Amm – Contratto appena inserito': 'positivo', 'Rep.Amm appena inserito': 'positivo', 'Appena inserito': 'positivo', 'Rep.Amm - Contratto appena inserito': 'positivo',
    'Ok finanziario ma non tecnico': 'positivo', 'Ok finanziario': 'positivo', 'Ok fin ma non tecnico': 'positivo',
    // 🟡 IN LAVORAZIONE (recuperabili)
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
    
    // Helper per heatmap mesi (12 mesi)
    const calcHeatmapMesi = (data) => {
      const mesi = Array(12).fill(0);
      const giorniPerMese = {};
      
      data.forEach(row => {
        const dateStr = row['Inserimento'] || row['Data'] || row['Data Inserimento'] || row['Data SI'] || '';
        if (dateStr) {
          try {
            const d = new Date(dateStr.replace(' ', 'T'));
            if (!isNaN(d.getTime())) {
              const month = d.getMonth();
              const day = d.getDate();
              mesi[month]++;
              if (!giorniPerMese[month]) giorniPerMese[month] = Array(31).fill(0);
              if (day >= 1 && day <= 31) giorniPerMese[month][day - 1]++;
            }
          } catch (e) {}
        }
      });
      
      return { mesi, giorniPerMese };
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
      const oggi = new Date();
      
      ivdData.forEach(row => {
        const nomeIvd = row['Nome Intermediario'] || '';
        const dataAttStr = row['Inserimento'] || row['Data'] || row['Data Attivazione'] || '';
        
        if (nomeIvd && dataAttStr) {
          try {
            const dataAttivazione = new Date(dataAttStr.replace(' ', 'T'));
            if (isNaN(dataAttivazione.getTime())) return;
            
            const tracker = {
              nome: nomeIvd,
              dataAttivazione: dataAttStr.split(' ')[0],
              primaLA: null,
              giorniLA: null,
              primaFV: null,
              giorniFV: null,
              primoIscritto: null,
              giorniIscritto: null,
              primoAttivato: null,
              giorniAttivato: null
            };
            
            // Cerca prima Luce Amica
            laData.forEach(la => {
              const intermediario = la['Nome Intermediario'] || '';
              if (intermediario.toLowerCase().includes(nomeIvd.toLowerCase()) || 
                  nomeIvd.toLowerCase().includes(intermediario.toLowerCase())) {
                const dataLA = la['Inserimento'] || la['Data'] || '';
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
            
            // Cerca primo Fotovoltaico
            fvData.forEach(fv => {
              const intermediario = fv['Nome Intermediario'] || '';
              if (intermediario.toLowerCase().includes(nomeIvd.toLowerCase()) || 
                  nomeIvd.toLowerCase().includes(intermediario.toLowerCase())) {
                const dataFV = fv['Inserimento'] || fv['Data'] || '';
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
            
            // Cerca primo Iscritto (seminario)
            semData.forEach(sem => {
              const intermediario = sem['Nome Intermediario'] || sem['Nome Primo Networker'] || '';
              if (intermediario.toLowerCase().includes(nomeIvd.toLowerCase()) || 
                  nomeIvd.toLowerCase().includes(intermediario.toLowerCase())) {
                const dataSem = sem['Inserimento'] || sem['Data'] || sem['Data SI'] || '';
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
            
            // Cerca primo Attivato (collaboratore)
            ivdData.forEach(ivd => {
              const sponsor = ivd['Nome Primo Networker'] || ivd['Sponsor'] || '';
              if (sponsor.toLowerCase().includes(nomeIvd.toLowerCase()) || 
                  nomeIvd.toLowerCase().includes(sponsor.toLowerCase())) {
                const dataAtt = ivd['Inserimento'] || ivd['Data'] || '';
                if (dataAtt) {
                  const d = new Date(dataAtt.replace(' ', 'T'));
                  if (!isNaN(d.getTime()) && d >= dataAttivazione) {
                    if (!tracker.primoAttivato || d < new Date(tracker.primoAttivato.replace(' ', 'T'))) {
                      tracker.primoAttivato = dataAtt.split(' ')[0];
                      tracker.giorniAttivato = Math.floor((d - dataAttivazione) / (1000 * 60 * 60 * 24));
                    }
                  }
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
    ctx.fillText(`Leader Ranking v10.2 • Generato il ${new Date().toLocaleDateString('it-IT')}`, W/2, H - 25);
    
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
    
    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0a0a12'); bg.addColorStop(0.5, '#F5F5F5'); bg.addColorStop(1, '#0a0a12');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `${config.color}30`; ctx.lineWidth = 2; ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.fillStyle = config.color; ctx.fillRect(35, 35, W - 70, 4);
    
    // Header
    ctx.fillStyle = config.color; ctx.font = 'bold 16px Arial'; ctx.fillText('LEADER RANKING', 45, 65);
    ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 42px Arial'; ctx.fillText(`${config.emoji} CLASSIFICA ${config.label}`, 45, 115);
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
      
      // Nomi
      ctx.fillStyle = isTop3 ? '#FFF' : '#333333';
      ctx.font = `bold ${fontSize}px Arial`;
      lines.forEach((line, i) => {
        ctx.fillText(line, 100, textStartY + i * lineHeight);
      });
      
      // Valore contratti
      ctx.fillStyle = isAcc ? '#4CAF50' : config.color;
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
    ctx.fillStyle = '#666666'; ctx.font = '18px Arial';
    ctx.fillText(`${eventName} • ${eventDate}`, W/2, 138);
    
    // Stats - INLINE format (fix richiesto)
    const totIns = getClassificaTotal(), totAcc = getData().reduce((sum, [,s]) => sum + s.v2, 0), pct = Math.round(totAcc / totIns * 100) || 0;
    ctx.fillStyle = '#F5F5F5'; ctx.beginPath(); ctx.roundRect(W/2 - 175, 158, 350, 42, 8); ctx.fill();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = config.color; ctx.fillText(`${totIns} INS.`, W/2 - 85, 186);
    ctx.fillStyle = pct >= 50 ? '#4CAF50' : '#FFD700'; ctx.fillText(`${pct}%`, W/2, 186);
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
      else { grad.addColorStop(0, '#F5F5F5'); grad.addColorStop(1, '#FCFCFC'); }
      
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
        ctx.fillStyle = '#666666';
      }
      
      ctx.font = 'bold 26px Arial';
      ctx.fillText(`${i + 1}°`, isTop3 ? 130 : 80, centerY + 10);
      
      // Name
      ctx.fillStyle = isTop3 ? (i === 0 ? '#FFD700' : '#FFF') : '#333333';
      ctx.font = 'bold 26px Arial';
      ctx.fillText(name.toUpperCase(), isTop3 ? 185 : 130, centerY + 10);
      
      // Stats con label INLINE (fix richiesto)
      ctx.textAlign = 'right';
      ctx.fillStyle = isTop3 ? (i === 0 ? '#FFD700' : '#FFF') : '#333333';
      ctx.font = 'bold 30px Arial';
      ctx.fillText(`${s.v1}`, W - 300, centerY + 5);
      ctx.fillStyle = '#999999'; ctx.font = '11px Arial';
      ctx.fillText('INS.', W - 300, centerY + 22);
      
      // Progress bar
      const barX = W - 270, barW = 105;
      ctx.fillStyle = '#E0E0E0'; ctx.beginPath(); ctx.roundRect(barX, centerY - 10, barW, 18, 5); ctx.fill();
      const barC = pctM >= 50 ? '#4CAF50' : pctM >= 20 ? '#FFD700' : '#2AAA8A';
      ctx.fillStyle = barC; ctx.beginPath(); ctx.roundRect(barX, centerY - 10, Math.max(barW * pctM / 100, 1), 18, 5); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = 'bold 12px Arial'; ctx.textAlign = 'center';
      ctx.fillText(`${pctM}%`, barX + barW / 2, centerY + 4);
      
      // Accettati con label INLINE
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
        {/* HEATMAP CALENDARIO */}
        {Object.keys(reportData.heatmapMesi).length > 0 && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <h3 style={{ color: '#2AAA8A', fontSize: 16, marginBottom: 15, fontWeight: 700 }}>🗓️ CALENDARIO ATTIVITÀ</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 15 }}>
              {Object.entries(reportData.heatmapMesi).map(([type, heatData]) => {
                const info = { fv: { emoji: '☀️', label: 'Fotovoltaico', color: '#2AAA8A' }, energy: { emoji: '⚡', label: 'Luce Amica', color: '#FFD700' }, consultings: { emoji: '🎓', label: 'Seminari', color: '#2AAA8A' }, ivd: { emoji: '🟠', label: 'Attivati', color: '#FF9800' } }[type];
                if (!info) return null;
                const mesiNomi = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
                const maxMese = Math.max(...heatData.mesi, 1);
                return (
                  <div key={type} style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: '1px solid #E8E8E8' }}>
                    <div style={{ fontSize: 13, color: info.color, fontWeight: 600, marginBottom: 10 }}>{info.emoji} {info.label}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                      {heatData.mesi.map((val, i) => {
                        const intensity = val / maxMese;
                        const bgColor = val === 0 ? '#F0F0F0' : intensity > 0.7 ? '#4CAF50' : intensity > 0.3 ? '#FFD700' : '#E53935';
                        return (
                          <div key={i} style={{ height: 38, borderRadius: 6, background: bgColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 9, color: val === 0 ? '#AAA' : '#FFF' }}>{mesiNomi[i]}</span>
                            {val > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: '#FFF' }}>{val}</span>}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ textAlign: 'right', marginTop: 8, fontSize: 12, color: '#666' }}>Totale: <strong style={{ color: info.color }}>{heatData.mesi.reduce((a,b) => a+b, 0)}</strong></div>
                  </div>
                );
              })}
            </div>
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
            
            {/* FUNNEL GRANDE */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 25, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#2AAA8A' }}>{reportData.pilastri.fv.funnel.inseriti}</div>
                <div style={{ fontSize: 12, color: '#666' }}>📋 Inseriti</div>
              </div>
              <div style={{ fontSize: 24, color: '#E0E0E0' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.fv.funnel.positivi}</div>
                <div style={{ fontSize: 12, color: '#333' }}>🟢 Positivi <span style={{ fontSize: 10, color: '#4CAF50' }}>({reportData.pilastri.fv.funnel.pctPositivi}%)</span></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#FFD700' }}>{reportData.pilastri.fv.funnel.lavorazione}</div>
                <div style={{ fontSize: 12, color: '#333' }}>🟡 Lavoraz.</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#E53935' }}>{reportData.pilastri.fv.funnel.negativi}</div>
                <div style={{ fontSize: 12, color: '#333' }}>🔴 Persi <span style={{ fontSize: 10, color: '#E53935' }}>({reportData.pilastri.fv.funnel.pctNegativi}%)</span></div>
              </div>
            </div>
            
            {/* DETTAGLIO STATI con pallini */}
            <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}>📋 DETTAGLIO STATI</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {reportData.pilastri.fv.statiDettaglio.map(([stato, count], i) => {
                  const cat = Object.entries(STATO_MAP_FV).find(([k]) => k.toLowerCase() === stato.toLowerCase())?.[1] || 'altro';
                  const color = STATO_COLORS_DISPLAY[cat] || '#999';
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFF', padding: '6px 12px', borderRadius: 20, border: '1px solid #E8E8E8' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }}></span>
                      <span style={{ fontSize: 11, color: '#333' }}>{stato}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: color }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* CLASSIFICHE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { title: 'K MANAGER', emoji: '👑', data: reportData.pilastri.fv.classifiche.k, color: '#FFD700' },
                { title: 'NETWORKER', emoji: '⭐', data: reportData.pilastri.fv.classifiche.nw, color: '#2AAA8A' },
                { title: 'SDP', emoji: '🔵', data: reportData.pilastri.fv.classifiche.sdp, color: '#2196F3' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: '#FAFAFA', borderRadius: 12, padding: 12, border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 12, color: color, fontWeight: 600, marginBottom: 8 }}>{emoji} {title}</div>
                  <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                    {data.slice(0, 10).map(([name, stats], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F0F0F0', fontSize: 11 }}>
                        <span style={{ color: '#333', fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                        <div style={{ display: 'flex', gap: 8 }}>
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
            
            {/* STATI NWG SPA */}
            <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 15 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}>📋 STATI NWG SPA</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {reportData.pilastri.energy.statiNwgSpa.map(([stato, count], i) => {
                  const cat = STATO_MAP_LA_SPA[stato] || 'altro';
                  const color = STATO_COLORS_DISPLAY[cat] || '#999';
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFF', padding: '6px 12px', borderRadius: 20, border: '1px solid #E8E8E8' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }}></span>
                      <span style={{ fontSize: 11, color: '#333' }}>{stato}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: color }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* STATI NWG ENERGIA */}
            <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}>⚡ STATI NWG ENERGIA</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {reportData.pilastri.energy.statiNwgEnergia.map(([stato, count], i) => {
                  const cat = STATO_MAP_LA_ENERGIA[stato] || STATO_MAP_LA_ENERGIA[stato.toUpperCase()] || 'altro';
                  const color = STATO_COLORS_DISPLAY[cat] || '#999';
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFF', padding: '6px 12px', borderRadius: 20, border: '1px solid #E8E8E8' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: color }}></span>
                      <span style={{ fontSize: 11, color: '#333' }}>{stato}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: color }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* CLASSIFICHE LA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { title: 'K MANAGER', emoji: '👑', data: reportData.pilastri.energy.classifiche.k, color: '#FFD700' },
                { title: 'NETWORKER', emoji: '⭐', data: reportData.pilastri.energy.classifiche.nw, color: '#2AAA8A' },
                { title: 'SDP', emoji: '🔵', data: reportData.pilastri.energy.classifiche.sdp, color: '#2196F3' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: '#FAFAFA', borderRadius: 12, padding: 12, border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 12, color: color, fontWeight: 600, marginBottom: 8 }}>{emoji} {title}</div>
                  <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                    {data.slice(0, 10).map(([name, stats], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F0F0F0', fontSize: 11 }}>
                        <span style={{ color: '#333', fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                        <span style={{ color: '#FFD700', fontWeight: 600 }}>{stats.total || 0}</span>
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
            
            {/* CLASSIFICHE COLLAB */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { title: 'K MANAGER', emoji: '👑', data: reportData.pilastri.collaboratori.classifiche.k, color: '#FFD700' },
                { title: 'NETWORKER', emoji: '⭐', data: reportData.pilastri.collaboratori.classifiche.nw, color: '#2AAA8A' },
                { title: 'SDP', emoji: '🔵', data: reportData.pilastri.collaboratori.classifiche.sdp, color: '#2196F3' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: '#FAFAFA', borderRadius: 12, padding: 12, border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 12, color: color, fontWeight: 600, marginBottom: 8 }}>{emoji} {title}</div>
                  <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                    {data.slice(0, 10).map(([name, stats], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F0F0F0', fontSize: 11 }}>
                        <span style={{ color: '#333', fontWeight: i < 3 ? 600 : 400 }}>{i+1}° {name}</span>
                        <div style={{ display: 'flex', gap: 6 }}>
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
          {/* ALERT DA ATTIVARE */}
          {reportData.alertDaAttivare && reportData.alertDaAttivare.totale > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                <span style={{ fontSize: 24 }}>🚨</span>
                <div>
                  <h3 style={{ color: '#E53935', fontSize: 16, margin: 0, fontWeight: 700 }}>ALERT DA ATTIVARE</h3>
                  <p style={{ color: '#666', fontSize: 11, margin: 0 }}>Luce Amica in attesa NWG Energia</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 15 }}>
                <div style={{ background: 'rgba(76,175,80,0.1)', borderRadius: 10, padding: 12, textAlign: 'center', border: '2px solid #4CAF50', cursor: 'pointer' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#4CAF50' }}>{reportData.alertDaAttivare.verde.length}</div>
                  <div style={{ fontSize: 10, color: '#333' }}>🟢 0-30g</div>
                </div>
                <div style={{ background: 'rgba(255,215,0,0.1)', borderRadius: 10, padding: 12, textAlign: 'center', border: '2px solid #FFD700', cursor: 'pointer' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#FFD700' }}>{reportData.alertDaAttivare.giallo.length}</div>
                  <div style={{ fontSize: 10, color: '#333' }}>🟡 31-60g</div>
                </div>
                <div style={{ background: 'rgba(229,57,53,0.1)', borderRadius: 10, padding: 12, textAlign: 'center', border: '2px solid #E53935', cursor: 'pointer' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#E53935' }}>{reportData.alertDaAttivare.rosso.length}</div>
                  <div style={{ fontSize: 10, color: '#333' }}>🔴 &gt;60g</div>
                </div>
              </div>
              
              {/* Lista urgenti */}
              <div style={{ background: '#FFF9F9', borderRadius: 10, padding: 12, maxHeight: 250, overflowY: 'auto' }}>
                <div style={{ fontSize: 11, color: '#E53935', fontWeight: 600, marginBottom: 8 }}>⚠️ Richiede intervento ({reportData.alertDaAttivare.rosso.length + reportData.alertDaAttivare.giallo.length})</div>
                {[...reportData.alertDaAttivare.rosso, ...reportData.alertDaAttivare.giallo].slice(0, 15).map((a, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #FFE0E0', fontSize: 10 }}>
                    <div>
                      <div style={{ color: '#333', fontWeight: 500 }}>{a.cliente}</div>
                      <div style={{ color: '#999' }}>{a.intermediario}</div>
                    </div>
                    <span style={{ color: a.fascia === 'rosso' ? '#E53935' : '#FFD700', fontWeight: 700 }}>{a.giorni}g</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* TRACKER COACHING */}
          {reportData.trackerCoaching && reportData.trackerCoaching.totale > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                <span style={{ fontSize: 24 }}>🎯</span>
                <div>
                  <h3 style={{ color: '#2AAA8A', fontSize: 16, margin: 0, fontWeight: 700 }}>TRACKER COACHING</h3>
                  <p style={{ color: '#666', fontSize: 11, margin: 0 }}>Milestone nuovi IVD attivati</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 15 }}>
                <div style={{ background: '#F5F5F5', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>⚡ 1° LA</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2AAA8A' }}>{reportData.trackerCoaching.medie.la !== null ? `${reportData.trackerCoaching.medie.la}g` : '-'}</div>
                  <div style={{ fontSize: 9, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.la}%</div>
                </div>
                <div style={{ background: '#F5F5F5', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>☀️ 1° FV</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#FFD700' }}>{reportData.trackerCoaching.medie.fv !== null ? `${reportData.trackerCoaching.medie.fv}g` : '-'}</div>
                  <div style={{ fontSize: 9, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.fv}%</div>
                </div>
                <div style={{ background: '#F5F5F5', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>📝 1° Iscr</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2AAA8A' }}>{reportData.trackerCoaching.medie.iscritto !== null ? `${reportData.trackerCoaching.medie.iscritto}g` : '-'}</div>
                  <div style={{ fontSize: 9, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.iscritto}%</div>
                </div>
                <div style={{ background: '#F5F5F5', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#666' }}>🟠 1° Att</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#FF9800' }}>{reportData.trackerCoaching.medie.attivato !== null ? `${reportData.trackerCoaching.medie.attivato}g` : '-'}</div>
                  <div style={{ fontSize: 9, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.attivato}%</div>
                </div>
              </div>
              
              {/* Lista */}
              <div style={{ background: '#FAFAFA', borderRadius: 10, padding: 12, maxHeight: 250, overflowY: 'auto' }}>
                {reportData.trackerCoaching.lista.slice(0, 15).map((t, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 40px)', gap: 4, padding: '6px 0', borderBottom: '1px solid #E8E8E8', fontSize: 10, alignItems: 'center' }}>
                    <span style={{ color: '#333', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.nome}</span>
                    <span style={{ textAlign: 'center', color: t.giorniLA !== null ? '#4CAF50' : '#E53935' }}>{t.giorniLA !== null ? `${t.giorniLA}g` : '❌'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniFV !== null ? '#4CAF50' : '#E53935' }}>{t.giorniFV !== null ? `${t.giorniFV}g` : '❌'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniIscritto !== null ? '#4CAF50' : '#E53935' }}>{t.giorniIscritto !== null ? `${t.giorniIscritto}g` : '❌'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniAttivato !== null ? '#4CAF50' : '#E53935' }}>{t.giorniAttivato !== null ? `${t.giorniAttivato}g` : '❌'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* BOTTONE DOWNLOAD */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: '1px solid #E0E0E0', textAlign: 'center' }}>
          <button style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #2AAA8A, #20917A)', color: '#FFF', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            📷 SCARICA REPORT PNG
          </button>
        </div>
      </div>
    );
  };

  const labels = getLabels(), config = getConfig();

  // LOGIN
  if (!user) return (<><Head><title>Leader Ranking | Team Analytics</title><meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>{`
      @keyframes kenBurns {
        0% { transform: scale(1) translate(0, 0); }
        50% { transform: scale(1.15) translate(-2%, -1%); }
        100% { transform: scale(1.08) translate(1%, 2%); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .login-card { animation: fadeInUp 0.8s ease-out; }
      .login-input:focus { border-color: #2AAA8A; box-shadow: 0 0 0 3px rgba(42,170,138,0.2); }
      .login-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(42,170,138,0.45); }
    `}</style>
  </Head>
    <div style={S.loginWrap}>
      <div style={S.loginBgImage} />
      <div style={S.loginOverlay} />
      <div className="login-card" style={S.loginCard}>
        <div style={S.logoContainer}>
          <div style={S.logoIcon}><div style={S.podium}>
            <div style={{ ...S.podiumBar, height: 40, background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)' }}><span style={S.podiumNum}>2</span></div>
            <div style={{ ...S.podiumBar, height: 58, background: 'linear-gradient(180deg, #FFE082 0%, #FFD700 100%)' }}><span style={S.podiumNum}>1</span></div>
            <div style={{ ...S.podiumBar, height: 28, background: 'linear-gradient(180deg, #DCEDC8 0%, #CD7F32 100%)' }}><span style={S.podiumNum}>3</span></div>
          </div></div>
          <div style={S.logoText}><span style={{ color: '#2AAA8A', fontWeight: 800 }}>LEADER</span><span style={{ fontWeight: 300, marginLeft: 10 }}>RANKING</span></div>
          <div style={S.logoTagline}>Team Performance Analytics</div>
        </div>
        <div style={S.loginDivider} />
        <p style={{ color: '#555555', marginBottom: 28, fontSize: 15 }}>Accedi per visualizzare le classifiche del team</p>
        <input className="login-input" style={S.input} placeholder="Username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} />
        <input className="login-input" style={S.input} type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} onKeyPress={e => e.key === 'Enter' && handleLogin()} />
        {loginError && <p style={{ color: '#E53935', fontSize: 14, marginBottom: 12, fontWeight: 500 }}>{loginError}</p>}
        <button className="login-btn" style={S.btn} onClick={handleLogin}>ACCEDI</button>
        <div style={S.categoryIcons}>
          <span style={S.catIcon} title="IVD">🟠</span>
          <span style={S.catIcon} title="SDP">🔵</span>
          <span style={S.catIcon} title="Networker">⭐</span>
          <span style={S.catIcon} title="K Manager">👑</span>
        </div>
        <p style={{ color: '#999999', fontSize: 12, marginTop: 30 }}>v10.7</p>
      </div>
    </div></>);

  // HOMEPAGE - TABS SEMPRE VISIBILI (senza area CSV)
  if (!csvData && (user.role === 'admin' || user.role === 'assistente' || user.role === 'k')) return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={{ minHeight: '100vh', background: '#F8F9FA', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif' }}>
      <header style={{ background: '#FFFFFF', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0E0E0' }}>
        <div><span style={{ color: '#2AAA8A', fontWeight: 800, fontSize: 18 }}>LEADER</span><span style={{ fontWeight: 300, fontSize: 18 }}> RANKING</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#666666' }}>Ciao, {user.name}</span>
          <span style={{ padding: '4px 10px', background: '#2AAA8A', color: '#FFF', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{user.role.toUpperCase()}</span>
          <button style={{ ...S.btn, padding: '6px 14px', fontSize: 12, background: 'transparent', border: '1px solid #E0E0E0', color: '#666' }} onClick={() => setUser(null)}>Esci</button>
        </div>
      </header>
      
      <main style={{ padding: 20, maxWidth: 1400, margin: '0 auto' }}>
        {/* 3 TABS GRANDI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 25 }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ 
              padding: '20px', 
              background: activeTab === 'dashboard' ? 'linear-gradient(135deg, #2AAA8A, #20917A)' : '#FFFFFF', 
              color: activeTab === 'dashboard' ? '#FFF' : '#666666',
              border: activeTab === 'dashboard' ? 'none' : '1px solid #E0E0E0',
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'dashboard' ? '0 8px 25px rgba(42,170,138,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >📊 DASHBOARD</button>
          <button 
            onClick={() => setActiveTab('classifiche')}
            style={{ 
              padding: '20px', 
              background: activeTab === 'classifiche' ? 'linear-gradient(135deg, #FFD700, #FFC107)' : '#FFFFFF', 
              color: activeTab === 'classifiche' ? '#333' : '#666666',
              border: activeTab === 'classifiche' ? 'none' : '1px solid #E0E0E0',
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'classifiche' ? '0 8px 25px rgba(255,215,0,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >🏆 CLASSIFICHE</button>
          <button 
            onClick={() => setActiveTab('report')}
            style={{ 
              padding: '20px', 
              background: activeTab === 'report' ? 'linear-gradient(135deg, #2AAA8A, #20917A)' : '#FFFFFF', 
              color: activeTab === 'report' ? '#FFF' : '#666666',
              border: activeTab === 'report' ? 'none' : '1px solid #E0E0E0',
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'report' ? '0 8px 25px rgba(42,170,138,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >📈 REPORT</button>
        </div>
        
        {/* CONTENUTO TAB */}
        {(activeTab === 'dashboard' || activeTab === 'classifiche') && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 40, textAlign: 'center', border: '1px solid #E0E0E0' }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>{activeTab === 'dashboard' ? '📊' : '🏆'}</div>
            <h2 style={{ color: '#333', fontSize: 24, marginBottom: 10 }}>{activeTab === 'dashboard' ? 'Dashboard' : 'Classifiche'}</h2>
            <p style={{ color: '#666666', fontSize: 15, marginBottom: 25 }}>Carica un file CSV per visualizzare i dati</p>
            
            <div style={{ maxWidth: 500, margin: '0 auto' }}>
              <div 
                style={{ 
                  border: `2px dashed ${isDragging ? '#2AAA8A' : '#E0E0E0'}`, 
                  borderRadius: 16, 
                  padding: 40,
                  background: isDragging ? 'rgba(42,170,138,0.05)' : '#FAFAFA',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} 
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }} 
                onDragLeave={e => { e.preventDefault(); setIsDragging(false); }} 
                onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) processFile(f); }}
              >
                <input type="file" accept=".csv" id="csvUploadMain" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processFile(e.target.files[0]); }} />
                <label htmlFor="csvUploadMain" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: 40, marginBottom: 15 }}>📤</div>
                  <div style={{ color: '#2AAA8A', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>CARICA FILE CSV</div>
                  <div style={{ color: '#999', fontSize: 13 }}>Trascina qui o clicca per selezionare</div>
                </label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 25 }}>
                <span style={{ fontSize: 11, color: '#999' }}>🟠 IVD</span>
                <span style={{ fontSize: 11, color: '#999' }}>🔵 SDP</span>
                <span style={{ fontSize: 11, color: '#999' }}>⭐ NW</span>
                <span style={{ fontSize: 11, color: '#999' }}>👑 K</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'report' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* UPLOAD CSV PER REPORT */}
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 25, border: '1px solid #E0E0E0' }}>
              <h2 style={{ color: '#2AAA8A', fontSize: 20, marginBottom: 5, fontWeight: 700 }}>📈 REPORT AGGREGATO</h2>
              <p style={{ color: '#666666', fontSize: 13, marginBottom: 20 }}>Carica i CSV per generare report dettagliati con classifiche e statistiche</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                {/* IVD */}
                <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.ivd ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>🟠</span>
                    <span style={{ color: '#333', fontWeight: 600, fontSize: 13 }}>IVD Attivati</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-ivd-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('ivd', e.target.files[0]); }} />
                  <label htmlFor="csv-ivd-rep" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: reportCSVs.ivd ? 'rgba(76,175,80,0.1)' : 'rgba(42,170,138,0.08)', borderRadius: 8, textAlign: 'center', color: reportCSVs.ivd ? '#4CAF50' : '#666', fontSize: 12, fontWeight: 500 }}>
                    {reportCSVs.ivd ? `✅ ${reportCSVs.ivd.rows} righe` : '📤 Carica'}
                  </label>
                </div>
                
                {/* Luce Amica */}
                <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.energy ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>⚡</span>
                    <span style={{ color: '#333', fontWeight: 600, fontSize: 13 }}>Luce Amica</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-energy-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('energy', e.target.files[0]); }} />
                  <label htmlFor="csv-energy-rep" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: reportCSVs.energy ? 'rgba(76,175,80,0.1)' : 'rgba(42,170,138,0.08)', borderRadius: 8, textAlign: 'center', color: reportCSVs.energy ? '#4CAF50' : '#666', fontSize: 12, fontWeight: 500 }}>
                    {reportCSVs.energy ? `✅ ${reportCSVs.energy.rows} righe` : '📤 Carica'}
                  </label>
                </div>
                
                {/* FV */}
                <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.fv ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>☀️</span>
                    <span style={{ color: '#333', fontWeight: 600, fontSize: 13 }}>Fotovoltaico</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-fv-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('fv', e.target.files[0]); }} />
                  <label htmlFor="csv-fv-rep" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: reportCSVs.fv ? 'rgba(76,175,80,0.1)' : 'rgba(42,170,138,0.08)', borderRadius: 8, textAlign: 'center', color: reportCSVs.fv ? '#4CAF50' : '#666', fontSize: 12, fontWeight: 500 }}>
                    {reportCSVs.fv ? `✅ ${reportCSVs.fv.rows} righe` : '📤 Carica'}
                  </label>
                </div>
                
                {/* Seminari */}
                <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.consultings ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>🎓</span>
                    <span style={{ color: '#333', fontWeight: 600, fontSize: 13 }}>Seminari</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-cons-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('consultings', e.target.files[0]); }} />
                  <label htmlFor="csv-cons-rep" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: reportCSVs.consultings ? 'rgba(76,175,80,0.1)' : 'rgba(42,170,138,0.08)', borderRadius: 8, textAlign: 'center', color: reportCSVs.consultings ? '#4CAF50' : '#666', fontSize: 12, fontWeight: 500 }}>
                    {reportCSVs.consultings ? `✅ ${reportCSVs.consultings.rows} righe` : '📤 Carica'}
                  </label>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  style={{ flex: 2, padding: '14px 20px', background: Object.values(reportCSVs).some(v => v) ? 'linear-gradient(135deg, #2AAA8A, #20917A)' : '#E0E0E0', color: '#FFF', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: Object.values(reportCSVs).some(v => v) ? 'pointer' : 'not-allowed' }} 
                  onClick={() => setReportData(generateReportData())}
                  disabled={!Object.values(reportCSVs).some(v => v)}
                >📊 GENERA REPORT</button>
                <button 
                  style={{ flex: 1, padding: '14px 20px', background: '#FAFAFA', color: '#666', border: '1px solid #E0E0E0', borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: 'pointer' }} 
                  onClick={clearReportCSVs}
                >🗑️ Reset</button>
              </div>
            </div>
            
            {/* RISULTATI REPORT */}
            {reportData && reportData.pilastri && (
              <ReportResultsComponent reportData={reportData} />
            )}
          </div>
        )}
      </main>
      <footer style={{ textAlign: 'center', padding: 20, color: '#999', fontSize: 12 }}>v10.6 • Leader Ranking</footer>
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
      <header style={S.header}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><button style={S.menuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button><span style={{ fontWeight: 800, color: '#2AAA8A' }}>LEADER</span><span style={{ fontWeight: 300, color: '#333333' }}>RANKING</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={S.badge}>{user.role.toUpperCase()}</span><button style={{ ...S.btn, padding: '6px 12px', fontSize: 12, background: 'transparent', border: '1px solid #E0E0E0' }} onClick={() => { setUser(null); setCsvData(null); setRankings(null); }}>Esci</button></div></header>
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
          
          {/* TABS - SEMPRE VISIBILI DOPO LOGIN */}
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
            <button 
              style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'report' ? '#2AAA8A' : 'transparent', color: activeTab === 'report' ? '#fff' : '#666666', border: 'none' }} 
              onClick={() => setActiveTab('report')}
            >📈 Report</button>
          </div>
          
          {/* TAB REPORT AGGREGATO - Accessibile a TUTTI */}
          {activeTab === 'report' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
                <h2 style={{ color: '#2AAA8A', fontSize: 18, marginBottom: 5 }}>📈 REPORT AGGREGATO</h2>
                <p style={{ color: '#666666', fontSize: 12, marginBottom: 15 }}>Carica più CSV per generare classifiche mensili/trimestrali/annuali</p>
                
                {/* 4 UPLOAD CSV - Palette NWG coerente */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
                  {/* IVD */}
                  <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.ivd ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>🟠</span>
                      <span style={{ color: '#2AAA8A', fontWeight: 600 }}>IVD Attivati</span>
                    </div>
                    <input type="file" accept=".csv" id="csv-ivd" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('ivd', e.target.files[0]); }} />
                    <label htmlFor="csv-ivd" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: 'rgba(42,170,138,0.1)', borderRadius: 8, textAlign: 'center', color: reportCSVs.ivd ? '#4CAF50' : '#666666', fontSize: 12 }}>
                      {reportCSVs.ivd ? `✅ ${reportCSVs.ivd.rows} righe` : '📤 Carica CSV'}
                    </label>
                    <p style={{ color: '#999999', fontSize: 10, marginTop: 5, textAlign: 'center' }}>Solo Attivazione START&GO</p>
                  </div>
                  
                  {/* Luce Amica - rimosso arancione */}
                  <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.energy ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>⚡</span>
                      <span style={{ color: '#2AAA8A', fontWeight: 600 }}>Luce Amica</span>
                    </div>
                    <input type="file" accept=".csv" id="csv-energy" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('energy', e.target.files[0]); }} />
                    <label htmlFor="csv-energy" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: 'rgba(42,170,138,0.1)', borderRadius: 8, textAlign: 'center', color: reportCSVs.energy ? '#4CAF50' : '#666666', fontSize: 12 }}>
                      {reportCSVs.energy ? `✅ ${reportCSVs.energy.rows} righe` : '📤 Carica CSV'}
                    </label>
                  </div>
                  
                  {/* FV */}
                  <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.fv ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>☀️</span>
                      <span style={{ color: '#2AAA8A', fontWeight: 600 }}>Fotovoltaico</span>
                    </div>
                    <input type="file" accept=".csv" id="csv-fv" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('fv', e.target.files[0]); }} />
                    <label htmlFor="csv-fv" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: 'rgba(42,170,138,0.1)', borderRadius: 8, textAlign: 'center', color: reportCSVs.fv ? '#4CAF50' : '#666666', fontSize: 12 }}>
                      {reportCSVs.fv ? `✅ ${reportCSVs.fv.rows} righe` : '📤 Carica CSV'}
                    </label>
                  </div>
                  
                  {/* Seminari */}
                  <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: reportCSVs.consultings ? '2px solid #4CAF50' : '1px solid #E0E0E0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>🎓</span>
                      <span style={{ color: '#2AAA8A', fontWeight: 600 }}>Seminari</span>
                    </div>
                    <input type="file" accept=".csv" id="csv-consultings" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('consultings', e.target.files[0]); }} />
                    <label htmlFor="csv-consultings" style={{ display: 'block', cursor: 'pointer', padding: '10px', background: 'rgba(42,170,138,0.1)', borderRadius: 8, textAlign: 'center', color: reportCSVs.consultings ? '#4CAF50' : '#666666', fontSize: 12 }}>
                      {reportCSVs.consultings ? `✅ ${reportCSVs.consultings.rows} righe` : '📤 Carica CSV'}
                    </label>
                  </div>
                </div>
                
                {/* Bottoni */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button 
                    style={{ ...S.btn, flex: 1, minWidth: 150, padding: '14px 20px', background: 'linear-gradient(135deg, #2AAA8A, #20917A)', color: '#FFFFFF', opacity: Object.values(reportCSVs).some(v => v) ? 1 : 0.5 }} 
                    onClick={() => setReportData(generateReportData())}
                    disabled={!Object.values(reportCSVs).some(v => v)}
                  >📊 Genera Report</button>
                  <button 
                    style={{ ...S.btn, flex: 1, minWidth: 150, padding: '14px 20px', background: 'transparent', border: '1px solid #E0E0E0', color: '#666666' }} 
                    onClick={clearReportCSVs}
                  >🗑️ Reset</button>
                </div>
              </div>
              
              {/* RISULTATI REPORT - PILASTRI SEPARATI */}
              {reportData && reportData.pilastri && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  
                  {/* 🗓️ HEATMAP MESI - Con drill-down */}
                  {Object.keys(reportData.heatmapMesi).length > 0 && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,107,53,0.02))', borderRadius: 20, padding: 20, border: '1px solid rgba(255,107,53,0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                        <div>
                          <h3 style={{ color: '#2AAA8A', fontSize: 16, margin: 0 }}>🗓️ CALENDARIO CALDO</h3>
                          <p style={{ color: '#666666', fontSize: 11, margin: '5px 0 0' }}>
                            {heatmapDrilldown ? `Giorni di ${['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'][heatmapDrilldown.mese]} - Click per tornare ai mesi` : 'Click su un mese per vedere i giorni'}
                          </p>
                        </div>
                        {heatmapDrilldown && (
                          <button style={{ ...S.btn, padding: '8px 15px', fontSize: 12, background: '#E0E0E0' }} onClick={() => setHeatmapDrilldown(null)}>← Torna ai mesi</button>
                        )}
                      </div>
                      
                      {/* Heatmap per pilastro */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 15 }}>
                        {Object.entries(reportData.heatmapMesi).map(([type, heatData]) => {
                          const info = { fv: { emoji: '☀️', label: 'Fotovoltaico', color: '#2AAA8A' }, energy: { emoji: '⚡', label: 'Luce Amica', color: '#FFD700' }, consultings: { emoji: '🎓', label: 'Seminari', color: '#2AAA8A' }, ivd: { emoji: '🟠', label: 'Attivati', color: '#2AAA8A' } }[type];
                          if (!info) return null;
                          
                          const mesiNomi = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
                          const maxMese = Math.max(...heatData.mesi, 1);
                          
                          // Se drill-down attivo per questo pilastro, mostra giorni
                          if (heatmapDrilldown && heatmapDrilldown.pilastro === type) {
                            const giorni = heatData.giorniPerMese[heatmapDrilldown.mese] || Array(31).fill(0);
                            const maxGiorno = Math.max(...giorni, 1);
                            const dayLabels = ['L','M','M','G','V','S','D'];
                            
                            return (
                              <div key={type} style={{ background: `${info.color}15`, borderRadius: 16, padding: 15, border: `2px solid ${info.color}` }}>
                                <div style={{ fontSize: 13, color: info.color, fontWeight: 600, marginBottom: 10 }}>{info.emoji} {info.label} - {mesiNomi[heatmapDrilldown.mese]}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 6 }}>
                                  {dayLabels.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 9, color: '#999999' }}>{d}</div>)}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                                  {giorni.slice(0, 31).map((val, i) => {
                                    const intensity = val / maxGiorno;
                                    const bgColor = val === 0 ? '#F5F5F5' : intensity > 0.7 ? '#4CAF50' : intensity > 0.4 ? '#FFD700' : info.color;
                                    return (
                                      <div key={i} style={{ height: 28, borderRadius: 4, background: bgColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: val === 0 ? '#E0E0E0' : '#fff', position: 'relative' }}>
                                        <span>{i + 1}</span>
                                        {val > 0 && <span style={{ fontSize: 7, fontWeight: 700 }}>{val}</span>}
                                        {val > 0 && intensity > 0.7 && <span style={{ position: 'absolute', top: -3, right: -1, fontSize: 7 }}>🔥</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          
                          // Vista mesi
                          return (
                            <div key={type} style={{ background: `${info.color}10`, borderRadius: 16, padding: 15, border: `1px solid ${info.color}30` }}>
                              <div style={{ fontSize: 13, color: info.color, fontWeight: 600, marginBottom: 10 }}>{info.emoji} {info.label}</div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                                {heatData.mesi.map((val, i) => {
                                  const intensity = val / maxMese;
                                  const bgColor = val === 0 ? '#F5F5F5' : intensity > 0.7 ? '#4CAF50' : intensity > 0.4 ? '#FFD700' : info.color;
                                  const isHot = intensity > 0.7 && val > 0;
                                  return (
                                    <div key={i} onClick={() => val > 0 && setHeatmapDrilldown({ pilastro: type, mese: i })} style={{ height: 40, borderRadius: 6, background: bgColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: val > 0 ? 'pointer' : 'default', position: 'relative', boxShadow: isHot ? `0 0 10px ${info.color}50` : 'none', transition: 'transform 0.2s' }}>
                                      <span style={{ fontSize: 9, color: val === 0 ? '#AAAAAA' : '#fff' }}>{mesiNomi[i]}</span>
                                      {val > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: '#333333' }}>{val}</span>}
                                      {isHot && <span style={{ position: 'absolute', top: -4, right: -2, fontSize: 10 }}>🔥</span>}
                                    </div>
                                  );
                                })}
                              </div>
                              <div style={{ textAlign: 'right', marginTop: 8, fontSize: 11, color: '#666666' }}>Totale: <strong style={{ color: info.color }}>{heatData.mesi.reduce((a,b) => a+b, 0)}</strong></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* ☀️ PILASTRO FOTOVOLTAICO */}
                  {reportData.pilastri.fv && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(255,152,0,0.1), rgba(255,152,0,0.02))', borderRadius: 20, padding: 20, border: '1px solid rgba(255,152,0,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                        <span style={{ fontSize: 28 }}>☀️</span>
                        <div>
                          <h3 style={{ color: '#2AAA8A', fontSize: 18, margin: 0 }}>PILASTRO FOTOVOLTAICO</h3>
                          <p style={{ color: '#666666', fontSize: 12, margin: 0 }}>Totale inseriti: <strong style={{ color: '#2AAA8A' }}>{reportData.pilastri.fv.totale}</strong></p>
                        </div>
                      </div>
                      
                      {/* FUNNEL FV */}
                      <div style={{ background: '#F0F0F0', borderRadius: 16, padding: 20, marginBottom: 15 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
                          <div style={{ textAlign: 'center', minWidth: 90 }}>
                            <div style={{ fontSize: 28, fontWeight: 800, color: '#2AAA8A' }}>{reportData.pilastri.fv.funnel.inseriti}</div>
                            <div style={{ fontSize: 10, color: '#666666' }}>📋 Inseriti</div>
                          </div>
                          <div style={{ color: '#AAAAAA', fontSize: 20 }}>→</div>
                          <div style={{ textAlign: 'center', minWidth: 90 }}>
                            <div style={{ fontSize: 28, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.fv.funnel.positivi}</div>
                            <div style={{ fontSize: 10, color: '#666666' }}>🟢 Positivi</div>
                            <div style={{ fontSize: 9, color: '#4CAF50' }}>{reportData.pilastri.fv.funnel.pctPositivi}%</div>
                          </div>
                          <div style={{ textAlign: 'center', minWidth: 90 }}>
                            <div style={{ fontSize: 28, fontWeight: 800, color: '#FFD700' }}>{reportData.pilastri.fv.funnel.lavorazione}</div>
                            <div style={{ fontSize: 10, color: '#666666' }}>🟡 Lavoraz.</div>
                          </div>
                          <div style={{ textAlign: 'center', minWidth: 90 }}>
                            <div style={{ fontSize: 28, fontWeight: 800, color: '#f44336' }}>{reportData.pilastri.fv.funnel.negativi}</div>
                            <div style={{ fontSize: 10, color: '#666666' }}>🔴 Persi</div>
                            <div style={{ fontSize: 9, color: '#f44336' }}>{reportData.pilastri.fv.funnel.pctNegativi}%</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stati FV Dettaglio */}
                      {reportData.pilastri.fv.statiDettaglio && reportData.pilastri.fv.statiDettaglio.length > 0 && (
                      <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 15, marginBottom: 15 }}>
                        <div style={{ fontSize: 12, color: '#666666', marginBottom: 10 }}>📋 DETTAGLIO STATI</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {reportData.pilastri.fv.statiDettaglio.map(([stato, val], i) => {
                            const cat = Object.entries(STATO_MAP_FV).find(([k]) => stato.toLowerCase().includes(k.toLowerCase()))?.[1] || 'altro';
                            const color = cat === 'positivo' ? '#4CAF50' : cat === 'lavorazione' ? '#FFD700' : cat === 'negativo' ? '#f44336' : '#999999';
                            return (
                              <div key={stato} style={{ background: `${color}20`, border: `1px solid ${color}40`, borderRadius: 6, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                                <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                                <span style={{ color: '#333333' }}>{stato}</span>
                                <span style={{ color: color, fontWeight: 600 }}>{val}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      )}
                      
                      {/* Classifiche FV con 3 colonne */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
                        {/* K Manager FV */}
                        <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(255,215,0,0.2)' }}>
                          <div style={{ fontSize: 12, color: '#FFD700', fontWeight: 600, marginBottom: 8 }}>👑 K MANAGER</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 45px 45px 45px', gap: 4, fontSize: 9, color: '#666666', marginBottom: 6 }}>
                            <span>#</span><span>Nome</span><span style={{ textAlign: 'center' }}>🟢</span><span style={{ textAlign: 'center' }}>🟡</span><span style={{ textAlign: 'center' }}>🔴</span>
                          </div>
                          {reportData.pilastri.fv.classifiche.k.map(([name, stats], i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '30px 1fr 45px 45px 45px', gap: 4, alignItems: 'center', marginBottom: 4, padding: '4px 0', borderBottom: '1px solid #F5F5F5' }}>
                              <span style={{ fontSize: 10, color: i < 3 ? '#FFD700' : '#666666' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}</span>
                              <span style={{ fontSize: 11, color: '#333333', fontWeight: i < 3 ? 600 : 400 }}>{name}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#4CAF50', textAlign: 'center' }}>{stats.positivo || 0}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#FFD700', textAlign: 'center' }}>{(stats.lavorazione || 0) + (stats.altro || 0)}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#f44336', textAlign: 'center' }}>{stats.negativo || 0}</span>
                            </div>
                          ))}
                          <div style={{ borderTop: '1px solid #E0E0E0', marginTop: 8, paddingTop: 8, textAlign: 'right', fontSize: 11, color: '#666666' }}>
                            Totale K: <strong style={{ color: '#FFD700' }}>{reportData.pilastri.fv.totaleK}</strong>
                          </div>
                        </div>
                        
                        {/* NW FV */}
                        <div style={{ background: 'rgba(156,39,176,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(156,39,176,0.2)', maxHeight: 280, overflowY: 'auto' }}>
                          <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 600, marginBottom: 8 }}>⭐ NETWORKER ({reportData.pilastri.fv.classifiche.nw.length})</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, fontSize: 8, color: '#999999', marginBottom: 4 }}>
                            <span>#</span><span>Nome</span><span style={{ textAlign: 'center' }}>🟢</span><span style={{ textAlign: 'center' }}>🟡</span><span style={{ textAlign: 'center' }}>🔴</span>
                          </div>
                          {reportData.pilastri.fv.classifiche.nw.slice(0, 20).map(([name, stats], i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, alignItems: 'center', marginBottom: 2, fontSize: 10 }}>
                              <span style={{ color: i < 3 ? '#2AAA8A' : '#999999' }}>{i+1}°</span>
                              <span style={{ color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                              <span style={{ color: '#4CAF50', textAlign: 'center', fontWeight: 600 }}>{stats.positivo || 0}</span>
                              <span style={{ color: '#FFD700', textAlign: 'center', fontWeight: 600 }}>{(stats.lavorazione || 0) + (stats.altro || 0)}</span>
                              <span style={{ color: '#f44336', textAlign: 'center', fontWeight: 600 }}>{stats.negativo || 0}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* SDP FV */}
                        <div style={{ background: 'rgba(33,150,243,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(33,150,243,0.2)', maxHeight: 280, overflowY: 'auto' }}>
                          <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 600, marginBottom: 8 }}>🔵 SDP ({reportData.pilastri.fv.classifiche.sdp.length})</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, fontSize: 8, color: '#999999', marginBottom: 4 }}>
                            <span>#</span><span>Nome</span><span style={{ textAlign: 'center' }}>🟢</span><span style={{ textAlign: 'center' }}>🟡</span><span style={{ textAlign: 'center' }}>🔴</span>
                          </div>
                          {reportData.pilastri.fv.classifiche.sdp.slice(0, 20).map(([name, stats], i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, alignItems: 'center', marginBottom: 2, fontSize: 10 }}>
                              <span style={{ color: i < 3 ? '#2AAA8A' : '#999999' }}>{i+1}°</span>
                              <span style={{ color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                              <span style={{ color: '#4CAF50', textAlign: 'center', fontWeight: 600 }}>{stats.positivo || 0}</span>
                              <span style={{ color: '#FFD700', textAlign: 'center', fontWeight: 600 }}>{(stats.lavorazione || 0) + (stats.altro || 0)}</span>
                              <span style={{ color: '#f44336', textAlign: 'center', fontWeight: 600 }}>{stats.negativo || 0}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* ⚡ PILASTRO LUCE AMICA */}
                  {reportData.pilastri.energy && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(255,193,7,0.1), rgba(255,193,7,0.02))', borderRadius: 20, padding: 20, border: '1px solid rgba(255,193,7,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                        <span style={{ fontSize: 28 }}>⚡</span>
                        <div>
                          <h3 style={{ color: '#FFD700', fontSize: 18, margin: 0 }}>PILASTRO LUCE AMICA</h3>
                          <p style={{ color: '#666666', fontSize: 12, margin: 0 }}>Totale inseriti: <strong style={{ color: '#FFD700' }}>{reportData.pilastri.energy.totale}</strong></p>
                        </div>
                      </div>
                      
                      {/* Stati NWG Spa */}
                      {reportData.pilastri.energy.statiNwgSpa && reportData.pilastri.energy.statiNwgSpa.length > 0 && (
                      <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 15, marginBottom: 10 }}>
                        <div style={{ fontSize: 12, color: '#666666', marginBottom: 10 }}>📋 STATI NWG SPA</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {reportData.pilastri.energy.statiNwgSpa.map(([stato, val], i) => {
                            const color = STATO_COLORS[stato] || PIE_COLORS[i % PIE_COLORS.length];
                            const pct = Math.round(val / reportData.pilastri.energy.totale * 100);
                            return (
                              <div key={stato} style={{ background: `${color}20`, border: `1px solid ${color}50`, borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
                                <span style={{ color: '#333333', fontSize: 12 }}>{stato}</span>
                                <span style={{ color: color, fontWeight: 700, fontSize: 14 }}>{val}</span>
                                <span style={{ color: '#999999', fontSize: 10 }}>({pct}%)</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      )}
                      
                      {/* Stati NWG Energia (se presenti) */}
                      {reportData.pilastri.energy.statiNwgEnergia && reportData.pilastri.energy.statiNwgEnergia.length > 0 && (
                        <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 15, marginBottom: 15 }}>
                          <div style={{ fontSize: 12, color: '#666666', marginBottom: 10 }}>⚡ STATI NWG ENERGIA</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {reportData.pilastri.energy.statiNwgEnergia.map(([stato, val], i) => {
                              const color = STATO_COLORS[stato] || PIE_COLORS[(i + 5) % PIE_COLORS.length];
                              const pct = Math.round(val / reportData.pilastri.energy.totale * 100);
                              return (
                                <div key={stato} style={{ background: `${color}20`, border: `1px solid ${color}50`, borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
                                  <span style={{ color: '#333333', fontSize: 12 }}>{stato}</span>
                                  <span style={{ color: color, fontWeight: 700, fontSize: 14 }}>{val}</span>
                                  <span style={{ color: '#999999', fontSize: 10 }}>({pct}%)</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Classifiche LA */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
                        {/* K Manager LA */}
                        <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(255,215,0,0.2)' }}>
                          <div style={{ fontSize: 12, color: '#FFD700', fontWeight: 600, marginBottom: 8 }}>👑 K MANAGER</div>
                          {reportData.pilastri.energy.classifiche.k.map(([name, stats], i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ width: 20, fontSize: 10, color: i < 3 ? '#FFD700' : '#666666' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}</span>
                              <span style={{ flex: 1, fontSize: 11, color: '#333333' }}>{name}</span>
                              <span style={{ fontSize: 12, fontWeight: 700, color: '#FFD700' }}>{typeof stats === 'object' ? stats.total : stats}</span>
                            </div>
                          ))}
                          <div style={{ borderTop: '1px solid #E0E0E0', marginTop: 8, paddingTop: 8, textAlign: 'right', fontSize: 11, color: '#666666' }}>
                            Totale: <strong style={{ color: '#FFD700' }}>{reportData.pilastri.energy.totaleK}</strong>
                          </div>
                        </div>
                        
                        {/* NW LA */}
                        <div style={{ background: 'rgba(156,39,176,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(156,39,176,0.2)', maxHeight: 250, overflowY: 'auto' }}>
                          <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 600, marginBottom: 8 }}>⭐ NETWORKER ({reportData.pilastri.energy.classifiche.nw.length})</div>
                          {reportData.pilastri.energy.classifiche.nw.map(([name, stats], i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                              <span style={{ width: 20, fontSize: 9, color: i < 3 ? '#2AAA8A' : '#999999' }}>{i+1}°</span>
                              <span style={{ flex: 1, fontSize: 10, color: '#333333' }}>{name}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#2AAA8A' }}>{typeof stats === 'object' ? stats.total : stats}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* SDP LA */}
                        <div style={{ background: 'rgba(33,150,243,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(33,150,243,0.2)', maxHeight: 250, overflowY: 'auto' }}>
                          <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 600, marginBottom: 8 }}>🔵 SDP ({reportData.pilastri.energy.classifiche.sdp.length})</div>
                          {reportData.pilastri.energy.classifiche.sdp.map(([name, stats], i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                              <span style={{ width: 20, fontSize: 9, color: i < 3 ? '#2AAA8A' : '#999999' }}>{i+1}°</span>
                              <span style={{ flex: 1, fontSize: 10, color: '#333333' }}>{name}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#2AAA8A' }}>{typeof stats === 'object' ? stats.total : stats}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* 🎓 PILASTRO COLLABORATORI */}
                  {reportData.pilastri.collaboratori && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(156,39,176,0.1), rgba(156,39,176,0.02))', borderRadius: 20, padding: 20, border: '1px solid rgba(156,39,176,0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                        <span style={{ fontSize: 28 }}>🎓</span>
                        <div>
                          <h3 style={{ color: '#2AAA8A', fontSize: 18, margin: 0 }}>PILASTRO COLLABORATORI</h3>
                          <p style={{ color: '#666666', fontSize: 12, margin: 0 }}>Funnel: Iscritti → Presenti → Attivati</p>
                        </div>
                      </div>
                      
                      {/* Funnel Collaboratori */}
                      <div style={{ background: '#F0F0F0', borderRadius: 16, padding: 20, marginBottom: 15 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
                          {/* Iscritti */}
                          <div style={{ textAlign: 'center', minWidth: 90 }}>
                            <div style={{ fontSize: 28, fontWeight: 800, color: '#2AAA8A' }}>{reportData.pilastri.collaboratori.funnel?.iscritti || 0}</div>
                            <div style={{ fontSize: 10, color: '#666666' }}>📝 Iscritti</div>
                          </div>
                          
                          <div style={{ color: '#AAAAAA', fontSize: 20 }}>→</div>
                          
                          {/* Presenti */}
                          <div style={{ textAlign: 'center', minWidth: 90 }}>
                            <div style={{ fontSize: 28, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.funnel?.presenti || 0}</div>
                            <div style={{ fontSize: 10, color: '#666666' }}>✅ Presenti</div>
                            <div style={{ fontSize: 9, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.funnel?.pctPresenti || 0}%</div>
                          </div>
                          
                          <div style={{ color: '#AAAAAA', fontSize: 20 }}>→</div>
                          
                          {/* Attivati */}
                          <div style={{ textAlign: 'center', minWidth: 90 }}>
                            <div style={{ fontSize: 28, fontWeight: 800, color: '#2AAA8A' }}>{reportData.pilastri.collaboratori.funnel?.attivati || 0}</div>
                            <div style={{ fontSize: 10, color: '#666666' }}>🟠 Attivati</div>
                            <div style={{ fontSize: 9, color: '#2AAA8A' }}>{reportData.pilastri.collaboratori.funnel?.pctAttivati || 0}%</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Classifiche Collaboratori con 3 colonne */}
                      {reportData.pilastri.collaboratori.classifiche && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
                        {/* K Manager Coll */}
                        <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(255,215,0,0.2)' }}>
                          <div style={{ fontSize: 12, color: '#FFD700', fontWeight: 600, marginBottom: 8 }}>👑 K MANAGER</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 45px 45px 45px', gap: 4, fontSize: 9, color: '#666666', marginBottom: 6 }}>
                            <span>#</span><span>Nome</span><span style={{ textAlign: 'center' }}>📝</span><span style={{ textAlign: 'center' }}>✅</span><span style={{ textAlign: 'center' }}>🟠</span>
                          </div>
                          {reportData.pilastri.collaboratori.classifiche.k.map(([name, stats], i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '30px 1fr 45px 45px 45px', gap: 4, alignItems: 'center', marginBottom: 4, padding: '4px 0', borderBottom: '1px solid #F5F5F5' }}>
                              <span style={{ fontSize: 10, color: i < 3 ? '#FFD700' : '#666666' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}</span>
                              <span style={{ fontSize: 11, color: '#333333', fontWeight: i < 3 ? 600 : 400 }}>{name}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#2AAA8A', textAlign: 'center' }}>{typeof stats === 'object' ? (stats.iscritti || stats.total || 0) : stats}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#4CAF50', textAlign: 'center' }}>{typeof stats === 'object' ? (stats.presenti || 0) : '-'}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#2AAA8A', textAlign: 'center' }}>{typeof stats === 'object' ? (stats.attivati || 0) : '-'}</span>
                            </div>
                          ))}
                          <div style={{ borderTop: '1px solid #E0E0E0', marginTop: 8, paddingTop: 8, textAlign: 'right', fontSize: 11, color: '#666666' }}>
                            Totale K: <strong style={{ color: '#FFD700' }}>{reportData.pilastri.collaboratori.totaleK}</strong>
                          </div>
                        </div>
                        
                        {/* NW Coll */}
                        <div style={{ background: 'rgba(156,39,176,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(156,39,176,0.2)', maxHeight: 280, overflowY: 'auto' }}>
                          <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 600, marginBottom: 8 }}>⭐ NETWORKER ({reportData.pilastri.collaboratori.classifiche.nw.length})</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, fontSize: 8, color: '#999999', marginBottom: 4 }}>
                            <span>#</span><span>Nome</span><span style={{ textAlign: 'center' }}>📝</span><span style={{ textAlign: 'center' }}>✅</span><span style={{ textAlign: 'center' }}>🟠</span>
                          </div>
                          {reportData.pilastri.collaboratori.classifiche.nw.slice(0, 20).map(([name, stats], i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, alignItems: 'center', marginBottom: 2, fontSize: 10 }}>
                              <span style={{ color: i < 3 ? '#2AAA8A' : '#999999' }}>{i+1}°</span>
                              <span style={{ color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                              <span style={{ color: '#2AAA8A', textAlign: 'center', fontWeight: 600 }}>{typeof stats === 'object' ? (stats.iscritti || stats.total || 0) : stats}</span>
                              <span style={{ color: '#4CAF50', textAlign: 'center', fontWeight: 600 }}>{typeof stats === 'object' ? (stats.presenti || 0) : '-'}</span>
                              <span style={{ color: '#2AAA8A', textAlign: 'center', fontWeight: 600 }}>{typeof stats === 'object' ? (stats.attivati || 0) : '-'}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* SDP Coll */}
                        <div style={{ background: 'rgba(33,150,243,0.08)', borderRadius: 12, padding: 12, border: '1px solid rgba(33,150,243,0.2)', maxHeight: 280, overflowY: 'auto' }}>
                          <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 600, marginBottom: 8 }}>🔵 SDP ({reportData.pilastri.collaboratori.classifiche.sdp.length})</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, fontSize: 8, color: '#999999', marginBottom: 4 }}>
                            <span>#</span><span>Nome</span><span style={{ textAlign: 'center' }}>📝</span><span style={{ textAlign: 'center' }}>✅</span><span style={{ textAlign: 'center' }}>🟠</span>
                          </div>
                          {reportData.pilastri.collaboratori.classifiche.sdp.slice(0, 20).map(([name, stats], i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '25px 1fr 35px 35px 35px', gap: 3, alignItems: 'center', marginBottom: 2, fontSize: 10 }}>
                              <span style={{ color: i < 3 ? '#2AAA8A' : '#999999' }}>{i+1}°</span>
                              <span style={{ color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                              <span style={{ color: '#2AAA8A', textAlign: 'center', fontWeight: 600 }}>{typeof stats === 'object' ? (stats.iscritti || stats.total || 0) : stats}</span>
                              <span style={{ color: '#4CAF50', textAlign: 'center', fontWeight: 600 }}>{typeof stats === 'object' ? (stats.presenti || 0) : '-'}</span>
                              <span style={{ color: '#2AAA8A', textAlign: 'center', fontWeight: 600 }}>{typeof stats === 'object' ? (stats.attivati || 0) : '-'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      )}
                    </div>
                  )}
                  
                  {/* 🚨 ALERT DA ATTIVARE */}
                  {reportData.alertDaAttivare && reportData.alertDaAttivare.totale > 0 && (
                    <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                        <span style={{ fontSize: 24 }}>🚨</span>
                        <div>
                          <h3 style={{ color: '#E53935', fontSize: 18, margin: 0 }}>ALERT DA ATTIVARE</h3>
                          <p style={{ color: '#666666', fontSize: 12, margin: 0 }}>Luce Amica in attesa di attivazione NWG Energia</p>
                        </div>
                      </div>
                      
                      {/* Riepilogo fasce */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                        <div style={{ background: 'rgba(76,175,80,0.15)', borderRadius: 12, padding: 15, textAlign: 'center', border: '2px solid #4CAF50' }}>
                          <div style={{ fontSize: 28, fontWeight: 800, color: '#4CAF50' }}>{reportData.alertDaAttivare.verde.length}</div>
                          <div style={{ fontSize: 11, color: '#333', marginTop: 4 }}>🟢 0-30 giorni</div>
                        </div>
                        <div style={{ background: 'rgba(255,215,0,0.15)', borderRadius: 12, padding: 15, textAlign: 'center', border: '2px solid #FFD700' }}>
                          <div style={{ fontSize: 28, fontWeight: 800, color: '#FFD700' }}>{reportData.alertDaAttivare.giallo.length}</div>
                          <div style={{ fontSize: 11, color: '#333', marginTop: 4 }}>🟡 31-60 giorni</div>
                        </div>
                        <div style={{ background: 'rgba(229,57,53,0.15)', borderRadius: 12, padding: 15, textAlign: 'center', border: '2px solid #E53935' }}>
                          <div style={{ fontSize: 28, fontWeight: 800, color: '#E53935' }}>{reportData.alertDaAttivare.rosso.length}</div>
                          <div style={{ fontSize: 11, color: '#333', marginTop: 4 }}>🔴 &gt;60 giorni</div>
                        </div>
                      </div>
                      
                      {/* Lista critici (rosso + giallo) */}
                      {(reportData.alertDaAttivare.rosso.length > 0 || reportData.alertDaAttivare.giallo.length > 0) && (
                        <div style={{ background: '#FFF9F9', borderRadius: 12, padding: 15, border: '1px solid #FFCDD2' }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#E53935', marginBottom: 10 }}>⚠️ Richiede intervento ({reportData.alertDaAttivare.rosso.length + reportData.alertDaAttivare.giallo.length})</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 60px', gap: 4, fontSize: 10, color: '#999', marginBottom: 8, padding: '0 5px' }}>
                            <span># Contratto</span>
                            <span>Cliente</span>
                            <span>Intermediario</span>
                            <span style={{ textAlign: 'right' }}>Giorni</span>
                          </div>
                          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                            {[...reportData.alertDaAttivare.rosso, ...reportData.alertDaAttivare.giallo].slice(0, 20).map((alert, i) => (
                              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 60px', gap: 4, padding: '8px 5px', background: i % 2 === 0 ? '#FFF' : '#FFF5F5', borderRadius: 6, marginBottom: 2, alignItems: 'center' }}>
                                <span style={{ fontSize: 10, color: '#666' }}>{alert.contratto}</span>
                                <span style={{ fontSize: 11, color: '#333', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{alert.cliente}</span>
                                <span style={{ fontSize: 10, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{alert.intermediario}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: alert.fascia === 'rosso' ? '#E53935' : '#FFD700', textAlign: 'right' }}>{alert.giorni}g</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* 🎯 TRACKER COACHING */}
                  {reportData.trackerCoaching && reportData.trackerCoaching.totale > 0 && (
                    <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                        <span style={{ fontSize: 24 }}>🎯</span>
                        <div>
                          <h3 style={{ color: '#2AAA8A', fontSize: 18, margin: 0 }}>TRACKER COACHING</h3>
                          <p style={{ color: '#666666', fontSize: 12, margin: 0 }}>Performance nuovi attivati - Milestone raggiunte</p>
                        </div>
                      </div>
                      
                      {/* Medie e completamento */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                        <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>⚡ 1° Luce Amica</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#2AAA8A' }}>{reportData.trackerCoaching.medie.la !== null ? `${reportData.trackerCoaching.medie.la}g` : '-'}</div>
                          <div style={{ fontSize: 10, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.la}% completato</div>
                        </div>
                        <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>☀️ 1° Fotovoltaico</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#FFD700' }}>{reportData.trackerCoaching.medie.fv !== null ? `${reportData.trackerCoaching.medie.fv}g` : '-'}</div>
                          <div style={{ fontSize: 10, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.fv}% completato</div>
                        </div>
                        <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>📝 1° Iscritto</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#2AAA8A' }}>{reportData.trackerCoaching.medie.iscritto !== null ? `${reportData.trackerCoaching.medie.iscritto}g` : '-'}</div>
                          <div style={{ fontSize: 10, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.iscritto}% completato</div>
                        </div>
                        <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>🟠 1° Attivato</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: '#FF9800' }}>{reportData.trackerCoaching.medie.attivato !== null ? `${reportData.trackerCoaching.medie.attivato}g` : '-'}</div>
                          <div style={{ fontSize: 10, color: '#4CAF50' }}>{reportData.trackerCoaching.completamento.attivato}% completato</div>
                        </div>
                      </div>
                      
                      {/* Lista tracker */}
                      <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, border: '1px solid #E0E0E0' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 70px 70px 70px 70px', gap: 4, fontSize: 9, color: '#999', marginBottom: 8, padding: '0 5px', textTransform: 'uppercase' }}>
                          <span>Nome</span>
                          <span style={{ textAlign: 'center' }}>Attivazione</span>
                          <span style={{ textAlign: 'center' }}>1° LA</span>
                          <span style={{ textAlign: 'center' }}>1° FV</span>
                          <span style={{ textAlign: 'center' }}>1° Iscr.</span>
                          <span style={{ textAlign: 'center' }}>1° Attiv.</span>
                        </div>
                        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                          {reportData.trackerCoaching.lista.map((t, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 70px 70px 70px 70px', gap: 4, padding: '8px 5px', background: i % 2 === 0 ? '#FFF' : '#F8F8F8', borderRadius: 6, marginBottom: 2, alignItems: 'center' }}>
                              <span style={{ fontSize: 11, color: '#333', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.nome}</span>
                              <span style={{ fontSize: 10, color: '#666', textAlign: 'center' }}>{t.dataAttivazione}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', color: t.giorniLA !== null ? '#4CAF50' : '#E53935' }}>
                                {t.giorniLA !== null ? `${t.giorniLA}g ✓` : '❌'}
                              </span>
                              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', color: t.giorniFV !== null ? '#4CAF50' : '#E53935' }}>
                                {t.giorniFV !== null ? `${t.giorniFV}g ✓` : '❌'}
                              </span>
                              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', color: t.giorniIscritto !== null ? '#4CAF50' : '#E53935' }}>
                                {t.giorniIscritto !== null ? `${t.giorniIscritto}g ✓` : '❌'}
                              </span>
                              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', color: t.giorniAttivato !== null ? '#4CAF50' : '#E53935' }}>
                                {t.giorniAttivato !== null ? `${t.giorniAttivato}g ✓` : '❌'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* BOTTONE SCREENSHOT REPORT */}
                  <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, border: '1px solid #E0E0E0' }}>
                    <div style={{ fontSize: 16, color: '#2AAA8A', fontWeight: 700, marginBottom: 5 }}>📷 SCARICA REPORT</div>
                    <div style={{ fontSize: 12, color: '#666666', marginBottom: 15 }}>Scarica il report come immagine</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <button style={{ ...S.btn, flex: 1, minWidth: 140, padding: '14px 20px', background: 'linear-gradient(135deg, #2AAA8A, #20917A)', color: '#FFF', fontSize: 14 }} onClick={() => generateDashboardCanvas('png')}>📷 Salva PNG</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
                      {/* TORTA K MANAGER */}
                      {pies.k.length > 0 && (
                        <div style={{ background: '#FCFCFC', borderRadius: 16, padding: 15, border: '1px solid rgba(255,215,0,0.2)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <MiniPie data={pies.k} total={totalK} colors={PIE_COLORS} size={65} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, color: '#FFD700', fontWeight: 600, marginBottom: 6 }}>👑 K MANAGER</div>
                              {pies.k.slice(0, 4).map(([name, val], i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#444444', marginBottom: 2 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i] }} />
                                    {name}
                                  </span>
                                  <span style={{ fontWeight: 600 }}>{val} ({Math.round(val/totalK*100)}%)</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* TORTA STATI */}
                      {pies.stati.length > 0 && (
                        <div style={{ background: '#FCFCFC', borderRadius: 16, padding: 15, border: '1px solid rgba(76,175,80,0.2)' }}>
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
                                  <span style={{ fontWeight: 600 }}>{val} ({Math.round(val/totalStati*100)}%)</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* BARRA NW TOP 5 */}
                      {pies.nw.length > 0 && (
                        <div style={{ background: '#FCFCFC', borderRadius: 16, padding: 15, border: '1px solid rgba(156,39,176,0.2)', gridColumn: pies.k.length > 0 && pies.stati.length > 0 ? 'span 2' : 'span 1' }}>
                          <div style={{ fontSize: 12, color: '#2AAA8A', fontWeight: 600, marginBottom: 10 }}>⭐ TOP 5 NETWORKER</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {pies.nw.slice(0, 5).map(([name, val], i) => {
                              const maxNw = pies.nw[0]?.[1] || 1;
                              return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ width: 20, fontSize: 10, color: '#666666' }}>{i+1}°</span>
                                  <div style={{ flex: 1, height: 18, background: '#F5F5F5', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                                    <div style={{ width: `${(val/maxNw)*100}%`, height: '100%', background: `linear-gradient(90deg, ${PIE_COLORS[i]}, ${PIE_COLORS[i]}88)`, borderRadius: 4 }} />
                                    <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 9, color: '#333333' }}>{name}</span>
                                  </div>
                                  <span style={{ width: 25, fontSize: 11, fontWeight: 600, color: PIE_COLORS[i], textAlign: 'right' }}>{val}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* CLASSIFICHE COMPLETE - SENZA Conv% + SDP e IVD */}
                {(() => {
                  const pies = getPieDistributions();
                  // Tabella semplice senza conversione
                  const ClassificaTable = ({ title, emoji, data, color }) => {
                    if (!data || data.length === 0) return null;
                    return (
                      <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 15, border: `1px solid ${color}30` }}>
                        <div style={{ fontSize: 14, color: color, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{emoji}</span> {title}
                        </div>
                        <div style={{ overflowX: 'auto', maxHeight: 280, overflowY: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
                                <th style={{ padding: '8px 4px', textAlign: 'center', color: '#666666', fontWeight: 600, width: 30 }}>#</th>
                                <th style={{ padding: '8px 4px', textAlign: 'left', color: '#666666', fontWeight: 600 }}>Nome</th>
                                <th style={{ padding: '8px 4px', textAlign: 'center', color: '#333333', fontWeight: 600 }}>Tot</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.slice(0, 15).map(([name, val], i) => {
                                const tot = typeof val === 'object' ? (val.v1 || val.total || 0) : val;
                                return (
                                  <tr key={i} style={{ borderBottom: '1px solid #F5F5F5', background: i < 3 ? `${color}08` : 'transparent' }}>
                                    <td style={{ padding: '8px 4px', textAlign: 'center', fontWeight: i < 3 ? 700 : 400, fontSize: 11, color: '#333333' }}>
                                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}
                                    </td>
                                    <td style={{ padding: '8px 4px', fontWeight: i < 3 ? 600 : 400, color: '#333333', fontSize: 11, maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</td>
                                    <td style={{ padding: '8px 4px', textAlign: 'center', color: '#333333', fontWeight: 700, fontSize: 13 }}>{tot}</td>
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
