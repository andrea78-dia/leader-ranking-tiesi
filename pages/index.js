import React, { useState } from 'react';
import Head from 'next/head';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 ICONE SVG - Sostituzione lucide-react per evitare dipendenze
// ═══════════════════════════════════════════════════════════════════════════
const IconBase = ({ children, size = 16, color = 'currentColor', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
    {children}
  </svg>
);

const Camera = (props) => <IconBase {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconBase>;
const Download = (props) => <IconBase {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></IconBase>;
const FileText = (props) => <IconBase {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></IconBase>;
const BarChart3 = (props) => <IconBase {...props}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></IconBase>;
const Users = (props) => <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconBase>;
const Sun = (props) => <IconBase {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></IconBase>;
const Zap = (props) => <IconBase {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconBase>;
const TrendingUp = (props) => <IconBase {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></IconBase>;
const Target = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></IconBase>;
const Award = (props) => <IconBase {...props}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></IconBase>;
const Calendar = (props) => <IconBase {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></IconBase>;
const AlertTriangle = (props) => <IconBase {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></IconBase>;
const CheckCircle = (props) => <IconBase {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconBase>;
const XCircle = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></IconBase>;
const ChevronLeft = (props) => <IconBase {...props}><polyline points="15 18 9 12 15 6"/></IconBase>;
const LogOut = (props) => <IconBase {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></IconBase>;
const Menu = (props) => <IconBase {...props}><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></IconBase>;
const X = (props) => <IconBase {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconBase>;
const Filter = (props) => <IconBase {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></IconBase>;
const Clock = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconBase>;
const Star = (props) => <IconBase {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconBase>;
const Trophy = (props) => <IconBase {...props}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></IconBase>;
const Crown = (props) => <IconBase {...props}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M4 18h16v2H4z"/></IconBase>;
const Briefcase = (props) => <IconBase {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></IconBase>;
const Building2 = (props) => <IconBase {...props}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></IconBase>;
const Image = (props) => <IconBase {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></IconBase>;
const Share2 = (props) => <IconBase {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></IconBase>;
const Eye = (props) => <IconBase {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></IconBase>;
const RefreshCw = (props) => <IconBase {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></IconBase>;

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 DESIGN SYSTEM v2.0 - Executive Level UI
// ═══════════════════════════════════════════════════════════════════════════

const DS = {
  // ─────────────────────────────────────────────────────────────────────────
  // COLORI - Palette Executive Raffinata
  // ─────────────────────────────────────────────────────────────────────────
  colors: {
    // Primary - Verde Teal Executive
    primary: '#1E8A6E',
    primaryLight: '#2AAA8A',
    primaryDark: '#166D57',
    primaryBg: '#F0FDF9',
    primaryBorder: '#A7F3D0',
    
    // Accent - Oro NWG Raffinato
    accent: '#C9A227',
    accentLight: '#E5C255',
    accentDark: '#A68512',
    accentBg: '#FFFBEB',
    accentBorder: '#FDE68A',
    
    // Semantic
    success: '#059669',
    successBg: '#ECFDF5',
    successBorder: '#A7F3D0',
    
    danger: '#DC2626',
    dangerBg: '#FEF2F2',
    dangerBorder: '#FECACA',
    
    warning: '#D97706',
    warningBg: '#FFFBEB',
    warningBorder: '#FDE68A',
    
    info: '#0284C7',
    infoBg: '#F0F9FF',
    infoBorder: '#BAE6FD',
    
    // Neutrals
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    
    // Prodotti - Coerenti con brand
    fv: '#059669',      // Fotovoltaico - Verde Emerald
    fvBg: '#ECFDF5',
    fvBorder: '#A7F3D0',
    
    la: '#D97706',      // Luce Amica - Ambra
    laBg: '#FFFBEB',
    laBorder: '#FDE68A',
    
    seminari: '#7C3AED', // Seminari - Viola
    seminariBg: '#F5F3FF',
    seminariBorder: '#C4B5FD',
    
    ivd: '#0891B2',      // IVD - Cyan
    ivdBg: '#ECFEFF',
    ivdBorder: '#A5F3FC',
    
    // Podio
    gold: '#C9A227',
    silver: '#6B7280',
    bronze: '#B45309'
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // TIPOGRAFIA - Sistema Gerarchico
  // ─────────────────────────────────────────────────────────────────────────
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    
    // Sizes
    h1: { size: 28, weight: 700, height: 1.2 },
    h2: { size: 20, weight: 700, height: 1.3 },
    h3: { size: 16, weight: 600, height: 1.4 },
    body: { size: 14, weight: 400, height: 1.5 },
    caption: { size: 12, weight: 500, height: 1.4 },
    micro: { size: 11, weight: 500, height: 1.3 }
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // SPACING - Sistema 4px
  // ─────────────────────────────────────────────────────────────────────────
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // BORDER RADIUS - Consistente
  // ─────────────────────────────────────────────────────────────────────────
  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // SHADOWS - Subtle & Professional
  // ─────────────────────────────────────────────────────────────────────────
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 2px 4px rgba(0,0,0,0.06)',
    lg: '0 4px 12px rgba(0,0,0,0.08)',
    xl: '0 8px 24px rgba(0,0,0,0.12)'
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // TRANSITIONS
  // ─────────────────────────────────────────────────────────────────────────
  transition: {
    fast: 'all 0.15s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease'
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTI UI RIUTILIZZABILI
// ─────────────────────────────────────────────────────────────────────────────

// Icona con wrapper consistente
const Icon = ({ icon: IconComponent, size = 16, color = DS.colors.gray500, style = {} }) => (
  <IconComponent size={size} color={color} strokeWidth={2} style={{ flexShrink: 0, ...style }} />
);

// Badge per posizioni podio (sostituisce emoji medaglie)
const PositionBadge = ({ position, size = 'md' }) => {
  const sizes = { sm: 20, md: 24, lg: 32 };
  const fontSizes = { sm: 10, md: 12, lg: 14 };
  const s = sizes[size];
  const fs = fontSizes[size];
  
  const colors = {
    1: { bg: DS.colors.gold, text: DS.colors.white },
    2: { bg: DS.colors.gray400, text: DS.colors.white },
    3: { bg: DS.colors.bronze, text: DS.colors.white }
  };
  
  const c = colors[position] || { bg: DS.colors.gray200, text: DS.colors.gray600 };
  
  return (
    <div style={{
      width: s,
      height: s,
      borderRadius: DS.radius.full,
      background: position <= 3 ? c.bg : 'transparent',
      border: position > 3 ? `1px solid ${DS.colors.gray300}` : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: fs,
      color: c.text,
      flexShrink: 0
    }}>
      {position}°
    </div>
  );
};

// Bottone primario
const Button = ({ children, onClick, variant = 'primary', size = 'md', icon: IconComp, disabled = false, style = {} }) => {
  const variants = {
    primary: { bg: DS.colors.primary, color: DS.colors.white, border: 'none' },
    secondary: { bg: DS.colors.white, color: DS.colors.gray700, border: `1px solid ${DS.colors.gray200}` },
    ghost: { bg: 'transparent', color: DS.colors.gray600, border: 'none' },
    danger: { bg: DS.colors.danger, color: DS.colors.white, border: 'none' },
    accent: { bg: DS.colors.accent, color: DS.colors.white, border: 'none' }
  };
  
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 12 },
    md: { padding: '10px 16px', fontSize: 13 },
    lg: { padding: '12px 24px', fontSize: 14 }
  };
  
  const v = variants[variant];
  const sz = sizes[size];
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: v.bg,
        color: v.color,
        border: v.border,
        borderRadius: DS.radius.md,
        padding: sz.padding,
        fontSize: sz.fontSize,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: DS.transition.fast,
        fontFamily: DS.font.family,
        ...style
      }}
    >
      {IconComp && <IconComp size={sz.fontSize + 2} strokeWidth={2} />}
      {children}
    </button>
  );
};

// Card container
const Card = ({ children, padding = DS.space.xl, style = {} }) => (
  <div style={{
    background: DS.colors.white,
    borderRadius: DS.radius.lg,
    border: `1px solid ${DS.colors.gray200}`,
    padding,
    boxShadow: DS.shadow.sm,
    ...style
  }}>
    {children}
  </div>
);

// Section header
const SectionHeader = ({ icon: IconComp, title, subtitle, color = DS.colors.primary, rightContent }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: DS.space.xl 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: DS.space.md }}>
      {IconComp && (
        <div style={{
          width: 40,
          height: 40,
          borderRadius: DS.radius.md,
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconComp size={20} color={color} strokeWidth={2} />
        </div>
      )}
      <div>
        <h3 style={{ 
          fontSize: DS.font.h2.size, 
          fontWeight: DS.font.h2.weight, 
          color: DS.colors.gray800, 
          margin: 0 
        }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ 
            fontSize: DS.font.caption.size, 
            color: DS.colors.gray500, 
            margin: '4px 0 0' 
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {rightContent}
  </div>
);

// Metric card
const MetricCard = ({ label, value, sublabel, icon: IconComp, color = DS.colors.primary, trend }) => (
  <div style={{
    background: DS.colors.white,
    borderRadius: DS.radius.lg,
    padding: DS.space.lg,
    border: `1px solid ${DS.colors.gray200}`,
    borderLeft: `3px solid ${color}`
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: DS.space.sm }}>
      <span style={{ fontSize: DS.font.micro.size, fontWeight: 600, color: DS.colors.gray500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </span>
      {IconComp && <IconComp size={16} color={color} strokeWidth={2} />}
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: DS.colors.gray800, lineHeight: 1 }}>
      {value}
    </div>
    {sublabel && (
      <div style={{ fontSize: DS.font.micro.size, color: DS.colors.gray500, marginTop: DS.space.xs }}>
        {sublabel}
      </div>
    )}
    {trend && (
      <div style={{ 
        fontSize: DS.font.micro.size, 
        color: trend > 0 ? DS.colors.success : DS.colors.danger, 
        marginTop: DS.space.xs,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }}>
        <TrendingUp size={12} style={{ transform: trend < 0 ? 'rotate(180deg)' : 'none' }} />
        {Math.abs(trend)}%
      </div>
    )}
  </div>
);

// Badge
const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variants = {
    default: { bg: DS.colors.gray100, color: DS.colors.gray600, border: DS.colors.gray200 },
    primary: { bg: DS.colors.primaryBg, color: DS.colors.primary, border: DS.colors.primaryBorder },
    success: { bg: DS.colors.successBg, color: DS.colors.success, border: DS.colors.successBorder },
    warning: { bg: DS.colors.warningBg, color: DS.colors.warning, border: DS.colors.warningBorder },
    danger: { bg: DS.colors.dangerBg, color: DS.colors.danger, border: DS.colors.dangerBorder },
    accent: { bg: DS.colors.accentBg, color: DS.colors.accent, border: DS.colors.accentBorder }
  };
  
  const sizes = {
    sm: { padding: '2px 6px', fontSize: 10 },
    md: { padding: '4px 8px', fontSize: 11 },
    lg: { padding: '6px 12px', fontSize: 12 }
  };
  
  const v = variants[variant];
  const sz = sizes[size];
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: sz.padding,
      fontSize: sz.fontSize,
      fontWeight: 600,
      borderRadius: DS.radius.sm,
      background: v.bg,
      color: v.color,
      border: `1px solid ${v.border}`
    }}>
      {children}
    </span>
  );
};

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
  ivd_inseriti: { label: 'IVD INSERITI', category: 'ivd', color: DS.colors.primaryLight, icon: Users, design: 'impact' },
  ivd_accettati: { label: 'IVD ACCETTATI', category: 'ivd', color: '#4CAF50', icon: CheckCircle, design: 'impact' },
  sdp_inseriti: { label: 'SDP INSERITI', category: 'sdp', color: DS.colors.primaryLight, icon: Briefcase, design: 'impact' },
  sdp_accettati: { label: 'SDP ACCETTATI', category: 'sdp', color: '#4CAF50', icon: CheckCircle, design: 'impact' },
  nw: { label: 'NETWORKER', category: 'manager', color: DS.colors.primaryLight, icon: Star, design: 'exclusive' },
  k: { label: 'K MANAGER', category: 'manager', color: DS.colors.accent, icon: Crown, design: 'exclusive' },
  eb: { label: 'ENERGY BROKER', category: 'broker', color: DS.colors.primaryLight, icon: Zap, design: 'exclusive' },
  frm: { label: 'FORMATORI', category: 'formatore', color: DS.colors.primaryLight, icon: Award, design: 'exclusive' },
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
  const getConfig = () => RANKING_CONFIG[selectedRanking] || { label: '', category: '', color: DS.colors.primaryLight, icon: BarChart3, design: 'impact' };
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
  const PIE_COLORS_K = [DS.colors.accent, DS.colors.primaryLight, '#2196F3', '#9C27B0', '#FF5722']; // K Manager - colori diversi!
  const PIE_COLORS_NW = ['#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1']; // Blu per Networker
  const PIE_COLORS_STATI = ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9']; // Verde per Stati
  const PIE_COLORS = [DS.colors.accent, DS.colors.primaryLight, '#2196F3', '#9C27B0', '#FF5722', '#E91E63', '#607D8B', '#795548', '#4CAF50', '#666666'];
  const STATO_COLORS = { 
    'Accettato': '#4CAF50', 'Sospeso': DS.colors.accent, 'In sospeso': DS.colors.accent, 'Presente': '#4CAF50', 'Assente': '#E53935', 
    'In lavorazione': DS.colors.accent, 'Installato': '#4CAF50', 'Impianto installato': '#4CAF50', 'Recesso': '#E53935', 
    'Annullato': '#E53935', 'In fornitura': '#4CAF50', 'Attivo': '#4CAF50', 'Cessato': '#E53935', 'Negativo': '#E53935',
    'Non perfezionato': '#E53935', 'Respinto': '#E53935', 'Da attivare': DS.colors.accent, 'Risoluzione': '#E53935'
  };
  
  // Colori heatmap - FREDDO = ROSSO
  const HEATMAP_COLORS = {
    hot: '#4CAF50',      // >70%  Verde
    warm: DS.colors.accent,     // 40-70% 🟡 Giallo
    cool: '#E53935',     // 10-40%  Rosso (era verde)
    cold: '#E53935',     // <10%  Rosso
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
    //  POSITIVO (contratti definitivamente chiusi/installati)
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
    //  NEGATIVO (persi)
    'Recesso': 'negativo', 
    'Rep.Fin – Negativo': 'negativo', 'Rep.Fin negativo': 'negativo', 'Rep.Fin - Negativo': 'negativo', 'Negativo': 'negativo',
    'Annullato': 'negativo', 
    'Rep.Amm – Non perfezionato': 'negativo', 'Rep.Amm non perfezionato': 'negativo', 'Rep.Amm - Non perfezionato': 'negativo', 'Non perfezionato': 'negativo',
    'No': 'negativo', 
    'Respinto': 'negativo'
  };
  
  const STATO_MAP_LA_SPA = {
    //  POSITIVO
    'Accettato': 'positivo',
    // 🟡 LAVORABILE
    'In sospeso': 'lavorabile', 'Sospeso': 'lavorabile', 'In Sospeso': 'lavorabile',
    //  MENO (negativi)
    'Risoluzione': 'meno', 'Non perfezionato': 'meno', 'Recesso': 'meno', 'Respinto': 'meno', 'Annullato': 'meno'
  };
  
  const STATO_MAP_LA_ENERGIA = {
    //  POSITIVO
    'Attivo': 'positivo', 'In fornitura': 'positivo', 'ATTIVO': 'positivo',
    // 🟡 LAVORABILE
    'Da attivare': 'lavorabile', 'In attivazione': 'lavorabile', 'DA ATTIVARE': 'lavorabile',
    //  MENO
    'Cessato': 'meno', 'Disdetta': 'meno', 'CESSATO': 'meno'
  };
  
  const STATO_MAP_IVD = {
    //  ATTIVO
    'Attivo': 'attivo', 'In regola': 'attivo', 'Operativo': 'attivo',
    // 🟡 LAVORABILE
    'In attesa': 'lavorabile', 'Da completare': 'lavorabile', 'In formazione': 'lavorabile',
    //  PERSO
    'Cessato': 'perso', 'Dimesso': 'perso', 'Annullato': 'perso', 'Recesso': 'perso'
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  //  LISTINI PREZZI E PUNTI FV - Per calcolo fatturato
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
    console.log(`📂 Caricamento ${type}: ${file.name}`);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log(`📄 ${type} - Testo letto: ${text.length} caratteri`);
      console.log(`📄 ${type} - Prime 200 char: ${text.substring(0, 200)}`);
      
      const data = parseCSV(text);
      console.log(`<BarChart3 size={16} /> ${type} - Righe parsate: ${data.length}`);
      if (data.length > 0) {
        console.log(`<BarChart3 size={16} /> ${type} - Colonne:`, Object.keys(data[0]));
        console.log(`<BarChart3 size={16} /> ${type} - Prima riga:`, data[0]);
      }
      
      // IVD: NON filtriamo più, teniamo tutti (nuovi + rinnovi) e calcoliamo statistiche separate
      setReportCSVs(prev => ({ ...prev, [type]: { name: file.name, rows: data.length, data: data } }));
      console.log(`<CheckCircle size={16} /> ${type} caricato con ${data.length} righe`);
    };
    reader.onerror = (e) => {
      console.error(`<XCircle size={16} /> Errore lettura ${type}:`, e);
    };
    reader.readAsText(file);
  };

  const generateReportData = () => {
    // DEBUG
    console.log('🔍 generateReportData chiamato');
    console.log('🔍 reportCSVs.consultings:', reportCSVs.consultings ? `${reportCSVs.consultings.data?.length} righe` : 'NULL');
    
    const result = {
      pilastri: {},
      heatmapMesi: {},
      selectedMonth: null,
      periodoRiferimento: null,
      bestPerformers: null
    };
    
    // ═══════════════════════════════════════════════════════════
    // <Calendar size={16} /> CALCOLO PERIODO DI RIFERIMENTO (dalle date nei CSV)
    // ═══════════════════════════════════════════════════════════
    const tutteLeDateStr = [];
    const estraiDate = (data, colonne) => {
      data.forEach(row => {
        colonne.forEach(col => {
          const val = row[col];
          if (val) tutteLeDateStr.push(val);
        });
      });
    };
    
    if (reportCSVs.fv?.data) estraiDate(reportCSVs.fv.data, ['Inserimento', 'Data', 'Data Inserimento']);
    if (reportCSVs.energy?.data) estraiDate(reportCSVs.energy.data, ['Inserimento', 'Data', 'Data Inserimento']);
    if (reportCSVs.ivd?.data) estraiDate(reportCSVs.ivd.data, ['Inserimento', 'Data', 'Data Attivazione', 'Data Inserimento']);
    if (reportCSVs.consultings?.data) estraiDate(reportCSVs.consultings.data, ['Data', 'Data Seminario', 'Inserimento']);
    
    // Parse date e trova min/max
    const dateValide = tutteLeDateStr
      .map(s => {
        if (!s) return null;
        const d = new Date(s.replace(' ', 'T'));
        return isNaN(d.getTime()) ? null : d;
      })
      .filter(d => d !== null);
    
    if (dateValide.length > 0) {
      const minDate = new Date(Math.min(...dateValide));
      const maxDate = new Date(Math.max(...dateValide));
      
      const mesiNomi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      const mesiShort = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
      
      const stessoMese = minDate.getMonth() === maxDate.getMonth() && minDate.getFullYear() === maxDate.getFullYear();
      const stessoAnno = minDate.getFullYear() === maxDate.getFullYear();
      
      let labelPeriodo = '';
      let tipoPeriodo = 'custom';
      
      if (stessoMese) {
        // Singolo mese
        labelPeriodo = `${mesiNomi[minDate.getMonth()]} ${minDate.getFullYear()}`;
        tipoPeriodo = 'mensile';
      } else if (stessoAnno) {
        // Stesso anno, più mesi
        const diffMesi = maxDate.getMonth() - minDate.getMonth() + 1;
        if (diffMesi === 3) {
          // Trimestre
          const trim = Math.floor(minDate.getMonth() / 3) + 1;
          labelPeriodo = `Q${trim} ${minDate.getFullYear()} (${mesiShort[minDate.getMonth()]}-${mesiShort[maxDate.getMonth()]})`;
          tipoPeriodo = 'trimestrale';
        } else if (diffMesi === 6) {
          labelPeriodo = `${minDate.getFullYear()} H${minDate.getMonth() < 6 ? '1' : '2'}`;
          tipoPeriodo = 'semestrale';
        } else if (diffMesi >= 11) {
          labelPeriodo = `Anno ${minDate.getFullYear()}`;
          tipoPeriodo = 'annuale';
        } else {
          labelPeriodo = `${mesiShort[minDate.getMonth()]} - ${mesiShort[maxDate.getMonth()]} ${minDate.getFullYear()}`;
        }
      } else {
        // Anni diversi
        labelPeriodo = `${mesiShort[minDate.getMonth()]} ${minDate.getFullYear()} - ${mesiShort[maxDate.getMonth()]} ${maxDate.getFullYear()}`;
        tipoPeriodo = 'multiannuale';
      }
      
      result.periodoRiferimento = {
        da: minDate,
        a: maxDate,
        label: labelPeriodo,
        tipo: tipoPeriodo,
        labelShort: stessoMese ? `${mesiShort[minDate.getMonth()]} ${minDate.getFullYear()}` : labelPeriodo
      };
    }
    
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
    // <Sun size={16} /> PILASTRO FOTOVOLTAICO
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
        icon: Sun,
        color: DS.colors.primaryLight,
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
        catLabels: { c1: ' Positivi', c2: '🟡 Lavoraz.', c3: ' Persi' },
        catKeys: ['positivo', 'lavorazione', 'negativo']
      };
      result.heatmapMesi.fv = heatmap;
    }
    
    // ═══════════════════════════════════════════════════════════
    // <Zap size={16} /> PILASTRO LUCE AMICA
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
        icon: Zap,
        color: DS.colors.accent,
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
        catLabels: { c1: ' Accettati', c2: '🟡 Lavorab.', c3: ' Persi' },
        catKeys: ['positivo', 'lavorabile', 'meno']
      };
      result.heatmapMesi.energy = heatmap;
    }
    
    // ═══════════════════════════════════════════════════════════
    // 🎓 PILASTRO COLLABORATORI (Seminari + Attivati)
    // ═══════════════════════════════════════════════════════════
    const collabData = { iscritti: 0, presenti: 0, attivati: 0, assenti: 0, omonimie: [], statiAttivati: null, classifiche: null };
    
    // Seminari: Iscritti e Presenti
    const semData = reportCSVs.consultings?.data;
    
    console.log('🎓 SEMINARI - semData:', semData ? semData.length + ' righe' : 'NULL');
    if (semData && semData.length > 0) {
      console.log('🎓 SEMINARI - Prima riga colonne:', Object.keys(semData[0]));
      console.log('🎓 SEMINARI - Prima riga Presente SI:', semData[0]['Presente SI']);
    }
    
    if (semData && semData.length > 0) {
      collabData.iscritti = semData.length;
      
      // PRESENTI: "Presente SI" = si (case insensitive)
      collabData.presenti = semData.filter(row => {
        const val = (row['Presente SI'] || row['Presente'] || '').toString().trim().toLowerCase();
        return val === 'si' || val === 'sì' || val === 'yes' || val === '1';
      }).length;
      
      // Assenti = Iscritti - Presenti
      collabData.assenti = collabData.iscritti - collabData.presenti;
      
      console.log('🎓 SEMINARI - Iscritti:', collabData.iscritti, 'Presenti:', collabData.presenti, 'Assenti:', collabData.assenti);
      
      // Rileva OMONIMIE
      const nomiVisti = {};
      semData.forEach(row => {
        const cognome = (row['Cognome'] || '').trim();
        const nome = (row['Nome'] || '').trim();
        const nomeCompleto = cognome && nome ? `${cognome} ${nome}`.toUpperCase() : '';
        if (nomeCompleto) {
          nomiVisti[nomeCompleto] = (nomiVisti[nomeCompleto] || 0) + 1;
        }
      });
      collabData.omonimie = Object.entries(nomiVisti).filter(([,c]) => c > 1).map(([nome, count]) => ({ nome, count }));
      
      // Classifiche
      const kStats = {}, nwStats = {}, sdpStats = {};
      semData.forEach(row => {
        const k = row['Nome Primo K'] || '';
        const nw = row['Nome Primo Networker'] || '';
        const sdp = row['Nome Primo SDP FV'] || row['Nome Primo SDP Fv'] || row['Nome Primo SDP LA'] || row['Nome Primo SDP La'] || '';
        const val = (row['Presente SI'] || row['Presente'] || '').toString().trim().toLowerCase();
        const isPresente = val === 'si' || val === 'sì' || val === 'yes' || val === '1';
        
        if (k && !k.includes('Nome Primo')) {
          if (!kStats[k]) kStats[k] = { iscritti: 0, presenti: 0, assenti: 0, attivati: 0, total: 0 };
          kStats[k].iscritti++;
          kStats[k].total++;
          if (isPresente) kStats[k].presenti++;
          else kStats[k].assenti++;
        }
        if (nw && !nw.includes('Nome Primo')) {
          if (!nwStats[nw]) nwStats[nw] = { iscritti: 0, presenti: 0, assenti: 0, attivati: 0, total: 0 };
          nwStats[nw].iscritti++;
          nwStats[nw].total++;
          if (isPresente) nwStats[nw].presenti++;
          else nwStats[nw].assenti++;
        }
        if (sdp && !sdp.includes('Nome Primo')) {
          if (!sdpStats[sdp]) sdpStats[sdp] = { iscritti: 0, presenti: 0, assenti: 0, attivati: 0, total: 0 };
          sdpStats[sdp].iscritti++;
          sdpStats[sdp].total++;
          if (isPresente) sdpStats[sdp].presenti++;
          else sdpStats[sdp].assenti++;
        }
      });
      
      const toSorted = (obj) => Object.entries(obj).sort((a, b) => b[1].total - a[1].total);
      collabData.classifiche = { k: toSorted(kStats), nw: toSorted(nwStats), sdp: toSorted(sdpStats) };
      
      result.heatmapMesi.consultings = calcHeatmapMesi(semData);
      
      // Heatmap solo per PRESENTI
      const presentiData = semData.filter(row => {
        const val = (row['Presente SI'] || row['Presente'] || '').toString().trim().toLowerCase();
        return val === 'si' || val === 'sì' || val === 'yes' || val === '1';
      });
      result.heatmapMesi.presenti = calcHeatmapMesi(presentiData);
    }
    
    // Attivati (IVD Contracts) - STATISTICHE COMPLETE
    if (reportCSVs.ivd?.data?.length > 0) {
      const ivdData = reportCSVs.ivd.data;
      
      // Statistiche prodotti
      const nuoviStartGo = ivdData.filter(r => (r['Prodotto'] || '').toLowerCase().includes('start')).length;
      const nuoviStandard = ivdData.filter(r => (r['Prodotto'] || '').toLowerCase().includes('attivazione') && !(r['Prodotto'] || '').toLowerCase().includes('start')).length;
      const rinnoviMensili = ivdData.filter(r => (r['Prodotto'] || '').toLowerCase().includes('rinnovo') && (r['Prodotto'] || '').toLowerCase().includes('12')).length;
      const rinnoviAnnuali = ivdData.filter(r => (r['Prodotto'] || '').toLowerCase().includes('rinnovo') && (r['Prodotto'] || '').toLowerCase().includes('annuale')).length;
      
      // Statistiche stato contratto
      const accettati = ivdData.filter(r => (r['Stato'] || '').toLowerCase().includes('accettato')).length;
      const recessi = ivdData.filter(r => (r['Stato'] || '').toLowerCase().includes('recesso')).length;
      const sospesi = ivdData.filter(r => (r['Stato'] || '').toLowerCase().includes('sospeso')).length;
      
      // Statistiche VipOffice
      const vipActive = ivdData.filter(r => (r['Stato Vipoffice IVD'] || '').toLowerCase() === 'active').length;
      const vipInactive = ivdData.filter(r => (r['Stato Vipoffice IVD'] || '').toLowerCase() === 'inactive').length;
      
      // Incroci importanti
      const accettatiMaInattivi = ivdData.filter(r => 
        (r['Stato'] || '').toLowerCase().includes('accettato') && 
        (r['Stato Vipoffice IVD'] || '').toLowerCase() === 'inactive'
      ).length;
      
      collabData.attivati = ivdData.length;
      collabData.ivdDettaglio = {
        totale: ivdData.length,
        nuovi: nuoviStartGo + nuoviStandard,
        nuoviStartGo,
        nuoviStandard,
        rinnovi: rinnoviMensili + rinnoviAnnuali,
        rinnoviMensili,
        rinnoviAnnuali,
        // Stati contratto
        accettati,
        recessi,
        sospesi,
        pctAccettati: ivdData.length > 0 ? Math.round(accettati / ivdData.length * 100) : 0,
        pctRecessi: ivdData.length > 0 ? Math.round(recessi / ivdData.length * 100) : 0,
        // VipOffice
        vipActive,
        vipInactive,
        pctVipActive: ivdData.length > 0 ? Math.round(vipActive / ivdData.length * 100) : 0,
        pctVipInactive: ivdData.length > 0 ? Math.round(vipInactive / ivdData.length * 100) : 0,
        // Alert
        accettatiMaInattivi,
        alertInattivi: accettatiMaInattivi > 0
      };
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
        color: DS.colors.primaryLight,
        funnel: {
          iscritti: collabData.iscritti,
          presenti: collabData.presenti,
          assenti: collabData.assenti,
          attivati: collabData.attivati,
          pctPresenti: collabData.iscritti > 0 ? Math.round(collabData.presenti / collabData.iscritti * 100) : 0,
          pctAssenti: collabData.iscritti > 0 ? Math.round(collabData.assenti / collabData.iscritti * 100) : 0,
          pctAttivati: collabData.presenti > 0 ? Math.round(collabData.attivati / collabData.presenti * 100) : 0
        },
        ivdDettaglio: collabData.ivdDettaglio || null,
        omonimie: collabData.omonimie || [],
        statiAttivati: collabData.statiAttivati,
        classifiche: collabData.classifiche || { k: [], nw: [], sdp: [] },
        totaleK: collabData.classifiche ? collabData.classifiche.k.reduce((s, [,v]) => s + v.total, 0) : 0,
        catLabels: { c1: '📝 Iscritti', c2: 'Presenti', c3: ' Attivati' },
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
    // <Target size={16} /> TRACKER COACHING - Performance nuovi attivati
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
        const codiceIvd = row['Codice IVD'] || '';
        const dataAttStr = row['Data Inserimento'] || '';
        const networker = row['Nome Primo Networker'] || ''; // Chi lo ha formato
        const prodotto = row['Prodotto'] || '';
        
        // Salta i rinnovi - conta solo nuove attivazioni
        if (prodotto.toLowerCase().includes('rinnovo')) return;
        
        if (nomeIvd && dataAttStr) {
          try {
            const dataAttivazione = new Date(dataAttStr.replace(' ', 'T'));
            if (isNaN(dataAttivazione.getTime())) return;
            
            // Filtro per anno - escludi IVD attivati prima del 2024
            if (dataAttivazione.getFullYear() < annoMinimo) return;
            
            const tracker = {
              nome: nomeIvd,
              codice: codiceIvd,
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
      
      // Conta contratti totali per ogni IVD e calcola giorni da attivazione
      const oggi = new Date();
      trackerCoaching.forEach(tracker => {
        // Conta LA totali e punti
        let puntiLA = 0;
        tracker.totaleLA = laData.filter(la => {
          const intermediario = la['Nome Intermediario'] || '';
          if (confrontaNomi(intermediario, tracker.nome)) {
            // Calcola punti LA (15 o 20)
            const prodotto = la['Prodotto'] || la['Offerta'] || '';
            puntiLA += prodotto.includes('20') ? 20 : 15;
            return true;
          }
          return false;
        }).length;
        tracker.puntiLA = puntiLA;
        
        // Conta FV totali e punti (stima 400 pt per contratto)
        let puntiFV = 0;
        tracker.totaleFV = fvData.filter(fv => {
          const intermediario = fv['Nome Intermediario'] || '';
          if (confrontaNomi(intermediario, tracker.nome)) {
            puntiFV += 400; // Media punti FV
            return true;
          }
          return false;
        }).length;
        tracker.puntiFV = puntiFV;
        
        // Punti totali produzione propria
        tracker.puntiTotali = puntiLA + puntiFV;
        
        // Percentuali LA/FV
        if (tracker.puntiTotali > 0) {
          tracker.pctLA = Math.round(puntiLA / tracker.puntiTotali * 100);
          tracker.pctFV = Math.round(puntiFV / tracker.puntiTotali * 100);
        } else {
          tracker.pctLA = 0;
          tracker.pctFV = 0;
        }
        
        // Conta Seminari invitati
        tracker.totaleSeminari = semData.filter(sem => {
          const intermediario = sem['Nome Intermediario'] || '';
          return confrontaNomi(intermediario, tracker.nome);
        }).length;
        
        // Conta IVD portati (chi ha come superiore questo IVD)
        tracker.totaleIVDPortati = ivdData.filter(ivd => {
          const superiore = ivd['Superiore di Struttura'] || '';
          const codiceIvd = ivd['Codice IVD'] || '';
          // Match per nome o codice
          return superiore.includes(tracker.nome.split(' ')[0]) || 
                 (tracker.codice && superiore.includes(tracker.codice));
        }).length;
        
        // Produttività totale (per ordinamento)
        tracker.produttivitaTotale = tracker.totaleLA + tracker.totaleFV + tracker.totaleSeminari + tracker.totaleIVDPortati;
        
        // Giorni da attivazione
        const dataAtt = new Date(tracker.dataAttivazione);
        tracker.giorniDaAttivazione = Math.floor((oggi - dataAtt) / (1000 * 60 * 60 * 24));
        
        // SCORE = Punti × Velocità (100 / media giorni primi contratti)
        const giorniValidi = [tracker.giorniLA, tracker.giorniFV, tracker.giorniIscritto, tracker.giorniAttivato].filter(g => g !== null && g >= 0);
        if (giorniValidi.length > 0 && tracker.puntiTotali > 0) {
          const mediaGiorni = giorniValidi.reduce((a, b) => a + b, 0) / giorniValidi.length;
          tracker.velocita = mediaGiorni > 0 ? Math.round(100 / mediaGiorni * 10) / 10 : 10; // Max velocità se 0 giorni
          tracker.score = Math.round(tracker.puntiTotali * tracker.velocita);
        } else if (tracker.puntiTotali > 0) {
          // Ha punti ma nessun primo contratto tracciato - usa velocità base
          tracker.velocita = 1;
          tracker.score = tracker.puntiTotali;
        } else {
          tracker.velocita = 0;
          tracker.score = 0;
        }
      });
      
      // ORDINAMENTO: per PUNTI TOTALI (chi ha prodotto di più in cima)
      // Lo Score rimane come indicatore bonus di velocità
      trackerCoaching.sort((a, b) => b.puntiTotali - a.puntiTotali);
      
      // Calcola medie
      const conLA = trackerCoaching.filter(t => t.giorniLA !== null);
      const conFV = trackerCoaching.filter(t => t.giorniFV !== null);
      const conIscr = trackerCoaching.filter(t => t.giorniIscritto !== null);
      const conAtt = trackerCoaching.filter(t => t.giorniAttivato !== null);
      
      // Calcola statistiche aggiuntive
      const ivdConContratti = trackerCoaching.filter(t => t.totaleLA > 0 || t.totaleFV > 0).length;
      const ivdInattivi = trackerCoaching.filter(t => t.totaleLA === 0 && t.totaleFV === 0).length;
      
      result.trackerCoaching = {
        lista: trackerCoaching, // TUTTI, non limitato a 50
        totale: trackerCoaching.length,
        ivdConContratti,
        ivdInattivi,
        pctInattivi: Math.round(ivdInattivi / trackerCoaching.length * 100) || 0,
        // Statistiche punti produzione propria
        puntiStats: {
          totale: trackerCoaching.reduce((s, t) => s + t.puntiTotali, 0),
          totaleLA: trackerCoaching.reduce((s, t) => s + t.puntiLA, 0),
          totaleFV: trackerCoaching.reduce((s, t) => s + t.puntiFV, 0),
          media: Math.round(trackerCoaching.reduce((s, t) => s + t.puntiTotali, 0) / trackerCoaching.length) || 0,
          mediaProduttivi: ivdConContratti > 0 ? Math.round(trackerCoaching.filter(t => t.puntiTotali > 0).reduce((s, t) => s + t.puntiTotali, 0) / ivdConContratti) : 0,
          contrattiLA: trackerCoaching.reduce((s, t) => s + t.totaleLA, 0),
          contrattiFV: trackerCoaching.reduce((s, t) => s + t.totaleFV, 0)
        },
        // Funnel produzione
        funnel: {
          totaleNuovi: trackerCoaching.length,
          vipActive: trackerCoaching.filter(t => t.vipOffice === 'active').length || Math.round(trackerCoaching.length * 0.8), // stima se non disponibile
          conProduzione: ivdConContratti,
          conLA: trackerCoaching.filter(t => t.totaleLA > 0).length,
          conFV: trackerCoaching.filter(t => t.totaleFV > 0).length,
          con1Iscritto: trackerCoaching.filter(t => t.totaleSeminari > 0).length,
          con1Attivato: trackerCoaching.filter(t => t.totaleIVDPortati > 0).length
        },
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
        },
        // TOP 3 per velocità
        top3VelocitaLA: conLA.sort((a, b) => a.giorniLA - b.giorniLA).slice(0, 3),
        top3VelocitaFV: conFV.sort((a, b) => a.giorniFV - b.giorniFV).slice(0, 3),
        // Fasce produttività
        fasceProduttivita: {
          zero: trackerCoaching.filter(t => t.produttivitaTotale === 0).length,
          bassa: trackerCoaching.filter(t => t.produttivitaTotale >= 1 && t.produttivitaTotale <= 5).length,
          media: trackerCoaching.filter(t => t.produttivitaTotale >= 6 && t.produttivitaTotale <= 20).length,
          alta: trackerCoaching.filter(t => t.produttivitaTotale >= 21 && t.produttivitaTotale <= 50).length,
          top: trackerCoaching.filter(t => t.produttivitaTotale > 50).length
        }
      };
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    //  ANALISI FATTURATO - Calcolo da listini (COERENTE CON PILASTRI!)
    // IMPORTANTE: I contratti DEVONO corrispondere ai numeri dei pilastri
    // ═══════════════════════════════════════════════════════════════════════════════
    const fatturato = {
      fv: { 
        // I numeri contratti DEVONO corrispondere a quelli del pilastro
        inseriti: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0, noMatch: 0 },
        effettivi: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 }, // Solo positivi (fatturato entrato)
        // NUOVO: Punti accettati = positivi + AAC in attesa sblocco (danno punti anche se non fatturato)
        accettatiPunti: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0, aacContratti: 0 },
        lavorazione: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 },
        persi: { totale: 0, punti: 0, kw: 0, kwh: 0, contratti: 0 },
        perK: {}, perNW: {},
        perMese: {} // Fatturato per mese
      },
      la: { 
        inseriti: { totale: 0, punti: 0, kwh: 0, contratti: 0 },
        // PUNTI: basati su Stato Contratto = Accettato (anche se poi cessa, pagano!)
        accettatiPunti: { totale: 0, punti: 0, kwh: 0, contratti: 0 },
        // FATTURATO: basati su Stato Fornitura = Attivo/In fornitura (effettivi ricorrenti)
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
    
    //  FATTURATO FV - TUTTI i contratti (stessa logica del pilastro!)
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
        
        // Verifica se è AAC in attesa sblocco (per punti accettati)
        const isAAC = stato.toLowerCase().includes('aac') && stato.toLowerCase().includes('attesa');
        
        // Breakdown per stato (DEVE corrispondere al pilastro!)
        if (cat === 'positivo') {
          fatturato.fv.effettivi.totale += match.prezzo;
          fatturato.fv.effettivi.punti += match.punti;
          fatturato.fv.effettivi.kw += match.kw;
          fatturato.fv.effettivi.kwh += match.kwh;
          fatturato.fv.effettivi.contratti++;
          
          // Anche i positivi contano per punti accettati
          fatturato.fv.accettatiPunti.totale += match.prezzo;
          fatturato.fv.accettatiPunti.punti += match.punti;
          fatturato.fv.accettatiPunti.kw += match.kw;
          fatturato.fv.accettatiPunti.kwh += match.kwh;
          fatturato.fv.accettatiPunti.contratti++;
          
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
          
          // AAC in attesa sblocco: NON è fatturato MA dà PUNTI accettati!
          if (isAAC) {
            fatturato.fv.accettatiPunti.totale += 0; // NON conta per fatturato
            fatturato.fv.accettatiPunti.punti += match.punti; // MA conta per punti!
            fatturato.fv.accettatiPunti.kw += match.kw;
            fatturato.fv.accettatiPunti.kwh += match.kwh;
            fatturato.fv.accettatiPunti.contratti++;
            fatturato.fv.accettatiPunti.aacContratti++; // Track quanti sono AAC
          }
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
        // PUNTI LA: Stato Contratto = Accettato (anche se poi cessa, PAGANO!)
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
        // FATTURATO LA: Stato Fornitura = Attivo/In fornitura (EFFETTIVI!)
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
    
    // <CheckCircle size={16} /> CHECK COERENZA - Verifica che i numeri battano con i pilastri
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
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // <BarChart3 size={16} /> HEATMAP PER GUADAGNO FV, GUADAGNO LA E PUNTI
    // ═══════════════════════════════════════════════════════════════════════════════
    const calcHeatmapFatturato = (data, tipo) => {
      const mesi = Array(12).fill(0);
      const giorniPerMese = {};
      const orariPerMese = {};
      const settimanePerMese = {};
      const anniTrovati = {};
      const mesiConDati = new Set();
      const valoriPerMese = Array(12).fill(0); // Fatturato o punti
      
      data.forEach(row => {
        const dateStr = row['Inserimento'] || row['Data'] || row['Data Inserimento'] || '';
        let valore = 0;
        
        if (tipo === 'guadagnoFV') {
          const prodotto = row['Prodotto'] || '';
          const match = matchProdottoFV(prodotto);
          valore = match ? match.prezzo : 0;
        } else if (tipo === 'guadagnoLA') {
          const prodotto = row['Prodotto'] || '';
          const fascia = getFasciaConsumoLA(prodotto);
          valore = fascia ? fascia.kwhMedi * fascia.prezzoKwh : 559;
        } else if (tipo === 'puntiFV') {
          const prodotto = row['Prodotto'] || '';
          const match = matchProdottoFV(prodotto);
          valore = match ? match.punti : 0;
        } else if (tipo === 'puntiLA') {
          const prodotto = row['Prodotto'] || '';
          valore = prodotto.toUpperCase().includes('20 IG') ? 20 : 15;
        }
        
        if (dateStr) {
          try {
            const d = new Date(dateStr.replace(' ', 'T'));
            if (!isNaN(d.getTime())) {
              const year = d.getFullYear();
              const month = d.getMonth();
              const day = d.getDate();
              const hour = d.getHours();
              const weekNum = Math.ceil(day / 7);
              
              mesi[month]++;
              valoriPerMese[month] += valore;
              mesiConDati.add(month);
              anniTrovati[year] = (anniTrovati[year] || 0) + 1;
              
              if (!giorniPerMese[month]) giorniPerMese[month] = Array(31).fill(0);
              if (day >= 1 && day <= 31) giorniPerMese[month][day - 1] += valore;
              
              if (!orariPerMese[month]) orariPerMese[month] = { notte: 0, mattinaPrima: 0, mattina: 0, pranzo: 0, pomeriggio: 0, sera: 0, notturno: 0 };
              if (hour < 6) orariPerMese[month].notte += valore;
              else if (hour < 9) orariPerMese[month].mattinaPrima += valore;
              else if (hour < 12) orariPerMese[month].mattina += valore;
              else if (hour < 15) orariPerMese[month].pranzo += valore;
              else if (hour < 18) orariPerMese[month].pomeriggio += valore;
              else if (hour < 21) orariPerMese[month].sera += valore;
              else orariPerMese[month].notturno += valore;
              
              if (!settimanePerMese[month]) settimanePerMese[month] = Array(5).fill(0);
              if (weekNum >= 1 && weekNum <= 5) settimanePerMese[month][weekNum - 1] += valore;
            }
          } catch (e) {}
        }
      });
      
      let annoPrincipale = new Date().getFullYear();
      let maxConteggio = 0;
      Object.entries(anniTrovati).forEach(([anno, conteggio]) => {
        if (conteggio > maxConteggio) { maxConteggio = conteggio; annoPrincipale = parseInt(anno); }
      });
      
      return { mesi: valoriPerMese, conteggi: mesi, giorniPerMese, orariPerMese, settimanePerMese, anno: annoPrincipale, mesiConDati: Array.from(mesiConDati).sort((a,b) => a-b) };
    };
    
    // Calcola heatmap per guadagni e punti (solo INSERITI)
    if (reportCSVs.fv?.data?.length > 0) {
      result.heatmapMesi.guadagnoFV = calcHeatmapFatturato(reportCSVs.fv.data, 'guadagnoFV');
      result.heatmapMesi.puntiFV = calcHeatmapFatturato(reportCSVs.fv.data, 'puntiFV');
    }
    if (reportCSVs.energy?.data?.length > 0) {
      result.heatmapMesi.guadagnoLA = calcHeatmapFatturato(reportCSVs.energy.data, 'guadagnoLA');
      result.heatmapMesi.puntiLA = calcHeatmapFatturato(reportCSVs.energy.data, 'puntiLA');
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // <Target size={16} /> RIEPILOGO GENERALE - KPI con termini italiani chiari
    // ═══════════════════════════════════════════════════════════════════════════════
    
    // Calcola incidenza nuovi IVD sul fatturato
    let incidenzaNuoviIVD = {
      contrattiLA: 0,
      contrattiFV: 0,
      fatturatoLA: 0,
      fatturatoFV: 0,
      puntiLA: 0,
      puntiFV: 0
    };
    
    if (result.trackerCoaching?.lista && reportCSVs.energy?.data && reportCSVs.fv?.data) {
      const nuoviIVDNomi = result.trackerCoaching.lista.map(t => t.nome.toLowerCase().trim());
      
      // Conta contratti LA dei nuovi IVD
      reportCSVs.energy.data.forEach(row => {
        const intermediario = (row['Nome Intermediario'] || '').toLowerCase().trim();
        if (nuoviIVDNomi.some(nome => intermediario.includes(nome) || nome.includes(intermediario))) {
          incidenzaNuoviIVD.contrattiLA++;
          const fascia = getFasciaConsumoLA(row['Prodotto'] || '');
          incidenzaNuoviIVD.fatturatoLA += fascia ? fascia.kwhMedi * fascia.prezzoKwh : 559;
          incidenzaNuoviIVD.puntiLA += fascia ? fascia.punti : 15;
        }
      });
      
      // Conta contratti FV dei nuovi IVD
      reportCSVs.fv.data.forEach(row => {
        const intermediario = (row['Nome Intermediario'] || '').toLowerCase().trim();
        if (nuoviIVDNomi.some(nome => intermediario.includes(nome) || nome.includes(intermediario))) {
          incidenzaNuoviIVD.contrattiFV++;
          const match = matchProdottoFV(row['Prodotto'] || '');
          if (match) {
            incidenzaNuoviIVD.fatturatoFV += match.prezzo;
            incidenzaNuoviIVD.puntiFV += match.punti;
          }
        }
      });
    }
    
    // Calcola percentuali prodotto
    const totFatturato = (fatturato.fv.inseriti.totale || 0) + (fatturato.la.inseriti.totale || 0);
    const totPunti = (fatturato.fv.inseriti.punti || 0) + (fatturato.la.inseriti.punti || 0);
    const totContratti = (result.pilastri.fv?.totale || 0) + (result.pilastri.energy?.totale || 0);
    
    result.executiveSummary = {
      // FATTURATO per prodotto
      fv: {
        fatturato: fatturato.fv.inseriti.totale || 0,
        fatturatoEffettivo: fatturato.fv.effettivi.totale || 0,
        contratti: result.pilastri.fv?.totale || 0,
        punti: fatturato.fv.inseriti.punti || 0,
        puntiEffettivi: fatturato.fv.effettivi.punti || 0,
        pctFatturato: totFatturato > 0 ? Math.round((fatturato.fv.inseriti.totale || 0) / totFatturato * 100) : 0,
        pctPunti: totPunti > 0 ? Math.round((fatturato.fv.inseriti.punti || 0) / totPunti * 100) : 0,
        pctContratti: totContratti > 0 ? Math.round((result.pilastri.fv?.totale || 0) / totContratti * 100) : 0,
        positivi: result.pilastri.fv?.funnel?.positivi || 0,
        lavorazione: result.pilastri.fv?.funnel?.lavorazione || 0,
        persi: result.pilastri.fv?.funnel?.negativi || 0,
        fatturatoPerso: fatturato.fv.persi.totale || 0,
        conversionePct: result.pilastri.fv?.funnel?.pctPositivi || 0
      },
      la: {
        fatturato: fatturato.la.inseriti.totale || 0,
        fatturatoEffettivo: fatturato.la.attiviEffettivi.totale || 0,
        contratti: result.pilastri.energy?.totale || 0,
        punti: fatturato.la.inseriti.punti || 0,
        puntiEffettivi: fatturato.la.accettatiPunti.punti || 0,
        pctFatturato: totFatturato > 0 ? Math.round((fatturato.la.inseriti.totale || 0) / totFatturato * 100) : 0,
        pctPunti: totPunti > 0 ? Math.round((fatturato.la.inseriti.punti || 0) / totPunti * 100) : 0,
        pctContratti: totContratti > 0 ? Math.round((result.pilastri.energy?.totale || 0) / totContratti * 100) : 0,
        accettati: result.pilastri.energy?.funnel?.accettati || 0,
        inFornitura: result.pilastri.energy?.funnel?.inFornitura || 0,
        cessati: (result.pilastri.energy?.funnel?.accettati || 0) - (result.pilastri.energy?.funnel?.inFornitura || 0),
        conversionePct: result.pilastri.energy?.funnel?.pctAccettati || 0
      },
      
      // TOTALI
      totale: {
        fatturato: totFatturato,
        fatturatoEffettivo: (fatturato.fv.effettivi.totale || 0) + (fatturato.la.attiviEffettivi.totale || 0),
        contratti: totContratti,
        punti: totPunti,
        puntiEffettivi: (fatturato.fv.effettivi.punti || 0) + (fatturato.la.accettatiPunti.punti || 0)
      },
      
      // SEMINARI
      seminari: {
        iscritti: result.pilastri.collaboratori?.funnel?.iscritti || 0,
        presenti: result.pilastri.collaboratori?.funnel?.presenti || 0,
        assenti: result.pilastri.collaboratori?.funnel?.assenti || 0,
        pctPresenti: result.pilastri.collaboratori?.funnel?.pctPresenti || 0,
        pctAssenti: result.pilastri.collaboratori?.funnel?.pctAssenti || 0
      },
      
      // NUOVI IVD (281)
      nuoviIVD: {
        totale: result.trackerCoaching?.totale || 0,
        conContratti: result.trackerCoaching?.ivdConContratti || 0,
        inattivi: result.trackerCoaching?.ivdInattivi || 0,
        pctInattivi: result.trackerCoaching?.pctInattivi || 0,
        pctAttivi: 100 - (result.trackerCoaching?.pctInattivi || 0),
        // Incidenza sul fatturato
        contrattiLA: incidenzaNuoviIVD.contrattiLA,
        contrattiFV: incidenzaNuoviIVD.contrattiFV,
        contrattiTotali: incidenzaNuoviIVD.contrattiLA + incidenzaNuoviIVD.contrattiFV,
        fatturatoLA: incidenzaNuoviIVD.fatturatoLA,
        fatturatoFV: incidenzaNuoviIVD.fatturatoFV,
        fatturatoTotale: incidenzaNuoviIVD.fatturatoLA + incidenzaNuoviIVD.fatturatoFV,
        puntiLA: incidenzaNuoviIVD.puntiLA,
        puntiFV: incidenzaNuoviIVD.puntiFV,
        puntiTotali: incidenzaNuoviIVD.puntiLA + incidenzaNuoviIVD.puntiFV,
        // Percentuali incidenza
        pctContrattiSuTotale: totContratti > 0 ? Math.round((incidenzaNuoviIVD.contrattiLA + incidenzaNuoviIVD.contrattiFV) / totContratti * 100) : 0,
        pctFatturatoSuTotale: totFatturato > 0 ? Math.round((incidenzaNuoviIVD.fatturatoLA + incidenzaNuoviIVD.fatturatoFV) / totFatturato * 100) : 0,
        pctPuntiSuTotale: totPunti > 0 ? Math.round((incidenzaNuoviIVD.puntiLA + incidenzaNuoviIVD.puntiFV) / totPunti * 100) : 0
      },
      
      // ALERT (con termini italiani)
      alert: {
        fvPersi: result.pilastri.fv?.funnel?.negativi || 0,
        fvFatturatoPerso: fatturato.fv.persi.totale || 0,
        laCessati: (result.pilastri.energy?.funnel?.accettati || 0) - (result.pilastri.energy?.funnel?.inFornitura || 0),
        laPctCessati: result.pilastri.energy?.funnel?.accettati > 0 ? 
          Math.round(((result.pilastri.energy.funnel.accettati - result.pilastri.energy.funnel.inFornitura) / result.pilastri.energy.funnel.accettati) * 100) : 0,
        seminariAssenti: result.pilastri.collaboratori?.funnel?.assenti || 0,
        seminariPctAssenti: result.pilastri.collaboratori?.funnel?.pctAssenti || 0,
        ivdInattivi: result.trackerCoaching?.ivdInattivi || 0,
        ivdPctInattivi: result.trackerCoaching?.pctInattivi || 0
      },
      
      // Semafori (verde/giallo/rosso)
      semafori: {
        fv: (result.pilastri.fv?.funnel?.pctPositivi || 0) >= 60 ? 'verde' : (result.pilastri.fv?.funnel?.pctPositivi || 0) >= 40 ? 'giallo' : 'rosso',
        la: (result.pilastri.energy?.funnel?.pctAccettati || 0) >= 85 ? 'verde' : (result.pilastri.energy?.funnel?.pctAccettati || 0) >= 70 ? 'giallo' : 'rosso',
        seminari: (result.pilastri.collaboratori?.funnel?.pctAssenti || 0) <= 25 ? 'verde' : 
          (result.pilastri.collaboratori?.funnel?.pctAssenti || 0) <= 35 ? 'giallo' : 'rosso',
        ivd: (result.trackerCoaching?.pctInattivi || 0) <= 15 ? 'verde' : (result.trackerCoaching?.pctInattivi || 0) <= 25 ? 'giallo' : 'rosso'
      }
    };
    
    // ═══════════════════════════════════════════════════════════
    // <Trophy size={16} /> CALCOLO BEST PERFORMERS (K e NW per ogni categoria)
    // ═══════════════════════════════════════════════════════════
    result.bestPerformers = {
      // <Sun size={16} /> FOTOVOLTAICO
      fv: {
        fatturato: {
          k: fatturato.fv.classificaK[0] ? { nome: fatturato.fv.classificaK[0][0], valore: fatturato.fv.classificaK[0][1].fatturato, dettaglio: `${fatturato.fv.classificaK[0][1].kw}kW | ${fatturato.fv.classificaK[0][1].punti}pt` } : null,
          nw: fatturato.fv.classificaNW[0] ? { nome: fatturato.fv.classificaNW[0][0], valore: fatturato.fv.classificaNW[0][1].fatturato, dettaglio: `${fatturato.fv.classificaNW[0][1].kw}kW | ${fatturato.fv.classificaNW[0][1].punti}pt` } : null
        },
        positivi: {
          k: result.pilastri.fv?.classifiche?.k[0] ? { nome: result.pilastri.fv.classifiche.k[0][0], valore: result.pilastri.fv.classifiche.k[0][1].positivo, dettaglio: `su ${result.pilastri.fv.classifiche.k[0][1].total} ins` } : null,
          nw: result.pilastri.fv?.classifiche?.nw[0] ? { nome: result.pilastri.fv.classifiche.nw[0][0], valore: result.pilastri.fv.classifiche.nw[0][1].positivo, dettaglio: `su ${result.pilastri.fv.classifiche.nw[0][1].total} ins` } : null
        },
        conversione: (() => {
          // Calcola % conversione per ogni K/NW
          const kConv = (result.pilastri.fv?.classifiche?.k || []).map(([nome, stats]) => ({
            nome, pct: stats.total > 0 ? Math.round(stats.positivo / stats.total * 100) : 0, totale: stats.total
          })).filter(x => x.totale >= 5).sort((a, b) => b.pct - a.pct);
          const nwConv = (result.pilastri.fv?.classifiche?.nw || []).map(([nome, stats]) => ({
            nome, pct: stats.total > 0 ? Math.round(stats.positivo / stats.total * 100) : 0, totale: stats.total
          })).filter(x => x.totale >= 3).sort((a, b) => b.pct - a.pct);
          return {
            k: kConv[0] ? { nome: kConv[0].nome, valore: kConv[0].pct, dettaglio: `su ${kConv[0].totale} ins` } : null,
            nw: nwConv[0] ? { nome: nwConv[0].nome, valore: nwConv[0].pct, dettaglio: `su ${nwConv[0].totale} ins` } : null
          };
        })()
      },
      
      // <Zap size={16} /> LUCE AMICA
      la: {
        fatturato: {
          k: fatturato.la.classificaK[0] ? { nome: fatturato.la.classificaK[0][0], valore: Math.round(fatturato.la.classificaK[0][1].fatturato / 12), dettaglio: `${fatturato.la.classificaK[0][1].contratti} contr | ${Math.round(fatturato.la.classificaK[0][1].kwh / 1000)}MWh` } : null,
          nw: fatturato.la.classificaNW[0] ? { nome: fatturato.la.classificaNW[0][0], valore: Math.round(fatturato.la.classificaNW[0][1].fatturato / 12), dettaglio: `${fatturato.la.classificaNW[0][1].punti}pt | ${Math.round(fatturato.la.classificaNW[0][1].kwh / 1000)}MWh` } : null
        },
        accettati: {
          k: result.pilastri.energy?.classifiche?.k[0] ? { nome: result.pilastri.energy.classifiche.k[0][0], valore: result.pilastri.energy.classifiche.k[0][1].positivo, dettaglio: `su ${result.pilastri.energy.classifiche.k[0][1].total} ins` } : null,
          nw: result.pilastri.energy?.classifiche?.nw[0] ? { nome: result.pilastri.energy.classifiche.nw[0][0], valore: result.pilastri.energy.classifiche.nw[0][1].positivo, dettaglio: `su ${result.pilastri.energy.classifiche.nw[0][1].total} ins` } : null
        },
        kwhGreen: {
          k: fatturato.la.classificaK[0] ? { nome: fatturato.la.classificaK[0][0], valore: fatturato.la.classificaK[0][1].kwh, dettaglio: `${fatturato.la.classificaK[0][1].contratti} contratti` } : null,
          nw: fatturato.la.classificaNW[0] ? { nome: fatturato.la.classificaNW[0][0], valore: fatturato.la.classificaNW[0][1].kwh, dettaglio: `${fatturato.la.classificaNW[0][1].punti}pt` } : null
        }
      },
      
      // 🎓 SEMINARI
      seminari: {
        iscritti: {
          k: result.pilastri.collaboratori?.classifiche?.k[0] ? { nome: result.pilastri.collaboratori.classifiche.k[0][0], valore: result.pilastri.collaboratori.classifiche.k[0][1].iscritti, dettaglio: `${result.pilastri.collaboratori.classifiche.k[0][1].presenti} presenti` } : null,
          nw: result.pilastri.collaboratori?.classifiche?.nw[0] ? { nome: result.pilastri.collaboratori.classifiche.nw[0][0], valore: result.pilastri.collaboratori.classifiche.nw[0][1].iscritti, dettaglio: `${result.pilastri.collaboratori.classifiche.nw[0][1].presenti} presenti` } : null
        },
        presenti: (() => {
          const kByPres = [...(result.pilastri.collaboratori?.classifiche?.k || [])].sort((a, b) => b[1].presenti - a[1].presenti);
          const nwByPres = [...(result.pilastri.collaboratori?.classifiche?.nw || [])].sort((a, b) => b[1].presenti - a[1].presenti);
          return {
            k: kByPres[0] ? { nome: kByPres[0][0], valore: kByPres[0][1].presenti, dettaglio: `su ${kByPres[0][1].iscritti} iscr (${kByPres[0][1].iscritti > 0 ? Math.round(kByPres[0][1].presenti / kByPres[0][1].iscritti * 100) : 0}%)` } : null,
            nw: nwByPres[0] ? { nome: nwByPres[0][0], valore: nwByPres[0][1].presenti, dettaglio: `su ${nwByPres[0][1].iscritti} iscr` } : null
          };
        })(),
        attivati: (() => {
          const kByAtt = [...(result.pilastri.collaboratori?.classifiche?.k || [])].sort((a, b) => b[1].attivati - a[1].attivati);
          const nwByAtt = [...(result.pilastri.collaboratori?.classifiche?.nw || [])].sort((a, b) => b[1].attivati - a[1].attivati);
          return {
            k: kByAtt[0] && kByAtt[0][1].attivati > 0 ? { nome: kByAtt[0][0], valore: kByAtt[0][1].attivati, dettaglio: `da ${kByAtt[0][1].presenti} presenti` } : null,
            nw: nwByAtt[0] && nwByAtt[0][1].attivati > 0 ? { nome: nwByAtt[0][0], valore: nwByAtt[0][1].attivati, dettaglio: `da ${nwByAtt[0][1].presenti} presenti` } : null
          };
        })()
      },
      
      // <Target size={16} /> TRACKER VELOCITÀ (basato su medie)
      tracker: {
        primaLA: (() => {
          if (!result.trackerCoaching?.lista) return { k: null, nw: null };
          // Raggruppa per K e calcola media giorni
          const perK = {}, perNW = {};
          result.trackerCoaching.lista.forEach(ivd => {
            if (ivd.giorniLA !== null) {
              const k = ivd.networker?.split(' ')[0] || 'N/A'; // Approssimazione
              // Per ora usiamo il networker come proxy
              if (ivd.networker) {
                if (!perNW[ivd.networker]) perNW[ivd.networker] = { somma: 0, count: 0 };
                perNW[ivd.networker].somma += ivd.giorniLA;
                perNW[ivd.networker].count++;
              }
            }
          });
          const nwSorted = Object.entries(perNW).map(([nome, d]) => ({ nome, media: Math.round(d.somma / d.count), count: d.count })).filter(x => x.count >= 2).sort((a, b) => a.media - b.media);
          return {
            k: null, // Richiede mapping K→IVD
            nw: nwSorted[0] ? { nome: nwSorted[0].nome, valore: nwSorted[0].media, dettaglio: `${nwSorted[0].count} IVD formati` } : null
          };
        })(),
        primaFV: (() => {
          if (!result.trackerCoaching?.lista) return { k: null, nw: null };
          const perNW = {};
          result.trackerCoaching.lista.forEach(ivd => {
            if (ivd.giorniFV !== null && ivd.networker) {
              if (!perNW[ivd.networker]) perNW[ivd.networker] = { somma: 0, count: 0 };
              perNW[ivd.networker].somma += ivd.giorniFV;
              perNW[ivd.networker].count++;
            }
          });
          const nwSorted = Object.entries(perNW).map(([nome, d]) => ({ nome, media: Math.round(d.somma / d.count), count: d.count })).filter(x => x.count >= 2).sort((a, b) => a.media - b.media);
          return { k: null, nw: nwSorted[0] ? { nome: nwSorted[0].nome, valore: nwSorted[0].media, dettaglio: `${nwSorted[0].count} IVD` } : null };
        })()
      }
    };
    
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
    ctx.fillStyle = DS.colors.primaryLight;
    ctx.font = 'bold 48px Arial';
    ctx.fillText('DASHBOARD', 50, 70);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(`${config.icon && <config.icon size={16} color={config.color} />} ${config.label} - ${eventDate}`, 50, 110);
    
    // Stats cards
    const cardW = 400, cardH = 120, cardY = 150;
    const cardData = [
      { label: labels.c1, value: stats.ins, color: DS.colors.primaryLight },
      { label: labels.c2, value: stats.acc, color: '#4CAF50' },
      { label: 'Partecipanti', value: stats.part, color: DS.colors.primaryLight },
      { label: 'Conversione', value: stats.conv + '%', color: DS.colors.accent }
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
    ctx.fillStyle = DS.colors.accent;
    ctx.font = 'bold 28px Arial';
    ctx.fillText('PODIO', 80, podioY + 40);
    
    // Disegna podio semplificato
    const podioData = stats.top3;
    const barColors = [DS.colors.accent, '#C0C0C0', '#CD7F32'];
    const barHeights = [160, 120, 80];
    const barX = [280, 130, 430];
    podioData.forEach((p, i) => {
      const bx = barX[i], bh = barHeights[i], by = podioY + podioH - bh - 30;
      ctx.fillStyle = barColors[i];
      ctx.beginPath();
      ctx.roundRect(bx, by, 140, bh, [15, 15, 0, 0]);
      ctx.fill();
      ctx.fillStyle = DS.colors.white;
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
    ctx.fillStyle = DS.colors.primaryLight;
    ctx.font = 'bold 28px Arial';
    ctx.fillText('<TrendingUp size={16} /> TEMPERATURA CONTRATTI', heatX + 30, heatY + 40);
    
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
                      intensity > 0.4 ? DS.colors.accent : DS.colors.primaryLight;
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
    ctx.fillStyle = DS.colors.accent;
    ctx.beginPath(); ctx.roundRect(heatX + 900, legY, 20, 20, 4); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('Medio', heatX + 930, legY + 15);
    ctx.fillStyle = DS.colors.primaryLight;
    ctx.beginPath(); ctx.roundRect(heatX + 1010, legY, 20, 20, 4); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('Basso', heatX + 1040, legY + 15);
    
    // TOP 4-10
    const topY = 640;
    ctx.fillStyle = '#FAFAFA';
    ctx.beginPath();
    ctx.roundRect(50, topY, 900, 320, 20);
    ctx.fill();
    ctx.fillStyle = DS.colors.primaryLight;
    ctx.font = 'bold 28px Arial';
    ctx.fillText('<TrendingUp size={16} /> TOP 4° - 10°', 80, topY + 40);
    
    stats.top10.slice(3, 10).forEach((p, i) => {
      const ry = topY + 70 + i * 35;
      const barW = (p.v1 / stats.maxV1) * 600;
      ctx.fillStyle = 'rgba(124,77,255,0.3)';
      ctx.beginPath();
      ctx.roundRect(150, ry, barW, 28, 6);
      ctx.fill();
      ctx.fillStyle = DS.colors.accent;
      ctx.font = 'bold 18px Arial';
      ctx.fillText(`${i + 4}°`, 90, ry + 20);
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(p.name, 160, ry + 20);
      ctx.fillStyle = DS.colors.primaryLight;
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
    ctx.fillStyle = DS.colors.accent;
    ctx.font = 'bold 20px Arial';
    ctx.fillText('K MANAGER', pieX + 30, pieY + 40);
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
    ctx.fillStyle = DS.colors.primaryLight;
    ctx.font = 'bold 20px Arial';
    ctx.fillText('NETWORKER TOP 5', pieX + 400, pieY + 40);
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
    ctx.fillText(`Leader Ranking v16.5 • Generato il ${new Date().toLocaleDateString('it-IT')}`, W/2, H - 25);
    
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

  // === SCREENSHOT SEZIONI REPORT (usa html2canvas dinamico) ===
  const screenshotSection = async (sectionId, filename) => {
    try {
      // Carica html2canvas dinamicamente
      if (!window.html2canvas) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      const element = document.getElementById(sectionId);
      if (!element) {
        alert(`Sezione ${sectionId} non trovata`);
        return;
      }
      
      // Mostra loading
      const originalBg = element.style.background;
      element.style.background = DS.colors.white;
      
      const canvas = await window.html2canvas(element, {
        scale: 2, // Alta risoluzione
        useCORS: true,
        backgroundColor: DS.colors.white,
        logging: false
      });
      
      element.style.background = originalBg;
      
      // Download
      const link = document.createElement('a');
      link.download = `${filename}_${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error('Screenshot error:', err);
      alert('Errore nella generazione dello screenshot');
    }
  };
  
  // Screenshot tutte le sezioni come ZIP
  const screenshotAllSections = async () => {
    try {
      // Carica JSZip e html2canvas dinamicamente
      if (!window.JSZip) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      if (!window.html2canvas) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      const zip = new window.JSZip();
      const sections = [
        { id: 'section-riepilogo', name: '01_Riepilogo_Generale' },
        { id: 'section-best', name: '02_Best_Performers' },
        { id: 'section-conversioni', name: '03_Analisi_Conversioni' },
        { id: 'section-calendario', name: '04_Calendario_Attivita' },
        { id: 'section-fv', name: '05_Pilastro_FV' },
        { id: 'section-la', name: '06_Pilastro_LA' },
        { id: 'section-collab', name: '07_Pilastro_Collaboratori' },
        { id: 'section-tracker', name: '08_Tracker_Coaching' },
        { id: 'section-fatturato', name: '09_Analisi_Fatturato' },
        { id: 'section-alert', name: '10_Alert_Da_Attivare' }
      ];
      
      // Mostra loading
      const loadingDiv = document.createElement('div');
      loadingDiv.innerHTML = '<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999"><div style="background:white;padding:40px;border-radius:16px;text-align:center"><div style="font-size:48px;margin-bottom:16px"><Camera size={16} /></div><div style="font-size:18px;font-weight:600" id="screenshot-progress">Generazione screenshot...</div></div></div>';
      document.body.appendChild(loadingDiv);
      
      let count = 0;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          document.getElementById('screenshot-progress').textContent = `Screenshot ${++count}/${sections.length}: ${section.name}`;
          const canvas = await window.html2canvas(element, { scale: 2, useCORS: true, backgroundColor: DS.colors.white, logging: false });
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
          zip.file(`${section.name}.png`, blob);
        }
      }
      
      // Genera e scarica ZIP
      document.getElementById('screenshot-progress').textContent = 'Creazione ZIP...';
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `Report_Screenshot_${new Date().toISOString().slice(0,10)}.zip`;
      link.click();
      
      document.body.removeChild(loadingDiv);
    } catch (err) {
      console.error('Screenshot all error:', err);
      alert('Errore nella generazione degli screenshot');
    }
  };

  // Genera PNG per slide (16:9) - VERSIONE WOW
  const generateSlidePNG = (mode = 'full') => {
    const stats = getDashboardStats();
    if (!stats.top3.length) return null;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1920, H = 1080;
    canvas.width = W; canvas.height = H;
    
    // Sfondo verde teal
    ctx.fillStyle = DS.colors.primaryLight;
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
    starPositions.forEach(s => drawStar(s.x, s.y, 4, s.size, s.size * 0.4, DS.colors.accent, 0.5));

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
        { x: centerX - barW - gap, data: stats.top3[1], medal: '2°', pos: 2, colors: ['#F5F5F5', '#C0C0C0', '#909090'], sideColor: '#707070' },
        { x: centerX, data: stats.top3[0], medal: '1°', pos: 1, colors: ['#FFFDE7', DS.colors.accent, DS.colors.primaryDark], sideColor: '#CC9900' },
        { x: centerX + barW + gap, data: stats.top3[2], medal: '3°', pos: 3, colors: ['#E8F5F1', '#CD7F32', '#8B4513'], sideColor: '#6B3A0A' }
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
        ctx.fillStyle = DS.colors.white;
        ctx.font = `bold ${p.pos === 1 ? 120 : 90}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(p.data.v1.toString(), p.x, podioBaseY - 30);
        
        // Nome su due righe - ALZATI
        const nameParts = p.data.name.toUpperCase().split(' ');
        const cognome = nameParts[0] || '';
        const nome = nameParts.slice(1).join(' ') || '';
        
        ctx.fillStyle = DS.colors.white;
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
        drawStar(sx, sy, 4, 12 + Math.random() * 10, 5, DS.colors.accent, 0.4 + Math.random() * 0.4);
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
        const medalBorder = m.pos === 1 ? DS.colors.accent : m.pos === 2 ? '#A0A0A0' : '#CD7F32';
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
        { x: centerX - barW - gap, data: stats.top3[1], medal: '2°', pos: 2, colors: ['#F5F5F5', '#C0C0C0', '#909090'], sideColor: '#707070' },
        { x: centerX, data: stats.top3[0], medal: '1°', pos: 1, colors: ['#FFFDE7', DS.colors.accent, DS.colors.primaryDark], sideColor: '#CC9900' },
        { x: centerX + barW + gap, data: stats.top3[2], medal: '3°', pos: 3, colors: ['#E8F5F1', '#CD7F32', '#8B4513'], sideColor: '#6B3A0A' }
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
        ctx.fillStyle = DS.colors.white;
        ctx.font = `bold ${p.pos === 1 ? 100 : 75}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(p.data.v1.toString(), p.x, podioBaseY - 25);
        
        // Nome su due righe - ALZATI
        const nameParts = p.data.name.toUpperCase().split(' ');
        const cognome = nameParts[0] || '';
        const nome = nameParts.slice(1).join(' ') || '';
        
        ctx.fillStyle = DS.colors.white;
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
        drawStar(sx, sy, 4, 11 + Math.random() * 8, 4, DS.colors.accent, 0.4 + Math.random() * 0.35);
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
        const medalBorder = m.pos === 1 ? DS.colors.accent : m.pos === 2 ? '#A0A0A0' : '#CD7F32';
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
      
      ctx.fillStyle = DS.colors.white;
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('CLASSIFICA', listX, listStartY - 25);
      
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
        ctx.fillStyle = DS.colors.accent;
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${pos}°`, listX + 18, y + 45);
        
        // Nome
        ctx.fillStyle = DS.colors.white;
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
    ctx.fillText(`<Download size={16} /> ${stats.ins} Inseriti   •   <CheckCircle size={16} /> ${stats.acc} Accettati   •   <TrendingUp size={16} /> ${stats.conv}% Conversione   •   <Users size={16} /> ${stats.part} Partecipanti`, W / 2, H - 28);
    
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
    
    // Background - ELEGANTE con sfumatura verde corporate
    const bg = ctx.createLinearGradient(0, 0, 0, H); 
    bg.addColorStop(0, DS.colors.white); 
    bg.addColorStop(0.3, 'rgba(42,170,138,0.03)'); 
    bg.addColorStop(0.7, 'rgba(42,170,138,0.05)'); 
    bg.addColorStop(1, DS.colors.white);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `${config.color}60`; ctx.lineWidth = 3; ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.fillStyle = config.color; ctx.fillRect(35, 35, W - 70, 4);
    
    // Header
    ctx.fillStyle = config.color; ctx.font = 'bold 16px Arial'; ctx.fillText('LEADER RANKING', 45, 65);
    ctx.fillStyle = '#333333'; ctx.font = 'bold 42px Arial'; ctx.fillText(`${config.icon && <config.icon size={16} color={config.color} />} CLASSIFICA ${config.label}`, 45, 115);
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
      const medal = position === 1 ? '1°' : position === 2 ? '2°' : position === 3 ? '3°' : null;
      
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
    ctx.fillText(`<BarChart3 size={16} /> ${data.length} partecipanti • ${totIns} contratti`, 50, footerY + 28);
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
    
    // Background - ELEGANTE con sfumatura verde corporate (come NW)
    const bg = ctx.createLinearGradient(0, 0, 0, H); 
    bg.addColorStop(0, DS.colors.white); 
    bg.addColorStop(0.3, 'rgba(42,170,138,0.03)'); 
    bg.addColorStop(0.7, 'rgba(42,170,138,0.05)'); 
    bg.addColorStop(1, DS.colors.white);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = `${config.color}60`; ctx.lineWidth = 3; ctx.strokeRect(18, 18, W - 36, H - 36);
    ctx.strokeStyle = `${config.color}30`; ctx.lineWidth = 1; ctx.strokeRect(28, 28, W - 56, H - 56);
    
    // Header bar
    const hg = ctx.createLinearGradient(0, 0, W, 0); hg.addColorStop(0, 'transparent'); hg.addColorStop(0.15, config.color); hg.addColorStop(0.85, config.color); hg.addColorStop(1, 'transparent');
    ctx.fillStyle = hg; ctx.fillRect(45, 45, W - 90, 4);
    
    // Title - NERO
    ctx.fillStyle = '#333333'; ctx.font = 'bold 40px Arial'; ctx.textAlign = 'center';
    ctx.fillText(`${config.icon && <config.icon size={16} color={config.color} />} CLASSIFICA ${config.label} ${config.icon && <config.icon size={16} color={config.color} />}`, W/2, 105);
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
      
      const centerY = y + cardH / 2, medals = ['1°', '2°', '3°'];
      
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
      const barC = pctM >= 50 ? '#4CAF50' : pctM >= 20 ? '#FF8F00' : DS.colors.primaryLight;
      ctx.fillStyle = barC; ctx.beginPath(); ctx.roundRect(barX, centerY - 10, Math.max(barW * pctM / 100, 1), 18, 5); ctx.fill();
      ctx.fillStyle = DS.colors.white; ctx.font = 'bold 12px Arial'; ctx.textAlign = 'center';
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
    ctx.fillText(`<BarChart3 size={16} /> ${data.length} ${config.label} • ${totIns} contratti`, 60, footerY + 28);
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
      alert('🚫 Ehi campione! Questo bottone è riservato ai Supremi Amministratori.\n\nSe vuoi l\'automazione anche per te, contatta il Genio Creatore Andrea Tiesi 🧞‍♂️\n\nNel frattempo... scarica l\'immagine e postala tu, che fa bene ai muscoli delle dita! ');
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
      setSendStatus('<XCircle size={16} /> Upload fallito');
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
      
      setSendStatus('Inviato!');
      setTimeout(() => setSendStatus(''), 3000);
    } catch (e) { 
      console.log('Errore webhook:', e);
      setSendStatus('<XCircle size={16} /> Errore'); 
      setTimeout(() => setSendStatus(''), 3000); 
    }
  };


  // ═══════════════════════════════════════════════════════════════════════════
  // <Camera size={16} /> DOWNLOAD REPORT PNG - Semplice e funzionante
  // ═══════════════════════════════════════════════════════════════════════════
  
  const downloadReportPNG = () => {
    if (!reportData || !reportData.pilastri) {
      alert('Genera prima il report caricando i CSV');
      return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const W = 1200, H = 1400;
    canvas.width = W;
    canvas.height = H;
    
    const periodo = reportData.periodoRiferimento?.label || 'Report';
    
    // Background bianco
    ctx.fillStyle = DS.colors.white;
    ctx.fillRect(0, 0, W, H);
    
    // Bordo verde
    ctx.strokeStyle = DS.colors.primaryLight;
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, W - 20, H - 20);
    
    // Header verde
    ctx.fillStyle = DS.colors.primaryLight;
    ctx.fillRect(30, 30, W - 60, 100);
    
    ctx.fillStyle = DS.colors.white;
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('LEADER RANKING', W/2, 85);
    ctx.font = '20px Arial';
    ctx.fillText(periodo, W/2, 115);
    
    let y = 170;
    
    // === FOTOVOLTAICO ===
    if (reportData.pilastri.fv) {
      const fv = reportData.pilastri.fv;
      ctx.fillStyle = '#F0FDF4';
      ctx.fillRect(50, y, W - 100, 120);
      ctx.strokeStyle = '#22C55E';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, y, W - 100, 120);
      
      ctx.fillStyle = DS.colors.fv;
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('FOTOVOLTAICO', 70, y + 35);
      
      ctx.font = 'bold 48px Arial';
      ctx.fillText(fv.funnel.positivi.toString(), 70, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Positivi', 70, y + 110);
      
      ctx.fillStyle = DS.colors.fv;
      ctx.font = 'bold 48px Arial';
      ctx.fillText(fv.funnel.pctPositivi + '%', 250, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Conversione', 250, y + 110);
      
      if (reportData.fatturato?.fv) {
        ctx.fillStyle = DS.colors.fv;
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('€' + (reportData.fatturato.fv.effettivi.totale/1000000).toFixed(2) + 'M', W - 70, y + 70);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Fatturato Effettivo', W - 70, y + 95);
      }
      
      y += 140;
    }
    
    // === LUCE AMICA ===
    if (reportData.pilastri.energy) {
      const la = reportData.pilastri.energy;
      ctx.fillStyle = '#FFFBEB';
      ctx.fillRect(50, y, W - 100, 120);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, y, W - 100, 120);
      
      ctx.fillStyle = DS.colors.la;
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('LUCE AMICA', 70, y + 35);
      
      ctx.font = 'bold 48px Arial';
      ctx.fillText(la.funnel.accettati.toString(), 70, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Accettati', 70, y + 110);
      
      ctx.fillStyle = DS.colors.la;
      ctx.font = 'bold 48px Arial';
      ctx.fillText(la.funnel.pctAccettati + '%', 250, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Accettazione', 250, y + 110);
      
      if (reportData.fatturato?.la?.accettati) {
        ctx.fillStyle = DS.colors.la;
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('€' + Math.round((reportData.fatturato.la.accettati.totale || 0)/12).toLocaleString('it-IT') + '/m', W - 70, y + 70);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Fatturato Mensile', W - 70, y + 95);
      }
      
      y += 140;
    }
    
    // === SEMINARI ===
    if (reportData.pilastri.collaboratori) {
      const sem = reportData.pilastri.collaboratori;
      ctx.fillStyle = '#F5F3FF';
      ctx.fillRect(50, y, W - 100, 120);
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, y, W - 100, 120);
      
      ctx.fillStyle = DS.colors.seminari;
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('🎓 SEMINARI', 70, y + 35);
      
      ctx.font = 'bold 48px Arial';
      ctx.fillText(sem.funnel.iscritti.toString(), 70, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Iscritti', 70, y + 110);
      
      ctx.fillStyle = DS.colors.seminari;
      ctx.font = 'bold 48px Arial';
      ctx.fillText(sem.funnel.presenti.toString(), 220, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Presenti', 220, y + 110);
      
      ctx.fillStyle = DS.colors.seminari;
      ctx.font = 'bold 48px Arial';
      ctx.fillText(sem.funnel.pctPresenti + '%', 370, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Presenza', 370, y + 110);
      
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(sem.funnel.attivati.toString(), W - 70, y + 70);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Attivati', W - 70, y + 95);
      
      y += 140;
    }
    
    // === NUOVI IVD ===
    if (reportData.trackerCoaching) {
      const tc = reportData.trackerCoaching;
      ctx.fillStyle = '#F0FDFA';
      ctx.fillRect(50, y, W - 100, 120);
      ctx.strokeStyle = DS.colors.primaryLight;
      ctx.lineWidth = 3;
      ctx.strokeRect(50, y, W - 100, 120);
      
      ctx.fillStyle = '#0D9488';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('NUOVI IVD', 70, y + 35);
      
      ctx.font = 'bold 48px Arial';
      ctx.fillText(tc.totale.toString(), 70, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Totali', 70, y + 110);
      
      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 48px Arial';
      ctx.fillText(tc.ivdConContratti.toString(), 220, y + 90);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Produttivi', 220, y + 110);
      
      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(tc.pctInattivi + '%', W - 70, y + 70);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Inattivi', W - 70, y + 95);
      
      y += 140;
    }
    
    // === TOTALI ===
    y += 20;
    ctx.fillStyle = DS.colors.primaryLight;
    ctx.fillRect(50, y, W - 100, 150);
    
    ctx.fillStyle = DS.colors.white;
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TOTALI EFFETTIVI', W/2, y + 30);
    
    const totFatt = reportData.fatturato?.totale?.fatturato || 0;
    const totPunti = reportData.fatturato?.totale?.punti || 0;
    
    ctx.font = 'bold 56px Arial';
    ctx.fillText('€' + (totFatt/1000000).toFixed(2) + 'M', W/3, y + 95);
    ctx.font = '16px Arial';
    ctx.fillText('Fatturato', W/3, y + 120);
    
    ctx.font = 'bold 56px Arial';
    ctx.fillText(totPunti.toLocaleString('it-IT'), W*2/3, y + 95);
    ctx.font = '16px Arial';
    ctx.fillText('Punti', W*2/3, y + 120);
    
    // Footer
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Leader Ranking • ' + new Date().toLocaleDateString('it-IT'), W/2, H - 30);
    
    // Download
    const link = document.createElement('a');
    link.download = 'LeaderRanking_' + periodo.replace(/[^a-zA-Z0-9]/g, '_') + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // <FileSpreadsheet size={16} /> DOWNLOAD POWERPOINT - Presentazione professionale
  // ═══════════════════════════════════════════════════════════════════════════
  
  const downloadPowerPoint = async () => {
    if (!reportData || !reportData.pilastri) {
      alert('Genera prima il report caricando i CSV');
      return;
    }
    
    // Mostra loading
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = '<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999"><div style="background:white;padding:40px;border-radius:16px;text-align:center"><div style="font-size:48px;margin-bottom:16px"><FileSpreadsheet size={16} /></div><div style="font-size:18px;font-weight:600">Generazione PowerPoint...</div></div></div>';
    document.body.appendChild(loadingDiv);
    
    try {
      // Carica libreria pptxgenjs
      if (typeof PptxGenJS === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';
      pptx.title = 'Leader Ranking Report';
      pptx.author = 'Leader Ranking';
      
      const periodo = reportData.periodoRiferimento?.label || 'Report';
      
      // SLIDE 1: COPERTINA
      let slide = pptx.addSlide();
      slide.background = { color: '1F2937' };
      slide.addText('LEADER RANKING', { x: 0.5, y: 2.0, w: 9, h: 0.8, fontSize: 48, bold: true, color: '2AAA8A', align: 'center' });
      slide.addText('Report Performance', { x: 0.5, y: 2.7, w: 9, h: 0.5, fontSize: 24, color: 'FFFFFF', align: 'center' });
      slide.addText(periodo, { x: 0.5, y: 3.4, w: 9, h: 0.4, fontSize: 20, color: 'F59E0B', align: 'center' });
      slide.addText(new Date().toLocaleDateString('it-IT'), { x: 0.5, y: 4.8, w: 9, h: 0.3, fontSize: 14, color: '9CA3AF', align: 'center' });
      
      // SLIDE 2: RIEPILOGO
      slide = pptx.addSlide();
      slide.background = { color: 'F8FAFC' };
      slide.addText('Riepilogo Generale', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, bold: true, color: '1F2937' });
      slide.addText(periodo, { x: 0.5, y: 0.85, w: 9, h: 0.3, fontSize: 14, color: '6B7280' });
      
      // Card FV
      if (reportData.pilastri.fv) {
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.4, w: 2.9, h: 1.6, fill: { color: 'F0FDF4' }, line: { color: '22C55E', pt: 2 } });
        slide.addText('Fotovoltaico', { x: 0.5, y: 1.5, w: 2.7, h: 0.3, fontSize: 14, bold: true, color: '15803D' });
        slide.addText(reportData.pilastri.fv.funnel.positivi + ' Positivi', { x: 0.5, y: 1.9, w: 2.7, h: 0.4, fontSize: 24, bold: true, color: '15803D' });
        slide.addText(reportData.pilastri.fv.funnel.pctPositivi + '% conversione', { x: 0.5, y: 2.4, w: 2.7, h: 0.3, fontSize: 12, color: '6B7280' });
        if (reportData.fatturato?.fv) {
          slide.addText('€' + (reportData.fatturato.fv.effettivi.totale/1000000).toFixed(2) + 'M', { x: 0.5, y: 2.7, w: 2.7, h: 0.3, fontSize: 16, bold: true, color: '15803D' });
        }
      }
      
      // Card LA  
      if (reportData.pilastri.energy) {
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 3.5, y: 1.4, w: 2.9, h: 1.6, fill: { color: 'FFFBEB' }, line: { color: 'F59E0B', pt: 2 } });
        slide.addText('Luce Amica', { x: 3.6, y: 1.5, w: 2.7, h: 0.3, fontSize: 14, bold: true, color: 'B45309' });
        slide.addText(reportData.pilastri.energy.funnel.accettati + ' Accettati', { x: 3.6, y: 1.9, w: 2.7, h: 0.4, fontSize: 24, bold: true, color: 'B45309' });
        slide.addText(reportData.pilastri.energy.funnel.pctAccettati + '% accettazione', { x: 3.6, y: 2.4, w: 2.7, h: 0.3, fontSize: 12, color: '6B7280' });
        if (reportData.fatturato?.la?.accettati) {
          slide.addText('€' + Math.round((reportData.fatturato.la.accettati.totale || 0)/12).toLocaleString('it-IT') + '/mese', { x: 3.6, y: 2.7, w: 2.7, h: 0.3, fontSize: 16, bold: true, color: 'B45309' });
        }
      }
      
      // Card Totale
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.6, y: 1.4, w: 2.9, h: 1.6, fill: { color: '2AAA8A' } });
      slide.addText('Totale Effettivo', { x: 6.7, y: 1.5, w: 2.7, h: 0.3, fontSize: 14, bold: true, color: 'FFFFFF' });
      slide.addText('€' + ((reportData.fatturato?.totale?.fatturato || 0)/1000000).toFixed(2) + 'M', { x: 6.7, y: 1.9, w: 2.7, h: 0.4, fontSize: 24, bold: true, color: 'FFFFFF' });
      slide.addText((reportData.fatturato?.totale?.punti || 0).toLocaleString('it-IT') + ' punti', { x: 6.7, y: 2.4, w: 2.7, h: 0.3, fontSize: 14, color: 'D1FAE5' });
      
      // Seminari e IVD
      if (reportData.pilastri.collaboratori) {
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.2, w: 4.5, h: 1.4, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', pt: 1 } });
        slide.addText('Seminari', { x: 0.5, y: 3.3, w: 4.3, h: 0.3, fontSize: 14, bold: true, color: '7C3AED' });
        slide.addText(reportData.pilastri.collaboratori.funnel.iscritti + ' iscritti - ' + reportData.pilastri.collaboratori.funnel.presenti + ' presenti - ' + reportData.pilastri.collaboratori.funnel.attivati + ' attivati', { x: 0.5, y: 3.7, w: 4.3, h: 0.3, fontSize: 16, color: '1F2937' });
        slide.addText('Presenza: ' + reportData.pilastri.collaboratori.funnel.pctPresenti + '% | Conversione: ' + reportData.pilastri.collaboratori.funnel.pctAttivati + '%', { x: 0.5, y: 4.1, w: 4.3, h: 0.3, fontSize: 12, color: '6B7280' });
      }
      
      if (reportData.trackerCoaching) {
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 3.2, w: 4.5, h: 1.4, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', pt: 1 } });
        slide.addText('Nuovi IVD', { x: 5.2, y: 3.3, w: 4.3, h: 0.3, fontSize: 14, bold: true, color: '2AAA8A' });
        slide.addText(reportData.trackerCoaching.totale + ' totali - ' + reportData.trackerCoaching.ivdConContratti + ' produttivi', { x: 5.2, y: 3.7, w: 4.3, h: 0.3, fontSize: 16, color: '1F2937' });
        slide.addText('Inattivi: ' + reportData.trackerCoaching.ivdInattivi + ' (' + reportData.trackerCoaching.pctInattivi + '%)', { x: 5.2, y: 4.1, w: 4.3, h: 0.3, fontSize: 12, color: 'EF4444' });
      }
      
      // SLIDE 3: FOTOVOLTAICO
      if (reportData.pilastri.fv) {
        slide = pptx.addSlide();
        slide.background = { color: 'F0FDF4' };
        slide.addText('Fotovoltaico', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, bold: true, color: '15803D' });
        slide.addText(periodo, { x: 0.5, y: 0.85, w: 9, h: 0.3, fontSize: 14, color: '6B7280' });
        
        const fv = reportData.pilastri.fv;
        const funnelItems = [
          { label: 'Inseriti', value: fv.funnel.inseriti, color: '6B7280' },
          { label: 'Positivi', value: fv.funnel.positivi, color: '15803D' },
          { label: 'Lavorazione', value: fv.funnel.lavorazione, color: 'F59E0B' },
          { label: 'Persi', value: fv.funnel.negativi, color: 'EF4444' }
        ];
        
        funnelItems.forEach((item, i) => {
          slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4 + i * 2.4, y: 1.4, w: 2.2, h: 1.3, fill: { color: 'FFFFFF' }, line: { color: item.color, pt: 2 } });
          slide.addText(item.value.toString(), { x: 0.4 + i * 2.4, y: 1.6, w: 2.2, h: 0.6, fontSize: 36, bold: true, color: item.color, align: 'center' });
          slide.addText(item.label, { x: 0.4 + i * 2.4, y: 2.3, w: 2.2, h: 0.3, fontSize: 12, color: '6B7280', align: 'center' });
        });
        
        if (fv.classifiche?.k?.length > 0) {
          slide.addText('Top 5 K Manager', { x: 0.5, y: 3.0, w: 4, h: 0.4, fontSize: 16, bold: true, color: '15803D' });
          fv.classifiche.k.slice(0, 5).forEach((item, i) => {
            const nome = item[0];
            const stats = item[1];
            slide.addText((i + 1) + '. ' + nome, { x: 0.5, y: 3.4 + i * 0.35, w: 2.5, h: 0.3, fontSize: 12, color: '1F2937' });
            slide.addText((stats.positivo || 0) + ' pos', { x: 3, y: 3.4 + i * 0.35, w: 1, h: 0.3, fontSize: 12, color: '15803D', align: 'right' });
          });
        }
      }
      
      // SLIDE 4: LUCE AMICA
      if (reportData.pilastri.energy) {
        slide = pptx.addSlide();
        slide.background = { color: 'FFFBEB' };
        slide.addText('Luce Amica', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 32, bold: true, color: 'B45309' });
        slide.addText(periodo, { x: 0.5, y: 0.85, w: 9, h: 0.3, fontSize: 14, color: '6B7280' });
        
        const la = reportData.pilastri.energy;
        const funnelItems = [
          { label: 'Inseriti', value: la.funnel.inseriti, color: '6B7280' },
          { label: 'Accettati', value: la.funnel.accettati, color: '15803D' },
          { label: 'Lavorabili', value: la.funnel.lavorabili, color: 'F59E0B' },
          { label: 'Cessati', value: la.funnel.persi, color: 'EF4444' }
        ];
        
        funnelItems.forEach((item, i) => {
          slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4 + i * 2.4, y: 1.4, w: 2.2, h: 1.3, fill: { color: 'FFFFFF' }, line: { color: item.color, pt: 2 } });
          slide.addText(item.value.toString(), { x: 0.4 + i * 2.4, y: 1.6, w: 2.2, h: 0.6, fontSize: 36, bold: true, color: item.color, align: 'center' });
          slide.addText(item.label, { x: 0.4 + i * 2.4, y: 2.3, w: 2.2, h: 0.3, fontSize: 12, color: '6B7280', align: 'center' });
        });
        
        if (reportData.fatturato?.la?.accettati) {
          slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.0, w: 9.2, h: 1.2, fill: { color: 'B45309' } });
          slide.addText('Fatturato Generato', { x: 0.5, y: 3.1, w: 9, h: 0.3, fontSize: 14, bold: true, color: 'FFFFFF' });
          const totLA = reportData.fatturato.la.accettati.totale || 0;
          slide.addText('€' + Math.round(totLA).toLocaleString('it-IT') + '/anno | €' + Math.round(totLA/12).toLocaleString('it-IT') + '/mese', { x: 0.5, y: 3.5, w: 9, h: 0.4, fontSize: 18, color: 'FFFFFF' });
        }
      }
      
      // SLIDE FINALE
      slide = pptx.addSlide();
      slide.background = { color: '1F2937' };
      slide.addText('Grazie!', { x: 0.5, y: 2.2, w: 9, h: 0.8, fontSize: 56, bold: true, color: 'FFFFFF', align: 'center' });
      slide.addText('Leader Ranking', { x: 0.5, y: 3.1, w: 9, h: 0.4, fontSize: 20, color: '2AAA8A', align: 'center' });
      slide.addText(new Date().toLocaleDateString('it-IT'), { x: 0.5, y: 4.5, w: 9, h: 0.3, fontSize: 14, color: '9CA3AF', align: 'center' });
      
      // Salva
      await pptx.writeFile({ fileName: 'LeaderRanking_' + periodo.replace(/[^a-zA-Z0-9]/g, '_') + '.pptx' });
      
      // Rimuovi loading
      document.body.removeChild(loadingDiv);
      
    } catch (err) {
      document.body.removeChild(loadingDiv);
      console.error('Errore PowerPoint:', err);
      alert('Errore generazione PowerPoint: ' + err.message);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // <BarChart3 size={16} /> RIEPILOGO GENERALE - Design coerente con dashboard
  // ═══════════════════════════════════════════════════════════════════════════════
  const ExecutiveSummaryComponent = ({ data, periodo }) => {
    if (!data) return null;
    
    const getSemaforoColor = (semaforo) => {
      if (semaforo === 'verde') return '#10B981';
      if (semaforo === 'giallo') return '#F59E0B';
      if (semaforo === 'rosso') return '#EF4444';
      return '#9CA3AF';
    };

    return (
      <div id="section-riepilogo" style={{ 
        background: DS.colors.white, 
        borderRadius: 20, 
        padding: 24,
        marginBottom: 20,
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header con PERIODO */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: '1px solid #F3F4F6'
        }}>
          <div>
            <h2 style={{ color: DS.colors.gray800, fontSize: 20, margin: 0, fontWeight: 700 }}>
              <BarChart3 size={16} /> Riepilogo Generale
            </h2>
            <p style={{ color: DS.colors.gray500, fontSize: 12, margin: '4px 0 0' }}>
              {periodo ? `<Calendar size={16} /> Periodo: ${periodo.label}` : 'Panoramica completa risultati periodo'}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => screenshotSection('section-riepilogo', 'Riepilogo_Generale')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}><Camera size={16} /></button>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'FV', value: data.semafori?.fv },
              { label: 'LA', value: data.semafori?.la },
              { label: 'SEM', value: data.semafori?.seminari },
              { label: 'IVD', value: data.semafori?.ivd }
            ].map((item, i) => (
              <div key={i} style={{ 
                textAlign: 'center',
                padding: '6px 12px',
                background: `${getSemaforoColor(item.value)}15`,
                borderRadius: 8,
                border: `1px solid ${getSemaforoColor(item.value)}30`
              }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  background: getSemaforoColor(item.value),
                  margin: '0 auto 4px'
                }} />
                <div style={{ fontSize: 10, color: DS.colors.gray500, fontWeight: 500 }}>{item.label}</div>
              </div>
            ))}
          </div>
          </div>
        </div>
        
        {/* Cards FV / LA / Totale */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
          {/* FV */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            border: '1px solid #BBF7D0',
            borderRadius: 16,
            padding: 20
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 14, color: DS.colors.fv, fontWeight: 700 }}><Sun size={16} /> Fotovoltaico</div>
              <div style={{ 
                fontSize: 10, 
                background: DS.colors.fv, 
                color: DS.colors.white, 
                padding: '2px 8px', 
                borderRadius: 10 
              }}>{data.fv?.pctFatturato || 0}% fatt.</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#166534', marginBottom: 4 }}>
              €{((data.fv?.fatturato || 0) / 1000000).toFixed(2)}M
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>Contratti</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: DS.colors.gray800 }}>{data.fv?.contratti || 0}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>Punti</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: DS.colors.gray800 }}>{(data.fv?.punti || 0).toLocaleString('it-IT')}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #BBF7D0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: DS.colors.fv }}>✓ Positivi: {data.fv?.positivi || 0}</span>
                <span style={{ color: DS.colors.danger }}>✗ Persi: {data.fv?.persi || 0}</span>
              </div>
              <div style={{ fontSize: 11, color: DS.colors.gray500, marginTop: 4 }}>
                Conversione: <strong style={{ color: DS.colors.fv }}>{data.fv?.conversionePct || 0}%</strong>
              </div>
            </div>
          </div>
          
          {/* LA */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1px solid #FCD34D',
            borderRadius: 16,
            padding: 20
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 14, color: DS.colors.la, fontWeight: 700 }}><Zap size={16} /> Luce Amica</div>
              <div style={{ 
                fontSize: 10, 
                background: DS.colors.la, 
                color: DS.colors.white, 
                padding: '2px 8px', 
                borderRadius: 10 
              }}>{data.la?.pctFatturato || 0}% fatt.</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#92400E', marginBottom: 4 }}>
              €{((data.la?.fatturato || 0) / 1000000).toFixed(2)}M
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>Contratti</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: DS.colors.gray800 }}>{data.la?.contratti || 0}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>Punti</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: DS.colors.gray800 }}>{(data.la?.punti || 0).toLocaleString('it-IT')}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #FCD34D' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: DS.colors.fv }}>✓ Accettati: {data.la?.accettati || 0}</span>
                <span style={{ color: DS.colors.danger }}>✗ Cessati: {data.la?.cessati || 0}</span>
              </div>
              <div style={{ fontSize: 11, color: DS.colors.gray500, marginTop: 4 }}>
                Accettazione: <strong style={{ color: DS.colors.la }}>{data.la?.conversionePct || 0}%</strong>
              </div>
            </div>
          </div>
          
          {/* TOTALE */}
          <div style={{
            background: 'linear-gradient(135deg, #2AAA8A 0%, #20917A 100%)',
            borderRadius: 16,
            padding: 20,
            color: DS.colors.white
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, opacity: 0.9 }}><BarChart3 size={16} /> Totale</div>
            <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>
              €{((data.totale?.fatturato || 0) / 1000000).toFixed(2)}M
            </div>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 12 }}>
              Effettivo: €{((data.totale?.fatturatoEffettivo || 0) / 1000000).toFixed(2)}M
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 10, opacity: 0.8 }}>Contratti</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{data.totale?.contratti || 0}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 10, opacity: 0.8 }}>Punti</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{(data.totale?.punti || 0).toLocaleString('it-IT')}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Riga info: Seminari + Nuovi IVD + Alert */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {/* Seminari */}
          <div style={{ background: DS.colors.gray50, borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DS.colors.gray500, marginBottom: 10 }}>🎓 Seminari</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>Iscritti</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: DS.colors.gray800 }}>{data.seminari?.iscritti || 0}</div>
              </div>
              <div style={{ fontSize: 20, color: '#D1D5DB' }}>→</div>
              <div>
                <div style={{ fontSize: 10, color: '#10B981' }}>Presenti</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10B981' }}>{data.seminari?.presenti || 0}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#EF4444' }}>Assenti</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#EF4444' }}>{data.seminari?.assenti || 0}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: DS.colors.gray500, marginTop: 8 }}>
              Tasso presenza: <strong>{data.seminari?.pctPresenti || 0}%</strong>
            </div>
          </div>
          
          {/* Nuovi IVD */}
          <div style={{ background: DS.colors.gray50, borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DS.colors.gray500, marginBottom: 10 }}><Users size={16} /> Nuovi IVD Attivati</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>Totale</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: DS.colors.gray800 }}>{data.nuoviIVD?.totale || 0}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#10B981' }}>Attivi</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10B981' }}>{data.nuoviIVD?.conContratti || 0}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#EF4444' }}>Inattivi</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#EF4444' }}>{data.nuoviIVD?.inattivi || 0}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: DS.colors.gray500, marginTop: 8 }}>
              Hanno prodotto: <strong>{data.nuoviIVD?.pctAttivi || 0}%</strong>
            </div>
          </div>
          
          {/* Incidenza Nuovi IVD */}
          <div style={{ background: DS.colors.gray50, borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DS.colors.gray500, marginBottom: 10 }}><TrendingUp size={16} /> Incidenza Nuovi IVD</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>Contratti</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#3B82F6' }}>{data.nuoviIVD?.contrattiTotali || 0}</div>
                <div style={{ fontSize: 9, color: DS.colors.gray500 }}>{data.nuoviIVD?.pctContrattiSuTotale || 0}%</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>Fatturato</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#10B981' }}>€{((data.nuoviIVD?.fatturatoTotale || 0) / 1000).toFixed(0)}K</div>
                <div style={{ fontSize: 9, color: DS.colors.gray500 }}>{data.nuoviIVD?.pctFatturatoSuTotale || 0}%</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>Punti</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F59E0B' }}>{(data.nuoviIVD?.puntiTotali || 0).toLocaleString('it-IT')}</div>
                <div style={{ fontSize: 9, color: DS.colors.gray500 }}>{data.nuoviIVD?.pctPuntiSuTotale || 0}%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alert Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 12, 
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid #F3F4F6'
        }}>
          <div style={{
            background: (data.fv?.conversionePct || 0) >= 50 ? '#F0FDF4' : '#FEF2F2',
            border: `1px solid ${(data.fv?.conversionePct || 0) >= 50 ? '#BBF7D0' : '#FECACA'}`,
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span style={{ fontSize: 18 }}>{(data.fv?.conversionePct || 0) >= 50 ? <CheckCircle size={18} color="#4CAF50" /> : <AlertTriangle size={18} color="#F59E0B" />}</span>
            <div>
              <div style={{ fontSize: 10, color: DS.colors.gray500 }}>FV Persi</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DS.colors.gray800 }}>
                {data.alert?.fvPersi || 0} (-€{((data.alert?.fvFatturatoPerso || 0) / 1000).toFixed(0)}K)
              </div>
            </div>
          </div>
          
          <div style={{
            background: (data.alert?.laPctCessati || 0) <= 15 ? '#F0FDF4' : '#FEF2F2',
            border: `1px solid ${(data.alert?.laPctCessati || 0) <= 15 ? '#BBF7D0' : '#FECACA'}`,
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span style={{ fontSize: 18 }}>{(data.alert?.laPctCessati || 0) <= 15 ? <CheckCircle size={18} color="#4CAF50" /> : <AlertTriangle size={18} color="#F59E0B" />}</span>
            <div>
              <div style={{ fontSize: 10, color: DS.colors.gray500 }}>LA Cessati</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DS.colors.gray800 }}>
                {data.alert?.laCessati || 0} ({data.alert?.laPctCessati || 0}%)
              </div>
            </div>
          </div>
          
          <div style={{
            background: (data.alert?.seminariPctAssenti || 0) <= 30 ? '#F0FDF4' : '#FFFBEB',
            border: `1px solid ${(data.alert?.seminariPctAssenti || 0) <= 30 ? '#BBF7D0' : '#FCD34D'}`,
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span style={{ fontSize: 18 }}>{(data.alert?.seminariPctAssenti || 0) <= 30 ? <CheckCircle size={18} color="#4CAF50" /> : <AlertTriangle size={18} color="#F59E0B" />}</span>
            <div>
              <div style={{ fontSize: 10, color: DS.colors.gray500 }}>Assenti Seminari</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DS.colors.gray800 }}>
                {data.alert?.seminariAssenti || 0} ({data.alert?.seminariPctAssenti || 0}%)
              </div>
            </div>
          </div>
          
          <div style={{
            background: (data.alert?.ivdPctInattivi || 0) <= 20 ? '#F0FDF4' : '#FEF2F2',
            border: `1px solid ${(data.alert?.ivdPctInattivi || 0) <= 20 ? '#BBF7D0' : '#FECACA'}`,
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span style={{ fontSize: 18 }}>{(data.alert?.ivdPctInattivi || 0) <= 20 ? <CheckCircle size={18} color="#4CAF50" /> : <AlertTriangle size={18} color="#F59E0B" />}</span>
            <div>
              <div style={{ fontSize: 10, color: DS.colors.gray500 }}>IVD Inattivi</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DS.colors.gray800 }}>
                {data.alert?.ivdInattivi || 0} ({data.alert?.ivdPctInattivi || 0}%)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // <TrendingUp size={16} /> FUNNEL ANALYSIS COMPONENT - Design coerente
  // ═══════════════════════════════════════════════════════════════════════════════
  const FunnelAnalysisComponent = ({ fv, la, fatturato }) => {
    if (!fv && !la) return null;

    const FunnelStep = ({ label, value, subValue, color, percentage, isLast }) => (
      <div style={{ marginBottom: isLast ? 0 : 4 }}>
        <div style={{
          background: `${color}08`,
          border: `1px solid ${color}25`,
          borderRadius: 10,
          padding: '12px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: 11, color: DS.colors.gray500, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
            {subValue && <div style={{ fontSize: 10, color: '#9CA3AF' }}>{subValue}</div>}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color, opacity: 0.2 }}>{percentage}%</div>
        </div>
        {!isLast && (
          <div style={{ textAlign: 'center', color: '#D1D5DB', fontSize: 12, padding: '2px 0' }}>↓</div>
        )}
      </div>
    );

    return (
      <div id="section-conversioni" style={{ background: DS.colors.white, borderRadius: 16, padding: 20, border: '1px solid #E5E7EB', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ color: DS.colors.gray800, fontSize: 18, margin: 0, fontWeight: 700 }}>
            <BarChart3 size={16} /> Analisi Conversioni
            <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400, marginLeft: 8 }}>Passaggi di stato</span>
          </h3>
          <button onClick={() => screenshotSection('section-conversioni', 'Analisi_Conversioni')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}><Camera size={16} /></button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* FV Funnel */}
          {fv && (
            <div style={{ background: DS.colors.gray50, borderRadius: 16, padding: 16 }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: DS.colors.fv, 
                marginBottom: 12, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <span><Sun size={16} /> Fotovoltaico</span>
                <span style={{ 
                  fontSize: 11, 
                  background: DS.colors.fv, 
                  color: DS.colors.white,
                  padding: '3px 10px', 
                  borderRadius: 10 
                }}>
                  {fv.funnel.pctPositivi}% conversione
                </span>
              </div>
              <FunnelStep label="Inseriti" value={fv.funnel.inseriti} subValue={`€${((fatturato?.fv?.inseriti?.totale || 0) / 1000).toFixed(0)}K`} color="#3B82F6" percentage={100} />
              <FunnelStep label="Positivi" value={fv.funnel.positivi} subValue={`€${((fatturato?.fv?.effettivi?.totale || 0) / 1000).toFixed(0)}K effettivo`} color="#10B981" percentage={fv.funnel.pctPositivi} />
              <FunnelStep label="In Lavorazione" value={fv.funnel.lavorazione} subValue={`€${((fatturato?.fv?.lavorazione?.totale || 0) / 1000).toFixed(0)}K da sbloccare`} color="#F59E0B" percentage={fv.funnel.inseriti > 0 ? Math.round(fv.funnel.lavorazione / fv.funnel.inseriti * 100) : 0} isLast />
              <div style={{ 
                marginTop: 10, 
                padding: '10px 12px', 
                background: '#FEF2F2', 
                border: '1px solid #FECACA', 
                borderRadius: 8, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <span style={{ fontSize: 12, color: DS.colors.danger, fontWeight: 600 }}><XCircle size={16} /> Persi: {fv.funnel.negativi}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: DS.colors.danger }}>-€{((fatturato?.fv?.persi?.totale || 0) / 1000).toFixed(0)}K</span>
              </div>
            </div>
          )}
          
          {/* LA Funnel */}
          {la && (
            <div style={{ background: DS.colors.gray50, borderRadius: 16, padding: 16 }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: DS.colors.la, 
                marginBottom: 12, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <span><Zap size={16} /> Luce Amica</span>
                <span style={{ 
                  fontSize: 11, 
                  background: DS.colors.la, 
                  color: DS.colors.white,
                  padding: '3px 10px', 
                  borderRadius: 10 
                }}>
                  {la.funnel.pctAccettati}% accettazione
                </span>
              </div>
              <FunnelStep label="Inseriti" value={la.funnel.inseriti} subValue={`${(fatturato?.la?.inseriti?.punti || 0).toLocaleString('it-IT')} punti`} color="#3B82F6" percentage={100} />
              <FunnelStep label="Accettati" value={la.funnel.accettati} subValue={`${(fatturato?.la?.accettatiPunti?.punti || 0).toLocaleString('it-IT')} punti`} color="#10B981" percentage={la.funnel.pctAccettati} />
              <FunnelStep label="In Fornitura" value={la.funnel.inFornitura} subValue={`€${((fatturato?.la?.attiviEffettivi?.totale || 0) / 1000).toFixed(0)}K/anno`} color="#8B5CF6" percentage={la.funnel.pctFornitura} isLast />
              <div style={{ 
                marginTop: 10, 
                padding: '10px 12px', 
                background: '#FFFBEB', 
                border: '1px solid #FCD34D', 
                borderRadius: 8, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <span style={{ fontSize: 12, color: DS.colors.la, fontWeight: 600 }}>📉 Cessati: {la.funnel.accettati - la.funnel.inFornitura}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: DS.colors.la }}>{la.funnel.accettati > 0 ? Math.round((la.funnel.accettati - la.funnel.inFornitura) / la.funnel.accettati * 100) : 0}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // <Users size={16} /> RETE PERFORMANCE COMPONENT - Distribuzione produttività IVD
  // ═══════════════════════════════════════════════════════════════════════════════
  const RetePerformanceComponent = ({ tracker }) => {
    if (!tracker) return null;
    
    const fasce = tracker.fasceProduttivita || { zero: 0, bassa: 0, media: 0, alta: 0, top: 0 };
    const totale = tracker.totale || 1;
    const maxFascia = Math.max(fasce.zero, fasce.bassa, fasce.media, fasce.alta, fasce.top, 1);

    const BarChart = ({ label, value, color, emoji }) => (
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <span style={{ fontSize: 11, color: '#64748B' }}>{emoji} {label}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color }}>{value} ({Math.round(value/totale*100)}%)</span>
        </div>
        <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(value / maxFascia) * 100}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 3, transition: 'width 0.5s ease' }} />
        </div>
      </div>
    );

    return (
      <div style={{ background: DS.colors.white, borderRadius: 16, padding: 20, border: '1px solid #E2E8F0', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h3 style={{ color: '#1E293B', fontSize: 18, margin: 0, fontWeight: 700 }}><Users size={16} /> Performance Rete Vendita</h3>
            <p style={{ color: '#94A3B8', fontSize: 12, margin: '4px 0 0' }}>Distribuzione produttività IVD ({tracker.totale} totali)</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#10B981' }}>{tracker.ivdConContratti || 0}</div>
              <div style={{ fontSize: 9, color: '#94A3B8' }}>Produttivi</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#EF4444' }}>{tracker.ivdInattivi || 0}</div>
              <div style={{ fontSize: 9, color: '#94A3B8' }}>Inattivi</div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12 }}><BarChart3 size={16} /> Distribuzione per Fascia</div>
            <BarChart label="0 contratti" value={fasce.zero} color="#EF4444" emoji="" />
            <BarChart label="1-5 contratti" value={fasce.bassa} color="#F59E0B" emoji="🟡" />
            <BarChart label="6-20 contratti" value={fasce.media} color="#3B82F6" emoji="" />
            <BarChart label="21-50 contratti" value={fasce.alta} color="#10B981" emoji="" />
            <BarChart label="50+ contratti" value={fasce.top} color="#8B5CF6" emoji="<Star size={16} />" />
          </div>
          
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 12 }}>⏱️ Tempo Medio al Primo Contratto</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: DS.colors.fv, marginBottom: 2 }}>Prima LA</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: DS.colors.fv }}>{tracker.medie?.la !== null ? tracker.medie.la : '-'}</div>
                <div style={{ fontSize: 9, color: '#22C55E' }}>giorni</div>
              </div>
              <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: DS.colors.la, marginBottom: 2 }}>Primo FV</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: DS.colors.la }}>{tracker.medie?.fv !== null ? tracker.medie.fv : '-'}</div>
                <div style={{ fontSize: 9, color: '#F59E0B' }}>giorni</div>
              </div>
              <div style={{ background: '#EDE9FE', border: '1px solid #C4B5FD', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#6D28D9', marginBottom: 2 }}>Primo Iscritto</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#6D28D9' }}>{tracker.medie?.iscritto !== null ? tracker.medie.iscritto : '-'}</div>
                <div style={{ fontSize: 9, color: '#8B5CF6' }}>giorni</div>
              </div>
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: DS.colors.danger, marginBottom: 2 }}>Primo Attivato</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: DS.colors.danger }}>{tracker.medie?.attivato !== null ? tracker.medie.attivato : '-'}</div>
                <div style={{ fontSize: 9, color: '#EF4444' }}>giorni</div>
              </div>
            </div>
            
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 10, color: '#64748B', marginBottom: 6 }}>% IVD che hanno completato:</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ background: '#DCFCE7', color: DS.colors.fv, padding: '3px 8px', borderRadius: 12, fontSize: 9, fontWeight: 600 }}>LA: {tracker.completamento?.la || 0}%</span>
                <span style={{ background: '#FEF3C7', color: DS.colors.la, padding: '3px 8px', borderRadius: 12, fontSize: 9, fontWeight: 600 }}>FV: {tracker.completamento?.fv || 0}%</span>
                <span style={{ background: '#EDE9FE', color: '#6D28D9', padding: '3px 8px', borderRadius: 12, fontSize: 9, fontWeight: 600 }}>Iscritto: {tracker.completamento?.iscritto || 0}%</span>
                <span style={{ background: '#FEF2F2', color: DS.colors.danger, padding: '3px 8px', borderRadius: 12, fontSize: 9, fontWeight: 600 }}>Attivato: {tracker.completamento?.attivato || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // COMPONENTE REPORT RESULTS - Layout completo con tutti i pilastri
  // ═══════════════════════════════════════════════════════════════════════════════
  const ReportResultsComponent = ({ reportData }) => {
    if (!reportData || !reportData.pilastri) return null;
    
    const STATO_COLORS_DISPLAY = {
      positivo: '#4CAF50', lavorazione: DS.colors.accent, lavorabile: DS.colors.accent, 
      negativo: '#E53935', meno: '#E53935', attivo: '#4CAF50', perso: '#E53935', altro: '#999999'
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* <Target size={16} /> EXECUTIVE SUMMARY - PRIMA DI TUTTO */}
        {reportData.executiveSummary && (
          <ExecutiveSummaryComponent data={reportData.executiveSummary} periodo={reportData.periodoRiferimento} />
        )}
        
        {/* <Trophy size={16} /> BEST PERFORMERS - Migliori K e NW per categoria */}
        {reportData.bestPerformers && (
          <div id="section-best" style={{ background: DS.colors.white, borderRadius: 16, padding: 20, border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ color: DS.colors.gray800, fontSize: 18, margin: 0, fontWeight: 700 }}><Trophy size={16} /> Best Performers</h3>
                <p style={{ color: DS.colors.gray500, fontSize: 12, margin: '4px 0 0' }}>
                  I migliori K Manager e Networker per ogni categoria {reportData.periodoRiferimento ? `• ${reportData.periodoRiferimento.label}` : ''}
                </p>
              </div>
              <button onClick={() => screenshotSection('section-best', 'Best_Performers')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}><Camera size={16} /></button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {/* COLONNA K MANAGER */}
              <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)', borderRadius: 16, padding: 20, border: '2px solid #FCD34D' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: DS.colors.la, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Crown size={16} /> TOP K MANAGER
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* FV Fatturato */}
                  {reportData.bestPerformers.fv?.fatturato?.k && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #BBF7D0' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><Sun size={16} /> Miglior Fatturato FV</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.fv }}>{reportData.bestPerformers.fv.fatturato.k.nome}</span>
                        <span style={{ fontWeight: 800, color: '#166534' }}>€{reportData.bestPerformers.fv.fatturato.k.valore.toLocaleString('it-IT')}</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.fv.fatturato.k.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* LA Fatturato Mensile */}
                  {reportData.bestPerformers.la?.fatturato?.k && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #FCD34D' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><Zap size={16} /> Miglior Fatturato LA /mese</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.la }}>{reportData.bestPerformers.la.fatturato.k.nome}</span>
                        <span style={{ fontWeight: 800, color: '#92400E' }}>€{reportData.bestPerformers.la.fatturato.k.valore.toLocaleString('it-IT')}/m</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.la.fatturato.k.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* Seminari Iscritti */}
                  {reportData.bestPerformers.seminari?.iscritti?.k && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #C4B5FD' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}>🎓 Miglior Iscritti Seminari</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.seminari }}>{reportData.bestPerformers.seminari.iscritti.k.nome}</span>
                        <span style={{ fontWeight: 800, color: '#5B21B6' }}>{reportData.bestPerformers.seminari.iscritti.k.valore}</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.seminari.iscritti.k.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* Seminari Presenti */}
                  {reportData.bestPerformers.seminari?.presenti?.k && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #A7F3D0' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><CheckCircle size={16} /> Miglior Presenti Seminari</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.success }}>{reportData.bestPerformers.seminari.presenti.k.nome}</span>
                        <span style={{ fontWeight: 800, color: '#047857' }}>{reportData.bestPerformers.seminari.presenti.k.valore}</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.seminari.presenti.k.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* FV Conversione */}
                  {reportData.bestPerformers.fv?.conversione?.k && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #86EFAC' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><TrendingUp size={16} /> Miglior Conversione FV</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#16A34A' }}>{reportData.bestPerformers.fv.conversione.k.nome}</span>
                        <span style={{ fontWeight: 800, color: DS.colors.fv }}>{reportData.bestPerformers.fv.conversione.k.valore}%</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.fv.conversione.k.dettaglio}</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* COLONNA NETWORKER */}
              <div style={{ background: 'linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)', borderRadius: 16, padding: 20, border: '2px solid #6EE7B7' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: DS.colors.success, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Star size={16} /> TOP NETWORKER
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* FV Fatturato */}
                  {reportData.bestPerformers.fv?.fatturato?.nw && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #BBF7D0' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><Sun size={16} /> Miglior Fatturato FV</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.fv }}>{reportData.bestPerformers.fv.fatturato.nw.nome}</span>
                        <span style={{ fontWeight: 800, color: '#166534' }}>€{reportData.bestPerformers.fv.fatturato.nw.valore.toLocaleString('it-IT')}</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.fv.fatturato.nw.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* LA Fatturato Mensile */}
                  {reportData.bestPerformers.la?.fatturato?.nw && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #FCD34D' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><Zap size={16} /> Miglior Fatturato LA /mese</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.la }}>{reportData.bestPerformers.la.fatturato.nw.nome}</span>
                        <span style={{ fontWeight: 800, color: '#92400E' }}>€{reportData.bestPerformers.la.fatturato.nw.valore.toLocaleString('it-IT')}/m</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.la.fatturato.nw.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* Seminari Iscritti */}
                  {reportData.bestPerformers.seminari?.iscritti?.nw && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #C4B5FD' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}>🎓 Miglior Iscritti Seminari</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.seminari }}>{reportData.bestPerformers.seminari.iscritti.nw.nome}</span>
                        <span style={{ fontWeight: 800, color: '#5B21B6' }}>{reportData.bestPerformers.seminari.iscritti.nw.valore}</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.seminari.iscritti.nw.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* Seminari Presenti */}
                  {reportData.bestPerformers.seminari?.presenti?.nw && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #A7F3D0' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><CheckCircle size={16} /> Miglior Presenti Seminari</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: DS.colors.success }}>{reportData.bestPerformers.seminari.presenti.nw.nome}</span>
                        <span style={{ fontWeight: 800, color: '#047857' }}>{reportData.bestPerformers.seminari.presenti.nw.valore}</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.seminari.presenti.nw.dettaglio}</div>
                    </div>
                  )}
                  
                  {/* Tracker Velocità LA */}
                  {reportData.bestPerformers.tracker?.primaLA?.nw && (
                    <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, border: '1px solid #93C5FD' }}>
                      <div style={{ fontSize: 10, color: DS.colors.gray500, marginBottom: 4 }}><Target size={16} /> Più Veloce 1° LA</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#2563EB' }}>{reportData.bestPerformers.tracker.primaLA.nw.nome}</span>
                        <span style={{ fontWeight: 800, color: '#1D4ED8' }}>{reportData.bestPerformers.tracker.primaLA.nw.valore}g</span>
                      </div>
                      <div style={{ fontSize: 9, color: '#9CA3AF' }}>{reportData.bestPerformers.tracker.primaLA.nw.dettaglio}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* <TrendingUp size={16} /> FUNNEL ANALYSIS */}
        <FunnelAnalysisComponent 
          fv={reportData.pilastri.fv} 
          la={reportData.pilastri.energy} 
          fatturato={reportData.fatturato}
        />
        
        {/* <Users size={16} /> RETE PERFORMANCE */}
        {reportData.trackerCoaching && (
          <RetePerformanceComponent tracker={reportData.trackerCoaching} />
        )}
        
        {/* CALENDARIO CON DRILL-DOWN - GRIGLIA 3x3 */}
        {Object.keys(reportData.heatmapMesi).length > 0 && (
          <div id="section-calendario" style={{ background: DS.colors.white, borderRadius: 16, padding: 20, border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ color: DS.colors.gray800, fontSize: 18, margin: 0, fontWeight: 700 }}><Calendar size={16} /> Calendario Attività</h3>
                <p style={{ color: DS.colors.gray500, fontSize: 12, margin: '4px 0 0' }}>
                  Clicca un box per vedere il dettaglio mensile {reportData.periodoRiferimento ? `• ${reportData.periodoRiferimento.label}` : ''}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => screenshotSection('section-calendario', 'Calendario_Attivita')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}><Camera size={16} /></button>
                {heatmapDrilldown && (
                  <button 
                    onClick={() => setHeatmapDrilldown(null)}
                    style={{ padding: '8px 16px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12, cursor: 'pointer', color: DS.colors.gray700, fontWeight: 500 }}
                  >
                    Torna ai mesi
                  </button>
                )}
              </div>
            </div>
            
            {!heatmapDrilldown ? (
              /* VISTA MESI - Griglia 3x3 uniforme */
              <>
                {/* LEGENDA */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 14, height: 14, borderRadius: 4, background: '#10B981' }} /><span style={{ fontSize: 11, color: DS.colors.gray500 }}>Alto</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 14, height: 14, borderRadius: 4, background: '#F59E0B' }} /><span style={{ fontSize: 11, color: DS.colors.gray500 }}>Medio</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 14, height: 14, borderRadius: 4, background: '#EF4444' }} /><span style={{ fontSize: 11, color: DS.colors.gray500 }}>Basso</span></div>
                </div>
                
                {/* GRIGLIA 3x3 UNIFORME */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {[
                    { key: 'fv', icon: Sun, label: 'Fotovoltaico', color: DS.colors.fv, bgColor: '#F0FDF4', borderColor: '#BBF7D0' },
                    { key: 'energy', icon: Zap, label: 'Luce Amica', color: DS.colors.la, bgColor: '#FFFBEB', borderColor: '#FCD34D' },
                    { key: 'consultings', emoji: '🎓', label: 'Seminari', color: DS.colors.seminari, bgColor: '#F5F3FF', borderColor: '#C4B5FD' },
                    { key: 'presenti', icon: CheckCircle, label: 'Presenti', color: DS.colors.success, bgColor: '#ECFDF5', borderColor: '#A7F3D0' },
                    { key: 'ivd', icon: Users, label: 'Attivati', color: '#EA580C', bgColor: '#FFF7ED', borderColor: '#FDBA74' },
                    { key: 'guadagnoFV', emoji: '', label: 'Fatturato FV', color: DS.colors.fv, bgColor: '#F0FDF4', borderColor: '#BBF7D0', isCurrency: true },
                    { key: 'guadagnoLA', emoji: '💵', label: 'Fatturato LA', color: DS.colors.la, bgColor: '#FFFBEB', borderColor: '#FCD34D', isCurrency: true },
                    { key: 'puntiFV', icon: Star, label: 'Punti FV', color: DS.colors.seminari, bgColor: '#F5F3FF', borderColor: '#C4B5FD', unit: 'pt' },
                    { key: 'puntiLA', icon: Trophy, label: 'Punti LA', color: '#EA580C', bgColor: '#FFF7ED', borderColor: '#FDBA74', unit: 'pt' }
                  ].map(item => {
                    const heatData = reportData.heatmapMesi[item.key];
                    if (!heatData) return null;
                    
                    const mesiNomi = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
                    const totale = heatData.mesi.reduce((a,b) => a+b, 0);
                    const maxMese = Math.max(...heatData.mesi, 1);
                    const mesiConDati = heatData.mesi.filter(v => v > 0).length;
                    const media = mesiConDati > 0 ? Math.round(totale / mesiConDati) : 0;
                    const bestMeseIdx = heatData.mesi.indexOf(Math.max(...heatData.mesi));
                    const annoDati = heatData.anno || new Date().getFullYear();
                    
                    // Calcola TOP ORARIO dell'anno
                    const orariKeys = ['notte', 'mattinaPrima', 'mattina', 'pranzo', 'pomeriggio', 'sera', 'notturno'];
                    const orariLabels = ['00-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'];
                    const totaliOrari = { notte: 0, mattinaPrima: 0, mattina: 0, pranzo: 0, pomeriggio: 0, sera: 0, notturno: 0 };
                    Object.values(heatData.orariPerMese || {}).forEach(orari => {
                      orariKeys.forEach(key => { totaliOrari[key] += orari[key] || 0; });
                    });
                    let bestOrarioIdx = 2;
                    let maxOrarioVal = 0;
                    orariKeys.forEach((key, idx) => {
                      if (totaliOrari[key] > maxOrarioVal) { maxOrarioVal = totaliOrari[key]; bestOrarioIdx = idx; }
                    });
                    const bestOrario = maxOrarioVal > 0 ? orariLabels[bestOrarioIdx] : '-';
                    
                    const formatValue = (val) => {
                      if (item.isCurrency) return `€${(val/1000).toFixed(0)}K`;
                      if (item.unit === 'pt') return val >= 1000 ? `${(val/1000).toFixed(1)}K` : val;
                      return val;
                    };
                    
                    const formatTotale = (val) => {
                      if (item.isCurrency) return `€${val.toLocaleString('it-IT')}`;
                      if (item.unit === 'pt') return `${val.toLocaleString('it-IT')} pt`;
                      return val.toLocaleString('it-IT');
                    };
                    
                    return (
                      <div key={item.key} style={{ 
                        background: item.bgColor, 
                        borderRadius: 16, 
                        padding: 16, 
                        border: `2px solid ${item.borderColor}`,
                        transition: 'all 0.2s ease'
                      }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 20 }}>{item.icon && <item.icon size={20} color={item.color} />}</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.label}</span>
                          </div>
                          <div style={{ 
                            fontSize: 10, 
                            background: item.color, 
                            color: DS.colors.white, 
                            padding: '2px 8px', 
                            borderRadius: 10,
                            fontWeight: 600
                          }}>
                            {media}{item.isCurrency ? '€K' : item.unit || ''}/mese
                          </div>
                        </div>
                        
                        {/* Mini calendario - 2 righe x 6 colonne */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, marginBottom: 12 }}>
                          {mesiNomi.map((nome, idx) => {
                            const val = heatData.mesi[idx];
                            const intensity = val / maxMese;
                            const bgColor = val === 0 ? DS.colors.gray200 : intensity > 0.7 ? '#10B981' : intensity > 0.3 ? '#F59E0B' : '#EF4444';
                            return (
                              <div 
                                key={idx}
                                onClick={() => val > 0 && setHeatmapDrilldown({ type: item.key, mese: idx, label: nome, data: heatData, anno: annoDati, info: item })}
                                style={{ 
                                  height: 44,
                                  borderRadius: 6, 
                                  background: bgColor, 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  cursor: val > 0 ? 'pointer' : 'default',
                                  transition: 'transform 0.15s ease'
                                }}
                                onMouseOver={e => { if (val > 0) e.currentTarget.style.transform = 'scale(1.08)'; }}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                              >
                                <span style={{ fontSize: 8, color: val === 0 ? '#9CA3AF' : DS.colors.white, fontWeight: 600 }}>{nome}</span>
                                {val > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: DS.colors.white }}>{formatValue(val)}</span>}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Footer con totale e top orario */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 12 }}>
                            <span style={{ fontSize: 10, color: DS.colors.gray500 }}><Trophy size={16} /> {mesiNomi[bestMeseIdx]}</span>
                            <span style={{ fontSize: 10, color: DS.colors.gray500 }}>🕐 {bestOrario}</span>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{formatTotale(totale)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* DRILL-DOWN: Giorni + Settimane + Orari del mese selezionato */
              (() => {
                const { type, mese, label, data: heatData, anno, info: passedInfo } = heatmapDrilldown;
                const annoDrilldown = anno || heatData.anno || new Date().getFullYear();
                // Usa info passata dal click o fallback a mappa default
                const infoMap = { 
                  fv: { icon: Sun, label: 'Fotovoltaico', color: DS.colors.fv }, 
                  energy: { icon: Zap, label: 'Luce Amica', color: DS.colors.la }, 
                  consultings: { emoji: '🎓', label: 'Seminari', color: DS.colors.seminari }, 
                  presenti: { icon: CheckCircle, label: 'Presenti', color: DS.colors.success }, 
                  ivd: { icon: Users, label: 'Attivati', color: '#EA580C' },
                  guadagnoFV: { emoji: '', label: 'Guadagno FV', color: DS.colors.fv, isCurrency: true },
                  guadagnoLA: { emoji: '💵', label: 'Guadagno LA', color: DS.colors.la, isCurrency: true },
                  puntiFV: { icon: Star, label: 'Punti FV', color: DS.colors.seminari, unit: 'pt' },
                  puntiLA: { icon: Trophy, label: 'Punti LA', color: '#EA580C', unit: 'pt' }
                };
                const info = passedInfo || infoMap[type] || { icon: BarChart3, label: type, color: '#666' };
                const giorni = heatData.giorniPerMese?.[mese] || Array(31).fill(0);
                const settimane = heatData.settimanePerMese?.[mese] || Array(5).fill(0);
                const orari = heatData.orariPerMese?.[mese] || { notte: 0, mattinaPrima: 0, mattina: 0, pranzo: 0, pomeriggio: 0, sera: 0, notturno: 0 };
                const maxGiorno = Math.max(...giorni, 1);
                const maxSettimana = Math.max(...settimane, 1);
                const orariArray = [
                  { label: '00-06', val: orari.notte, emoji: '🌙' },
                  { label: '06-09', val: orari.mattinaPrima, emoji: '🌅' },
                  { label: '09-12', val: orari.mattina, icon: Sun },
                  { label: '12-15', val: orari.pranzo, emoji: '🍽️' },
                  { label: '15-18', val: orari.pomeriggio, emoji: '🌤️' },
                  { label: '18-21', val: orari.sera, emoji: '🌆' },
                  { label: '21-24', val: orari.notturno, emoji: '🌙' }
                ];
                const maxOrario = Math.max(...orariArray.map(o => o.val), 1);
                
                // Calcola best orario del mese
                const orariKeys = ['notte', 'mattinaPrima', 'mattina', 'pranzo', 'pomeriggio', 'sera', 'notturno'];
                const orariLabels = ['00-06', '06-09', '09-12', '12-15', '15-18', '18-21', '21-24'];
                let bestOrarioIdx = 2;
                let maxOrarioVal = 0;
                orariKeys.forEach((key, idx) => {
                  if (orari[key] > maxOrarioVal) { maxOrarioVal = orari[key]; bestOrarioIdx = idx; }
                });
                const bestOrario = maxOrarioVal > 0 ? orariLabels[bestOrarioIdx] : '-';
                
                // Formatta valore per display
                const formatVal = (val) => {
                  if (info.isCurrency) return `€${(val/1000).toFixed(0)}K`;
                  if (info.unit === 'pt') return `${val.toLocaleString('it-IT')}`;
                  return val;
                };
                
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <div style={{ background: `linear-gradient(135deg, ${info.color}15, ${info.color}05)`, borderRadius: 12, padding: 15, border: `1px solid ${info.color}30` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 14, color: info.color, fontWeight: 700, marginBottom: 5 }}>
                            {info.icon && <info.icon size={16} color={info.color} />} {info.label} - {label.toUpperCase()} {annoDrilldown}
                          </div>
                          <div style={{ fontSize: 24, fontWeight: 800, color: '#333' }}>{formatVal(heatData.mesi[mese])} {info.isCurrency ? '' : info.unit === 'pt' ? 'punti' : 'contratti'}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>🕐 Best Orario</div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: info.color }}>{bestOrario}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* SETTIMANE */}
                    <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15 }}>
                      <div style={{ fontSize: 12, color: '#666', fontWeight: 600, marginBottom: 10 }}><Calendar size={16} /> SETTIMANE</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                        {settimane.map((val, i) => {
                          const intensity = val / maxSettimana;
                          const bgColor = val === 0 ? '#F0F0F0' : intensity > 0.7 ? '#4CAF50' : intensity > 0.3 ? DS.colors.accent : '#FF8F00';
                          return (
                            <div key={i} style={{ background: bgColor, borderRadius: 8, padding: '12px 8px', textAlign: 'center' }}>
                              <div style={{ fontSize: 10, color: val === 0 ? '#AAA' : DS.colors.white }}>Sett {i+1}</div>
                              <div style={{ fontSize: 18, fontWeight: 700, color: val === 0 ? '#CCC' : DS.colors.white }}>{val}</div>
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
                          const bgColor = o.val === 0 ? '#F0F0F0' : intensity > 0.7 ? DS.colors.primaryLight : intensity > 0.3 ? '#4DB6AC' : '#B2DFDB';
                          return (
                            <div key={i} style={{ background: bgColor, borderRadius: 8, padding: '10px 4px', textAlign: 'center' }}>
                              <div style={{ fontSize: 14 }}>{o.icon && <o.icon size={14} />}</div>
                              <div style={{ fontSize: 9, color: o.val === 0 ? '#AAA' : DS.colors.white, marginTop: 2 }}>{o.label}</div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: o.val === 0 ? '#CCC' : DS.colors.white }}>{o.val}</div>
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
                          const bgColor = val === 0 ? '#F5F5F5' : intensity > 0.7 ? '#4CAF50' : intensity > 0.3 ? DS.colors.accent : '#FF8F00';
                          return (
                            <div key={i} style={{ height: 36, borderRadius: 4, background: bgColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: 8, color: val === 0 ? '#AAA' : DS.colors.white }}>{i+1}</span>
                              {val > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: DS.colors.white }}>{val}</span>}
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
          <div id="section-fv" style={{ background: DS.colors.white, borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}><Sun size={16} /></span>
                <div>
                  <h3 style={{ color: DS.colors.primaryLight, fontSize: 20, margin: 0, fontWeight: 700 }}>PILASTRO FOTOVOLTAICO</h3>
                  <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Totale inseriti: {reportData.pilastri.fv.totale}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => screenshotSection('section-fv', 'Pilastro_FV')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Camera size={16} /></button>
                {reportData.periodoRiferimento && (
                  <div style={{ background: '#F0FDF4', padding: '6px 12px', borderRadius: 8, border: '1px solid #BBF7D0' }}>
                    <span style={{ fontSize: 11, color: DS.colors.fv, fontWeight: 600 }}><Calendar size={16} /> {reportData.periodoRiferimento.label}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* FUNNEL GRANDE - CON TUTTE LE % */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, marginBottom: 25, flexWrap: 'wrap', padding: '15px 0' }}>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: DS.colors.primaryLight }}>{reportData.pilastri.fv.funnel.inseriti}</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Inseriti</div>
              </div>
              <div style={{ fontSize: 28, color: '#D0D0D0' }}>→</div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.fv.funnel.positivi}</div>
                <div style={{ fontSize: 13, color: '#333', marginTop: 4 }}>Positivi <span style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600 }}>({reportData.pilastri.fv.funnel.pctPositivi}%)</span></div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: DS.colors.accent }}>{reportData.pilastri.fv.funnel.lavorazione}</div>
                <div style={{ fontSize: 13, color: '#333', marginTop: 4 }}>Lavoraz. <span style={{ fontSize: 11, color: '#FF8F00', fontWeight: 600 }}>({reportData.pilastri.fv.funnel.inseriti > 0 ? Math.round(reportData.pilastri.fv.funnel.lavorazione / reportData.pilastri.fv.funnel.inseriti * 100) : 0}%)</span></div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#E53935' }}>{reportData.pilastri.fv.funnel.negativi}</div>
                <div style={{ fontSize: 13, color: '#333', marginTop: 4 }}>Persi <span style={{ fontSize: 11, color: '#E53935', fontWeight: 600 }}>({reportData.pilastri.fv.funnel.pctNegativi}%)</span></div>
              </div>
            </div>
            
            {/* DETTAGLIO STATI RAGGRUPPATI PER COLORE */}
            <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}><FileText size={16} /> DETTAGLIO STATI</div>
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
                        <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}> POSITIVI ({statiVerdi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {statiVerdi.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
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
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FFD700' }}>
                              {stato} <strong style={{ color: '#FF8F00' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* NEGATIVI - ROSSO */}
                    {statiRossi.length > 0 && (
                      <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(229,57,53,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#E53935', fontWeight: 600, marginBottom: 8 }}> NEGATIVI ({statiRossi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {statiRossi.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #E53935' }}>
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
            
            {/* CLASSIFICHE CON 4 COLONNE + % */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { title: 'K MANAGER', icon: Crown, data: reportData.pilastri.fv.classifiche.k, color: DS.colors.la },
                { title: 'NETWORKER', icon: Star, data: reportData.pilastri.fv.classifiche.nw, color: DS.colors.fv },
                { title: 'SDP', emoji: '', data: reportData.pilastri.fv.classifiche.sdp, color: '#2563EB' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: DS.colors.gray50, borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: 13, color: color, fontWeight: 700, marginBottom: 12 }}>{emoji} {title} <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 400 }}>({data.length})</span></div>
                  {/* Header 4 colonne */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 50px)', gap: 4, marginBottom: 8, paddingBottom: 8, borderBottom: '2px solid #E5E7EB' }}>
                    <span style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 600 }}>Nome</span>
                    <span style={{ fontSize: 9, color: '#3B82F6', fontWeight: 600, textAlign: 'center' }}>Ins</span>
                    <span style={{ fontSize: 9, color: '#10B981', fontWeight: 600, textAlign: 'center' }}>Pos</span>
                    <span style={{ fontSize: 9, color: '#F59E0B', fontWeight: 600, textAlign: 'center' }}>Lav</span>
                    <span style={{ fontSize: 9, color: '#EF4444', fontWeight: 600, textAlign: 'center' }}>Per</span>
                  </div>
                  <div style={{ maxHeight: 350, overflowY: 'auto' }}>
                    {data.map(([name, stats], i) => {
                      const tot = stats.total || 1;
                      const pctPos = Math.round((stats.positivo || 0) / tot * 100);
                      const pctLav = Math.round((stats.lavorazione || 0) / tot * 100);
                      const pctNeg = Math.round((stats.negativo || 0) / tot * 100);
                      return (
                      <div key={i} style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr repeat(4, 50px)', 
                        gap: 4, 
                        padding: '6px 0', 
                        borderBottom: '1px solid #F3F4F6', 
                        fontSize: 11,
                        background: i < 3 ? `${color}08` : 'transparent'
                      }}>
                        <span style={{ color: DS.colors.gray800, fontWeight: i < 3 ? 700 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {i < 3 ? ['1°','2°','3°'][i] : `${i+1}°`} {name.length > 12 ? name.substring(0,12) + '...' : name}
                        </span>
                        <span style={{ color: '#3B82F6', fontWeight: 600, textAlign: 'center' }}>{stats.total || 0}</span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#10B981', fontWeight: 600 }}>{stats.positivo || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctPos}%</span></span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#F59E0B', fontWeight: 600 }}>{stats.lavorazione || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctLav}%</span></span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#EF4444', fontWeight: 600 }}>{stats.negativo || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctNeg}%</span></span>
                      </div>
                    );})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* PILASTRO LUCE AMICA */}
        {reportData.pilastri.energy && (
          <div id="section-la" style={{ background: DS.colors.white, borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}><Zap size={16} /></span>
                <div>
                  <h3 style={{ color: DS.colors.accent, fontSize: 20, margin: 0, fontWeight: 700 }}>PILASTRO LUCE AMICA</h3>
                  <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Totale inseriti: {reportData.pilastri.energy.totale}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => screenshotSection('section-la', 'Pilastro_LA')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Camera size={16} /></button>
                {reportData.periodoRiferimento && (
                  <div style={{ background: '#FFFBEB', padding: '6px 12px', borderRadius: 8, border: '1px solid #FCD34D' }}>
                    <span style={{ fontSize: 11, color: DS.colors.la, fontWeight: 600 }}><Calendar size={16} /> {reportData.periodoRiferimento.label}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* FUNNEL GRANDE */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 25, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: DS.colors.primaryLight }}>{reportData.pilastri.energy.funnel.inseriti}</div>
                <div style={{ fontSize: 12, color: '#666' }}><FileText size={16} /> Inseriti</div>
              </div>
              <div style={{ fontSize: 24, color: '#E0E0E0' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.energy.funnel.accettati}</div>
                <div style={{ fontSize: 12, color: '#4CAF50' }}> Accettati <span style={{ fontSize: 10 }}>({reportData.pilastri.energy.funnel.pctAccettati}%)</span></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: DS.colors.accent }}>{reportData.pilastri.energy.funnel.lavorabili}</div>
                <div style={{ fontSize: 12, color: DS.colors.accent }}>🟡 Lavorabili <span style={{ fontSize: 10 }}>({reportData.pilastri.energy.funnel.inseriti > 0 ? Math.round(reportData.pilastri.energy.funnel.lavorabili / reportData.pilastri.energy.funnel.inseriti * 100) : 0}%)</span></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#E53935' }}>{reportData.pilastri.energy.funnel.persi}</div>
                <div style={{ fontSize: 12, color: '#E53935' }}> Persi <span style={{ fontSize: 10 }}>({reportData.pilastri.energy.funnel.inseriti > 0 ? Math.round(reportData.pilastri.energy.funnel.persi / reportData.pilastri.energy.funnel.inseriti * 100) : 0}%)</span></div>
              </div>
            </div>
            
            {/* DETTAGLIO STATI - STESSO STILE DI FV */}
            <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}><FileText size={16} /> DETTAGLIO STATI</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* CONTRATTO - Raggruppati per colore */}
                {(() => {
                  const positivi = reportData.pilastri.energy.statiNwgSpa.filter(([s]) => STATO_MAP_LA_SPA[s] === 'positivo');
                  const lavorabili = reportData.pilastri.energy.statiNwgSpa.filter(([s]) => STATO_MAP_LA_SPA[s] === 'lavorabile');
                  const negativi = reportData.pilastri.energy.statiNwgSpa.filter(([s]) => STATO_MAP_LA_SPA[s] === 'meno' || !STATO_MAP_LA_SPA[s] || STATO_MAP_LA_SPA[s] === 'altro');
                  return (<>
                    {/* POSITIVI */}
                    {positivi.length > 0 && (
                      <div style={{ background: 'rgba(76,175,80,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(76,175,80,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}> CONTRATTO - POSITIVI ({positivi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {positivi.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
                              {stato} <strong style={{ color: '#4CAF50' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* LAVORABILI */}
                    {lavorabili.length > 0 && (
                      <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,215,0,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#FF8F00', fontWeight: 600, marginBottom: 8 }}>🟡 CONTRATTO - LAVORABILI ({lavorabili.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {lavorabili.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FFD700' }}>
                              {stato} <strong style={{ color: '#FF8F00' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* NEGATIVI */}
                    {negativi.length > 0 && (
                      <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(229,57,53,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#E53935', fontWeight: 600, marginBottom: 8 }}> CONTRATTO - NEGATIVI ({negativi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {negativi.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #E53935' }}>
                              {stato} <strong style={{ color: '#E53935' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>);
                })()}
                
                {/* FORNITURA - Raggruppati per colore */}
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
                        <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}> FORNITURA - ATTIVI ({attivi.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {attivi.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
                              {stato} <strong style={{ color: '#4CAF50' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {daAttivare.length > 0 && (
                      <div style={{ background: 'rgba(255,215,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,215,0,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#FF8F00', fontWeight: 600, marginBottom: 8 }}>🟡 FORNITURA - DA ATTIVARE ({daAttivare.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {daAttivare.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FFD700' }}>
                              {stato} <strong style={{ color: '#FF8F00' }}>{count}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {cessati.length > 0 && (
                      <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(229,57,53,0.3)' }}>
                        <div style={{ fontSize: 11, color: '#E53935', fontWeight: 600, marginBottom: 8 }}> FORNITURA - CESSATI ({cessati.reduce((s,[,c]) => s+c, 0)})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {cessati.map(([stato, count], i) => (
                            <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #E53935' }}>
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
            
            {/* CLASSIFICHE LA - CON 4 COLONNE + % */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { title: 'K MANAGER', icon: Crown, data: reportData.pilastri.energy.classifiche.k, color: DS.colors.la },
                { title: 'NETWORKER', icon: Star, data: reportData.pilastri.energy.classifiche.nw, color: DS.colors.fv },
                { title: 'SDP', emoji: '', data: reportData.pilastri.energy.classifiche.sdp, color: '#2563EB' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: DS.colors.gray50, borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: 13, color: color, fontWeight: 700, marginBottom: 12 }}>{emoji} {title} <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 400 }}>({data.length})</span></div>
                  {/* Header 4 colonne */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 50px)', gap: 4, marginBottom: 8, paddingBottom: 8, borderBottom: '2px solid #E5E7EB' }}>
                    <span style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 600 }}>Nome</span>
                    <span style={{ fontSize: 9, color: '#3B82F6', fontWeight: 600, textAlign: 'center' }}>Ins</span>
                    <span style={{ fontSize: 9, color: '#10B981', fontWeight: 600, textAlign: 'center' }}>Acc</span>
                    <span style={{ fontSize: 9, color: '#F59E0B', fontWeight: 600, textAlign: 'center' }}>Lav</span>
                    <span style={{ fontSize: 9, color: '#EF4444', fontWeight: 600, textAlign: 'center' }}>Per</span>
                  </div>
                  <div style={{ maxHeight: 350, overflowY: 'auto' }}>
                    {data.map(([name, stats], i) => {
                      const tot = stats.total || 1;
                      const pctAcc = Math.round((stats.positivo || 0) / tot * 100);
                      const pctLav = Math.round((stats.lavorabile || 0) / tot * 100);
                      const pctPer = Math.round((stats.meno || 0) / tot * 100);
                      return (
                      <div key={i} style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr repeat(4, 50px)', 
                        gap: 4, 
                        padding: '6px 0', 
                        borderBottom: '1px solid #F3F4F6', 
                        fontSize: 11,
                        background: i < 3 ? `${color}08` : 'transparent'
                      }}>
                        <span style={{ color: DS.colors.gray800, fontWeight: i < 3 ? 700 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {i < 3 ? ['1°','2°','3°'][i] : `${i+1}°`} {name.length > 12 ? name.substring(0,12) + '...' : name}
                        </span>
                        <span style={{ color: '#3B82F6', fontWeight: 600, textAlign: 'center' }}>{stats.total || 0}</span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#10B981', fontWeight: 600 }}>{stats.positivo || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctAcc}%</span></span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#F59E0B', fontWeight: 600 }}>{stats.lavorabile || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctLav}%</span></span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#EF4444', fontWeight: 600 }}>{stats.meno || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctPer}%</span></span>
                      </div>
                    );})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* PILASTRO COLLABORATORI */}
        {reportData.pilastri.collaboratori && (
          <div id="section-collab" style={{ background: DS.colors.white, borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}>🎓</span>
                <div>
                  <h3 style={{ color: DS.colors.primaryLight, fontSize: 20, margin: 0, fontWeight: 700 }}>PILASTRO COLLABORATORI</h3>
                  <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Funnel: Iscritti → Presenti → Attivati</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => screenshotSection('section-collab', 'Pilastro_Collaboratori')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Camera size={16} /></button>
                {reportData.periodoRiferimento && (
                  <div style={{ background: '#F5F3FF', padding: '6px 12px', borderRadius: 8, border: '1px solid #C4B5FD' }}>
                    <span style={{ fontSize: 11, color: DS.colors.seminari, fontWeight: 600 }}><Calendar size={16} /> {reportData.periodoRiferimento.label}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* FUNNEL - Usa NUOVI attivati, non totale */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 25, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: DS.colors.primaryLight }}>{reportData.pilastri.collaboratori.funnel.iscritti}</div>
                <div style={{ fontSize: 12, color: '#666' }}>📝 Iscritti</div>
              </div>
              <div style={{ fontSize: 24, color: '#E0E0E0' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.funnel.presenti}</div>
                <div style={{ fontSize: 12, color: '#4CAF50' }}><CheckCircle size={16} /> Presenti <span style={{ fontSize: 10 }}>({reportData.pilastri.collaboratori.funnel.pctPresenti}%)</span></div>
              </div>
              <div style={{ fontSize: 24, color: '#E0E0E0' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#FF9800' }}>{reportData.pilastri.collaboratori.ivdDettaglio?.nuovi || reportData.pilastri.collaboratori.funnel.attivati}</div>
                <div style={{ fontSize: 12, color: '#FF9800' }}> Nuovi Attivati <span style={{ fontSize: 10 }}>({reportData.pilastri.collaboratori.funnel.presenti > 0 ? Math.round((reportData.pilastri.collaboratori.ivdDettaglio?.nuovi || reportData.pilastri.collaboratori.funnel.attivati) / reportData.pilastri.collaboratori.funnel.presenti * 100) : 0}%)</span></div>
                {reportData.pilastri.collaboratori.ivdDettaglio?.rinnovi > 0 && (
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>+ {reportData.pilastri.collaboratori.ivdDettaglio.rinnovi} rinnovi</div>
                )}
              </div>
            </div>
            
            {/* DETTAGLIO IVD COMPLETO */}
            {reportData.pilastri.collaboratori.ivdDettaglio && (
              <div style={{ background: 'linear-gradient(135deg, #FFF8E1, #FFF3E0)', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid #FFE082' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}><Users size={16} /></span>
                  <div>
                    <h4 style={{ color: '#F57C00', fontSize: 14, margin: 0, fontWeight: 700 }}>DETTAGLIO IVD ATTIVATI</h4>
                    <p style={{ color: '#8D6E63', fontSize: 10, margin: 0 }}>Nuovi, Rinnovi, Stati contratto e VipOffice</p>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                  {/* PRODOTTI */}
                  <div style={{ background: DS.colors.white, borderRadius: 12, padding: 14, border: '1px solid #E0E0E0' }}>
                    <div style={{ fontSize: 10, color: '#9E9E9E', marginBottom: 8, fontWeight: 600 }}><Briefcase size={16} /> PRODOTTI</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}> START&GO</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.ivdDettaglio.nuoviStartGo}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}> STANDARD</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#2196F3' }}>{reportData.pilastri.collaboratori.ivdDettaglio.nuoviStandard}</span>
                      </div>
                      <div style={{ height: 1, background: '#E0E0E0', margin: '4px 0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}> Rinn. 12m</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#9C27B0' }}>{reportData.pilastri.collaboratori.ivdDettaglio.rinnoviMensili}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}> Rinn. Anno</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#673AB7' }}>{reportData.pilastri.collaboratori.ivdDettaglio.rinnoviAnnuali}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed #E0E0E0', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10, color: '#888' }}>Nuovi: <strong style={{ color: '#4CAF50' }}>{reportData.pilastri.collaboratori.ivdDettaglio.nuovi}</strong></span>
                      <span style={{ fontSize: 10, color: '#888' }}>Rinnovi: <strong style={{ color: '#9C27B0' }}>{reportData.pilastri.collaboratori.ivdDettaglio.rinnovi}</strong></span>
                    </div>
                  </div>
                  
                  {/* STATO CONTRATTO */}
                  <div style={{ background: DS.colors.white, borderRadius: 12, padding: 14, border: '1px solid #E0E0E0' }}>
                    <div style={{ fontSize: 10, color: '#9E9E9E', marginBottom: 8, fontWeight: 600 }}><FileText size={16} /> STATO CONTRATTO</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}><CheckCircle size={16} /> Accettato</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.ivdDettaglio.accettati}</span>
                          <span style={{ fontSize: 10, color: '#4CAF50', background: '#E8F5E9', padding: '2px 6px', borderRadius: 10 }}>{reportData.pilastri.collaboratori.ivdDettaglio.pctAccettati}%</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}><XCircle size={16} /> Recesso</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: '#F44336' }}>{reportData.pilastri.collaboratori.ivdDettaglio.recessi}</span>
                          <span style={{ fontSize: 10, color: '#F44336', background: '#FFEBEE', padding: '2px 6px', borderRadius: 10 }}>{reportData.pilastri.collaboratori.ivdDettaglio.pctRecessi}%</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}>⏳ Sospeso</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#FF9800' }}>{reportData.pilastri.collaboratori.ivdDettaglio.sospesi}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* VIPOFFICE */}
                  <div style={{ background: DS.colors.white, borderRadius: 12, padding: 14, border: '1px solid #E0E0E0' }}>
                    <div style={{ fontSize: 10, color: '#9E9E9E', marginBottom: 8, fontWeight: 600 }}><Building2 size={16} /> STATO VIPOFFICE</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}> Active</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.ivdDettaglio.vipActive}</span>
                          <span style={{ fontSize: 10, color: '#4CAF50', background: '#E8F5E9', padding: '2px 6px', borderRadius: 10 }}>{reportData.pilastri.collaboratori.ivdDettaglio.pctVipActive}%</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#666' }}> Inactive</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: '#F44336' }}>{reportData.pilastri.collaboratori.ivdDettaglio.vipInactive}</span>
                          <span style={{ fontSize: 10, color: '#F44336', background: '#FFEBEE', padding: '2px 6px', borderRadius: 10 }}>{reportData.pilastri.collaboratori.ivdDettaglio.pctVipInactive}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Alert inattivi */}
                    {reportData.pilastri.collaboratori.ivdDettaglio.accettatiMaInattivi > 0 && (
                      <div style={{ marginTop: 10, padding: 8, background: '#FFF3E0', borderRadius: 8, border: '1px solid #FFB74D' }}>
                        <div style={{ fontSize: 10, color: '#E65100', fontWeight: 600 }}>
                          <AlertTriangle size={16} /> {reportData.pilastri.collaboratori.ivdDettaglio.accettatiMaInattivi} Accettati ma INATTIVI
                        </div>
                        <div style={{ fontSize: 9, color: '#8D6E63', marginTop: 2 }}>Da riattivare/contattare</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Barra riepilogo totali */}
                <div style={{ background: DS.colors.white, borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid #E0E0E0' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#FF9800' }}>{reportData.pilastri.collaboratori.ivdDettaglio.totale}</div>
                    <div style={{ fontSize: 9, color: '#888' }}>TOTALE IVD</div>
                  </div>
                  <div style={{ width: 1, height: 30, background: '#E0E0E0' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.ivdDettaglio.nuovi}</div>
                    <div style={{ fontSize: 9, color: '#888' }}>NUOVI</div>
                  </div>
                  <div style={{ width: 1, height: 30, background: '#E0E0E0' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#9C27B0' }}>{reportData.pilastri.collaboratori.ivdDettaglio.rinnovi}</div>
                    <div style={{ fontSize: 9, color: '#888' }}>RINNOVI</div>
                  </div>
                  <div style={{ width: 1, height: 30, background: '#E0E0E0' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#4CAF50' }}>{reportData.pilastri.collaboratori.ivdDettaglio.vipActive}</div>
                    <div style={{ fontSize: 9, color: '#888' }}>VIP ACTIVE</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* DETTAGLIO STATI COLLABORATORI */}
            {reportData.pilastri.collaboratori.statiDettaglio && reportData.pilastri.collaboratori.statiDettaglio.length > 0 && (
              <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 15, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 600 }}><FileText size={16} /> DETTAGLIO STATI</div>
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
                          <div style={{ fontSize: 11, color: DS.colors.primaryLight, fontWeight: 600, marginBottom: 8 }}>📝 ISCRITTI ({iscritti.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {iscritti.map(([stato, count], i) => (
                              <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #2AAA8A' }}>
                                {stato} <strong style={{ color: DS.colors.primaryLight }}>{count}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {presenti.length > 0 && (
                        <div style={{ background: 'rgba(76,175,80,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(76,175,80,0.3)' }}>
                          <div style={{ fontSize: 11, color: '#4CAF50', fontWeight: 600, marginBottom: 8 }}><CheckCircle size={16} /> PRESENTI ({presenti.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {presenti.map(([stato, count], i) => (
                              <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #4CAF50' }}>
                                {stato} <strong style={{ color: '#4CAF50' }}>{count}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {attivati.length > 0 && (
                        <div style={{ background: 'rgba(255,152,0,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(255,152,0,0.3)' }}>
                          <div style={{ fontSize: 11, color: '#FF9800', fontWeight: 600, marginBottom: 8 }}> ATTIVATI ({attivati.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {attivati.map(([stato, count], i) => (
                              <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #FF9800' }}>
                                {stato} <strong style={{ color: '#FF9800' }}>{count}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {altri.length > 0 && (
                        <div style={{ background: 'rgba(158,158,158,0.08)', borderRadius: 10, padding: 12, border: '1px solid rgba(158,158,158,0.3)' }}>
                          <div style={{ fontSize: 11, color: '#666', fontWeight: 600, marginBottom: 8 }}><FileText size={16} /> ALTRI ({altri.reduce((s,[,c]) => s+c, 0)})</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {altri.map(([stato, count], i) => (
                              <span key={i} style={{ background: DS.colors.white, padding: '4px 10px', borderRadius: 15, fontSize: 10, color: '#333', border: '1px solid #9E9E9E' }}>
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
            
            {/* CLASSIFICHE COLLAB CON 4 COLONNE + % */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { title: 'K MANAGER', icon: Crown, data: reportData.pilastri.collaboratori.classifiche.k, color: DS.colors.la },
                { title: 'NETWORKER', icon: Star, data: reportData.pilastri.collaboratori.classifiche.nw, color: DS.colors.fv },
                { title: 'SDP', emoji: '', data: reportData.pilastri.collaboratori.classifiche.sdp, color: '#2563EB' }
              ].map(({ title, emoji, data, color }) => (
                <div key={title} style={{ background: DS.colors.gray50, borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: 13, color: color, fontWeight: 700, marginBottom: 12 }}>{emoji} {title} <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 400 }}>({data.length})</span></div>
                  {/* Header 4 colonne */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 50px)', gap: 4, marginBottom: 8, paddingBottom: 8, borderBottom: '2px solid #E5E7EB' }}>
                    <span style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 600 }}>Nome</span>
                    <span style={{ fontSize: 9, color: '#3B82F6', fontWeight: 600, textAlign: 'center' }}>Iscr</span>
                    <span style={{ fontSize: 9, color: '#10B981', fontWeight: 600, textAlign: 'center' }}>Pres</span>
                    <span style={{ fontSize: 9, color: '#EF4444', fontWeight: 600, textAlign: 'center' }}>Ass</span>
                    <span style={{ fontSize: 9, color: '#F59E0B', fontWeight: 600, textAlign: 'center' }}>Att</span>
                  </div>
                  <div style={{ maxHeight: 350, overflowY: 'auto' }}>
                    {data.map(([name, stats], i) => {
                      const tot = stats.iscritti || stats.total || 1;
                      const pctPres = Math.round((stats.presenti || 0) / tot * 100);
                      const pctAss = Math.round((stats.assenti || 0) / tot * 100);
                      return (
                      <div key={i} style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr repeat(4, 50px)', 
                        gap: 4, 
                        padding: '6px 0', 
                        borderBottom: '1px solid #F3F4F6', 
                        fontSize: 11,
                        background: i < 3 ? `${color}08` : 'transparent'
                      }}>
                        <span style={{ color: DS.colors.gray800, fontWeight: i < 3 ? 700 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {i < 3 ? ['1°','2°','3°'][i] : `${i+1}°`} {name.length > 12 ? name.substring(0,12) + '...' : name}
                        </span>
                        <span style={{ color: '#3B82F6', fontWeight: 600, textAlign: 'center' }}>{stats.iscritti || stats.total || 0}</span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#10B981', fontWeight: 600 }}>{stats.presenti || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctPres}%</span></span>
                        <span style={{ textAlign: 'center' }}><span style={{ color: '#EF4444', fontWeight: 600 }}>{stats.assenti || 0}</span><span style={{ fontSize: 8, color: '#9CA3AF' }}> {pctAss}%</span></span>
                        <span style={{ color: '#F59E0B', fontWeight: 600, textAlign: 'center' }}>{stats.attivati || 0}</span>
                      </div>
                    );})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ALERT DA ATTIVARE - FULL WIDTH, PIÙ SPAZIOSO */}
        {reportData.alertDaAttivare && reportData.alertDaAttivare.totale > 0 && (
          <div style={{ background: DS.colors.white, borderRadius: 16, padding: 20, border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>🚨</span>
                <div>
                  <h3 style={{ color: DS.colors.danger, fontSize: 18, margin: 0, fontWeight: 700 }}>Alert Da Attivare</h3>
                  <p style={{ color: DS.colors.gray500, fontSize: 12, margin: '4px 0 0' }}>Contratti Luce Amica in attesa attivazione fornitura</p>
                </div>
              </div>
              <div style={{ fontSize: 12, color: DS.colors.gray500 }}>
                Totale: <strong style={{ color: DS.colors.danger, fontSize: 16 }}>{reportData.alertDaAttivare.totale}</strong>
              </div>
            </div>
            
            {/* FUNNEL NUMERI - PIÙ GRANDE E SPAZIOSO */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 16, 
              marginBottom: 24, 
              padding: 20, 
              background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFBEB 50%, #FEF2F2 100%)', 
              borderRadius: 16 
            }}>
              <div style={{ textAlign: 'center', padding: 16, background: DS.colors.white, borderRadius: 12, border: '2px solid #BBF7D0' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: DS.colors.fv }}>{reportData.alertDaAttivare.verde.length}</div>
                <div style={{ fontSize: 12, color: DS.colors.fv, fontWeight: 600, marginTop: 4 }}> 0-30 giorni</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500, marginTop: 2 }}>Da sollecitare</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: DS.colors.white, borderRadius: 12, border: '2px solid #FCD34D' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: DS.colors.la }}>{reportData.alertDaAttivare.giallo.length}</div>
                <div style={{ fontSize: 12, color: DS.colors.la, fontWeight: 600, marginTop: 4 }}>🟡 31-60 giorni</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500, marginTop: 2 }}>Urgente</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: DS.colors.white, borderRadius: 12, border: '2px solid #FECACA' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: DS.colors.danger }}>{reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length}</div>
                <div style={{ fontSize: 12, color: DS.colors.danger, fontWeight: 600, marginTop: 4 }}> 61-150 giorni</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500, marginTop: 2 }}>Critico</div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: DS.colors.white, borderRadius: 12, border: '2px solid #D1D5DB' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: DS.colors.gray500 }}>{reportData.alertDaAttivare.rosso.filter(a => a.giorni > 150).length}</div>
                <div style={{ fontSize: 12, color: DS.colors.gray500, fontWeight: 600, marginTop: 4 }}>⚫ Oltre 150g</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500, marginTop: 2 }}>Da riformulare</div>
              </div>
            </div>
            
            {/* 3 LISTE AFFIANCATE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {/* VERDE 0-30g */}
              <div style={{ background: '#F0FDF4', borderRadius: 12, padding: 16, border: '1px solid #BBF7D0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: DS.colors.fv, fontWeight: 700 }}> VERDE (0-30g): {reportData.alertDaAttivare.verde.length}</span>
                  <button onClick={() => {
                    const csv = 'Cliente;Intermediario;Giorni\n' + reportData.alertDaAttivare.verde.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
                    const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                    const link = document.createElement('a'); link.href = url; link.download = 'alert_verde_0-30g.csv'; link.click();
                  }} style={{ padding: '6px 12px', background: DS.colors.fv, color: DS.colors.white, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}><Download size={16} /> CSV</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, fontSize: 10, color: DS.colors.gray500, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #BBF7D0' }}>
                  <span style={{ fontWeight: 600 }}>Cliente</span>
                  <span style={{ fontWeight: 600 }}>Intermediario</span>
                  <span style={{ fontWeight: 600, textAlign: 'right' }}>Giorni</span>
                </div>
                <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                  {reportData.alertDaAttivare.verde.slice(0,8).map((a,i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, padding: '8px 4px', fontSize: 11, background: i % 2 === 0 ? 'transparent' : DS.colors.white, borderRadius: 4 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: DS.colors.gray800 }}>{a.cliente}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: DS.colors.gray500 }}>{a.intermediario}</span>
                      <span style={{ textAlign: 'right', color: DS.colors.fv, fontWeight: 700 }}>{a.giorni}g</span>
                    </div>
                  ))}
                  {reportData.alertDaAttivare.verde.length > 8 && <div style={{ color: DS.colors.gray500, fontStyle: 'italic', padding: '8px 4px', fontSize: 10 }}>...e altri {reportData.alertDaAttivare.verde.length - 8}</div>}
                </div>
              </div>
              
              {/* GIALLO 31-60g */}
              <div style={{ background: '#FFFBEB', borderRadius: 12, padding: 16, border: '1px solid #FCD34D' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: DS.colors.la, fontWeight: 700 }}>🟡 GIALLO (31-60g): {reportData.alertDaAttivare.giallo.length}</span>
                  <button onClick={() => {
                    const csv = 'Cliente;Intermediario;Giorni\n' + reportData.alertDaAttivare.giallo.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
                    const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                    const link = document.createElement('a'); link.href = url; link.download = 'alert_giallo_31-60g.csv'; link.click();
                  }} style={{ padding: '6px 12px', background: DS.colors.la, color: DS.colors.white, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}><Download size={16} /> CSV</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, fontSize: 10, color: DS.colors.gray500, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #FCD34D' }}>
                  <span style={{ fontWeight: 600 }}>Cliente</span>
                  <span style={{ fontWeight: 600 }}>Intermediario</span>
                  <span style={{ fontWeight: 600, textAlign: 'right' }}>Giorni</span>
                </div>
                <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                  {reportData.alertDaAttivare.giallo.slice(0,8).map((a,i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, padding: '8px 4px', fontSize: 11, background: i % 2 === 0 ? 'transparent' : DS.colors.white, borderRadius: 4 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: DS.colors.gray800 }}>{a.cliente}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: DS.colors.gray500 }}>{a.intermediario}</span>
                      <span style={{ textAlign: 'right', color: DS.colors.la, fontWeight: 700 }}>{a.giorni}g</span>
                    </div>
                  ))}
                  {reportData.alertDaAttivare.giallo.length > 8 && <div style={{ color: DS.colors.gray500, fontStyle: 'italic', padding: '8px 4px', fontSize: 10 }}>...e altri {reportData.alertDaAttivare.giallo.length - 8}</div>}
                </div>
              </div>
              
              {/* ROSSO 61-150g */}
              <div style={{ background: '#FEF2F2', borderRadius: 12, padding: 16, border: '1px solid #FECACA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: DS.colors.danger, fontWeight: 700 }}> ROSSO (61-150g): {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length}</span>
                  <button onClick={() => {
                    const filtered = reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150);
                    const csv = 'Cliente;Intermediario;Giorni\n' + filtered.map(a => `${a.cliente};${a.intermediario};${a.giorni}`).join('\n');
                    const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                    const link = document.createElement('a'); link.href = url; link.download = 'alert_rosso_61-150g.csv'; link.click();
                  }} style={{ padding: '6px 12px', background: DS.colors.danger, color: DS.colors.white, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}><Download size={16} /> CSV</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, fontSize: 10, color: DS.colors.gray500, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #FECACA' }}>
                  <span style={{ fontWeight: 600 }}>Cliente</span>
                  <span style={{ fontWeight: 600 }}>Intermediario</span>
                  <span style={{ fontWeight: 600, textAlign: 'right' }}>Giorni</span>
                </div>
                <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                  {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).slice(0,8).map((a,i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 50px', gap: 8, padding: '8px 4px', fontSize: 11, background: i % 2 === 0 ? 'transparent' : DS.colors.white, borderRadius: 4 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: DS.colors.gray800 }}>{a.cliente}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: DS.colors.gray500 }}>{a.intermediario}</span>
                      <span style={{ textAlign: 'right', color: DS.colors.danger, fontWeight: 700 }}>{a.giorni}g</span>
                    </div>
                  ))}
                  {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length > 8 && <div style={{ color: DS.colors.gray500, fontStyle: 'italic', padding: '8px 4px', fontSize: 10 }}>...e altri {reportData.alertDaAttivare.rosso.filter(a => a.giorni <= 150).length - 8}</div>}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* TRACKER COACHING - COMPLETO CON CLASSIFICA SCORE */}
        {reportData.trackerCoaching && reportData.trackerCoaching.totale > 0 && (
          <div id="section-tracker" style={{ background: DS.colors.white, borderRadius: 16, padding: 20, border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}><Target size={16} /></span>
                <div>
                  <h3 style={{ color: DS.colors.primaryLight, fontSize: 18, margin: 0, fontWeight: 700 }}>Tracker Coaching - Nuovi IVD Livello 1</h3>
                  <p style={{ color: DS.colors.gray500, fontSize: 12, margin: '4px 0 0' }}>Monitoraggio produzione propria dei {reportData.trackerCoaching.totale} nuovi attivati</p>
                </div>
              </div>
              <button onClick={() => {
                const csv = 'Nome IVD;Punti;%LA;%FV;1°LA;1°FV;1°Iscr;1°Att;Score\n' + 
                  reportData.trackerCoaching.lista.filter(t => t.puntiTotali > 0).map(t => 
                    `${t.nome};${t.puntiTotali};${t.pctLA}%;${t.pctFV}%;${t.giorniLA !== null ? t.giorniLA+'g' : '-'};${t.giorniFV !== null ? t.giorniFV+'g' : '-'};${t.giorniIscritto !== null ? t.giorniIscritto+'g' : '-'};${t.giorniAttivato !== null ? t.giorniAttivato+'g' : '-'};${t.score}`
                  ).join('\n');
                const blob = new Blob([csv], {type: 'text/csv'}); const url = URL.createObjectURL(blob);
                const link = document.createElement('a'); link.href = url; link.download = 'classifica_produzione_propria.csv'; link.click();
              }} style={{ padding: '8px 16px', background: DS.colors.primaryLight, color: DS.colors.white, border: 'none', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}><Download size={16} /> Scarica CSV</button>
            </div>
            
            {/* FUNNEL PRODUZIONE */}
            <div style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid #BBF7D0' }}>
              <div style={{ fontSize: 12, color: DS.colors.fv, fontWeight: 700, marginBottom: 16 }}><BarChart3 size={16} /> FUNNEL PRODUZIONE NUOVI ATTIVATI</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', padding: '12px 20px', background: DS.colors.white, borderRadius: 12, border: '2px solid #2AAA8A' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: DS.colors.primaryLight }}>{reportData.trackerCoaching.totale}</div>
                  <div style={{ fontSize: 10, color: '#666' }}>NUOVI ATTIVATI</div>
                </div>
                <div style={{ fontSize: 20, color: '#BBF7D0' }}>→</div>
                <div style={{ textAlign: 'center', padding: '12px 20px', background: DS.colors.white, borderRadius: 12, border: '2px solid #4CAF50' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#4CAF50' }}>{reportData.trackerCoaching.funnel?.vipActive || Math.round(reportData.trackerCoaching.totale * 0.8)}</div>
                  <div style={{ fontSize: 10, color: '#666' }}>ACTIVE VipOffice</div>
                </div>
                <div style={{ fontSize: 20, color: '#BBF7D0' }}>→</div>
                <div style={{ textAlign: 'center', padding: '12px 20px', background: DS.colors.white, borderRadius: 12, border: '2px solid #10B981' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#10B981' }}>{reportData.trackerCoaching.ivdConContratti}</div>
                  <div style={{ fontSize: 10, color: '#666' }}>CON PRODUZIONE</div>
                  <div style={{ fontSize: 9, color: '#10B981', marginTop: 4 }}>{Math.round(reportData.trackerCoaching.ivdConContratti / reportData.trackerCoaching.totale * 100)}%</div>
                </div>
              </div>
              {/* Sotto-funnel produzione */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 }}>
                <div style={{ textAlign: 'center', padding: '8px 16px', background: '#ECFDF5', borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: DS.colors.fv }}>{reportData.trackerCoaching.funnel?.conLA || reportData.trackerCoaching.puntiStats?.contrattiLA || 0}</div>
                  <div style={{ fontSize: 9, color: '#666' }}>con LA</div>
                </div>
                <div style={{ textAlign: 'center', padding: '8px 16px', background: '#FFFBEB', borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: DS.colors.la }}>{reportData.trackerCoaching.funnel?.conFV || reportData.trackerCoaching.puntiStats?.contrattiFV || 0}</div>
                  <div style={{ fontSize: 9, color: '#666' }}>con FV</div>
                </div>
                <div style={{ textAlign: 'center', padding: '8px 16px', background: '#F5F3FF', borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#6D28D9' }}>{reportData.trackerCoaching.funnel?.con1Iscritto || 0}</div>
                  <div style={{ fontSize: 9, color: '#666' }}>con 1° Iscritto</div>
                </div>
                <div style={{ textAlign: 'center', padding: '8px 16px', background: '#FFF7ED', borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#EA580C' }}>{reportData.trackerCoaching.funnel?.con1Attivato || 0}</div>
                  <div style={{ fontSize: 9, color: '#666' }}>con 1° Attivato</div>
                </div>
              </div>
            </div>
            
            {/* METRICHE VELOCITÀ + PRODUZIONE PROPRIA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#F0FDF4', borderRadius: 12, padding: 16, textAlign: 'center', border: '2px solid #BBF7D0' }}>
                <div style={{ fontSize: 10, color: DS.colors.fv, fontWeight: 600, marginBottom: 4 }}><Zap size={16} /> Prima LA</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: DS.colors.fv }}>{reportData.trackerCoaching.medie.la !== null ? reportData.trackerCoaching.medie.la : '-'}</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>giorni</div>
                <div style={{ fontSize: 10, color: '#10B981', fontWeight: 600, marginTop: 4 }}>{reportData.trackerCoaching.completamento.la}%</div>
              </div>
              <div style={{ background: '#FFFBEB', borderRadius: 12, padding: 16, textAlign: 'center', border: '2px solid #FCD34D' }}>
                <div style={{ fontSize: 10, color: DS.colors.la, fontWeight: 600, marginBottom: 4 }}><Sun size={16} /> Primo FV</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: DS.colors.la }}>{reportData.trackerCoaching.medie.fv !== null ? reportData.trackerCoaching.medie.fv : '-'}</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>giorni</div>
                <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 600, marginTop: 4 }}>{reportData.trackerCoaching.completamento.fv}%</div>
              </div>
              <div style={{ background: '#F5F3FF', borderRadius: 12, padding: 16, textAlign: 'center', border: '2px solid #C4B5FD' }}>
                <div style={{ fontSize: 10, color: '#6D28D9', fontWeight: 600, marginBottom: 4 }}>🎓 1° Iscritto</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#6D28D9' }}>{reportData.trackerCoaching.medie.iscritto !== null ? reportData.trackerCoaching.medie.iscritto : '-'}</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>giorni</div>
                <div style={{ fontSize: 10, color: '#8B5CF6', fontWeight: 600, marginTop: 4 }}>{reportData.trackerCoaching.completamento.iscritto}%</div>
              </div>
              <div style={{ background: '#FFF7ED', borderRadius: 12, padding: 16, textAlign: 'center', border: '2px solid #FDBA74' }}>
                <div style={{ fontSize: 10, color: '#EA580C', fontWeight: 600, marginBottom: 4 }}><Users size={16} /> 1° Attivato</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#EA580C' }}>{reportData.trackerCoaching.medie.attivato !== null ? reportData.trackerCoaching.medie.attivato : '-'}</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500 }}>giorni</div>
                <div style={{ fontSize: 10, color: '#F97316', fontWeight: 600, marginTop: 4 }}>{reportData.trackerCoaching.completamento.attivato}%</div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #2AAA8A 0%, #20917A 100%)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: DS.colors.white, fontWeight: 600, marginBottom: 4 }}><Star size={16} /> PROD. PROPRIA</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: DS.colors.white }}>{reportData.trackerCoaching.puntiStats?.media || 0}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>pt/IVD</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>({reportData.trackerCoaching.puntiStats?.mediaProduttivi || 0} se produttivo)</div>
              </div>
            </div>
            
            {/* CLASSIFICA COMPLETA PRODUZIONE PROPRIA */}
            <div style={{ background: DS.colors.gray50, borderRadius: 12, padding: 16, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: DS.colors.gray700, fontWeight: 700 }}><Trophy size={16} /> Classifica Produzione Propria ({reportData.trackerCoaching.ivdConContratti} IVD produttivi)</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500, fontStyle: 'italic' }}>Ordinata per PUNTI • Score = bonus velocità</div>
              </div>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 70px 50px 50px 55px 55px 55px 55px 70px', gap: 6, marginBottom: 8, paddingBottom: 8, borderBottom: '2px solid #E5E7EB' }}>
                <span style={{ fontSize: 9, color: DS.colors.gray500, fontWeight: 600 }}>#</span>
                <span style={{ fontSize: 9, color: DS.colors.gray500, fontWeight: 600 }}>NOME</span>
                <span style={{ fontSize: 9, color: DS.colors.primaryLight, fontWeight: 600, textAlign: 'center' }}>PUNTI ⬇️</span>
                <span style={{ fontSize: 9, color: DS.colors.fv, fontWeight: 600, textAlign: 'center' }}>%LA</span>
                <span style={{ fontSize: 9, color: DS.colors.la, fontWeight: 600, textAlign: 'center' }}>%FV</span>
                <span style={{ fontSize: 9, color: DS.colors.fv, fontWeight: 600, textAlign: 'center' }}>1°LA</span>
                <span style={{ fontSize: 9, color: DS.colors.la, fontWeight: 600, textAlign: 'center' }}>1°FV</span>
                <span style={{ fontSize: 9, color: '#6D28D9', fontWeight: 600, textAlign: 'center' }}>1°ISCR</span>
                <span style={{ fontSize: 9, color: '#EA580C', fontWeight: 600, textAlign: 'center' }}>1°ATT</span>
                <span style={{ fontSize: 9, color: DS.colors.danger, fontWeight: 600, textAlign: 'center' }}>SCORE</span>
              </div>
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {reportData.trackerCoaching.lista.filter(t => t.puntiTotali > 0).map((t, i) => {
                  // Calcola se ha tutte e 4 le milestone
                  const haAllMilestones = t.giorniLA !== null && t.giorniFV !== null && t.giorniIscritto !== null && t.giorniAttivato !== null;
                  return (
                  <div key={i} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '30px 1fr 70px 50px 50px 55px 55px 55px 55px 70px', 
                    gap: 6, 
                    padding: '8px 4px', 
                    fontSize: 11, 
                    background: i < 3 ? `rgba(42,170,138,${0.15 - i * 0.04})` : haAllMilestones ? 'rgba(16,185,129,0.08)' : i % 2 === 0 ? 'transparent' : DS.colors.white,
                    borderRadius: 4,
                    borderLeft: haAllMilestones ? '3px solid #10B981' : 'none'
                  }}>
                    <span style={{ fontWeight: i < 3 ? 700 : 400, color: DS.colors.gray800 }}>
                      {<PositionBadge position={i+1} size="sm" />}
                    </span>
                    <span style={{ color: DS.colors.gray800, fontWeight: i < 3 ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.nome} {haAllMilestones && <Star size={14} color="#F59E0B" />}
                    </span>
                    <span style={{ textAlign: 'center', color: DS.colors.primaryLight, fontWeight: 700 }}>{t.puntiTotali.toLocaleString('it-IT')}</span>
                    <span style={{ textAlign: 'center', color: DS.colors.fv, fontWeight: 500 }}>{t.pctLA}%</span>
                    <span style={{ textAlign: 'center', color: DS.colors.la, fontWeight: 500 }}>{t.pctFV}%</span>
                    <span style={{ textAlign: 'center', color: t.giorniLA !== null ? DS.colors.fv : '#D1D5DB', fontWeight: t.giorniLA !== null ? 600 : 400 }}>{t.giorniLA !== null ? `${t.giorniLA}g` : '-'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniFV !== null ? DS.colors.la : '#D1D5DB', fontWeight: t.giorniFV !== null ? 600 : 400 }}>{t.giorniFV !== null ? `${t.giorniFV}g` : '-'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniIscritto !== null ? '#6D28D9' : '#D1D5DB', fontWeight: t.giorniIscritto !== null ? 600 : 400 }}>{t.giorniIscritto !== null ? `${t.giorniIscritto}g` : '-'}</span>
                    <span style={{ textAlign: 'center', color: t.giorniAttivato !== null ? '#EA580C' : '#D1D5DB', fontWeight: t.giorniAttivato !== null ? 600 : 400 }}>{t.giorniAttivato !== null ? `${t.giorniAttivato}g` : '-'}</span>
                    <span style={{ textAlign: 'center', color: DS.colors.danger, fontWeight: 700 }}>{t.score?.toLocaleString('it-IT') || 0}</span>
                  </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 12, padding: '10px 14px', background: 'linear-gradient(135deg, #F0FDF4, #ECFDF5)', borderRadius: 8, fontSize: 10, color: '#065F46', border: '1px solid #BBF7D0' }}>
                <strong><BarChart3 size={16} /> Ordinamento:</strong> per PUNTI totali (chi produce di più) • <strong><Star size={16} /> Stella:</strong> ha completato tutte e 4 le milestone • <strong>Score:</strong> Punti × Velocità (bonus per chi parte veloce)
              </div>
            </div>
            
            {/* ALERT */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              <div style={{ background: '#FEF2F2', borderRadius: 8, padding: 12, border: '1px solid #FECACA' }}>
                <div style={{ fontSize: 11, color: DS.colors.danger, fontWeight: 600 }}><AlertTriangle size={16} /> {reportData.trackerCoaching.ivdInattivi} ACTIVE senza produzione</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500, marginTop: 4 }}>Da seguire con coaching</div>
              </div>
              <div style={{ background: '#FFFBEB', borderRadius: 8, padding: 12, border: '1px solid #FCD34D' }}>
                <div style={{ fontSize: 11, color: DS.colors.la, fontWeight: 600 }}><BarChart3 size={16} /> Totale punti: {(reportData.trackerCoaching.puntiStats?.totale || 0).toLocaleString('it-IT')}</div>
                <div style={{ fontSize: 10, color: DS.colors.gray500, marginTop: 4 }}>LA: {Math.round((reportData.trackerCoaching.puntiStats?.totaleLA || 0) / (reportData.trackerCoaching.puntiStats?.totale || 1) * 100)}% | FV: {Math.round((reportData.trackerCoaching.puntiStats?.totaleFV || 0) / (reportData.trackerCoaching.puntiStats?.totale || 1) * 100)}%</div>
              </div>
            </div>
          </div>
        )}
        
        {/*  ANALISI FATTURATO */}
        {reportData.fatturato && (reportData.fatturato.fv.inseriti.contratti > 0 || reportData.fatturato.la.inseriti.contratti > 0) && (
          <div id="section-fatturato" style={{ background: DS.colors.white, borderRadius: 20, padding: 20, border: '1px solid #E0E0E0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ color: DS.colors.primaryLight, fontSize: 18, margin: 0, fontWeight: 700 }}> ANALISI FATTURATO LEADER</h3>
                <p style={{ color: '#666', fontSize: 11, margin: '5px 0 0' }}>Fatturato e punti generati (Inseriti vs Effettivi)</p>
              </div>
              {/* Badge coerenza + Screenshot */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => screenshotSection('section-fatturato', 'Analisi_Fatturato')} style={{ padding: '6px 12px', background: DS.colors.gray100, border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}><Camera size={16} /></button>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: 20, 
                  fontSize: 10, 
                  fontWeight: 600,
                  background: reportData.fatturato.coerenza?.fv?.ok ? '#E8F5E9' : '#FFEBEE',
                  color: reportData.fatturato.coerenza?.fv?.ok ? '#2E7D32' : '#C62828',
                  border: `1px solid ${reportData.fatturato.coerenza?.fv?.ok ? '#A5D6A7' : '#EF9A9A'}`
                }}>
                  {reportData.fatturato.coerenza?.fv?.ok ? <CheckCircle size={18} color="#4CAF50" /> : <AlertTriangle size={18} color="#F59E0B" />} FV: {reportData.fatturato.coerenza?.fv?.fatturatoInseriti || 0}/{reportData.fatturato.coerenza?.fv?.pilastroInseriti || 0}
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
                  {reportData.fatturato.coerenza?.la?.ok ? <CheckCircle size={18} color="#4CAF50" /> : <AlertTriangle size={18} color="#F59E0B" />} LA: {reportData.fatturato.coerenza?.la?.fatturatoInseriti || 0}/{reportData.fatturato.coerenza?.la?.pilastroInseriti || 0}
                </span>
              </div>
            </div>
            
            {/* Alert se non coerente */}
            {(!reportData.fatturato.coerenza?.fv?.ok || !reportData.fatturato.coerenza?.la?.ok) && (
              <div style={{ background: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 11, color: '#E65100' }}>
                <AlertTriangle size={16} /> <strong>Attenzione:</strong> I numeri potrebbero non corrispondere esattamente ai pilastri. 
                FV: Positivi {reportData.fatturato.coerenza?.fv?.fatturatoEffettivi}/{reportData.fatturato.coerenza?.fv?.pilastroPositivi} | 
                LA: Accettati {reportData.fatturato.coerenza?.la?.fatturatoAccettati}/{reportData.fatturato.coerenza?.la?.pilastroAccettati}
              </div>
            )}
            
            {/* RIEPILOGO FV - INSERITI vs EFFETTIVI */}
            <div style={{ background: DS.colors.white, borderRadius: 16, padding: 20, marginBottom: 15, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 14, color: DS.colors.fv, fontWeight: 700 }}><Sun size={16} /> FOTOVOLTAICO</span>
                <span style={{ fontSize: 9, color: DS.colors.gray500 }}>
                  Pilastro: {reportData.fatturato.coerenza?.fv?.pilastroInseriti} ins / {reportData.fatturato.coerenza?.fv?.pilastroPositivi} pos / {reportData.fatturato.coerenza?.fv?.pilastroLavorazione} lav / {reportData.fatturato.coerenza?.fv?.pilastroPersi} persi
                </span>
              </div>
              
              {/* Riga 1: Confronto INSERITI vs EFFETTIVI */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 15 }}>
                {/* Inseriti (Potenziale) */}
                <div style={{ textAlign: 'center', padding: 12, background: DS.colors.gray50, borderRadius: 10, border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: 9, color: DS.colors.gray500, marginBottom: 3 }}><FileText size={16} /> INSERITI (Potenziale)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: DS.colors.gray800 }}>€{reportData.fatturato.fv.inseriti.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.fv?.pilastroInseriti === reportData.fatturato.fv.inseriti.contratti ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{reportData.fatturato.fv.inseriti.contratti} contratti</div>
                </div>
                
                {/* Effettivi (Positivi) */}
                <div style={{ textAlign: 'center', padding: 12, background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: 9, color: DS.colors.fv, marginBottom: 3 }}><CheckCircle size={16} /> EFFETTIVI (Positivi)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: DS.colors.fv }}>€{reportData.fatturato.fv.effettivi.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.fv?.pilastroPositivi === reportData.fatturato.fv.effettivi.contratti ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{reportData.fatturato.fv.effettivi.contratti} contratti</div>
                </div>
                
                {/* In Lavorazione */}
                <div style={{ textAlign: 'center', padding: 12, background: '#FFFBEB', borderRadius: 10, border: '1px solid #FCD34D' }}>
                  <div style={{ fontSize: 9, color: DS.colors.la, marginBottom: 3 }}>⏳ DA SBLOCCARE</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: DS.colors.la }}>€{reportData.fatturato.fv.lavorazione.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.fv?.pilastroLavorazione === reportData.fatturato.fv.lavorazione.contratti ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{reportData.fatturato.fv.lavorazione.contratti} contratti</div>
                </div>
                
                {/* Persi */}
                <div style={{ textAlign: 'center', padding: 12, background: '#FEF2F2', borderRadius: 10, border: '1px solid #FECACA' }}>
                  <div style={{ fontSize: 9, color: DS.colors.danger, marginBottom: 3 }}><XCircle size={16} /> PERSI</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: DS.colors.danger }}>€{reportData.fatturato.fv.persi.totale.toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 10, color: DS.colors.gray500 }}>{reportData.fatturato.fv.persi.contratti} contratti</div>
                </div>
              </div>
              
              {/* Riga 2: Dettagli tecnici */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                <div style={{ textAlign: 'center', padding: 8, background: '#F0FDF4', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: DS.colors.gray500 }}><Zap size={16} /> kWp INSTALLATI</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: DS.colors.fv }}>{reportData.fatturato.fv.effettivi.kw}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: '#F5F3FF', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: DS.colors.gray500 }}>🔋 kWh BATTERIE</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: DS.colors.seminari }}>{reportData.fatturato.fv.effettivi.kwh}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: '#FFFBEB', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: DS.colors.gray500 }}><Star size={16} /> PUNTI EFFETTIVI</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: DS.colors.la }}>{reportData.fatturato.fv.effettivi.punti.toLocaleString('it-IT')}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 8, background: '#D1FAE5', borderRadius: 8, border: '1px solid #6EE7B7' }}>
                  <div style={{ fontSize: 9, color: '#065F46' }}><CheckCircle size={16} /> PUNTI ACCETTATI</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: DS.colors.success }}>{(reportData.fatturato.fv.accettatiPunti?.punti || reportData.fatturato.fv.effettivi.punti).toLocaleString('it-IT')}</div>
                  {reportData.fatturato.fv.accettatiPunti?.aacContratti > 0 && (
                    <div style={{ fontSize: 8, color: DS.colors.gray500 }}>+{reportData.fatturato.fv.accettatiPunti.aacContratti} AAC</div>
                  )}
                </div>
              </div>
            </div>
            
            {/* RIEPILOGO LA - FATTURATO + PUNTI */}
            <div style={{ background: DS.colors.white, borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 14, color: DS.colors.la, fontWeight: 700 }}><Zap size={16} /> LUCE AMICA</span>
                <span style={{ fontSize: 9, color: DS.colors.gray500 }}>
                  Pilastro: {reportData.fatturato.coerenza?.la?.pilastroInseriti} ins / {reportData.fatturato.coerenza?.la?.pilastroAccettati} acc / {reportData.fatturato.coerenza?.la?.pilastroInFornitura} attivi
                </span>
              </div>
              
              {/* Riga 1: FATTURATO POTENZIALE (basato su Accettati Contratto) */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: 10, color: DS.colors.la, fontWeight: 600, marginBottom: 8 }}> FATTURATO POTENZIALE (Stato Contratto = Accettato)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  <div style={{ textAlign: 'center', padding: 12, background: DS.colors.gray50, borderRadius: 10, border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: 9, color: DS.colors.gray500, marginBottom: 3 }}><FileText size={16} /> INSERITI</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: DS.colors.gray800 }}>€{Math.round(reportData.fatturato.la.inseriti.totale).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>{reportData.fatturato.la.inseriti.contratti} contr.</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: '#FFFBEB', borderRadius: 10, border: '1px solid #FCD34D' }}>
                    <div style={{ fontSize: 9, color: DS.colors.la, marginBottom: 3 }}><CheckCircle size={16} /> POTENZIALE/ANNO</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: DS.colors.la }}>€{Math.round(reportData.fatturato.la.accettatiPunti.totale).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.la?.pilastroAccettati === reportData.fatturato.la.accettatiPunti.contratti ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{reportData.fatturato.la.accettatiPunti.contratti} accettati</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: '#FEF3C7', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: DS.colors.la, marginBottom: 3 }}><Calendar size={16} /> POTENZ./MESE</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#92400E' }}>€{Math.round(reportData.fatturato.la.accettatiPunti.totale / 12).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>/mese</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: '#F0FDF4', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: DS.colors.fv, marginBottom: 3 }}>🍃 kWh GREEN</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: DS.colors.fv }}>{reportData.fatturato.la.accettatiPunti.kwh.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>/anno</div>
                  </div>
                </div>
              </div>
              
              {/* Riga 2: FATTURATO EFFETTIVO (basato su Attivi Fornitura - ad oggi) */}
              <div style={{ marginBottom: 15 }}>
                <div style={{ fontSize: 10, color: DS.colors.fv, fontWeight: 600, marginBottom: 8 }}> FATTURATO EFFETTIVO AD OGGI (Stato Fornitura = Attivo/In fornitura)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  <div style={{ textAlign: 'center', padding: 12, background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
                    <div style={{ fontSize: 9, color: DS.colors.fv, marginBottom: 3 }}><CheckCircle size={16} /> ATTIVI OGGI</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: DS.colors.fv }}>{reportData.fatturato.la.attiviEffettivi.contratti}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>in fornitura</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: '#DCFCE7', borderRadius: 10, border: '1px solid #86EFAC' }}>
                    <div style={{ fontSize: 9, color: DS.colors.fv, marginBottom: 3 }}> EFFETTIVO/ANNO</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#166534' }}>€{Math.round(reportData.fatturato.la.attiviEffettivi.totale).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>ricorrente</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: '#F0FDF4', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: DS.colors.fv, marginBottom: 3 }}><Calendar size={16} /> EFFETT./MESE</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: DS.colors.fv }}>€{Math.round(reportData.fatturato.la.attiviEffettivi.totale / 12).toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>/mese</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: '#F0FDF4', borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: DS.colors.fv, marginBottom: 3 }}>🍃 kWh GREEN</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: DS.colors.fv }}>{reportData.fatturato.la.attiviEffettivi.kwh.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>/anno</div>
                  </div>
                </div>
              </div>
              
              {/* Riga 3: PUNTI (basati su Accettato Contratto - anche se poi cessa, pagano!) */}
              <div>
                <div style={{ fontSize: 10, color: DS.colors.la, fontWeight: 600, marginBottom: 8 }}><Star size={16} /> PUNTI LA (Stato Contratto = Accettato) - anche se poi cessa, pagano!</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  <div style={{ textAlign: 'center', padding: 12, background: DS.colors.gray50, borderRadius: 10, border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: 9, color: DS.colors.gray500, marginBottom: 3 }}><FileText size={16} /> INSERITI</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: DS.colors.gray800 }}>{reportData.fatturato.la.inseriti.punti.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>{reportData.fatturato.la.inseriti.contratti} contratti</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: '#FFFBEB', borderRadius: 10, border: '1px solid #FCD34D' }}>
                    <div style={{ fontSize: 9, color: DS.colors.la, marginBottom: 3 }}><CheckCircle size={16} /> ACCETTATI (punti)</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: DS.colors.la }}>{reportData.fatturato.la.accettatiPunti.punti.toLocaleString('it-IT')}</div>
                    <div style={{ fontSize: 10, color: reportData.fatturato.coerenza?.la?.pilastroAccettati === reportData.fatturato.la.accettatiPunti.contratti ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{reportData.fatturato.la.accettatiPunti.contratti} contratti</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: DS.colors.gray50, borderRadius: 10 }}>
                    <div style={{ fontSize: 9, color: DS.colors.gray500, marginBottom: 3 }}><BarChart3 size={16} /> % CONVERSIONE</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: DS.colors.gray800 }}>{reportData.fatturato.la.inseriti.contratti > 0 ? Math.round(reportData.fatturato.la.accettatiPunti.contratti / reportData.fatturato.la.inseriti.contratti * 100) : 0}%</div>
                    <div style={{ fontSize: 10, color: DS.colors.gray500 }}>punti guadagnati</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* TOTALE COMPLESSIVO LEADER */}
            <div style={{ background: 'linear-gradient(135deg, #2AAA8A 0%, #20917A 100%)', borderRadius: 16, padding: 20, marginBottom: 10, color: DS.colors.white, textAlign: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}> FATTURATO TOTALE EFFETTIVO</div>
                  <div style={{ fontSize: 36, fontWeight: 800 }}>€{(reportData.fatturato.fv.effettivi.totale + reportData.fatturato.la.attiviEffettivi.totale).toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>FV positivi + LA attivi annuo</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}><Star size={16} /> PUNTI TOTALI EFFETTIVI</div>
                  <div style={{ fontSize: 36, fontWeight: 800 }}>{ (reportData.fatturato.fv.effettivi.punti + reportData.fatturato.la.accettatiPunti.punti).toLocaleString('it-IT')}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>FV positivi + LA accettati</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}><BarChart3 size={16} /> PUNTI TOTALI INSERITI</div>
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
            
            {/* CLASSIFICHE FATTURATO - 2 colonne con più spazio */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 20 }}>
              {/* Classifica K Manager FV */}
              <div style={{ background: '#F8F8F8', borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 13, color: DS.colors.primaryLight, fontWeight: 700, marginBottom: 12 }}><Crown size={16} /> TOP K MANAGER - FV Effettivo <span style={{ fontSize: 10, color: '#999', fontWeight: 400 }}>({reportData.fatturato.fv.classificaK.length})</span></div>
                <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
                  {reportData.fatturato.fv.classificaK.map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 8px', borderBottom: '1px solid #E8E8E8', fontSize: 12, background: i < 3 ? 'rgba(42,170,138,0.05)' : 'transparent', borderRadius: 8, marginBottom: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: i < 3 ? [DS.colors.accent, '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i < 3 ? DS.colors.white : '#666', flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontWeight: i < 3 ? 700 : 500, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 10 }}>
                        <div style={{ fontWeight: 700, color: '#4CAF50', fontSize: 14 }}>€{dati.fatturato.toLocaleString('it-IT')}</div>
                        <div style={{ fontSize: 10, color: '#888' }}>{dati.kw}kW | {dati.punti}pt</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Classifica Networker FV */}
              <div style={{ background: '#F8F8F8', borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 13, color: '#9C27B0', fontWeight: 700, marginBottom: 12 }}><Star size={16} /> TOP NETWORKER - FV Effettivo <span style={{ fontSize: 10, color: '#999', fontWeight: 400 }}>({reportData.fatturato.fv.classificaNW.length})</span></div>
                <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
                  {reportData.fatturato.fv.classificaNW.map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 8px', borderBottom: '1px solid #E8E8E8', fontSize: 12, background: i < 3 ? 'rgba(156,39,176,0.05)' : 'transparent', borderRadius: 8, marginBottom: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: i < 3 ? [DS.colors.accent, '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i < 3 ? DS.colors.white : '#666', flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontWeight: i < 3 ? 700 : 500, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 10 }}>
                        <div style={{ fontWeight: 700, color: '#4CAF50', fontSize: 14 }}>€{dati.fatturato.toLocaleString('it-IT')}</div>
                        <div style={{ fontSize: 10, color: '#888' }}>{dati.kw}kW | {dati.punti}pt</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Classifica K Manager LA */}
              <div style={{ background: '#F8F8F8', borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 13, color: '#FF9800', fontWeight: 700, marginBottom: 12 }}><Crown size={16} /> TOP K MANAGER - LA Accettati <span style={{ fontSize: 10, color: '#999', fontWeight: 400 }}>({reportData.fatturato.la.classificaK.length})</span></div>
                <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
                  {reportData.fatturato.la.classificaK.map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 8px', borderBottom: '1px solid #E8E8E8', fontSize: 12, background: i < 3 ? 'rgba(255,152,0,0.05)' : 'transparent', borderRadius: 8, marginBottom: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: i < 3 ? [DS.colors.accent, '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i < 3 ? DS.colors.white : '#666', flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontWeight: i < 3 ? 700 : 500, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 10 }}>
                        <div style={{ fontWeight: 700, color: '#FF9800', fontSize: 14 }}>€{Math.round(dati.fatturato).toLocaleString('it-IT')}/anno</div>
                        <div style={{ fontSize: 10, color: '#888' }}>{dati.contratti} contr. | {dati.punti}pt</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Classifica Networker LA */}
              <div style={{ background: '#F8F8F8', borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 13, color: '#4CAF50', fontWeight: 700, marginBottom: 12 }}><Star size={16} /> TOP NETWORKER - LA Accettati <span style={{ fontSize: 10, color: '#999', fontWeight: 400 }}>({reportData.fatturato.la.classificaNW.length})</span></div>
                <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
                  {reportData.fatturato.la.classificaNW.map(([nome, dati], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 8px', borderBottom: '1px solid #E8E8E8', fontSize: 12, background: i < 3 ? 'rgba(76,175,80,0.05)' : 'transparent', borderRadius: 8, marginBottom: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: i < 3 ? [DS.colors.accent, '#C0C0C0', '#CD7F32'][i] : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i < 3 ? DS.colors.white : '#666', flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontWeight: i < 3 ? 700 : 500, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{nome}</span>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 10 }}>
                        <div style={{ fontWeight: 700, color: '#4CAF50', fontSize: 14 }}>€{Math.round(dati.fatturato).toLocaleString('it-IT')}/anno</div>
                        <div style={{ fontSize: 10, color: '#888' }}>{dati.punti}pt | {dati.kwh.toLocaleString('it-IT')}kWh</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* SEZIONE ESPORTA SCREENSHOT */}
        <div style={{ 
          background: DS.colors.white, 
          borderRadius: DS.radius.lg, 
          padding: DS.space.xl, 
          border: `1px solid ${DS.colors.gray200}`,
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: DS.space.lg }}>
            <h3 style={{ color: DS.colors.gray800, fontSize: DS.font.h3.size, margin: 0, fontWeight: DS.font.h3.weight, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: DS.space.sm }}>
              <Camera size={20} color={DS.colors.primary} />
              Esporta per Presentazione
            </h3>
            <p style={{ color: DS.colors.gray500, fontSize: DS.font.caption.size, margin: `${DS.space.sm}px 0 0` }}>
              Genera PNG alta risoluzione di tutte le sezioni del Report
            </p>
          </div>
          
          <Button 
            onClick={screenshotAllSections}
            variant="primary"
            size="lg"
            icon={Download}
          >
            Scarica Tutte le Slide (ZIP)
          </Button>
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
      .login-input:focus { border-color: DS.colors.primaryLight; box-shadow: 0 0 0 3px rgba(42,170,138,0.15); outline: none; }
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
            <span style={{ color: DS.colors.primaryLight }}>LEADER</span>
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
            style={{ 
              padding: '16px 32px', 
              borderRadius: 12, 
              border: 'none', 
              background: 'linear-gradient(135deg, #2AAA8A 0%, #1E8A6E 100%)', 
              color: DS.colors.white, 
              fontSize: 16, 
              fontWeight: 700, 
              cursor: 'pointer', 
              marginTop: 12, 
              transition: 'all 0.2s ease', 
              letterSpacing: '2px',
              boxShadow: '0 4px 15px rgba(42, 170, 138, 0.4)',
              width: '100%'
            }} 
            onClick={handleLogin}
          >
            ACCEDI
          </button>
        </div>
        
        {/* Footer versione */}
        <p style={{ color: '#CCC', fontSize: 11, marginTop: 30, textAlign: 'center', letterSpacing: '1px' }}>v16.5</p>
      </div>
    </div></>);

  // HOMEPAGE - TABS SEMPRE VISIBILI (senza area CSV)
  if (!csvData && (user.role === 'admin' || user.role === 'assistente' || user.role === 'k')) return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={{ minHeight: '100vh', background: darkMode ? '#1a1a2e' : '#F8F9FA', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif', transition: 'background 0.3s ease' }}>
      <header style={{ background: darkMode ? '#16213e' : DS.colors.white, padding: '12px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${darkMode ? '#0f3460' : '#E0E0E0'}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: DS.colors.primaryLight, fontWeight: 800, fontSize: 18 }}>LEADER</span>
          <span style={{ fontWeight: 300, fontSize: 18, color: darkMode ? DS.colors.white : '#333' }}>RANKING</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Toggle Dark/Light Mode */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ 
              padding: '8px 14px', 
              background: darkMode ? 'linear-gradient(135deg, #FFD700, #FFC107)' : 'linear-gradient(135deg, #1F2937, #374151)', 
              color: darkMode ? '#333' : DS.colors.white, 
              border: 'none', 
              borderRadius: 8, 
              fontSize: 12, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
          {/* User info card */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10, 
            background: darkMode ? '#0f3460' : DS.colors.gray50, 
            padding: '8px 14px', 
            borderRadius: 10, 
            border: `1px solid ${darkMode ? '#1a3a5c' : DS.colors.gray200}` 
          }}>
            <span style={{ fontSize: 13, color: darkMode ? '#CCC' : '#4B5563', fontWeight: 500 }}>Ciao, {user.name}</span>
            <span style={{ padding: '4px 10px', background: 'linear-gradient(135deg, #2AAA8A, #20917A)', color: DS.colors.white, borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{user.role.toUpperCase()}</span>
          </div>
          <button style={{ 
            padding: '8px 16px', 
            fontSize: 12, 
            background: darkMode ? 'transparent' : DS.colors.white, 
            border: `1px solid ${darkMode ? '#444' : DS.colors.gray200}`, 
            color: darkMode ? '#AAA' : DS.colors.gray500,
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }} onClick={() => setUser(null)}>Esci</button>
        </div>
      </header>
      
      <main style={{ padding: 20, maxWidth: 1400, margin: '0 auto' }}>
        {/* 2 TABS - Dashboard e Report */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 25 }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ 
              padding: '20px', 
              background: activeTab === 'dashboard' ? 'linear-gradient(135deg, #2AAA8A 0%, #20917A 100%)' : darkMode ? '#16213e' : DS.colors.white, 
              color: activeTab === 'dashboard' ? DS.colors.white : darkMode ? '#AAA' : '#666666',
              border: activeTab === 'dashboard' ? 'none' : `1px solid ${darkMode ? '#0f3460' : '#E0E0E0'}`,
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'dashboard' ? '0 8px 25px rgba(42,170,138,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          ><BarChart3 size={16} /> DASHBOARD</button>
          <button 
            onClick={() => setActiveTab('report')}
            style={{ 
              padding: '20px', 
              background: activeTab === 'report' ? 'linear-gradient(135deg, #FFD700, #FFC107)' : darkMode ? '#16213e' : DS.colors.white, 
              color: activeTab === 'report' ? '#333' : darkMode ? '#AAA' : '#666666',
              border: activeTab === 'report' ? 'none' : `1px solid ${darkMode ? '#0f3460' : '#E0E0E0'}`,
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'report' ? '0 8px 25px rgba(255,215,0,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          ><TrendingUp size={16} /> REPORT</button>
        </div>
        
        {/* CONTENUTO TAB */}
        {activeTab === 'dashboard' && (
          <div style={{ background: DS.colors.white, borderRadius: 24, padding: 50, textAlign: 'center', border: '1px solid #E8E8E8', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h2 style={{ color: '#1a1a2e', fontSize: 28, marginBottom: 8, fontWeight: 700, letterSpacing: '-0.5px' }}>Dashboard Classifiche</h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 35 }}>Carica un file CSV per visualizzare classifiche e statistiche in tempo reale</p>
            
            <div style={{ maxWidth: 480, margin: '0 auto' }}>
              <div 
                style={{ 
                  border: `2px dashed ${isDragging ? DS.colors.primaryLight : '#D0D0D0'}`, 
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: DS.colors.primaryLight }} /><span style={{ fontSize: 12, color: '#666' }}>Networker</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: DS.colors.accent }} /><span style={{ fontSize: 12, color: '#666' }}>K Manager</span></div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'report' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* UPLOAD CSV PER REPORT - TOP MANAGER STYLE */}
            <div style={{ background: DS.colors.white, borderRadius: DS.radius.xl, padding: DS.space['3xl'], border: `1px solid ${DS.colors.gray200}`, boxShadow: DS.shadow.sm }}>
              <div style={{ marginBottom: DS.space.xl }}>
                <h2 style={{ color: DS.colors.gray800, fontSize: DS.font.h1.size, marginBottom: DS.space.sm, fontWeight: DS.font.h1.weight }}>Report Aggregato</h2>
                <p style={{ color: DS.colors.gray500, fontSize: DS.font.body.size, margin: 0 }}>Carica i CSV per generare report dettagliati con classifiche e statistiche</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: DS.space.lg, marginBottom: DS.space.xl }}>
                {/* IVD */}
                <div style={{ background: reportCSVs.ivd ? 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)', borderRadius: 16, padding: 20, border: reportCSVs.ivd ? '2px solid #4CAF50' : '1px solid #E8E8E8', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FF9800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, filter: 'brightness(10)' }}><FileText size={16} /></span>
                    </div>
                    <span style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>IVD Attivati</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-ivd-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('ivd', e.target.files[0]); }} />
                  <label htmlFor="csv-ivd-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.ivd ? 'rgba(76,175,80,0.1)' : DS.colors.white, borderRadius: 10, textAlign: 'center', color: reportCSVs.ivd ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
                    {reportCSVs.ivd ? `✓ ${reportCSVs.ivd.rows} righe caricate` : 'Carica CSV'}
                  </label>
                </div>
                
                {/* Luce Amica */}
                <div style={{ background: reportCSVs.energy ? 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)', borderRadius: 16, padding: 20, border: reportCSVs.energy ? '2px solid #4CAF50' : '1px solid #E8E8E8', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: DS.colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16 }}><Zap size={16} /></span>
                    </div>
                    <span style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>Luce Amica</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-energy-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('energy', e.target.files[0]); }} />
                  <label htmlFor="csv-energy-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.energy ? 'rgba(76,175,80,0.1)' : DS.colors.white, borderRadius: 10, textAlign: 'center', color: reportCSVs.energy ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
                    {reportCSVs.energy ? `✓ ${reportCSVs.energy.rows} righe caricate` : 'Carica CSV'}
                  </label>
                </div>
                
                {/* FV */}
                <div style={{ background: reportCSVs.fv ? 'linear-gradient(135deg, rgba(76,175,80,0.08), rgba(76,175,80,0.02))' : 'linear-gradient(135deg, #FAFAFA, #F5F5F5)', borderRadius: 16, padding: 20, border: reportCSVs.fv ? '2px solid #4CAF50' : '1px solid #E8E8E8', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, filter: 'brightness(10)' }}><Sun size={16} /></span>
                    </div>
                    <span style={{ color: '#1a1a2e', fontWeight: 600, fontSize: 14 }}>Fotovoltaico</span>
                  </div>
                  <input type="file" accept=".csv" id="csv-fv-rep" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processReportCSV('fv', e.target.files[0]); }} />
                  <label htmlFor="csv-fv-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.fv ? 'rgba(76,175,80,0.1)' : DS.colors.white, borderRadius: 10, textAlign: 'center', color: reportCSVs.fv ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
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
                  <label htmlFor="csv-cons-rep" style={{ display: 'block', cursor: 'pointer', padding: '12px', background: reportCSVs.consultings ? 'rgba(76,175,80,0.1)' : DS.colors.white, borderRadius: 10, textAlign: 'center', color: reportCSVs.consultings ? '#4CAF50' : '#888', fontSize: 13, fontWeight: 500, border: '1px dashed #D0D0D0' }}>
                    {reportCSVs.consultings ? `✓ ${reportCSVs.consultings.rows} righe caricate` : 'Carica CSV'}
                  </label>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  style={{ flex: 2, padding: '16px 24px', background: Object.values(reportCSVs).some(v => v) ? 'linear-gradient(135deg, #2AAA8A, #1E8A6E)' : '#E8E8E8', color: Object.values(reportCSVs).some(v => v) ? DS.colors.white : '#AAA', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: Object.values(reportCSVs).some(v => v) ? 'pointer' : 'not-allowed', boxShadow: Object.values(reportCSVs).some(v => v) ? '0 8px 25px rgba(42,170,138,0.3)' : 'none', transition: 'all 0.2s ease' }} 
                  onClick={() => setReportData(generateReportData())}
                  disabled={!Object.values(reportCSVs).some(v => v)}
                >GENERA REPORT</button>
                <button 
                  style={{ flex: 1, padding: '16px 24px', background: DS.colors.white, color: '#888', border: '1px solid #E0E0E0', borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer' }} 
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
      <footer style={{ textAlign: 'center', padding: 20, color: '#999', fontSize: 12 }}>v16.5 • Leader Ranking</footer>
    </div></>);

  // PREVIEW
  if (showPreview && previewImage) return (<><Head><title>Anteprima</title></Head>
    <div style={S.previewWrap}><div style={S.previewModal}>
      <h2 style={{ color: '#333333', marginBottom: 5 }}><Camera size={16} /> Anteprima 1080x1080</h2>
      <p style={{ color: '#666666', fontSize: 13, marginBottom: 15 }}><CheckCircle size={16} /> {getData().length} partecipanti • {getClassificaTotal()} contratti</p>
      <div style={S.previewImg}><img src={previewImage} style={{ maxWidth: '100%', maxHeight: '55vh' }} /></div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 15, flexWrap: 'wrap' }}>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: '#F5F5F5', border: '1px solid #E0E0E0', color: '#333333' }} onClick={() => setShowPreview(false)}>✕ Chiudi</button>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg, #2AAA8A, #20917A)', color: DS.colors.white }} onClick={download}><Download size={16} /> SCARICA</button>
        <button style={{ ...S.btn, flex: 1, minWidth: 100, background: 'linear-gradient(135deg,#FFD700,#FFC107)', color: '#333333' }} onClick={handleSendToBot}><Share2 size={16} /> INVIA A BOT</button>
      </div>
      {sendStatus && <p style={{ textAlign: 'center', marginTop: 10, color: sendStatus.includes(<CheckCircle size={18} color="#4CAF50" />) ? '#4CAF50' : sendStatus.includes(<XCircle size={18} color="#EF4444" />) ? '#f44' : DS.colors.accent }}>{sendStatus}</p>}
    </div></div></>);

  // DASHBOARD
  return (<><Head><title>Leader Ranking</title><meta name="viewport" content="width=device-width,initial-scale=1" /></Head>
    <div style={S.dash}>
      <header style={{ ...S.header, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '12px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ ...S.menuBtn, padding: 8 }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
          <span style={{ fontWeight: 800, color: DS.colors.primaryLight, fontSize: 18 }}>LEADER</span>
          <span style={{ fontWeight: 300, color: '#333333', fontSize: 18 }}>RANKING</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Tasto Indietro elegante */}
          <button 
            style={{ 
              padding: '8px 16px', 
              fontSize: 12, 
              background: DS.colors.gray50, 
              border: '1px solid #E5E7EB', 
              color: '#4B5563', 
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }} 
            onClick={() => { setCsvData(null); setRankings(null); setFilteredData(null); setReportData(null); }}
          >INDIETRO</button>
          <span style={{ 
            padding: '6px 12px', 
            background: 'linear-gradient(135deg, #2AAA8A, #20917A)', 
            color: DS.colors.white, 
            borderRadius: 8, 
            fontSize: 11, 
            fontWeight: 600 
          }}>{user.role.toUpperCase()}</span>
          <button style={{ 
            padding: '8px 16px', 
            fontSize: 12, 
            background: 'transparent', 
            border: '1px solid #E5E7EB',
            borderRadius: 8,
            color: DS.colors.gray500,
            cursor: 'pointer',
            fontWeight: 500
          }} onClick={() => { setUser(null); setCsvData(null); setRankings(null); }}>Esci</button>
        </div>
      </header>
      <main style={{ display: 'flex' }}>
        <aside style={{ ...S.sidebar, ...(mobileMenuOpen ? { transform: 'translateX(0)' } : {}) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}><span style={{ fontSize: 12, color: '#999999', letterSpacing: 1 }}><BarChart3 size={16} /> CLASSIFICHE</span><button style={{ background: 'none', border: 'none', color: '#333333', fontSize: 18, cursor: 'pointer' }} onClick={() => setMobileMenuOpen(false)}>✕</button></div>
          {rankings ? (<><p style={S.catLabel}>IVD</p><button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_inseriti'); setMobileMenuOpen(false); }}> {labels.c1} ({rankings.ivd_inseriti.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'ivd_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('ivd_accettati'); setMobileMenuOpen(false); }}> {labels.c2} ({rankings.ivd_accettati.length})</button><p style={S.catLabel}>SDP</p><button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_inseriti' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_inseriti'); setMobileMenuOpen(false); }}> {labels.c1} ({rankings.sdp_inseriti.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'sdp_accettati' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('sdp_accettati'); setMobileMenuOpen(false); }}> {labels.c2} ({rankings.sdp_accettati.length})</button><p style={S.catLabel}>MANAGER</p><button style={{ ...S.menuItem, ...(selectedRanking === 'nw' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('nw'); setMobileMenuOpen(false); }}><Star size={16} /> Networker ({rankings.nw.length})</button><button style={{ ...S.menuItem, ...(selectedRanking === 'k' ? S.menuActive : {}) }} onClick={() => { setSelectedRanking('k'); setMobileMenuOpen(false); }}><Crown size={16} /> K Manager ({rankings.k.length})</button></>) : <p style={{ color: '#999999', fontSize: 12 }}>Carica CSV</p>}
          <div style={S.divider} />
          {(user.role === 'admin' || user.role === 'assistente') && (<><p style={S.catLabel}>⚙️ FILTRI</p><label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: '#333333' }}><input type="checkbox" checked={excludeK} onChange={toggleExcludeK} style={{ accentColor: DS.colors.primaryLight }} /> Escludi K</label><div style={S.divider} /><p style={S.catLabel}><Calendar size={16} /> PERIODO</p><button style={{ ...S.periodBtn, ...(!selectedMonth ? { background: 'rgba(124,77,255,0.2)', color: DS.colors.primaryLight } : {}) }} onClick={handleShowAll}><FileText size={16} /> Tutti ({csvData?.length || 0})</button>{availableMonths.length > 0 && (<select style={S.select} value={selectedMonth} onChange={e => handleMonthChange(e.target.value)}><option value="">-- Mese --</option>{availableMonths.map(m => <option key={m} value={m}>{m}</option>)}</select>)}{weeks.length > 0 && (<select style={S.select} value={selectedWeek?.num || ''} onChange={e => handleWeekChange(e.target.value)}><option value="">-- Settimana --</option>{weeks.map(w => <option key={w.num} value={w.num}>{w.label}</option>)}</select>)}<div style={S.divider} /><p style={S.catLabel}><BarChart3 size={16} /> TIPO CLASSIFICA</p><select style={S.select} value={periodType} onChange={e => setPeriodType(e.target.value)}><option value="progressiva"><TrendingUp size={16} /> Progressiva (mese in corso)</option><option value="settimanale"><Calendar size={16} /> Settimanale</option><option value="finale"><Trophy size={16} /> Finale mese</option></select><div style={S.divider} /><p style={S.catLabel}>🏷️ ETICHETTE</p><select style={S.select} value={eventName} onChange={e => setEventName(e.target.value)}>{EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select><input style={S.inputSm} value={eventDate} onChange={e => setEventDate(e.target.value)} placeholder="Periodo" /></>)}
        </aside>
        {mobileMenuOpen && <div style={S.overlay} onClick={() => setMobileMenuOpen(false)} />}
        <section style={S.content}>
          {(user.role === 'admin' || user.role === 'assistente') && (<div style={{ ...S.uploadBox, ...(isDragging ? { borderColor: DS.colors.primaryLight, background: 'rgba(124,77,255,0.1)' } : {}) }} onDragOver={e => { e.preventDefault(); setIsDragging(true); }} onDragLeave={e => { e.preventDefault(); setIsDragging(false); }} onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) processFile(f); }}><input type="file" accept=".csv" id="csv" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) processFile(e.target.files[0]); }} /><label htmlFor="csv" style={{ cursor: 'pointer', padding: '10px 20px', background: 'rgba(124,77,255,0.1)', borderRadius: 8, color: DS.colors.primaryLight, fontWeight: 600 }}>{filteredData ? `<CheckCircle size={16} /> ${filteredData.length} righe caricate` : '📤 Carica CSV'}</label></div>)}
          
          {/* TABS - Dashboard e Classifiche (Report è nella Homepage) */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: DS.colors.white, padding: 8, borderRadius: 12, border: '1px solid #E0E0E0' }}>
            <button 
              style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'dashboard' ? DS.colors.primaryLight : 'transparent', color: activeTab === 'dashboard' ? '#fff' : '#666666', border: 'none', opacity: rankings ? 1 : 0.5 }} 
              onClick={() => rankings && setActiveTab('dashboard')}
              disabled={!rankings}
            ><BarChart3 size={16} /> Dashboard</button>
            <button 
              style={{ ...S.btn, flex: 1, padding: '12px 20px', background: activeTab === 'classifiche' ? DS.colors.primaryLight : 'transparent', color: activeTab === 'classifiche' ? '#fff' : '#666666', border: 'none', opacity: rankings ? 1 : 0.5 }} 
              onClick={() => rankings && setActiveTab('classifiche')}
              disabled={!rankings}
            ><Trophy size={16} /> Classifiche</button>
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
                  <span style={{ fontSize: 24 }}>{config.icon && <config.icon size={16} color={config.color} />}</span>
                  <div>
                    <h2 style={{ color: config.color, fontSize: 18, margin: 0 }}>{config.label}</h2>
                    <p style={{ color: '#666666', fontSize: 12, margin: 0 }}>{eventDate}</p>
                  </div>
                </div>
                
                {/* STATS CARDS - PIU GRANDI */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,107,53,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(255,107,53,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: DS.colors.primaryLight }}>{animatedStats.ins}</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>{labels.c1}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(76,175,80,0.25), rgba(76,175,80,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(76,175,80,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#4CAF50' }}>{animatedStats.acc}</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>{labels.c2}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.25), rgba(124,77,255,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(124,77,255,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: DS.colors.primaryLight }}>{animatedStats.part}</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>Partecipanti</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0.08))', borderRadius: 16, padding: '18px 12px', textAlign: 'center', border: '1px solid rgba(255,215,0,0.4)' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: DS.colors.accent }}>{animatedStats.conv}%</div>
                    <div style={{ fontSize: 11, color: '#444444', textTransform: 'uppercase', marginTop: 4 }}>Conversione</div>
                  </div>
                </div>

                {/* PODIO + TOP 7 affiancati - PIU GRANDI */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 15 }}>
                  {/* PODIO */}
                  <div style={{ background: DS.colors.gray50, borderRadius: DS.radius.xl, padding: DS.space.xl, border: `1px solid ${DS.colors.gray100}` }}>
                    <h3 style={{ color: DS.colors.accent, fontSize: DS.font.h3.size, marginBottom: DS.space.lg, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: DS.space.sm }}><Trophy size={18} color={DS.colors.accent} /> PODIO</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: DS.space.md, height: 170 }}>
                      {/* 2° */}
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: DS.font.caption.size, color: DS.colors.gray700, fontWeight: 600, marginBottom: DS.space.sm, lineHeight: 1.3 }}>{stats.top3[1]?.name || '-'}</div>
                        <div style={{ background: 'linear-gradient(180deg, #E8E8E8, #A0A0A0)', borderRadius: '10px 10px 0 0', height: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <PositionBadge position={2} size="lg" />
                          <span style={{ fontSize: 18, fontWeight: 700, color: DS.colors.gray800, marginTop: DS.space.xs }}>{stats.top3[1]?.v1 || 0}</span>
                        </div>
                      </div>
                      {/* 1° */}
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: DS.font.body.size, color: DS.colors.accent, fontWeight: 700, marginBottom: DS.space.sm, lineHeight: 1.3 }}>{stats.top3[0]?.name || '-'}</div>
                        <div style={{ background: `linear-gradient(180deg, ${DS.colors.accentLight}, ${DS.colors.accent})`, borderRadius: '10px 10px 0 0', height: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 25px ${DS.colors.accent}40` }}>
                          <PositionBadge position={1} size="lg" />
                          <span style={{ fontSize: 24, fontWeight: 700, color: DS.colors.gray800, marginTop: DS.space.xs }}>{stats.top3[0]?.v1 || 0}</span>
                        </div>
                      </div>
                      {/* 3° */}
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: DS.font.caption.size, color: DS.colors.gray700, fontWeight: 600, marginBottom: DS.space.sm, lineHeight: 1.3 }}>{stats.top3[2]?.name || '-'}</div>
                        <div style={{ background: `linear-gradient(180deg, #B2DFDB, ${DS.colors.bronze})`, borderRadius: '10px 10px 0 0', height: 65, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <PositionBadge position={3} size="lg" />
                          <span style={{ fontSize: DS.font.body.size, fontWeight: 700, color: DS.colors.gray800, marginTop: DS.space.xs }}>{stats.top3[2]?.v1 || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TOP 4-10 */}
                  <div style={{ background: DS.colors.gray50, borderRadius: DS.radius.xl, padding: DS.space.xl, border: `1px solid ${DS.colors.gray100}` }}>
                    <h3 style={{ color: DS.colors.primary, fontSize: DS.font.h3.size, marginBottom: DS.space.md, display: 'flex', alignItems: 'center', gap: DS.space.sm }}><TrendingUp size={18} color={DS.colors.primary} /> TOP 4° - 10°</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: DS.space.sm }}>
                      {stats.top10.slice(3, 10).map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: DS.space.md }}>
                          <span style={{ width: 28, fontSize: DS.font.body.size, color: DS.colors.gray500, fontWeight: 600 }}>{i + 4}°</span>
                          <div style={{ flex: 1, height: 28, background: DS.colors.gray100, borderRadius: DS.radius.sm, overflow: 'hidden', position: 'relative' }}>
                            <div style={{ width: `${(p.v1 / stats.maxV1) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${DS.colors.primary}, ${DS.colors.primaryLight})`, borderRadius: DS.radius.sm }} />
                            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: DS.font.caption.size, color: DS.colors.gray700, fontWeight: 500 }}>{p.name}</span>
                          </div>
                          <span style={{ width: 28, fontSize: DS.font.body.size, fontWeight: 700, color: DS.colors.primary, textAlign: 'right' }}>{p.v1}</span>
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
                        <div><span style={{ fontSize: 16, fontWeight: 700, color: DS.colors.primaryLight }}>{stats.ins}</span><span style={{ fontSize: 10, color: '#999999', marginLeft: 4 }}>ins</span></div>
                        <div><span style={{ fontSize: 16, fontWeight: 700, color: '#4CAF50' }}>{stats.acc}</span><span style={{ fontSize: 10, color: '#999999', marginLeft: 4 }}>acc</span></div>
                      </div>
                    </div>
                  </div>

                  {/* HEATMAP DINAMICO - Settimanale o Mensile */}
                  {!stats.isMonthly ? (
                    // HEATMAP SETTIMANALE
                    <div style={{ background: '#FCFCFC', borderRadius: 16, padding: 15, border: '1px solid #F5F5F5' }}>
                      <div style={{ fontSize: 12, color: '#666666', marginBottom: 8 }}><Calendar size={16} /> ATTIVITÀ SETTIMANALE</div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {dayNames.map((day, i) => {
                          const val = stats.weeklyData[i];
                          const intensity = val / maxWeekly;
                          const bgColor = val === 0 ? '#F5F5F5' : intensity > 0.7 ? '#4CAF50' : intensity > 0.4 ? DS.colors.accent : DS.colors.primaryLight;
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: DS.colors.accent }} /><span style={{ fontSize: 9, color: '#666666' }}>Medio</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: DS.colors.primaryLight }} /><span style={{ fontSize: 9, color: '#666666' }}>Basso</span></div>
                      </div>
                    </div>
                  ) : (
                    // HEATMAP MENSILE - Griglia Calendario WOW
                    <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,107,53,0.02))', borderRadius: 16, padding: 15, border: '1px solid rgba(255,107,53,0.2)', gridColumn: 'span 2' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ fontSize: 14, color: DS.colors.primaryLight, fontWeight: 600 }}><TrendingUp size={16} /> TEMPERATURA CONTRATTI</div>
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
                                               intensity > 0.4 ? DS.colors.accent : '#E53935';
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
                                    {isHot && <span style={{ position: 'absolute', top: -4, right: -2, fontSize: 8 }}><TrendingUp size={16} /></span>}
                                  </div>
                                );
                              })}
                            </div>
                            {/* Legenda */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 12 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#4CAF50', boxShadow: '0 0 6px rgba(76,175,80,0.5)' }} /><span style={{ fontSize: 10, color: '#666666' }}><TrendingUp size={16} /> Caldo</span></div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: DS.colors.accent }} /><span style={{ fontSize: 10, color: '#666666' }}>Tiepido</span></div>
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
                              <div style={{ fontSize: 12, color: DS.colors.accent, fontWeight: 600, marginBottom: 6 }}><Crown size={16} /> K MANAGER</div>
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
                              <div style={{ fontSize: 12, color: '#4CAF50', fontWeight: 600, marginBottom: 6 }}><FileText size={16} /> STATI</div>
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
                          <div style={{ fontSize: 12, color: '#2196F3', fontWeight: 600, marginBottom: 10 }}><Star size={16} /> TOP 5 NETWORKER</div>
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
                  const ClassificaTable = ({ title, icon: IconComp, data, color }) => {
                    if (!data || data.length === 0) return null;
                    return (
                      <div style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)`, borderRadius: DS.radius.lg, padding: DS.space.lg, border: `1px solid ${color}30` }}>
                        <div style={{ fontSize: DS.font.body.size, color: color, fontWeight: 700, marginBottom: DS.space.md, display: 'flex', alignItems: 'center', gap: DS.space.sm }}>
                          {IconComp && <IconComp size={16} color={color} />} {title}
                        </div>
                        <div style={{ overflowX: 'auto', maxHeight: 280, overflowY: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: DS.font.caption.size }}>
                            <thead>
                              <tr style={{ borderBottom: `2px solid ${color}30` }}>
                                <th style={{ padding: '8px 4px', textAlign: 'center', color: DS.colors.gray700, fontWeight: 600, width: 30 }}>#</th>
                                <th style={{ padding: '8px 4px', textAlign: 'left', color: DS.colors.gray700, fontWeight: 600 }}>Nome</th>
                                <th style={{ padding: '8px 4px', textAlign: 'center', color: DS.colors.gray700, fontWeight: 600 }}>Tot</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.slice(0, 15).map(([name, val], i) => {
                                const tot = typeof val === 'object' ? (val.v1 || val.total || 0) : val;
                                return (
                                  <tr key={i} style={{ borderBottom: `1px solid ${color}15`, background: i < 3 ? `${color}15` : 'transparent' }}>
                                    <td style={{ padding: '8px 4px', textAlign: 'center', fontWeight: i < 3 ? 700 : 400, fontSize: DS.font.micro.size, color: DS.colors.gray700 }}>
                                      {<PositionBadge position={i+1} size="sm" />}
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: DS.space.md }}>
                      <ClassificaTable title="K MANAGER" icon={Crown} data={pies.k} color={DS.colors.accent} />
                      <ClassificaTable title="NETWORKER" icon={Star} data={pies.nw} color={DS.colors.primary} />
                      <ClassificaTable title="SDP" icon={Briefcase} data={rankings?.sdp_inseriti || []} color={DS.colors.info} />
                      <ClassificaTable title="IVD" icon={Users} data={rankings?.ivd_inseriti || []} color={DS.colors.warning} />
                    </div>
                  );
                })()}

                {/* BOTTONI DOWNLOAD SLIDE */}
                <div style={{ 
                  background: `${DS.colors.primary}10`, 
                  borderRadius: DS.radius.lg, 
                  padding: DS.space.xl, 
                  border: `1px solid ${DS.colors.primary}30`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: DS.space.sm, marginBottom: DS.space.sm }}>
                    <Image size={18} color={DS.colors.primary} />
                    <span style={{ fontSize: DS.font.h3.size, color: DS.colors.primary, fontWeight: 700 }}>Scarica per Slide</span>
                  </div>
                  <div style={{ fontSize: DS.font.caption.size, color: DS.colors.gray500, marginBottom: DS.space.lg }}>PNG 1920x1080 (16:9) - Sfondo verde corporate</div>
                  <div style={{ display: 'flex', gap: DS.space.md, flexWrap: 'wrap' }}>
                    <Button onClick={() => downloadSlidePNG('full')} variant="primary" icon={BarChart3}>
                      Podio + Classifica
                    </Button>
                    <Button onClick={() => downloadSlidePNG('solo')} variant="accent" icon={Trophy}>
                      Solo Podio
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* CLASSIFICHE TAB */}
          {rankings && activeTab === 'classifiche' ? (<div style={S.rankCard}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}><div><h2 style={{ color: config.color, fontSize: 18, margin: 0 }}>{config.icon && <config.icon size={16} color={config.color} />} {config.label}</h2><p style={{ color: '#666666', fontSize: 12, marginTop: 4 }}>{getData().length} partecipanti • {getClassificaTotal()} contratti • {eventDate}</p></div><div style={{ display: 'flex', gap: 15 }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: config.color }}>{getClassificaTotal()}</div><div style={{ fontSize: 9, color: '#999999' }}>{labels.c1}</div></div><div style={{ textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, color: '#4CAF50' }}>{getData().reduce((s,[,x])=>s+x.v2,0)}</div><div style={{ fontSize: 9, color: '#999999' }}>{labels.c2}</div></div></div></div><div style={{ overflowX: 'auto', maxHeight: '50vh', overflowY: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 300 }}><thead><tr style={{ borderBottom: '1px solid #E0E0E0' }}><th style={S.th}>#</th><th style={{ ...S.th, textAlign: 'left' }}>Nome</th><th style={S.th}>{labels.c1}</th>{isExclusive() && <><th style={S.th}>%</th><th style={S.th}>{labels.c2}</th></>}</tr></thead><tbody>{getData().map(([name, s], i) => { const p = s.v1 > 0 ? Math.round(s.v2 / s.v1 * 100) : 0; return (<tr key={name} style={{ borderBottom: '1px solid #F5F5F5', ...(i < 3 ? { background: `${config.color}10` } : {}) }}><td style={{ padding: 10, textAlign: 'center' }}>{<PositionBadge position={i+1} size="sm" />}</td><td style={{ padding: 10, fontWeight: i < 3 ? 700 : 500, fontSize: 13 }}>{name}</td><td style={{ padding: 10, textAlign: 'center', color: config.color, fontWeight: 700 }}>{s.v1}</td>{isExclusive() && <><td style={{ padding: 10, textAlign: 'center', color: p >= 50 ? '#4CAF50' : DS.colors.accent, fontSize: 12 }}>{p}%</td><td style={{ padding: 10, textAlign: 'center', color: '#4CAF50', fontWeight: 700 }}>{s.v2}</td></>}</tr>); })}</tbody></table></div>{(user.role === 'admin' || user.role === 'assistente') && (<div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', alignItems: 'center' }}><button style={{ ...S.btn, flex: 1, minWidth: 120, background: `linear-gradient(135deg,${config.color},${config.color}88)` }} onClick={handleGenerate}><Camera size={16} /> PNG 1080x1080</button><button style={{ ...S.btn, flex: 1, minWidth: 120, background: 'linear-gradient(135deg, #2AAA8A, #4DB6AC)' }} onClick={() => handleSendToBot()}><Share2 size={16} /> Invia a Bot</button>{sendStatus && <span style={{ fontSize: 13, color: sendStatus.includes(<CheckCircle size={18} color="#4CAF50" />) ? '#4CAF50' : sendStatus.includes(<XCircle size={18} color="#EF4444" />) ? '#f44' : DS.colors.accent }}>{sendStatus}</span>}</div>)}{user.role === 'k' && (<div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', alignItems: 'center' }}><button style={{ ...S.btn, flex: 1, minWidth: 120, background: `linear-gradient(135deg,${config.color},${config.color}88)` }} onClick={handleGenerate}><Camera size={16} /> PNG 1080x1080</button><button style={{ ...S.btn, flex: 1, minWidth: 120, background: 'linear-gradient(135deg, #2AAA8A, #20917A)' }} onClick={() => handleSendToBot()}><Share2 size={16} /> Invia a Bot</button></div>)}</div>) : !rankings && (<div style={{ textAlign: 'center', padding: 60, color: '#999999' }}><div style={{ fontSize: 50 }}><BarChart3 size={16} /></div><p>Carica un CSV per iniziare</p></div>)}
        </section>
      </main>
      {showConfirmModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: 'linear-gradient(135deg,#FFFFFF,#F5F5F5)', borderRadius: 20, padding: 30, maxWidth: 450, width: '100%', border: '1px solid #E0E0E0' }}>
            <h2 style={{ color: DS.colors.accent, marginBottom: 20, fontSize: 20 }}><AlertTriangle size={16} /> VERIFICA PRIMA DI INVIARE</h2>
            <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <p style={{ color: '#444444', marginBottom: 10, fontSize: 14 }}><BarChart3 size={16} /> <strong style={{ color: '#333333' }}>Classifica:</strong> {config.label}</p>
              <p style={{ color: '#444444', marginBottom: 10, fontSize: 14 }}><Calendar size={16} /> <strong style={{ color: '#333333' }}>Evento:</strong> {eventName} - {eventDate}</p>
              <p style={{ color: '#444444', marginBottom: 10, fontSize: 14 }}><TrendingUp size={16} /> <strong style={{ color: '#333333' }}>Tipo:</strong> {periodType === 'progressiva' ? 'Progressiva' : periodType === 'settimanale' ? 'Settimanale' : 'Finale mese'}</p>
              <div style={{ height: 1, background: '#E0E0E0', margin: '15px 0' }} />
              <p style={{ color: '#444444', marginBottom: 8, fontSize: 14 }}><Download size={16} /> <strong style={{ color: config.color }}>{getClassificaTotal()}</strong> {labels.c1}</p>
              <p style={{ color: '#444444', marginBottom: 8, fontSize: 14 }}><CheckCircle size={16} /> <strong style={{ color: '#4CAF50' }}>{getData().reduce((s,[,x])=>s+x.v2,0)}</strong> {labels.c2}</p>
              <p style={{ color: '#444444', fontSize: 14 }}><Users size={16} /> <strong style={{ color: '#333333' }}>{getData().length}</strong> partecipanti</p>
            </div>
            <p style={{ color: DS.colors.accent, fontSize: 14, marginBottom: 20, textAlign: 'center' }}><CheckCircle size={16} /> I numeri sono corretti?</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ ...S.btn, flex: 1, background: 'transparent', border: '1px solid #E0E0E0' }} onClick={() => setShowConfirmModal(false)}>Annulla</button>
              <button style={{ ...S.btn, flex: 1, background: 'linear-gradient(135deg,#4CAF50,#81C784)' }} onClick={() => { setShowConfirmModal(false); handleSendToBot(true); }}><CheckCircle size={16} /> Conferma e Invia</button>
            </div>
          </div>
        </div>
      )}
    </div></>);
}

const S = {
  // ─────────────────────────────────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────────────────────────────────
  loginWrap: { 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: DS.space.xl, 
    fontFamily: DS.font.family,
    position: 'relative',
    overflow: 'hidden',
    background: DS.colors.gray900
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
    background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, ${DS.colors.primary}30 50%, rgba(0,0,0,0.8) 100%)`,
    zIndex: 1
  },
  loginCard: { 
    background: 'rgba(255,255,255,0.95)', 
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.3)', 
    borderRadius: DS.radius.xl, 
    padding: '48px 40px', 
    width: '100%', 
    maxWidth: 400, 
    textAlign: 'center', 
    color: DS.colors.gray800, 
    boxShadow: DS.shadow.xl,
    position: 'relative',
    zIndex: 2
  },
  logoContainer: { marginBottom: DS.space['2xl'] }, 
  logoIcon: { marginBottom: DS.space.xl },
  podium: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 6, height: 65 },
  podiumBar: { width: 36, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6, boxShadow: DS.shadow.md },
  podiumNum: { fontSize: DS.font.body.size, fontWeight: 800, color: DS.colors.gray800 },
  logoText: { fontSize: 32, marginBottom: DS.space.sm, color: DS.colors.gray800, letterSpacing: '-0.5px', fontWeight: 300 }, 
  logoTagline: { color: DS.colors.primary, fontSize: DS.font.caption.size, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' },
  loginDivider: { height: 2, background: `linear-gradient(90deg, transparent, ${DS.colors.primary}, transparent)`, margin: `${DS.space['2xl']}px 0`, borderRadius: 1 },
  input: { 
    width: '100%', 
    padding: '16px 18px', 
    fontSize: DS.font.body.size, 
    border: `1px solid ${DS.colors.gray200}`, 
    borderRadius: DS.radius.md, 
    background: DS.colors.white, 
    color: DS.colors.gray800, 
    marginBottom: DS.space.lg, 
    outline: 'none', 
    boxSizing: 'border-box', 
    transition: DS.transition.fast,
    fontFamily: DS.font.family
  },
  btn: { 
    padding: '14px 24px', 
    fontSize: DS.font.body.size, 
    fontWeight: 600, 
    border: 'none', 
    borderRadius: DS.radius.md, 
    background: DS.colors.primary, 
    color: DS.colors.white, 
    cursor: 'pointer', 
    width: '100%', 
    boxShadow: DS.shadow.md, 
    transition: DS.transition.fast,
    fontFamily: DS.font.family
  },
  categoryIcons: { display: 'flex', justifyContent: 'center', gap: DS.space.xl, marginTop: DS.space['3xl'] }, 
  catIcon: { fontSize: 24, opacity: 0.6, transition: DS.transition.fast },
  
  // ─────────────────────────────────────────────────────────────────────────
  // HOME
  // ─────────────────────────────────────────────────────────────────────────
  homeWrap: { minHeight: '100vh', background: DS.colors.gray50, fontFamily: DS.font.family },
  homeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${DS.space.md}px ${DS.space.xl}px`, borderBottom: `1px solid ${DS.colors.gray200}`, background: DS.colors.white },
  homeLogoSmall: { fontSize: 18, color: DS.colors.gray800 },
  logoutBtn: { padding: `${DS.space.sm}px ${DS.space.lg}px`, fontSize: DS.font.caption.size, border: `1px solid ${DS.colors.gray200}`, borderRadius: DS.radius.md, background: 'transparent', color: DS.colors.gray600, cursor: 'pointer', fontWeight: 500 },
  homeMain: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', padding: DS.space['3xl'] },
  homeLogo: { textAlign: 'center', marginBottom: DS.space['4xl'] }, 
  homeLogoIcon: { marginBottom: DS.space.xl },
  homePodium: { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: DS.space.sm, height: 90 },
  homePodiumBar: { width: 50, borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: DS.space.sm, boxShadow: DS.shadow.md },
  homePodiumNum: { fontSize: DS.font.h2.size, fontWeight: 800, color: DS.colors.gray800 },
  homeTitle: { fontSize: 42, fontWeight: 300, color: DS.colors.gray800, marginBottom: DS.space.sm }, 
  homeSubtitle: { fontSize: DS.font.body.size, color: DS.colors.gray500, fontStyle: 'italic' },
  uploadArea: { width: '100%', maxWidth: 500, border: `2px dashed ${DS.colors.primary}40`, borderRadius: DS.radius.xl, padding: `${DS.space['4xl']}px ${DS.space['3xl']}px`, textAlign: 'center', cursor: 'pointer', transition: DS.transition.normal, background: DS.colors.white },
  uploadAreaActive: { borderColor: DS.colors.primary, background: `${DS.colors.primary}08`, transform: 'scale(1.02)' },
  uploadLabel: { cursor: 'pointer', display: 'block' }, 
  uploadIcon: { fontSize: 60, marginBottom: DS.space.xl }, 
  uploadText: { fontSize: DS.font.h2.size, fontWeight: 700, color: DS.colors.primary, marginBottom: DS.space.sm }, 
  uploadHint: { fontSize: DS.font.body.size, color: DS.colors.gray500 },
  categoriesPreview: { display: 'flex', gap: DS.space.xl, marginTop: DS.space['4xl'], flexWrap: 'wrap', justifyContent: 'center' },
  catPreviewItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: DS.space.sm, padding: `${DS.space.lg}px ${DS.space.xl}px`, background: DS.colors.white, borderRadius: DS.radius.lg, color: DS.colors.gray500, fontSize: DS.font.caption.size, border: `1px solid ${DS.colors.gray200}`, boxShadow: DS.shadow.sm },
  catPreviewIcon: { fontSize: 24 }, 
  homeFooter: { marginTop: DS.space['3xl'], color: DS.colors.gray400, fontSize: DS.font.micro.size },
  
  // ─────────────────────────────────────────────────────────────────────────
  // PREVIEW MODAL
  // ─────────────────────────────────────────────────────────────────────────
  previewWrap: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: DS.space.lg },
  previewModal: { background: DS.colors.white, borderRadius: DS.radius.xl, padding: DS.space.xl, width: '100%', maxWidth: 600, maxHeight: '95vh', display: 'flex', flexDirection: 'column', border: `1px solid ${DS.colors.gray200}`, boxShadow: DS.shadow.xl },
  previewImg: { background: DS.colors.gray50, borderRadius: DS.radius.lg, padding: DS.space.md, overflow: 'auto', flex: 1 },
  
  // ─────────────────────────────────────────────────────────────────────────
  // DASHBOARD
  // ─────────────────────────────────────────────────────────────────────────
  dash: { minHeight: '100vh', background: DS.colors.gray50, color: DS.colors.gray800, fontFamily: DS.font.family },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: `${DS.space.md}px ${DS.space.xl}px`, 
    background: DS.colors.white, 
    borderBottom: `1px solid ${DS.colors.gray200}`, 
    position: 'sticky', 
    top: 0, 
    zIndex: 100, 
    boxShadow: DS.shadow.sm,
    height: 60
  },
  menuBtn: { background: 'none', border: 'none', color: DS.colors.gray700, fontSize: 20, cursor: 'pointer', padding: DS.space.sm, borderRadius: DS.radius.md },
  badge: { 
    fontSize: DS.font.micro.size, 
    padding: `${DS.space.xs}px ${DS.space.md}px`, 
    background: DS.colors.primary, 
    color: DS.colors.white, 
    borderRadius: DS.radius.md, 
    fontWeight: 600 
  },
  sidebar: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: 280, 
    height: '100vh', 
    background: DS.colors.white, 
    padding: `60px ${DS.space.lg}px ${DS.space.xl}px`, 
    overflowY: 'auto', 
    zIndex: 200, 
    transform: 'translateX(-100%)', 
    transition: DS.transition.normal, 
    boxSizing: 'border-box', 
    borderRight: `1px solid ${DS.colors.gray200}`, 
    boxShadow: DS.shadow.lg 
  },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 },
  catLabel: { fontSize: DS.font.micro.size, color: DS.colors.gray400, letterSpacing: 1, marginTop: DS.space.lg, marginBottom: DS.space.sm, textTransform: 'uppercase', fontWeight: 600 },
  menuItem: { display: 'block', width: '100%', padding: `${DS.space.md}px ${DS.space.lg}px`, fontSize: DS.font.body.size, border: 'none', borderRadius: DS.radius.md, background: 'transparent', color: DS.colors.gray600, cursor: 'pointer', textAlign: 'left', marginBottom: 2, fontFamily: DS.font.family, fontWeight: 500 },
  menuActive: { background: `${DS.colors.primary}15`, color: DS.colors.primary },
  divider: { height: 1, background: DS.colors.gray200, margin: `${DS.space.lg}px 0` },
  periodBtn: { display: 'block', width: '100%', padding: `${DS.space.sm}px ${DS.space.md}px`, fontSize: DS.font.caption.size, border: `1px solid ${DS.colors.gray200}`, borderRadius: DS.radius.md, background: DS.colors.white, color: DS.colors.gray600, cursor: 'pointer', marginBottom: DS.space.sm, textAlign: 'left', fontFamily: DS.font.family },
  select: { width: '100%', padding: DS.space.md, fontSize: DS.font.body.size, border: `1px solid ${DS.colors.gray200}`, borderRadius: DS.radius.md, background: DS.colors.white, color: DS.colors.gray800, marginBottom: DS.space.sm, fontFamily: DS.font.family },
  inputSm: { width: '100%', padding: `${DS.space.sm}px ${DS.space.md}px`, fontSize: DS.font.caption.size, border: `1px solid ${DS.colors.gray200}`, borderRadius: DS.radius.md, background: DS.colors.white, color: DS.colors.gray800, marginBottom: DS.space.sm, boxSizing: 'border-box', fontFamily: DS.font.family },
  content: { flex: 1, padding: DS.space.xl, minHeight: 'calc(100vh - 60px)', maxWidth: 1400, margin: '0 auto' },
  uploadBox: { border: `2px dashed ${DS.colors.primary}40`, borderRadius: DS.radius.lg, padding: DS.space.xl, textAlign: 'center', marginBottom: DS.space.lg, transition: DS.transition.fast, background: DS.colors.white },
  rankCard: { background: DS.colors.white, borderRadius: DS.radius.lg, padding: DS.space.xl, border: `1px solid ${DS.colors.gray200}`, boxShadow: DS.shadow.sm },
  th: { padding: DS.space.md, fontSize: DS.font.micro.size, fontWeight: 600, color: DS.colors.gray500, textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.5px' },
};
