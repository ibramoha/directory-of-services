const data = require("./fetchedDataFromSpreadsheet.json");
const fs = require("fs");

// Write the data into file as JSON format
function convertToJsonFile(data, fileName) {
  const stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync(`${fileName}.json`, stringData);
}

// move all days from duplicated organizations to one of them
// const updatedData =
data.map(orgs => {

// original data flattener
    const key = Object.keys(orgs);
    let arrayFlattenner = orgs[key].map(org => org);
    // console.log(arrayFlattenner)
// replace the underscores in each of the objects
  function removeOrgUnderscor(obj, find, replace) {
    return Object.keys(obj).reduce(
      (acc, key) => Object.assign(acc, { [key.replace(find, replace)]: obj[key] }),{});
  }

  const allData = arrayFlattenner
    .reduce((acc, val) => acc.concat(val), [])
    .filter(function(el) {
      return el.Organisation !== "";
    })
    .map(obj => removeOrgUnderscor(obj, /_/g, ""))
    .map(org => {
        const {Organisation, Area, Borough, Services, Website, Clients, Days, Telephone, Process, Email, Postcode, Address} = org;
        const Categories = key[0];
        // console.log(org)
        return {Organisation, Area, Borough,Categories, Services, Website, Clients, Days, Telephone, Process, Email, Postcode, Address, Project: "", Tag: ""}
    })


    const allDuplicatedData = [];
    const updateData = [];
    const duplicatedData = [];
    const finalData = [];

    const weekDays = [];

    // Return not duplicated organizations to finalData and return duplicated one to duplicatedData
    allData.map((elem, index, self) => {
        const test = index === self.findIndex(item => item.Organisation === elem.Organisation && item.Area === elem.Area && item.Borough === elem.Borough);
        if (test) {
            finalData.push(elem)
        }else{
            const org = duplicatedData.map(response => response.Organisation === elem.Organisation)[0];
            if (duplicatedData.length === 0 || org) {
                duplicatedData.push(elem)
            }
            allDuplicatedData.push(duplicatedData)
        }
    })

    // move all days from duplicated organization to an array
    duplicatedData.map(item => {
        if (item.Days && item.Days !== 'undefined') {
            weekDays.push(item.Days)
        }
    })

    // filter duplicated organization then add the array of days to it
    duplicatedData.filter(
        (elem, index, self) =>
            index ===
            self.findIndex(
            toDo =>
                toDo.Organisation === elem.Organisation &&
                toDo.Area === elem.Area &&
                toDo.Borough === elem.Borough
            )
    )
    .map(org => {
        const { Organisation, Area, Borough,Categories, Services, Website, Clients, Days, Telephone, Process, Email, Postcode, Address } = org;
        updateData.push({ Organisation, Borough, Area, Categories, Services, Website, Clients, Days, Telephone, Email, Postcode, Address, Project: "", Tag: "", Days: weekDays.join(), Process })
    })

    // Get updated organization at one array

    console.log(updateData)
})