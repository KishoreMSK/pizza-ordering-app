import { Link } from "react-router-dom"
export default function Button({children, disabled, to, type}){
    
    const base = "inline-block text-sm bg-yellow-400 rounded-full text-stone-800 font-semibold uppercase tracking-wide hover:bg-yellow-300 disabled:cursor-not-allowed"
    const styles = {
        small: base + ' px-4 py-2 md:px-5 md:py-2 text-xs',
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        secondary: 
            `inline-block text-sm rounded-full border-2 border-stone-300 md:text-stone-600
             transition-colors duration-300 text-stone-800 font-semibold uppercase 
             tracking-wide text-stone-400 focus:outline-none hover:bg-stone-300 hover:text-stone-800
             focus:bg-stone-300 focus:text-stone-800 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5`
    }
    if(to)
        return <Link className={styles[type]} to={to}>{children}</Link>
    return(
        <button className={styles[type]} disabled={disabled}>
            {children}
        </button>
    )
}