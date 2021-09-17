import type { AppProps } from 'next/app'
import Head from 'next/head';

import {useState}from 'react'
import AppBar from '../components/AppBar'
import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../utils/theme'
import createEmotionCache from '../utils/createEmotionCache'



// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp( props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient())
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>

      <Provider session={pageProps.session}>
    <AppBar />
        <Component {...pageProps} />
   
    </Provider>
        
    </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
    </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp
