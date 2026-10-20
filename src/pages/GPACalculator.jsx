import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  RotateCcw, 
  Award, 
  BookOpen, 
  HelpCircle,
  Calculator
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

// Standard 4.0 Scale
const SCALE_4_GRADES = [
  { label: 'A+ (4.0)', value: 4.0 },
  { label: 'A  (4.0)', value: 4.0 },
  { label: 'A- (3.7)', value: 3.7 },
  { label: 'B+ (3.3)', value: 3.3 },
  { label: 'B  (3.0)', value: 3.0 },
  { label: 'B- (2.7)', value: 2.7 },
  { label: 'C+ (2.3)', value: 2.3 },
  { label: 'C  (2.0)', value: 2.0 },
  { label: 'C- (1.7)', value: 1.7 },
  { label: 'D+ (1.3)', value: 1.3 },
  { label: 'D  (1.0)', value: 1.0 },
  { label: 'F  (0.0)', value: 0.0 }
];

// 5.0 Scale (Used in several Saudi and Arab universities)
const SCALE_5_GRADES = [
  { label: 'A+ (5.0) - ممتاز مرتفع', value: 5.0 },
  { label: 'A  (4.75) - ممتاز', value: 4.75 },
  { label: 'B+ (4.5) - جيد جداً مرتفع', value: 4.5 },
  { label: 'B  (4.0) - جيد جداً', value: 4.0 },
  { label: 'C+ (3.5) - جيد مرتفع', value: 3.5 },
  { label: 'C  (3.0) - جيد', value: 3.0 },
  { label: 'D+ (2.5) - مقبول مرتفع', value: 2.5 },
  { label: 'D  (2.0) - مقبول', value: 2.0 },
  { label: 'F  (1.0) - راسب', value: 1.0 }
];

