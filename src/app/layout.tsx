import ThemeComponent from "@/theme";
import { StoreProvider } from "@/store/StoreProvider";
import SnackBarComponent from "@/core/components/SnackBar";
import AppLayout from "@/components/layout/AppLayout";
import { ThemeModeProvider } from "@/context/ThemeContext";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Bazar Digital",
  description: "Marketplace digital para compra y venta de productos",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeModeProvider>
            <ThemeComponent>
              <AppLayout>
                {children}
              </AppLayout>
              <SnackBarComponent />
            </ThemeComponent>
          </ThemeModeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}