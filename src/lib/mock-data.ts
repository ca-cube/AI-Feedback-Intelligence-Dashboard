export interface FeedbackSignal {
    id: string;
    timestamp: string;
    prompt: string;
    output: string;
    userRating: number; // 1-5
    latency: number; // ms
    cost: number; // USD
    failureType: 'Hallucination' | 'Incomplete Reasoning' | 'Policy Violation' | 'Tone Mismatch' | 'None';
    riskScore: number; // 0-1
}

export const mockSignals: FeedbackSignal[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        prompt: 'Summarize the compliance requirements for vendor review.',
        output: 'The vendor must provide a certificate of insurance and a signed NDA. Compliance is verified against section 4.2 of the internal legal guide.',
        userRating: 5,
        latency: 1200,
        cost: 0.005,
        failureType: 'None',
        riskScore: 0.02,
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        prompt: 'Generate a legal citation for the new privacy law in California.',
        output: 'According to the California Privacy Act of 2024, section 123.45 (which does not exist), all data must be encrypted.',
        userRating: 1,
        latency: 1500,
        cost: 0.007,
        failureType: 'Hallucination',
        riskScore: 0.95,
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        prompt: 'How do I handle a data breach?',
        output: 'I cannot provide a full answer right now, but you should notify your IT team.',
        userRating: 2,
        latency: 800,
        cost: 0.002,
        failureType: 'Incomplete Reasoning',
        riskScore: 0.3,
    }
];

export const generateMetrics = () => {
    return {
        totalSignals: 12450,
        hallucinationRate: '3.1%',
        avgLatency: '1.2s',
        totalCost: '$142.50',
        riskTrend: [
            { date: '2024-01-01', score: 0.15 },
            { date: '2024-01-02', score: 0.18 },
            { date: '2024-01-03', score: 0.12 },
            { date: '2024-01-04', score: 0.09 },
            { date: '2024-01-05', score: 0.05 },
        ]
    };
};
