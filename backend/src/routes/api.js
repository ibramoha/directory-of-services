import express from 'express';
import { postOrganisation, editOrganisation, deleteBranch } from '../controllers/post_controller';
import { seedData } from '../controllers/postInitialData';
import helpers from '../../library/helpers'
import {
  getAllOrgainisation,
  getListOfCategories,
  getListOfBoroughs,
  getListOfAreas,
  getBranchesByCategory,
  getBranchesByDay,
  getBranchesByBorough,
  getBranchesByPostcode,
  getSingleBranch
} from '../controllers/get_controller';

const router = express.Router();

router.delete('/organisation/delete', async (req, res) => {
  const { orgId, branchId } = req.query;
  try {
    if (!orgId || !branchId) {
      throw new Error('REQUIRED_DATA_NOT_SUPPLIED');
    }
    const response = await deleteBranch(orgId, branchId);
    res.status(200).json({
      success: true,
      message: 'Branch has been deleted successfully',
      response
    });
  } catch (error) {
    res
      .status(502)
      .json({ success: false, message: 'There is an error occurred', error });
  }
});

router.post('/organisation/add', async (req, res) => {
  const data = req.body;
  try {
    if (!data.organisation || !data.categories) {
      throw new Error('REQUIRED_DATA_NOT_SUPPLIED');
    }
    if (data.categories.length > 1) {
      data.categories.map(async category => {
        const graph = helpers.addOrgSchema(data, category);
        await postOrganisation(graph);
        res.status(200).json({
          success: true,
          message: 'The organisation has been saved successfully',
          data: graph
        });
      })
    } else {
      const category = data.categories[0]
      const graph = helpers.addOrgSchema(data, category);
      await postOrganisation(graph);
      res.status(200).json({
        success: true,
        message: 'The organisation has been saved successfully',
        data: graph
      });
    }
  } catch (err) {
    res.status(502).json({
      success: false,
      message: 'The organisation is not saved!',
      err
    });
  }
});

router.put('/organisation/edit', async (req, res) => {
  const { branchId } = req.body;
  const { orgId } = req.body;
  const data = req.body;
  const graph = {
    id: orgId,
    org_name: data.organisation,
    website: data.website,
    branch: [
      {
        id: branchId,
        borough: data.borough,
        project: data.project,
        tag: data.tag,
        clients: data.clients,
        address: [
          {
            id: data.addressId,
            address_line: data.address,
            area: data.area,
            postcode: data.postcode,
            email_address: data.email,
            telephone: data.tel,
            location: [
              {
                lat: data.lat,
                long: data.long
              }
            ]
          }
        ],
        service: [
          {
            id: data.serviceId,
            service_days: data.days,
            service: data.service,
            process: data.process,
            categories: [
              {
                cat_name: data.categories
              }
            ]
          }
        ]
      }
    ]
  };

  try {
    await editOrganisation(graph, orgId, branchId);
    return res.status(200).json({
      success: true,
      message: 'The organisation has been updated successfully',
      data
    });
  } catch (err) {
    return res.status(502).json({
      success: false,
      message: 'The organisation did not save!',
      err: err.message
    });
  }
});

router.get('/all', async (req, res) => {
  try {
    await getAllOrgainisation().then(services =>
      res.status(200).json(services));
  } catch (err) {
    res.status(502).json(err);
  }
});

router.get('/organisation/branch', async (req, res) => {
  const { orgId, branchId } = req.query
  try {
    await getSingleBranch(orgId, branchId).then(branch =>
      res.status(200).json(branch));
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/migrate', async (req, res) => {
  try {
    const allData = await getAllOrgainisation();
    if (allData.length > 0) {
      return res
        .status(502)
        .json({ success: false, message: 'Data is already migrated' });
    }
    await seedData();
    const data = await res.status(200).json({
      success: true,
      message: 'Data is migrated successfully into database!'
    });
    return data;
  } catch (err) {
    return res.status(502).json(err);
  }
});

router.get('/categories', async (req, res) => {
  try {
    await getListOfCategories().then(categories =>
      res.status(200).json(categories));
  } catch (err) {
    res.status(502).json(err);
  }
});

router.get('/boroughs', async (req, res) => {
  try {
    getListOfBoroughs().then(boroughs => res.status(200).json(boroughs));
  } catch (err) {
    res.status(502).json(err);
  }
});

router.get('/areas', async (req, res) => {
  try {
    await getListOfAreas().then(areas => res.status(200).json(areas));
  } catch (err) {
    res.status(502).json(err);
  }
});

router.post('/postcode', async (req, res) => {
  const { category, lat, long } = req.body;
  try {
    if (!lat || !long) {
      throw new Error('REQUIRED_DATA_NOT_SUPPLIED');
    }
    const data = await getBranchesByPostcode(category, lat, long);
    res.status(200).json({
      success: true,
      message: 'The Postcode has been saved successfully',
      data
    });

  } catch (err) {
    res.status(502).json({
      success: false,
      message: 'The Postcode is not saved!',
      err
    });
  }
});

router.get('/category', async (req, res) => {
  try {
    const { category } = req.query;
    await getBranchesByCategory(category).then(categories =>
      res.status(200).json(categories));
  } catch (err) {
    res.status(502).json(err);
  }
});

router.get('/day', async (req, res) => {
  try {
    const { day } = req.query;
    await getBranchesByDay(day).then(days => res.status(200).json(days));
  } catch (err) {
    res.status(502).json(err);
  }
});

router.get('/borough', async (req, res) => {
  try {
    const { borough } = req.query;
    await getBranchesByBorough(borough).then(boroughs =>
      res.status(200).json(boroughs));
  } catch (err) {
    res.status(502).json(err);
  }
});

module.exports = router;
