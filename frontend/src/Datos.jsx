import React, {useState, useEffect} from 'react'

export default function Datos() {
    const [datos, setDatos] = useState([])
    const [name, setName] = useState("")
    const [status, setStatus] = useState("active")
    var endpoint = "http://127.0.0.1:8000/api/zones";
    function consumir_api(){
        fetch(endpoint)
        .then(function(response){
            return response.json()
        })
        .then(function (data){
            setDatos(data)
        })
    }

    useEffect(function(){
        consumir_api()
    }, [])

    function eliminar_dato(id){
        fetch(endpoint+ "/" + id,{
            method: "DELETE"
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            consumir_api();
        })
    }

    function guardar_datos(){
        fetch(endpoint, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                status: status
            })
        })
        .then(function(response){
            return response.json()
        })
        .then(function (data){
            alert(data.name)
            consumir_api()
        })
    }

    const handleChange = (e) => {
        setStatus(e.target.value);
    };

  return (
    <div>
        <div>
            <label>Nombre: </label>
            <input type="text" name="" placeholder='Ingrese el nombre:'
            onChange={function (e){
                setName(e.target.value)
            }} />
            <br />
            <label>Estado: </label>
            <select 
                name="status" 
                className="form-control"
                value={status} 
                onChange={handleChange}
            >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
            </select>
            <br />
            <button type="button" onClick={guardar_datos}>Enviar datos</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {datos.map(function(zone){
                    return (
                        <tr key={zone.id}>
                            <td>{zone.id}</td>
                            <td>{zone.name}</td>
                            <td>{zone.status}</td>
                            <td>
                                <button type="button" onClick={function (){
                                    eliminar_dato(zone.id)
                                }}>Eliminar</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}
