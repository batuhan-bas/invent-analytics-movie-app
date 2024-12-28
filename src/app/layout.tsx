'use client';

import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import store from '../store';
import '../assets/styles/global.scss';
import Header from '../components/header';
import Head from 'next/head';


interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Invent Analytics Movie App" />
        <title>Invent Analytics Movie App</title>
      </Head>
      <body>
        <Provider store={store}>
          <CustomThemeProvider>
            <CssBaseline />
            <Header />
            {children}
          </CustomThemeProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
