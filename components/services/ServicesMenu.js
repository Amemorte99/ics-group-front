import Link from "next/link";
import services from "../../data/services";
import ServiceItem from "./ServiceItem";

const ServicesMenu = () => {
  return (
    <li className="nav-item dropdown">
      <Link href="#">
        <a className="nav-link" onClick={e => e.preventDefault()}>
          Services <i className="fas fa-chevron-down"></i>
        </a>
      </Link>

      <ul className="dropdown-menu">
        {services.map(service => (
          <ServiceItem key={service.slug} service={service} />
        ))}
      </ul>
    </li>
  );
};

export default ServicesMenu;
