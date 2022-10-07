import { AxiosInstance } from 'axios'
import { createContext } from 'react'

export const ApiContext = createContext<AxiosInstance>(undefined!)
