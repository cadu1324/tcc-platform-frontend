import { ThemeProvider } from 'styled-components';
import { theme } from './ui/theme';
import { GlobalStyles } from './styles';
import { AuthProvider } from './contexts';
import { AppRoutes } from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
