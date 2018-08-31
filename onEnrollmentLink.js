import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating'
import { template } from './logueado.js'

var terminar
var token

Accounts.onEnrollmentLink(function (t, done) {
  template.set('onEnrollmentLink')
  terminar = done
  token = t
})

Accounts.onResetPasswordLink(function (t, done) {
  template.set('onEnrollmentLink')
  terminar = done
  token = t
})

Template.onEnrollmentLink.events({
  'submit form' (event, instance) {
    event.preventDefault()
    const data = instance.$('form').validarFormulario()
    if (data.error) {
      return
    }
    if (data.password !== data.password2) {
      instance.$('input[name=password2]').marcarError('vacio')
      return
    }
    Accounts.resetPassword(token, data.password, function (err) {
      if (err) {
        window.alert('algo ha salido mal')
      }
      terminar()
      template.set()
    })
  }
})
