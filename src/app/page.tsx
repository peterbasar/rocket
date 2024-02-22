'use client'
import dynamic from 'next/dynamic'

const BasicWorld = dynamic(() => import('../components/BasicWorld'), {
  ssr: false,
})

export default function Home() {
  return <BasicWorld />
}
