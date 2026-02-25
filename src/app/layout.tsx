import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "AI Feedback Intelligence Dashboard | Datadog for AI",
    description: "Continuous monitoring and optimization layer for LLMs and Generative AI systems.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
