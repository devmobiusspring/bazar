import ThemeComponent from "@/theme";
import { StoreProvider } from "@/store/StoreProvider";
import SnackBarComponent from "@/core/components/SnackBar";
import AppLayout from "@/components/layout/AppLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bazar Digital",
  description: "Marketplace digital para compra y venta de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <ThemeComponent>
          <body>
            <AppLayout>
              {children}
            </AppLayout>
            <SnackBarComponent />
          </body>
        </ThemeComponent>
      </StoreProvider>
    </html>
  );
}
