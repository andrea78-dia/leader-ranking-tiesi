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
  // === STATI ===
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [animatedStats, setAnimatedStats] = useState({ ins: 0, acc: 0, part: 0, conv: 0 });
  
  // Report states
  const [reportCSVs, setReportCSVs] = useState({ ivd: null, energy: null, fv: null, consultings: null });
  const [reportData, setReportData] = useState(null);

  // === STILI ===
  const S = {
    btn: { background: 'linear-gradient(135deg,#7C4DFF,#536DFE)', border: 'none', borderRadius: 12, color: '#fff', padding: '12px 24px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', fontSize: 14 },
    input: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: 15, width: '100%', outline: 'none' },
    card: { background: 'linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))', borderRadius: 20, padding: 25, border: '1px solid rgba(255,255,255,0.08)' },
    th: { padding: '12px 8px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)' },
    rankCard: { background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }
  };

  // === COLORI ===
  const PIE_COLORS = ['#FFD700', '#7C4DFF', '#FF6B35', '#4CAF50', '#2196F3', '#E91E63', '#00BCD4', '#9C27B0', '#FF9800', '#607D8B'];
  const STATO_COLORS = { 
    'Accettato': '#4CAF50', 'Sospeso': '#FFC107', 'In sospeso': '#FFC107', 'Presente': '#4CAF50', 'Assente': '#FF6B35', 
    'In lavorazione': '#2196F3', 'Installato': '#00BCD4', 'Impianto installato': '#00BCD4', 'Recesso': '#f44336', 
    'Annullato': '#9E9E9E', 'In fornitura': '#4CAF50', 'Attivo': '#4CAF50', 'Cessato': '#607D8B', 'Negativo': '#f44336'
  };

  // === CONFIG ===
  const config = RANKING_CONFIG[selectedRanking] || RANKING_CONFIG.ivd_inseriti;
  const labels = {
    c1: selectedRanking.includes('k') || selectedRanking === 'nw' || selectedRanking === 'eb' || selectedRanking === 'frm' ? 'Inseriti' : 'Inseriti',
    c2: selectedRanking.includes('k') || selectedRanking === 'nw' || selectedRanking === 'eb' || selectedRanking === 'frm' ? 'Accettati' : 'Accettati'
  };

  // === FUNZIONI CSV ===
  const parseCSV = (text) => {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = lines[0].split(';').map(h => h.trim().replace(/"/g, ''));
    return lines.slice(1).map(line => {
      const values = line.split(';').map(v => v.trim().replace(/"/g, ''));
      const row = {};
      headers.forEach((h, i) => row[h] = values[i] || '');
      return row;
    });
  };

  const processCSV = (text) => {
    const data = parseCSV(text);
    if (data.length === 0) return;
    
    setCsvData(data);
    setFilteredData(data);
    
    // Detect months
    const months = new Set();
    data.forEach(row => {
      const dateStr = row['Inserimento'] || row['Data'] || row['Data Inserimento'] || '';
      if (dateStr) {
        try {
          const d = new Date(dateStr.replace(' ', 'T'));
          if (!isNaN(d.getTime())) {
            const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            months.add(`${monthNames[d.getMonth()]} ${d.getFullYear()}`);
          }
        } catch (e) {}
      }
    });
    
    const sortedMonths = Array.from(months).sort((a, b) => {
      const [ma, ya] = a.split(' '), [mb, yb] = b.split(' ');
      const monthOrder = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      return ya !== yb ? parseInt(ya) - parseInt(yb) : monthOrder.indexOf(ma) - monthOrder.indexOf(mb);
    });
    
    setAvailableMonths(sortedMonths);
    if (sortedMonths.length > 0) {
      const lastMonth = sortedMonths[sortedMonths.length - 1];
      setSelectedMonth(lastMonth);
      setWeeks(getWeeksForMonth(lastMonth));
      setEventDate(lastMonth.toUpperCase());
    }
    
    calculateRankings(data);
  };

  const calculateRankings = (data) => {
    const dataToUse = data || filteredData || csvData;
    if (!dataToUse) return;
    
    const r = { ivd: {}, sdp: {}, nw: {}, k: {}, eb: {}, frm: {} };
    
    dataToUse.forEach(row => {
      const ivd = row['Nome Primo IVD'] || row['IVD'] || row['Nome Intermediario'] || '';
      const sdp = row['Nome Primo SDP FV'] || row['Nome Primo SDP Fv'] || row['Nome Primo SDP LA'] || row['Nome Primo SDP La'] || '';
      const nw = row['Nome Primo Networker'] || '';
      const k = row['Nome Primo K'] || '';
      const eb = row['Nome Primo Energy Broker'] || '';
      const stato = row['Stato'] || row['Stato NWG Spa'] || '';
      const isAcc = stato.toLowerCase().includes('accettato');
      
      [['ivd', ivd], ['sdp', sdp], ['nw', nw], ['k', k], ['eb', eb]].forEach(([key, name]) => {
        if (name && !name.includes('Nome Primo')) {
          if (!r[key][name]) r[key][name] = { v1: 0, v2: 0 };
          r[key][name].v1++;
          if (isAcc) r[key][name].v2++;
        }
      });
    });
    
    const sort = (obj) => Object.entries(obj).sort((a, b) => b[1].v1 - a[1].v1);
    setRankings({ ivd: sort(r.ivd), sdp: sort(r.sdp), nw: sort(r.nw), k: sort(r.k), eb: sort(r.eb), frm: sort(r.frm) });
  };

  const getData = () => {
    if (!rankings) return [];
    const map = { ivd_inseriti: 'ivd', ivd_accettati: 'ivd', sdp_inseriti: 'sdp', sdp_accettati: 'sdp', nw: 'nw', k: 'k', eb: 'eb', frm: 'frm' };
    let data = rankings[map[selectedRanking]] || [];
    if (excludeK && ['ivd_inseriti', 'ivd_accettati', 'sdp_inseriti', 'sdp_accettati'].includes(selectedRanking)) {
      const kNames = rankings.k.map(([n]) => n.toLowerCase());
      data = data.filter(([n]) => !kNames.includes(n.toLowerCase()));
    }
    if (selectedRanking.includes('accettati')) data = [...data].sort((a, b) => b[1].v2 - a[1].v2);
    return data;
  };

  const isExclusive = () => ['nw', 'k', 'eb', 'frm'].includes(selectedRanking);
  const getClassificaTotal = () => getData().reduce((s, [, x]) => s + (selectedRanking.includes('accettati') ? x.v2 : x.v1), 0);

  // === FILTRO PERIODO ===
  const applyPeriodFilter = (type, week = null) => {
    if (!csvData || !selectedMonth) return;
    setPeriodType(type);
    setSelectedWeek(week);
    
    const cal = PRODUCTION_CALENDAR[selectedMonth];
    if (!cal) return;
    
    let startDate, endDate;
    
    if (type === 'progressiva') {
      startDate = new Date(cal.start.replace(' ', 'T'));
      endDate = new Date();
    } else if (type === 'finale') {
      startDate = new Date(cal.start.replace(' ', 'T'));
      endDate = new Date(cal.end.replace(' ', 'T'));
    } else if (type === 'settimanale' && week) {
      startDate = week.start;
      endDate = week.end;
    }
    
    const filtered = csvData.filter(row => {
      const dateStr = row['Inserimento'] || row['Data'] || row['Data Inserimento'] || '';
      if (!dateStr) return false;
      try {
        const d = new Date(dateStr.replace(' ', 'T'));
        return d >= startDate && d <= endDate;
      } catch (e) { return false; }
    });
    
    setFilteredData(filtered);
    calculateRankings(filtered);
    
    if (type === 'settimanale' && week) {
      setEventDate(`${selectedMonth.toUpperCase()} - ${week.label}`);
    } else if (type === 'finale') {
      setEventDate(`${selectedMonth.toUpperCase()} - FINALE`);
    } else {
      setEventDate(`${selectedMonth.toUpperCase()} - PROGRESSIVA`);
    }
  };

  // === DASHBOARD STATS ===
  const getDashboardStats = () => {
    const data = getData();
    const ins = data.reduce((s, [, x]) => s + x.v1, 0);
    const acc = data.reduce((s, [, x]) => s + x.v2, 0);
    return { ins, acc, part: data.length, conv: ins > 0 ? Math.round(acc / ins * 100) : 0 };
  };

  // === PIE DISTRIBUTIONS ===
  const getPieDistributions = () => {
    const data = getData();
    const kDist = data.slice(0, 10).map(([n, s]) => [n, s.v1]);
    
    const statiCount = {};
    (filteredData || csvData || []).forEach(row => {
      const stato = row['Stato'] || row['Stato NWG Spa'] || '';
      if (stato && !stato.includes('Stato')) statiCount[stato] = (statiCount[stato] || 0) + 1;
    });
    const stati = Object.entries(statiCount).sort((a, b) => b[1] - a[1]);
    
    return { k: kDist, stati };
  };

  // === MINI PIE COMPONENT ===
  const MiniPie = ({ data, total, colors, size = 60 }) => {
    let cumulative = 0;
    const slices = data.map(([, val], i) => {
      const pct = val / total;
      const start = cumulative;
      cumulative += pct;
      return { start, end: cumulative, color: colors[i] || PIE_COLORS[i % PIE_COLORS.length] };
    });
    
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        {slices.map((slice, i) => {
          const startAngle = slice.start * 360 - 90;
          const endAngle = slice.end * 360 - 90;
          const largeArc = (slice.end - slice.start) > 0.5 ? 1 : 0;
          const x1 = 16 + 14 * Math.cos(startAngle * Math.PI / 180);
          const y1 = 16 + 14 * Math.sin(startAngle * Math.PI / 180);
          const x2 = 16 + 14 * Math.cos(endAngle * Math.PI / 180);
          const y2 = 16 + 14 * Math.sin(endAngle * Math.PI / 180);
          return <path key={i} d={`M16,16 L${x1},${y1} A14,14 0 ${largeArc},1 ${x2},${y2} Z`} fill={slice.color} />;
        })}
      </svg>
    );
  };

  // === REPORT FUNCTIONS ===
  const processReportCSV = (type, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = parseCSV(e.target.result);
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
    const allData = [];
    const sources = { ivd: 0, energy: 0, fv: 0, consultings: 0 };
    
    Object.entries(reportCSVs).forEach(([type, csv]) => {
      if (csv?.data) {
        sources[type] = csv.data.length;
        csv.data.forEach(row => allData.push({ ...row, _source: type }));
      }
    });
    
    if (allData.length === 0) return null;
    
    const kCount = {}, nwCount = {}, sdpCount = {}, ivdCount = {};
    
    allData.forEach(row => {
      const k = row['Nome Primo K'] || '';
      const nw = row['Nome Primo Networker'] || '';
      const sdp = row['Nome Primo SDP FV'] || row['Nome Primo SDP Fv'] || row['Nome Primo SDP LA'] || row['Nome Primo SDP La'] || '';
      const ivd = row['IVD'] || row['Nome Intermediario'] || '';
      
      if (k && !k.includes('Nome Primo')) kCount[k] = (kCount[k] || 0) + 1;
      if (nw && !nw.includes('Nome Primo')) nwCount[nw] = (nwCount[nw] || 0) + 1;
      if (sdp && !sdp.includes('Nome Primo')) sdpCount[sdp] = (sdpCount[sdp] || 0) + 1;
      if (ivd && !ivd.includes('Nome') && !ivd.includes('IVD')) ivdCount[ivd] = (ivdCount[ivd] || 0) + 1;
    });
    
    const toSorted = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]);
    
    return {
      total: allData.length,
      sources,
      classifiche: { k: toSorted(kCount), nw: toSorted(nwCount), sdp: toSorted(sdpCount), ivd: toSorted(ivdCount) }
    };
  };

  const clearReportCSVs = () => {
    setReportCSVs({ ivd: null, energy: null, fv: null, consultings: null });
    setReportData(null);
  };

  // === PNG GENERATION ===
  const handleGenerate = () => {
    const data = getData();
    if (data.length === 0) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    
    // Background
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#0a0a0f'); grad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 1080, 1080);
    
    // Header
    ctx.fillStyle = '#2AAA8A'; ctx.font = 'bold 42px Arial';
    ctx.fillText(`${config.emoji} ${config.label}`, 50, 70);
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '22px Arial';
    ctx.fillText(`${eventName} • ${eventDate}`, 50, 110);
    
    // Podium
    const top3 = data.slice(0, 3);
    const podiumY = 200, podiumH = [220, 280, 180], podiumX = [150, 440, 730];
    const order = [1, 0, 2];
    
    order.forEach((idx, i) => {
      if (!top3[idx]) return;
      const [name, stats] = top3[idx];
      const x = podiumX[i], h = podiumH[i], y = 450 - h;
      
      ctx.fillStyle = idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32';
      ctx.beginPath(); ctx.roundRect(x, y, 200, h, 15); ctx.fill();
      
      ctx.fillStyle = '#1a1a2e'; ctx.font = 'bold 60px Arial'; ctx.textAlign = 'center';
      ctx.fillText(idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉', x + 100, y + 60);
      ctx.font = 'bold 20px Arial'; ctx.fillText(name.split(' ').slice(0, 2).join(' '), x + 100, y + 100);
      ctx.font = 'bold 36px Arial'; ctx.fillText(stats.v1, x + 100, y + 150);
    });
    ctx.textAlign = 'left';
    
    // Rest of ranking
    const rest = data.slice(3, 10);
    rest.forEach(([name, stats], i) => {
      const y = 500 + i * 70;
      ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.beginPath(); ctx.roundRect(50, y, 980, 60, 10); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 24px Arial'; ctx.fillText(`${i + 4}°`, 70, y + 38);
      ctx.font = '22px Arial'; ctx.fillText(name, 140, y + 38);
      ctx.fillStyle = config.color; ctx.font = 'bold 28px Arial'; ctx.textAlign = 'right';
      ctx.fillText(stats.v1.toString(), 1000, y + 38); ctx.textAlign = 'left';
    });
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '16px Arial';
    ctx.fillText('NWG ITALIA • LEADER RANKING', 50, 1050);
    
    setPreviewImage(canvas.toDataURL('image/png'));
    setShowPreview(true);
  };

  const downloadSlidePNG = (mode = 'full') => {
    const data = getData();
    if (data.length === 0) return;
    
    const W = 1920, H = 1080;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    
    // Background NWG Teal
    ctx.fillStyle = '#2AAA8A'; ctx.fillRect(0, 0, W, H);
    
    // Header
    ctx.fillStyle = '#fff'; ctx.font = 'bold 48px Arial';
    ctx.fillText(`${config.emoji} ${config.label}`, 60, 80);
    ctx.font = '28px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(`${eventName} • ${eventDate}`, 60, 130);
    
    // Podio
    const top3 = data.slice(0, 3);
    const podiumData = [
      { idx: 1, x: 200, h: 320, medal: '🥈', color: '#C0C0C0' },
      { idx: 0, x: 560, h: 400, medal: '🥇', color: '#FFD700' },
      { idx: 2, x: 920, h: 260, medal: '🥉', color: '#CD7F32' }
    ];
    
    podiumData.forEach(p => {
      if (!top3[p.idx]) return;
      const [name, stats] = top3[p.idx];
      const y = 600 - p.h;
      
      // 3D Bar
      ctx.fillStyle = p.color; ctx.beginPath(); ctx.roundRect(p.x, y, 280, p.h, [20, 20, 0, 0]); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(p.x + 280, y + 20, 15, p.h - 20);
      
      // Content
      ctx.fillStyle = '#1a1a2e'; ctx.textAlign = 'center';
      ctx.font = 'bold 72px Arial'; ctx.fillText(p.medal, p.x + 140, y + 80);
      ctx.font = 'bold 28px Arial'; ctx.fillText(name, p.x + 140, y + 130);
      ctx.font = 'bold 64px Arial'; ctx.fillText(stats.v1.toString(), p.x + 140, y + 210);
      ctx.font = '20px Arial'; ctx.fillText(`${stats.v2} acc.`, p.x + 140, y + 250);
    });
    ctx.textAlign = 'left';
    
    if (mode === 'full') {
      // TOP 4-10
      const rest = data.slice(3, 10);
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.roundRect(1280, 160, 580, 500, 20); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 28px Arial'; ctx.fillText('TOP 4-10', 1320, 210);
      
      rest.forEach(([name, stats], i) => {
        const y = 250 + i * 60;
        ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.beginPath(); ctx.roundRect(1300, y, 540, 50, 8); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 22px Arial'; ctx.fillText(`${i + 4}°`, 1320, y + 33);
        ctx.font = '20px Arial'; ctx.fillText(name.split(' ').slice(0, 2).join(' '), 1380, y + 33);
        ctx.font = 'bold 24px Arial'; ctx.textAlign = 'right'; ctx.fillText(stats.v1.toString(), 1810, y + 33);
        ctx.textAlign = 'left';
      });
    }
    
    // Stats
    const stats = getDashboardStats();
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.roundRect(60, 700, 400, 120, 15); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 36px Arial'; ctx.fillText(stats.ins.toString(), 100, 760);
    ctx.font = '18px Arial'; ctx.fillText('Inseriti', 100, 790);
    ctx.font = 'bold 36px Arial'; ctx.fillText(stats.acc.toString(), 260, 760);
    ctx.font = '18px Arial'; ctx.fillText('Accettati', 260, 790);
    ctx.font = 'bold 36px Arial'; ctx.fillText(`${stats.conv}%`, 380, 760);
    ctx.font = '18px Arial'; ctx.fillText('Conv.', 380, 790);
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '20px Arial';
    ctx.fillText('NWG ITALIA • LEADER RANKING', 60, 1050);
    
    const link = document.createElement('a');
    link.download = `classifica_${eventDate.replace(/\s/g, '_')}_${mode}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // === WEBHOOK ===
  const handleSendToBot = () => setShowConfirmModal(true);
  
  const confirmSendToBot = async () => {
    setShowConfirmModal(false);
    setSendStatus('⏳ Invio...');
    
    const data = getData();
    const stats = getDashboardStats();
    
    const payload = {
      timestamp: new Date().toISOString(),
      classifica_tipo: config.label,
      evento: eventName,
      periodo: eventDate,
      period_type: periodType,
      totale_inseriti: stats.ins,
      totale_accettati: stats.acc,
      totale_partecipanti: stats.part,
      conversione_percentuale: stats.conv,
      top_10: data.slice(0, 10).map(([name, s], i) => ({
        posizione: i + 1,
        nome: name,
        inseriti: s.v1,
        accettati: s.v2,
        percentuale: s.v1 > 0 ? Math.round(s.v2 / s.v1 * 100) : 0
      }))
    };
    
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSendStatus(res.ok ? '✅ Inviato!' : '❌ Errore');
    } catch (e) {
      setSendStatus('❌ Errore rete');
    }
    setTimeout(() => setSendStatus(''), 3000);
  };

  // === LOGIN ===
  const handleLogin = (e) => {
    e.preventDefault();
    const u = USERS[loginForm.username.toLowerCase()];
    if (u && u.password === loginForm.password) {
      setUser({ ...u, username: loginForm.username });
      setLoginError('');
    } else {
      setLoginError('Credenziali non valide');
    }
  };

  // === RENDER ===
  if (!user) {
    return (
      <>
        <Head><title>Login | Leader Ranking</title></Head>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ ...S.card, maxWidth: 400, width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <div style={{ fontSize: 50, marginBottom: 10 }}>🏆</div>
              <h1 style={{ color: '#fff', fontSize: 24, marginBottom: 5 }}>Leader Ranking</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>NWG Italia</p>
            </div>
            <form onSubmit={handleLogin}>
              <input style={{ ...S.input, marginBottom: 15 }} placeholder="Username" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} />
              <input style={{ ...S.input, marginBottom: 20 }} type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
              {loginError && <p style={{ color: '#f44', marginBottom: 15, fontSize: 14 }}>{loginError}</p>}
              <button style={{ ...S.btn, width: '100%' }} type="submit">Accedi</button>
            </form>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 25, textAlign: 'center' }}>v9.9</p>
          </div>
        </div>
      </>
    );
  }

  const pies = rankings ? getPieDistributions() : { k: [], stati: [] };
  const totalK = pies.k.reduce((s, [, v]) => s + v, 0);
  const totalStati = pies.stati.reduce((s, [, v]) => s + v, 0);

  return (
    <>
      <Head><title>Leader Ranking | NWG Italia</title></Head>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}>
        {/* HEADER */}
        <header style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '15px 20px', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <span style={{ fontSize: 28 }}>🏆</span>
              <div>
                <h1 style={{ color: '#fff', fontSize: 18, margin: 0 }}>Leader Ranking</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0 }}>Ciao, {user.name}</p>
              </div>
            </div>
            <button style={{ ...S.btn, background: 'rgba(255,255,255,0.1)', padding: '8px 16px', fontSize: 12 }} onClick={() => { setUser(null); setCsvData(null); setRankings(null); setReportData(null); }}>Esci</button>
          </div>
        </header>

        <main style={{ maxWidth: 1400, margin: '0 auto', padding: 20 }}>
          {/* TABS - SEMPRE VISIBILI */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'dashboard' ? 'linear-gradient(135deg,#7C4DFF,#536DFE)' : 'rgba(255,255,255,0.05)', border: activeTab === 'dashboard' ? 'none' : '1px solid rgba(255,255,255,0.1)', opacity: rankings ? 1 : 0.5 }} onClick={() => rankings && setActiveTab('dashboard')} disabled={!rankings}>📊 Dashboard</button>
            <button style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'classifiche' ? 'linear-gradient(135deg,#7C4DFF,#536DFE)' : 'rgba(255,255,255,0.05)', border: activeTab === 'classifiche' ? 'none' : '1px solid rgba(255,255,255,0.1)', opacity: rankings ? 1 : 0.5 }} onClick={() => rankings && setActiveTab('classifiche')} disabled={!rankings}>🏆 Classifiche</button>
            <button style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'report' ? 'linear-gradient(135deg,#FF6B35,#FF8F00)' : 'rgba(255,255,255,0.05)', border: activeTab === 'report' ? 'none' : '1px solid rgba(255,255,255,0.1)' }} onClick={() => setActiveTab('report')}>📈 Report</button>
          </div>

          {/* CSV UPLOAD - Solo se non in tab Report */}
          {activeTab !== 'report' && (
            <section style={{ marginBottom: 25 }}>
              <div style={S.card}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15, alignItems: 'flex-start' }}>
                  {/* Upload */}
                  <div style={{ flex: '1 1 200px', minWidth: 200 }}>
                    <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>📤 Carica CSV</label>
                    <div style={{ border: `2px dashed ${isDragging ? '#7C4DFF' : 'rgba(255,255,255,0.2)'}`, borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={e => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) { const r = new FileReader(); r.onload = ev => processCSV(ev.target.result); r.readAsText(e.dataTransfer.files[0]); } }}
                      onClick={() => document.getElementById('csv-input').click()}>
                      <input id="csv-input" type="file" accept=".csv" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) { const r = new FileReader(); r.onload = ev => processCSV(ev.target.result); r.readAsText(e.target.files[0]); } }} />
                      <span style={{ fontSize: 24 }}>📁</span>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '8px 0 0' }}>{csvData ? `✅ ${csvData.length} righe` : 'Trascina o clicca'}</p>
                    </div>
                  </div>
                  
                  {/* Evento */}
                  <div style={{ flex: '1 1 150px' }}>
                    <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>📅 Evento</label>
                    <select style={{ ...S.input, cursor: 'pointer' }} value={eventName} onChange={e => setEventName(e.target.value)}>
                      {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  
                  {/* Mese */}
                  {availableMonths.length > 0 && (
                    <div style={{ flex: '1 1 150px' }}>
                      <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>📆 Mese</label>
                      <select style={{ ...S.input, cursor: 'pointer' }} value={selectedMonth} onChange={e => { setSelectedMonth(e.target.value); setWeeks(getWeeksForMonth(e.target.value)); setEventDate(e.target.value.toUpperCase()); applyPeriodFilter('progressiva'); }}>
                        {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  )}
                  
                  {/* Classifica */}
                  <div style={{ flex: '1 1 150px' }}>
                    <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>🏆 Classifica</label>
                    <select style={{ ...S.input, cursor: 'pointer' }} value={selectedRanking} onChange={e => setSelectedRanking(e.target.value)}>
                      {Object.entries(RANKING_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
                    </select>
                  </div>
                </div>
                
                {/* Periodo Filter */}
                {rankings && weeks.length > 0 && (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>⏱️ Periodo</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button style={{ ...S.btn, padding: '8px 16px', fontSize: 12, background: periodType === 'progressiva' ? 'linear-gradient(135deg,#7C4DFF,#536DFE)' : 'rgba(255,255,255,0.1)' }} onClick={() => applyPeriodFilter('progressiva')}>📈 Progressiva</button>
                      <button style={{ ...S.btn, padding: '8px 16px', fontSize: 12, background: periodType === 'finale' ? 'linear-gradient(135deg,#4CAF50,#45a049)' : 'rgba(255,255,255,0.1)' }} onClick={() => applyPeriodFilter('finale')}>🏁 Finale</button>
                      {weeks.map(w => (
                        <button key={w.num} style={{ ...S.btn, padding: '8px 16px', fontSize: 12, background: periodType === 'settimanale' && selectedWeek?.num === w.num ? 'linear-gradient(135deg,#FF6B35,#FF8F00)' : 'rgba(255,255,255,0.1)' }} onClick={() => applyPeriodFilter('settimanale', w)}>{w.label}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TAB REPORT */}
          {activeTab === 'report' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,107,53,0.05))', borderRadius: 20, padding: 20, border: '1px solid rgba(255,107,53,0.3)' }}>
                <h2 style={{ color: '#FF6B35', fontSize: 18, marginBottom: 5 }}>📈 REPORT AGGREGATO</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 15 }}>Carica più CSV per generare classifiche mensili/trimestrali/annuali</p>
                
                {/* 4 UPLOAD CSV */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
                  {[
                    { key: 'ivd', label: 'IVD Attivati', emoji: '🟠', color: '#FF6B35', note: 'Solo Attivazione START&GO' },
                    { key: 'energy', label: 'Luce Amica', emoji: '⚡', color: '#FFC107' },
                    { key: 'fv', label: 'Fotovoltaico', emoji: '☀️', color: '#FF9800' },
                    { key: 'consultings', label: 'Seminari', emoji: '🎓', color: '#9C27B0' }
                  ].map(item => (
                    <div key={item.key} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 15, border: reportCSVs[item.key] ? '2px solid #4CAF50' : '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 20 }}>{item.emoji}</span>
                        <span style={{ color: item.color, fontWeight: 600 }}>{item.label}</span>
                      </div>
                      <input type="file" accept=".csv" id={`csv-${item.key}`} style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV(item.key, e.target.files[0]); }} />
                      <label htmlFor={`csv-${item.key}`} style={{ display: 'block', cursor: 'pointer', padding: '10px', background: `${item.color}20`, borderRadius: 8, textAlign: 'center', color: reportCSVs[item.key] ? '#4CAF50' : 'rgba(255,255,255,0.6)', fontSize: 12 }}>
                        {reportCSVs[item.key] ? `✅ ${reportCSVs[item.key].rows} righe` : '📤 Carica CSV'}
                      </label>
                      {item.note && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 5, textAlign: 'center' }}>{item.note}</p>}
                    </div>
                  ))}
                </div>
                
                {/* Bottoni */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button style={{ ...S.btn, flex: 1, minWidth: 150, padding: '14px 20px', background: 'linear-gradient(135deg, #FF6B35, #FF8F00)', opacity: Object.values(reportCSVs).some(v => v) ? 1 : 0.5 }} onClick={() => setReportData(generateReportData())} disabled={!Object.values(reportCSVs).some(v => v)}>📊 Genera Report</button>
                  <button style={{ ...S.btn, flex: 1, minWidth: 150, padding: '14px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} onClick={clearReportCSVs}>🗑️ Reset</button>
                </div>
              </div>
              
              {/* RISULTATI REPORT */}
              {reportData && (
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15, marginBottom: 20 }}>
                    <div style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.2), rgba(124,77,255,0.05))', borderRadius: 12, padding: 15, flex: 1, minWidth: 120, textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: '#7C4DFF' }}>{reportData.total}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>TOTALE</div>
                    </div>
                    {reportData.sources.ivd > 0 && <div style={{ background: 'rgba(255,107,53,0.1)', borderRadius: 12, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#FF6B35' }}>{reportData.sources.ivd}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>IVD</div></div>}
                    {reportData.sources.energy > 0 && <div style={{ background: 'rgba(255,193,7,0.1)', borderRadius: 12, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#FFC107' }}>{reportData.sources.energy}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Luce</div></div>}
                    {reportData.sources.fv > 0 && <div style={{ background: 'rgba(255,152,0,0.1)', borderRadius: 12, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#FF9800' }}>{reportData.sources.fv}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>FV</div></div>}
                    {reportData.sources.consultings > 0 && <div style={{ background: 'rgba(156,39,176,0.1)', borderRadius: 12, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#9C27B0' }}>{reportData.sources.consultings}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Sem.</div></div>}
                  </div>
                  
                  {/* Classifiche */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 15 }}>
                    {/* K Manager */}
                    <div style={{ background: 'rgba(255,215,0,0.05)', borderRadius: 16, padding: 15, border: '1px solid rgba(255,215,0,0.2)' }}>
                      <h3 style={{ color: '#FFD700', fontSize: 14, marginBottom: 12 }}>👑 K MANAGER</h3>
                      {reportData.classifiche.k.map(([name, val], i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <span style={{ width: 24, fontSize: 12, color: i < 3 ? '#FFD700' : 'rgba(255,255,255,0.5)', fontWeight: i < 3 ? 700 : 500 }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}</span>
                          <div style={{ flex: 1, height: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                            <div style={{ width: `${(val / reportData.classifiche.k[0][1]) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FFD700, #FFA000)', borderRadius: 6 }} />
                            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#fff', fontWeight: 500 }}>{name}</span>
                          </div>
                          <span style={{ width: 35, fontSize: 13, fontWeight: 700, color: '#FFD700', textAlign: 'right' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Networker */}
                    <div style={{ background: 'rgba(156,39,176,0.05)', borderRadius: 16, padding: 15, border: '1px solid rgba(156,39,176,0.2)', maxHeight: 400, overflowY: 'auto' }}>
                      <h3 style={{ color: '#9C27B0', fontSize: 14, marginBottom: 12 }}>⭐ NETWORKER ({reportData.classifiche.nw.length})</h3>
                      {reportData.classifiche.nw.map(([name, val], i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <span style={{ width: 24, fontSize: 11, color: i < 3 ? '#9C27B0' : 'rgba(255,255,255,0.5)' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}</span>
                          <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                            <div style={{ width: `${(val / reportData.classifiche.nw[0][1]) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #9C27B0, #7B1FA2)', borderRadius: 4 }} />
                            <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#fff' }}>{name}</span>
                          </div>
                          <span style={{ width: 30, fontSize: 12, fontWeight: 600, color: '#9C27B0', textAlign: 'right' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* SDP */}
                    <div style={{ background: 'rgba(33,150,243,0.05)', borderRadius: 16, padding: 15, border: '1px solid rgba(33,150,243,0.2)', maxHeight: 400, overflowY: 'auto' }}>
                      <h3 style={{ color: '#2196F3', fontSize: 14, marginBottom: 12 }}>🔵 SDP ({reportData.classifiche.sdp.length})</h3>
                      {reportData.classifiche.sdp.map(([name, val], i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <span style={{ width: 24, fontSize: 11, color: i < 3 ? '#2196F3' : 'rgba(255,255,255,0.5)' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}</span>
                          <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                            <div style={{ width: `${(val / (reportData.classifiche.sdp[0]?.[1] || 1)) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #2196F3, #1976D2)', borderRadius: 4 }} />
                            <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#fff' }}>{name}</span>
                          </div>
                          <span style={{ width: 30, fontSize: 12, fontWeight: 600, color: '#2196F3', textAlign: 'right' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* IVD */}
                    {reportData.classifiche.ivd.length > 0 && (
                      <div style={{ background: 'rgba(255,107,53,0.05)', borderRadius: 16, padding: 15, border: '1px solid rgba(255,107,53,0.2)', maxHeight: 400, overflowY: 'auto' }}>
                        <h3 style={{ color: '#FF6B35', fontSize: 14, marginBottom: 12 }}>🟠 IVD ({reportData.classifiche.ivd.length})</h3>
                        {reportData.classifiche.ivd.slice(0, 20).map(([name, val], i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <span style={{ width: 24, fontSize: 11, color: i < 3 ? '#FF6B35' : 'rgba(255,255,255,0.5)' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}°`}</span>
                            <div style={{ flex: 1, height: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                              <div style={{ width: `${(val / (reportData.classifiche.ivd[0]?.[1] || 1)) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B35, #E65100)', borderRadius: 4 }} />
                              <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#fff' }}>{name}</span>
                            </div>
                            <span style={{ width: 30, fontSize: 12, fontWeight: 600, color: '#FF6B35', textAlign: 'right' }}>{val}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DASHBOARD TAB */}
          {rankings && activeTab === 'dashboard' && (() => {
            const stats = getDashboardStats();
            
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                  <span style={{ fontSize: 24 }}>{config.emoji}</span>
                  <div>
                    <h2 style={{ color: config.color, fontSize: 18, margin: 0 }}>{config.label}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0 }}>{eventDate}</p>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,107,53,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(255,107,53,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#FF6B35' }}>{stats.ins}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: 4 }}>{labels.c1}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.25), rgba(76,175,80,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(76,175,80,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#4CAF50' }}>{stats.acc}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: 4 }}>{labels.c2}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.25), rgba(124,77,255,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(124,77,255,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#7C4DFF' }}>{stats.part}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: 4 }}>Partecipanti</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(255,215,0,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#FFD700' }}>{stats.conv}%</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: 4 }}>Conversione</div>
                  </div>
                </div>
                
                {/* Podio */}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 style={{ color: '#fff', fontSize: 16, marginBottom: 15, textAlign: 'center' }}>🏆 PODIO</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 15, height: 200 }}>
                    {[1, 0, 2].map(idx => {
                      const entry = getData()[idx];
                      if (!entry) return null;
                      const [name, s] = entry;
                      const heights = [160, 200, 130];
                      const colors = ['#C0C0C0', '#FFD700', '#CD7F32'];
                      const medals = ['🥈', '🥇', '🥉'];
                      return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 100 }}>
                          <span style={{ fontSize: 32 }}>{medals[idx]}</span>
                          <div style={{ width: '100%', height: heights[idx], background: `linear-gradient(180deg, ${colors[idx]}, ${colors[idx]}88)`, borderRadius: '12px 12px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <span style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e' }}>{s.v1}</span>
                            <span style={{ fontSize: 10, color: '#1a1a2e', textAlign: 'center', marginTop: 5, fontWeight: 600 }}>{name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* TOP 4-10 */}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 15, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 style={{ color: '#fff', fontSize: 14, marginBottom: 10 }}>📊 TOP 4-10</h3>
                  {getData().slice(3, 10).map(([name, s], i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <span style={{ width: 25, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{i + 4}°</span>
                      <span style={{ flex: 1, fontSize: 13, color: '#fff' }}>{name}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: config.color }}>{s.v1}</span>
                    </div>
                  ))}
                </div>
                
                {/* Torte */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                  {pies.k.length > 0 && (
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: 15, border: '1px solid rgba(255,215,0,0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <MiniPie data={pies.k} total={totalK} colors={PIE_COLORS} size={65} />
                        <div>
                          <div style={{ fontSize: 12, color: '#FFD700', fontWeight: 600, marginBottom: 5 }}>👑 K Manager</div>
                          {pies.k.slice(0, 4).map(([name, val], i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                              <span style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i] }} />
                              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{name}: {val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {pies.stati.length > 0 && (
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: 15, border: '1px solid rgba(76,175,80,0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <MiniPie data={pies.stati} total={totalStati} colors={pies.stati.map(([s]) => STATO_COLORS[s] || '#607D8B')} size={65} />
                        <div>
                          <div style={{ fontSize: 12, color: '#4CAF50', fontWeight: 600, marginBottom: 5 }}>📋 Stati</div>
                          {pies.stati.slice(0, 4).map(([name, val], i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                              <span style={{ width: 8, height: 8, borderRadius: 2, background: STATO_COLORS[name] || '#607D8B' }} />
                              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{name}: {val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Download Slide */}
                <div style={{ background: 'linear-gradient(135deg, rgba(42,170,138,0.2), rgba(42,170,138,0.05))', borderRadius: 16, padding: 20, border: '1px solid rgba(42,170,138,0.3)' }}>
                  <div style={{ fontSize: 16, color: '#2AAA8A', fontWeight: 700, marginBottom: 5 }}>📥 SCARICA PER SLIDE</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 15 }}>PNG 16:9 per presentazioni</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button style={{ ...S.btn, flex: 1, minWidth: 180, padding: '14px 20px', background: 'linear-gradient(135deg, #2AAA8A, #20917A)', fontSize: 14 }} onClick={() => downloadSlidePNG('full')}>📊 Podio + Classifica</button>
                    <button style={{ ...S.btn, flex: 1, minWidth: 180, padding: '14px 20px', background: 'linear-gradient(135deg, #FFD700, #FFA000)', color: '#1a1a2e', fontSize: 14 }} onClick={() => downloadSlidePNG('solo')}>🏆 Solo Podio</button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* CLASSIFICHE TAB */}
          {rankings && activeTab === 'classifiche' && (
            <div style={S.rankCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}>
                <div>
                  <h2 style={{ color: config.color, fontSize: 18, margin: 0 }}>{config.emoji} {config.label}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>{getData().length} partecipanti • {getClassificaTotal()} contratti • {eventDate}</p>
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
                        <tr key={name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', ...(i < 3 ? { background: `${config.color}10` } : {}) }}>
                          <td style={{ padding: 10, textAlign: 'center' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td>
                          <td style={{ padding: 10, fontWeight: i < 3 ? 700 : 500, fontSize: 13 }}>{name}</td>
                          <td style={{ padding: 10, textAlign: 'center', color: config.color, fontWeight: 700 }}>{s.v1}</td>
                          {isExclusive() && <><td style={{ padding: 10, textAlign: 'center', color: p >= 50 ? '#4CAF50' : '#FFC107', fontSize: 12 }}>{p}%</td><td style={{ padding: 10, textAlign: 'center', color: '#4CAF50', fontWeight: 700 }}>{s.v2}</td></>}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Bottoni */}
              <div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', alignItems: 'center' }}>
                <button style={{ ...S.btn, flex: 1, minWidth: 120, background: `linear-gradient(135deg,${config.color},${config.color}88)` }} onClick={handleGenerate}>📸 PNG 1080x1080</button>
                <button style={{ ...S.btn, flex: 1, minWidth: 120, background: 'linear-gradient(135deg,#00BFA5,#1DE9B6)' }} onClick={handleSendToBot}>🤖 Invia a Bot</button>
                {sendStatus && <span style={{ fontSize: 13, color: sendStatus.includes('✅') ? '#4CAF50' : sendStatus.includes('❌') ? '#f44' : '#FFC107' }}>{sendStatus}</span>}
              </div>
            </div>
          )}

          {/* No data */}
          {!rankings && activeTab !== 'report' && (
            <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: 50 }}>📊</div>
              <p>Carica un CSV per iniziare</p>
            </div>
          )}
        </main>

        {/* MODALS */}
        {showPreview && previewImage && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={() => setShowPreview(false)}>
            <div style={{ maxWidth: 600, width: '100%' }} onClick={e => e.stopPropagation()}>
              <img src={previewImage} alt="Preview" style={{ width: '100%', borderRadius: 12 }} />
              <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                <button style={{ ...S.btn, flex: 1 }} onClick={() => { const a = document.createElement('a'); a.href = previewImage; a.download = `classifica_${eventDate.replace(/\s/g, '_')}.png`; a.click(); }}>💾 Scarica</button>
                <button style={{ ...S.btn, flex: 1, background: 'rgba(255,255,255,0.1)' }} onClick={() => setShowPreview(false)}>✕ Chiudi</button>
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
            <div style={{ background: 'linear-gradient(135deg,#1a1a2e,#12121f)', borderRadius: 20, padding: 30, maxWidth: 450, width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 style={{ color: '#FFC107', marginBottom: 20, fontSize: 20 }}>⚠️ VERIFICA PRIMA DI INVIARE</h2>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 10, fontSize: 14 }}>📊 <strong style={{ color: '#fff' }}>Classifica:</strong> {config.label}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 10, fontSize: 14 }}>📅 <strong style={{ color: '#fff' }}>Evento:</strong> {eventName} - {eventDate}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>📈 <strong style={{ color: '#fff' }}>Tipo:</strong> {periodType === 'progressiva' ? 'Progressiva' : periodType === 'settimanale' ? 'Settimanale' : 'Finale mese'}</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ ...S.btn, flex: 1, background: 'linear-gradient(135deg,#4CAF50,#45a049)' }} onClick={confirmSendToBot}>✅ Conferma Invio</button>
                <button style={{ ...S.btn, flex: 1, background: 'rgba(255,255,255,0.1)' }} onClick={() => setShowConfirmModal(false)}>❌ Annulla</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
