import React from 'react'

function Footer() {
    const today = new Date();
  return (
    <footer >
        <p style={{color:'#ffff'}}>Copyright &copy; {today.getFullYear()} Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
