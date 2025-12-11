import React, { useMemo } from 'react';
import './Services.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import Services_Data from '../../assets/services_data';

const Services = () => {
  const services = useMemo(() => Services_Data, []);

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services-title">
        <h1 id="services-title">My Experience</h1>
        <img 
          src={theme_pattern} 
          alt="Decorative pattern" 
          className="services-pattern"
          loading="lazy"
          width={200}
          height={50}
        />
      </div>
      <div className="services-container" role="list" aria-label="Experience items">
        {services.map((service) => (
          <article 
            key={service.id || service.s_no} 
            className="services-format"
            role="listitem"
          >
            <span className="services-number" aria-hidden="true">
              {service.s_no}
            </span>
            <h2 className="services-name">
              {service.s_name}
            </h2>
            <p className="services-description">
              {service.s_desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default React.memo(Services);