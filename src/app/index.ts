import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { createMealRoute } from './route/create-meal'
import { listMealsRoute } from './route/list-meals'
import { showMealRoute } from './route/show-meal'
import { updateMealRoute } from './route/update-meal'
import { deleteMealRoute } from './route/delete-meal'
import { getMealMetricsRoute } from './route/get-meal-metrics'

const app = fastify()

app.register(cookie)

app.register(createMealRoute)
app.register(listMealsRoute)
app.register(showMealRoute)
app.register(updateMealRoute)
app.register(deleteMealRoute)
app.register(getMealMetricsRoute)

export { app }
