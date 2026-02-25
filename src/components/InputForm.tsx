"use client";
import React, { useState } from 'react';
import { Sparkles, Send, BrainCircuit, MessageSquare, Save } from 'lucide-react';

interface InputFormProps {
    onSubmit: (data: { prompt: string; output: string }) => void;
    isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt && output) {
            onSubmit({ prompt, output });
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-header">
                <div className="icon-circle">
                    <BrainCircuit size={32} color="#3b82f6" />
                </div>
                <h2 className="outfit gradient-text">Ingestion Layer</h2>
                <p>Provide the AI interaction data for deep reasoning analysis.</p>
            </div>

            <form onSubmit={handleSubmit} className="analysis-form">
                <div className="input-group">
                    <label className="outfit">
                        <MessageSquare size={16} /> User Prompt
                    </label>
                    <textarea
                        placeholder="e.g. Summarize the compliance requirements for vendor review..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                        rows={4}
                    />
                </div>

                <div className="input-group mt-6">
                    <label className="outfit">
                        <Sparkles size={16} /> AI Generated Output
                    </label>
                    <textarea
                        placeholder="e.g. The vendor must provide a certificate of insurance and a signed NDA..."
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                        required
                        rows={6}
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={isLoading || !prompt || !output}>
                    {isLoading ? (
                        <>Analyzing Latent Features...</>
                    ) : (
                        <>
                            Run Failure Intelligence <Send size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="form-footer">
                <div className="security-note">
                    <Save size={14} />
                    <span>Data is processed through our secure optimization layer.</span>
                </div>
            </div>

            <style jsx>{`
        .form-wrapper {
          max-width: 800px;
          margin: 100px auto;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--card-border);
          border-radius: 32px;
          padding: 60px;
          position: relative;
        }

        .form-header { text-align: center; margin-bottom: 48px; }
        .icon-circle {
          width: 80px;
          height: 80px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .form-header h2 { font-size: 2.5rem; margin-bottom: 12px; }
        .form-header p { opacity: 0.6; }

        .analysis-form { display: flex; flex-direction: column; }
        .input-group { display: flex; flex-direction: column; gap: 12px; }
        .input-group label { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9rem; color: rgba(255,255,255,0.7); }
        
        textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 20px;
          color: white;
          font-family: inherit;
          font-size: 1rem;
          resize: none;
          outline: none;
          transition: border-color 0.3s, background 0.3s;
        }

        textarea:focus {
          border-color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
        }

        .mt-6 { margin-top: 32px; }

        .submit-btn {
          margin-top: 48px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          padding: 18px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: transform 0.2s;
        }

        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .submit-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4); }

        .form-footer { margin-top: 32px; display: flex; justify-content: center; }
        .security-note { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; opacity: 0.4; }
      `}</style>
        </div>
    );
};

export default InputForm;
