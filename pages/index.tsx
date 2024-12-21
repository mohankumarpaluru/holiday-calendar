import {Suspense} from 'react';
import Calendar from '../components/Calendar';
import {Toaster} from '@/components/ui/toaster'; // Ensure the path is correct

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            {/* Suspense is fine as long as Calendar is static */}
            <Suspense fallback={<div>Loading...</div>}>
                <main className="container mx-auto p-4">
                    <Calendar/>
                </main>
            </Suspense>
            <Toaster/>
        </div>
    );
}
