export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log('Saving feedback to database:', body);

  return { 
    status: 'Success', 
    message: `Thank you for your feedback!`,
    ratingReceived: body.rating
  };
});