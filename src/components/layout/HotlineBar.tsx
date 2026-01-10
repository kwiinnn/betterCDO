'use client';

import { useSiteConfig } from '@/contexts/SiteConfigContext';

export default function HotlineBar() {
  const { hotlines, formatPhoneLink } = useSiteConfig();

  // Get the first few emergency hotlines to display in the bar
  const displayHotlines = [
    ...hotlines.emergency.slice(0, 4),
    ...hotlines.medical.slice(0, 1),
    ...hotlines.government.slice(0, 1),
  ].filter(h => h.number); // Only show hotlines with numbers

  // If no hotlines configured, show a placeholder message
  if (displayHotlines.length === 0) {
    return (
      <div className="hotline-bar">
        <div className="container">
          <div className="hotline-inner">
            <div className="hotline-items">
              <span className="hotline-item">
                <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                <span>Emergency hotlines coming soon</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hotline-bar">
      <div className="container">
        <div className="hotline-inner">
          <div className="hotline-items">
            {displayHotlines.map((hotline) => (
              <a 
                key={hotline.id} 
                href={`tel:${formatPhoneLink(hotline.number)}`} 
                className="hotline-item"
              >
                <i className={`bi ${hotline.icon}`} aria-hidden="true"></i>
                <span>{hotline.name}: {hotline.number}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
