export const categories = [
  { id: 'all', labelAr: 'جميع الأدوات', labelEn: 'All Tools' },
  { id: 'education', labelAr: 'الدراسة والجامعة', labelEn: 'Education & Study' },
  { id: 'career', labelAr: 'المهنة والإنتاجية', labelEn: 'Career & Productivity' },
  { id: 'calculators', labelAr: 'الحاسبات والرياضيات', labelEn: 'Calculators & Math' },
  { id: 'text', labelAr: 'أدوات النصوص', labelEn: 'Text & Writing' }
];

export const toolsData = [
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    route: '/tools/gpa-calculator',
    category: 'education',
    iconName: 'GraduationCap',
    featured: true,
    titleAr: 'حاسبة المعدل الجامعي والتراكمي (GPA)',
    titleEn: 'GPA & CGPA Calculator',
    descAr: 'احسب معدلك الفصلي والتراكمي بدقة مع دعم نظام 4.0 و 5.0 والمئوي وتوزيع الساعات المعتمدة.',
    descEn: 'Calculate semester and cumulative GPA with standard 4.0, 5.0, and percentage grading systems.',
    badgeAr: 'الأكثر طلباً',
    badgeEn: 'Most Popular',
    tags: ['gpa', 'معدل', 'جامعة', 'تراكمي', 'university', 'college', 'grades', 'hours']
  },
  {
    id: 'cv-builder',
    slug: 'cv-builder',
    route: '/tools/cv-builder',
    category: 'career',
    iconName: 'Briefcase',
    featured: true,
    titleAr: 'صانع السيرة الذاتية المهنية (CV)',
    titleEn: 'Professional CV & Resume Builder',
    descAr: 'أنشئ سيرة ذاتية احترافية ثنائية اللغة وجاهزة للطباعة والتحميل بصيغة PDF فوراً بدون علامات مائية.',
    descEn: 'Build clean, ATS-ready resumes in English or Arabic, ready to print and save as PDF with zero watermarks.',
    badgeAr: 'احترافي',
    badgeEn: 'Professional',
    tags: ['cv', 'resume', 'سيرة ذاتية', 'توظيف', 'وظائف', 'job', 'work', 'pdf']
  },
  {
    id: 'study-planner',
    slug: 'study-planner',
    route: '/tools/study-planner',
    category: 'education',
    iconName: 'CalendarCheck',
    featured: true,
    titleAr: 'منظم المذاكرة والمهام الدراسية',
    titleEn: 'Study & Assignment Planner',
    descAr: 'جدول مذاكرتك، رتب أولويات المواد، وتابع نسبة إنجازك في متصفحك مع حفظ تلقائي محلي.',
    descEn: 'Schedule study sessions, prioritize assignments, and track progress with local browser storage.',
    badgeAr: 'إنتاجية',
    badgeEn: 'Productivity',
    tags: ['study', 'planner', 'مذاكرة', 'مهام', 'جدول', 'tasks', 'todo', 'exams']
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    route: '/tools/percentage-calculator',
    category: 'calculators',
    iconName: 'Percent',
    featured: true,
    titleAr: 'حاسبة النسب المئوية المتقدمة',
    titleEn: 'Advanced Percentage Calculator',
    descAr: 'احسب أي نسبة مئوية، ومعدل الزيادة أو النقصان، وحساب الخصم والسعر النهائي مع توضيح خطوات الحل.',
    descEn: 'Calculate percentages, percentage change (increase/decrease), and discount savings with clear formulas.',
    badgeAr: 'سريع ودقيق',
    badgeEn: 'Fast & Exact',
    tags: ['percentage', 'نسبة', 'رياضيات', 'خصم', 'discount', 'math', 'increase']
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    route: '/tools/word-counter',
    category: 'text',
    iconName: 'FileText',
    featured: true,
    titleAr: 'عداد الكلمات والنصوص الذكي',
    titleEn: 'Smart Word & Character Counter',
    descAr: 'تحليل فوري لعدد الكلمات، والأحرف، والجمل، ووقت القراءة مع أدوات تنظيف وتنسيق النصوص.',
    descEn: 'Real-time analysis of words, characters, sentences, paragraphs, and reading time with text case tools.',
    badgeAr: 'مباشر',
    badgeEn: 'Live Count',
    tags: ['word', 'counter', 'كلمات', 'أحرف', 'نصوص', 'characters', 'reading time', 'text']
  }
];
