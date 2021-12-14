const express = require('express');

// Controllers
const teamController = require('../../controllers/team.controller');

// Middlewares
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

// Validators
const teamValidation = require('../../validations/team.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(teamValidation.createTeam), teamController.createTeam)
  .get(auth('getUsers'), validate(teamValidation.getTeams), teamController.getTeams);

router.route('/search').get(auth('getUsers'), validate(teamValidation.searchTeam), teamController.searchTeam);

router
  .route('/:teamId')
  .get(auth('getUsers'), validate(teamValidation.getTeam), teamController.getTeam)
  .patch(auth('manageUsers'), validate(teamValidation.updateTeam), teamController.updateTeam)
  .delete(auth('manageUsers'), validate(teamValidation.deleteTeam), teamController.deleteTeam);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Teams management and retrieval
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a team
 *     description: Only admins can create other teams.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: date-time
 *               endDate:
 *                 type: date-time
 *               status:
 *                 type: string
 *                 enum: [active, inactive, deleted, banned]
 *             example:
 *               name: fake team name
 *               startDate: 2021-12-11T18:25:10.749Z
 *               endDate: 2021-12-11T18:25:10.749Z
 *               status: active
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Team'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all teams
 *     description: Only admins can retrieve all teams.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Team name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Team status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of teams
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team
 *     description: Logged in users can fetch only their own team information. Only admins can fetch other teams.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Team'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a team
 *     description: Logged in users can only update their own information. Only admins can update other teams.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: fake team name
 *               startDate: 2021-12-11T18:25:10.749Z
 *               endDate: 2021-12-11T18:25:10.749Z
 *               status: active
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Team'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a team
 *     description: Logged in users can delete only themselves. Only admins can delete other teamss.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
