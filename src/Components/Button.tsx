import type { ReactElement } from "react"

export interface Buttonprops{
    variant: "primary" | "secondary",
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    content:string
}

// const SizeVariant = {
//     sm:"px-2 py-1",
//     md:"px-4 py-2",
//     lg:"px-8 py-4",
// }

const ButtonVariant = {
    primary:"bg-purple-800 text-white",
    secondary:"bg-purple-300 text-purple-900"
}

const defaultDesign = "px-4 font-light py-2 rounded-xl flex items-center justify-center"


export function Button(props:Buttonprops){
    return <button className = {ButtonVariant[props.variant]+ " " + defaultDesign}>
        <div className="mr-2">
        {props.startIcon}
        </div>
        {props.content}
    </button>
}