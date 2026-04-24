export default function Icon({ name, size = 16, stroke = 1.75, ...props }) {
  const s = size, sw = stroke;
  const common = {
    width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: sw,
    strokeLinecap: 'round', strokeLinejoin: 'round', ...props,
  };
  switch (name) {
    case 'home':         return <svg {...common}><path d="M3 12 12 4l9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'briefcase':    return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>;
    case 'check-square': return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 12 3 3 5-6"/></svg>;
    case 'calendar':     return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>;
    case 'users':        return <svg {...common}><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M22 18c0-2.5-2.2-4.5-5-4.5"/></svg>;
    case 'file':         return <svg {...common}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>;
    case 'bell':         return <svg {...common}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'settings':     return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'search':       return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'plus':         return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'chevron-down': return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chevron-right':return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case 'chevron-left': return <svg {...common}><path d="m15 6-6 6 6 6"/></svg>;
    case 'arrow-up':     return <svg {...common}><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></svg>;
    case 'arrow-down':   return <svg {...common}><path d="M12 5v14"/><path d="m6 13 6 6 6-6"/></svg>;
    case 'arrow-right':  return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'more':         return <svg {...common}><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></svg>;
    case 'check':        return <svg {...common}><path d="m5 13 4 4L19 7"/></svg>;
    case 'x':            return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'panel':        return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>;
    case 'help':         return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 1.5-2.5 3.5"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>;
    case 'logout':       return <svg {...common}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>;
    case 'gavel':        return <svg {...common}><path d="m14 4 6 6"/><path d="m17 7-9 9"/><path d="m11 13-7 7"/><path d="M3 21h8"/></svg>;
    case 'clock':        return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'alert':        return <svg {...common}><path d="m12 3 10 18H2L12 3z"/><path d="M12 10v5"/><circle cx="12" cy="18" r=".5" fill="currentColor"/></svg>;
    case 'msg':          return <svg {...common}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case 'dollar':       return <svg {...common}><path d="M12 2v20"/><path d="M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H6"/></svg>;
    case 'filter':       return <svg {...common}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></svg>;
    case 'doc':          return <svg {...common}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h6M9 9h2"/></svg>;
    case 'mail':         return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'shield':       return <svg {...common}><path d="M12 3 4 6v6c0 5 4 9 8 9s8-4 8-9V6z"/></svg>;
    case 'scale':        return <svg {...common}><path d="M12 3v18"/><path d="M5 8h14"/><path d="M5 8 2 14h6L5 8z"/><path d="M19 8l-3 6h6l-3-6z"/><path d="M8 21h8"/></svg>;
    case 'chart':        return <svg {...common}><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-6"/></svg>;
    case 'user':         return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>;
    case 'pencil':       return <svg {...common}><path d="M16 4l4 4-12 12H4v-4z"/></svg>;
    case 'trash':        return <svg {...common}><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6"/></svg>;
    case 'building':     return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 21V9h6v12"/><path d="M7 7h2M15 7h2M7 11h2M15 11h2M7 15h2M15 15h2"/></svg>;
    default: return null;
  }
}