export const GPACalculator = () => {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t('toolGPATitle'),
    description: t('toolGPADesc'),
    canonicalPath: '/tools/gpa-calculator'
  });

  const [scale, setScale] = useState('4.0');
  const [courses, setCourses] = useState([
    { id: 1, name: language === 'ar' ? 'رياضيات تفاضل وتكامل' : 'Calculus I', credits: 3, grade: 4.0 },
    { id: 2, name: language === 'ar' ? 'مقدمة في البرمجة' : 'Computer Science 101', credits: 4, grade: 3.7 },
    { id: 3, name: language === 'ar' ? 'لغة إنجليزية أكاديمية' : 'Academic English', credits: 3, grade: 4.0 },
    { id: 4, name: language === 'ar' ? 'فيزياء عامة' : 'Physics I', credits: 3, grade: 3.3 }
  ]);

  // Cumulative GPA toggle
  const [includePrior, setIncludePrior] = useState(false);
  const [priorGPA, setPriorGPA] = useState('3.45');
  const [priorCredits, setPriorCredits] = useState('45');

  const gradeOptions = scale === '5.0' ? SCALE_5_GRADES : SCALE_4_GRADES;

  const addCourse = () => {
    const nextId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    const defaultGrade = scale === '5.0' ? 4.75 : 4.0;
    setCourses([...courses, { id: nextId, name: '', credits: 3, grade: defaultGrade }]);
  };

  const removeCourse = (id) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const resetForm = () => {
    const defaultGrade = scale === '5.0' ? 4.75 : 4.0;
    setCourses([
      { id: 1, name: '', credits: 3, grade: defaultGrade },
      { id: 2, name: '', credits: 3, grade: defaultGrade },
      { id: 3, name: '', credits: 3, grade: defaultGrade }
    ]);
  };

  // Calculations
  const semesterResults = useMemo(() => {
    let totalCredits = 0;
    let totalQualityPoints = 0;

    courses.forEach((c) => {
      const cr = parseFloat(c.credits) || 0;
      const gr = parseFloat(c.grade) || 0;
      if (cr > 0) {
        totalCredits += cr;
        totalQualityPoints += cr * gr;
      }
    });

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    return {
      totalCredits,
      totalQualityPoints,
      gpa: gpa.toFixed(2)
    };
  }, [courses]);

  // Combined Cumulative GPA Calculation
  const cumulativeResults = useMemo(() => {
    if (!includePrior) return null;
    const pGPA = parseFloat(priorGPA) || 0;
    const pCreds = parseFloat(priorCredits) || 0;
    const semCreds = semesterResults.totalCredits;
    const semQP = semesterResults.totalQualityPoints;

    const priorQP = pGPA * pCreds;
    const totalCombinedCredits = pCreds + semCreds;
    const totalCombinedQP = priorQP + semQP;

    const combinedGPA = totalCombinedCredits > 0 ? totalCombinedQP / totalCombinedCredits : 0;

    return {
      combinedGPA: combinedGPA.toFixed(2),
      totalCombinedCredits
    };
  }, [includePrior, priorGPA, priorCredits, semesterResults]);

  // Academic Standing descriptor
  const getAcademicStanding = (gpaVal) => {
    const num = parseFloat(gpaVal);
    const max = scale === '5.0' ? 5.0 : 4.0;
    const ratio = num / max;

    if (ratio >= 0.875) return { text: t('gpaExcellent'), color: 'var(--color-success)', badge: 'badge-success' };
    if (ratio >= 0.75) return { text: t('gpaVeryGood'), color: 'var(--color-primary)', badge: 'badge-primary' };
    if (ratio >= 0.625) return { text: t('gpaGood'), color: 'var(--color-info)', badge: 'badge-primary' };
    if (ratio >= 0.5) return { text: t('gpaPass'), color: 'var(--color-warning)', badge: 'badge-warning' };
    return { text: t('gpaProbation'), color: 'var(--color-danger)', badge: 'badge-danger' };
  };

  const standing = getAcademicStanding(semesterResults.gpa);

  return (
    <div className="container">
      {/* Header */}
      <div className="tool-header-hero">
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <GraduationCap size={14} />
            <span>{language === 'ar' ? 'حسابات جامعية وأكاديمية' : 'University & Academic Tool'}</span>
          </div>
          <h1 className="tool-header-title">
            {t('toolGPATitle')}
          </h1>
          <p className="tool-header-desc">
            {t('toolGPADesc')}
          </p>
        </div>

        {/* Scale Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {t('gpaScaleLabel')}
          </label>
          <select 
            value={scale} 
            onChange={(e) => setScale(e.target.value)}
            className="form-select"
            style={{ fontWeight: 600, minWidth: '220px' }}
          >
            <option value="4.0">{t('gpaScale4')}</option>
            <option value="5.0">{t('gpaScale5')}</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '3fr 2fr', gap: '2rem' }}>
        {/* Left / Main: Course Input Table */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} color="var(--color-primary)" />
                <span>{language === 'ar' ? 'المقررات الدراسية لهذا الفصل' : 'Semester Courses'}</span>
              </h2>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={addCourse} className="btn btn-primary btn-sm">
                  <Plus size={16} />
                  <span>{t('gpaAddCourse')}</span>
                </button>
                <button type="button" onClick={resetForm} className="btn btn-ghost btn-sm">
                  <RotateCcw size={16} />
                  <span>{t('gpaResetBtn')}</span>
                </button>
              </div>
            </div>

            {/* Courses List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {courses.map((course, idx) => (
                <div 
                  key={course.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(140px, 2fr) minmax(80px, 1fr) minmax(140px, 1.5fr) 44px',
                    gap: '0.75rem',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {/* Course Name */}
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder={`${t('gpaCourseName')} #${idx + 1}`}
                    className="form-input"
                    style={{ fontSize: '0.875rem' }}
                  />

                  {/* Credits */}
                  <div>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', Math.max(1, parseInt(e.target.value) || 1))}
                      placeholder={t('gpaCredits')}
                      className="form-input"
                      title={t('gpaCredits')}
                      style={{ fontSize: '0.875rem' }}
                    />
                  </div>

                  {/* Grade Select */}
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', parseFloat(e.target.value))}
                    className="form-select"
                    style={{ fontSize: '0.875rem' }}
                  >
                    {gradeOptions.map((opt, i) => (
                      <option key={i} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeCourse(course.id)}
                    className="btn btn-ghost"
                    style={{ 
                      padding: '0.5rem', 
                      color: 'var(--color-danger)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      opacity: courses.length > 1 ? 1 : 0.4,
                      cursor: courses.length > 1 ? 'pointer' : 'not-allowed'
                    }}
                    title={t('gpaRemoveCourse')}
                    disabled={courses.length <= 1}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cumulative CGPA Optional Section */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>
                <input
                  type="checkbox"
                  checked={includePrior}
                  onChange={(e) => setIncludePrior(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
                <span>{t('gpaCumToggle')}</span>
              </label>
            </div>

            {includePrior && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '0.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{t('gpaPriorGPA')}</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={scale === '5.0' ? '5.0' : '4.0'}
                    value={priorGPA}
                    onChange={(e) => setPriorGPA(e.target.value)}
                    className="form-input"
                    placeholder="3.5"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{t('gpaPriorCredits')}</label>
                  <input
                    type="number"
                    min="1"
                    value={priorCredits}
                    onChange={(e) => setPriorCredits(e.target.value)}
                    className="form-input"
                    placeholder="60"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right / Results Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ backgroundColor: 'var(--bg-surface)', border: '2px solid var(--color-primary)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              {t('gpaSemesterGPA')}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>
                {semesterResults.gpa}
              </span>
              <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                / {scale === '5.0' ? '5.00' : '4.00'}
              </span>
            </div>

            {/* Academic Standing */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span className={`badge ${standing.badge}`} style={{ fontSize: '0.875rem', padding: '0.35rem 0.85rem' }}>
                <Award size={16} />
                <span>{standing.text}</span>
              </span>
            </div>

            {/* Calculation Breakdown Stats */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-surface-secondary)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('gpaTotalCredits')}</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>{semesterResults.totalCredits}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('gpaQualityPoints')}</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>{semesterResults.totalQualityPoints.toFixed(2)}</div>
              </div>
            </div>

            {/* Combined Cumulative result if toggled */}
            {cumulativeResults && (
              <div 
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid var(--border-color)',
                  marginTop: '0.5rem'
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                  {t('gpaNewCumGPA')}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {cumulativeResults.combinedGPA} <span style={{ fontSize: '1rem', fontWeight: 500 }}>/ {scale === '5.0' ? '5.00' : '4.00'}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {language === 'ar' 
                    ? `إجمالي الساعات الكلية المكتملة: ${cumulativeResults.totalCombinedCredits} ساعة` 
                    : `Total Combined Credits: ${cumulativeResults.totalCombinedCredits} hrs`}
                </div>
              </div>
            )}
          </div>

          {/* Institutional Verification Disclaimer Alert */}
          <div 
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-warning-bg)',
              border: '1px solid var(--color-warning-border)',
              display: 'flex',
              gap: '0.875rem'
            }}
          >
            <AlertTriangle size={24} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#92400e', marginBottom: '0.25rem' }}>
                {t('gpaDisclaimerTitle')}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: '#78350f', lineHeight: 1.5 }}>
                {t('gpaDisclaimerText')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdBannerSlot slotId="gpa-calculator-bottom" />
    </div>
  );
};
