"use client";
import React from 'react';
import {
    BarChart2,
    Shield,
    Settings,
    Activity,
    AlertTriangle,
    Zap,
    Layers,
    Search
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: Activity, label: 'Overview', active: true },
        { icon: AlertTriangle, label: 'Failure Analysis', active: false },
        { icon: Shield, label: 'Risk Monitor', active: false },
        { icon: Zap, label: 'Optimization', active: false },
        { icon: Layers, label: 'Drift Clusters', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <aside className="sidebar">
            <div className="logo-container">
                <div className="logo-icon">
                    <Zap size={24} color="#3b82f6" fill="#3b82f6" />
                </div>
                <span className="logo-text outfit">AI Feedback</span>
            </div>

            <nav className="nav-menu">
                {menuItems.map((item, index) => (
                    <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: rgba(10, 10, 10, 0.5);
          border-right: 1px solid var(--card-border);
          padding: 32px 16px;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
          padding-left: 12px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .nav-item.active {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary);
          font-weight: 500;
        }
      `}</style>
        </aside>
    );
};

export default Sidebar;
