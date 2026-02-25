import { NextRequest, NextResponse } from 'next/server';
import { analyzeOutput } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
    try {
        const { prompt, output } = await req.json();

        if (!prompt || !output) {
            return NextResponse.json({ error: 'Missing prompt or output' }, { status: 400 });
        }

        const analysis = await analyzeOutput(prompt, output);
        return NextResponse.json(analysis);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
