import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

const OrganisationForm = (props) => (
  <form className={props.formType}>
    <div className="form-first-row edit-field">
      <TextField
        className="edit-orgnasiation-name"
        label="Organisation name"
        name="name"
        value={props.name}
        onChange={props.onChange}
        fullWidth
      />
      <span className="text-field-container">
        <h6 className="not-include-in-add-org details-area">Area:</h6>
        <TextField
          className="text-field"
          label="Area"
          name="area"
          value={props.area}
          onChange={props.onChange}
          fullWidth
        />
      </span>
      <span className="text-field-two-container">
        <h6 className="not-include-in-add-org details-area">| Borough:</h6>
        <TextField
          className="text-field-two"
          label="Borough"
          name="borough"
          value={props.borough}
          onChange={props.onChange}
          fullWidth
        />
      </span>
      <h4 className="not-include-in-add-org health-advice-title">- Health advice
        <TextField
          className="not-include-in-add-org health-advice"
          fullWidth
          name="advices"
          value={props.advices}
          onChange={props.onChange}
        />
      </h4>
      <TextField
        label="Process"
        className="edit-process-field"
        name="process"
        value={props.process}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="edit-day-field"
        label="Day"
        name="day"
        value={props.day}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="telephone-label"
        label="Telephone"
        name="telephone"
        value={props.telephone}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="email-label"
        label="Email"
        name="email"
        value={props.email}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="website-label add-website-field"
        label="Website"
        name="website"
        value={props.website}
        onChange={props.onChange}
        fullWidth
      />
    </div>
    <div className="form-third-row not-include-in-edit-org">
      <TextField
        multiline
        rows="4"
        label="Service"
        fullWidth
        name="service"
        value={props.service}
        onChange={props.onChange}
      />
    </div>
    <h4 className="add-org-title categories-checkbox-title">Categories</h4>
    <div className="add-categories-checkbox categories-checkbox">
      <label htmlFor="category1Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category1Id" name="category_1" value="Debt" />
        Debt
      </label>
      <label htmlFor="category2Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category2Id" name="category_2" value="ypfamilies" />
        YP Families
      </label>
      <label htmlFor="category3Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category3Id" name="category_3" value="womendv" />
        Women DV
      </label>
      <label htmlFor="category4Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category4Id" name="category_4" value="trafficking" />
        Trafficking
      </label>
      <label htmlFor="category5Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category5Id" name="category_5" value="healthcare" />
        HealthCare
      </label>
      <label htmlFor="category6Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category6Id" name="category_6" value="destitution" />
        Destitution
      </label>
      <label htmlFor="category7Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category7Id" name="category_7" value="lgbtqi" />
        LGBTQI
      </label>
      <label htmlFor="category8Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category8Id" name="category_8" value="mentalhealthservices" />
        Mental Health Services
      </label>
      <label htmlFor="category9Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category9Id" name="category_9" value="healthcare" />
        Healthcare
      </label>
    </div>
  </form >
);

OrganisationForm.propTypes = {
  formType: PropTypes.string.isRequired,
};
export default OrganisationForm;