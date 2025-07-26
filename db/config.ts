import { createId } from '@paralleldrive/cuid2';
import { defineDb, defineTable, column, NOW } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true, default: createId() }),
    clerkUserId: column.text({ unique: true }),
    email: column.text(),
    name: column.text(),
    image: column.text(),
    linkedinUrl: column.text({ optional: true }),

    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW })
  },
  indexes: [
    {
      on: ["clerkUserId", "id"], unique: true
    }
  ]
})

// https://astro.build/db/config
export default defineDb({
  tables: { User }
});
