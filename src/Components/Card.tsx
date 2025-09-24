import { TwitterTweetEmbed } from "react-twitter-embed";
import { ShareIcon } from "../Icons/ShareIcon";
import { DeleteIcon } from "../Icons/delete";
import { YoutubeIcon } from "../Icons/Youtube";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { NotesIcon } from "../Icons/NotesIcon";

function getTweetId(url: string) {
const parts = url.split("/");
return parts[parts.indexOf("status") + 1];
}

function getYouTubeEmbedLink(url: string) {
    // Match standard URL: https://www.youtube.com/watch?v=VIDEOID
    let videoId = "";
    if (url.includes("youtu.be")) {
        // Short link
        videoId = url.split("/").pop()?.split("?")[0] || "";
    } else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split("&")[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
    }


interface CardProps {
content: string;
// startIcon?: "youtube" | "twitter" | "notes";
link?: string;
type: "youtube" | "twitter" | "notes";
notes?:string;
}

const startIconVariant:any = {
    "youtube" : <YoutubeIcon/>,
    "twitter" : <TwitterIcon/>,
    "notes" : <NotesIcon/>
}

export const Card = (props: CardProps) => {
return (
<div className="min-w-72 flex flex-col rounded-xl border-2 border-slate-300 shadow-2xl min-h-72 max-w-72 p-2">
    <div className="flex items-center justify-between px-3 mt-3 mb-3">
    <div className="flex items-center gap-2 min-w-0">
        {startIconVariant[props.type]}
        <span className="truncate text-md font-medium">{props.content}</span>
    </div>
    <div className="flex items-center gap-2 flex-shrink-0">
        <ShareIcon/>
        <DeleteIcon/>
    </div>
    </div>

    <div className="flex flex-col gap-2 overflow-hidden">
    {props.type === "youtube" && props.link && (
        <iframe
        className="w-full  p-6"
        src= {getYouTubeEmbedLink(props.link)}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        />
    )}

    {props.type === "twitter" && props.link && (
        <TwitterTweetEmbed tweetId={getTweetId(props.link)} />
    )}

    {props.type === "notes" && props.notes && <div className="text-xl font-bold text-black">
    {props.notes}
    </div>}
    </div>
</div>
);
};
