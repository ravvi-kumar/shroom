import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/astro/react'
import { $userStore } from '@clerk/astro/client'
import { useSyncExternalStore } from 'react'

export default function Header() {
  return (
    <>
      <p>My App</p>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}


export function Username() {
  const user = useSyncExternalStore($userStore.listen, $userStore.get, $userStore.get)
  return <>{user?.firstName}</>
}