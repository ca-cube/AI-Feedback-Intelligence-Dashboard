"use client";
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import {
    ArrowUpRight,
    ArrowDownRight,
    Bell,
    Search,
    Zap,
    Shield,
    Clock,
    DollarSign
} from 'lucide-react';
import { generateMetrics, mockSignals } from '@/lib/mock-data';
import OptimizationModule from './OptimizationModule';
import DriftMonitor from './DriftMonitor';
import SemanticClusters from './SemanticClusters';
import CausalAnalysis from './CausalAnalysis';

import { AIAnalysisResult } from '@/lib/ai-engine';

interface DashboardProps {
    analysisData: AIAnalysisResult | null;
    inputData: { prompt: string; output: string } | null;
}

const Dashboard: React.FC<DashboardProps> = ({ analysisData, inputData }) => {
    const metrics = generateMetrics();
    const failureData = [
        { name: 'Hallucination', value: analysisData?.failureType === 'Hallucination' ? 100 : 35, color: '#ef4444' },
        { name: 'Incomplete', value: analysisData?.failureType === 'Incomplete Reasoning' ? 100 : 25, color: '#f59e0b' },
        { name: 'Policy', value: analysisData?.failureType === 'Policy Violation' ? 100 : 15, color: '#8b5cf6' },
        { name: 'Tone', value: analysisData?.failureType === 'Tone Mismatch' ? 100 : 20, color: '#3b82f6' },
        { name: 'None', value: analysisData?.failureType === 'None' ? 100 : 5, color: '#10b981' },
    ];

    return (
        <main className="main-content">
            {/* Header */}
            <header className="header">
                <div>
                    <h1 className="gradient-text outfit">Intelligence Dashboard</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                        Monitoring internal AI reasoning & failure clusters.
                    </p>
                </div>

                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={18} color="rgba(255,255,255,0.4)" />
                        <input type="text" placeholder="Search prompts..." />
                    </div>
                    <button className="icon-btn">
                        <Bell size={20} />
                    </button>
                    <div className="user-profile">
                        <div className="avatar">JD</div>
                    </div>
                </div>
            </header>

            {/* Metrics Grid */}
            <div className="dashboard-grid">
                <div className="glass-card metric-card">
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <Zap size={20} />
                        </div>
                        <span className="metric-label">Total Logs</span>
                    </div>
                    <div className="metric-value">{metrics.totalSignals.toLocaleString()}</div>
                    <div className="metric-trend positive">
                        <ArrowUpRight size={14} /> 12% vs last month
                    </div>
                </div>

                <div className="glass-card metric-card">
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                            <Shield size={20} />
                        </div>
                        <span className="metric-label">Hallucination Rate</span>
                    </div>
                    <div className="metric-value">{metrics.hallucinationRate}</div>
                    <div className="metric-trend negative">
                        <ArrowDownRight size={14} /> 4.2% reduction
                    </div>
                </div>

                <div className="glass-card metric-card">
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                            <Clock size={20} />
                        </div>
                        <span className="metric-label">Avg Latency</span>
                    </div>
                    <div className="metric-value">{metrics.avgLatency}</div>
                    <div className="metric-trend positive">
                        <ArrowUpRight size={14} /> 200ms faster
                    </div>
                </div>

                <div className="glass-card metric-card">
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                            <DollarSign size={20} />
                        </div>
                        <span className="metric-label">Token Cost</span>
                    </div>
                    <div className="metric-value">{metrics.totalCost}</div>
                    <div className="metric-trend negative">
                        <ArrowDownRight size={14} /> $12.40 saved
                    </div>
                </div>
            </div>

            {analysisData && (
                <div className="glass-card reasoning-banner mt-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="pulse-icon"></div>
                        <h3 className="outfit">Latent Reasoning Analysis</h3>
                    </div>
                    <div className="reasoning-text">
                        {analysisData.reasoning}
                    </div>
                    <div className="flex gap-6 mt-4">
                        <div className="sub-metric">
                            <span className="label">Analysis Confidence</span>
                            <span className="val">{(analysisData.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="sub-metric">
                            <span className="label">Failure Certainty</span>
                            <span className="val">{analysisData.riskScore > 0.8 ? 'High' : analysisData.riskScore > 0.4 ? 'Medium' : 'Low'}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Charts Section */}
            <div className="charts-grid">
                <div className="glass-card chart-container">
                    <h3 className="outfit mb-6">Risk Drift Signal (PSI)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={metrics.riskTrend}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: '#111',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorScore)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card chart-container">
                    <h3 className="outfit mb-6">Failure Taxonomy (Semantic Clustering)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={failureData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="rgba(255,255,255,0.6)"
                                    fontSize={12}
                                    width={100}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{
                                        background: '#111',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {failureData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <DriftMonitor />
            <div className="analytics-grid">
                <SemanticClusters />
                <CausalAnalysis />
            </div>
            <OptimizationModule analysisData={analysisData} inputData={inputData} />

            {/* Latest Logs */}
            <div className="glass-card logs-container">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="outfit">Real-time Feedback Stream</h3>
                    <button className="text-btn">View All</button>
                </div>
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Prompt Segment</th>
                            <th>Failure Mode</th>
                            <th>Risk</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analysisData && inputData && (
                            <tr style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                                <td>{new Date().toLocaleTimeString()}</td>
                                <td>
                                    <div className="prompt-preview">{inputData.prompt}</div>
                                </td>
                                <td>
                                    <span className={`tag ${analysisData.failureType.toLowerCase().replace(' ', '-')}`}>
                                        {analysisData.failureType}
                                    </span>
                                </td>
                                <td>
                                    <div className="risk-indicator">
                                        <div
                                            className="risk-bar"
                                            style={{
                                                width: `${analysisData.riskScore * 100}%`,
                                                background: analysisData.riskScore > 0.7 ? '#ef4444' : analysisData.riskScore > 0.3 ? '#f59e0b' : '#10b981'
                                            }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <button className="action-btn">Optimize</button>
                                </td>
                            </tr>
                        )}
                        {mockSignals.map((signal) => (
                            <tr key={signal.id}>
                                <td>{new Date(signal.timestamp).toLocaleTimeString()}</td>
                                <td>
                                    <div className="prompt-preview">{signal.prompt}</div>
                                </td>
                                <td>
                                    <span className={`tag ${signal.failureType.toLowerCase().replace(' ', '-')}`}>
                                        {signal.failureType}
                                    </span>
                                </td>
                                <td>
                                    <div className="risk-indicator">
                                        <div
                                            className="risk-bar"
                                            style={{
                                                width: `${signal.riskScore * 100}%`,
                                                background: signal.riskScore > 0.7 ? '#ef4444' : signal.riskScore > 0.3 ? '#f59e0b' : '#10b981'
                                            }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <button className="action-btn">Optimize</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .main-content {
          margin-left: 260px;
          padding: 40px;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-bar {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 300px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 0.9rem;
        }

        .icon-btn {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          color: white;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .metric-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-trend {
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
        }

        .positive { color: #10b981; }
        .negative { color: #ef4444; }

        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-top: 24px;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 24px;
        }

        .logs-container {
          margin-top: 24px;
        }

        .logs-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .logs-table th {
          padding: 12px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--card-border);
        }

        .logs-table td {
          padding: 16px 12px;
          border-bottom: 1px solid var(--card-border);
          font-size: 0.9rem;
        }

        .prompt-preview {
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: rgba(255,255,255,0.8);
        }

        .tag {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .none { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .hallucination { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .incomplete-reasoning { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .policy-violation { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        .tone-mismatch { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .unsafe-assumption { background: rgba(239, 68, 68, 0.1); color: #f87171; }
        .engine-error { background: rgba(255, 255, 255, 0.1); color: #9ca3af; }

        .risk-indicator {
          width: 100px;
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .risk-bar {
          height: 100%;
          border-radius: 3px;
        }

        .action-btn {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: var(--primary);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: var(--primary);
          color: white;
        }

        .reasoning-banner {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 24px;
          border-radius: 20px;
        }

        .reasoning-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
          font-style: italic;
        }

        .pulse-icon {
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }

        .sub-metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sub-metric .label { font-size: 0.75rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; }
        .sub-metric .val { font-weight: 700; font-size: 1rem; color: #fff; }

        .mb-6 { margin-bottom: 24px; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .text-btn { background: none; border: none; color: var(--primary); cursor: pointer; font-size: 0.9rem; }
      `}</style>
        </main>
    );
};

export default Dashboard;
