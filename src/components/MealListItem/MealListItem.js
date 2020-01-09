import React from 'react'
import { Link } from "react-router-dom";

export default ({ name, price, id }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{name}</h3>
        </Link>
        <p>{price}</p>
    </div>
)