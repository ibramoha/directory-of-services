import bcrypt from 'bcrypt';
import passport from 'passport';
import express from 'express';
import jwt from 'jsonwebtoken';
import secret from '../authentication/config'
import '../authentication/passport';
import {
  getAllUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  comparePassword
} from '../controllers/users_controller';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const data = await getAllUsers();
    const users = data.map(user => ({
      id: user.id,
      fullname: user.fullname,
      role: user.role,
      organisation: user.organisation,
      last_updated: user.last_updated
    }));
    res.status(200).json(users)
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    await getUsersById(req.params.id).then(user => res.status(200).json(user));
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    await deleteUser(req.params.userId).then(() => res.status(200).json({ message: 'user deleted successfully' }));
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.post('/users', async (req, res) => {
  let { password } = req.body;
  const { email, orgName } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) {
        throw error;
      }
      password = hash;
      await addUser({ salt_password: password, email: email, org_name: orgName }).then(user => res.json(user))
    })
  })
});

router.put('/users/:userId', async (req, res) => {
  let { password } = req.body;
  const { email } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) {
        throw error;
      }
      password = hash;
      await updateUser(req.params.userId, {
        salt_password: password,
        email
      }).then(() => res.json({ message: 'user updated successfully' }))
    })
  })
});

router.patch('/users/role/:userId', async (req, res) => {
  try {
    const { role, fullname, organisation } = req.body;
    await updateUser(req.params.userId, {
      role: role,
      fullname,
      organisation
    })
    res.status(200).json({ success: true, message: 'user updated successfully', updateUser })
  } catch (err) {
    res.state(502).json({ success: false, message: 'user did not update', err })
  }
})

router.post('/signup', async (req, res) => {
  let { password } = req.body;
  const { fullname, email, organisation } = req.body;
  if (email.length > 0 && password.length > 0) {
    await getUserByEmail(email).then(user => {
      if (user.length > 0) {
        res.json({ success: false, message: 'User is already found' })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
              throw error;
            }
            password = hash;
            addUser({
              salt_password: password, email, fullname, organisation
            }).then(userData => {
              if (userData) {
                res.json({
                  success: true, message: 'User is registered'
                })
              } else {
                res.json({
                  success: false, message: 'User is not registered'
                })
              }
            });
          })
        })
      }
    })
  } else {
    res.json({ success: false, message: 'You have to add email and password' })
  }
})

router.post('/login', async (req, res) => {
  const { password, email } = req.body;
  try {
    await getUserByEmail(email).then(userInfo => {
      if (userInfo.length <= 0) {
        res
          .status(403)
          .json({ success: false, message: 'User is not registered' })
      } else {
        comparePassword(password, userInfo[0].salt_password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            const token = jwt.sign({
              sub: userInfo[0].id,
              fullname: userInfo[0].fullname,
              sucess: 'true'
            }, secret);
            res
              .status(200)
              .json({ token, user: userInfo });
          } else {
            res
              .status(403)
              .json({ success: false, message: 'Password is not match' })
          }
        })
      }
    })
  } catch (err) {
    throw err
  }
})

router.get('/users/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ success: true })
})

module.exports = router;
