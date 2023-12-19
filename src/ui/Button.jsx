import { Link } from "react-router-dom"
export default function Button({children, disabled, to}){
    const classname = "bg-yellow-400 px-4 py-3 rounded-full text-stone-800 font-semibold uppercase tracking-wide inline-block hover:bg-yellow-300 disabled:cursor-not-allowed sm:px-4 sm:py-4"

    if(to)
        return <Link className={classname} to={to}>{children}</Link>
    return(
        <button className={classname} disabled={disabled}>
            {children}
        </button>
    )
}