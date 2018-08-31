import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'
import { Accounts } from 'meteor/accounts-base'
import { Tracker } from 'meteor/tracker'

export const template = new ReactiveVar()

Tracker.autorun(function () {
  const t = template.get()
  if (t === 'onEnrollmentLink') {
    return
  }
  if (!Meteor.status().connected) {
    return template.set('sinConexion')
  }
  if (Meteor.loggingIn()) {
    return template.set('logginIn')
  }
  if (!Meteor.user()) {
    return template.set('login')
  }
  template.set(null)
})

Template.logueado.helpers({
  template () {
    return template.get()
  }
})

Template.login.events({
  'submit form' (event, instance) {
    event.preventDefault()
    const data = instance.$('form').validarFormulario()
    if (data.error) {
      return
    }
    Meteor.loginWithPassword(data.email, data.password, function (e, r) {
      if (!e) {
        return template.set('logging')
      }
      if (e.reason === 'User not found') {
        return instance.$('input[name=email]').marcarError('noEncontrado')
      }
      if (e.reason === 'Incorrect password') {
        return instance.$('input[name=password]').marcarError('noValido')
      }
      if (e.reason === 'User has no password set') {
        return instance.$('input[name=password]').marcarError('noEncontrado')
      }

      console.log(e, r)
    })
  }
})

Accounts.onLogout(function () {
  template.set('login')
})
