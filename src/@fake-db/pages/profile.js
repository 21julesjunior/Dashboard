// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const data = {
  profileHeader: {
    fullName: 'Jules',
    profileImg: '/images/avatars/14.png',
  },
  profile: {
    about: [
      { property: 'Full Name', value: 'John Doe', icon: 'tabler:user' },
      { property: 'Status', value: 'active', icon: 'tabler:check' },
      { property: 'Role', value: 'Developer', icon: 'tabler:crown' },
      { property: 'Country', value: 'USA', icon: 'tabler:flag' },
      { property: 'Language', value: 'English', icon: 'tabler:language' }
    ],
    contacts: [
      { property: 'Contact', value: '(123) 456-7890', icon: 'tabler:phone-call' },
      { property: 'Skype', value: 'john.doe', icon: 'tabler:brand-skype' },
      { property: 'Email', value: 'john.doe@example.com', icon: 'tabler:mail' }
    ],
    overview: [
      { property: 'Task Compiled', value: '13.5k', icon: 'tabler:check' },
      { property: 'Connections', value: '897', icon: 'tabler:users' },
      { property: 'Projects Compiled', value: '146', icon: 'tabler:layout-grid' }
    ],
    connections: [
      {
        isFriend: false,
        connections: '45',
        name: 'Cecilia Payne',
        avatar: '/images/avatars/8.png'
      },
      {
        isFriend: true,
        connections: '1.32k',
        name: 'Curtis Fletcher',
        avatar: '/images/avatars/3.png'
      },
      {
        isFriend: true,
        connections: '125',
        name: 'Alice Stone',
        avatar: '/images/avatars/12.png'
      },
      {
        isFriend: false,
        connections: '456',
        name: 'Darrell Barnes',
        avatar: '/images/avatars/7.png'
      },
      {
        isFriend: false,
        connections: '1.2k',
        name: 'Eugenia Moore',
        avatar: '/images/avatars/6.png'
      }
    ],
    teamsTech: [
      {
        members: 72,
        ChipColor: 'error',
        chipText: 'Developer',
        title: 'React Developers',
        avatar: '/images/icons/project-icons/react-label.png'
      },
      {
        members: 122,
        chipText: 'Support',
        ChipColor: 'primary',
        title: 'Support Team',
        avatar: '/images/icons/project-icons/support-label.png'
      },
      {
        members: 7,
        ChipColor: 'info',
        chipText: 'Designer',
        title: 'UI Designer',
        avatar: '/images/icons/project-icons/figma-label.png'
      },
      {
        members: 289,
        ChipColor: 'error',
        chipText: 'Developer',
        title: 'Vue.js Developers',
        avatar: '/images/icons/project-icons/vue-label.png'
      },
      {
        members: 24,
        chipText: 'Marketing',
        ChipColor: 'secondary',
        title: 'Digital Marketing',
        avatar: '/images/icons/project-icons/twitter-label.png'
      }
    ]
  },
  teams: [
    {
      extraMembers: 25,
      title: 'React Developers',
      avatar: '/images/icons/project-icons/react-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
        { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
        { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' },
        { avatar: '/images/avatars/4.png', name: 'George Burrill' }
      ],
      description:
        'We don’t make assumptions about the rest of your technology stack, so you can develop new features in React.',
      chips: [
        {
          title: 'React',
          color: 'primary'
        },
        {
          title: 'MUI',
          color: 'info'
        }
      ]
    },
    {
      extraMembers: 15,
      title: 'Vue.js Dev Team',
      avatar: '/images/icons/project-icons/vue-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/5.png', name: "Kaith D'souza" },
        { avatar: '/images/avatars/6.png', name: 'John Doe' },
        { avatar: '/images/avatars/7.png', name: 'Alan Walker' },
        { avatar: '/images/avatars/8.png', name: 'Calvin Middleton' }
      ],
      description:
        'The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.',
      chips: [
        {
          title: 'Vuejs',
          color: 'success'
        },
        {
          color: 'error',
          title: 'Developer'
        }
      ]
    },
    {
      extraMembers: 55,
      title: 'Creative Designers',
      avatar: '/images/icons/project-icons/xd-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/9.png', name: 'Jimmy Ressula' },
        { avatar: '/images/avatars/10.png', name: 'Kristi Lawker' },
        { avatar: '/images/avatars/11.png', name: 'Danny Paul' },
        { avatar: '/images/avatars/12.png', name: 'Alicia Littleton' }
      ],
      description:
        'A design or product team is more than just the people on it. A team includes the people, the roles they play.',
      chips: [
        {
          title: 'Sketch',
          color: 'warning'
        },
        {
          title: 'XD',
          color: 'error'
        }
      ]
    },
    {
      extraMembers: 35,
      title: 'Support Team',
      avatar: '/images/icons/project-icons/support-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/5.png', name: 'Andrew Tye' },
        { avatar: '/images/avatars/12.png', name: 'Rishi Swaat' },
        { avatar: '/images/avatars/7.png', name: 'Rossie Kim' },
        { avatar: '/images/avatars/8.png', name: 'Mary Hunter' }
      ],
      description:
        'Support your team. Your customer support team is fielding the good, the bad, and the ugly day in and day out.',
      chips: [
        {
          color: 'info',
          title: 'Zendesk'
        }
      ]
    },
    {
      extraMembers: 19,
      title: 'Digital Marketing',
      avatar: '/images/icons/project-icons/social-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/13.png', name: 'Kim Merchent' },
        { avatar: '/images/avatars/12.png', name: "Sam D'souza" },
        { avatar: '/images/avatars/11.png', name: 'Nurvi Karlos' },
        { avatar: '/images/avatars/10.png', name: 'Margorie Whitmire' }
      ],
      description:
        'Digital marketing refers to advertising delivered through digital channels such as search engines, websites…',
      chips: [
        {
          color: 'primary',
          title: 'Twitter'
        },
        {
          title: 'Email',
          color: 'success'
        }
      ]
    },
    {
      title: 'Event',
      extraMembers: 55,
      avatar: '/images/icons/project-icons/event-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/6.png', name: 'Vinnie Mostowy' },
        { avatar: '/images/avatars/5.png', name: 'Allen Rieske' },
        { avatar: '/images/avatars/4.png', name: 'Julee Rossignol' },
        { avatar: '/images/avatars/7.png', name: 'Daniel Long' }
      ],
      description:
        'Event is defined as a particular contest which is part of a program of contests. An example of an event is the long…',
      chips: [
        {
          title: 'Hubilo',
          color: 'success'
        }
      ]
    },
    {
      extraMembers: 45,
      title: 'Figma Resources',
      avatar: '/images/icons/project-icons/figma-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/8.png', name: 'Andrew Mostowy' },
        { avatar: '/images/avatars/1.png', name: 'Micky Ressula' },
        { avatar: '/images/avatars/3.png', name: 'Michel Pal' },
        { avatar: '/images/avatars/12.png', name: 'Herman Lockard' }
      ],
      description:
        'Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers and developers.',
      chips: [
        {
          title: 'UI/UX',
          color: 'success'
        },
        {
          title: 'Figma',
          color: 'secondary'
        }
      ]
    },
    {
      extraMembers: 50,
      title: 'Only Beginners',
      avatar: '/images/icons/project-icons/html-label.png',
      avatarGroup: [
        { avatar: '/images/avatars/11.png', name: 'Kim Karlos' },
        { avatar: '/images/avatars/10.png', name: 'Katy Turner' },
        { avatar: '/images/avatars/9.png', name: 'Peter Adward' },
        { avatar: '/images/avatars/6.png', name: 'Leona Miller' }
      ],
      description:
        'Learn the basics of how websites work, front-end vs back-end, and using a code editor. Learn basic HTML, CSS, and…',
      chips: [
        {
          title: 'CSS',
          color: 'info'
        },
        {
          title: 'HTML',
          color: 'warning'
        }
      ]
    }
  ],


}

const projectTable = [

]
mock.onGet('/pages/profile').reply(config => {
  const { tab = '' } = config.params ?? ''

  // @ts-ignore
  return [200, data[tab]]
})
mock.onGet('/pages/profile-header').reply(() => {
  return [200, data.profileHeader]
})
mock.onGet('/pages/profile-table').reply(config => {
  const { q = '' } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = projectTable.filter(row => {
    return (
      row.name.toLowerCase().includes(queryLowered) ||
      row.date.toLowerCase().includes(queryLowered) ||
      row.leader.toLowerCase().includes(queryLowered)
    )
  })

  return [200, filteredData]
})
