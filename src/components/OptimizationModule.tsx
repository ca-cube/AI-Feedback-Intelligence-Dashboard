"use client";
import React, { useState } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { simulateDrift, AIAnalysisResult } from '@/lib/ai-engine';

interface OptimizationModuleProps {
  analysisData: AIAnalysisResult | null;
  inputData: { prompt: string; output: string } | null;
}

const OptimizationModule: React.FC<OptimizationModuleProps> = ({ analysisData, inputData }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const startSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const baseRate = analysisData?.riskScore || 0.12;
      const result = simulateDrift(baseRate, 0.75); // 75% patch strength
      setSimulationResult(result);
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <div className="glass-card mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="outfit">Prompt Patch Recommender</h3>
          <p className="text-sm opacity-50">AI-suggested improvements for analyzed interaction</p>
        </div>
        <button
          className="simulate-btn"
          onClick={startSimulation}
          disabled={isSimulating || !analysisData}
        >
          {isSimulating ? <RefreshCw className="animate-spin" size={16} /> : 'Run Drift Simulation'}
        </button>
      </div>

      <div className="patch-container">
        <div className="patch-item original">
          <div className="patch-label">Current Prompt</div>
          <p>"{inputData?.prompt || 'Summarize the compliance requirements for vendor review.'}"</p>
        </div>
        <div className="arrow">→</div>
        <div className="patch-item suggested">
          <div className="patch-label">Suggested Patch</div>
          <p>{analysisData?.optimizationPatch || '"Wait for analysis..."'}</p>
        </div>
      </div>

      {simulationResult && (
        <div className="simulation-results active">
          <div className="result-metric">
            <span className="label">Projected Failure Rate</span>
            <span className="value">
              {(analysisData?.riskScore ? analysisData.riskScore * 100 : 12).toFixed(1)}% →
              {(analysisData?.riskScore ? analysisData.riskScore * 100 * 0.25 : 3.1).toFixed(1)}%
            </span>
          </div>
          <div className="result-metric">
            <span className="label">Optimization Confidence</span>
            <span className="value">94.2%</span>
          </div>
          <div className="result-metric">
            <span className="label">Cost Impact</span>
            <span className="value">Stable</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .mt-6 { margin-top: 24px; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .text-sm { font-size: 0.875rem; }
        .opacity-50 { opacity: 0.5; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .simulate-btn {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s;
        }

        .simulate-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .simulate-btn:not(:disabled):hover {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }

        .patch-container {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-top: 20px;
        }

        .patch-item {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--card-border);
          padding: 16px;
          border-radius: 12px;
          min-height: 100px;
        }

        .patch-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
          letter-spacing: 1px;
        }

        .suggested {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.02);
        }

        .arrow {
          font-size: 1.5rem;
          color: rgba(255,255,255,0.2);
        }

        .simulation-results {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px dashed var(--card-border);
        }

        .result-metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .result-metric .label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
        }

        .result-metric .value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
        }
      `}</style>
    </div>
  );
};

export default OptimizationModule;
