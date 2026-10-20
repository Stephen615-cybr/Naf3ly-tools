import React, { useState } from 'react';
import { Percent, ArrowRightLeft, TrendingUp, Tag, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const PercentageCalculator = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('basic');

  usePageMeta({
    title: t('toolPercentageTitle'),
    description: t('toolPercentageDesc'),
    canonicalPath: '/tools/percentage-calculator'
  });

  // State for Mode 1: What is X% of Y?
  const [m1Pct, setM1Pct] = useState('15');
  const [m1Val, setM1Val] = useState('200');

  // State for Mode 2: X is what % of Y?
  const [m2Part, setM2Part] = useState('45');
  const [m2Total, setM2Total] = useState('180');

  // State for Mode 3: % Increase/Decrease from X to Y?
  const [m3Initial, setM3Initial] = useState('50');
  const [m3Final, setM3Final] = useState('75');

  // State for Mode 4: Discount & Final Price
  const [m4Price, setM4Price] = useState('350');
  const [m4Discount, setM4Discount] = useState('20');

  // Mode 1 Calculation: (X * Y) / 100
  const calcMode1 = () => {
    const x = parseFloat(m1Pct);
    const y = parseFloat(m1Val);
    if (isNaN(x) || isNaN(y)) return null;
    const res = (x * y) / 100;
    return {
      result: Number.isInteger(res) ? res : res.toFixed(2),
      formula: `(${x} / 100) × ${y} = ${res.toFixed(2)}`
    };
  };

  // Mode 2 Calculation: (X / Y) * 100
  const calcMode2 = () => {
    const x = parseFloat(m2Part);
    const y = parseFloat(m2Total);
    if (isNaN(x) || isNaN(y)) return null;
    if (y === 0) return { error: t('pctErrorZero') };
    const res = (x / y) * 100;
    return {
      result: Number.isInteger(res) ? `${res}%` : `${res.toFixed(2)}%`,
      formula: `(${x} ÷ ${y}) × 100% = ${res.toFixed(2)}%`
    };
  };

  // Mode 3 Calculation: ((Final - Initial) / Initial) * 100
  const calcMode3 = () => {
    const init = parseFloat(m3Initial);
    const fin = parseFloat(m3Final);
    if (isNaN(init) || isNaN(fin)) return null;
    if (init === 0) return { error: t('pctErrorZero') };

    const diff = fin - init;
    const pct = (diff / init) * 100;
    const absPct = Math.abs(pct);
    const formatted = Number.isInteger(absPct) ? absPct : absPct.toFixed(2);

    let type = 'none';
    let textDesc = t('pctNoChange');
    if (pct > 0) {
      type = 'increase';
      textDesc = `${t('pctIncrease')} ${formatted}%`;
    } else if (pct < 0) {
      type = 'decrease';
      textDesc = `${t('pctDecrease')} ${formatted}%`;
    }

    return {
      type,
      textDesc,
      diff: Number.isInteger(diff) ? diff : diff.toFixed(2),
      formula: `((${fin} - ${init}) ÷ ${init}) × 100% = ${pct.toFixed(2)}%`
    };
  };

  // Mode 4 Calculation: Discount
  const calcMode4 = () => {
    const price = parseFloat(m4Price);
    const disc = parseFloat(m4Discount);
    if (isNaN(price) || isNaN(disc)) return null;
    const saved = (price * disc) / 100;
    const finalPrice = price - saved;
    return {
      saved: Number.isInteger(saved) ? saved : saved.toFixed(2),
      finalPrice: Number.isInteger(finalPrice) ? finalPrice : finalPrice.toFixed(2),
      formula: `${price} - (${price} × ${disc}%) = ${finalPrice.toFixed(2)}`
    };
  };

  const r1 = calcMode1();
  const r2 = calcMode2();
  const r3 = calcMode3();
  const r4 = calcMode4();

  const tabs = [
    { id: 'basic', label: t('pctTabBasic'), icon: <Percent size={18} /> },
    { id: 'whatPercent', label: t('pctTabWhatPercent'), icon: <ArrowRightLeft size={18} /> },
    { id: 'change', label: t('pctTabChange'), icon: <TrendingUp size={18} /> },
    { id: 'discount', label: t('pctTabDiscount'), icon: <Tag size={18} /> }
  ];

  return (
    <div className="container">
      {/* Header */}
      <div className="tool-header-hero">
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Percent size={14} />
            <span>{language === 'ar' ? 'حاسبات ذكية' : 'Smart Calculators'}</span>
          </div>
          <h1 className="tool-header-title">
            {t('toolPercentageTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('toolPercentageDesc')}
          </p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div 
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-lg)' }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Calculator Body Container */}
      <div className="card" style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
        
        {/* TAB 1: What is X% of Y? */}
        {activeTab === 'basic' && (
          <div>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>{t('pctTabBasic')}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctWhatIs')} (%)</label>
                <input
                  type="number"
                  step="any"
                  value={m1Pct}
                  onChange={(e) => setM1Pct(e.target.value)}
                  className="form-input"
                  placeholder="15"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctOf')}</label>
                <input
                  type="number"
                  step="any"
                  value={m1Val}
                  onChange={(e) => setM1Val(e.target.value)}
                  className="form-input"
                  placeholder="200"
                />
              </div>
            </div>

            {r1 && (
              <div style={{ backgroundColor: 'var(--bg-surface-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{t('pctResult')}</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', margin: '0.25rem 0 0.5rem' }}>
                  {r1.result}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <strong>{t('pctFormula')}</strong> <code>{r1.formula}</code>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: X is what % of Y? */}
        {activeTab === 'whatPercent' && (
          <div>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>{t('pctTabWhatPercent')}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctWhatPercentIs')}</label>
                <input
                  type="number"
                  step="any"
                  value={m2Part}
                  onChange={(e) => setM2Part(e.target.value)}
                  className="form-input"
                  placeholder="45"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctFromTotal')}</label>
                <input
                  type="number"
                  step="any"
                  value={m2Total}
                  onChange={(e) => setM2Total(e.target.value)}
                  className="form-input"
                  placeholder="180"
                />
              </div>
            </div>

            {r2 && (
              <div style={{ backgroundColor: 'var(--bg-surface-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {r2.error ? (
                  <div style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{r2.error}</div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{t('pctResult')}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', margin: '0.25rem 0 0.5rem' }}>
                      {r2.result}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <strong>{t('pctFormula')}</strong> <code>{r2.formula}</code>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Increase / Decrease */}
        {activeTab === 'change' && (
          <div>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>{t('pctTabChange')}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctInitialValue')}</label>
                <input
                  type="number"
                  step="any"
                  value={m3Initial}
                  onChange={(e) => setM3Initial(e.target.value)}
                  className="form-input"
                  placeholder="50"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctFinalValue')}</label>
                <input
                  type="number"
                  step="any"
                  value={m3Final}
                  onChange={(e) => setM3Final(e.target.value)}
                  className="form-input"
                  placeholder="75"
                />
              </div>
            </div>

            {r3 && (
              <div style={{ backgroundColor: 'var(--bg-surface-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {r3.error ? (
                  <div style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{r3.error}</div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{t('pctResult')}</div>
                    <div 
                      style={{ 
                        fontSize: '1.75rem', 
                        fontWeight: 800, 
                        color: r3.type === 'increase' ? 'var(--color-success)' : r3.type === 'decrease' ? 'var(--color-danger)' : 'var(--text-primary)',
                        margin: '0.25rem 0 0.5rem' 
                      }}
                    >
                      {r3.textDesc}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <strong>{t('pctFormula')}</strong> <code>{r3.formula}</code>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Discount & Savings */}
        {activeTab === 'discount' && (
          <div>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>{t('pctTabDiscount')}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctOriginalPrice')}</label>
                <input
                  type="number"
                  step="any"
                  value={m4Price}
                  onChange={(e) => setM4Price(e.target.value)}
                  className="form-input"
                  placeholder="350"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('pctDiscountRate')}</label>
                <input
                  type="number"
                  step="any"
                  value={m4Discount}
                  onChange={(e) => setM4Discount(e.target.value)}
                  className="form-input"
                  placeholder="20"
                />
              </div>
            </div>

            {r4 && (
              <div style={{ backgroundColor: 'var(--bg-surface-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('pctDiscountSaved')}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                      {r4.saved}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('pctFinalPrice')}</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {r4.finalPrice}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <strong>{t('pctFormula')}</strong> <code>{r4.formula}</code>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AdBannerSlot slotId="percentage-calculator-bottom" />
    </div>
  );
};
