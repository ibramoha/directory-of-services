import { transaction, Model } from 'objection';
import { knex } from '../../config';
import Organisation from '../model/Organisation';
import benefitData from '../../data/data.json';

Model.knex(knex);

function seedData() {
  for (let row = 0; row < benefitData.length; row += 1) {
    const { branches } = benefitData[row];
    for (let branch = 0; branch < branches.length; branch += 1) {
      const branchData = {
        org_name: benefitData[row].name || '',
        website: benefitData[row].branches[0].Website || '',
        branch: {
          borough: branches[branch].Borough || '',
          project: branches[branch].project || '',
          tag: branches[branch].tag || '',
          service: [
            {
              service: branches[branch].Services || '',
              service_days: branches[branch].Day || '',
              process: branches[branch].Process || '',
              categories: [
                {
                  cat_name: branches[branch].categories || ''
                }
              ]
            }
          ],
          address: [
            {
              area: branches[branch].Area || '',
              address_line: branches[branch].Address || '',
              postcode: branches[branch].Postcode || '',
              email_address: branches[branch].Email || '',
              telephone: `${branches[branch].Tel}` || '',
              location: [
                {
                  lat: `${branches[branch].lat}` || '',
                  long: `${branches[branch].long}` || ''
                }
              ]
            }
          ]
        }
      };
      (async () => {
        try {
          return transaction(Organisation.knex(), async trx => {
            const savedData = await Organisation.query(trx).insertGraph(branchData);
            return savedData;
          })
        } catch (err) {
          return err;
        }
      })();
    }
  }
}

module.exports = { seedData };
