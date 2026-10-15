import React, { useState, useEffect } from 'react';
import styles from './EngineeringHub.module.css';
import { Tabs, TabItem } from '../../design-system/components/Tabs';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { AlgorithmicTelemetry } from './components/AlgorithmicTelemetry';
import { ApplicationRegistry } from '../registry/ApplicationRegistry';
import { Cpu, Activity, Sparkles, Terminal } from 'lucide-react';

export interface EngineeringHubAppProps {
  initialTab?: 'architecture' | 'telemetry';
}

export const EngineeringHubApp: React.FC<EngineeringHubAppProps> = ({ initialTab = 'architecture' }) => {
  const [selectedTabId, setSelectedTabId] = useState<string>(() => {
    const opts = ApplicationRegistry.getLaunchOptions('prathamos.engineering');
    return (opts?.tab as 'architecture' | 'telemetry') || initialTab;
  });

  useEffect(() => {
    if (initialTab) {
      setSelectedTabId(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleTabChange = (e: CustomEvent<{ tab?: string }>) => {
      if (e.detail?.tab && (e.detail.tab === 'architecture' || e.detail.tab === 'telemetry')) {
        setSelectedTabId(e.detail.tab);
      }
    };
    window.addEventListener('prathamos:engineering-tab' as any, handleTabChange);
    return () => window.removeEventListener('prathamos:engineering-tab' as any, handleTabChange);
  }, []);

  const tabItems: TabItem[] = [
    {
      id: 'architecture',
      label: 'Systems & Architecture',
      content: <ArchitectureExplorer />
    },
    {
      id: 'telemetry',
      label: 'Algorithmic Telemetry',
      content: <AlgorithmicTelemetry />
    }
  ];

  return (
    <div className={styles.hubContainer}>
      {/* Hardware Header Bar */}
      <header className={styles.hubHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.titleArea}>
            <h1 className={styles.hubTitle}>
              <Cpu size={16} style={{ color: '#0A84FF' }} />
              Engineering Hub
            </h1>
          </div>
          <span className={styles.hardwareBadge}>
            <span className={styles.brandRedMark}>■</span>
            Anodized Void / Engineering Spec v5.0
          </span>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.telemetryStatusPill}>
            <span className={styles.statusLed} />
            CORE TELEMETRY: NOMINAL
          </div>
        </div>
      </header>

      {/* Main Viewport hosting Tabs */}
      <div className={styles.hubViewport}>
        <Tabs
          key={selectedTabId}
          items={tabItems}
          defaultSelectedId={selectedTabId}
          onChange={(id) => setSelectedTabId(id)}
          className={styles.tabsOverride}
        />
      </div>
    </div>
  );
};

export default EngineeringHubApp;
