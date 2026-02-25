"use client";
import React from 'react';
import { Zap, Shield, ArrowRight, BarChart3, Activity } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="landing-container">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>

            <nav className="landing-nav">
                <div className="logo">
                    <Zap size={24} color="#3b82f6" fill="#3b82f6" />
                    <span className="outfit fw-bold">AI Feedback</span>
                </div>
                <div className="nav-links">
                    <span>Features</span>
                    <span>Docs</span>
                    <button className="nav-btn" onClick={onStart}>Sign In</button>
                </div>
            </nav>

            <main className="hero-section">
                <div className="hero-content">
                    <div className="badge">
                        <Activity size={14} />
                        <span>Datadog for AI Outputs</span>
                    </div>
                    <h1 className="hero-title outfit gradient-text">
                        Reasoning Observability <br />
                        <span>for Generative AI</span>
                    </h1>
                    <p className="hero-desc">
                        Monitor, cluster, and optimize your LLM outputs in real-time. Detect hallucinations,
                        measure semantic drift, and improve user trust with failure intelligence.
                    </p>
                    <div className="cta-group">
                        <button className="primary-cta" onClick={onStart}>
                            Get Started <ArrowRight size={18} />
                        </button>
                        <button className="secondary-cta">
                            View Demo
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="floating-card c1">
                        <Shield size={20} color="#ef4444" />
                        <div>
                            <div className="card-label">Hallucination Detected</div>
                            <div className="card-val">Confidence: 94%</div>
                        </div>
                    </div>
                    <div className="floating-card c2">
                        <BarChart3 size={20} color="#10b981" />
                        <div>
                            <div className="card-label">Semantic Stability</div>
                            <div className="card-val">PSI: 0.082 (Stable)</div>
                        </div>
                    </div>
                    <div className="visual-glow"></div>
                </div>
            </main>

            <section className="features-grid-landing">
                <div className="feat-item">
                    <div className="feat-icon"><Activity /></div>
                    <h3 className="outfit">Failure Analysis</h3>
                    <p>Multi-class classification of LLM failure modes.</p>
                </div>
                <div className="feat-item">
                    <div className="feat-icon"><Shield /></div>
                    <h3 className="outfit">Risk Monitoring</h3>
                    <p>Real-time risk scoring and safety guardrails.</p>
                </div>
                <div className="feat-item">
                    <div className="feat-icon"><Zap /></div>
                    <h3 className="outfit">Prompt Patching</h3>
                    <p>AI-suggested prompt optimizations based on drift.</p>
                </div>
            </section>

            <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background: #050505;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 0 5%;
        }

        .blob {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.15;
        }

        .blob-1 { background: var(--primary); top: -100px; right: -100px; }
        .blob-2 { background: var(--secondary); bottom: -100px; left: -100px; }

        .landing-nav {
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .logo { display: flex; align-items: center; gap: 12px; font-size: 1.5rem; }
        .nav-links { display: flex; align-items: center; gap: 40px; }
        .nav-links span { opacity: 0.6; cursor: pointer; transition: 0.2s; }
        .nav-links span:hover { opacity: 1; }
        .nav-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 24px; border-radius: 12px; cursor: pointer; }

        .hero-section {
          padding-top: 80px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .hero-title { font-size: 4.5rem; line-height: 1.1; margin: 24px 0; font-weight: 800; letter-spacing: -2px; }
        .hero-title span { display: block; opacity: 0.5; }
        .hero-desc { font-size: 1.25rem; opacity: 0.6; max-width: 600px; line-height: 1.6; margin-bottom: 48px; }

        .badge {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary);
          padding: 8px 16px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .cta-group { display: flex; gap: 20px; }
        .primary-cta {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          padding: 16px 32px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .primary-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3); }

        .secondary-cta {
          background: rgba(255,255,255,0.05);
          color: white;
          padding: 16px 32px;
          border-radius: 14px;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }

        .hero-visual { position: relative; height: 500px; display: flex; align-items: center; justify-content: center; }
        .visual-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          z-index: -1;
        }

        .floating-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: absolute;
          animation: float 6s infinite ease-in-out;
        }

        .c1 { top: 100px; right: 40px; }
        .c2 { bottom: 120px; left: 40px; animation-delay: 2s; }

        .card-label { font-size: 0.8rem; opacity: 0.6; }
        .card-val { font-weight: 700; font-size: 1.1rem; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .features-grid-landing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 120px;
          padding-bottom: 80px;
          position: relative;
          z-index: 10;
        }

        .feat-item {
          background: rgba(255,255,255,0.02);
          padding: 32px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .feat-icon { width: 50px; height: 50px; background: rgba(59, 130, 246, 0.1); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--primary); margin-bottom: 24px; }
        .feat-item h3 { margin-bottom: 12px; }
        .feat-item p { opacity: 0.6; line-height: 1.6; }

        @media (max-width: 1024px) {
          .hero-section { grid-template-columns: 1fr; text-align: center; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .hero-visual { display: none; }
          .hero-title { font-size: 3.5rem; }
          .features-grid-landing { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default Landing;
