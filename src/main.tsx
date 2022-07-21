import React, { FC, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const Loading: FC = () => {
  console.debug('loading')
  return <p>Loading...</p>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>
)
