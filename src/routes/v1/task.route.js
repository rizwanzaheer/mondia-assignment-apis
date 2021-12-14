const express = require('express');

// Controllers
const taskController = require('../../controllers/task.controller');

// Middlewares
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

// Validators
const taskValidation = require('../../validations/task.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(taskValidation.createTask), taskController.createTask)
  .get(auth('getUsers'), validate(taskValidation.getTasks), taskController.getTasks);

router.route('/search').get(auth('getUsers'), validate(taskValidation.searchTask), taskController.searchTask);

router
  .route('/:taskId')
  .get(auth('getUsers'), validate(taskValidation.getTask), taskController.getTask)
  .patch(auth('manageUsers'), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth('manageUsers'), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task
 *     description: Only admins can create other tasks.
 *     tags: [Tasks]
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
 *               - code
 *               - description
 *               - project
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               project:
 *                 type: string
 *               logs:
 *                 type: string
 *               status:
 *                  type: string
 *                  enum: [active, inactive, deleted, banned, completed]
 *             example:
 *               name: fake name
 *               code: fake code
 *               description: this is fake task description
 *               project: "61b4ed0691fe802507a09bec"
 *               logs: this is test logs
 *               status: active
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Task'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all tasks
 *     description: Only admins can retrieve all tasks.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Task name
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Task code
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Task description
 *       - in: query
 *         name: project
 *         schema:
 *           type: string
 *         description: Project Id
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Task status
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
 *         description: Maximum number of tasks
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
 *                     $ref: '#/components/schemas/Task'
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
 * /tasks/{id}:
 *   get:
 *     summary: Get a task
 *     description: Logged in users can fetch only their own task information. Only admins can fetch other tasks.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Task'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a task
 *     description: Logged in users can only update their own task information. Only admins can update other tasks.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               name: fake name
 *               code: fake last name
 *               description: this is fake task description
 *               project: "61b4ed0691fe802507a09bec"
 *               logs: this test logs
 *               status: active
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Task'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a task
 *     description: Logged in users can delete only their task. Only admins can delete other tasks.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task id
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
