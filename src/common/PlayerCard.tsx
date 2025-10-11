import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import type { Player } from "../types/Player";

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="relative w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            {/* Imagen de fondo */}
            <div
                className="relative w-full h-96 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:brightness-50 group-hover:bg-black"
                style={{
                    backgroundImage: `url(${player.image || '/placeholder-player.jpg'})`,
                }}
            >
                {/* Overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Contenido inferior */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                        {player.nombre}
                    </h3>
                    {player.posicion && (
                        <p className="text-sm uppercase tracking-wider text-blue-200 mb-3 opacity-90">
                            {player.posicion}
                        </p>
                    )}
                </div>

                {/* Íconos flotantes */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] flex space-x-6 text-2xl opacity-0 transition-all duration-500 ease-out group-hover:bottom-1/2 group-hover:opacity-100 z-20"
                >
                    <FaFacebookF className="text-white transition-transform duration-300 hover:scale-110" />
                    <FaTwitter className="text-white transition-transform duration-300 hover:scale-110" />
                    <FaInstagram className="text-white transition-transform duration-300 hover:scale-110" />
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
