import { Stack } from "expo-router";
import "~/global.css";

import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={LIGHT_THEME}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Gaussian Beam for Android",
            headerShown: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
