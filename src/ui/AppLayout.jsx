import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import Header from "./Header";


export default function AppLayout(){
    const navigation = useNavigation(); //used to get info about the component is loading or in idle state
    // console.log(navigation);
    const isLoading = navigation.state === 'loading';
    return(
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loader />}
            <Header/>
            <div className="overflow-scroll">
            <main className="mx-auto max-w-3xl">
                <Outlet/> 
            </main>
            </div>
            
            <CartOverview/>

        </div>
    )
}
