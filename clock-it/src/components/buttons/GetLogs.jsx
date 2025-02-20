import { Link } from "react-router-dom"
import React from 'react'


export default function GetLogsButton() {

    return (
      <Link to='/myLogs'>
        <button>See all of my logs!</button>
      </Link>
    );
  }