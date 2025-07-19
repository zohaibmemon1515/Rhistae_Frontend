const profile = {
  name: 'profile',
  type: 'document',
  title: 'Matchmaking Profile',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: any) => Rule.required().min(2).max(50),
    },
    {
      name: 'age',
      type: 'number',
      title: 'Age',
      validation: (Rule: any) => Rule.required().min(18).max(60),
    },
    {
      name: 'gender',
      type: 'string',
      title: 'Gender',
      options: {
        list: [
          {title: 'Female', value: 'female'},
          {title: 'Male', value: 'male'},
        ],
      },
      validation: (Rule: any) => Rule.required().error('Please select gender'),
    },
    {
      name: 'city',
      type: 'string',
      title: 'City',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'profession',
      type: 'string',
      title: 'Profession',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'education',
      type: 'string',
      title: 'Education',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}

export default profile
