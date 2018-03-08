import React from 'react';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import Search from './Search'
import './index.css';
import orgData from './org_data';
import TopNav from '../TopNav';

const OrganisationCard = () => (
  <div>
    <TopNav />
    <Search />
    <div className="single-organisation">
      {orgData.map(org => 
        (
          <div className="form-card" key={org.id}>
            <EditOrganisation />
            <SingleOrganisation />
            <div className="single-orgonaization-details">
              <h4>{org.name}</h4>
              <h6>Area: {org.area} | Borough: {org.borough}</h6>
              <div className="health-advice-process">
                <p> - Health advice</p>
                <p> - {org.advice}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>  
  </div>
)

export default OrganisationCard