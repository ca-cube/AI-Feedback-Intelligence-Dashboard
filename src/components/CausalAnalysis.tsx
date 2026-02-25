"use client";
import React from 'react';
import { Share2, Link, Zap } from 'lucide-react';

const CausalAnalysis = () => {
    const correlations = [
        { feature: 'High Temperature (0.9+)', target: 'Hallucination', correlation: 0.82, impact: 'High' },
        { feature: 'Missing "Cite" constraint', target: 'Legal Citation Failure', correlation: 0.65, impact: 'Medium' },
        { feature: 'Generic "Summarize" verb', target: 'Context Loss', correlation: 0.45, impact: 'Medium' },
    ];

    return (
        <div className="glass-card mt-6">
            <div className="flex items-center gap-3 mb-6">
                <Share2 size={20} color="#10b981" />
                <h3 className="outfit">Causal Correlation Engine (SHAP)</h3>
            </div>

            <p className="text-sm opacity-50 mb-6">
                Identifying prompt features statistically correlated with reasoning failures.
            </p>

            <div className="correlation-list">
                {correlations.map((item, i) => (
                    <div key={i} className="correlation-row">
                        <div className="feature-cell">
                            <Zap size={14} className="feature-icon" />
                            <span>{item.feature}</span>
                        </div>
                        <div className="arrow-cell">→</div>
                        <div className="target-cell">{item.target}</div>
                        <div className="metric-cell">
                            <div className="impact-badge" style={{
                                background: item.impact === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                color: item.impact === 'High' ? '#ef4444' : '#f59e0b'
                            }}>
                                {item.impact} Impact
                            </div>
                            <span className="corr-value">{Math.round(item.correlation * 100)}%</span>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .mt-6 { margin-top: 24px; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-3 { gap: 12px; }
        .text-sm { font-size: 0.875rem; }
        .opacity-50 { opacity: 0.5; }
        .mb-6 { margin-bottom: 24px; }

        .correlation-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .correlation-row {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
          border: 1px solid var(--card-border);
        }

        .feature-cell {
          flex: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .feature-icon { color: var(--warning); }

        .arrow-cell {
          flex: 0.5;
          text-align: center;
          color: rgba(255,255,255,0.2);
        }

        .target-cell {
          flex: 1.5;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }

        .metric-cell {
          flex: 1.5;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }

        .impact-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .corr-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
          width: 40px;
          text-align: right;
        }
      `}</style>
        </div>
    );
};

export default CausalAnalysis;
