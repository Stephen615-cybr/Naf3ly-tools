import React from 'react';

/**
 * AdBannerSlot - Compliant container reserved for future Google AdSense ads.
 * In accordance with Google AdSense Policies:
 * - Does not display fake advertisements or misleading mockups.
 * - Does not obstruct tools or interactive elements.
 * - Leaves standard responsive slots (e.g. Leaderboard 728x90, Rectangle 300x250) ready
 *   for real ad scripts upon site approval.
 */
export const AdBannerSlot = ({ slotId, format = 'horizontal', className = '' }) => {
  return (
    <aside 
      className={`ad-slot-wrapper ${className}`}
      aria-label="Sponsor Advertisement Slot"
      style={{
        margin: '2rem auto',
        maxWidth: format === 'horizontal' ? '728px' : '336px',
        width: '100%'
      }}
    >
      <div 
        style={{
          border: '1px dashed var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-surface-secondary)',
          minHeight: format === 'horizontal' ? '90px' : '250px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem'
        }}
      >
        <span 
          style={{ 
            fontSize: '0.6875rem', 
            fontWeight: 600, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase', 
            color: 'var(--text-muted)' 
          }}
        >
          مساحة إعلانية مخصصة / Sponsor Space
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {/* Transparent placeholder notice without fake banner graphics */}
          هذه المساحة محجوزة لوحدات الإعلانات المعتمدة مستقبلاً بعد مراجعة الموقع
        </span>
      </div>
    </aside>
  );
};
