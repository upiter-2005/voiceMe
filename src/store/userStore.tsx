import { create } from 'zustand'

export type Plan = 'trial' | 'pro' | 'master' | 'king' | null

interface userI {
    id: string | null
    email: string | null
    registeredTime: number
    plan: Plan
    lastPayment: string | number | null 
    firstVisit: boolean
    createUser: (user: any) => void,
    clearUser: () => void,
    toggleVisit: () => void,   
    changePlan: (value: Plan) => void,
    setRegisteredTime: (value: number) => void   
}

const userStore = create<userI>((set, get) => ({
    id: null,
    email: null,
    registeredTime: 0,
    firstVisit: false,
    plan: null,
    lastPayment: null,

    createUser:  (user) => {
        set( {
            id: user.id,
            email: user.email,
        })
    },
    clearUser: () => {
        set({
            id: null,
            email: null,
            plan: null,
            lastPayment: null,
        })
    },
    toggleVisit: () => {
        set({
            firstVisit: true
        })
    },
    changePlan: (value) => {
        set({
            plan: value
        })
    },
    setRegisteredTime: (value) => {
        set({
            registeredTime: value
        })
    },

}));

export default userStore;