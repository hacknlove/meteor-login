/* global Package */

Package.describe({
  name: 'hacknlove:login',
  version: '0.0.9',
  summary: 'Para no repetir el mismo código cada vez que hago una webapp',
  // URL to the Git repository containing the source code for this package.
  git: 'git@hacknlove.github.com:hacknlove/meteor-login.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.4')
  api.use('ecmascript')
  api.use('templating', 'client')
  api.use('less', 'client')
  api.use('accounts-password')
  api.use('hacknlove:traduccion@0.0.1')
  api.addFiles([
    'login.less',
    'logueado.html',
    'login.html',
    'onEnrollmentLink.html',
    'logueado.js',
    'onEnrollmentLink.js'], 'client')
})
