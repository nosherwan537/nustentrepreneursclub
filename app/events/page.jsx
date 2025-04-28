import Header from "../../components/header";
import Footer from "../../components/footer";
import UpComingEvents from "@/components/upcomingEvents";
import PastEvents from "@/components/pastEvents";

export default function Event(){
    return(
        <div className="min-h-screen text-white">
            <Header />
            <div className="pt-16 md:pt-24 pb-8 px-4 md:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-800">
                        Our Events
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                    Join us for exciting opportunities to connect, learn, and grow with our community.
                </p>
            </div>
            <UpComingEvents/>
            <PastEvents/>
            <Footer />
        </div>
    )
}