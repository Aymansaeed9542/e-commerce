import { getMyToken } from '@/utilities/token'
import React from 'react'

const Cart =  async () => {

  await getMyToken()
  return (
    <div>Cart</div>
  )
}

export default Cart