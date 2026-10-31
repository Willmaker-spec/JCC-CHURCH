import { lazy, Suspense } from 'react'

const ClientOnlyEditorInner = lazy(() => import('./ClientOnlyEditorInner.jsx'))

export default function ClientOnlyEditor(props) {
  return (
    <Suspense fallback={null}>
      <ClientOnlyEditorInner {...props} />
    </Suspense>
  )
}
