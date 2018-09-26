function fetchNestedObj(object) {
  if (object) {
    return Object.keys(object)
      .reduce((accumulator, key) => {
        if (typeof object[key] !== 'object') {
          accumulator[key] = object[key];
          return accumulator;
        }
        return {
          ...accumulator,
          ...fetchNestedObj(object[key])
        }
      }, {});
  }
  return null;
}

// Flatten list of branch into one array with their org name and website
function flattenBranches(data) {
  const branches = []
  const { org_name, website } = data
  data.branch.map(branch => branches.push({ org_name, website, ...branch }))
  return branches
}

// Flatten each branch nested data
function flattenBranchData(data) {
  return flattenBranches(data).map(org => fetchNestedObj(org))
}

function flattenBranchArrays(branches) {
  return branches.reduce((acc, value) => {
    value.map(branch => acc.push(branch))
    return acc
  })
}

// Initial organization schema
function addOrgSchema(data, category) {
  return {
    org_name: data.organisation,
    website: data.website || '',
    branch: {
      borough: data.borough || '',
      project: data.project || '',
      tag: data.tag || '',
      service: [
        {
          service: data.service || '',
          service_days: data.days || '',
          process: data.process || '',
          categories: [
            {
              cat_name: category
            }
          ]
        }
      ],
      address: [
        {
          area: data.area || '',
          address_line: data.address || '',
          postcode: data.postcode || '',
          email_address: data.email || '',
          telephone: data.tel || '',
          location: [
            {
              lat: data.lat || '',
              long: data.long || ''
            }
          ]
        }
      ]
    }
  };
}

// Part of calculation distance function
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

// Minimize  the distance number length
function round(value, place) {
  const multiplier = Math.pow(10, place || 0);
  return (Math.round(value * multiplier) / multiplier);
}

// Calculate the distance in Mile
function calculateDistance(lat1, lon1, lat2, lon2) {
  const radius = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const firtsValue = (Math.sin(dLat / 2) * Math.sin(dLat / 2));
  const secondValue = (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))) * (Math.sin(dLon / 2) * Math.sin(dLon / 2));
  const a = firtsValue + secondValue;
  const c = (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 0.621371;
  const distance = radius * c; // Distance in km
  return round(distance, 3);
}

// This function will get user postcode latitude, longitude and organization latitude longitude
// then will use calculateDistance function to calculate the distance by mile then return list
// of organizations data with distance between the organization and user address
function geoNear(lat, long, latLong) {
  const total = [];
  for (let i = 0; i < latLong.length; i += 1) {
    const { data } = latLong[i];
    if (latLong[i].lat && latLong[i].long) {
      total.push({ distance: calculateDistance(lat, long, latLong[i].lat, latLong[i].long), success: true, data })
    } else {
      total.push({
        distance: calculateDistance(lat, long, latLong[i].lat, latLong[i].long),
        success: true,
        message: 'Dose not have postcode or postcode is incorrect',
        data
      })
    }
  }
  return total.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}

export default {
  flattenBranchArrays,
  flattenBranchData,
  fetchNestedObj,
  addOrgSchema,
  geoNear
};
