import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { WordCounter } from './pages/WordCounter';
import { PercentageCalculator } from './pages/PercentageCalculator';
import { GPACalculator } from './pages/GPACalculator';
import { StudyPlanner } from './pages/StudyPlanner';
import { CVBuilder } from './pages/CVBuilder';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Core Pages */}
        <Route index element={<Home />} />
        <Route path="tools" element={<Tools />} />

        {/* Individual Working Tools */}
        <Route path="tools/word-counter" element={<WordCounter />} />
        <Route path="tools/percentage-calculator" element={<PercentageCalculator />} />
        <Route path="tools/gpa-calculator" element={<GPACalculator />} />
        <Route path="tools/study-planner" element={<StudyPlanner />} />
        <Route path="tools/cv-builder" element={<CVBuilder />} />

        {/* Company & Legal Pages */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-use" element={<TermsOfUse />} />

        {/* Fallback 404 Pages */}
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
