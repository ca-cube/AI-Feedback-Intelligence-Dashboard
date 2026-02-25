"use client";
import React, { useMemo } from 'react';
import { calculatePSI } from '@/lib/math-utils';
import { Activity, TrendingUp, AlertCircle } from 'lucide-react';

const DriftMonitor = () => {
    // Mock distributions
    const baseline = [0.1, 0.2, 0.4, 0.2, 0.1];
    const current = [0.05, 0.15, 0.45, 0.25, 0.1];

    const psiValue = useMemo(() => calculatePSI(baseline, current), []);

    const getDriftStatus = (psi: number) => {
        if (psi < 0.1) return { label: 'Stable', color: '#10b981', icon: Activity };
        if (psi < 0.25) return { label: 'Moderate Drift', color: '#f59e0b', icon: TrendingUp };
        return { label: 'Critical Drift', color: '#ef4444', icon: AlertCircle };
    };

    const status = getDriftStatus(psiValue);

    return (
        <div className="glass-card mt-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="status-icon" style={{ background: `${status.color}22`, color: status.color }}>
                    <status.icon size={24} />
                </div>
                <div>
                    <h3 className="outfit">Distribution Drift Monitor</h3>
                    <p className="text-sm opacity-50">Current PSI: {psiValue.toFixed(4)}</p>
                </div>
                <div className="ml-auto">
                    <span className="status-badge" style={{ backgroundColor: status.color }}>
                        {status.label}
                    </span>
                </div>
            </div>

            <div className="distribution-map">
                {current.map((val, i) => (
                    <div key={i} className="dist-bar-group">
                        <div className="dist-bar-container">
                            <div
                                className="dist-bar baseline"
                                style={{ height: `${baseline[i] * 200}%` }}
                            />
                            <div
                                className="dist-bar current"
                                style={{ height: `${val * 200}%`, backgroundColor: status.color }}
                            />
                        </div>
                        <div className="dist-label text-xs opacity-50">Bin {i + 1}</div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .mt-6 { margin-top: 24px; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-4 { gap: 16px; }
        .ml-auto { margin-left: auto; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .opacity-50 { opacity: 0.5; }

        .status-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .distribution-map {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 120px;
          gap: 12px;
          margin-top: 20px;
        }

        .dist-bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .dist-bar-container {
          width: 100%;
          height: 100px;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 4px;
        }

        .dist-bar {
          width: 8px;
          border-radius: 4px 4px 0 0;
          transition: height 0.5s ease;
        }

        .baseline {
          background: rgba(255, 255, 255, 0.1);
          width: 4px;
        }
      `}</style>
        </div>
    );
};

export default DriftMonitor;
