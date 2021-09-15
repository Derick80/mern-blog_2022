import type { AppProps } from 'next/app'
import {useState}from 'react'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>

      <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
        
    </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
export default MyApp
