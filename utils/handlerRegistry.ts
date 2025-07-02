// Success handler
const mySectionSuccessHandler = (data: any) => {
  console.log('mySectionSuccessHandler triggered', data);
  // Example: Add a timestamp to the returned data
  return { ...data, processedAt: new Date().toISOString() };
};

// Schema handler (replaces timerMapSchema from the original controller)
const timerMapSchema = (state: any) => {
  // state could be the pinia store state, if needed
  return {
    type: 'object',
    title: 'Timer Filters',
    properties: {
      namespace: { type: 'string', title: 'Namespace' },
      names: { type: 'string', title: 'Names' },
      period: {
        type: 'string',
        title: 'Period',
        enum: ['All', '1 min', '5 min', '60 min', '24 hr'],
      },
    },
  };
};

// The registry object that makes functions available by name
export const handlerRegistry = {
  mySectionSuccessHandler,
  timerMapSchema,
};

export type HandlerKey = keyof typeof handlerRegistry;