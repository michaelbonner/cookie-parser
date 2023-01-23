import "tailwindcss/tailwind.css";

import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <div id="modal-root" className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
