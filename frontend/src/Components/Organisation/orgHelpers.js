const composedCategories = [
    'Gender Based Violence',
    'Mental Health Services',
    'Social and Other',
    'Baby Equipment'
  ]; 
  
const nonComposedCategories = [
    'Debt',
    'Trafficking',
    "LGBTQI",
    'Healthcare',
    'Education',
    'Benefits',
    'Families',
    'Housing',
    'Immigration',
    'Women',
    'Employment',
    'Destitution'
];

function handleCheckBoxProcess(event, listOfCategories) {
    let index;
    const target = event.target.value;
      for(let i = 0; i < composedCategories.length; i += 1) {
    // Case where category is checked and category's name is composed
      if(event.target.checked && composedCategories[i].includes(target)) {
        if(listOfCategories.indexOf(composedCategories[i]) === -1) { 
          listOfCategories.push(composedCategories[i]);              
        }
      } 
          
    // Case where category is not checked and category's name is composed
      if(!event.target.checked && target.includes(composedCategories[i])) { 
        if(listOfCategories.indexOf(composedCategories[i]) > -1) {
          index = listOfCategories.indexOf(composedCategories[i])
          listOfCategories.splice(index, 1)             
          }
        } 
      }
  
   // Special case 
   // Young people
      if ( event.target.checked && target.includes('Young People and Children')){
        if(listOfCategories.indexOf('Young People and Children') === -1 ) {
            listOfCategories.push('Young People/Children')
          } else if( listOfCategories.indexOf('Young People/Children') === -1  ) {
            listOfCategories.push('Young People/Children')
          }
      }
  
      if ( !event.target.checked && target.includes('Young People and Children')){
        if(listOfCategories.includes('Young People and Children')) {        
          index = listOfCategories.indexOf('Young People and Children');
          listOfCategories.splice(index, 1);
        } else if( listOfCategories.includes('Young People/Children')) {        
          index = listOfCategories.indexOf('Young People/Children');
          listOfCategories.splice(index, 1);
        }  
      }  
  
      //  nonComposedCategories name
      for(let i = 0; i < nonComposedCategories.length; i += 1) {
      // Case where category is checked and category's name is not composed    
        if(event.target.checked && target.includes(nonComposedCategories[i])){
          if(listOfCategories.indexOf(target) === -1 ) {
            listOfCategories.push(target);              
          } 
        }
  
      // Case where category is not checked and category's name is not composed
        if(!event.target.checked && target.includes(nonComposedCategories[i])){
          if(listOfCategories.indexOf(target) > -1) {
            index = listOfCategories.indexOf(target)
            listOfCategories.splice(index, 1)
          }
        }
      } 
  }

function handleDefaultCheckboxProcess(event, listOfCategories) {
    let index;  
    const target = event.target.value;
    for(let i = 0; i < composedCategories.length; i += 1) {
// Case where category is checked and category's name is composed
    if(event.target.checked && composedCategories[i].includes(target)) {
    if(listOfCategories.indexOf(composedCategories[i]) === -1) { 
        listOfCategories.push(composedCategories[i]); 
    } 
    } 
        
// Case where category is not checked and category's name is composed
    if(!event.target.checked && target.includes(composedCategories[i])) { 
    if(listOfCategories.indexOf(composedCategories[i]) > -1) {
        index = listOfCategories.indexOf(composedCategories[i])
        listOfCategories.splice(index, 1);
        }
    } 
    }

   // Special case 
   // Young people
      if ( event.target.checked && target.includes('Young People and Children')){
        if(listOfCategories.indexOf('Young People and Children') === -1 ) {
            listOfCategories.push('Young People/Children')
          } else if( listOfCategories.indexOf('Young People/Children') === -1  ) {
            listOfCategories.push('Young People/Children')
          }
      }
  
      if ( !event.target.checked && target.includes('Young People and Children')){
        if(listOfCategories.includes('Young People and Children')) {        
          index = listOfCategories.indexOf('Young People and Children');
          listOfCategories.splice(index, 1);
        } else if( listOfCategories.includes('Young People/Children')) {        
          index = listOfCategories.indexOf('Young People/Children');
          listOfCategories.splice(index, 1);
        }  
      } 
    
// nonComposedCategories name
    for(let i = 0; i < nonComposedCategories.length; i += 1) {
    // Case where category is checked and category's name is not composed
    if(event.target.checked && target.includes(nonComposedCategories[i])){
        if(listOfCategories.indexOf(target) === -1 ) {
        listOfCategories.push(target);              
        } 
    }

    // Case where category is not checked and category's name is not composed
    if(!event.target.checked && target.includes(nonComposedCategories[i])){
        if(listOfCategories.indexOf(target) > -1) {
        index = listOfCategories.indexOf(target)
        listOfCategories.splice(index, 1)
        }
    }
    }
}

