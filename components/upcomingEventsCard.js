import Image from "next/image";
import { useUserContext } from "@/context/context";
import { useState, useEffect } from "react";
import { eventRegister } from "@/lib/events";

export default function UpComingEventsCard({ id, title, desc, image, users }) {
    const { user } = useUserContext();
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        if (user?.uid && users?.includes(user.uid)) {
            setRegistered(true);
        }
    }, [user, users]);

    return (
        <div className="card group">
            <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <Image
                    src={image || "/testingimage.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                {title || "Event Title"}
            </h2>
            
            <p className="text-neutral-600 mb-4 line-clamp-2">
                {desc || "Brief description of the event goes here."}
            </p>

            <div className="flex justify-end">
                <button
                    className={`btn-primary flex items-center space-x-2 ${
                        registered ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => {
                        if (!registered) {
                            eventRegister(user?.uid, id, setRegistered);
                        }
                    }}
                    disabled={registered}
                >
                    <span>{registered ? "Registered!" : "Register Now"}</span>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
} 