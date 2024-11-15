import { CervezasContext } from '@/context/CervezasContext'
import { useContext } from 'react'


export const useCervezas = () => {
    const cervezasContext = useContext(CervezasContext);
    if (!cervezasContext) throw new Error("Error en cervezas context");
    const { cervezas } = cervezasContext;
    return {
        cervezas: cervezas
    }
}