import React from 'react';
import './ProcessSection.css';

const ProcessSection = () => {
  return (
    <div className="process-section">
      <div className="process-content">
        <div className="process-left">
          <h2 className="process-title">How Do We Build a <span style={{color: 'rgb(199, 47, 72)'}}>Buzz</span> Around Every Solution ?</h2>
          <p className="process-description">
            Our process is a systematic journey comprising four stages: Discovery, Proposal, Implementation, and Maintenance.
          </p>
        </div>
        <div className="process-right">
          {/* Step 1 */}
          <div className="process-circle">
            <div className="circle-number">01</div>
            <h3 className="circle-title">Discovery Call</h3>
            <p className="circle-description">We begin by thoroughly understanding your objectives.</p>
          </div>
          {/* Step 2 */}
          <div className="process-circle">
            <div className="circle-number">02</div>
            <h3 className="circle-title">Proposal</h3>
            <p className="circle-description">We propose the infrastructure, systems, and processes to achieve your goals.</p>
          </div>
          {/* Step 3 */}
          <div className="process-circle">
            <div className="circle-number">03</div>
            <h3 className="circle-title">Implementation</h3>
            <p className="circle-description">We execute the project plan, including building, testing, and supporting the software.</p>
          </div>
          {/* Step 4 */}
          <div className="process-circle">
            <div className="circle-number">04</div>
            <h3 className="circle-title">Evaluation and Maintenance</h3>
            <p className="circle-description">We incorporate feedback, and continually improve.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
