const express = require('express');

// Controllers
const projectController = require('../../controllers/project.controller');

// Middlewares
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

// Validators
const projectValidation = require('../../validations/project.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(projectValidation.createProject), projectController.createProject)
  .get(auth('getUsers'), validate(projectValidation.getProjects), projectController.getProjects);

router
  .route('/search')
  .get(auth('getUsers'), validate(projectValidation.searchProjectByName), projectController.searchProjectByName);

router
  .route('/:projectId')
  .get(auth('getUsers'), validate(projectValidation.getProject), projectController.getProject)
  .patch(auth('manageUsers'), validate(projectValidation.updateProject), projectController.updateProject)
  .delete(auth('manageUsers'), validate(projectValidation.deleteProject), projectController.deleteProject);

module.exports = router;

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a project
 *     description: Only admins can create other projects.
 *     tags: [Projects]
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
 *               - description
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               description :
 *                 type: string
 *               _tasks:
 *                 type: string
 *               status:
 *                  type: string
 *                  enum: [active, inactive, deleted, banned, completed]
 *             example:
 *               name: fake project name
 *               description: this is fake project description
 *               _tasks: 61b4ed0691fe802507a09bec
 *               status: active
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all projects
 *     description: Only admins can retrieve all projects.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Project name
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Project description
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Project status
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
 *         description: Maximum number of projects
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
 *                     $ref: '#/components/schemas/Project'
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
 * /projects/{id}:
 *   get:
 *     summary: Get a project
 *     description: Logged in users can fetch only their own projects information. Only admins can fetch other projects.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a project
 *     description: Logged in users can only update their own projects information. Only admins can update other projects.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               _tasks:
 *                 type: string
 *             example:
 *               name: fake project name
 *               description: this is fake project description
 *               _tasks: 61b4ed0691fe802507a09bec
 *               status: active
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a project
 *     description: Logged in users can delete own projects. Only admins can delete other projects.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
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
