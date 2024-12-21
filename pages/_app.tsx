// _app.tsx
import '../styles/globals.css'; // Include global styles
import {AppProps} from 'next/app';
import {GeistSans} from 'geist/font/sans';
import {ThemeProvider} from "@/components/theme-provider"; // Import ThemeProvider
import {Toaster} from '@/components/ui/toaster'; // Ensure the path is correct


function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <main className={`${GeistSans.className}`}>
                <Component {...pageProps} />
                <Toaster/>
            </main>
        </ThemeProvider>
    );
}

export default MyApp;
