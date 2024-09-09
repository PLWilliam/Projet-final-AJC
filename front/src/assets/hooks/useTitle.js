import { useEffect } from "react";

export const useTitle = () => {
    useEffect(() => {
        document.title = ` Shopping Cart`
    }, [])
}