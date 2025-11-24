import { useEffect, useState, type FormEvent } from "react"
import { API_URL } from "../utils"


interface Socio {
    idsocio: number
    nombre: string
    apellido: string
    dni: string
    fecha_inscripcion: string
    tipo_membresia: string
}

export const Socios = () => {
    const [listaSocios, setListaSocios] = useState<Socio[]>([])
    const [idsocio, setIdsocio] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [dni, setDni] = useState("")
    const [fechaInscripcion, setFechaInscripcion] = useState("")
    const [tipoMembresia, setTipoMembresia] = useState("Socio Estándar")

    const [mostrarInsertModal, setMostrarInsertModal] = useState(false)
    const [mostrarUpdateModal, setMostrarUpdateModal] = useState(false)
    const [mostrarDeleteModal, setMostrarDeleteModal] = useState(false)

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = async () => {
        try {
            const response = await fetch(API_URL + "socios.php")
            const data: Socio[] = await response.json()
            setListaSocios(data)
        } catch (error) {
            console.error("Error al obtener los socios:", error)
        }
    }

    const insertSocio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("nombre", nombre)
        formData.append("apellido", apellido)
        formData.append("dni", dni)
        formData.append("fecha_inscripcion", fechaInscripcion)
        formData.append("tipo_membresia", tipoMembresia)

        await fetch(API_URL + "sociosinsert.php", {
            body: formData,
            method: "POST"
        })

        setMostrarInsertModal(false)
        leerServicio()
        limpiarFormulario()
    }

    const updateSocio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("idsocio", idsocio)
        formData.append("nombre", nombre)
        formData.append("apellido", apellido)
        formData.append("dni", dni)
        formData.append("fecha_inscripcion", fechaInscripcion)
        formData.append("tipo_membresia", tipoMembresia)

        await fetch(API_URL + "sociosupdate.php", {
            body: formData,
            method: "POST"
        })

        setMostrarUpdateModal(false)
        leerServicio()
        limpiarFormulario()
    }

    const deleteSocio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("idsocio", idsocio)

        await fetch(API_URL + "sociosdelete.php", {
            body: formData,
            method: "POST"
        })

        setMostrarDeleteModal(false)
        leerServicio()
        limpiarFormulario()
    }

    const seleccionarSocio = (socio: Socio) => {
        setIdsocio(socio.idsocio.toString())
        setNombre(socio.nombre)
        setApellido(socio.apellido)
        setDni(socio.dni)
        setFechaInscripcion(socio.fecha_inscripcion)
        setTipoMembresia(socio.tipo_membresia)
        setMostrarUpdateModal(true)
    }

    const eliminarSocio = (socio: Socio) => {
        setIdsocio(socio.idsocio.toString())
        setNombre(socio.nombre)
        setApellido(socio.apellido)
        setDni(socio.dni)
        setFechaInscripcion(socio.fecha_inscripcion)
        setTipoMembresia(socio.tipo_membresia)
        setMostrarDeleteModal(true)
    }

    const limpiarFormulario = () => {
        setIdsocio("")
        setNombre("")
        setApellido("")
        setDni("")
        setFechaInscripcion("")
        setTipoMembresia("Socio Estándar")
    }

    const dibujarTabla = () => {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-gradient-to-r from-blue-900 to-red-700 text-white">
                        <tr>
                            <th className="px-6 py-3 text-center text-sm font-bold uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Apellido</th>
                            <th className="px-6 py-3 text-center text-sm font-bold uppercase">DNI</th>
                            <th className="px-6 py-3 text-center text-sm font-bold uppercase">Fecha Inscripción</th>
                            <th className="px-6 py-3 text-center text-sm font-bold uppercase">Membresía</th>
                            <th className="px-6 py-3 text-center text-sm font-bold uppercase" colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaSocios.map((item, index) =>
                            <tr key={item.idsocio} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="px-6 py-4 text-center text-gray-800 font-semibold">{item.idsocio}</td>
                                <td className="px-6 py-4 text-gray-700">{item.nombre}</td>
                                <td className="px-6 py-4 text-gray-700">{item.apellido}</td>
                                <td className="px-6 py-4 text-center text-gray-700">{item.dni}</td>
                                <td className="px-6 py-4 text-center text-gray-700">{item.fecha_inscripcion}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.tipo_membresia === 'Socio VIP' ? 'bg-yellow-200 text-yellow-800' :
                                        item.tipo_membresia === 'Socio Premium' ? 'bg-purple-200 text-purple-800' :
                                            'bg-blue-200 text-blue-800'
                                        }`}>
                                        {item.tipo_membresia}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <i
                                        className="fa-solid fa-pencil cursor-pointer text-blue-600 hover:text-blue-800 hover:scale-110 transition-all"
                                        title="Editar"
                                        onClick={() => seleccionarSocio(item)}
                                    ></i>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <i
                                        className="fa-solid fa-trash cursor-pointer text-red-600 hover:text-red-800 hover:scale-110 transition-all"
                                        title="Eliminar"
                                        onClick={() => eliminarSocio(item)}
                                    ></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    const dibujarInsertModal = () => {
        return (
            <div className={`fixed inset-0 z-50 ${mostrarInsertModal ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300`}>
                <div className="absolute inset-0 bg-black/60" onClick={() => setMostrarInsertModal(false)}></div>

                <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform ${mostrarInsertModal ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-900 to-red-700 text-white">
                        <h5 className="text-2xl font-bold">⚽ Nuevo Socio</h5>
                        <button
                            type="button"
                            onClick={() => setMostrarInsertModal(false)}
                            className="text-white hover:text-gray-200 text-3xl font-light"
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={insertSocio} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ej: Lionel"
                                required
                                minLength={3}
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ej: Messi"
                                required
                                minLength={3}
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">DNI</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ej: 12345678"
                                required
                                minLength={8}
                                maxLength={8}
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Inscripción</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                value={fechaInscripcion}
                                onChange={(e) => setFechaInscripcion(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Membresía</label>
                            <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={tipoMembresia}
                                onChange={(e) => setTipoMembresia(e.target.value)}
                            >
                                <option value="Socio Estándar">Socio Estándar</option>
                                <option value="Socio Premium">Socio Premium</option>
                                <option value="Socio VIP">Socio VIP</option>
                            </select>
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-blue-900 to-red-700 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                            type="submit"
                        >
                            💾 Guardar Socio
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const dibujarUpdateModal = () => {
        return (
            <div className={`fixed inset-0 z-50 ${mostrarUpdateModal ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300`}>
                <div className="absolute inset-0 bg-black/60" onClick={() => setMostrarUpdateModal(false)}></div>

                <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform ${mostrarUpdateModal ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-900 to-red-700 text-white">
                        <h5 className="text-2xl font-bold">✏️ Actualizar Socio</h5>
                        <button
                            type="button"
                            onClick={() => setMostrarUpdateModal(false)}
                            className="text-white hover:text-gray-200 text-3xl font-light"
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={updateSocio} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Socio</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                                value={idsocio}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                minLength={3}
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                minLength={3}
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">DNI</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                minLength={8}
                                maxLength={8}
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Inscripción</label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                value={fechaInscripcion}
                                onChange={(e) => setFechaInscripcion(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Membresía</label>
                            <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={tipoMembresia}
                                onChange={(e) => setTipoMembresia(e.target.value)}
                            >
                                <option value="Socio Estándar">Socio Estándar</option>
                                <option value="Socio Premium">Socio Premium</option>
                                <option value="Socio VIP">Socio VIP</option>
                            </select>
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-blue-900 to-red-700 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                            type="submit"
                        >
                            💾 Actualizar
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const dibujarDeleteModal = () => {
        return (
            <div className={`fixed inset-0 z-50 ${mostrarDeleteModal ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300`}>
                <div className="absolute inset-0 bg-black/60" onClick={() => setMostrarDeleteModal(false)}></div>

                <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white shadow-2xl rounded-lg transition-all duration-300 ${mostrarDeleteModal ? 'scale-100' : 'scale-75'}`}>
                    <div className="p-6 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-t-lg">
                        <h5 className="text-2xl font-bold">🗑️ Eliminar Socio</h5>
                    </div>

                    <form onSubmit={deleteSocio} className="p-6 space-y-4">
                        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                            <p className="text-gray-800 font-medium">
                                ¿Estás seguro que deseas eliminar al socio:
                            </p>
                            <p className="text-lg font-bold text-red-600 mt-2">
                                {nombre} {apellido}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                DNI: {dni} | ID: {idsocio}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                type="submit"
                            >
                                🗑️ Eliminar
                            </button>
                            <button
                                className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                                onClick={() => setMostrarDeleteModal(false)}
                                type="button"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-red-700 bg-clip-text text-transparent">
                                ⚽ Gestión de Socios
                            </h1>
                            <p className="text-gray-600 mt-2">FC Barcelona - Base de Datos</p>
                        </div>
                        <button
                            onClick={() => setMostrarInsertModal(true)}
                            className="bg-gradient-to-r from-blue-900 to-red-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <i className="fa-solid fa-plus"></i>
                            Nuevo Socio
                        </button>
                    </div>

                    {dibujarTabla()}
                </div>
            </div>

            {dibujarInsertModal()}
            {dibujarUpdateModal()}
            {dibujarDeleteModal()}
        </div>
    )
}