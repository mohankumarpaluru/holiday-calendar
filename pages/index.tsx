import {Suspense} from 'react';
import Calendar from '../components/Calendar';
import {Toaster} from '@/components/ui/toaster';
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <div className="relative min-h-screen bg-background">
            {/* Add the DotPattern component with enhanced masking and slightly darker opacity */}
            <DotPattern
                className={cn(
                    "absolute inset-0 opacity-40 dark:opacity-30",
                    "[mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.7)_80%,transparent)]"
                )}
                width={20}
                height={20}
                cx={2}
                cy={2}
                cr={1.5}
            />

            {/* Main content with relative positioning and z-index */}
            <div className="relative z-10">
                <Suspense fallback={<div>Loading...</div>}>
                    <main className="container mx-auto p-4">
                        <Calendar/>
                    </main>
                </Suspense>
                <Toaster/>
            </div>
        </div>
    );
}
