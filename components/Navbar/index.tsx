import { menu } from '../../helpers/menu';
import { StyledNavbar } from './styles';
import Link from 'next/link';

const Navbar = () => {
  return (
    <StyledNavbar>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            <Link href={item.url}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </StyledNavbar>
  );
};

export default Navbar;
