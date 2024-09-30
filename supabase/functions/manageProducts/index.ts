// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import { pgTable, uuid, varchar, timestamp, boolean, date } from 'drizzle-orm/pg-core';

// // Connection string for the Postgres database
// const connectionString = Deno.env.get('SB_DB_URL')!;

// // Define the Products table schema
// export const products = pgTable('public.Products', {
//     id: uuid('id').default('gen_random_uuid()').primaryKey(),
//     name: varchar('name', { length: 255 }).notNull().unique(),
//     description: varchar('description', { length: 255 }),
//     is_active: boolean('is_active').default(true),
//     effective_from: date('effective_from'),
//     effective_to: date('effective_to'),
//     created_at: timestamp('created_at').default('CURRENT_TIMESTAMP'),
//     updated_at: timestamp('updated_at').default('CURRENT_TIMESTAMP'),
// });

// Deno.serve(async (req: Request) => {
//   if (req.method === 'POST') {
//     try {
//       // Parse the request body
//       const requestBody = await req.json();
//       console.log(requestBody);

//       // Initialize the Postgres client and Drizzle ORM
//       const client = postgres(connectionString, { prepare: false });
//       const db = drizzle(client);
//       console.log(db);

//       // Check if the product name or description already exists
//       const existingProduct = await db
//         .select()
//         .from(products)
//         console.log(existingProduct)

//       // if (existingProduct.length > 0) {
//       //   // If the product name matches, update the login count
//       //   if (existingProduct[0].name === requestBody.name) {
//       //     await db
//       //       .update(products)
//       //       .set({
//       //         updated_at: new Date(),
//       //         description: requestBody.description, // Update description if provided
//       //         is_active: requestBody.is_active ?? existingProduct[0].is_active, // Keep existing if not provided
//       //         effective_from: requestBody.effective_from ?? existingProduct[0].effective_from,
//       //         effective_to: requestBody.effective_to ?? existingProduct[0].effective_to,
//       //       })
//       //       .where(eq(products.id, existingProduct[0].id));

//       //     return new Response(
//       //       JSON.stringify({ success: true, message: 'Product exists, details updated successfully' }),
//       //       {
//       //         headers: { 'Content-Type': 'application/json' },
//       //         status: 200,
//       //       }
//       //     );
//       //   }
//       // }

//       // // Insert the new product
//       // await db.insert(products).values({
//       //   name: requestBody.name,
//       //   description: requestBody.description,
//       //   is_active: requestBody.is_active ?? true,
//       //   effective_from: requestBody.effective_from,
//       //   effective_to: requestBody.effective_to,
//       // });

//       // Return a success response
//       return new Response(
//         JSON.stringify({ success: true, message: 'Product created successfully' }),
//         {
//           headers: { 'Content-Type': 'application/json' },
//           status: 201,
          
//         }
//       );
//     } catch (error:any) {
//       // Handle any errors that occurred during the insertion
//       return new Response(
//         JSON.stringify({ success: false, message: error.message }),
//         {
//           headers: { 'Content-Type': 'application/json' },
//           status: 500,
//         }
//       );
//     }
//   } else {
//     return new Response(
//       JSON.stringify({ success: false, message: 'Only POST requests are allowed' }),
//       {
//         headers: { 'Content-Type': 'application/json' },
//         status: 405,
//       }
//     );
//   }
// });

// /* To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

//   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/insert-into-products' \
//     --header 'Authorization: Bearer YOUR_SUPABASE_JWT' \
//     --header 'Content-Type: application/json' \
//     --data '{"name":"New Product", "description":"Product Description", "is_active":true, "effective_from":"2024-01-01", "effective_to":"2024-12-31"}'
// */
