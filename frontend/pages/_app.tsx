import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import Header from "../components/header";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Header />
            <Component {...pageProps} />
        </MoralisProvider>
    );
}
