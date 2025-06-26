import type { FormKitSchemaNode } from '@formkit/core'

export const appointmentFormSchema: FormKitSchemaNode[] = [
  {
    $el: 'h1',
    children: 'Schedule Appointment',
    attrs: { class: 'text-2xl font-bold mb-4' },
  },
  {
    $formkit: 'text',
    name: 'name',
    label: 'Name',
    outerClass: 'mb-4',
    validation: 'required|length:2,50',
  },
  {
    $formkit: 'email',
    name: 'email',
    label: 'Email',
    outerClass: 'mb-4',
    validation: 'required|email',
  },
	{
    $cmp: 'MyCustomInput',
    props: {
			name: 'notes',
      label: 'Notes',
    },
  },
  {
    $formkit: 'submit',
    label: 'Submit',
    outerClass: 'mt-4',
  },
	
]
