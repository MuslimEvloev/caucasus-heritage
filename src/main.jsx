import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/reset.css';
import './styles/global.css';
import './styles/theme.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { ThemeProvider } from './i18n/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
