import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import PensionCalculator from './components/PensionCalculator';
import MortgageCalculator from './components/MortgageCalculator';
import SavingsGoalCalculator from './components/SavingsGoalCalculator';
import InflationCalculator from './components/InflationCalculator';
import ComparisonCalculator from './components/ComparisonCalculator';
import HistoryTab from './components/HistoryTab';
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const tabs = [
  { id: 'compound', label: 'ריבית דה ריבית', emoji: '📈' },
  { id: 'comparison', label: 'השוואת תרחישים', emoji: '⚖️' },
  { id: 'pension', label: 'קרן פנסיה', emoji: '🏦' },
  { id: 'mortgage', label: 'משכנתא', emoji: '🏠' },
  { id: 'savings', label: 'חיסכון ליעד', emoji: '🎯' },
  { id: 'inflation', label: 'אינפלציה', emoji: '📉' },
  { id: 'history', label: 'החישובים שלי', emoji: '📋' },
];

const tabsStyle = {
  wrapper: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 1.5rem' },
  tabs: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  tab: (active) => ({
    padding: '8px 16px',
    borderRadius: '20px',
    border: active ? '0.5px solid rgba(201,168,76,0.5)' : '0.5px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
    color: active ? '#C9A84C' : '#8A8A9A',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.2s',
  }),
};

export default function App() {
  const [activeTab, setActiveTab] = useState('compound');

  const handleLoadCalculation = (entry) => {
    setActiveTab(entry.type);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <div style={tabsStyle.wrapper}>
        <div style={tabsStyle.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={tabsStyle.tab(activeTab === tab.id)}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'compound' && <Calculator />}
      {activeTab === 'comparison' && <ComparisonCalculator />}
      {activeTab === 'pension' && <PensionCalculator />}
      {activeTab === 'mortgage' && <MortgageCalculator />}
      {activeTab === 'savings' && <SavingsGoalCalculator />}
      {activeTab === 'inflation' && <InflationCalculator />}
      {activeTab === 'history' && <HistoryTab onLoadCalculation={handleLoadCalculation} />}

      {activeTab !== 'history' && (
        <>
          <About />
          <FAQ />
        </>
      )}
      <Footer />
    </>
  );
}
