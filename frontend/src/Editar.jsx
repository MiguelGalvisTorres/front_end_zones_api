import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function Editar() {
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate()
    const {id} = useParams()
    var endpoint = 'http://127.0.0.1:8000/api/zones/'+id;

    function actualizar_datos(){
        fetch(endpoint, {
            method: "PUT",
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
            alert("Se guardo de manera correcta")
            navigate("/")
        })
    }

    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    useEffect(function(){
        fetch(endpoint)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            setName(data.name || "")
            setStatus(data.status || "")
        })
    }, [id])

    return (
        <div>
            <div>
                <label>Nombre: </label>
                <input type="text" name="" value={name}
                    onChange={function (e) {
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
                <button type="button" onClick={actualizar_datos}>Actualizar</button>
            </div>
        </div>
    )
}
