export default defineEventHandler(async (event) => {
  const body = await readBody(event);
	
  console.log('Saving goal to database:', body);
	
  return { 
    status: 'Success!', 
    message: `Goal for "${body.name}" was saved.` 
  };
});