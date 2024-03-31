// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    meals: {
      id: string
      session_id?: string
      name: string
      description: number
      meal_datetime: string
      in_diet: boolean
      created_at: string
      updated_at: string
    }
  }
}
