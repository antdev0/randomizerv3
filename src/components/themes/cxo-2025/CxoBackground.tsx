import AnimatedGlowElement from "./AnimatedGlowElement";
import BackgroundVideo from "./BackgroundVideo";

const CxoBackground = () => {
    const backgroundStyle = {
        backgroundImage: `
    linear-gradient(90deg, #00ffff 1px, transparent 1px),
    linear-gradient(180deg, #00ffff 1px, transparent 1px),
    radial-gradient(circle at 20% 20%, #00ffff 1px, transparent 1px),
    radial-gradient(circle at 80% 80%, #ff6b35 1px, transparent 1px)
  `,
        backgroundSize: "50px 50px, 50px 50px, 100px 100px, 150px 150px",
    };
    return (
        <div className="bg-black absolute overflow-hidden w-[100%] h-[100%] pointer-events-none">
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-10" style={backgroundStyle} />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300ffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="absolute inset-0">
                <AnimatedGlowElement />
                <BackgroundVideo />
            </div>
        </div>
    );
}

export default CxoBackground;