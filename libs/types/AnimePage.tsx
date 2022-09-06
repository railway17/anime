import { NextComponentType, NextPage } from 'next'
import { JSXElementConstructor } from 'react'

export type AnimePage<T, P = any, IP = P> = NextPage<P, IP> & PageProps<T>

/**
 * These are the props a page requires. We don't pass any props into these components
 */
export type PageProps<P> = {
  getLayout?: (
    page: NextComponentType<any, any, P>,
  ) => JSX.Element | JSXElementConstructor<any>
  Layout?: JSXElementConstructor<any>
}
