import React from 'react';
import { connect } from 'react-redux';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextFieldOrg from './TextFieldOrg';
import BoroughData from '../../Data/Boroughs.json';
 // categories ---> static categories list stored locally  in data folder
import categories from '../../Data/Categories.json';
import helpers from '../../helpers';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Mon-Fri', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri'];
const areas = ['All', 'Central', 'East', 'North', 'South', 'West'];
const sortedBorough = BoroughData.map(borough => borough.borough).filter((elem, index, self) =>
  index === self.indexOf(elem)
).sort();

const OrganisationForm = (props) => {
  const checkedCategory = helpers.addSpaceToCategName(categories, props.checkedCategory);
  
// I create a collection of days which combine days from days array and props.day and return unique value (no repetition of day )
// then I made a copy of this collection using spread operator
  const uniqueDays= new Set([...days, ...props.day]);
  const checkDaysList = [...uniqueDays]; 
  const checkableDays = [] 

// map over checkdaylist and create a new array of days that includes
// days from BE that meet the format uses on FE (days array), empty string, dash sign... will be exclude 
// on checkbox list

  checkDaysList.forEach(myDay => {
    days.forEach(el => {
      if (myDay.includes(el)) {
        if(checkableDays.indexOf(myDay) === -1){
        checkableDays.push(myDay);
        }
      }
    })
  })

  return (
    <div className="org-form">
      <TextFieldOrg
        className="organisation-name"
        placeholder="Add organisation name..."
        label="Organisation name"
        name="Organisation"
        multiline
        rowsMax="4"
        value={props.name}
        onChange={props.onChange}
        fullWidth
      />
      <div className="location">
        <div className="location-item">
          <span className="location-name">Area</span>:&nbsp;&nbsp; 
          <FormControl className="form-control-filed add-area">
            <Select
              open={props.openSelect}
              onClose={props.closeSelect}
              value={props.area}
              onChange={props.onChange}
              inputProps={{
                name: 'Area',
                id: 'controlled-open-select',
              }}
            >
              {
                <MenuItem className="select-title">
                  {'Select your Area'}
                </MenuItem> 
              }
              {areas.map(area => (
                <MenuItem value={area}>{area}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> 
        <span className="space">&#124;</span>
        <div className="location-item">
          <span className="location-name">Borough</span>:&nbsp;&nbsp;
          <FormControl className="form-control-filed add-borough">
            <Select
              open={props.openSelect}
              onClose={props.closeSelect}
              value={props.borough}
              onChange={props.onChange}
              inputProps={{
                name: 'Borough',
                id: 'controlled-open-select',
              }}
            >
              {
                <MenuItem className="select-title">
                  {'Select your Borough'}
                </MenuItem> 
              }
              {sortedBorough.map(borough => (
                <MenuItem className="location-i" value={borough}>{borough}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <TextFieldOrg
        className="mt"
        label="Project"
        placeholder="Add project..."
        name="project"
        multiline
        rowsMax="4"
        value={props.project}
        onChange={props.onChange}
        fullWidth
      />
      <TextFieldOrg
        placeholder="Add services..."
        label="Services"
        className="mt"
        fullWidth
        multiline
        rowsMax="4"
        name="Services"
        value={props.service}
        onChange={props.onChange}
      />
      <TextFieldOrg
        className="mt"
        label="Process"
        placeholder="Add process..."
        fullWidth
        multiline
        rowsMax="4"
        name="Process"
        value={props.process}
        onChange={props.onChange}
      />
      <Grid container spacing={24} className="mt">
        <Grid item xs={12} sm={6} className="day">
          <FormControl className="edit-day-field">
            <InputLabel htmlFor="select-multiple-checkbox" shrink>Select days</InputLabel>
            <Select
              multiple
              className="mt-select"
              value={props.day}
              onChange={props.handleMulitySelectChange}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
            >
              {
                <MenuItem className="select-title">
                  {'Select days'}
                </MenuItem> 
              }
         
              {checkableDays.map(day => (
                <MenuItem
                  key={day}
                  value={day}
                >
                  <Checkbox checked={props.day.indexOf(day) > -1} />
                  <ListItemText primary={day} />
                </MenuItem>
              ))}
            close
            </Select>
          </FormControl>
        
        </Grid>
        <Grid item xs={12} sm={6} className="telephone">
          <TextFieldOrg
            type="tel"
            className="mt"
            placeholder="Add telephone..."
            label="Telephone"
            name="Tel"
            multiline
            rowsMax="4"
            value={props.telephone && props.telephone !== 'undefined'? props.telephone : ''}
            onChange={props.onChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={24} className="mt">
        <Grid item xs={12} sm={6}>
          <TextFieldOrg
            className="email-label"
            placeholder="Add email..."
            label="Email"
            name="Email"
            multiline
            rowsMax="4"
            value={props.email}
            onChange={props.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldOrg
            className="add-website "
            placeholder="Add website..."
            label="Website"
            name="Website"
            multiline
            rowsMax="4"
            value={props.website}
            onChange={props.onChange}
            fullWidth
          />  
        </Grid>
      </Grid>
      <Grid container spacing={24} className="mt">
        <Grid item xs={12} sm={12}>
          <TextFieldOrg
            className="email-label add-tag"
            label="Tags"
            placeholder="Add tags..."
            name="tag"
            multiline
            rowsMax="4"
            value={props.tag}
            onChange={props.onChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <h4 className="add-org-title categories-checkbox-title mt">Categories</h4>
      <div className="add-categories-checkbox categories-checkbox">
        {categories.map(category => helpers.linkMaker(category) === props.checkedCategory ?
          (
            <FormControlLabel
              className="checkbox"
              control={
                <Checkbox
                  checked={props.check}
                  onChange={props.handleDefaultCheckbox}
                  value={checkedCategory}
                  className="checkbox-color"
                />
              }
              label={checkedCategory}
              name={checkedCategory}
            />
          ) : (
            <FormControlLabel
              className="checkbox"
              control={
                <Checkbox
                  onChange={props.handleCheckBox}
                  value={helpers.linkMaker(category)}
                  className="checkbox-color"
                />
              }
              label={category}
              name={helpers.linkMaker(category)}
            />
          ))}
      </div>
      
    </div >
  )
}



function mapStateToProps(state) {
  return {
    categoriesName: state.categoriesList
  }
}

export default connect(mapStateToProps)(OrganisationForm);
