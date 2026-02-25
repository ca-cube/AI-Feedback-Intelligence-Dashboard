"use client";
import React from 'react';
import { Network, Target, Layers } from 'lucide-react';

const SemanticClusters = () => {
    const clusters = [
        { name: 'Legal Citations', count: 42, color: '#ef4444', description: 'Fabricated legal references in compliance queries.' },
        { name: 'Tone Drift', count: 28, color: '#3b82f6', description: 'AI becoming too informal in vendor responses.' },
        { name: 'Context Loss', count: 18, color: '#8b5cf6', description: 'Mid-conversation loss of specific document context.' },
    ];

    return (
        <div className="glass-card mt-6">
            <div className="flex items-center gap-3 mb-6">
                <Network size={20} color="#8b5cf6" />
                <h3 className="outfit">Latent Semantic Failure Clusters</h3>
            </div>

            <div className="clusters-grid">
                {clusters.map((cluster, i) => (
                    <div key={i} className="cluster-item">
                        <div className="cluster-viz">
                            <div
                                className="cluster-point"
                                style={{
                                    boxShadow: `0 0 15px ${cluster.color}`,
                                    background: cluster.color,
                                    width: `${10 + cluster.count / 2}px`,
                                    height: `${10 + cluster.count / 2}px`
                                }}
                            />
                        </div>
                        <div className="cluster-info">
                            <div className="cluster-name">{cluster.name}</div>
                            <div className="cluster-desc">{cluster.description}</div>
                            <div className="cluster-meta">
                                <Layers size={12} /> {cluster.count} occurrences detected
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .mt-6 { margin-top: 24px; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-3 { gap: 12px; }

        .clusters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .cluster-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          padding: 16px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cluster-viz {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        }

        .cluster-point {
          border-radius: 50%;
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        .cluster-name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .cluster-desc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.4;
        }

        .cluster-meta {
          font-size: 0.75rem;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
        }
      `}</style>
        </div>
    );
};

export default SemanticClusters;
