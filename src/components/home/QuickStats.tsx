'use client';

import Link from 'next/link';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

export default function QuickStats() {
  const { lguName, statistics, labels } = useSiteConfig();

  const stats = [
    { 
      href: '/statistics', 
      icon: 'bi-people-fill', 
      value: statistics.population.count > 0 ? statistics.population.count.toLocaleString() : '—', 
      label: 'Population', 
      source: statistics.population.source || `${statistics.population.year} Census`
    },
    { 
      href: '/government', 
      icon: 'bi-geo-alt-fill', 
      value: statistics.subdivisions.count > 0 ? statistics.subdivisions.count.toString() : '—', 
      label: labels.subdivisionTypePlural, 
      source: statistics.subdivisions.source || 'Administrative Units'
    },
    { 
      href: '/budget', 
      icon: 'bi-award-fill', 
      value: statistics.incomeClass.class || '—', 
      label: labels.lguTypeLabel, 
      source: statistics.incomeClass.source || 'Income Classification'
    },
    { 
      href: '/statistics', 
      icon: 'bi-rulers', 
      value: statistics.landArea.value > 0 ? `${statistics.landArea.value} ${statistics.landArea.unit}` : '—', 
      label: 'Land Area', 
      source: statistics.landArea.source || 'Total Area'
    },
  ];

  return (
    <section className="home-stats-v2">
      <div className="container">
        <div className="home-stats-v2-header">
          <h2>{lguName} at a Glance</h2>
          <Link href="/statistics" className="home-section-link">
            View Statistics <i className="bi bi-arrow-right" />
          </Link>
        </div>
        <div className="home-stats-v2-grid">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="home-stat-card">
              <div className="home-stat-card-icon">
                <i className={`bi ${stat.icon}`} />
              </div>
              <div className="home-stat-card-content">
                <span className="home-stat-card-value">{stat.value}</span>
                <span className="home-stat-card-label">{stat.label}</span>
                <span className="home-stat-card-source">{stat.source}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
