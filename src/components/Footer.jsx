import React from 'react'


function Footer() {
    const today = new Date();
  return (
    <footer >
        <p>Genesys Core Copyright &copy; {today.getFullYear()} Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
