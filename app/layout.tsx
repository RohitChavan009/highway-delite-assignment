// 3rd Party
import { ToastContainer } from "react-toastify";

// Mantine
import { theme } from "../theme";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

// Styles
import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";

// Metadata
export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />

        <link rel="shortcut icon" href="/favicon.svg" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body>
        <ToastContainer position="bottom-right" />

        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
