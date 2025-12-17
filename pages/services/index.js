import Link from "next/link";
import services from "../../data/services";

export default function ServicesPage() {
  return (
    <section>
      <h1>Nos services</h1>
      <ul>
        {services.map(service => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`}>
              <a>{service.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  

  
}


