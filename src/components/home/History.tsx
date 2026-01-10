'use client';

import { useSiteConfig } from '@/contexts/SiteConfigContext';

export default function History() {
  const { lguName, history } = useSiteConfig();

  // Only render if there's history content
  if (!history.timeline || history.timeline.length === 0) {
    return null;
  }

  return (
    <section className="section history-section">
      <div className="container">
        <div className="home-stats-v2-header">
          <h2><i className="bi bi-book" aria-hidden="true" /> Brief History of {lguName}</h2>
        </div>
        <div className="history-content">
          <div className="history-timeline">
            {history.timeline.map((item, index) => (
              <div key={item.year || index} className="timeline-item" data-year={item.year}>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
