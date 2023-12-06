
import { FrustationsContext } from "../context/FrustationsContext";
import { useContext } from "react";

export const useFrustationsContext = () => {
    // This context gets the value provided by FrustationsContext, that is {state, dispatch}
    const context = useContext(FrustationsContext)

    if (!context) {
        throw Error('useFrustationsContext must be used inside a FrustationsContextProvider')
    }
    return context
}