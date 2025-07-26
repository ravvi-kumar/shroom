import { verifyWebhook } from '@clerk/astro/webhooks'
import type { APIRoute } from 'astro'
import { db, eq, User } from 'astro:db'

export const POST: APIRoute = async ({ request }) => {
    try {
        const evt = await verifyWebhook(request, {
            signingSecret: import.meta.env.CLERK_WEBHOOK_SIGNING_SECRET,
        })

        const { id } = evt.data
        const eventType = evt.type
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        console.log('Webhook payload:', evt.data)

        if (!id) {
            return new Response('Error verifying webhook', { status: 400 })
        }
        if (eventType === "user.created") {
            // #NOTE: create new user in the astro:db with the clerkId
            await db.insert(User).values({
                clerkUserId: id,
                image: evt.data.image_url,
                email: evt.data.email_addresses[0].email_address,
                name: evt.data.first_name || evt.data.username || evt.data.email_addresses[0].email_address.split("@")[0]
            })
        } else if (eventType === "user.deleted"){
            await db.delete(User).where(eq(User.clerkUserId, id))
        } else if (eventType === "user.updated"){
            await db.update(User).set({
                image: evt.data.image_url,
                email: evt.data.email_addresses[0].email_address,
                name: evt.data.first_name || evt.data.username || evt.data.email_addresses[0].email_address.split("@")[0]
            }).where(eq(User.clerkUserId, id))
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}