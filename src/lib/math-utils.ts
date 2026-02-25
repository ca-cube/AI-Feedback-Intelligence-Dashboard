/**
 * Mathematical utilities for AI Drift Detection
 */

// Kullback-Leibler Divergence
export function klDivergence(p: number[], q: number[]): number {
    if (p.length !== q.length) throw new Error("Distributions must have same length");

    let divergence = 0;
    for (let i = 0; i < p.length; i++) {
        if (p[i] > 0 && q[i] > 0) {
            divergence += p[i] * Math.log(p[i] / q[i]);
        }
    }
    return divergence;
}

// Population Stability Index (PSI)
export function calculatePSI(expected: number[], actual: number[]): number {
    let psi = 0;
    for (let i = 0; i < expected.length; i++) {
        const e = expected[i] || 0.0001; // Avoid division by zero
        const a = actual[i] || 0.0001;
        psi += (a - e) * Math.log(a / e);
    }
    return psi;
}

// Wasserstein Distance (simplified for 1D)
export function wassersteinDistance(p: number[], q: number[]): number {
    let distance = 0;
    let cumulativeP = 0;
    let cumulativeQ = 0;

    for (let i = 0; i < p.length; i++) {
        cumulativeP += p[i];
        cumulativeQ += q[i];
        distance += Math.abs(cumulativeP - cumulativeQ);
    }

    return distance;
}
