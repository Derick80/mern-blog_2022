import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import AppBar from '../components/AppBar';

import '../styles/global.css';






function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient())


  return (


    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>

        <Provider session={pageProps.session}>
          <div className="container">

            <AppBar />
            <Component {...pageProps} />

          </div>


        </Provider>

      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>

  )
}
export default MyApp
