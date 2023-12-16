import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import Header from "./Header";


export default function AppLayout(){
    const navigation = useNavigation(); //used to get info about the component is loading or in idle state
    // console.log(navigation);
    const isLoading = navigation.state === 'loading';
    return(
        <div className="layout">
            {isLoading && <Loader />}
            <Header/>
            <main>
                <Outlet/> 
            </main>
            <CartOverview/>

        </div>
    )
}