// Categries format in FE
const checkCategories = [ 
    'Debt',
    'Trafficking',
    'Destitution',
    'LGBTQI',
    'Healthcare',
    'Education',
    'Benefits',
    'Employment',
    'Families',
    'Gender Based Violence',
    'Housing',
    'Immigration',
    'Mental Health Services',
    'Social and Other',
    'Women',
    'Baby Equipment',
];

const filterOrganisationData = (data, day, borough) => {
  if (day.length > 0 && borough.length > 0) {
    return data.filter(orgs => {
      const allDays = 
      orgs.service_days.includes('Monday') &&
      orgs.service_days.includes('Tuesday') &&
      orgs.service_days.includes('Wednesday') &&
      orgs.service_days.includes('Thursday') &&
      orgs.service_days.includes('Friday') &&
      orgs.service_days.includes('Saturday') &&
      orgs.service_days.includes('Sunday');
      
      const allDaysWithMonToFriFormat = 
      orgs.service_days.includes('Saturday') &&
      orgs.service_days.includes('Sunday') &&
      orgs.service_days.includes('Mon-Fri');

      // Check for five days of the week Monday to Friday
      const monToFri =  orgs.service_days.match('Mon-Fri');
      const workingDays = (orgs.service_days.includes('Monday') && 
        orgs.service_days.includes('Tuesday') && 
        orgs.service_days.includes('Wednesday') &&
        orgs.service_days.includes('Thursday') &&
        orgs.service_days.includes('Friday')) ;
      
      return orgs.service_days.includes(day) || 
          allDaysWithMonToFriFormat  || 
          allDays || 
          workingDays ||
          (monToFri && orgs.borough.includes(borough))
    })
  } else if (day.length > 0 && borough.length <= 0) {
    return data.filter(orgs => {
      const allDays = 
      orgs.service_days.includes('Monday') &&
      orgs.service_days.includes('Tuesday') &&
      orgs.service_days.includes('Wednesday') &&
      orgs.service_days.includes('Thursday') &&
      orgs.service_days.includes('Friday') &&
      orgs.service_days.includes('Saturday') &&
      orgs.service_days.includes('Sunday');

      const allDaysWithMonToFriFormat = 
      orgs.service_days.includes('Saturday') &&
      orgs.service_days.includes('Sunday') &&
      orgs.service_days.includes('Mon-Fri');

      // Check for five days of the week Monday to Friday / handle when day = Mon-Fri
      const monToFri =  orgs.service_days.match('Mon-Fri');
      const workingDays = (orgs.service_days.includes('Monday') && 
        orgs.service_days.includes('Tuesday') && 
        orgs.service_days.includes('Wednesday') &&
        orgs.service_days.includes('Thursday') &&
        orgs.service_days.includes('Friday')) ;

      return orgs.service_days.includes(day) || allDaysWithMonToFriFormat || allDays || monToFri || workingDays;
    })
  } else if (day.length <= 0 && borough.length > 0) {
    return data.filter(orgs =>
      orgs.borough.includes(borough)
    )
  }
  return data;
}

  export default {
    checkCategories,
    handleCheckBoxProcess,
    filterOrganisationData,
    handleDefaultCheckboxProcess
  }
  