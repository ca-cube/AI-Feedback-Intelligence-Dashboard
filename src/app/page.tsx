import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Dashboard />
        </div>
    );
}
