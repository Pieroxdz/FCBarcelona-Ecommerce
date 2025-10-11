import { useEffect, useState } from "react";
import type { Player } from "../types/Player";
import PlayerCard from "../common/PlayerCard";

const Team = () => {

    const [listaJugadores, setListaJugadores] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch("https://pieroxdz.alwaysdata.net/WS_FCBARCELONA/jugadores.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setListaJugadores(data);
            })
            .catch(error => {
                console.error("Error al cargar jugadores:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <section id="jugadores" className="py-20">
                <div className="jugadores-wrapper">
                    <h1 className="text-3xl font-bold text-center mb-8">Jugadores</h1>
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section id="jugadores" className="py-20 bg-gray-50">
                <div className="jugadores-wrapper max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Jugadores FC Barcelona
                    </h1>

                    {/* LA LISTA DE JUGADORES ESTÁ VACÍA? */}
                    {listaJugadores.length === 0 ?
                        /* SI LA RESPUESTA ES TRUE PASA ESTO */
                        (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-xl">
                                    No hay jugadores disponibles
                                </p>
                                <button
                                    onClick={leerServicio}
                                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Recargar
                                </button>
                            </div>
                        ) :
                        /* SI LA RESPUESTA ES FALSE PASA ESTO */
                        (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {listaJugadores.map((jugador) => (
                                    <PlayerCard
                                        key={jugador.id_jugador}
                                        player={jugador}
                                    />
                                ))}
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default Team;