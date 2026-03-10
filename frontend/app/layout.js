import "./globals.css";
import ReduxProvider from "../providers/ReduxProvider";

export const metadata = {
  title: "Habit Tracker",
  description: "Gestión de hábitos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
