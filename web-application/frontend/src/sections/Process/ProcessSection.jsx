import React from 'react';
import './ProcessSection.css';

const ProcessSection = () => {
  return (
    <div className="process-section">
      <div className="process-content">
        <div className="process-left">
          <h2 className="process-title">How Do We<span style={{color: 'rgb(199, 47, 72)'}}> Enhance </span>Security and Awareness? </h2>
          <p className="process-description">
          Our process is a systematic journey comprising four stages: Drone Deployment, Threat Analysis, Alerts Management, and Continuous Improvement.
          </p>
        </div>
        <div className="process-right">
          {/* Step 1 */}
          <div className="process-circle">
            <div className="circle-number">01</div>
            <h3 className="circle-title">Drone Deployment</h3>
            <p className="circle-description">Real-time drone surveillance with precise coverage.</p>
          </div>
          {/* Step 2 */}
          <div className="process-circle">
            <div className="circle-number">02</div>
            <h3 className="circle-title">Threat Analysis</h3>
            <p className="circle-description">AI-powered detection of anomalies and threats.</p>
          </div>
          {/* Step 3 */}
          <div className="process-circle">
            <div className="circle-number">03</div>
            <h3 className="circle-title">Alerts Management</h3>
            <p className="circle-description">Instant alerts for rapid security response.</p>
          </div>
          {/* Step 4 */}
          <div className="process-circle">
            <div className="circle-number">04</div>
            <h3 className="circle-title">Continuous Improvement</h3>
            <p className="circle-description">Evolving with feedback and performance data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
