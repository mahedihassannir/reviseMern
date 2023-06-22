import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router.jsx'
import ContexProvider from './Proviuders/ContexProvider'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ContexProvider>

      <div className='w-11/12 mx-auto'>
        <QueryClientProvider client={queryClient}>

          <RouterProvider router={router}></RouterProvider>

        </QueryClientProvider>

      </div>

    </ContexProvider>

  </React.StrictMode>,
)
