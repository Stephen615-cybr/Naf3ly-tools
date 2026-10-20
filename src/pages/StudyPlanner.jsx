import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { AdBannerSlot } from '../components/AdBannerSlot';

export const StudyPlanner = () => {
  const { t, language } = useLanguage();

  usePageMeta({
    title: t('toolPlannerTitle'),
    description: t('toolPlannerDesc'),
    canonicalPath: '/tools/study-planner'
  });

  // LocalStorage tasks persistence
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('naf3ly_study_planner_tasks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    // Default starter tasks
    return [
      {
        id: 1,
        title: language === 'ar' ? 'مراجعة الفصل الثالث في الرياضيات' : 'Review Calculus Chapter 3',
        subject: language === 'ar' ? 'رياضيات' : 'Mathematics',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        priority: 'high',
        completed: false
      },
      {
        id: 2,
        title: language === 'ar' ? 'حل تدريبات الخوارزميات وهياكل البيانات' : 'Solve Data Structures Problems',
        subject: language === 'ar' ? 'علوم الحاسب' : 'Computer Science',
        dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        priority: 'medium',
        completed: true
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('naf3ly_study_planner_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  // Filter State
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || (language === 'ar' ? 'عام' : 'General'),
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      priority,
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setSubject('');
    setDueDate('');
    setIsAdding(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    if (window.confirm(t('spDeleteConfirm'))) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const clearAllTasks = () => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من مسح جميع المهام؟' : 'Are you sure you want to clear all tasks?')) {
      setTasks([]);
    }
  };

  const loadSampleTasks = () => {
    const samples = [
      {
        id: Date.now() + 1,
        title: language === 'ar' ? 'كتابة ملخص محاضرة الذكاء الاصطناعي' : 'Summarize AI & Machine Learning lecture',
        subject: language === 'ar' ? 'ذكاء اصطناعي' : 'Artificial Intelligence',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        priority: 'high',
        completed: false
      },
      {
        id: Date.now() + 2,
        title: language === 'ar' ? 'حل التكليف الأسبوعي لمقرر إدارة الأعمال' : 'Complete Weekly Business Case Study',
        subject: language === 'ar' ? 'إدارة الأعمال' : 'Business Management',
        dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        priority: 'medium',
        completed: false
      },
      {
        id: Date.now() + 3,
        title: language === 'ar' ? 'مراجعة مفردات اختبار التوفل / الآيلتس' : 'Study IELTS / TOEFL Vocabulary List',
        subject: language === 'ar' ? 'لغة إنجليزية' : 'English Language',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'low',
        completed: true
      }
    ];
    setTasks(samples);
  };

  // Stats
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtered Tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'high':
        return <span className="badge badge-danger">{t('spPriorityHigh')}</span>;
      case 'medium':
        return <span className="badge badge-warning">{t('spPriorityMedium')}</span>;
      default:
        return <span className="badge badge-primary">{t('spPriorityLow')}</span>;
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="tool-header-hero">
        <div className="tool-header-content">
          <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            <CalendarCheck size={14} />
            <span>{language === 'ar' ? 'تنظيم الدراسة والإنتاجية' : 'Study & Productivity'}</span>
          </div>
          <h1 className="tool-header-title">
            {t('toolPlannerTitle')}
          </h1>
          <p className="tool-header-desc">
            {t('toolPlannerDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setIsAdding(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>{t('spAddTask')}</span>
          </button>
          <button type="button" onClick={loadSampleTasks} className="btn btn-secondary">
            <Sparkles size={16} />
            <span>{t('spLoadSample')}</span>
          </button>
        </div>
      </div>

      {/* Progress & Stats Cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('spCompletionRate')}</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{progressPercent}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-surface-secondary)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${progressPercent}%`, 
                height: '100%', 
                backgroundColor: 'var(--color-primary)', 
                borderRadius: '9999px',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('spTotalTasks')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{totalCount}</div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('spPendingTasks')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-warning)' }}>{pendingCount}</div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t('spCompletedTasks')}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success)' }}>{completedCount}</div>
        </div>
      </div>

      {/* Add Task Modal / Form Drawer */}
      {isAdding && (
        <div className="card" style={{ marginBottom: '2rem', border: '2px solid var(--color-primary)' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1.125rem' }}>{t('spAddTask')}</h3>
          <form onSubmit={handleAddTask}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('spTaskTitle')} *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: حل مسائل الفيزياء ص 45' : 'e.g., Read Physics Chapter 4'}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('spTaskSubject')}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: فيزياء عامة' : 'e.g., General Physics'}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('spDueDate')}</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t('spPriority')}</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  <option value="high">{t('spPriorityHigh')}</option>
                  <option value="medium">{t('spPriorityMedium')}</option>
                  <option value="low">{t('spPriorityLow')}</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost">
                {t('spCancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('spSaveTask')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs and Actions Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('spFilterAll')} ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('spFilterPending')} ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('spFilterCompleted')} ({completedCount})
          </button>
        </div>

        {tasks.length > 0 && (
          <button type="button" onClick={clearAllTasks} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)' }}>
            <Trash2 size={14} />
            <span>{t('spClearAll')}</span>
          </button>
        )}
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="card text-center" style={{ padding: '3.5rem 1.5rem', marginBottom: '2rem' }}>
          <CalendarCheck size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{t('spNoTasks')}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            {t('spNoTasksHint')}
          </p>
          <button type="button" onClick={() => setIsAdding(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>{t('spAddTask')}</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                gap: '1rem',
                opacity: task.completed ? 0.7 : 1,
                backgroundColor: task.completed ? 'var(--bg-surface-secondary)' : 'var(--bg-surface)'
              }}
            >
              {/* Checkbox and Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1 }}>
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: task.completed ? 'var(--color-success)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label="Toggle task status"
                >
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div>
                  <div 
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}
                  >
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{task.subject}</span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Priority & Delete Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {getPriorityBadge(task.priority)}

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="btn btn-ghost"
                  style={{ padding: '0.4rem', color: 'var(--color-danger)' }}
                  title="Delete"
                  aria-label="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LocalStorage Storage Notice */}
      <div 
        style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-info-bg)',
          border: '1px solid var(--color-info-border)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          marginBottom: '2rem'
        }}
      >
        <Info size={20} color="var(--color-info)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-info)', marginBottom: '0.2rem' }}>
            {t('spStorageNoticeTitle')}
          </h4>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {t('spStorageNoticeText')}
          </p>
        </div>
      </div>

      <AdBannerSlot slotId="study-planner-bottom" />
    </div>
  );
};
