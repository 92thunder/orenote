import React, { FC, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { App } from './App'
import './index.css'

const Loading: FC = () => {
  return <p>Loading...</p>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
)
