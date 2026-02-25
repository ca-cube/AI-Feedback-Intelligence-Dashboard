"use client";
import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Landing from "@/components/Landing";
import InputForm from "@/components/InputForm";
import { AIAnalysisResult } from '@/lib/ai-engine';

export default function Home() {
    const [view, setView] = useState<'landing' | 'form' | 'dashboard'>('landing');
    const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
    const [inputData, setInputData] = useState<{ prompt: string; output: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = () => {
        setView('form');
    };

    const handleSubmit = async (data: { prompt: string; output: string }) => {
        setIsLoading(true);
        setInputData(data);

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            setAnalysis(result);
            setView('dashboard');
        } catch (error) {
            console.error("Failed to analyze:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (view === 'landing') {
        return <Landing onStart={handleStart} />;
    }

    if (view === 'form') {
        return (
            <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        );
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Dashboard analysisData={analysis} inputData={inputData} />
        </div>
    );
}
