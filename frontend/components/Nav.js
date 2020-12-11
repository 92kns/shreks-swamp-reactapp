import Link from 'next/link';
import NavStyles from './styles/NavStyles';


const Nav = () => (
    <NavStyles>
        <Link href = "/items">
            <a>SWAMP INVENTORY!</a>
        </Link>
        <Link href = "/sell">
            <a>SELL!</a>
        </Link>
        <Link href = "/signup">
            <a>Sign up!</a>
        </Link>
        {/* <Link href = "/orders">
            <a>Orders!</a>
        </Link>
        <Link href = "/me">
            <a>Account!</a>
        </Link>
        <Link href = "/">
            <a>Hut!</a>
        </Link> */}
        
    </NavStyles>
)

export default Nav