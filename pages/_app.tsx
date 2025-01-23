import "../styles/app.css";

import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <div id="modal-root" className={inter.className}>
      <GoogleAnalytics gaId="G-DLGWBTYQVS" />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
