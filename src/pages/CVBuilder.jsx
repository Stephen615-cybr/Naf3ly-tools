import React, { useState } from 'react';
import { 
  Briefcase, 
  Printer, 
  Sparkles, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Eye, 
  Edit3, 
  FileText, 
  User, 
  GraduationCap, 
  Code, 
  Layers, 
  Info,
  Check,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const CVBuilder = () => {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t('toolCVTitle'),
    description: t('toolCVDesc'),
    canonicalPath: '/tools/cv-builder'
  });

  // State for CV content
  const [cvDirection, setCvDirection] = useState('ar'); // 'ar' (rtl) or 'en' (ltr)
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'

  const [personal, setPersonal] = useState({
    fullName: language === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohamed Ali',
    jobTitle: language === 'ar' ? 'مهندس برمجيات ومطور واجهات' : 'Frontend Software Engineer',
    email: 'ahmed.dev@example.com',
    phone: '+20 100 123 4567',
    location: language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
    website: 'linkedin.com/in/ahmed-example',
    summary: language === 'ar' 
      ? 'مهندس واجهات أمامية شغوف ببناء تطبيقات ويب تفاعلية وسريعة الاستجابة، بخبرة عملية في React و JavaScript الحديثة وتصميم واجهات المستخدم المتميزة وفق أعلى معايير سهولة الاستخدام.'
      : 'Passionate Frontend Engineer with hands-on experience in building performant, accessible React web applications, modern JavaScript architectures, and user-centric interfaces.'
  });

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: language === 'ar' ? 'بكالوريوس هندسة الحاسبات ونظم التحكم' : 'B.Sc. in Computer Engineering',
      school: language === 'ar' ? 'جامعة القاهرة' : 'Cairo University',
      startYear: '2020',
      endYear: '2024',
      details: language === 'ar' ? 'تقدير عام: امتياز مع مرتبة الشرف. مشروع التخرج: منصة أدوات تعليمية تفاعلية.' : 'Graduated with First Class Honors. Capstone: Interactive Educational Platform.'
    }
  ]);

  const [experience, setExperience] = useState([
    {
      id: 1,
      role: language === 'ar' ? 'مطور واجهات أمامية (Frontend Developer)' : 'Junior Frontend Developer',
      company: language === 'ar' ? 'شركة الحلول الرقمية الذكية' : 'Digital Solutions Inc.',
      startYear: '2023',
      endYear: language === 'ar' ? 'حتى الآن' : 'Present',
      details: language === 'ar' 
        ? '• تطوير مكونات واجهة مستخدم قابلة لإعادة الاستخدام باستخدام React.\n• تحسين أداء تحميل الصفحات بنسبة 35%.\n• التعاون مع فريق التصميم لترجمة نماذج Figma بدقة عالية.'
        : '• Developed modular, accessible React UI components.\n• Optimized web asset delivery and reduced initial page load times by 35%.\n• Collaborated closely with UI/UX teams to translate Figma wireframes into clean code.'
    }
  ]);

  const [skills, setSkills] = useState([
    'JavaScript (ES6+)',
    'React.js',
    'HTML5 & CSS3',
    'Responsive Design',
    'Git & GitHub',
    'REST APIs',
    'Problem Solving',
    'Teamwork'
  ]);
  const [skillInput, setSkillInput] = useState('');

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: language === 'ar' ? 'تطبيق منصة أدوات نفعلي' : 'Naf3ly Productivity Suite',
      link: 'https://naf3ly-tools.pages.dev',
      details: language === 'ar' 
        ? 'منصة أدوات ويب سريعة للطلاب والخريجين تدعم اللغتين العربية والإنجليزية، وتعمل بالكامل في المتصفح.'
        : 'A responsive bilingual web utility suite with zero server dependencies, supporting Arabic RTL and English LTR.'
    }
  ]);

  // Handlers for Education
  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now(), degree: '', school: '', startYear: '', endYear: '', details: '' }
    ]);
  };
  const updateEducation = (id, field, val) => {
    setEducation(education.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };
  const removeEducation = (id) => {
    setEducation(education.filter((e) => e.id !== id));
  };

  // Handlers for Experience
  const addExperience = () => {
    setExperience([
      ...experience,
      { id: Date.now(), role: '', company: '', startYear: '', endYear: '', details: '' }
    ]);
  };
  const updateExperience = (id, field, val) => {
    setExperience(experience.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };
  const removeExperience = (id) => {
    setExperience(experience.filter((e) => e.id !== id));
  };

  // Handlers for Projects
  const addProject = () => {
    setProjects([
      ...projects,
      { id: Date.now(), title: '', link: '', details: '' }
    ]);
  };
  const updateProject = (id, field, val) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };
  const removeProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Handlers for Skills
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (!skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
    }
    setSkillInput('');
  };
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handlePrint = () => {
    window.print();
  };

  const loadSampleData = () => {
    if (cvDirection === 'ar') {
      setPersonal({
        fullName: 'سارة عبد الله المنصوري',
        jobTitle: 'أخصائية إدارة مشاريع وتحليل أعمال',
        email: 'sara.mansoori@example.com',
        phone: '+966 55 123 4567',
        location: 'الرياض، المملكة العربية السعودية',
        website: 'linkedin.com/in/sara-example',
        summary: 'متخصصة في إدارة المشاريع التقنية والتحول الرقمي بخبرة تزيد عن 3 سنوات في تخطيط المبادرات وتنسيق الفرق البرمجية لضمان التسليم وفق أعلى معايير الجودة والميزانيات المعتمدة.'
      });
      setEducation([
        {
          id: 1,
          degree: 'بكالوريوس نظم المعلومات الإدارية (MIS)',
          school: 'جامعة الملك سعود',
          startYear: '2019',
          endYear: '2023',
          details: 'معدل تراكمي 4.85 / 5.0 مع مرتبة الشرف الأولى. قيادة النادي الطلابي لتقنية المعلومات.'
        }
      ]);
      setExperience([
        {
          id: 1,
          role: 'منسقة مشاريع رقمية (Project Coordinator)',
          company: 'مجموعة الابتكار التقني',
          startYear: '2023',
          endYear: 'حتى الآن',
          details: '• إدارة الجداول الزمنية ومتابعة مؤشرات أداء 4 مشاريع برمجية متزامنة.\n• إعداد وثائق متطلبات الأعمال (BRD) وتقارير الإنجاز الأسبوعية للإدارة التنفيذية.'
        }
      ]);
      setSkills(['Agile / Scrum', 'إدارة المشاريع', 'تحليل الأعمال', 'Jira & Confluence', 'إعداد التقارير', 'التواصل الفعال']);
      setProjects([
        {
          id: 1,
          title: 'مشروع أتمتة إدارة وثائق التدريب',
          link: '',
          details: 'تطوير نظام داخلي لمتابعة سير برامج التدريب الصيفي وتقليل الأخطاء الإجرائية بنسبة 40%.'
        }
      ]);
    } else {
      setPersonal({
        fullName: 'Omar Hassan',
        jobTitle: 'Full-Stack Web Developer',
        email: 'omar.hassan@example.com',
        phone: '+971 50 987 6543',
        location: 'Dubai, UAE',
        website: 'github.com/omar-example',
        summary: 'Resourceful Full-Stack Engineer with strong foundation in React, Node.js, and modern cloud deployment. Dedicated to delivering scalable, secure, and user-friendly digital products.'
      });
      setEducation([
        {
          id: 1,
          degree: 'B.Sc. in Computer Science',
          school: 'American University of Sharjah',
          startYear: '2019',
          endYear: '2023',
          details: 'Dean’s Honor List. Specialization in Software Engineering and Distributed Systems.'
        }
      ]);
      setExperience([
        {
          id: 1,
          role: 'Software Developer',
          company: 'Apex Cloud Solutions',
          startYear: '2023',
          endYear: 'Present',
          details: '• Architected RESTful microservices handling 50k+ daily transactions.\n• Built responsive customer dashboards with React and Tailwind CSS.\n• Improved automated CI/CD pipeline reliability.'
        }
      ]);
      setSkills(['React.js', 'Node.js / Express', 'TypeScript', 'PostgreSQL', 'Docker', 'Git', 'Agile']);
      setProjects([
        {
          id: 1,
          title: 'E-Commerce Analytics Engine',
          link: 'https://example.com/demo',
          details: 'A real-time data visualizer tracking user cart drop-offs and conversions with sub-second latency.'
        }
      ]);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="tool-header-hero no-print">
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <Briefcase size={14} />
            <span>{language === 'ar' ? 'أدوات التوظيف والمهنة' : 'Career & Employment Tool'}</span>
          </div>
          <h1 className="tool-header-title">
            {t('toolCVTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('toolCVDesc')}
          </p>
        </div>

        {/* Global Action Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={handlePrint} className="btn btn-primary">
            <Printer size={18} />
            <span>{t('cvPrintBtn')}</span>
          </button>
          <button type="button" onClick={loadSampleData} className="btn btn-secondary">
            <Sparkles size={16} />
            <span>{t('cvFillSample')}</span>
          </button>
        </div>
      </div>

      {/* Control bar: Tabs & Language Direction Toggle */}
      <div 
        className="no-print"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {/* Edit / Preview Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`btn ${activeTab === 'edit' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Edit3 size={16} />
            <span>{t('cvTabEdit')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`btn ${activeTab === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Eye size={16} />
            <span>{t('cvTabPreview')}</span>
          </button>
        </div>

        {/* CV Language / Direction Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {t('cvDirectionLabel')}
          </span>
          <select
            value={cvDirection}
            onChange={(e) => setCvDirection(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontWeight: 600 }}
          >
            <option value="ar">{t('cvDirAr')}</option>
            <option value="en">{t('cvDirEn')}</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Grid in desktop, or Tabs */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: activeTab === 'edit' ? '1fr' : '1fr',
          gap: '2rem'
        }}
      >
        {/* FORM EDITOR VIEW */}
        {activeTab === 'edit' && (
          <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* 1. Personal Information */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <User size={18} color="var(--color-primary)" />
                <span>{t('cvPersonalSection')}</span>
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('cvFullName')}</label>
                  <input
                    type="text"
                    value={personal.fullName}
                    onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('cvJobTitle')}</label>
                  <input
                    type="text"
                    value={personal.jobTitle}
                    onChange={(e) => setPersonal({ ...personal, jobTitle: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('cvEmail')}</label>
                  <input
                    type="email"
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('cvPhone')}</label>
                  <input
                    type="text"
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('cvLocation')}</label>
                  <input
                    type="text"
                    value={personal.location}
                    onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('cvWebsite')}</label>
                  <input
                    type="text"
                    value={personal.website}
                    onChange={(e) => setPersonal({ ...personal, website: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('cvSummary')}</label>
                <textarea
                  rows={3}
                  value={personal.summary}
                  onChange={(e) => setPersonal({ ...personal, summary: e.target.value })}
                  className="form-textarea"
                />
              </div>
            </div>

            {/* 2. Work Experience */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={18} color="var(--color-accent)" />
                  <span>{t('cvExperienceSection')}</span>
                </h3>
                <button type="button" onClick={addExperience} className="btn btn-secondary btn-sm">
                  <Plus size={14} />
                  <span>{t('cvAddExperience')}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {experience.map((exp, idx) => (
                  <div 
                    key={exp.id}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-secondary)',
                      border: '1px solid var(--border-color)',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--color-danger)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvExpRole')}</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvExpCompany')}</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvExpStart')}</label>
                        <input
                          type="text"
                          value={exp.startYear}
                          onChange={(e) => updateExperience(exp.id, 'startYear', e.target.value)}
                          placeholder="2022"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvExpEnd')}</label>
                        <input
                          type="text"
                          value={exp.endYear}
                          onChange={(e) => updateExperience(exp.id, 'endYear', e.target.value)}
                          placeholder="Present"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">{t('cvExpDesc')}</label>
                      <textarea
                        rows={3}
                        value={exp.details}
                        onChange={(e) => updateExperience(exp.id, 'details', e.target.value)}
                        className="form-textarea"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Education */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={18} color="#8b5cf6" />
                  <span>{t('cvEducationSection')}</span>
                </h3>
                <button type="button" onClick={addEducation} className="btn btn-secondary btn-sm">
                  <Plus size={14} />
                  <span>{t('cvAddEducation')}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {education.map((edu) => (
                  <div 
                    key={edu.id}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-secondary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--color-danger)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvDegree')}</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvSchool')}</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvEduStart')}</label>
                        <input
                          type="text"
                          value={edu.startYear}
                          onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvEduEnd')}</label>
                        <input
                          type="text"
                          value={edu.endYear}
                          onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">{t('cvEduDesc')}</label>
                      <input
                        type="text"
                        value={edu.details}
                        onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Skills */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Code size={18} color="#06b6d4" />
                <span>{t('cvSkillsSection')}</span>
              </h3>

              <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder={t('cvSkillsPlaceholder')}
                  className="form-input"
                  style={{ maxWidth: '400px' }}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <Plus size={14} />
                  <span>{t('cvAddSkill')}</span>
                </button>
              </form>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="badge badge-primary"
                    style={{ fontSize: '0.875rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
                      aria-label="Remove skill"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Projects */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={18} color="#f59e0b" />
                  <span>{t('cvProjectsSection')}</span>
                </h3>
                <button type="button" onClick={addProject} className="btn btn-secondary btn-sm">
                  <Plus size={14} />
                  <span>{t('cvAddProject')}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {projects.map((proj) => (
                  <div 
                    key={proj.id}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-secondary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--color-danger)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvProjectTitle')}</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">{t('cvProjectLink')}</label>
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                          placeholder="https://..."
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">{t('cvProjectDesc')}</label>
                      <textarea
                        rows={2}
                        value={proj.details}
                        onChange={(e) => updateProject(proj.id, 'details', e.target.value)}
                        className="form-textarea"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Preview trigger button */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button 
                type="button" 
                onClick={() => setActiveTab('preview')} 
                className="btn btn-primary btn-lg"
              >
                <Eye size={20} />
                <span>{t('cvTabPreview')}</span>
              </button>
            </div>
          </div>
        )}

        {/* LIVE RESUME PREVIEW & PRINT SHEET */}
        {(activeTab === 'preview' || true) && (
          <div className={activeTab !== 'preview' ? 'print-only' : ''}>
            
            {/* Step-by-Step Print Instructions Box */}
            <div 
              className="no-print"
              style={{
                backgroundColor: 'var(--color-info-bg)',
                border: '1px solid var(--color-info-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '0.875rem'
              }}
            >
              <Info size={24} color="var(--color-info)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-info)', marginBottom: '0.4rem' }}>
                  {t('cvPrintInstructionsTitle')}
                </h4>
                <ol style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', paddingInlineStart: '1.25rem', lineHeight: 1.6 }}>
                  <li>{t('cvPrintInstructionsStep1')}</li>
                  <li>{t('cvPrintInstructionsStep2')}</li>
                  <li>{t('cvPrintInstructionsStep3')}</li>
                </ol>
              </div>
            </div>

            {/* Resume Sheet Container (Standard A4 Proportions) */}
            <div 
              id="cv-printable-area"
              dir={cvDirection === 'ar' ? 'rtl' : 'ltr'}
              style={{
                backgroundColor: '#ffffff',
                color: '#1e293b',
                maxWidth: '850px',
                margin: '0 auto',
                padding: '3rem 3.5rem',
                boxShadow: 'var(--shadow-xl)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontFamily: cvDirection === 'ar' ? 'var(--font-arabic)' : 'var(--font-latin)',
                lineHeight: 1.6
              }}
            >
              {/* CV Header */}
              <div style={{ borderBottom: '2px solid #2563eb', paddingBottom: '1.5rem', marginBottom: '1.75rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0' }}>
                  {personal.fullName || (cvDirection === 'ar' ? 'الاسم الكامل' : 'Your Full Name')}
                </h1>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#2563eb', marginBottom: '1rem' }}>
                  {personal.jobTitle || (cvDirection === 'ar' ? 'المسمى الوظيفي' : 'Target Job Title')}
                </div>

                {/* Contact Icons Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.875rem', color: '#475569' }}>
                  {personal.email && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Mail size={15} color="#2563eb" />
                      <span>{personal.email}</span>
                    </div>
                  )}
                  {personal.phone && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Phone size={15} color="#2563eb" />
                      <span>{personal.phone}</span>
                    </div>
                  )}
                  {personal.location && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={15} color="#2563eb" />
                      <span>{personal.location}</span>
                    </div>
                  )}
                  {personal.website && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Globe size={15} color="#2563eb" />
                      <span>{personal.website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              {personal.summary && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                    {cvDirection === 'ar' ? 'النبذة المهنية' : 'Professional Summary'}
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: '#334155', lineHeight: 1.7 }}>
                    {personal.summary}
                  </p>
                </div>
              )}

              {/* Work Experience */}
              {experience.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '1rem' }}>
                    {cvDirection === 'ar' ? 'الخبرات المهنية' : 'Work Experience'}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                            {exp.role || (cvDirection === 'ar' ? 'المسمى الوظيفي' : 'Job Title')}
                          </span>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>
                            {exp.startYear} - {exp.endYear}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2563eb', marginBottom: '0.4rem' }}>
                          {exp.company}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#334155', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                          {exp.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '1rem' }}>
                    {cvDirection === 'ar' ? 'التعليم والمؤهلات' : 'Education'}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                            {edu.degree || (cvDirection === 'ar' ? 'الشهادة' : 'Degree')}
                          </span>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>
                            {edu.startYear} - {edu.endYear}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2563eb', marginBottom: '0.25rem' }}>
                          {edu.school}
                        </div>
                        {edu.details && (
                          <div style={{ fontSize: '0.8125rem', color: '#475569' }}>
                            {edu.details}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                    {cvDirection === 'ar' ? 'المهارات والقدرات' : 'Skills & Competencies'}
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {skills.map((skill, i) => (
                      <span 
                        key={i} 
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#1e293b',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '4px',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Projects */}
              {projects.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '1rem' }}>
                    {cvDirection === 'ar' ? 'المشاريع البارزة' : 'Featured Projects'}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {projects.map((proj) => (
                      <div key={proj.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a' }}>
                            {proj.title}
                          </span>
                          {proj.link && (
                            <span style={{ fontSize: '0.8125rem', color: '#2563eb' }}>
                              {proj.link}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '0.25rem' }}>
                          {proj.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Print Action Bottom */}
            <div className="no-print" style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button type="button" onClick={handlePrint} className="btn btn-primary btn-lg">
                <Printer size={20} />
                <span>{t('cvPrintBtn')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Embedded CSS for Print Optimization */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          header, footer, .no-print, .ad-slot-wrapper {
            display: none !important;
          }
          .main-content {
            padding: 0 !important;
          }
          .container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #cv-printable-area {
            box-shadow: none !important;
            border: none !important;
            padding: 15mm 20mm !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .print-only {
            display: block !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
        @media screen {
          .print-only {
            display: none;
          }
        }
      `}</style>

      <AdBannerSlot slotId="cv-builder-bottom" />
    </div>
  );
};
