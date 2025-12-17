import Link from "next/link";

const ServiceItem = ({ service }) => {
  return (
    <li>
      <Link href={`/services/${service.slug}`}>
        <a className="nav-link">
          {service.title}
        </a>
      </Link>
    </li>
  );
};

export default ServiceItem;
