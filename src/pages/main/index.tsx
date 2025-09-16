import { Button } from '@/components/retroui/Button'
import { Input } from '@/components/retroui/Input'
import { Label } from '@/components/retroui/Label'
import React from 'react'

export const index = () => {
  return (
    <>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="pokemon">Favorite Pokemon</Label>
      <Input type="pokemon" id="pokemon" placeholder="Charmander" />
    </div>
    </>
  )
}
