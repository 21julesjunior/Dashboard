const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/'

    },
    {
      title: 'Invoices',
      icon: 'tabler:file-dollar',
      path: '/apps/invoice/list'
    },
    {
      title: 'Users',
      icon: 'tabler:user',
      path: '/apps/user/list'
    },
    {
      title: 'Products',
      icon: 'tabler:stack',
      path: '/apps/products/list'
    },
    {
      title: 'Roles & Permissions',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    },
    // {
    //   title: 'Pages',
    //   icon: 'tabler:file',
    //   children: [
    //     {
    //       title: 'User Profile',
    //       children: [
    //         {
    //           title: 'Profile',
    //           path: '/pages/user-profile/profile'
    //         },
    //         {
    //           title: 'Teams',
    //           path: '/pages/user-profile/teams'
    //         },
    //         {
    //           title: 'Projects',
    //           path: '/pages/user-profile/projects'
    //         },
    //         {
    //           title: 'Connections',
    //           path: '/pages/user-profile/connections'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Account Settings',
    //       children: [
    //         {
    //           title: 'Account',
    //           path: '/pages/account-settings/account'
    //         },
    //         {
    //           title: 'Security',
    //           path: '/pages/account-settings/security'
    //         },
    //         {
    //           title: 'Billing',
    //           path: '/pages/account-settings/billing'
    //         },
    //         {
    //           title: 'Notifications',
    //           path: '/pages/account-settings/notifications'
    //         },
    //         {
    //           title: 'Connections',
    //           path: '/pages/account-settings/connections'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'FAQ',
    //       path: '/pages/faq'
    //     },
    //     {
    //       title: 'Help Center',
    //       path: '/pages/help-center'
    //     },
    //     {
    //       title: 'Pricing',
    //       path: '/pages/pricing'
    //     },
    //     {
    //       title: 'Miscellaneous',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Coming Soon',
    //           path: '/pages/misc/coming-soon'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Under Maintenance',
    //           path: '/pages/misc/under-maintenance'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Page Not Found - 404',
    //           path: '/pages/misc/404-not-found'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Not Authorized - 401',
    //           path: '/pages/misc/401-not-authorized'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Server Error - 500',
    //           path: '/pages/misc/500-server-error'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   title: 'Auth Pages',
    //   icon: 'tabler:lock',
    //   children: [
    //     {
    //       title: 'Login',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Login v1',
    //           path: '/pages/auth/login-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Login v2',
    //           path: '/pages/auth/login-v2'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Login With AppBar',
    //           path: '/pages/auth/login-with-appbar'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Register',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Register v1',
    //           path: '/pages/auth/register-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Register v2',
    //           path: '/pages/auth/register-v2'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Register Multi-Steps',
    //           path: '/pages/auth/register-multi-steps'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Verify Email',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Verify Email v1',
    //           path: '/pages/auth/verify-email-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Verify Email v2',
    //           path: '/pages/auth/verify-email-v2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Forgot Password',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Forgot Password v1',
    //           path: '/pages/auth/forgot-password-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Forgot Password v2',
    //           path: '/pages/auth/forgot-password-v2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Reset Password',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Reset Password v1',
    //           path: '/pages/auth/reset-password-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Reset Password v2',
    //           path: '/pages/auth/reset-password-v2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Two Steps',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Two Steps v1',
    //           path: '/pages/auth/two-steps-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Two Steps v2',
    //           path: '/pages/auth/two-steps-v2'
    //         }
    //       ]
    //     }
    //   ]
    // },

  ]
}

export default navigation
