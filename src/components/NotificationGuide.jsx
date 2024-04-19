export default function NotificationGuide({title,message,buttonText,widthButton}) {
    return(
        <div className="flex gap-2 rounded-xl flex-col p-4 h-min-height bg-secondaryBlack mt-2 mb-3 mx-2 text-white">
            <span className="font-bold">{title}</span>
            <span className="text-sm">{message}</span>

            <button className={`w-${widthButton} p-1 bg-white text-sm text-black font-bold rounded-3xl mt-2 transition-transform transform hover:scale-105`}>{buttonText}</button>
        </div>
    )
}