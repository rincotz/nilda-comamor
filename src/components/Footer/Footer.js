import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <nav>
        <header><Link to='/'>.comAmor</Link></header>
        <ul>
            <li><Link to='/sobre'>Quem somos</Link></li>
            <li><Link to='/carreiras'>Carreiras</Link></li>
            <li><Link to='/ajuda'>Ajuda</Link></li>
        </ul>
        <ul>
            <li><Link to='/cozinhando'>Cozinhando</Link></li>
            <li><Link to='/cadastro'>Cadastro</Link></li>
            <li><Link to='/cozinhando/porque'>Por que cozinhar</Link></li>
            <li><Link to='/cozinhando/hospitalidade'>Hospitalidade</Link></li>
            <li><Link to='/cozinhando/responsabilidade'>Cozinhando com responsabilidade</Link></li>
        </ul>
    </nav>
)

export default Footer;